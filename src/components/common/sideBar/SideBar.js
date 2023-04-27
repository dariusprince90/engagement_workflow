import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './SideBar.scss';
import { selectSideBarState, expand, collapse } from './sideBarSlice';
import ExpanderMenuItem from './menuItems/ExpanderMenuItem';
import MenuItem from './menuItems/MenuItem';

import NewEngagementInstanceScreenMenuItems from '../../screens/newEngagementInstance/components/sideBarMenuItems/SideBarMenuItems';

const SideBar = () => {
  // **********************************************************************
  // * constants

  const NAV_CLASS__EXPANDED = 'expanded';
  const NAV_CLASS__COLLAPSED = 'collapsed';

  // **********************************************************************
  // * component vars

  const dispatch = useDispatch();
  const { isExpanded } = useSelector(selectSideBarState);
  const sideBarExpandedClass = isExpanded ? NAV_CLASS__EXPANDED : NAV_CLASS__COLLAPSED;

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <nav
      className={`side-bar ${sideBarExpandedClass}`}
      onMouseEnter={() => dispatch(expand(false))}
      onMouseLeave={() => dispatch(collapse(false))}
      data-testid="side-bar-nav">
      {/* render components for menu items based on route */}
      <Routes>
        {/* new engagement instance screen */}
        <Route path="/" element={<NewEngagementInstanceScreenMenuItems key={1} />} />
        <Route path="/:newEngagementInstanceId" element={<NewEngagementInstanceScreenMenuItems key={2} />} />
      </Routes>

      {/* separator / filler */}
      <MenuItem menuItemClass="filler" />

      {/* side bar expander */}
      <ExpanderMenuItem />
    </nav>
  );
};

export default SideBar;
