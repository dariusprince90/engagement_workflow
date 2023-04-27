import { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  receiveCustomerInvoice: PropTypes.bool.isRequired,
  receiveCustomerStatement: PropTypes.bool.isRequired
};

let ReceiveInfoContainer = ({ receiveCustomerInvoice, receiveCustomerStatement }) => {
  // **********************************************************************
  // * constants

  const TRUE_ICON = 'fa-solid fa-check';
  const TRUE_ICON_CLASS = 'text-success';

  const FALSE_ICON = 'fa-solid fa-xmark';
  const FALSE_ICON_CLASS = 'text-danger';

  // **********************************************************************
  // * component vars

  const invoiceIconProps = {
    icon: receiveCustomerInvoice ? TRUE_ICON : FALSE_ICON,
    className: receiveCustomerInvoice ? TRUE_ICON_CLASS : FALSE_ICON_CLASS,
    size: 'lg',
    fixedWidth: true
  };

  const statementIconProps = {
    icon: receiveCustomerStatement ? TRUE_ICON : FALSE_ICON,
    className: receiveCustomerStatement ? TRUE_ICON_CLASS : FALSE_ICON_CLASS,
    size: 'lg',
    fixedWidth: true
  };

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className="receive-info-container">
      <div className="receive-info-item">
        <div>Receive Customer Invoice</div>
        <FontAwesomeIcon {...invoiceIconProps} />
      </div>
      <div className="receive-info-item">
        <div>Receive Customer Statement</div>
        <FontAwesomeIcon {...statementIconProps} />
      </div>
    </div>
  );
};

ReceiveInfoContainer = memo(ReceiveInfoContainer);
ReceiveInfoContainer.propTypes = propTypes;
ReceiveInfoContainer.displayName = 'ReceiveInfoContainer';

export default ReceiveInfoContainer;
