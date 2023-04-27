import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectJobInfoResponsesMappedToNewBillingSchedule } from '../../../../newEngagementInstanceSlice';
import JobInfoResponseScheduleItem from './JobInfoResponseScheduleItem';

const propTypes = {
  currentJobInfoResponseId: PropTypes.number.isRequired,
  newBillingSchedule: PropTypes.shape({
    id: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

let NewBillingScheduleTableRow = ({ currentJobInfoResponseId, newBillingSchedule, onClick }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  // get all job info responses that are mapped to this new billing schedule
  // this will be used to show the job info responses with the new billing schedule
  const mappedJobInfoResponses = useSelector((state) =>
    selectJobInfoResponsesMappedToNewBillingSchedule(state, newBillingSchedule.id)
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
    onClick(newBillingSchedule.id);
  }, [newBillingSchedule.id, onClick]);
  const handleRowClick = isSelectableRow ? clickHandler : null;

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <tr className={rowClassName} title={rowTitle} onClick={handleRowClick}>
      <td>{newBillingSchedule.displayName}</td>
      <td>
        <div>
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

NewBillingScheduleTableRow = memo(NewBillingScheduleTableRow);
NewBillingScheduleTableRow.propTypes = propTypes;
NewBillingScheduleTableRow.displayName = 'NewBillingScheduleTableRow';

export default NewBillingScheduleTableRow;
