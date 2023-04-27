import { createSlice } from '@reduxjs/toolkit';

import LOCAL_STORAGE_KEYS from '../../../helpers/enums/localStorageKeys';
import * as config from '../../../configs/config';

// **********************************************************************
// * constants

// **********************************************************************
// * functions

// **********************************************************************
// * thunks

// **********************************************************************
// * initial state

const initialState = {
  applicationFaultInfo: {
    hasFault: false,
    faultMessage: null,
    faultError: null
  },

  showSideBar: false,

  metadata: {
    newAppVersionAvailable: false
  }
};

// **********************************************************************
// * slice

const appLayoutSlice = createSlice({
  name: 'appLayout',
  initialState,
  reducers: {
    applicationFaulted: (state, action) => {
      const { faultMessage, error } = action.payload;

      state.applicationFaultInfo = {
        hasFault: true,
        faultMessage: faultMessage,
        faultError: error
      };
    },

    appVersionChecked: (state) => {
      const appVersion = config.App.version;
      const localStorageKey = LOCAL_STORAGE_KEYS.app.version.name;
      const localStorageAppVersion = localStorage.getItem(localStorageKey);

      // if we have no app version in local storage
      // write the version to storage
      if (!localStorageAppVersion) {
        localStorage.setItem(localStorageKey, appVersion);
        return;
      }

      // if the app versions don't match
      // update new app version available
      if (appVersion !== localStorageAppVersion) {
        state.metadata.newAppVersionAvailable = true;
      }
    },

    hideSideBar: (state) => {
      state.showSideBar = false;
    },

    showSideBar: (state) => {
      state.showSideBar = true;
    }
  }
});

// **********************************************************************
// * actions

export const { applicationFaulted, appVersionChecked, hideSideBar, showSideBar } = appLayoutSlice.actions;

// **********************************************************************
// * selectors

export const selectApplicationFaultInfo = (state) => state.appLayout.applicationFaultInfo;
export const selectMetadata = (state) => state.appLayout.metadata;
export const selectShowSideBar = (state) => state.appLayout.showSideBar;

// **********************************************************************
// * reducer

export default appLayoutSlice.reducer;
