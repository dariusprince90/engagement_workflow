import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ApplicationFault.scss';
import { selectApplicationFaultInfo } from '../appLayout/appLayoutSlice';

const propTypes = { showPmLogo: PropTypes.bool };

const ApplicationFault = ({ showPmLogo }) => {
  // **********************************************************************
  // * constants

  const { faultMessage, faultError } = useSelector(selectApplicationFaultInfo);

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className="application-fault-container">
      {/* pm logo */}
      {showPmLogo && <img src="/images/pm-logos/pm-logo-wide-color-small.png" alt="logo" className="pm-logo" />}

      {/* frown icon */}
      <h1 className="display-1 mb-2">
        <FontAwesomeIcon icon={['far', 'frown']} />
      </h1>

      {/* generic messages */}
      <h2 className="mb-4">Oops! Something went wrong.</h2>
      <p>Try refreshing the page. If the error persists, please contact the help desk.</p>

      {/* if we have a fault message, show it */}
      {!!faultMessage && (
        <div className="alert alert-danger" data-testid="application-fault-message">
          {faultMessage}
          <hr />
          <div>error: {faultError.message}</div>
          {!!faultError.traceId && <div>trace-id: {faultError.traceId}</div>}
        </div>
      )}

      <p>This error has been reported and logged.</p>
    </div>
  );
};

ApplicationFault.propTypes = propTypes;

export default ApplicationFault;
