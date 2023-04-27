import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import RadioButtonInput from './RadioButtonInput';

// **********************************************************************
// * constants

const testIds = {
  formCheckContainer: 'form-check-container',
  radioInput: 'radio-input',
  radioLabel: 'radio-label'
};

const defaultProps = {
  name: faker.random.alphaNumeric(10),
  id: faker.random.alphaNumeric(10),
  value: faker.random.alphaNumeric(10),
  label: faker.random.alphaNumeric(10),
  isSelected: faker.datatype.boolean(),
  isInline: faker.datatype.boolean(),
  disabled: faker.datatype.boolean(),
  onChange: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <RadioButtonInput {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('RadioButton', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('rendering', () => {
    it('renders without crashing', () => {
      const input = document.createElement('input');
      ReactDOM.render(getComponentToRender(defaultProps), input);
    });

    describe('form-check-container', () => {
      it('has class form-check-inline when isInline is true', () => {
        const isInline = true;
        const props = { ...defaultProps, isInline };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.formCheckContainer)).toHaveClass('form-check-inline');
      });

      it('does not have class form-check-inline when isInline is false', () => {
        const isInline = false;
        const props = { ...defaultProps, isInline };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.formCheckContainer)).not.toHaveClass('form-check-inline');
      });
    });

    describe('radio button input', () => {
      it('has correct id attribute', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.radioInput)).toHaveAttribute('id', defaultProps.id);
      });

      it('has correct name attribute', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.radioInput)).toHaveAttribute('name', defaultProps.name);
      });

      it('has correct value attribute', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.radioInput)).toHaveAttribute('value', defaultProps.value);
      });

      it('is checked when isSelected is true', () => {
        const isSelected = true;
        const props = { ...defaultProps, isSelected };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.radioInput)).toBeChecked();
      });

      it('is not checked when isSelected is false', () => {
        const isSelected = false;
        const props = { ...defaultProps, isSelected };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.radioInput)).not.toBeChecked();
      });

      it('has the disabled attribute when disabled is true', () => {
        const disabled = true;
        const props = { ...defaultProps, disabled };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.radioInput)).toHaveAttribute('disabled');
      });

      it('does not have the disabled attribute when disabled is false', () => {
        const disabled = false;
        const props = { ...defaultProps, disabled };
        render(getComponentToRender(props));
        expect(screen.queryByTestId(testIds.radioInput)).not.toHaveAttribute('disabled');
      });
    });

    describe('label', () => {
      it('has correct text', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.radioLabel)).toHaveTextContent(defaultProps.label);
      });
    });
  });

  describe('functional', () => {
    it('invokes onChange when the radio button is clicked and not already checked', function () {
      // * ARRANGE
      const onChange = jest.fn();
      const isSelected = false;
      const props = { ...defaultProps, isSelected, onChange };

      // * ACT
      render(getComponentToRender(props));
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.radioInput));

      // * ASSERT
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('does not invoke onChange when the radio button is clicked and it is already checked', function () {
      // * ARRANGE
      const onChange = jest.fn();
      const isSelected = true;
      const props = { ...defaultProps, isSelected, onChange };

      // * ACT
      render(getComponentToRender(props));
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.radioInput));

      // * ASSERT
      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
