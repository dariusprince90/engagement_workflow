import { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  clientContactAddress: PropTypes.shape({
    id: PropTypes.number.isRequired,
    contactInfoResponseId: PropTypes.number.isRequired,
    address1: PropTypes.string,
    address2: PropTypes.string,
    city: PropTypes.string,
    postalCode: PropTypes.string,
    countryHierarchyId: PropTypes.number.isRequired,
    isPrimary: PropTypes.bool.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

let ClientContactDetailsCard = ({ clientContactAddress, onEdit, onDelete }) => {
  // **********************************************************************
  // * constants

  const { address1, address2, city, postalCode, isPrimary } = clientContactAddress;

  // **********************************************************************
  // * component vars

  // ! this is a temporary strings to allow the components to render
  // ! once the APIs are integrated, the data will be populated from there
  const stateName = 'MI';
  const countryName = 'United States';

  const cityStateZip = `${city}, ${stateName} ${postalCode}`;

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
        <div>{isPrimary ? 'PRIMARY ADDRESS' : <>&nbsp;</>}</div>
        <FontAwesomeIcon
          icon="fa-solid fa-pen-to-square"
          className="text-info icon-clickable"
          size="lg"
          title="Edit Address"
          onClick={onEdit}
        />
      </div>

      {/* body */}
      <div className="card-body">
        <h5>{address1}</h5>
        <div>
          <div>{address2}</div>
          <div>{cityStateZip}</div>
          <div>{countryName}</div>
        </div>
      </div>

      {/* footer */}
      <div className="card-footer">
        <FontAwesomeIcon
          icon="fa-solid fa-circle-x"
          className="text-danger icon-clickable"
          size="lg"
          title="Delete Address"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

ClientContactDetailsCard = memo(ClientContactDetailsCard);
ClientContactDetailsCard.propTypes = propTypes;

export default ClientContactDetailsCard;
