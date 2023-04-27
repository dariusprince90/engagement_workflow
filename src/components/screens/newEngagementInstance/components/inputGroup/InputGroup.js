import { memo } from 'react';
import PropTypes from 'prop-types';

import INPUT_GROUP_ADD_ON_TYPES from '../../../../../helpers/enums/inputGroupAddOnTypes';
import INPUT_GROUP_ADD_ON_LOCATIONS from '../../../../../helpers/enums/inputGroupAddOnLocations';
import AddOns from './AddOns';

const propTypes = {
  prependAddOns: PropTypes.arrayOf(
    PropTypes.shape({ addOnType: PropTypes.oneOf(Object.values(INPUT_GROUP_ADD_ON_TYPES)).isRequired })
  ),
  appendAddOns: PropTypes.arrayOf(
    PropTypes.shape({ addOnType: PropTypes.oneOf(Object.values(INPUT_GROUP_ADD_ON_TYPES)).isRequired })
  ),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
};

let InputGroup = ({ prependAddOns, appendAddOns, disabled, children }) => {
  // **********************************************************************
  // * constants

  const prependAddOnProps = { locationType: INPUT_GROUP_ADD_ON_LOCATIONS.front, addOns: prependAddOns, disabled };
  const appendAddOnProps = { locationType: INPUT_GROUP_ADD_ON_LOCATIONS.back, addOns: appendAddOns, disabled };

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className="input-group">
      {!!prependAddOns && <AddOns {...prependAddOnProps} />}
      {children}
      {!!appendAddOns && <AddOns {...appendAddOnProps} />}
    </div>
  );
};

InputGroup = memo(InputGroup);
InputGroup.propTypes = propTypes;
InputGroup.displayName = 'InputGroup';

export default InputGroup;
