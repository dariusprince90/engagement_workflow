import ReactDOM from 'react-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import RadioButtonList from './RadioButtonList';

// **********************************************************************
// * constants

const testIds = {
  radioButtonListInput: 'radio-button-list-input',
  formGroup: 'form-group'
};

const defaultProps = {
  name: faker.random.alphaNumeric(10),
  label: faker.random.alphaNumeric(10),
  selectedValue: faker.random.alphaNumeric(10),
  options: [
    {
      label: faker.random.alphaNumeric(10),
      value: faker.random.alphaNumeric(10)
    }
  ],
  isLoading: faker.datatype.boolean(),
  loadingText: faker.random.alphaNumeric(10),
  horizontalItems: faker.datatype.boolean(),
  isRow: faker.datatype.boolean(),
  disabled: faker.datatype.boolean(),
  onChange: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <RadioButtonList {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('../../../../common/formGroup/FormGroup', () => {
  return {
    __esModule: true,
    default: ({ name, isRow, label, children }) => {
      const props = { name, isRow, label, children };
      return <fake-form-group data-testid={testIds.formGroup} {...props} />;
    }
  };
});

jest.mock('../../../../common/inputControls/radioButtonListInput/RadioButtonListInput', () => {
  return {
    __esModule: true,
    default: ({ name, options, horizontalItems, selectedValue, onChange, isLoading, loadingText, disabled }) => {
      const props = { name, options, horizontalItems, selectedValue, isLoading, loadingText, disabled };
      return <fake-radio-button-list-input data-testid={testIds.radioButtonListInput} {...props} onClick={onChange} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('RadioButtonList', function () {
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
      it('has correct name prop', () => {
        const name = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, name };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.formGroup)).toHaveAttribute('name', name);
      });

      it('has correct isRow prop', () => {
        const isRow = faker.datatype.boolean();
        const props = { ...defaultProps, isRow };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.formGroup)).toHaveAttribute('isRow', isRow.toString());
      });

      it('has correct label prop', () => {
        const label = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, label };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.formGroup)).toHaveAttribute('label', label);
      });
    });

    describe('RadioButtonListInput', () => {
      it('renders inside the FormGroup', () => {
        render(getComponentToRender(defaultProps));
        const formGroup = screen.getByTestId(testIds.formGroup);
        expect(within(formGroup).getByTestId(testIds.radioButtonListInput)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const name = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, name };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.radioButtonListInput)).toHaveAttribute('name', name);
      });

      it('has correct options prop', () => {
        const options = [
          {
            label: faker.random.alphaNumeric(10),
            value: faker.random.alphaNumeric(10)
          }
        ];
        const props = { ...defaultProps, options };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.radioButtonListInput)).toHaveAttribute('options', options.toString());
      });

      it('has correct horizontalItems prop', () => {
        const horizontalItems = faker.datatype.boolean();
        const props = { ...defaultProps, horizontalItems };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.radioButtonListInput)).toHaveAttribute(
          'horizontalItems',
          horizontalItems.toString()
        );
      });

      it('has correct selectedValue prop', () => {
        const selectedValue = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, selectedValue };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.radioButtonListInput)).toHaveAttribute('selectedValue', selectedValue);
      });

      it('has correct isLoading prop', () => {
        const isLoading = faker.datatype.boolean();
        const props = { ...defaultProps, isLoading };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.radioButtonListInput)).toHaveAttribute('isLoading', isLoading.toString());
      });

      it('has correct loadingText prop', () => {
        const loadingText = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, loadingText };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.radioButtonListInput)).toHaveAttribute('loadingText', loadingText);
      });

      it('has correct disabled prop', () => {
        const disabled = faker.datatype.boolean();
        const props = { ...defaultProps, disabled };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.radioButtonListInput)).toHaveAttribute('disabled', disabled.toString());
      });
    });
  });

  describe('functional', () => {
    it('invokes onChange when the RadioButton onChange event is triggered', function () {
      const onChange = jest.fn();
      const props = { ...defaultProps, onChange };
      render(getComponentToRender(props));
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.radioButtonListInput));
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
