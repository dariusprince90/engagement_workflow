import PropTypes from 'prop-types';

const propTypes = {
  percentComplete: PropTypes.number.isRequired
};

const UploadProgressAlert = ({ percentComplete }) => {
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
    <div className="alert alert-info border border-info">
      <h5>Uploading attachment...</h5>
      <div className="progress rounded border border-info">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated bg-info"
          style={{ width: `${percentComplete}%` }}>
          {percentComplete}%
        </div>
      </div>
    </div>
  );
};

UploadProgressAlert.propTypes = propTypes;

export default UploadProgressAlert;
