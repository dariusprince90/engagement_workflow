import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import TextArea from './TextArea';

// **********************************************************************
// * constants

const testIds = {
  formGroup: 'form-group',
  textAreaInput: 'text-area-input'
};

const defaultProps = {
  name: faker.random.alphaNumeric(10),
  label: faker.random.alphaNumeric(10),
  value: faker.random.alphaNumeric(10),
  placeholder: faker.random.alphaNumeric(10),
  rows: faker.datatype.number(),
  isRow: faker.datatype.boolean(),
  disabled: faker.datatype.boolean(),
  onChange: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <TextArea {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('../../../../common/formGroup/FormGroup', () => {
  return {
    __esModule: true,
    default: ({ name, label, isRow, children }) => {
      const props = { name, label, isRow, children };
      return <fake-form-group data-testid={testIds.formGroup} {...props} />;
    }
  };
});

jest.mock('../../../../common/inputControls/textAreaInput/TextAreaInput', () => {
  return {
    __esModule: true,
    default: ({ name, value, placeholder, disabled, rows, onChange }) => {
      const props = { name, value, placeholder, disabled, rows };
      return <fake-text-area data-testid={testIds.textAreaInput} {...props} onClick={onChange} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('TextArea', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(getComponentToRender(defaultProps), div);
    });

    describe('FormGroup', () => {
      it('has correct isRow prop', () => {
        const isRow = faker.datatype.boolean();
        const props = { ...defaultProps, isRow };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.formGroup)).toHaveAttribute('isRow', isRow.toString());
      });

      it('has correct name prop', () => {
        const name = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, name };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.formGroup)).toHaveAttribute('name', name);
      });

      it('has correct label prop', () => {
        const label = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, label };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.formGroup)).toHaveAttribute('label', label);
      });
    });

    describe('TextAreaInput', () => {
      it('renders inside the FormGroup', () => {
        render(getComponentToRender(defaultProps));
        const formGroup = screen.getByTestId(testIds.formGroup);
        expect(within(formGroup).getByTestId(testIds.textAreaInput)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const name = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, name };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.textAreaInput)).toHaveAttribute('name', name);
      });

      it('has correct value prop', () => {
        const value = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, value };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.textAreaInput)).toHaveAttribute('value', value);
      });

      it('has correct placeholder prop', () => {
        const placeholder = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, placeholder };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.textAreaInput)).toHaveAttribute('placeholder', placeholder);
      });

      it('has correct disabled prop', () => {
        const disabled = faker.datatype.boolean();
        const props = { ...defaultProps, disabled };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.textAreaInput)).toHaveAttribute('disabled', disabled.toString());
      });

      it('has correct rows prop', () => {
        const rows = faker.datatype.number();
        const props = { ...defaultProps, rows };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.textAreaInput)).toHaveAttribute('rows', rows.toString());
      });
    });
  });

  describe('functional', () => {
    it('invokes onChange when the textAreaInput onChange event is triggered', () => {
      const onChange = jest.fn();
      const props = { ...defaultProps, onChange };
      render(getComponentToRender(props));
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.textAreaInput));
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
