import { memo } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
  onChange: PropTypes.func
};

let TextAreaInput = ({ name, value, placeholder, disabled, rows = 6, onChange }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <textarea
      className="form-control"
      name={name}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      onChange={onChange}
      data-testid="textarea-input"
    />
  );
};

TextAreaInput = memo(TextAreaInput);
TextAreaInput.propTypes = propTypes;

export default TextAreaInput;
