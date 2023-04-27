import { memo } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  isInline: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

let RadioButtonInput = ({ name, id, value, label, isSelected, isInline, disabled, onChange }) => {
  // **********************************************************************
  // * constants

  const inlineClass = isInline ? 'form-check-inline' : '';

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className={`form-check ${inlineClass}`} data-testid="form-check-container">
      <input
        type="radio"
        className="form-check-input"
        id={id}
        name={name}
        value={value}
        checked={isSelected}
        disabled={disabled}
        onChange={onChange}
        data-testid="radio-input"
      />
      <label className="form-check-label" htmlFor={id} data-testid="radio-label">
        {label}
      </label>
    </div>
  );
};

RadioButtonInput = memo(RadioButtonInput);
RadioButtonInput.propTypes = propTypes;

export default RadioButtonInput;
