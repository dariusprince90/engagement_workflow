import { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { selectSideBarState } from '../sideBarSlice';
import MenuItemIcon from './MenuItemIcon';
import MenuItemLabel from './MenuItemLabel';

const propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string,
  title: PropTypes.string,
  useLabelAsTitle: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string])
};

let LinkMenuItem = ({ to, label, title: titleProp, useLabelAsTitle, icon }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  const { isExpanded } = useSelector(selectSideBarState);

  // show the icon only when we have an icon value
  const showIcon = !!icon;

  // show the label only when isExpanded is true and label has a value
  const showLabel = isExpanded && !!label;

  // if useLabelAsTitle is true, use the label as the title, else use the title
  const title = useLabelAsTitle ? label : titleProp;

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <NavLink end to={to} title={title} className="menu-item">
      {showIcon && <MenuItemIcon icon={icon} />}
      {showLabel && <MenuItemLabel label={label} />}
    </NavLink>
  );
};

LinkMenuItem = memo(LinkMenuItem);
LinkMenuItem.propTypes = propTypes;

export default LinkMenuItem;
