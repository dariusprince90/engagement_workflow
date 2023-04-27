import { memo } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  isChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

let CheckBoxInput = ({ isChecked, label, name, onChange, disabled }) => {
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
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={name}
        name={name}
        checked={isChecked}
        disabled={disabled}
        onChange={onChange}
        data-testid="input"
      />
      <label className="form-check-label" htmlFor={name} data-testid="label">
        {label}
      </label>
    </div>
  );
};

CheckBoxInput = memo(CheckBoxInput);
CheckBoxInput.propTypes = propTypes;

export default CheckBoxInput;
