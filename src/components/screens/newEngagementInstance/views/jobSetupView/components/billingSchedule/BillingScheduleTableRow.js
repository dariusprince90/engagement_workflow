import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectJobInfoResponsesMappedToBillingSchedule } from '../../../../newEngagementInstanceSlice';
import JobScheduleItem from './JobScheduleItem';
import JobInfoResponseScheduleItem from './JobInfoResponseScheduleItem';

const propTypes = {
  currentJobInfoResponseId: PropTypes.number.isRequired,
  billingSchedule: PropTypes.shape({
    id: PropTypes.number.isRequired,
    referenceId: PropTypes.string.isRequired,
    linkedJobIds: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

let BillingScheduleTableRow = ({ currentJobInfoResponseId, billingSchedule, onClick }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  // get all job info responses that are mapped to this billing schedule
  // this will be used to show the job info responses with the billing schedule
  const mappedJobInfoResponses = useSelector((state) =>
    selectJobInfoResponsesMappedToBillingSchedule(state, billingSchedule.id)
  );

  // is the current jobInfoResponseId in this billing schedule
  const jirInBillingSchedule = mappedJobInfoResponses.findIndex((jir) => jir.id === currentJobInfoResponseId) >= 0;

  // the row is selectable if the current jobInfoResponseId is not already in the billing schedule
  const isSelectableRow = !jirInBillingSchedule;

  // setup the individual row classes
  const rowClasses = [
    // add 'selectable-row' class if row is selectable
    isSelectableRow ? 'selectable-row' : null,

    // add 'table-info' class if the current jobInfoResponseId is in the billing schedule
    jirInBillingSchedule ? 'table-info' : null
  ];

  // concat all row classes together
  const rowClassName = rowClasses.join(' ').trim();

  // set the row title if needed
  const rowTitle = isSelectableRow ? 'Click here to add the job to this billing schedule' : null;

  // set the row click handler if needed
  const clickHandler = useCallback(() => {
    onClick(billingSchedule.id);
  }, [billingSchedule.id, onClick]);
  const handleRowClick = isSelectableRow ? clickHandler : null;

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <tr className={rowClassName} title={rowTitle} onClick={handleRowClick}>
      <td>{billingSchedule.referenceId}</td>
      <td>
        <div>
          {/* jobs */}
          {billingSchedule.linkedJobIds.map((jobId) => (
            <JobScheduleItem key={jobId} jobId={jobId} />
          ))}

          {/* job info responses */}
          {mappedJobInfoResponses.map((jir) => (
            <JobInfoResponseScheduleItem
              key={jir.id}
              currentJobInfoResponseId={currentJobInfoResponseId}
              jobInfoResponse={jir}
            />
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
