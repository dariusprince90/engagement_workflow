/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import VIEW_STATUSES from '../../../../../helpers/enums/viewStatuses';
import NavItem from './NavItem';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon'
};

const defaultProps = {
  id: faker.random.alphaNumeric(10),
  label: faker.random.alphaNumeric(10),
  status: undefined
};

const fakeViewContainer = createViewContainer();
const fakeElement = createScrollToElement();
const fakeViewContainerRect = { top: faker.datatype.number() };
const fakeElementRect = { top: faker.datatype.number() };

// **********************************************************************
// * functions

function createScrollToElement() {
  const element = document.createElement('div');

  element.setAttribute('id', defaultProps.id);
  element.getBoundingClientRect = () => fakeElementRect;

  return element;
}

function createViewContainer() {
  const viewContainer = document.createElement('div');

  viewContainer.setAttribute('class', 'view-container');
  viewContainer.scrollBy = jest.fn();
  viewContainer.getBoundingClientRect = () => fakeViewContainerRect;

  return viewContainer;
}

const getComponentToRender = (props) => {
  return <NavItem {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, onClick }) => (
    <fake-font-awesome-icon icon={icon} onClick={onClick} data-testid={testIds.fontAwesomeIcon} />
  )
}));

// **********************************************************************
// * unit tests

describe('NavItem', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    document.body.appendChild(fakeViewContainer);
    document.body.appendChild(fakeElement);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  it('renders the correct label', () => {
    const expectedLabel = defaultProps.label;
    render(getComponentToRender(defaultProps));
    expect(screen.getByText(expectedLabel)).toBeInTheDocument();
  });

  it.each([
    { status: VIEW_STATUSES.valid, expectedClass: 'nav-item nav-item-valid' },
    { status: VIEW_STATUSES.invalid, expectedClass: 'nav-item nav-item-invalid' },
    { status: VIEW_STATUSES.normal, expectedClass: 'nav-item' },
    { status: undefined, expectedClass: 'nav-item' }
  ])('has correct class when status is $status', ({ status, expectedClass }) => {
    const props = { ...defaultProps, status };
    render(getComponentToRender(props));
    expect(screen.getByRole('navigation')).toHaveAttribute('class', expectedClass);
  });

  it.each([
    { status: VIEW_STATUSES.valid, expectedIcon: 'fa-solid fa-circle-check' },
    { status: VIEW_STATUSES.invalid, expectedIcon: 'fa-solid fa-circle-xmark' },
    { status: VIEW_STATUSES.normal, expectedIcon: 'fa-solid fa-circle-location-arrow' },
    { status: undefined, expectedIcon: 'fa-solid fa-circle-location-arrow' }
  ])('has correct icon when status is $status', ({ status, expectedIcon }) => {
    const props = { ...defaultProps, status };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', expectedIcon);
  });

  it('invokes viewContainer.scrollBy when icon is clicked', () => {
    // * ARRANGE
    const bufferPixels = 12;
    const topOffset = fakeElementRect.top - fakeViewContainerRect.top - bufferPixels;
    const expectedOptions = { top: topOffset, left: 0, behavior: 'smooth' };

    // * ACT
    render(getComponentToRender(defaultProps));
    expect(fakeViewContainer.scrollBy).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId(testIds.fontAwesomeIcon));

    // * ASSERT
    expect(fakeViewContainer.scrollBy).toHaveBeenCalledWith(expectedOptions);
  });
});
