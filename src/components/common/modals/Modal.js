import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAfterOpen: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.string]),
  body: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.string]).isRequired,
  footer: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.string]),
  modalClassName: PropTypes.shape({
    base: PropTypes.string,
    afterOpen: PropTypes.string,
    beforeClose: PropTypes.string
  })
};

const defaultOverlayClassName = {
  base: 'react-modal-overlay',
  afterOpen: 'react-modal-overlay-after-open',
  beforeClose: 'react-modal-overlay-before-close'
};

export const defaultClassName = {
  base: 'react-modal-content',
  afterOpen: 'react-modal-content-after-open',
  beforeClose: 'react-modal-content-before-close'
};

const Modal = ({ isOpen, onClose, onAfterOpen, title, body, footer, modalClassName }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  const className = {
    base: defaultClassName.base + ' ' + (modalClassName?.base || ''),
    afterOpen: defaultClassName.afterOpen + ' ' + (modalClassName?.afterOpen || ''),
    beforeClose: defaultClassName.beforeClose + ' ' + (modalClassName?.beforeClose || '')
  };

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterOpen={onAfterOpen}
      closeTimeoutMS={300}
      htmlOpenClassName="react-modal-html-open"
      bodyOpenClassName="react-modal-body-open"
      portalClassName="react-modal-portal"
      overlayClassName={defaultOverlayClassName}
      className={className}>
      <div className="modal-content">
        <div className="modal-header">
          {!!title && (
            <h5 className="modal-title" data-testid="modal-title">
              {title}
            </h5>
          )}
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            onClick={onClose}
            data-testid="modal-close-button">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="modal-body" data-testid="modal-body">
          {body}
        </div>

        {!!footer && (
          <div className="modal-footer" data-testid="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </ReactModal>
  );
};

Modal.propTypes = propTypes;

export default Modal;
