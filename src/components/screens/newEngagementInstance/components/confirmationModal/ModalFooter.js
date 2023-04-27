import PropTypes from 'prop-types';

import CONFIRMATION_MODAL_TYPES from '../../../../../helpers/enums/confirmationModalTypes';

const propTypes = {
  confirmationType: PropTypes.oneOf(Object.values(CONFIRMATION_MODAL_TYPES)).isRequired,
  confirmButtonText: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

const ModalFooter = ({ confirmationType, confirmButtonText, onConfirm, onCancel }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  const confirmButtonClass = `btn btn-${confirmationType.contextClass}`;

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div>
      <button className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
      <button className={confirmButtonClass} onClick={onConfirm}>
        {confirmButtonText}
      </button>
    </div>
  );
};

ModalFooter.propTypes = propTypes;

export default ModalFooter;
