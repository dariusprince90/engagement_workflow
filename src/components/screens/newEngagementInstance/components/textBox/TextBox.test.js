import ReactDOM from 'react-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import INPUT_GROUP_ADD_ON_TYPES from '../../../../../helpers/enums/inputGroupAddOnTypes';
import TextBox from './TextBox';

// **********************************************************************
// * constants

const testIds = {
  formGroup: 'form-group',
  inputGroup: 'input-group',
  textInput: 'text-input'
};

const defaultProps = {
  name: faker.random.alphaNumeric(10),
  label: faker.random.alphaNumeric(10),
  value: faker.random.alphaNumeric(10),
  placeholder: faker.random.alphaNumeric(10),
  prependAddOns: null,
  appendAddOns: null,
  isRow: faker.datatype.boolean(),
  disabled: faker.datatype.boolean(),
  onChange: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <TextBox {...props} />;
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

jest.mock('../../../../common/inputControls/textInput/TextInput', () => {
  return {
    __esModule: true,
    default: ({ name, value, placeholder, disabled, readOnly, onChange }) => {
      const props = { name, value, placeholder, disabled, readOnly };
      return <fake-text-input data-testid={testIds.textInput} {...props} onClick={onChange} />;
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

describe('TextBox', () => {
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

    describe('TextInput', () => {
      it('renders inside the InputGroup', () => {
        render(getComponentToRender(defaultProps));
        const inputGroup = screen.getByTestId(testIds.inputGroup);
        expect(within(inputGroup).getByTestId(testIds.textInput)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const name = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, name };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.textInput)).toHaveAttribute('name', name);
      });

      it('has correct value prop', () => {
        const value = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, value };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.textInput)).toHaveAttribute('value', value);
      });

      it('has correct placeholder prop', () => {
        const placeholder = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, placeholder };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.textInput)).toHaveAttribute('placeholder', placeholder);
      });

      it('has correct disabled prop', () => {
        const disabled = faker.datatype.boolean();
        const props = { ...defaultProps, disabled };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.textInput)).toHaveAttribute('disabled', disabled.toString());
      });

      it('has correct readOnly prop', () => {
        const readOnly = faker.datatype.boolean();
        const props = { ...defaultProps, readOnly };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.textInput)).toHaveAttribute('readOnly', readOnly.toString());
      });
    });
  });

  describe('functional', () => {
    it('invokes onChange when the textInput onChange event is triggered', function () {
      const onChange = jest.fn();
      const props = { ...defaultProps, onChange };
      render(getComponentToRender(props));
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.textInput));
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
