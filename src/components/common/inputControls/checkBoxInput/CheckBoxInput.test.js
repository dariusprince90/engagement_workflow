/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import CheckBoxInput from './CheckBoxInput';

// **********************************************************************
// * constants

const testIds = {
  input: 'input',
  label: 'label'
};

const defaultProps = {
  name: faker.datatype.string(),
  label: faker.datatype.string(),
  isChecked: faker.datatype.boolean(),
  disabled: faker.datatype.boolean(),
  onChange: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <CheckBoxInput {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('CheckBoxInput', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('rendering', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(getComponentToRender(defaultProps), div);
    });

    it('sets the input type attribute to checkbox', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.input)).toHaveAttribute('type', 'checkbox');
    });

    it('sets the input id attribute with the name prop', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.input)).toHaveAttribute('id', defaultProps.name);
    });

    it('sets the input name attribute with the name prop', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.input)).toHaveAttribute('name', defaultProps.name);
    });

    it('adds the checked attribute to the input when isChecked is true', () => {
      const isChecked = true;
      const props = { ...defaultProps, isChecked };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.input)).toHaveAttribute('checked');
    });

    it('does not adds the checked attribute to the input when isChecked is false', () => {
      const isChecked = false;
      const props = { ...defaultProps, isChecked };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.input)).not.toHaveAttribute('checked');
    });

    it('adds the disabled attribute to the input when disabled is true', () => {
      const disabled = true;
      const props = { ...defaultProps, disabled };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.input)).toHaveAttribute('disabled');
    });

    it('does not adds the disabled attribute to the input when disabled is false', () => {
      const disabled = false;
      const props = { ...defaultProps, disabled };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.input)).not.toHaveAttribute('disabled');
    });
  });

  describe('functional', () => {
    it('invokes onChange when the input onChange event is triggered', () => {
      const onChange = jest.fn();
      const props = { ...defaultProps, onChange };
      render(getComponentToRender(props));
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.input));
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
