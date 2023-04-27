import { memo } from 'react';
import PropTypes from 'prop-types';

import INPUT_GROUP_ADD_ON_LOCATIONS from '../../../../../helpers/enums/inputGroupAddOnLocations';

const propTypes = {
  locationType: PropTypes.oneOf(Object.values(INPUT_GROUP_ADD_ON_LOCATIONS)).isRequired,
  children: PropTypes.node.isRequired
};

let AddOnBase = ({ locationType, children }) => {
  // **********************************************************************
  // * constants

  const locationTypeClass = `input-group-${locationType.classSuffix}`;

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return <div className={locationTypeClass}>{children}</div>;
};

AddOnBase = memo(AddOnBase);
AddOnBase.propTypes = propTypes;
AddOnBase.displayName = 'AddOnBase';

export default AddOnBase;
