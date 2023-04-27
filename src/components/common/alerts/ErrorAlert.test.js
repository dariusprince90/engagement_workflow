/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import ErrorAlert from './ErrorAlert';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon'
};

const defaultProps = {
  displayMessage: faker.datatype.string(),
  error: {
    message: faker.datatype.string(),
    traceId: faker.datatype.string()
  }
};

const getComponentToRender = (props) => {
  return <ErrorAlert {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: ({ icon }) => {
      return <fake-font-awesome-icon icon={icon} data-testid={testIds.fontAwesomeIcon} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('ErrorAlert', () => {
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

  it('renders the display message properly', () => {
    const props = { ...defaultProps, displayMessage: faker.datatype.string() };
    render(getComponentToRender(props));
    expect(screen.getByText(props.displayMessage)).toBeInTheDocument();
  });

  it('renders the error message properly', () => {
    const props = { ...defaultProps, error: { message: faker.datatype.string() } };
    const expectedErrorText = `error: ${props.error.message}`;
    render(getComponentToRender(props));
    expect(screen.getByText(expectedErrorText)).toBeInTheDocument();
  });

  it('renders the icon properly', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', 'fas,triangle-exclamation');
  });

  it('renders the traceId message when error.traceId has a value', () => {
    const props = { ...defaultProps, error: { ...defaultProps.error, traceId: faker.datatype.string() } };
    const expectedTraceIdText = `trace-id: ${props.error.traceId}`;
    render(getComponentToRender(props));
    expect(screen.getByText(expectedTraceIdText)).toBeInTheDocument();
  });

  it('does not render the traceId message when error.traceId does not have a value', () => {
    const props = { ...defaultProps, error: { ...defaultProps.error, traceId: undefined } };
    const expectedTraceIdText = `trace-id:`;
    render(getComponentToRender(props));
    expect(screen.queryByText(expectedTraceIdText, { exact: false })).not.toBeInTheDocument();
  });
});
