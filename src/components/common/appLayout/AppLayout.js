import { useSelector } from 'react-redux';

import './AppLayout.scss';

import { selectShowSideBar } from './appLayoutSlice';
import Header from '../header/Header';
import SideBar from '../sideBar/SideBar';
import AppContent from '../appContent/AppContent';

const AppLayout = () => {
  // **********************************************************************
  // * constants

  const showSideBar = useSelector(selectShowSideBar);

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className="app-layout">
      {/* header */}
      <div className="header-container">
        <Header />
      </div>

      {/* body */}
      <div className="body-container">
        {/* side bar */}
        {showSideBar && (
          <div className="nav-container">
            <SideBar />
          </div>
        )}

        {/* app content */}
        <div className="app-content-container">
          <AppContent />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
