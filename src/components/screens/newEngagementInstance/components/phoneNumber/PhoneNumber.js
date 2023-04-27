import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import SORT_DIRECTION from '../../../../../helpers/enums/sortDirection';

import PmArray from '../../../../../helpers/customTypes/PmArray';
import { selectLookups } from '../../newEngagementInstanceSlice';
import FormGroup from '../../../../common/formGroup/FormGroup';
import RadioButtonInput from '../../../../common/inputControls/radioButtonInput/RadioButtonInput';
import SelectInput from '../../../../common/inputControls/selectInput/SelectInput';
import TextInput from '../../../../common/inputControls/textInput/TextInput';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  countryHierarchyReferenceId: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  isPrimary: PropTypes.bool,
  isRow: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

let PhoneNumber = ({
  name,
  label,
  countryHierarchyReferenceId,
  phoneNumber,
  isPrimary,
  isRow,
  disabled,
  onChange,
  ...rest
}) => {
  // **********************************************************************
  // * constants

  const { countries } = useSelector(selectLookups);

  // **********************************************************************
  // * component vars

  const [countryOptions, setCountryOptions] = useState([]);

  const formGroupProps = { name, label, isRow, ...rest };

  const selectInputProps = {
    name: `${name}_countryHierarchyReferenceId`,
    value: countryHierarchyReferenceId,
    defaultOption: 'Select a country',
    options: countryOptions,
    isLoading: countries.isLoading,
    loadingText: 'Loading countries...',
    disabled
  };

  const textInputProps = {
    name: `${name}_phoneNumber`,
    value: phoneNumber,
    placeholder: 'Type a value',
    disabled
  };

  const radioButtonInputProps = {
    name: `${name}_isPrimary`,
    id: `${name}_isPrimary`,
    value: true,
    label: 'Primary',
    isSelected: isPrimary,
    isInline: true,
    disabled
  };

  // **********************************************************************
  // * functions

  /**
   * when any part of this control is changed
   * - invoke onChange with the data for this control
   */
  const handleInputChange = useCallback(
    (event) => {
      // get the property name from the event target name
      const propertyName = event.target.name.replace(`${name}_`, '');

      // get the property value
      // if the value is "true" (i.e.the value of the radio button), set to boolean true
      const propertyValue = event.target.value === 'true' ? true : event.target.value;

      // construct the data
      const data = { name, countryHierarchyReferenceId, phoneNumber, isPrimary, [propertyName]: propertyValue };

      // invoke onChange
      onChange(data);
    },
    [name, countryHierarchyReferenceId, phoneNumber, isPrimary, onChange]
  );

  // **********************************************************************
  // * side effects

  /**
   * when countries.data changes
   *  - populate countryOptions
   */
  useEffect(
    function populateCountryOptions() {
      // if there is no data, the options should be empty
      if (!countries.data.length) {
        setCountryOptions([]);
        return;
      }

      // create a sorted array of active countries
      const activeCountries = new PmArray(...countries.data)
        .filter((ch) => ch.isActive)
        .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

      // create the options from the activeCountries array
      const options = activeCountries.map((country) => {
        return { value: country.countryHierarchyReferenceId, text: country.displayName };
      });

      setCountryOptions(options);
    },
    [countries.data]
  );

  // **********************************************************************
  // * render

  return (
    <FormGroup {...formGroupProps}>
      <div className="phone-number-control">
        <div>
          <SelectInput {...selectInputProps} onChange={handleInputChange} />
        </div>
        <div>
          <TextInput {...textInputProps} onChange={handleInputChange} />
        </div>
        <div>
          <RadioButtonInput {...radioButtonInputProps} onChange={handleInputChange} />
        </div>
      </div>
    </FormGroup>
  );
};

PhoneNumber = memo(PhoneNumber);
PhoneNumber.propTypes = propTypes;

export default PhoneNumber;
