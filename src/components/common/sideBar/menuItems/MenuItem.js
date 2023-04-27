import { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectSideBarState } from '../sideBarSlice';
import MenuItemIcon from './MenuItemIcon';
import MenuItemLabel from './MenuItemLabel';

const propTypes = {
  label: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  title: PropTypes.string,
  useLabelAsTitle: PropTypes.bool,
  isActive: PropTypes.bool,
  menuItemClass: PropTypes.string,
  onClick: PropTypes.func
};

let MenuItem = ({ label, icon, title: titleProp, useLabelAsTitle, isActive, menuItemClass, onClick }) => {
  // **********************************************************************
  // * constants

  const MENU_ITEM_ACTIVE_CLASS = 'active';

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

  const buildMenuItemClassName = () => {
    let className = 'menu-item';

    if (isActive) {
      className += ` ${MENU_ITEM_ACTIVE_CLASS}`;
    }

    if (!!menuItemClass) {
      className += ` ${menuItemClass}`;
    }

    return className;
  };

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className={buildMenuItemClassName()} title={title} onClick={onClick} data-testid="menu-item">
      {showIcon && <MenuItemIcon icon={icon} />}
      {showLabel && <MenuItemLabel label={label} />}
    </div>
  );
};

MenuItem = memo(MenuItem);
MenuItem.propTypes = propTypes;

export default MenuItem;
