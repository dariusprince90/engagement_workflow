import { configureStore } from '@reduxjs/toolkit';

import appLayoutReducer from '../components/common/appLayout/appLayoutSlice';
import headerReducer from '../components/common/header/headerSlice';
import lookupsReducer from './lookupsSlice';
import neiFileAttachmentModalReducer from '../components/screens/newEngagementInstance/components/fileAttachmentModal/fileAttachmentModalSlice';
import newEngagementInstanceReducer from '../components/screens/newEngagementInstance/newEngagementInstanceSlice';
import sideBarReducer from '../components/common/sideBar/sideBarSlice';
import staffReducer from './staffSlice';

const options = {
  reducer: {
    appLayout: appLayoutReducer,
    lookups: lookupsReducer,
    neiFileAttachmentModal: neiFileAttachmentModalReducer,
    newEngagementInstance: newEngagementInstanceReducer,
    pageHeader: headerReducer,
    staff: staffReducer,
    sideBar: sideBarReducer
  }
};

export const store = configureStore(options);
