import { memo } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  alertType: PropTypes.oneOf(['info', 'warning']).isRequired,
  message: PropTypes.string.isRequired,
  percentComplete: PropTypes.number
};

let ProgressAlert = ({ alertType, message, percentComplete = 100 }) => {
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
    <div className={`alert alert-${alertType} border border-${alertType}`}>
      <h5>{message}</h5>
      <div className={`progress rounded border border-${alertType}`}>
        <div
          className={`progress-bar progress-bar-striped progress-bar-animated bg-${alertType}`}
          style={{ width: `${percentComplete}%` }}
        />
      </div>
    </div>
  );
};

ProgressAlert = memo(ProgressAlert);
ProgressAlert.propTypes = propTypes;
ProgressAlert.displayName = 'ProgressAlert';

export default ProgressAlert;
