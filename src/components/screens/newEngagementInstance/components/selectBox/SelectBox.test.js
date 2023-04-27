import ReactDOM from 'react-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import INPUT_GROUP_ADD_ON_TYPES from '../../../../../helpers/enums/inputGroupAddOnTypes';
import SelectBox from './SelectBox';

// **********************************************************************
// * constants

const testIds = {
  formGroup: 'form-group',
  inputGroup: 'input-group',
  selectInput: 'select-input'
};

const defaultProps = {
  name: faker.datatype.string(),
  label: faker.datatype.string(),
  value: faker.datatype.number(),
  defaultOption: faker.datatype.string(),
  options: [],
  isLoading: false,
  loadingText: faker.datatype.string(),
  prependAddOns: null,
  appendAddOns: null,
  isRow: false,
  disabled: false,
  onChange: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <SelectBox {...props} />;
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

jest.mock('../../../../common/inputControls/selectInput/SelectInput', () => {
  return {
    __esModule: true,
    default: ({ defaultOption, name, value, options, onChange, isLoading, loadingText, disabled, readOnly }) => {
      const props = {
        defaultOption,
        name,
        value,
        options: JSON.stringify(options),
        isLoading,
        loadingText,
        disabled,
        readOnly
      };
      return <fake-select-input data-testid={testIds.selectInput} {...props} onClick={onChange} />;
    }
  };
});

jest.mock('../inputGroup/InputGroup', () => {
  return {
    __esModule: true,
    default: ({ prependAddOns, appendAddOns, disabled, children }) => {
      return (
        <fake-inputGroup
          data-testid={testIds.inputGroup}
          disabled={disabled}
          prependAddOns={JSON.stringify(prependAddOns)}
          appendAddOns={JSON.stringify(appendAddOns)}
          children={children}
        />
      );
    }
  };
});

// **********************************************************************
// * unit tests

describe('SelectBox', () => {
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

    describe('InputGroup', () => {
      it('renders inside the FormGroup', () => {
        render(getComponentToRender(defaultProps));
        const formGroup = screen.getByTestId(testIds.formGroup);
        expect(within(formGroup).getByTestId(testIds.inputGroup)).toBeInTheDocument();
      });

      it('has correct disabled prop', () => {
        const disabled = faker.datatype.boolean();
        const props = { ...defaultProps, disabled };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.inputGroup)).toHaveAttribute('disabled', disabled.toString());
      });

      it('has correct prependAddOns prop', () => {
        const addOnTypes = Object.values(INPUT_GROUP_ADD_ON_TYPES);
        const index = faker.datatype.number({ min: 0, max: addOnTypes.length - 1 });
        const prependAddOns = [{ addOnType: addOnTypes[index] }];
        const props = { ...defaultProps, prependAddOns };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.inputGroup)).toHaveAttribute('prependAddOns', JSON.stringify(prependAddOns));
      });

      it('has correct appendAddOns prop', () => {
        const addOnTypes = Object.values(INPUT_GROUP_ADD_ON_TYPES);
        const index = faker.datatype.number({ min: 0, max: addOnTypes.length - 1 });
        const appendAddOns = [{ addOnType: addOnTypes[index] }];
        const props = { ...defaultProps, appendAddOns };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.inputGroup)).toHaveAttribute('appendAddOns', JSON.stringify(appendAddOns));
      });
    });

    describe('SelectInput', () => {
      it('renders inside the InputGroup', () => {
        render(getComponentToRender(defaultProps));
        const inputGroup = screen.getByTestId(testIds.inputGroup);
        expect(within(inputGroup).getByTestId(testIds.selectInput)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const name = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, name };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('name', name);
      });

      it('has correct value prop when value is defined', () => {
        const value = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, value };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('value', value.toString());
      });

      it('has correct value prop when value is null', () => {
        const props = { ...defaultProps, value: null };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('value', '');
      });

      it('has correct defaultOption prop', () => {
        const defaultOption = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, defaultOption };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('defaultOption', defaultOption);
      });

      it('has correct options props', () => {
        const options = [
          {
            value: faker.random.alphaNumeric(),
            text: faker.random.alphaNumeric()
          }
        ];
        const props = { ...defaultProps, options };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('options', JSON.stringify(options));
      });

      it('has correct isLoading prop', () => {
        const isLoading = faker.datatype.boolean();
        const props = { ...defaultProps, isLoading };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('isLoading', isLoading.toString());
      });

      it('has correct loadingText prop', () => {
        const loadingText = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, loadingText };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('loadingText', loadingText);
      });

      it('has disabled prop set to true when disabled is true and readOnly is false', () => {
        const disabled = true;
        const readOnly = false;
        const props = { ...defaultProps, disabled, readOnly };
        const expectedDisabled = true;
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('disabled', expectedDisabled.toString());
      });

      it('has disabled prop set to true when disabled is false and readOnly is true', () => {
        const disabled = false;
        const readOnly = true;
        const props = { ...defaultProps, disabled, readOnly };
        const expectedDisabled = true;
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('disabled', expectedDisabled.toString());
      });

      it('has disabled prop set to false when disabled and readOnly are false', () => {
        const disabled = false;
        const readOnly = false;
        const props = { ...defaultProps, disabled, readOnly };
        const expectedDisabled = false;
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('disabled', expectedDisabled.toString());
      });
    });
  });

  describe('functional', () => {
    it('invokes onChange when the SelectInput change event is triggered', function () {
      render(getComponentToRender(defaultProps));
      expect(defaultProps.onChange).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.selectInput));
      expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    });
  });
});
