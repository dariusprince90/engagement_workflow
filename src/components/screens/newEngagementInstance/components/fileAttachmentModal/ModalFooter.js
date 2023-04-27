import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectIsReadyToUpload, selectMetadata, selectModalStates } from './fileAttachmentModalSlice';

const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

const ModalFooter = ({ onCancel, onSave }) => {
  // **********************************************************************
  // * constants

  const MODAL_STATES = useSelector(selectModalStates);
  const isReadyToUpload = useSelector(selectIsReadyToUpload);
  const { modalState } = useSelector(selectMetadata);

  // **********************************************************************
  // * component vars

  // the close button should be disabled when the modal is in the "saving attachment" state
  const closeButtonDisabled = modalState === MODAL_STATES.savingAttachment;

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div>
      {modalState === MODAL_STATES.fileSelection && (
        <>
          <button className="btn btn-primary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" disabled={!isReadyToUpload} onClick={onSave}>
            Save
          </button>
        </>
      )}

      {modalState !== MODAL_STATES.fileSelection && (
        <button className="btn btn-primary" onClick={onCancel} disabled={closeButtonDisabled}>
          Close
        </button>
      )}
    </div>
  );
};

ModalFooter.propTypes = propTypes;

export default ModalFooter;
