/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';

import SuccessAlert from './SuccessAlert';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon'
};

const defaultProps = {};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <SuccessAlert {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }) => {
    return <fake-font-awesome-icon icon={JSON.stringify(icon)} data-testid={testIds.fontAwesomeIcon} />;
  }
}));

// **********************************************************************
// * unit tests

describe('SuccessAlert', () => {
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
    const expectedDisplayText = 'Your attachment has been added successfully!';
    render(getComponentToRender(defaultProps));
    expect(screen.getByText(expectedDisplayText)).toBeInTheDocument();
  });

  it('renders the icon properly', () => {
    const expectedIcon = ['fas', 'check-circle'];
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', JSON.stringify(expectedIcon));
  });
});
