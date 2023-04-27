import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import TextInput from './TextInput';

// **********************************************************************
// * constants

const testIds = {
  textInput: 'text-input-component'
};

const defaultProps = {
  name: faker.datatype.string(),
  value: faker.datatype.string(),
  placeholder: faker.datatype.string(),
  disabled: faker.datatype.boolean(),
  onChange: jest.fn()
};

const getComponentToRender = (props) => {
  return <TextInput {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('TextInput', () => {
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

    it('renders with correct name attribute value', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.textInput)).toHaveAttribute('name', defaultProps.name);
    });

    it('renders with correct value attribute', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.textInput)).toHaveAttribute('value', defaultProps.value);
    });

    it('renders with correct placeholder attribute value', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.textInput)).toHaveAttribute('placeholder', defaultProps.placeholder);
    });

    it('renders with disabled attribute when disabled is true', () => {
      render(getComponentToRender({ ...defaultProps, disabled: true }));
      expect(screen.getByTestId(testIds.textInput)).toHaveAttribute('disabled');
    });

    it('renders without disabled attribute when disabled is false', () => {
      render(getComponentToRender({ ...defaultProps, disabled: false }));
      expect(screen.getByTestId(testIds.textInput)).not.toHaveAttribute('disabled');
    });

    it('renders without disabled attribute when disabled is not defined', () => {
      render(getComponentToRender({ ...defaultProps, disabled: undefined }));
      expect(screen.getByTestId(testIds.textInput)).not.toHaveAttribute('disabled');
    });

    it('renders with readOnly attribute when readOnly is true', () => {
      render(getComponentToRender({ ...defaultProps, readOnly: true }));
      expect(screen.getByTestId(testIds.textInput)).toHaveAttribute('readOnly');
    });

    it('renders without readOnly attribute when readOnly is false', () => {
      render(getComponentToRender({ ...defaultProps, readOnly: false }));
      expect(screen.getByTestId(testIds.textInput)).not.toHaveAttribute('readOnly');
    });

    it('renders without readOnly attribute when readOnly is not defined', () => {
      render(getComponentToRender({ ...defaultProps, readOnly: undefined }));
      expect(screen.getByTestId(testIds.textInput)).not.toHaveAttribute('readOnly');
    });
  });

  describe('functional', () => {
    it('invokes onChange function when text input onChange is fired', () => {
      // * ARRANGE
      const onChange = jest.fn();
      const props = { ...defaultProps, onChange };

      // * ACT
      render(getComponentToRender(props));
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.change(screen.getByTestId(testIds.textInput), { target: { value: faker.datatype.string() } });

      // * ASSERT
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
