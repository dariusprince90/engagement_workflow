/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import CreateNewBillingScheduleTableRow from './CreateNewBillingScheduleTableRow';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon'
};

const defaultProps = {
  onClick: jest.fn()
};

const table = document.createElement('table');
const tableBody = document.createElement('tbody');

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <CreateNewBillingScheduleTableRow {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, className, fixedWidth, size, onClick }) => {
    const props = { icon, className, fixedWidth, size, onClick };
    return <fake-font-awesome-icon {...props} data-testid={testIds.fontAwesomeIcon} />;
  }
}));

// **********************************************************************
// * unit tests

describe('CreateNewBillingScheduleTableRow', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    table.appendChild(tableBody);
    document.body.appendChild(table);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    ReactDOM.render(getComponentToRender(defaultProps), tableBody);
  });

  it('has correct text', () => {
    const expectedText = 'Create New Billing Schedule';
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  describe('icon', () => {
    it('has correct icon prop', () => {
      const expected = 'fa-solid fa-circle-plus';
      render(getComponentToRender(defaultProps), { container: tableBody });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', expected);
    });

    it('has icon-clickable class', () => {
      const expected = 'icon-clickable';
      render(getComponentToRender(defaultProps), { container: tableBody });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('className', expected);
    });

    it('has fixedWidth prop', () => {
      render(getComponentToRender(defaultProps), { container: tableBody });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('fixedWidth');
    });

    it('has correct size prop', () => {
      const expected = 'xl';
      render(getComponentToRender(defaultProps), { container: tableBody });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('size', expected);
    });

    it('invokes onClick when clicked', () => {
      render(getComponentToRender(defaultProps), { container: tableBody });
      expect(defaultProps.onClick).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.fontAwesomeIcon));
      expect(defaultProps.onClick).toHaveBeenCalledOnce();
    });
  });
});
