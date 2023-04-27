import { memo } from 'react';
import PropTypes from 'prop-types';

import INPUT_GROUP_ADD_ON_TYPES from '../../../../../helpers/enums/inputGroupAddOnTypes';

import FormGroup from '../../../../common/formGroup/FormGroup';
import TextInput from '../../../../common/inputControls/textInput/TextInput';
import InputGroup from '../inputGroup/InputGroup';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  prependAddOns: PropTypes.arrayOf(
    PropTypes.shape({ addOnType: PropTypes.oneOf(Object.values(INPUT_GROUP_ADD_ON_TYPES)).isRequired })
  ),
  appendAddOns: PropTypes.arrayOf(
    PropTypes.shape({ addOnType: PropTypes.oneOf(Object.values(INPUT_GROUP_ADD_ON_TYPES)).isRequired })
  ),
  isRow: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

let TextBox = ({
  name,
  label,
  value,
  placeholder,
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
  const textInputProps = { name, value, placeholder, disabled, readOnly, onChange };

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
        <TextInput {...textInputProps} />
      </InputGroup>
    </FormGroup>
  );
};

TextBox = memo(TextBox);
TextBox.propTypes = propTypes;

export default TextBox;
