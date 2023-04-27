import { memo } from 'react';
import PropTypes from 'prop-types';

import INPUT_GROUP_ADD_ON_LOCATIONS from '../../../../../helpers/enums/inputGroupAddOnLocations';
import AddOnBase from './AddOnBase';

const propTypes = {
  locationType: PropTypes.oneOf(Object.values(INPUT_GROUP_ADD_ON_LOCATIONS)).isRequired,
  text: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

let ButtonAddOn = ({ locationType, text, buttonClass, disabled, onClick }) => {
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
    <AddOnBase locationType={locationType}>
      <button className={buttonClass} type="button" onClick={onClick} disabled={disabled}>
        {text}
      </button>
    </AddOnBase>
  );
};

ButtonAddOn = memo(ButtonAddOn);
ButtonAddOn.propTypes = propTypes;
ButtonAddOn.displayName = 'ButtonAddOn';

export default ButtonAddOn;
