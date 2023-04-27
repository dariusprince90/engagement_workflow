/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as fontAwesome from '@fortawesome/react-fontawesome';

import PaginationItem from './PaginationItem';

// **********************************************************************
// * constants

const defaultProps = {
  className: faker.lorem.word(),
  label: faker.lorem.word(),
  icon: faker.lorem.word(),
  swapLabelPosition: false,
  title: faker.lorem.word(),
  isActivePage: false,
  disabled: false,
  onClick: jest.fn()
};

const testIds = {
  listItem: 'list-item',
  fontAwesomeIcon: 'font-awesome-icon'
};

const getComponentToRender = (props) => {
  return <PaginationItem {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('App', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    fontAwesome.FontAwesomeIcon.mockImplementation(({ icon }) => {
      return <fake-font-awesome-icon icon={icon} data-testid={testIds.fontAwesomeIcon} />;
    });
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  it('adds the disabled class when the disabled prop is true', () => {
    const props = { ...defaultProps, disabled: true };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.listItem)).toHaveClass('disabled');
  });

  it('does not add the disabled class when the disabled prop is false', () => {
    const props = { ...defaultProps, disabled: false };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.listItem)).not.toHaveClass('disabled');
  });

  it('adds the active class when the isActivePage prop is true', () => {
    const props = { ...defaultProps, isActivePage: true };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.listItem)).toHaveClass('active');
  });

  it('does not add the active class when the isActivePage prop is false', () => {
    const props = { ...defaultProps, isActivePage: false };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.listItem)).not.toHaveClass('active');
  });

  it('sets the title of the button to the value of the title prop', () => {
    const title = faker.lorem.word();
    const props = { ...defaultProps, title };
    render(getComponentToRender(props));
    expect(screen.getByTitle(title)).toBeInTheDocument();
    expect(screen.getByTitle(title).tagName.toLowerCase()).toBe('button');
  });

  it('adds the className prop to the class list of the button', () => {
    const className = faker.lorem.word();
    const props = { ...defaultProps, className };
    render(getComponentToRender(props));
    const button = screen.getByTitle(defaultProps.title);
    expect(button).toHaveClass(className);
  });

  it('adds no additional class names when className does not have a value', () => {
    const className = null;
    const props = { ...defaultProps, className };
    render(getComponentToRender(props));
    const button = screen.getByTitle(defaultProps.title);
    expect(button.className.trim()).toBe('page-link');
  });

  it('invokes onClick when the button is clicked', () => {
    const onClick = jest.fn();
    const props = { ...defaultProps, onClick };
    render(getComponentToRender(props));
    const button = screen.getByTitle(defaultProps.title);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('sets the button text to [label] [icon] when swapLabelPosition is false', () => {
    const label = faker.random.alpha(5);
    const icon = faker.random.alpha(10);
    const props = { ...defaultProps, label, icon, swapLabelPosition: false };
    fontAwesome.FontAwesomeIcon.mockImplementation(({ icon }) => icon);
    render(getComponentToRender(props));
    const button = screen.getByTitle(defaultProps.title);
    expect(button).toHaveTextContent(`${label} ${icon}`);
  });

  it('sets the button text to [icon] [label] when swapLabelPosition is true', () => {
    const label = faker.random.alpha(5);
    const icon = faker.random.alpha(10);
    fontAwesome.FontAwesomeIcon.mockImplementation(({ icon }) => icon);
    const props = { ...defaultProps, label, icon, swapLabelPosition: true };
    render(getComponentToRender(props));
    const button = screen.getByTitle(defaultProps.title);

    expect(button).toHaveTextContent(`${icon} ${label}`);
  });

  it('does not render the icon when icon does not have a value', () => {
    const label = faker.random.alpha(5);
    const props = { ...defaultProps, label };
    render(getComponentToRender(props));
    const button = screen.getByTitle(defaultProps.title);
    expect(button).toHaveTextContent(`${label}`);
  });

  it('does not render the label when label does not have a value', () => {
    const icon = faker.random.alpha(10);
    const props = { ...defaultProps, icon };
    fontAwesome.FontAwesomeIcon.mockImplementation(({ icon }) => icon);
    render(getComponentToRender(props));
    const button = screen.getByTitle(defaultProps.title);
    expect(button).toHaveTextContent(`${icon}`);
  });
});
