import { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  onClick: PropTypes.func.isRequired
};

let CreateNewBillingScheduleTableRow = ({ onClick }) => {
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
    <tr className="create-new-billing-schedule-table-row">
      <td colSpan={2}>
        <FontAwesomeIcon
          icon="fa-solid fa-circle-plus"
          className="icon-clickable"
          fixedWidth
          size="xl"
          onClick={onClick}
        />
        &ensp;Create New Billing Schedule
      </td>
    </tr>
  );
};

CreateNewBillingScheduleTableRow = memo(CreateNewBillingScheduleTableRow);
CreateNewBillingScheduleTableRow.propTypes = propTypes;
CreateNewBillingScheduleTableRow.displayName = 'CreateNewBillingScheduleTableRow';

export default CreateNewBillingScheduleTableRow;
