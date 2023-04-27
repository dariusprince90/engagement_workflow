import { memo } from 'react';
import PropTypes from 'prop-types';

import INPUT_GROUP_ADD_ON_LOCATIONS from '../../../../../helpers/enums/inputGroupAddOnLocations';
import AddOnBase from './AddOnBase';

const propTypes = {
  locationType: PropTypes.oneOf(Object.values(INPUT_GROUP_ADD_ON_LOCATIONS)).isRequired,
  text: PropTypes.string.isRequired
};

let TextAddOn = ({ locationType, text }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <AddOnBase locationType={locationType}>
      <span className="input-group-text">{text}</span>
    </AddOnBase>
  );
};

TextAddOn = memo(TextAddOn);
TextAddOn.propTypes = propTypes;
TextAddOn.displayName = 'TextAddOn';

export default TextAddOn;
