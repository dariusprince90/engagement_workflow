import { memo } from 'react';
import PropTypes from 'prop-types';

import JobScheduleItem from './JobScheduleItem';
import JobInfoResponseScheduleItem from './JobInfoResponseScheduleItem';

const propTypes = {
  actionType: PropTypes.oneOf(['Create', 'Update']),
  billingSchedule: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    billToClientDisplayName: PropTypes.string.isRequired,
    companyDisplayName: PropTypes.string.isRequired,
    jobs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        clientDisplayName: PropTypes.string.isRequired
      })
    ).isRequired,
    jobInfoResponses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        jobName: PropTypes.string.isRequired,
        clientDisplayName: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

let BillingScheduleTableRow = ({ actionType, billingSchedule }) => {
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
    <tr>
      <td>{actionType}</td>
      <td>{billingSchedule.name}</td>
      <td>{billingSchedule.billToClientDisplayName}</td>
      <td>{billingSchedule.companyDisplayName}</td>
      <td>
        <div>
          {/* jobs */}
          {billingSchedule.jobs.map((job) => (
            <JobScheduleItem key={job.id} job={job} />
          ))}

          {/* job info responses */}
          {billingSchedule.jobInfoResponses.map((jir) => (
            <JobInfoResponseScheduleItem key={jir.id} jobInfoResponse={jir} />
          ))}
        </div>
      </td>
    </tr>
  );
};

BillingScheduleTableRow = memo(BillingScheduleTableRow);
BillingScheduleTableRow.propTypes = propTypes;
BillingScheduleTableRow.displayName = 'BillingScheduleTableRow';

export default BillingScheduleTableRow;
