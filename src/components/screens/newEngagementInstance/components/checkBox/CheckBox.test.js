import ReactDOM from 'react-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import Checkbox from './CheckBox';

// **********************************************************************
// * constants

const testIds = {
  checkBoxInput: 'check-box-input',
  formGroup: 'form-group'
};

const defaultProps = {
  label: faker.datatype.string(),
  name: faker.datatype.string(),
  onChange: jest.fn(),
  isChecked: true,
  disabled: false,
  isRow: faker.datatype.boolean()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <Checkbox {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('../../../../common/formGroup/FormGroup', () => {
  return {
    __esModule: true,
    default: ({ hideLabel, isRow, name, label, children }) => {
      const props = { hideLabel, isRow, name, label, children };
      return <fake-form-group data-testid={testIds.formGroup} {...props} />;
    }
  };
});

jest.mock('../../../../common/inputControls/checkBoxInput/CheckBoxInput', () => {
  return {
    __esModule: true,
    default: ({ name, label, isChecked, onChange, disabled }) => {
      const props = { name, label, isChecked, disabled };
      return <fake-check-box-input data-testid={testIds.checkBoxInput} {...props} onClick={onChange} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('CheckBox', function () {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('rendering', () => {
    it('should render without crashing', function () {
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

      describe('CheckBoxInput', () => {
        it('renders inside the FormGroup', () => {
          render(getComponentToRender(defaultProps));
          const formGroup = screen.getByTestId(testIds.formGroup);
          expect(within(formGroup).getByTestId(testIds.checkBoxInput)).toBeInTheDocument();
        });

        it('has correct name prop', () => {
          const name = faker.random.alphaNumeric(10);
          const props = { ...defaultProps, name };
          render(getComponentToRender(props));
          expect(screen.getByTestId(testIds.checkBoxInput)).toHaveAttribute('name', name);
        });

        it('has correct label prop', () => {
          const label = faker.random.alphaNumeric(10);
          const props = { ...defaultProps, label };
          render(getComponentToRender(props));
          expect(screen.getByTestId(testIds.checkBoxInput)).toHaveAttribute('label', label);
        });

        it('has correct isChecked prop', () => {
          const isChecked = faker.datatype.boolean();
          const props = { ...defaultProps, isChecked };
          render(getComponentToRender(props));
          expect(screen.getByTestId(testIds.checkBoxInput)).toHaveAttribute('isChecked', isChecked.toString());
        });

        it('has correct disabled prop', () => {
          const disabled = faker.datatype.boolean();
          const props = { ...defaultProps, disabled };
          render(getComponentToRender(props));
          expect(screen.getByTestId(testIds.checkBoxInput)).toHaveAttribute('disabled', disabled.toString());
        });
      });
    });
  });

  describe('functional', () => {
    it('invokes onChange when the CheckBoxInput onChange event is triggered', function () {
      const onChange = jest.fn();
      const props = { ...defaultProps, onChange };
      render(getComponentToRender(props));
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.checkBoxInput));
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
