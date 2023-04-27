import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { toastConfig } from './configs/toastConfig';
import { selectApplicationFaultInfo } from './components/common/appLayout/appLayoutSlice';

import AppVersionController from './components/common/appVersionController/AppVersionController';
import AppLayout from './components/common/appLayout/AppLayout';
import PageNotFound from './components/common/404/404';
import PageOverlay from './components/common/pageOverlay/PageOverlay';
import UserInfo from './components/common/userInfo/UserInfo';

/* istanbul ignore next -- justification: this is for design-time only */
const DesignTimeOverlay = React.lazy(() => import('./components/designTime/DesignTimeOverlay'));

function App() {
  // **********************************************************************
  // * constants

  const { hasFault: hasApplicationFault } = useSelector(selectApplicationFaultInfo);

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <>
      {/* app version controller */}
      <AppVersionController />

      {/* routes */}
      <Routes>
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<AppLayout />} />
      </Routes>

      {/* user info container for dynatrace et al. */}
      <UserInfo />

      {/* container for displaying toasts */}
      <ToastContainer {...toastConfig} />

      {/* show the page overlay when there is an application fault */}
      {hasApplicationFault && <PageOverlay />}

      {
        /* include the design-time overlay only when in development mode */
        /* istanbul ignore next -- justification: this is for design-time only */
        process.env.NODE_ENV === 'development' && process.env.REACT_APP__ENABLE_DESIGN_TIME_OVERLAY === 'true' && (
          <Suspense fallback={<div>Loading...</div>}>
            <DesignTimeOverlay />
          </Suspense>
        )
      }
    </>
  );
}

export default App;
