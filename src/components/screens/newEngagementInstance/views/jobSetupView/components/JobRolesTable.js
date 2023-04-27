import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CONFIRMATION_MODAL_TYPES from '../../../../../../helpers/enums/confirmationModalTypes';

import { selectCurrentView, selectCurrentViewId } from '../../../newEngagementInstanceSlice';
import { deleteJobRole } from '../../../newEngagementInstanceThunks';

import TableHeader from '../../../../../common/tables/TableHeader';
import TableLoadingMessage from '../../../../../common/tables/TableLoadingMessage';
import TableErrorMessage from '../../../../../common/tables/TableErrorMessage';
import TableInfoMessage from '../../../../../common/tables/TableInfoMessage';
import JobRolesTableRow from './JobRolesTableRow';
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal';

let JobRolesTable = () => {
  // **********************************************************************
  // * constants

  const dispatch = useDispatch();
  const currentViewId = useSelector(selectCurrentViewId);
  const { lookups } = useSelector(selectCurrentView);
  const { jobRoles } = lookups;
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, message: '' });

  // **********************************************************************
  // * component vars

  const columnHeaders = ['Role', 'Staff', ''];

  // **********************************************************************
  // * functions

  const confirmJobRoleDelete = (jobRoleId, roleName, staffName) => {
    const message = `Are you sure you want to delete the "${roleName}" job role for ${staffName}?`;
    const confirmModalData = { ...confirmModal, isOpen: true, message, jobRoleId };
    setConfirmModal(confirmModalData);
  };

  const handleCancelJobRoleDelete = () => {
    const confirmModalData = { ...confirmModal, isOpen: false, jobRoleId: null };
    setConfirmModal(confirmModalData);
  };

  const handleJobRoleDelete = async () => {
    const { jobRoleId } = confirmModal;
    const jobRole = jobRoles.data.find((jr) => jr.id === jobRoleId);
    const args = { viewId: currentViewId, jobRoleId: jobRole.id, etag: jobRole.etag };
    dispatch(deleteJobRole(args));

    const confirmModalData = { ...confirmModal, isOpen: false, jobRoleId: null };
    setConfirmModal(confirmModalData);
  };

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className="table-responsive">
      <table className="table table-sm table-striped job-roles-table">
        <TableHeader columnHeaders={columnHeaders} />

        <tbody>
          {/* loading message */}
          {jobRoles.isLoading && (
            <TableLoadingMessage colSpan={columnHeaders.length} displayMessage="Loading job roles..." />
          )}

          {/* error message */}
          {!jobRoles.isLoading && jobRoles.hasError && (
            <TableErrorMessage
              colSpan={columnHeaders.length}
              displayMessage={jobRoles.error.friendlyMessage}
              error={jobRoles.error}
            />
          )}

          {/* no job roles message */}
          {!jobRoles.isLoading && !jobRoles.hasError && jobRoles.data.length === 0 && (
            <TableInfoMessage colSpan={columnHeaders.length} displayMessage="No job roles have been added." />
          )}

          {/* job roles table rows */}
          {!jobRoles.isLoading &&
            !jobRoles.hasError &&
            jobRoles.data.length > 0 &&
            jobRoles.data.map((jobRole) => (
              <JobRolesTableRow key={jobRole.id} jobRole={jobRole} onDelete={confirmJobRoleDelete} />
            ))}
        </tbody>
      </table>

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        confirmationType={CONFIRMATION_MODAL_TYPES.danger}
        title="Delete Job Role?"
        message={confirmModal.message}
        confirmButtonText="Delete Job Role"
        onCancel={handleCancelJobRoleDelete}
        onConfirm={handleJobRoleDelete}
      />
    </div>
  );
};

JobRolesTable = memo(JobRolesTable);
JobRolesTable.displayName = 'JobRolesTable';

export default JobRolesTable;
