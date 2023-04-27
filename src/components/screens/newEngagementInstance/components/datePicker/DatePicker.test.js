import ReactDOM from 'react-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import DatePicker from './DatePicker';

// **********************************************************************
// * constants

const testIds = {
  formGroup: 'form-group',
  customInput: 'custom-input',
  reactDatePicker: 'react-date-picker'
};

const defaultProps = {
  name: faker.random.alphaNumeric(10),
  label: faker.random.alphaNumeric(10),
  value: faker.date.future(),
  placeholder: faker.random.alphaNumeric(10),
  isRow: faker.datatype.boolean(),
  disabled: faker.datatype.boolean(),
  onChange: jest.fn()
};

// var must begin with "mock" to be used within jest.mock down below
// this var will be used as the arg passed from the date picker's onChange event
const mockDatePickerOnChangeDateArg = new Date();

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <DatePicker {...props} />;
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

jest.mock('./CustomInput', () => {
  return {
    __esModule: true,
    default: () => {
      return <fake-custom-input data-testid={testIds.customInput} />;
    }
  };
});

jest.mock('react-datepicker', () => ({
  __esModule: true,
  default: ({
    name,
    selected,
    placeholderText,
    disabled,
    onChange,
    className,
    dateFormat,
    isClearable,
    showPopperArrow,
    customInput
  }) => {
    const props = {
      name,
      selected,
      placeholderText,
      disabled,
      className,
      dateFormat,
      isClearable,
      showPopperArrow
    };
    return (
      <fake-react-datepicker
        {...props}
        onClick={() => onChange(mockDatePickerOnChangeDateArg)}
        data-testid={testIds.reactDatePicker}>
        {customInput}
      </fake-react-datepicker>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('DatePicker', () => {
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

  describe('ReactDatePicker', () => {
    describe('rendering', () => {
      it('renders inside the FormGroup', () => {
        render(getComponentToRender(defaultProps));
        const formGroup = screen.getByTestId(testIds.formGroup);
        expect(within(formGroup).getByTestId(testIds.reactDatePicker)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const name = faker.random.alphaNumeric(10);
        const expectedName = name;
        const props = { ...defaultProps, name };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.reactDatePicker)).toHaveAttribute('name', expectedName);
      });

      it('has correct selected prop', () => {
        const value = faker.date.future();
        const expectedSelected = value.toString();
        const props = { ...defaultProps, value };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.reactDatePicker)).toHaveAttribute('selected', expectedSelected);
      });

      it('has correct placeholderText prop', () => {
        const placeholder = faker.random.alphaNumeric(10);
        const expectedPlaceholderText = placeholder;
        const props = { ...defaultProps, placeholder };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.reactDatePicker)).toHaveAttribute('placeholderText', expectedPlaceholderText);
      });

      it('has correct disabled prop', () => {
        const disabled = faker.datatype.boolean();
        const expectedDisabled = disabled;
        const props = { ...defaultProps, disabled };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.reactDatePicker)).toHaveAttribute('disabled', expectedDisabled.toString());
      });

      it('has correct className prop', () => {
        const expectedClassName = 'form-control';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.reactDatePicker)).toHaveAttribute('className', expectedClassName);
      });

      it('has correct dateFormat prop', () => {
        const expectedDateFormat = 'MM/dd/yyyy';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.reactDatePicker)).toHaveAttribute('dateFormat', expectedDateFormat);
      });

      it('has correct isClearable prop', () => {
        const expectedIsClearable = false;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.reactDatePicker)).toHaveAttribute(
          'isClearable',
          expectedIsClearable.toString()
        );
      });

      it('has correct showPopperArrow prop', () => {
        const expectedShowPopperArrow = false;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.reactDatePicker)).toHaveAttribute(
          'showPopperArrow',
          expectedShowPopperArrow.toString()
        );
      });

      it('has correct customInput prop', () => {
        render(getComponentToRender(defaultProps));
        const reactDatePicker = screen.getByTestId(testIds.reactDatePicker);
        expect(within(reactDatePicker).getByTestId(testIds.customInput)).toBeInTheDocument();
      });
    });

    describe('functional', () => {
      it('invokes onChange (prop) when the onChange (react-date-picker) event is triggered', () => {
        const onChange = jest.fn();
        const props = { ...defaultProps, onChange };
        const expectedArgs = { target: { name: defaultProps.name, value: mockDatePickerOnChangeDateArg } };
        render(getComponentToRender(props));
        expect(onChange).not.toHaveBeenCalled();
        fireEvent.click(screen.getByTestId(testIds.reactDatePicker));
        expect(onChange).toHaveBeenCalledOnceWith(expectedArgs);
      });
    });
  });
});
