import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import bsCustomFileInput from 'bs-custom-file-input';

import './FileAttachmentModal.scss';

import { createAttachment, modalClosed, selectMetadata } from './fileAttachmentModalSlice';

import Modal from '../../../../common/modals/Modal';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

const propTypes = {
  onSaveCompleted: PropTypes.func
};

const FileAttachmentModal = ({ onSaveCompleted }) => {
  // **********************************************************************
  // * constants

  const dispatch = useDispatch();
  const uploadFileRef = useRef();
  const { isOpen } = useSelector(selectMetadata);

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  /**
   * after the modal opens
   * - initialize the custom file input
   */
  const handleModalAfterOpen = () => {
    bsCustomFileInput.init();
  };

  /**
   * when the cancel button is clicked
   * - dispatch modalClosed
   */
  const handleCancelButtonClick = () => {
    dispatch(modalClosed());
  };

  /**
   * when the save button is clicked
   * - get the file that was selected
   * - dispatch createAttachment, passing the file
   *   - note: the file is an instance of File (web file api)
   *   - https://developer.mozilla.org/en-US/docs/Web/API/File
   * - if onSaveCompleted is defined, invoke it
   */
  const handleSaveButtonClick = async () => {
    const file = uploadFileRef.current.files[0];
    const options = { file };

    await dispatch(createAttachment(options));

    if (!!onSaveCompleted) {
      onSaveCompleted();
    }
  };

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <Modal
      modalClassName={{ base: 'nei-file-attachment-modal' }}
      title="Add Attachment"
      isOpen={isOpen}
      onClose={handleCancelButtonClick}
      onAfterOpen={handleModalAfterOpen}
      body={<ModalBody uploadFileRef={uploadFileRef} />}
      footer={<ModalFooter onCancel={handleCancelButtonClick} onSave={handleSaveButtonClick} />}
    />
  );
};

FileAttachmentModal.propTypes = propTypes;

export default FileAttachmentModal;
