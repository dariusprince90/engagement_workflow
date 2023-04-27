import { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Multiselect } from 'multiselect-react-dropdown';

import FormGroup from '../../../../common/formGroup/FormGroup';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  placeholder: PropTypes.string,
  isLoading: PropTypes.bool,
  showCheckbox: PropTypes.bool,
  disabled: PropTypes.bool,
  isRow: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  selectedItems: PropTypes.arrayOf(PropTypes.object),
  sourcePropertyNames: PropTypes.shape({
    value: PropTypes.string.isRequired,
    selectedItems: PropTypes.string.isRequired
  }),
  onChange: PropTypes.func.isRequired
};

let MultiSelect = ({
  name,
  label,
  placeholder,
  isLoading,
  showCheckbox,
  disabled,
  isRow,
  options,
  selectedItems,
  sourcePropertyNames,
  onChange,
  ...rest
}) => {
  // **********************************************************************
  // * constants

  const multiSelectRef = useRef(null);
  const formGroupProps = { name, label, isRow, ...rest };

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  /**
   * on render, inject form-control class to searchBox
   * so the control renders correctly
   */
  useEffect(function injectFormControlClass() {
    const searchBox = multiSelectRef.current.searchBox.current;
    searchBox.classList.add('form-control');
  }, []);

  // **********************************************************************
  // * render

  return (
    <FormGroup {...formGroupProps}>
      <Multiselect
        loading={isLoading}
        options={options}
        placeholder={placeholder}
        name={name}
        onSelect={(selectedValues) => onChange(selectedValues, sourcePropertyNames)}
        onRemove={(selectedValues) => onChange(selectedValues, sourcePropertyNames)}
        showCheckbox={showCheckbox}
        selectedValues={isLoading ? [] : selectedItems}
        disable={disabled}
        ref={multiSelectRef}
        avoidHighlightFirstOption={true}
        displayValue="label"
      />
    </FormGroup>
  );
};

MultiSelect = memo(MultiSelect);
MultiSelect.propTypes = propTypes;

export default MultiSelect;
