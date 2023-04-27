import { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './AutoCompleteInput.scss';

const propTypes = {
  valueFieldName: PropTypes.string.isRequired,
  valueFieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  displayFieldName: PropTypes.string.isRequired,
  displayFieldValue: PropTypes.string,

  placeholder: PropTypes.string,
  minimumSearchChars: PropTypes.number.isRequired,
  searchDelayMs: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,

  suggestions: PropTypes.array.isRequired,
  suggestionTextPropName: PropTypes.string.isRequired,
  suggestionValuePropName: PropTypes.string.isRequired,

  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  onSuggestionsFetchRequested: PropTypes.func.isRequired,
  onSuggestionsClearRequested: PropTypes.func.isRequired,
  renderSuggestion: PropTypes.func.isRequired
};

/**
 * Autosuggest comes with no styles.
 * This will set the class names for each component to be styled.
 */
export const theme = {
  container: 'react-autosuggest-container',
  containerOpen: 'react-autosuggest-container-open',
  input: 'react-autosuggest-input form-control',
  inputOpen: 'react-autosuggest-input-open',
  inputFocused: 'react-autosuggest-input-focused',
  suggestionsContainer: 'react-autosuggest-suggestions-container',
  suggestionsContainerOpen: 'react-autosuggest-suggestions-container-open',
  suggestionsList: 'react-autosuggest-suggestions-list',
  suggestion: 'react-autosuggest-suggestion',
  suggestionFirst: 'react-autosuggest-suggestion-first',
  suggestionHighlighted: 'react-autosuggest-suggestion-highlighted',
  sectionContainer: 'react-autosuggest-section-container',
  sectionContainerFirst: 'react-autosuggest-section-container-first',
  sectionTitle: 'react-autosuggest-section-title'
};

let AutocompleteInput = ({
  valueFieldName,
  valueFieldValue,
  displayFieldName,
  displayFieldValue,

  placeholder,
  minimumSearchChars,
  searchDelayMs,
  isLoading,
  disabled,

  suggestions,
  suggestionTextPropName,
  suggestionValuePropName,

  onChange,
  onKeyPress,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  renderSuggestion
}) => {
  // **********************************************************************
  // * constants

  const loadingTimeoutRef = useRef();

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  /**
   * tells Autosuggest how to map suggestions to input values
   * @description we will simply return the suggestion object and let handleAutocompleteInputChange handle how to set the input values;
   *              this is because we've customized how this control works and we have a display input element and a value input element
   * @param {object} suggestion - the suggestion
   * @returns the suggestion
   */
  const getSuggestionValue = (suggestion) => suggestion;

  /**
   * handler for when the input element for the autocomplete changes
   */
  const handleAutocompleteInputChange = (_, { newValue }) => {
    let displayTargetValue = '';
    let valueTargetValue = '';

    // if the new value is a string, the user is still typing and hasn't selected anything yet
    // otherwise, an item is selected
    if (typeof newValue === 'string') {
      displayTargetValue = newValue;
      valueTargetValue = '';
    } else {
      displayTargetValue = newValue[suggestionTextPropName];
      valueTargetValue = newValue[suggestionValuePropName];
    }

    const eventDetails = {
      displayTarget: {
        name: displayFieldName,
        value: displayTargetValue
      },
      valueTarget: {
        name: valueFieldName,
        value: valueTargetValue
      }
    };

    // fire this component's onChange event with the event details
    onChange(eventDetails);
  };

  /**
   * handles the request for new suggestions
   */
  const handleSuggestionsFetchRequested = async ({ value }) => {
    // if we have a timeout in progress
    // then, clear the timeout before starting another
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    // only fetch after the delay has passed
    // this allows for typing w/o firing the event immediately after every keystroke
    // e.g. allow the user to type, then pause, then fire
    loadingTimeoutRef.current = setTimeout(async () => {
      await onSuggestionsFetchRequested(value);
    }, searchDelayMs);
  };

  /**
   * determines whether to render the suggestions
   * @description gets the current value of the input and the reason why the suggestions might be rendered, and it should return a boolean
   * @param {*} value - the value of the input
   * @param {*} reason - the reason why the suggestion might be rendered
   * @returns whether the suggestions should be rendered
   */
  const shouldRenderSuggestions = (value, reason) => {
    // if the user simply focused on the input,
    // do not render suggestions
    if (reason === 'input-focused') return false;

    // only render if the length is >= minimumSearchChars
    return value.trim().length >= minimumSearchChars;
  };

  /**
   * Autosuggest is a controlled component.
   * Therefore, we must pass at least a value and an onChange callback to the input.
   * We'll include additional props as needed.
   */
  const inputProps = {
    name: displayFieldName,
    id: displayFieldName,
    value: displayFieldValue,
    onChange: handleAutocompleteInputChange,
    onKeyPress: onKeyPress,
    placeholder: placeholder,
    disabled: disabled
  };

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <>
      <div className="autocomplete-input">
        <Autosuggest
          id={displayFieldName}
          suggestions={suggestions}
          onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          shouldRenderSuggestions={shouldRenderSuggestions}
          inputProps={inputProps}
          theme={theme}
        />
        {isLoading && <FontAwesomeIcon icon="cog" className="loading-spinner" spin />}
      </div>
      <input
        type="text"
        className="autocomplete-value"
        name={valueFieldName}
        id={valueFieldName}
        value={valueFieldValue}
        onChange={() => {}}
        data-testid="auto-complete-input-field"
      />
    </>
  );
};

AutocompleteInput = memo(AutocompleteInput);
AutocompleteInput.propTypes = propTypes;

export default AutocompleteInput;
