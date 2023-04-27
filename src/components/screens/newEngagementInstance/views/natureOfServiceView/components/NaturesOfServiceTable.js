import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CONFIRMATION_MODAL_TYPES from '../../../../../../helpers/enums/confirmationModalTypes';
import { JOB_SETUP_VIEW_PREFIX, selectNatureOfServiceJobInfoResponses } from '../../../newEngagementInstanceSlice';
import { deleteJobInfoResponse } from '../../../newEngagementInstanceThunks';

import TableHeader from '../../../../../common/tables/TableHeader';
import TableInfoMessage from '../../../../../common/tables/TableInfoMessage';
import NaturesOfServiceTableRow from './NaturesOfServiceTableRow';
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal';

let NaturesOfServiceTable = () => {
  // **********************************************************************
  // * constants

  const columnHeaders = ['Nature of Service', 'Job Name', 'Job Type', ''];
  const jobInfoResponses = useSelector(selectNatureOfServiceJobInfoResponses);
  const dispatch = useDispatch();

  // **********************************************************************
  // * component vars

  const [confirmModal, setConfirmModal] = useState({ isOpen: false, message: '' });

  // **********************************************************************
  // * functions

  const confirmJobDelete = (jobInfoResponseId, etag, jobName) => {
    const message = !!jobName
      ? `Are you sure you want to delete the "${jobName}" job?`
      : `Are you sure you want to delete this job?`;
    const confirmModalData = { ...confirmModal, isOpen: true, message, jobInfoResponseId, etag };
    setConfirmModal(confirmModalData);
  };

  const handleCancelJobDelete = () => {
    const confirmModalData = { ...confirmModal, isOpen: false, jobInfoResponseId: null };
    setConfirmModal(confirmModalData);
  };

  const handleJobDelete = async () => {
    const { jobInfoResponseId, etag } = confirmModal;
    const viewId = `${JOB_SETUP_VIEW_PREFIX}${jobInfoResponseId}`;
    const args = { viewId, jobInfoResponseId, etag };
    dispatch(deleteJobInfoResponse(args));

    const confirmModalData = { ...confirmModal, isOpen: false, jobInfoResponseId: null };
    setConfirmModal(confirmModalData);
  };

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className="table-responsive">
      <table className="table table-sm table-striped natures-of-service-table">
        <TableHeader columnHeaders={columnHeaders} />

        <tbody>
          {/* no natures of service message */}
          {jobInfoResponses.length === 0 && (
            <TableInfoMessage
              colSpan={columnHeaders.length}
              displayMessage="No natures of service have been selected."
            />
          )}

          {/* nature of service rows */}
          {jobInfoResponses.map((jobInfoResponse) => (
            <NaturesOfServiceTableRow
              key={jobInfoResponse.id}
              jobInfoResponse={jobInfoResponse}
              onDelete={confirmJobDelete}
            />
          ))}
        </tbody>
      </table>

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        confirmationType={CONFIRMATION_MODAL_TYPES.danger}
        title="Delete Job?"
        message={confirmModal.message}
        confirmButtonText="Delete Job"
        onCancel={handleCancelJobDelete}
        onConfirm={handleJobDelete}
      />
    </div>
  );
};

NaturesOfServiceTable = memo(NaturesOfServiceTable);

export default NaturesOfServiceTable;
