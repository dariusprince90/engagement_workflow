import { memo } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  clientContactPhoneNumber: PropTypes.shape({
    internationalPhoneCode: PropTypes.number.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    phoneDeviceTypeName: PropTypes.string.isRequired,
    isPrimary: PropTypes.bool.isRequired
  }).isRequired
};

let PhoneNumber = ({ clientContactPhoneNumber }) => {
  // **********************************************************************
  // * constants

  const { phoneDeviceTypeName, internationalPhoneCode, phoneNumber, isPrimary } = clientContactPhoneNumber;

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div>
      {phoneDeviceTypeName}:&nbsp;+{internationalPhoneCode}&nbsp;{phoneNumber}&nbsp;
      {isPrimary && <span className="text-muted">(primary)</span>}
    </div>
  );
};

PhoneNumber = memo(PhoneNumber);
PhoneNumber.propTypes = propTypes;
PhoneNumber.displayName = 'PhoneNumber';

export default PhoneNumber;
