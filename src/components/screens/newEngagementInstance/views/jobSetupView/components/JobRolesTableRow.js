import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { selectStaff } from '../../../../../../app/staffSlice';
import { selectLookup } from '../../../newEngagementInstanceSlice';

const propTypes = {
  jobRole: PropTypes.shape({
    id: PropTypes.number.isRequired,
    etag: PropTypes.string.isRequired,
    roleId: PropTypes.number.isRequired,
    staffNumber: PropTypes.number.isRequired
  }),
  onDelete: PropTypes.func.isRequired
};

let JobRolesTableRow = ({ jobRole, onDelete }) => {
  // **********************************************************************
  // * constants

  const staff = useSelector((state) => selectStaff(state, jobRole.staffNumber));
  const staffName = staff?.preferredFullName;
  const jobRoles = useSelector((state) => selectLookup(state, 'jobRoles'));
  const roleDisplayName = jobRoles.data.find((jr) => jr.id === jobRole.roleId).displayName;

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  const handleDeleteIconClick = useCallback(() => {
    onDelete(jobRole.id, roleDisplayName, staffName);
  }, [jobRole.id, onDelete, roleDisplayName, staffName]);

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <tr>
      <td>{roleDisplayName}</td>
      <td>{staffName}</td>
      <td>
        <FontAwesomeIcon
          className="delete-icon"
          icon="fa-solid fa-circle-x"
          size="lg"
          onClick={handleDeleteIconClick}
        />
      </td>
    </tr>
  );
};

JobRolesTableRow = memo(JobRolesTableRow);
JobRolesTableRow.propTypes = propTypes;
JobRolesTableRow.displayName = 'JobRolesTableRow';

export default JobRolesTableRow;
