import { memo } from 'react';
import PropTypes from 'prop-types';

import FormGroup from '../../../../common/formGroup/FormGroup';
import CheckBoxInput from '../../../../common/inputControls/checkBoxInput/CheckBoxInput';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isChecked: PropTypes.bool,
  isRow: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

let CheckBox = ({ isRow, label, onChange, name, isChecked, disabled, ...rest }) => {
  const formGroupProps = { isRow, name, label, ...rest };
  const checkBoxProps = { name, label, isChecked, onChange, disabled };

  return (
    <FormGroup hideLabel {...formGroupProps}>
      <CheckBoxInput {...checkBoxProps} />
    </FormGroup>
  );
};

CheckBox = memo(CheckBox);
CheckBox.propTypes = propTypes;

export default CheckBox;
