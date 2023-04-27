/* istanbul ignore file -- justification: this is a design-time component and doesn't need to be tested */

import { useState } from 'react';

import './ModalExample.scss';
import Modal from '../../common/modals/Modal';

const ModalExample = () => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  const [isStandardOpen, setIsStandardOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const modalTitle = <div>[this is the title]</div>;
  const modalBody = <div>[this is the body]</div>;
  const modalFooter = <div>[this is the footer]</div>;

  // **********************************************************************
  // * functions

  const onCancel = () => {
    setIsStandardOpen(false);
    setIsCustomOpen(false);
  };

  const openModal = (type) => {
    type === 'standard' ? setIsStandardOpen(true) : setIsCustomOpen(true);
  };

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <>
      <button className="btn btn-sm btn-light" onClick={() => openModal('standard')}>
        modal:standard
      </button>

      <button className="btn btn-sm btn-light" onClick={() => openModal('custom')}>
        modal:custom
      </button>

      <Modal
        isOpen={isStandardOpen}
        onClose={onCancel}
        title={modalTitle}
        body={modalBody}
        footer={modalFooter}></Modal>

      <Modal
        isOpen={isCustomOpen}
        onClose={onCancel}
        title={modalTitle}
        body={modalBody}
        footer={modalFooter}
        modalClassName={{
          base: 'react-modal-content-custom',
          afterOpen: 'react-modal-content-custom-after-open',
          beforeClose: 'react-modal-content-custom-before-close'
        }}></Modal>
    </>
  );
};

export default ModalExample;
