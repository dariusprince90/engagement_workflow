import { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import AutoComplete from './AutoComplete';

// **********************************************************************
// * constants

const testIds = {
  formGroup: 'form-group',
  autoCompleteInput: 'auto-complete-input',
  handleAutoComplete: 'handle-auto-complete',
  suggestionRequest: 'suggestion-request',
  suggestionClear: 'suggestion-clear'
};

const mockTimeoutRef = faker.datatype.number();

const mockMatches = {
  data: [
    {
      displayName: faker.random.alphaNumeric(10),
      id: faker.datatype.number()
    }
  ],
  isLoading: true,
  error: null
};

const defaultProps = {
  name: faker.random.alphaNumeric(10),
  label: faker.random.alphaNumeric(10),
  placeholder: faker.random.alphaNumeric(10),
  selectedItem: { id: faker.datatype.number(), displayName: faker.random.alphaNumeric(10) },
  matches: mockMatches,
  suggestionTextPropName: faker.random.alphaNumeric(10),
  renderSuggestionOverride: null,
  disabled: faker.datatype.boolean(),
  isRow: faker.datatype.boolean(),
  sourcePropertyNames: {
    matches: faker.random.alphaNumeric(10),
    value: faker.random.alphaNumeric(10),
    displayName: faker.random.alphaNumeric(10)
  },
  onClearData: jest.fn(),
  onResetItem: jest.fn(),
  onSearch: jest.fn(),
  onSelect: jest.fn()
};

const mockObj = {
  searchItem: defaultProps.selectedItem,
  setSearchItem: jest.fn()
};

const mockEvent = {
  valueTarget: { value: faker.datatype.string() },
  displayTarget: { value: faker.datatype.string() }
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <AutoComplete {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useRef: jest.fn(),
    useState: jest.fn()
  };
});

jest.mock('../../../../common/formGroup/FormGroup', () => {
  return {
    __esModule: true,
    default: ({ isRow, name, label, children }) => {
      const props = { isRow, name, label, children };
      return <fake-form-group data-testid={testIds.formGroup} {...props} />;
    }
  };
});

jest.mock('../../../../common/inputControls/autoCompleteInput/AutoCompleteInput', () => {
  return {
    __esModule: true,
    default: ({
      displayFieldName,
      displayFieldValue,
      valueFieldValue,
      isLoading,
      suggestions,
      onChange,
      onSuggestionsClearRequested,
      onSuggestionsFetchRequested,
      placeholder,
      renderSuggestion,
      suggestionTextPropName,
      disabled
    }) => {
      const props = {
        displayFieldName,
        displayFieldValue,
        valueFieldValue,
        isLoading,
        suggestions,
        placeholder,
        renderSuggestion,
        suggestionTextPropName,
        disabled
      };

      return (
        <>
          <fake-auto-complete-input
            data-testid={testIds.autoCompleteInput}
            {...props}
            renderSuggestion={renderSuggestion(suggestions[0])}
          />
          <button data-testid={testIds.handleAutoComplete} onClick={() => onChange(mockEvent)} />
          <button data-testid={testIds.suggestionRequest} onClick={onSuggestionsFetchRequested} />
          <button data-testid={testIds.suggestionClear} onClick={onSuggestionsClearRequested} />
        </>
      );
    }
  };
});

// **********************************************************************
// * unit tests

describe('AutoComplete', () => {
  beforeAll(() => {
    jest.spyOn(mockObj, 'setSearchItem');
  });

  beforeEach(() => {
    jest.spyOn(global, 'clearTimeout');
    jest.spyOn(global, 'setTimeout');
    useRef.mockReturnValue({});
    useState.mockReturnValue([mockObj.searchItem, mockObj.setSearchItem]);
  });

  afterAll(() => {
    global.clearTimeout.mockClear();
    global.setTimeout.mockClear();
    mockObj.setSearchItem.mockClear();
  });

  describe('render', () => {
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

    describe('AutoCompleteInput', () => {
      it('renders inside the FormGroup', () => {
        render(getComponentToRender(defaultProps));
        const formGroup = screen.getByTestId(testIds.formGroup);
        expect(within(formGroup).getByTestId(testIds.autoCompleteInput)).toBeInTheDocument();
      });

      it('passes correct name', () => {
        const name = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, name };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.autoCompleteInput)).toHaveAttribute('displayFieldName', name);
      });

      it('passes correct value to AutoCompleteInput component', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.autoCompleteInput)).toHaveAttribute(
          'valueFieldValue',
          defaultProps.selectedItem.id.toString()
        );
      });

      it('passes correct loading flags to AutoCompleteInput component', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.autoCompleteInput)).toHaveAttribute(
          'isLoading',
          mockMatches.isLoading.toString()
        );
      });

      it('has correct placeholder prop', () => {
        const placeholder = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, placeholder };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.autoCompleteInput)).toHaveAttribute('placeholder', placeholder);
      });

      it('renders correct placeholder prop if placeholder is null', () => {
        const placeholder = '';
        const props = { ...defaultProps, placeholder };
        render(getComponentToRender(props));
        const autoCompleteAttribute = screen.getByTestId(testIds.autoCompleteInput);
        expect(autoCompleteAttribute.getAttribute('placeholder')).toEqual('Type a value');
      });

      it('has correct disabled prop', () => {
        const disabled = faker.datatype.boolean();
        const props = { ...defaultProps, disabled };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.autoCompleteInput)).toHaveAttribute('disabled', disabled.toString());
      });

      it('has correct suggestionTextPropName prop when incoming suggestionTextPropName prop has no value', () => {
        const expectedSuggestionTextPropName = 'displayName';
        const props = { ...defaultProps, suggestionTextPropName: undefined };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.autoCompleteInput)).toHaveAttribute(
          'suggestionTextPropName',
          expectedSuggestionTextPropName
        );
      });

      it('has correct suggestionTextPropName prop when incoming suggestionTextPropName prop has a value', () => {
        const expectedSuggestionTextPropName = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, suggestionTextPropName: expectedSuggestionTextPropName };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.autoCompleteInput)).toHaveAttribute(
          'suggestionTextPropName',
          expectedSuggestionTextPropName
        );
      });

      it('has correct suggestion when renderSuggestionOverride is defined', () => {
        const expectedSuggestion = faker.random.alphaNumeric(10);
        const renderSuggestionOverride = () => expectedSuggestion;
        const props = { ...defaultProps, renderSuggestionOverride };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.autoCompleteInput)).toHaveAttribute('renderSuggestion', expectedSuggestion);
      });
    });
  });

  describe('functional', () => {
    it('clears timer when selectedItem is defined but searchItem is not', () => {
      const fakeSearchItem = {
        id: faker.datatype.number(),
        displayName: faker.datatype.string()
      };
      useRef.mockReturnValue({ current: mockTimeoutRef });
      useState.mockReturnValue([{}, mockObj.setSearchItem]);
      render(getComponentToRender({ ...defaultProps, selectedItem: fakeSearchItem }));
      expect(global.clearTimeout).toHaveBeenCalledWith(mockTimeoutRef);
    });

    it('invokes setSearchItem when selectedItem is defined but searchItem is not', () => {
      const fakeSearchItem = {
        id: faker.datatype.number(),
        displayName: faker.datatype.string()
      };
      useState.mockReturnValue([{}, mockObj.setSearchItem]);
      render(getComponentToRender({ ...defaultProps, selectedItem: fakeSearchItem }));
      expect(mockObj.setSearchItem).toHaveBeenCalledWith(fakeSearchItem);
    });

    it('invokes setSearchItem when selectedItem.forceReset is true', () => {
      const fakeSearchItem = { id: faker.datatype.number(), displayName: faker.datatype.string(), forceReset: true };
      useState.mockReturnValue([{}, mockObj.setSearchItem]);
      render(getComponentToRender({ ...defaultProps, selectedItem: fakeSearchItem }));
      expect(mockObj.setSearchItem).toHaveBeenCalledWith(fakeSearchItem);
    });

    it('invokes onSearch when handleSuggestionsFetchRequested is triggered', () => {
      const onSearch = jest.fn();
      const props = { ...defaultProps, onSearch };
      render(getComponentToRender(props));
      expect(onSearch).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.suggestionRequest));
      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith(
        expect.objectContaining({ searchQuery: expect.anything() }),
        defaultProps.sourcePropertyNames
      );
    });

    it('invokes onClearData when handleSuggestionsClearRequested is triggered', () => {
      const onClearData = jest.fn();
      const props = { ...defaultProps, onClearData };
      render(getComponentToRender(props));
      fireEvent.click(screen.getByTestId(testIds.suggestionClear));
      expect(onClearData).toHaveBeenCalledTimes(1);
      expect(onClearData).toHaveBeenCalledWith(defaultProps.sourcePropertyNames);
    });

    it('clears timer when timeoutRef.current has a value', () => {
      useRef.mockReturnValue({ current: mockTimeoutRef });
      render(getComponentToRender(defaultProps));
      expect(global.clearTimeout).toHaveBeenCalledWith(mockTimeoutRef);
    });

    it('does not clear timer when timeoutRef.current does not have a value', () => {
      render(getComponentToRender(defaultProps));
      expect(global.clearTimeout).not.toHaveBeenCalled();
    });

    it('invokes onResetItem when searchItem.id does not have a value', () => {
      useState.mockReturnValue([{ displayName: faker.datatype.string() }, mockObj.setSearchItem]);
      render(getComponentToRender(defaultProps));
      expect(defaultProps.onResetItem).toHaveBeenCalledTimes(1);
      expect(defaultProps.onResetItem).toHaveBeenCalledWith(defaultProps.sourcePropertyNames);
    });

    it('sets a timeout when searchItem.id has a value', () => {
      render(getComponentToRender(defaultProps));
      expect(global.setTimeout).toHaveBeenCalled();
    });

    it('invokes onSelect when timeout expires', () => {
      jest.useFakeTimers();
      render(getComponentToRender(defaultProps));
      jest.advanceTimersByTime(750);
      expect(defaultProps.onSelect).toHaveBeenCalledWith(mockObj.searchItem, defaultProps.sourcePropertyNames);
    });

    it('invokes setSearchItem when handleAutocompleteChange is triggered', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(screen.getByTestId(testIds.handleAutoComplete));
      expect(mockObj.setSearchItem).toHaveBeenCalledTimes(1);
    });

    it('does not set a timeout when searchItem.id does not have a value', () => {
      useState.mockReturnValue([{ displayName: faker.datatype.string() }, mockObj.setSearchItem]);
      render(getComponentToRender(defaultProps));
      expect(global.setTimeout).not.toHaveBeenCalled();
    });
  });
});
