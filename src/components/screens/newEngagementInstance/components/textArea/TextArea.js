import { memo } from 'react';
import PropTypes from 'prop-types';

import FormGroup from '../../../../common/formGroup/FormGroup';
import TextAreaInput from '../../../../common/inputControls/textAreaInput/TextAreaInput';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  isRow: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

let TextArea = ({ name, label, value, placeholder, rows, isRow, disabled, onChange, ...rest }) => {
  // **********************************************************************
  // * constants

  const formGroupProps = { name, label, isRow, ...rest };
  const textAreaProps = { name, value, placeholder, disabled, rows, onChange };

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
      <TextAreaInput {...textAreaProps} />
    </FormGroup>
  );
};

TextArea = memo(TextArea);
TextArea.propTypes = propTypes;

export default TextArea;
