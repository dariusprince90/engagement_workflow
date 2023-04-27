import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CONFIRMATION_MODAL_TYPES from '../../../../../helpers/enums/confirmationModalTypes';

const propTypes = {
  confirmationType: PropTypes.oneOf(Object.values(CONFIRMATION_MODAL_TYPES)).isRequired,
  message: PropTypes.node.isRequired
};

const ModalBody = ({ confirmationType, message }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  const iconClass = `text-${confirmationType.contextClass}`;

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render
  return (
    <>
      <FontAwesomeIcon icon={confirmationType.icon} size="2x" className={iconClass} />
      <div>{message}</div>
    </>
  );
};

ModalBody.propTypes = propTypes;

export default ModalBody;
