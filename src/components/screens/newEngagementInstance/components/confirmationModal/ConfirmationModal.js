import PropTypes from 'prop-types';

import './ConfirmationModal.scss';

import CONFIRMATION_MODAL_TYPES from '../../../../../helpers/enums/confirmationModalTypes';

import Modal from '../../../../common/modals/Modal';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  confirmationType: PropTypes.oneOf(Object.values(CONFIRMATION_MODAL_TYPES)).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmButtonText: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

const ConfirmationModal = ({ isOpen, confirmationType, title, message, confirmButtonText, onConfirm, onCancel }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  const bodyProps = { confirmationType, message };
  const footerProps = { confirmationType, confirmButtonText, onConfirm, onCancel };

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <Modal
      modalClassName={{ base: 'confirmation-modal' }}
      isOpen={isOpen}
      title={title}
      onClose={onCancel}
      body={<ModalBody {...bodyProps} />}
      footer={<ModalFooter {...footerProps} />}
    />
  );
};

ConfirmationModal.propTypes = propTypes;

export default ConfirmationModal;
