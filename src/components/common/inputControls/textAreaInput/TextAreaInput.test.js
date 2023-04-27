import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';
import TextAreaInput from './TextAreaInput';

// **********************************************************************
// * constants

const testIds = {
  textAreaInput: 'textarea-input'
};

const defaultProps = {
  name: faker.datatype.string(),
  value: faker.lorem.words(),
  placeholder: faker.datatype.string(),
  disabled: faker.datatype.boolean(),
  rows: faker.datatype.number(),
  onChange: jest.fn()
};

const getComponentToRender = (props) => {
  return <TextAreaInput {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('TextAreaInput', function () {
  describe('rendering', () => {
    it('renders without crashing', function () {
      const textarea = document.createElement('textarea');
      ReactDOM.render(getComponentToRender(defaultProps), textarea);
    });

    it('renders with correct name attribute', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.textAreaInput)).toHaveAttribute('name', defaultProps.name);
    });

    it('renders with correct value attribute', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.textAreaInput).innerHTML).toEqual(defaultProps.value);
    });

    it('renders with correct placeholder attribute', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.textAreaInput)).toHaveAttribute('placeholder', defaultProps.placeholder);
    });

    it('is not disabled when disabled prop is false', () => {
      const props = { ...defaultProps, disabled: false };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.textAreaInput)).not.toBeDisabled();
    });

    it('is disabled when disabled prop is true', () => {
      const props = { ...defaultProps, disabled: true };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.textAreaInput)).toBeDisabled();
    });

    it('renders with correct rows attribute when rows prop is not defined', () => {
      const props = { ...defaultProps, rows: undefined };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.textAreaInput)).toHaveAttribute('rows', '6');
    });

    it('renders with correct rows attribute when rows prop is defined', () => {
      const props = { ...defaultProps, rows: faker.datatype.number() };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.textAreaInput)).toHaveAttribute('rows', `${props.rows}`);
    });
  });

  describe('functional', () => {
    it('invokes onChange function when textarea input onChange is fired', () => {
      // * ARRANGE
      const onChange = jest.fn();
      const props = { ...defaultProps, onChange };

      // * ACT
      render(getComponentToRender(props));
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.change(screen.getByTestId(testIds.textAreaInput), { target: { value: faker.datatype.string() } });

      // * ASSERT
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
