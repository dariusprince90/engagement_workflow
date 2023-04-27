import { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DYNAMIC_ALERT_TYPES from '../../../helpers/enums/dynamicAlertTypes';

const propTypes = {
  type: PropTypes.oneOf(Object.values(DYNAMIC_ALERT_TYPES)).isRequired,
  message: PropTypes.node.isRequired
};

let DynamicAlert = ({ type, message }) => {
  // **********************************************************************
  // * constants

  const alertClass = `dynamic-alert alert alert-${type.bsClassSuffix} border border-${type.bsClassSuffix}`;

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className={alertClass}>
      <FontAwesomeIcon icon={type.defaultIcon} />
      &ensp;{message}
    </div>
  );
};

DynamicAlert = memo(DynamicAlert);
DynamicAlert.propTypes = propTypes;
DynamicAlert.displayName = 'DynamicAlert';

export default DynamicAlert;
