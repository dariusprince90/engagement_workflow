/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import TableInfoMessage from './TableInfoMessage';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon',
  messageTableRow: 'message-table-row'
};

const defaultProps = {
  colSpan: 0,
  displayMessage: faker.datatype.string()
};

const getComponentToRender = (props) => {
  return <TableInfoMessage {...props} />;
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

jest.mock('./MessageTableRow', () => {
  return {
    __esModule: true,
    default: ({ colSpan, children }) => {
      return (
        <fake-message-table-row colSpan={colSpan} data-testid={testIds.messageTableRow}>
          {children}
        </fake-message-table-row>
      );
    }
  };
});

// **********************************************************************
// * unit tests

describe('TableInfoMessage', () => {
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

  it('sets the colSpan of the message table row to the colSpan prop', () => {
    const props = { ...defaultProps, colSpan: faker.datatype.number() };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.messageTableRow)).toHaveAttribute('colSpan', props.colSpan.toString());
  });

  it('renders the display message properly', () => {
    const props = { ...defaultProps, displayMessage: faker.datatype.string() };
    render(getComponentToRender(props));
    expect(screen.getByText(props.displayMessage)).toBeInTheDocument();
  });

  it('renders the icon properly', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', 'fas,circle-info');
  });
});
