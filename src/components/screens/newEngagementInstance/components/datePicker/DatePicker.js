import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';

import FormGroup from '../../../../common/formGroup/FormGroup';
import CustomInput from './CustomInput';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  value: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  isRow: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

let DatePicker = ({ name, label, value, placeholder, isRow, disabled, onChange, ...rest }) => {
  // **********************************************************************
  // * constants

  const formGroupProps = { isRow, name, label, ...rest };
  const datePickerProps = { name, selected: value, placeholderText: placeholder, disabled };

  // fixed props (i.e. not set from incoming props)
  const datePickerFixedProps = {
    className: 'form-control',
    dateFormat: 'MM/dd/yyyy',
    isClearable: false,
    showPopperArrow: false
  };

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  /**
   * Handler for when the date changes.
   *  - invoke onChange with the following args
   *    - the new date
   *    - the control name
   */
  const handleDateChange = useCallback((date) => onChange({ target: { name, value: date } }), [name, onChange]);

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <FormGroup {...formGroupProps}>
      <ReactDatePicker
        {...datePickerProps}
        {...datePickerFixedProps}
        onChange={handleDateChange}
        customInput={<CustomInput />}
      />
    </FormGroup>
  );
};

DatePicker = memo(DatePicker);
DatePicker.propTypes = propTypes;
DatePicker.displayName = 'DatePicker';

export default DatePicker;
