import { memo } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  defaultOption: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
      text: PropTypes.string
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  disabled: PropTypes.bool
};

let SelectInput = ({ name, value, defaultOption, options, onChange, isLoading, loadingText, disabled }) => {
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
    <select
      name={name}
      id={name}
      value={value}
      className="custom-select"
      onChange={onChange}
      disabled={disabled || isLoading}
      data-testid="select-input">
      {/* option for when the control is loading */}
      {isLoading && <option value="[loading]">{loadingText || 'Loading...'}</option>}

      {/* the default/nothing-selected option */}
      {!!defaultOption && !isLoading && (
        <option value="" data-testid="default-option">
          {defaultOption}
        </option>
      )}

      {/* select options */}
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        );
      })}
    </select>
  );
};

SelectInput = memo(SelectInput);
SelectInput.propTypes = propTypes;

export default SelectInput;
