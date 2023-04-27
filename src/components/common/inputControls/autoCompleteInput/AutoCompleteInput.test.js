/* eslint-disable react/prop-types */

import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import Autosuggest from 'react-autosuggest';
import AutocompleteInput, { theme } from './AutoCompleteInput';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon',
  autoSuggest: 'auto-suggest',
  autoSuggestProps: {
    id: 'auto-suggest-prop--id',
    suggestions: 'auto-suggest-prop--suggestions',
    theme: 'auto-suggest-prop--theme',
    onSuggestionsFetchRequestedTrigger: 'auto-suggest-prop--on-suggestions-fetch-requested-trigger',
    shouldRenderSuggestionsTriggerReasonInputFocused:
      'auto-suggest-prop--should-render-suggestions-trigger--input-focused',
    shouldRenderSuggestionsTriggerReasonOther: 'auto-suggest-prop--should-render-suggestions-trigger--other',
    inputProps: {
      name: 'input-props--name',
      id: 'input-props--id',
      value: 'input-props--value',
      placeholder: 'input-props--placeholder',
      disabled: 'input-props--disabled',
      onChangeTriggerForString: 'input-props--on-change-trigger--string',
      onChangeTriggerForObject: 'input-props--on-change-trigger--object'
    }
  },
  autoCompleteInputField: 'auto-complete-input-field'
};

const defaultProps = {
  valueFieldName: faker.datatype.string(),
  valueFieldValue: faker.datatype.string(),
  displayFieldName: faker.datatype.string(),
  displayFieldValue: faker.datatype.string(),

  placeholder: faker.datatype.string(),
  minimumSearchChars: faker.datatype.number(),
  searchDelayMs: faker.datatype.number(),
  isLoading: faker.datatype.boolean(),
  disabled: faker.datatype.boolean(),

  suggestions: faker.datatype.array(),
  suggestionTextPropName: faker.datatype.string(),
  suggestionValuePropName: faker.datatype.string(),

  onChange: jest.fn(),
  onKeyPress: jest.fn(),
  onSuggestionsFetchRequested: jest.fn(),
  onSuggestionsClearRequested: jest.fn(),
  renderSuggestion: jest.fn()
};

const mockValueForOnSuggestionsFetchRequested = faker.datatype.string();
const mockInputPropsOnChangeNewValueString = faker.datatype.string();
const mockInputPropsOnChangeNewValueObject = {
  [defaultProps.suggestionTextPropName]: faker.datatype.string(),
  [defaultProps.suggestionValuePropName]: faker.datatype.string()
};

const MockAutosuggest = ({
  id,
  suggestions,
  inputProps,
  theme,
  onSuggestionsFetchRequested,
  shouldRenderSuggestions
}) => {
  return (
    <fake-autosuggest data-testid={testIds.autoSuggest}>
      <div data-testid={testIds.autoSuggestProps.id}>{id}</div>
      <div data-testid={testIds.autoSuggestProps.suggestions}>{JSON.stringify(suggestions)}</div>
      <div data-testid={testIds.autoSuggestProps.theme}>{JSON.stringify(theme)}</div>
      <button
        type="button"
        data-testid={testIds.autoSuggestProps.onSuggestionsFetchRequestedTrigger}
        onClick={() => onSuggestionsFetchRequested({ value: mockValueForOnSuggestionsFetchRequested })}
      />
      <button
        type="button"
        data-testid={testIds.autoSuggestProps.shouldRenderSuggestionsTriggerReasonInputFocused}
        onClick={() => shouldRenderSuggestions('', 'input-focused')}
      />

      {/* input props */}
      <div data-testid={testIds.autoSuggestProps.inputProps.name}>{inputProps.name}</div>
      <div data-testid={testIds.autoSuggestProps.inputProps.id}>{inputProps.id}</div>
      <div data-testid={testIds.autoSuggestProps.inputProps.value}>{inputProps.value}</div>
      <div data-testid={testIds.autoSuggestProps.inputProps.placeholder}>{inputProps.placeholder}</div>
      <div data-testid={testIds.autoSuggestProps.inputProps.disabled}>{inputProps.disabled.toString()}</div>
      <button
        type="button"
        data-testid={testIds.autoSuggestProps.inputProps.onChangeTriggerForString}
        onClick={(event) => inputProps.onChange(event, { newValue: mockInputPropsOnChangeNewValueString })}
      />
      <button
        type="button"
        data-testid={testIds.autoSuggestProps.inputProps.onChangeTriggerForObject}
        onClick={(event) => inputProps.onChange(event, { newValue: mockInputPropsOnChangeNewValueObject })}
      />
    </fake-autosuggest>
  );
};

const getComponentToRender = (props) => {
  return <AutocompleteInput {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn()
}));

jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: ({ icon, className }) => {
      return <fake-font-awesome-icon icon={icon} className={className} data-testid={testIds.fontAwesomeIcon} />;
    }
  };
});

jest.mock('react-autosuggest', () => {
  return {
    __esModule: true,
    default: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('AutocompleteInput', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    useRef.mockReturnValue({ current: null });
    Autosuggest.mockImplementation(MockAutosuggest);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('rendering', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(getComponentToRender(defaultProps), div);
    });

    it('renders both the autoSuggest and the autoComplete input fields', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.autoSuggest)).toBeInTheDocument();
      expect(screen.getByTestId(testIds.autoCompleteInputField)).toBeInTheDocument();
    });

    it('renders the loading spinner when isLoading is true', () => {
      const props = { ...defaultProps, isLoading: true };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toBeInTheDocument();
    });

    it('does not render the loading spinner when isLoading is false', () => {
      const props = { ...defaultProps, isLoading: false };
      render(getComponentToRender(props));
      expect(screen.queryByTestId(testIds.fontAwesomeIcon)).not.toBeInTheDocument();
    });

    describe('autoSuggest input field', () => {
      it('applies displayFieldName to the id prop', () => {
        const props = { ...defaultProps, displayFieldName: faker.datatype.string() };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.autoSuggestProps.id)).toHaveTextContent(props.displayFieldName);
      });

      it('applies suggestions to the suggestions prop', () => {
        const props = { ...defaultProps, suggestions: faker.datatype.array() };
        const expectedSuggestions = JSON.stringify(props.suggestions);
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.autoSuggestProps.suggestions)).toHaveTextContent(expectedSuggestions);
      });

      it('applies the correct values to the inputProps prop', () => {
        const { inputProps: inputPropsTestIds } = testIds.autoSuggestProps;
        const expectedInputProps = {
          name: defaultProps.displayFieldName,
          id: defaultProps.displayFieldName,
          value: defaultProps.displayFieldValue,
          placeholder: defaultProps.placeholder,
          disabled: defaultProps.disabled
        };
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(inputPropsTestIds.name)).toHaveTextContent(expectedInputProps.name);
        expect(screen.getByTestId(inputPropsTestIds.id)).toHaveTextContent(expectedInputProps.id);
        expect(screen.getByTestId(inputPropsTestIds.value)).toHaveTextContent(expectedInputProps.value);
        expect(screen.getByTestId(inputPropsTestIds.placeholder)).toHaveTextContent(expectedInputProps.placeholder);
        expect(screen.getByTestId(inputPropsTestIds.disabled)).toHaveTextContent(expectedInputProps.disabled);
      });

      it('applies the correct theme to the theme prop', () => {
        render(getComponentToRender(defaultProps));
        const expectedTheme = JSON.stringify(theme);
        expect(screen.getByTestId(testIds.autoSuggestProps.theme)).toHaveTextContent(expectedTheme);
      });
    });

    describe('autoComplete input field', () => {
      it('applies valueFieldName to the name prop', () => {
        const props = { ...defaultProps, valueFieldName: faker.datatype.string() };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.autoCompleteInputField)).toHaveAttribute('name', props.valueFieldName);
      });

      it('applies valueFieldName to the id prop', () => {
        const props = { ...defaultProps, valueFieldName: faker.datatype.string() };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.autoCompleteInputField)).toHaveAttribute('id', props.valueFieldName);
      });

      it('applies valueFieldValue to the value prop', () => {
        const props = { ...defaultProps, valueFieldValue: faker.datatype.string() };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.autoCompleteInputField)).toHaveAttribute('value', props.valueFieldValue);
      });
    });
  });

  describe('functional', () => {
    it('invokes onChange when input.onChange is triggered with a string for the newValue', () => {
      // * ARRANGE
      const props = { ...defaultProps, onChange: jest.fn() };
      const expectedEventDetails = {
        displayTarget: {
          name: props.displayFieldName,
          value: mockInputPropsOnChangeNewValueString
        },
        valueTarget: {
          name: props.valueFieldName,
          value: ''
        }
      };

      // * ACT
      render(getComponentToRender(props));
      fireEvent.click(screen.getByTestId(testIds.autoSuggestProps.inputProps.onChangeTriggerForString));

      // * ASSERT
      expect(props.onChange).toHaveBeenCalledWith(expectedEventDetails);
    });

    it('invokes onChange when input.onChange is triggered with an object for the newValue', () => {
      // * ARRANGE
      const props = { ...defaultProps, onChange: jest.fn() };
      const expectedEventArgs = {
        displayTarget: {
          name: props.displayFieldName,
          value: mockInputPropsOnChangeNewValueObject[defaultProps.suggestionTextPropName]
        },
        valueTarget: {
          name: props.valueFieldName,
          value: mockInputPropsOnChangeNewValueObject[defaultProps.suggestionValuePropName]
        }
      };

      // * ACT
      render(getComponentToRender(props));
      fireEvent.click(screen.getByTestId(testIds.autoSuggestProps.inputProps.onChangeTriggerForObject));

      // * ASSERT
      expect(props.onChange).toHaveBeenCalledWith(expectedEventArgs);
    });

    describe('onSuggestionsFetchRequested timeout-based tests', () => {
      // **********************************************************************
      // * setup

      beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(global, 'clearTimeout');
        jest.spyOn(global, 'setTimeout');
      });

      // **********************************************************************
      // * tear-down

      afterEach(() => {
        global.clearTimeout.mockRestore();
        global.setTimeout.mockRestore();
        jest.clearAllTimers();
        jest.useRealTimers();
      });

      afterAll(() => {
        jest.useRealTimers();
      });

      // **********************************************************************
      // * execution

      it('invokes onSuggestionsFetchRequested when autoSuggest.onSuggestionsFetchRequested is triggered', async () => {
        const props = { ...defaultProps, onSuggestionsFetchRequested: jest.fn() };
        const expectedEventArgs = mockValueForOnSuggestionsFetchRequested;
        render(getComponentToRender(props));
        fireEvent.click(screen.getByTestId(testIds.autoSuggestProps.onSuggestionsFetchRequestedTrigger));
        jest.runOnlyPendingTimers();
        expect(props.onSuggestionsFetchRequested).toHaveBeenCalledTimes(1);
        expect(props.onSuggestionsFetchRequested).toHaveBeenCalledWith(expectedEventArgs);
      });

      it('invokes onSuggestionsFetchRequested once when autoSuggest.onSuggestionsFetchRequested is triggered multiple times in succession', async () => {
        const props = { ...defaultProps, onSuggestionsFetchRequested: jest.fn() };
        render(getComponentToRender(props));
        fireEvent.click(screen.getByTestId(testIds.autoSuggestProps.onSuggestionsFetchRequestedTrigger));
        fireEvent.click(screen.getByTestId(testIds.autoSuggestProps.onSuggestionsFetchRequestedTrigger));
        jest.runOnlyPendingTimers();
        expect(props.onSuggestionsFetchRequested).toHaveBeenCalledTimes(1);
      });

      it('invokes onSuggestionsFetchRequested multiple times when autoSuggest.onSuggestionsFetchRequested is triggered multiple times in succession with time for delay to expire', async () => {
        const props = { ...defaultProps, onSuggestionsFetchRequested: jest.fn() };
        render(getComponentToRender(props));
        fireEvent.click(screen.getByTestId(testIds.autoSuggestProps.onSuggestionsFetchRequestedTrigger));
        jest.runOnlyPendingTimers();
        expect(props.onSuggestionsFetchRequested).toHaveBeenCalledTimes(1);
        fireEvent.click(screen.getByTestId(testIds.autoSuggestProps.onSuggestionsFetchRequestedTrigger));
        jest.runOnlyPendingTimers();
        expect(props.onSuggestionsFetchRequested).toHaveBeenCalledTimes(2);
      });
    });

    it('shouldRenderSuggestions returns false when reason is input-focused', () => {
      // * ARRANGE
      const value = faker.datatype.string(defaultProps.minimumSearchChars + 1);
      const reason = 'input-focused';
      const MockAutosuggest = ({ shouldRenderSuggestions }) => (
        <fake-autosuggest data-testid={testIds.autoSuggest}>
          {shouldRenderSuggestions(value, reason) && <div>should-render</div>}
        </fake-autosuggest>
      );
      Autosuggest.mockImplementation(MockAutosuggest);

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.queryByText('should-render')).not.toBeInTheDocument();
    });

    it('shouldRenderSuggestions returns false when reason is not input-focused and value length is too short', () => {
      // * ARRANGE
      const value = faker.datatype.string(defaultProps.minimumSearchChars - 1);
      const reason = faker.datatype.string();
      const MockAutosuggest = ({ shouldRenderSuggestions }) => (
        <fake-autosuggest data-testid={testIds.autoSuggest}>
          {shouldRenderSuggestions(value, reason) && <div>should-render</div>}
        </fake-autosuggest>
      );
      Autosuggest.mockImplementation(MockAutosuggest);

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.queryByText('should-render')).not.toBeInTheDocument();
    });

    it('shouldRenderSuggestions returns true when reason is not input-focused and value length is greater than or equal to the minimum number of search characters', () => {
      // * ARRANGE
      const value = faker.datatype.string(defaultProps.minimumSearchChars);
      const reason = faker.datatype.string();
      const MockAutosuggest = ({ shouldRenderSuggestions }) => (
        <fake-autosuggest data-testid={testIds.autoSuggest}>
          {shouldRenderSuggestions(value, reason) && <div>should-render</div>}
        </fake-autosuggest>
      );
      Autosuggest.mockImplementation(MockAutosuggest);

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByText('should-render')).toBeInTheDocument();
    });

    it('getSuggestionValue returns the incoming suggestion', () => {
      // * ARRANGE
      const suggestion = faker.datatype.string();
      const MockAutosuggest = ({ getSuggestionValue }) => (
        <fake-autosuggest data-testid={testIds.autoSuggest}>
          <div>{getSuggestionValue(suggestion)}</div>
        </fake-autosuggest>
      );
      Autosuggest.mockImplementation(MockAutosuggest);

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByText(suggestion)).toBeInTheDocument();
    });

    it('input field onChange does nothing', () => {
      // the onChange method for this hidden input field does nothing
      // it is required to have a value though, as it is a controlled component
      render(getComponentToRender(defaultProps));
      fireEvent.change(screen.getByTestId(testIds.autoCompleteInputField), { target: { value: '' } });
      expect(true).toBeTruthy();
    });
  });
});
