import { store } from './store';

// **********************************************************************
// * constants

const appLayoutReducerProp = 'app-layout-prop';
const lookupsReducerProp = 'lookups-prop';
const neiFileAttachmentModalReducerProp = 'nei-file-attachment-modal-prop';
const newEngagementInstanceReducerProp = 'new-engagement-instance-prop';
const pageHeaderProp = 'page-header-prop';
const staffReducerProp = 'staff-prop';
const sideBarReducerProp = 'sideBar-prop';

const expectedOptions = {
  reducer: {
    appLayout: { appLayoutProp: appLayoutReducerProp },
    lookups: { lookupsProp: lookupsReducerProp },
    neiFileAttachmentModal: { neiFileAttachmentModalProp: neiFileAttachmentModalReducerProp },
    newEngagementInstance: { newEngagementInstanceProp: newEngagementInstanceReducerProp },
    pageHeader: { pageHeaderProp: pageHeaderProp },
    staff: { staffProp: staffReducerProp },
    sideBar: { sideBarProp: sideBarReducerProp }
  }
};

// **********************************************************************
// * mock external dependencies

jest.mock('../components/common/appLayout/appLayoutSlice', () => {
  return {
    __esModule: true,
    default: { appLayoutProp: appLayoutReducerProp }
  };
});

jest.mock('../components/common/header/headerSlice', () => {
  return {
    __esModule: true,
    default: { pageHeaderProp: pageHeaderProp }
  };
});

jest.mock('../components/screens/newEngagementInstance/components/fileAttachmentModal/fileAttachmentModalSlice', () => {
  return {
    __esModule: true,
    default: { neiFileAttachmentModalProp: neiFileAttachmentModalReducerProp }
  };
});

jest.mock('../components/screens/newEngagementInstance/newEngagementInstanceSlice', () => {
  return {
    __esModule: true,
    default: { newEngagementInstanceProp: newEngagementInstanceReducerProp }
  };
});

jest.mock('./lookupsSlice', () => {
  return {
    __esModule: true,
    default: { lookupsProp: lookupsReducerProp }
  };
});

jest.mock('./staffSlice', () => {
  return {
    __esModule: true,
    default: { staffProp: staffReducerProp }
  };
});

jest.mock('../components/common/sideBar/sideBarSlice', () => {
  return {
    __esModule: true,
    default: { sideBarProp: sideBarReducerProp }
  };
});

jest.mock('@reduxjs/toolkit', () => {
  return {
    configureStore: (options) => {
      return options;
    }
  };
});

// **********************************************************************
// * unit tests

describe('store', () => {
  it('configures the store with the correct options', () => {
    expect(store).toEqual(expectedOptions);
  });
});
