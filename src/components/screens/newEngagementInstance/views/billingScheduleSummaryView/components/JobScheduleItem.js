import { memo } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    clientDisplayName: PropTypes.string.isRequired
  })
};

let JobScheduleItem = ({ job }) => {
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
    <div>
      {job.name}&ensp;<small className="text-muted">({job.clientDisplayName})</small>
    </div>
  );
};

JobScheduleItem = memo(JobScheduleItem);
JobScheduleItem.propTypes = propTypes;
JobScheduleItem.displayName = 'JobScheduleItem';

export default JobScheduleItem;
