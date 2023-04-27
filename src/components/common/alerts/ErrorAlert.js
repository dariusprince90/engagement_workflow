import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  displayMessage: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    traceId: PropTypes.string
  }).isRequired
};

const ErrorAlert = ({ displayMessage, error }) => {
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
    <div className="alert alert-danger mt-3" role="alert">
      <FontAwesomeIcon icon={['fas', 'triangle-exclamation']} />
      &ensp;{displayMessage}
      <hr />
      <div>error: {error.message}</div>
      {!!error.traceId && <div>trace-id: {error.traceId}</div>}
    </div>
  );
};

ErrorAlert.propTypes = propTypes;

export default ErrorAlert;
