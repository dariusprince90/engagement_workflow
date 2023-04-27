import { memo } from 'react';
import PropTypes from 'prop-types';

import ScreenOverlay from '../ScreenOverlay';
import ProgressAlert from '../../../../../common/alerts/ProgressAlert';

const propTypes = {
  alertType: PropTypes.oneOf(['info', 'warning']).isRequired,
  message: PropTypes.string.isRequired,
  percentComplete: PropTypes.number
};

let ProgressOverlay = ({ alertType, message, percentComplete = 100 }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  const alertProps = { alertType, message, percentComplete };

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <ScreenOverlay>
      <ProgressAlert {...alertProps} />
    </ScreenOverlay>
  );
};

ProgressOverlay = memo(ProgressOverlay);
ProgressOverlay.propTypes = propTypes;
ProgressOverlay.displayName = 'ProgressOverlay';

export default ProgressOverlay;
