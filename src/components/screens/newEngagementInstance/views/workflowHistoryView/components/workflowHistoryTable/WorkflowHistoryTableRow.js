import { memo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const propTypes = {
  workflowStepRunLog: PropTypes.object.isRequired
};

const WorkflowHistoryTableRow = ({ workflowStepRunLog }) => {
  // **********************************************************************
  // * constants

  const DATE_TIME_FORMAT = 'MM/dd/yyyy h:mm a';
  const { workflowStepDisplayName, stepStartDateTime, stepEndDateTime, actionedByUserFullName, actionTaken } =
    workflowStepRunLog;

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
      <td>{workflowStepDisplayName}</td>
      <td>{format(new Date(stepStartDateTime), DATE_TIME_FORMAT)}</td>
      <td>{format(new Date(stepEndDateTime), DATE_TIME_FORMAT)}</td>
      <td>{actionedByUserFullName}</td>
      <td>{actionTaken}</td>
    </tr>
  );
};

WorkflowHistoryTableRow.propTypes = propTypes;

export default memo(WorkflowHistoryTableRow);
