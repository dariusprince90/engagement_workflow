import { memo } from 'react';
import PropTypes from 'prop-types';

import './WorkflowCommentsModal.scss';

import COMMENT_TYPES from '../../../../../helpers/enums/commentTypes';
import Modal from '../../../../common/modals/Modal';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  commentType: PropTypes.oneOf(Object.values(COMMENT_TYPES)).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

let WorkflowCommentsModal = ({ isOpen, commentType, onCancel, onSubmit }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  const modalBodyProps = { commentType };
  const modalFooterProps = { commentType, onCancel, onSubmit };

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <Modal
      modalClassName={{ base: 'workflow-comments-modal' }}
      title={commentType.modalTitle}
      isOpen={isOpen}
      body={<ModalBody {...modalBodyProps} />}
      footer={<ModalFooter {...modalFooterProps} />}
      onClose={onCancel}
    />
  );
};

WorkflowCommentsModal.propTypes = propTypes;
WorkflowCommentsModal = memo(WorkflowCommentsModal);

export default WorkflowCommentsModal;
