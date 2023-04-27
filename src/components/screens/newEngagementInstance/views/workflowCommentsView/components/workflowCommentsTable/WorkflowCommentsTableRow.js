import { memo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const propTypes = {
  workflowComments: PropTypes.object.isRequired
};

const WorkflowCommentsTableRow = ({ workflowComments }) => {
  // **********************************************************************
  // * constants

  const DATE_TIME_FORMAT = 'MM/dd/yyyy  h:mm a';
  const { createdOn, createdByStaffNumber, commentTypeId, comments } = workflowComments;

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
      <td>{format(new Date(createdOn), DATE_TIME_FORMAT)}</td>
      <td>{createdByStaffNumber}</td>
      <td>{commentTypeId}</td>
      <td>{comments}</td>
    </tr>
  );
};

WorkflowCommentsTableRow.propTypes = propTypes;

export default memo(WorkflowCommentsTableRow);
