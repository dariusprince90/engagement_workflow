import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import RadioButtonListInput from './RadioButtonListInput';

// **********************************************************************
// * constants

const testIds = {
  radioButtonInput: 'radio-button-input',
  onChangeTriggerElement: 'on-change-trigger'
};

const defaultProps = {
  name: faker.random.alphaNumeric(10),
  selectedValue: faker.random.alphaNumeric(10),
  options: [],
  isLoading: faker.datatype.boolean(),
  loadingText: faker.random.alphaNumeric(10),
  horizontalItems: faker.datatype.boolean(),
  disabled: faker.datatype.boolean(),
  onChange: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <RadioButtonListInput {...props} />;
};

// **********************************************************************
// * mocking external dependencies

jest.mock('../radioButtonInput/RadioButtonInput', () => ({
  __esModule: true,
  default: ({ id, name, value, label, onChange, isSelected, isInline, disabled }) => {
    const props = { id, name, value, label, isSelected, isInline, disabled };
    return <fake-radio-button-input {...props} onClick={onChange} data-testid={testIds.radioButtonInput} />;
  }
}));

// **********************************************************************
// * unit tests

describe('RadioButtonListInput', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('when isLoading is false', () => {
    const isLoading = false;
    describe('rendering', () => {
      it('renders a RadioButtonInput component for each option in the collection', () => {
        const options = [
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) },
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) },
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) }
        ];
        const props = { ...defaultProps, isLoading, options };
        render(getComponentToRender(props));
        expect(screen.getAllByTestId(testIds.radioButtonInput).length).toBe(options.length);
      });

      it('passes correct id to each RadioButtonInput component', () => {
        // * ARRANGE
        const options = [
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) },
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) },
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) }
        ];
        const props = { ...defaultProps, isLoading, options };

        // * ACT
        render(getComponentToRender(props));

        // * ASSERT
        const radioButtons = screen.getAllByTestId(testIds.radioButtonInput);
        for (let index = 0; index < radioButtons.length; index++) {
          const radioButton = radioButtons[index];
          const expectedId = `${defaultProps.name}_${index}`;
          expect(radioButton).toHaveAttribute('id', expectedId);
        }
      });

      it('passes correct name to each RadioButtonInput component', () => {
        // * ARRANGE
        const options = [
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) },
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) },
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) }
        ];
        const props = { ...defaultProps, isLoading, options };
        const expectedName = props.name;

        // * ACT
        render(getComponentToRender(props));

        // * ASSERT
        const radioButtons = screen.getAllByTestId(testIds.radioButtonInput);
        for (let index = 0; index < radioButtons.length; index++) {
          const radioButton = radioButtons[index];
          expect(radioButton).toHaveAttribute('name', expectedName);
        }
      });

      it('passes correct value to each RadioButtonInput component', () => {
        // * ARRANGE
        const options = [
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) },
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) },
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) }
        ];
        const props = { ...defaultProps, isLoading, options };

        // * ACT
        render(getComponentToRender(props));

        // * ASSERT
        const radioButtons = screen.getAllByTestId(testIds.radioButtonInput);
        for (let index = 0; index < radioButtons.length; index++) {
          const radioButton = radioButtons[index];
          const expectedValue = options[index].value;
          expect(radioButton).toHaveAttribute('value', expectedValue);
        }
      });

      it('passes correct label to each RadioButtonInput component', () => {
        // * ARRANGE
        const options = [
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) },
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) },
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) }
        ];
        const props = { ...defaultProps, isLoading, options };

        // * ACT
        render(getComponentToRender(props));

        // * ASSERT
        const radioButtons = screen.getAllByTestId(testIds.radioButtonInput);
        for (let index = 0; index < radioButtons.length; index++) {
          const radioButton = radioButtons[index];
          const expectedLabel = options[index].label;
          expect(radioButton).toHaveAttribute('label', expectedLabel);
        }
      });

      it('passes correct isSelected to each RadioButtonInput component', () => {
        // * ARRANGE
        const selectedValue = faker.random.alphaNumeric(10);
        const options = [
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) },
          { label: faker.random.alphaNumeric(10), value: selectedValue },
          { label: faker.random.alphaNumeric(10), value: faker.datatype.number() }
        ];
        const props = { ...defaultProps, isLoading, options, selectedValue };

        // * ACT
        render(getComponentToRender(props));

        // * ASSERT
        const radioButtons = screen.getAllByTestId(testIds.radioButtonInput);
        for (let index = 0; index < radioButtons.length; index++) {
          const radioButton = radioButtons[index];
          const expectedIsSelected = options[index].value.toString() === selectedValue.toString();
          expect(radioButton).toHaveAttribute('isSelected', expectedIsSelected.toString());
        }
      });

      it('passes correct disabled to each RadioButtonInput component', () => {
        // * ARRANGE
        const disabled = faker.datatype.boolean();

        const options = [
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) },
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) },
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) }
        ];
        const props = { ...defaultProps, isLoading, options, disabled };

        // * ACT
        render(getComponentToRender(props));

        // * ASSERT
        const radioButtons = screen.getAllByTestId(testIds.radioButtonInput);
        for (let index = 0; index < radioButtons.length; index++) {
          const radioButton = radioButtons[index];
          expect(radioButton).toHaveAttribute('disabled', disabled.toString());
        }
      });

      it('does not render the loading text', () => {
        const loadingText = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, isLoading, loadingText };
        render(getComponentToRender(props));
        expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
      });
    });

    describe('functional', () => {
      it('invokes onChange when RadioButtonInput change event is triggered', () => {
        const options = [{ label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) }];
        const props = { ...defaultProps, isLoading, options };
        render(getComponentToRender(props));
        expect(defaultProps.onChange).not.toHaveBeenCalled();
        fireEvent.click(screen.getByTestId(testIds.radioButtonInput));
        expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when isLoading is true', () => {
    const isLoading = true;

    describe('rendering', () => {
      it('does not renders any RadioButtonInput components when isLoading is true', () => {
        const options = [
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) },
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) },
          { label: faker.random.alphaNumeric(10), value: faker.random.alphaNumeric(10) }
        ];
        const props = { ...defaultProps, isLoading, options };
        render(getComponentToRender(props));
        expect(screen.queryAllByTestId(testIds.radioButtonInput).length).toBe(0);
      });

      it('renders the loading text', () => {
        const loadingText = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, isLoading, loadingText };
        render(getComponentToRender(props));
        expect(screen.getByText(loadingText)).toBeInTheDocument();
      });
    });
  });
});
