import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  attachmentTypeChanged,
  fileNameChanged,
  selectAttachment,
  selectMetadata,
  selectModalStates,
  selectUploadDetails,
  selectUploadStates
} from './fileAttachmentModalSlice';

import { selectLookups } from '../../newEngagementInstanceSlice';

import SelectInput from '../../../../common/inputControls/selectInput/SelectInput';
import ProgressAlert from '../../../../common/alerts/ProgressAlert';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from '../../../../common/alerts/ErrorAlert';

const propTypes = {
  uploadFileRef: PropTypes.object.isRequired
};

const ModalBody = ({ uploadFileRef }) => {
  // **********************************************************************
  // * constants

  const MODAL_STATES = useSelector(selectModalStates);
  const UPLOAD_STATES = useSelector(selectUploadStates);

  const dispatch = useDispatch();

  const { attachmentTypeId } = useSelector(selectAttachment);
  const { attachmentTypes } = useSelector(selectLookups);
  const { modalState, error } = useSelector(selectMetadata);
  const uploadDetails = useSelector(selectUploadDetails);

  // **********************************************************************
  // * component vars

  const [attachmentTypeOptions, setAttachmentTypeOptions] = useState([]);

  // **********************************************************************
  // * functions

  /**
   * when the attachment file changes
   * - determine the file name if a file is selected (empty string otherwise)
   * - dispatch fileNameChanged
   */
  const handleAttachmentFileChanged = () => {
    let fileName = '';

    if (uploadFileRef.current.files.length > 0) {
      fileName = uploadFileRef.current.files[0].name;
    }

    dispatch(fileNameChanged({ fileName }));
  };

  /**
   * when the attachment type changes
   * - get the attachment type id from the event
   * - dispatch attachmentTypeChanged
   * @param {object} event - The change event that was triggered by the control.
   */
  const handleAttachmentTypeChanged = (event) => {
    const attachmentTypeId = event.target.value;
    dispatch(attachmentTypeChanged({ attachmentTypeId }));
  };

  // **********************************************************************
  // * side effects

  /**
   * when attachmentTypes.data changes
   *  - populate attachmentTypeOptions
   */
  useEffect(
    function populateAttachmentTypeOptions() {
      // if there is no data, the options should be empty
      if (!attachmentTypes.data.length) {
        setAttachmentTypeOptions([]);
        return;
      }

      const options = attachmentTypes.data.map((attachmentType) => {
        return { value: attachmentType.id, text: attachmentType.displayName };
      });

      setAttachmentTypeOptions(options);
    },
    [attachmentTypes.data]
  );

  // **********************************************************************
  // * render

  return (
    <>
      {modalState === MODAL_STATES.fileSelection && (
        <>
          {/* file input */}
          <div className="custom-file">
            <input
              type="file"
              id="attachmentFile"
              className="custom-file-input"
              accept=".pdf,.docx,.doc,.xlsx"
              ref={uploadFileRef}
              onChange={handleAttachmentFileChanged}
              data-testid="attachment-file"
            />
            <label className="custom-file-label" htmlFor="attachmentFile">
              Choose a file
            </label>
          </div>

          {/* attachment type */}
          <SelectInput
            name="attachmentTypeId"
            value={attachmentTypeId}
            defaultOption="Select an attachment type..."
            options={attachmentTypeOptions}
            isLoading={attachmentTypes.isLoading}
            loadingText="Loading attachment types..."
            onChange={handleAttachmentTypeChanged}
          />
        </>
      )}

      {modalState === MODAL_STATES.savingAttachment && (
        <>
          {uploadDetails.uploadState === UPLOAD_STATES.preparing && (
            <ProgressAlert alertType="warning" message="Preparing upload..." />
          )}

          {uploadDetails.uploadState === UPLOAD_STATES.uploading && (
            <ProgressAlert
              alertType="info"
              message="Uploading attachment..."
              percentComplete={uploadDetails.percentComplete}
            />
          )}

          {uploadDetails.uploadState === UPLOAD_STATES.creatingAttachment && (
            <ProgressAlert alertType="info" message="Attaching file to your workflow..." />
          )}
        </>
      )}

      {modalState === MODAL_STATES.success && <SuccessAlert />}

      {modalState === MODAL_STATES.error && (
        <ErrorAlert displayMessage="An error occurred adding the attachment." error={error} />
      )}
    </>
  );
};

ModalBody.propTypes = propTypes;

export default ModalBody;
