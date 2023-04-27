import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string.isRequired
};

const MenuItemLabel = ({ label }) => {
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

  return <div className="label">{label}</div>;
};

MenuItemLabel.propTypes = propTypes;

export default MenuItemLabel;
