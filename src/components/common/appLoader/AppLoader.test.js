/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';

import AppLoader from './AppLoader';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon'
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

describe('AppLoader', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppLoader />, div);
  });

  it('renders the pm logo', () => {
    render(<AppLoader />);
    expect(screen.getByAltText('Company logo')).toBeInTheDocument();
  });

  it('uses the regular compass icon for the spinner', () => {
    render(<AppLoader />);
    expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', 'far,compass');
  });
});
