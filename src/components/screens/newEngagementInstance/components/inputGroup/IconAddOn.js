import { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import INPUT_GROUP_ADD_ON_LOCATIONS from '../../../../../helpers/enums/inputGroupAddOnLocations';
import AddOnBase from './AddOnBase';

const propTypes = {
  locationType: PropTypes.oneOf(Object.values(INPUT_GROUP_ADD_ON_LOCATIONS)).isRequired,
  icon: PropTypes.string.isRequired
};

let IconAddOn = ({ locationType, icon }) => {
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
      <span className="input-group-text">
        <FontAwesomeIcon icon={icon} />
      </span>
    </AddOnBase>
  );
};

IconAddOn = memo(IconAddOn);
IconAddOn.propTypes = propTypes;
IconAddOn.displayName = 'IconAddOn';

export default IconAddOn;
