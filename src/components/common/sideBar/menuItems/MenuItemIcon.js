import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  icon: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired
};

const MenuItemIcon = ({ icon }) => {
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
    <div className="icon">
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

MenuItemIcon.propTypes = propTypes;

export default MenuItemIcon;
