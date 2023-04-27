import { memo } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

import RadioButtonInput from '../radioButtonInput/RadioButtonInput';

const propTypes = {
  name: PropTypes.string.isRequired,
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
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

let RadioButtonListInput = ({
  name,
  selectedValue,
  options,
  isLoading,
  loadingText,
  horizontalItems,
  disabled,
  onChange
}) => {
  // **********************************************************************
  // * constants

  const isInline = horizontalItems;

  // **********************************************************************
  // * component vars

  const radioButtons = options.map((option, index) => {
    const { value, label } = option;
    const id = `${name}_${index}`;
    const isSelected = value.toString() === selectedValue.toString();
    const propValues = { key: value, id, name, value, label, onChange, isSelected, isInline, disabled };

    return <RadioButtonInput {...propValues} />;
  });

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div>
      {isLoading && loadingText}
      {!isLoading && radioButtons}
    </div>
  );
};

RadioButtonListInput = memo(RadioButtonListInput);
RadioButtonListInput.propTypes = propTypes;

export default RadioButtonListInput;
