import { memo } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  jobInfoResponse: PropTypes.shape({
    id: PropTypes.number.isRequired,
    jobName: PropTypes.string.isRequired,
    clientDisplayName: PropTypes.string.isRequired
  })
};

let JobInfoResponseScheduleItem = ({ jobInfoResponse }) => {
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
    <div className="job-info-response-schedule-item">
      {jobInfoResponse.jobName}
      &ensp;<small className="text-muted">({jobInfoResponse.clientDisplayName})</small>
    </div>
  );
};

JobInfoResponseScheduleItem = memo(JobInfoResponseScheduleItem);
JobInfoResponseScheduleItem.propTypes = propTypes;
JobInfoResponseScheduleItem.displayName = 'JobInfoResponseScheduleItem';

export default JobInfoResponseScheduleItem;
