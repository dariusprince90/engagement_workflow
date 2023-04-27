import { memo } from 'react';
import PropTypes from 'prop-types';

import INPUT_GROUP_ADD_ON_TYPES from '../../../../../helpers/enums/inputGroupAddOnTypes';

import FormGroup from '../../../../common/formGroup/FormGroup';
import SelectInput from '../../../../common/inputControls/selectInput/SelectInput';
import InputGroup from '../inputGroup/InputGroup';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  defaultOption: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
      text: PropTypes.string
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  prependAddOns: PropTypes.arrayOf(
    PropTypes.shape({ addOnType: PropTypes.oneOf(Object.values(INPUT_GROUP_ADD_ON_TYPES)).isRequired })
  ),
  appendAddOns: PropTypes.arrayOf(
    PropTypes.shape({ addOnType: PropTypes.oneOf(Object.values(INPUT_GROUP_ADD_ON_TYPES)).isRequired })
  ),
  isRow: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

let SelectBox = ({
  name,
  label,
  value,
  defaultOption,
  options,
  isLoading,
  loadingText,
  prependAddOns,
  appendAddOns,
  isRow,
  disabled,
  readOnly,
  onChange,
  ...rest
}) => {
  // **********************************************************************
  // * constants

  const formGroupProps = { isRow, name, label, ...rest };
  const inputGroupProps = { prependAddOns, appendAddOns, disabled, ...rest };
  const selectInputProps = {
    name,
    value: value === null ? '' : value,
    defaultOption,
    options,
    isLoading,
    loadingText,
    disabled: disabled || readOnly,
    onChange
  };

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <FormGroup {...formGroupProps}>
      <InputGroup {...inputGroupProps}>
        <SelectInput {...selectInputProps} />
      </InputGroup>
    </FormGroup>
  );
};

SelectBox = memo(SelectBox);
SelectBox.propTypes = propTypes;

export default SelectBox;
