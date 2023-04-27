import { useSelector, useDispatch } from 'react-redux';

import { selectSideBarState, forceToggle } from '../sideBarSlice';
import MenuItem from './MenuItem';

const ExpanderMenuItem = () => {
  // **********************************************************************
  // * constants

  const ICON_NAME__EXPANDED = 'angle-double-left';
  const ICON_NAME_COLLAPSED = 'angle-double-right';
  const TITLE__EXPANDED = 'click to minimize the side bar';
  const TITLE_COLLAPSED = 'click to keep the side bar open';

  // **********************************************************************
  // * component vars

  const dispatch = useDispatch();
  const { isExpanded, lockExpanded } = useSelector(selectSideBarState);
  const title = lockExpanded ? TITLE__EXPANDED : TITLE_COLLAPSED;
  const icon = ['fas', isExpanded ? ICON_NAME__EXPANDED : ICON_NAME_COLLAPSED];

  // **********************************************************************
  // * functions

  const handleExpanderClicked = () => {
    dispatch(forceToggle());
  };

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return <MenuItem icon={icon} title={title} onClick={handleExpanderClicked} menuItemClass="expander" />;
};

export default ExpanderMenuItem;
