/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from '@faker-js/faker';

import TableRowOverlay, { OverlayTypes } from './TableRowOverlay';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon',
  rowOverlay: 'row-overlay',
  errorDetails: 'error-details'
};

const defaultProps = {
  type: OverlayTypes.info,
  message: faker.datatype.string(),
  errorDetailsMessage: faker.datatype.string()
};

const getComponentToRender = (props) => {
  return <TableRowOverlay {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: ({ icon, className }) => {
      return <fake-font-awesome-icon icon={icon} className={className} data-testid={testIds.fontAwesomeIcon} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('TableRowOverlay', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  it.each([{ type: OverlayTypes.info }, { type: OverlayTypes.error }])(
    'adds the class $type to the class of the row overlay when the type is $type',
    ({ type }) => {
      const props = { ...defaultProps, type };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.rowOverlay)).toHaveClass(type);
    }
  );

  it('renders the message in the row overlay', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.rowOverlay)).toHaveTextContent(defaultProps.message);
  });

  it('does not render the "click for details" message when it is not an error overlay', () => {
    const props = { ...defaultProps, type: OverlayTypes.info };
    render(getComponentToRender(props));
    expect(screen.queryByText('(click for details)')).not.toBeInTheDocument();
  });

  it('does not render the "click for details" message when it is an error overlay with no details', () => {
    const props = { ...defaultProps, type: OverlayTypes.error, errorDetailsMessage: null };
    render(getComponentToRender(props));
    expect(screen.queryByText('(click for details)')).not.toBeInTheDocument();
  });

  it('renders the "click for details" message when it is an error overlay with details', () => {
    const props = { ...defaultProps, type: OverlayTypes.error, errorDetailsMessage: faker.datatype.string() };
    render(getComponentToRender(props));
    expect(screen.getByText('(click for details)')).toBeInTheDocument();
  });

  it('does not render the error details when it is not an error overlay', () => {
    const props = { ...defaultProps, type: OverlayTypes.info };
    render(getComponentToRender(props));
    expect(screen.queryByTestId(testIds.errorDetails)).not.toBeInTheDocument();
  });

  it('does not render the error details when it is an error overlay with no details', () => {
    const props = { ...defaultProps, type: OverlayTypes.error, errorDetailsMessage: null };
    render(getComponentToRender(props));
    expect(screen.queryByTestId(testIds.errorDetails)).not.toBeInTheDocument();
  });

  it('renders the error details when it is an error overlay with details', () => {
    const props = { ...defaultProps, type: OverlayTypes.error, errorDetailsMessage: faker.datatype.string() };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.errorDetails)).toBeInTheDocument();
  });

  it('renders the error details message in the error details', () => {
    const props = { ...defaultProps, type: OverlayTypes.error, errorDetailsMessage: faker.datatype.string() };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.errorDetails)).toHaveTextContent(props.errorDetailsMessage);
  });

  it('adds the visible class to the error details when the row overlay is clicked', async () => {
    // * ARRANGE
    const user = userEvent.setup();
    const props = { ...defaultProps, type: OverlayTypes.error, errorDetailsMessage: faker.datatype.string() };
    const expectedClass = 'visible';

    // * ACT
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.errorDetails)).not.toHaveClass(expectedClass);
    await user.click(screen.getByTestId(testIds.rowOverlay));

    // * ASSERT
    expect(screen.getByTestId(testIds.errorDetails)).toHaveClass(expectedClass);
  });

  it('removes the visible class from the error details when the error details is clicked', async () => {
    // * ARRANGE
    const user = userEvent.setup();
    const props = { ...defaultProps, type: OverlayTypes.error, errorDetailsMessage: faker.datatype.string() };
    const expectedClass = 'visible';

    // * ACT
    render(getComponentToRender(props));
    await user.click(screen.getByTestId(testIds.rowOverlay));
    expect(screen.getByTestId(testIds.errorDetails)).toHaveClass(expectedClass);
    await user.click(screen.getByTestId(testIds.errorDetails));

    // * ASSERT
    expect(screen.getByTestId(testIds.errorDetails)).not.toHaveClass(expectedClass);
  });
});
