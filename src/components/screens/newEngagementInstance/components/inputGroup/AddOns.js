import { memo } from 'react';
import PropTypes from 'prop-types';

import INPUT_GROUP_ADD_ON_LOCATIONS from '../../../../../helpers/enums/inputGroupAddOnLocations';
import INPUT_GROUP_ADD_ON_TYPES from '../../../../../helpers/enums/inputGroupAddOnTypes';

import ButtonAddOn from './ButtonAddOn';
import IconAddOn from './IconAddOn';
import TextAddOn from './TextAddOn';

const propTypes = {
  locationType: PropTypes.oneOf(Object.values(INPUT_GROUP_ADD_ON_LOCATIONS)).isRequired,
  addOns: PropTypes.arrayOf(
    PropTypes.shape({
      addOnType: PropTypes.oneOf(Object.values(INPUT_GROUP_ADD_ON_TYPES)).isRequired
    })
  ).isRequired,
  disabled: PropTypes.bool
};

let AddOns = ({ locationType, addOns, disabled }) => {
  // **********************************************************************
  // *

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <>
      {addOns.map((addOn, index) => {
        const addOnProps = { locationType, ...addOn, disabled: addOn.disabled || disabled };

        switch (addOn.addOnType) {
          case INPUT_GROUP_ADD_ON_TYPES.text:
            return <TextAddOn key={index} {...addOnProps} />;
          case INPUT_GROUP_ADD_ON_TYPES.icon:
            return <IconAddOn key={index} {...addOnProps} />;
          case INPUT_GROUP_ADD_ON_TYPES.button:
            return <ButtonAddOn key={index} {...addOnProps} />;
          default:
            return null;
        }
      })}
    </>
  );
};

AddOns = memo(AddOns);
AddOns.propTypes = propTypes;
AddOns.displayName = 'AddOns';

export default AddOns;
