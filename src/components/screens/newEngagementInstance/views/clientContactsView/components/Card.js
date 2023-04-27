import { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import { selectLookups } from '../../../newEngagementInstanceSlice';
import PhoneNumber from './PhoneNumber';
import ReceiveInfoContainer from './ReceiveInfoContainer';

const propTypes = {
  clientContact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    prefixId: PropTypes.number,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    suffixId: PropTypes.number,
    emailAddress: PropTypes.string,
    receiveCustomerInvoice: PropTypes.bool.isRequired,
    receiveCustomerStatement: PropTypes.bool.isRequired,
    isPrimary: PropTypes.bool.isRequired,
    clientContactPhoneNumbers: PropTypes.array.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

let Card = ({ clientContact, onEdit, onDelete }) => {
  // **********************************************************************
  // * constants

  const {
    prefixId,
    firstName,
    lastName,
    suffixId,
    emailAddress,
    receiveCustomerInvoice,
    receiveCustomerStatement,
    isPrimary,
    clientContactPhoneNumbers
  } = clientContact;

  const { prefixes, suffixes } = useSelector(selectLookups);

  const prefixName = prefixes.data.find((p) => p.id === prefixId)?.displayName;
  const suffixName = suffixes.data.find((p) => p.id === suffixId)?.displayName;

  // **********************************************************************
  // * component vars

  const contactName = [prefixName, firstName, lastName, suffixName].join(' ');

  const phoneNumbers = clientContactPhoneNumbers.map((clientContactPhoneNumber, index) => (
    <PhoneNumber clientContactPhoneNumber={clientContactPhoneNumber} key={index} />
  ));

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render
  return (
    <div className="card border-primary">
      {/* header */}
      <div className="card-header">
        <div>{isPrimary ? 'PRIMARY CONTACT' : <>&nbsp;</>}</div>
        <FontAwesomeIcon
          icon="fa-solid fa-pen-to-square"
          className="text-info icon-clickable"
          size="lg"
          title="Edit Contact"
          onClick={onEdit}
        />
      </div>

      {/* body */}
      <div className="card-body">
        <h5 className="card-title">{contactName}</h5>
        <h6 className="card-subtitle text-muted">{emailAddress}</h6>
        <div>{phoneNumbers}</div>
        <ReceiveInfoContainer
          receiveCustomerInvoice={receiveCustomerInvoice}
          receiveCustomerStatement={receiveCustomerStatement}
        />
      </div>

      {/* footer */}
      <div className="card-footer">
        <FontAwesomeIcon
          icon="fa-solid fa-circle-x"
          className="text-danger icon-clickable"
          size="lg"
          title="Delete Contact"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

Card = memo(Card);
Card.propTypes = propTypes;

export default Card;
