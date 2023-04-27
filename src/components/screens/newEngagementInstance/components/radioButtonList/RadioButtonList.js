import { memo } from 'react';
import PropTypes from 'prop-types';

import FormGroup from '../../../../common/formGroup/FormGroup';
import RadioButtonListInput from '../../../../common/inputControls/radioButtonListInput/RadioButtonListInput';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  horizontalItems: PropTypes.bool,
  isRow: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

let RadioButtonList = ({
  name,
  label,
  selectedValue,
  options,
  isLoading,
  loadingText,
  horizontalItems,
  isRow,
  disabled,
  onChange,
  ...rest
}) => {
  // **********************************************************************
  // * constants

  const formGroupProps = { name, label, isRow, ...rest };

  const radioButtonListInputProps = {
    name,
    selectedValue,
    options,
    isLoading,
    loadingText,
    horizontalItems,
    disabled,
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
      <RadioButtonListInput {...radioButtonListInputProps} />
    </FormGroup>
  );
};

RadioButtonList = memo(RadioButtonList);
RadioButtonList.propTypes = propTypes;

export default RadioButtonList;
