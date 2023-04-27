/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

import CustomInput from './CustomInput';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon'
};

const defaultProps = {
  onClick: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <CustomInput {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }) => {
    const props = { icon };
    return <fake-font-awesome-icon {...props} data-testid={testIds.fontAwesomeIcon} />;
  }
}));

// **********************************************************************
// * unit tests

describe('CustomInput', () => {
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

  it('renders a proper input group with a calendar icon appended to the input', () => {
    const tree = renderer.create(getComponentToRender(defaultProps)).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('invokes onClick when the icon is clicked', () => {
    const onClick = jest.fn();
    const props = { ...defaultProps, onClick };
    render(getComponentToRender(props));
    expect(onClick).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId(testIds.fontAwesomeIcon));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
