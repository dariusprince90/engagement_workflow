import { memo } from 'react';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import AutoCompleteInput from '../../../../common/inputControls/autoCompleteInput/AutoCompleteInput';
import FormGroup from '../../../../common/formGroup/FormGroup';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  placeholder: PropTypes.string,
  selectedItem: PropTypes.object,
  matches: PropTypes.object.isRequired,
  suggestionTextPropName: PropTypes.string,
  renderSuggestionOverride: PropTypes.func,
  disabled: PropTypes.bool,
  isRow: PropTypes.bool,
  sourcePropertyNames: PropTypes.shape({
    matches: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired
  }),
  onClearData: PropTypes.func.isRequired,
  onResetItem: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

let AutoComplete = ({
  name,
  label,
  placeholder,
  selectedItem,
  matches,
  suggestionTextPropName = 'displayName',
  renderSuggestionOverride,
  disabled,
  isRow,
  sourcePropertyNames,
  onClearData,
  onResetItem,
  onSearch,
  onSelect,
  ...rest
}) => {
  const formGroupProps = { isRow, name, label, ...rest };
  const [searchItem, setSearchItem] = useState(selectedItem);
  const timeoutRef = useRef();

  // **********************************************************************
  // * functions

  /**
   * updates the searched searchItem when the autocomplete value changes
   * @param {object} event - The event that was fired
   */
  const handleAutocompleteChange = (event) => {
    setSearchItem({ id: event.valueTarget.value, displayName: event.displayTarget.value });
  };

  /**
   * handles clearing the suggestions
   */
  const handleSuggestionsClearRequested = () => {
    onClearData(sourcePropertyNames);
  };

  /**
   * handles the fetching of suggestions
   * @param {string} searchQuery - the value used for the search
   */
  const handleSuggestionsFetchRequested = (searchQuery) => {
    onSearch({ searchQuery }, sourcePropertyNames);
  };

  /**
   * renders a suggestion
   * @param {object} suggestion - The matched suggestion to render
   * @description - render the suggestion as <div>[displayName] ([id])</div>
   * @example <div>Ford Motor Company (12345)</div>
   */
  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion[suggestionTextPropName]} ({suggestion.id})
    </div>
  );

  // **********************************************************************
  // * side effects

  /**
   * when selectedValue is changed
   * and searchItem is not defined
   * then clear the timeout
   * and update the searchItem
   */
  useEffect(() => {
    if (selectedItem.id && !searchItem.id) {
      clearTimeout(timeoutRef.current);
      setSearchItem(selectedItem);
    }
  }, [selectedItem, searchItem]);

  /**
   * when selectedItem is changed and forceReset is true
   * then clear the timeout
   * and update the searchItem
   */
  useEffect(() => {
    if (selectedItem.forceReset === true) {
      clearTimeout(timeoutRef.current);
      setSearchItem(selectedItem);
    }
  }, [selectedItem]);

  /**
   * when the searchItem.id changes
   * then, call onSelect
   */
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // if there is no id
    // then, call onResetItem
    if (!searchItem.id) {
      onResetItem(sourcePropertyNames);
      return;
    }

    // call onSelect after a short delay
    // this allows for the user keying up and down the suggestions list
    // without immediately setting the selected item on every selection
    timeoutRef.current = setTimeout(async () => {
      onSelect(searchItem, sourcePropertyNames);
    }, 750);
  }, [onResetItem, onSelect, searchItem, sourcePropertyNames]);

  // **********************************************************************
  // * render

  return (
    <FormGroup {...formGroupProps}>
      <AutoCompleteInput
        displayFieldName={name}
        displayFieldValue={searchItem.displayName}
        valueFieldName="searchItemId"
        valueFieldValue={searchItem.id}
        placeholder={placeholder || 'Type a value'}
        onChange={handleAutocompleteChange}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        minimumSearchChars={3}
        searchDelayMs={500}
        isLoading={matches.isLoading}
        suggestions={matches.data}
        renderSuggestion={renderSuggestionOverride || renderSuggestion}
        suggestionTextPropName={suggestionTextPropName}
        suggestionValuePropName="id"
        disabled={disabled}
      />
    </FormGroup>
  );
};

AutoComplete = memo(AutoComplete);
AutoComplete.propTypes = propTypes;

export default AutoComplete;
