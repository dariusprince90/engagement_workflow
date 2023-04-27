import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import staffApi from '../api/centralDataStore/staffApi';

// **********************************************************************
// * constants

// **********************************************************************
// * functions

// **********************************************************************
// * thunks

/**
 * ensure a staff exists in our cache for a given staff id or azure aad object id
 *
 * * NOTE: either a staffId or azureAdObjectId can be in the incoming arg object
 * *       if both are present, the staffId will be used
 */
export const ensureStaffExistsInCache = createAsyncThunk(
  'staff/ensureStaffExistsInCache',
  async ({ staffId, azureAdObjectId }, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const staffIdentifier = staffId || azureAdObjectId;
    const fields = 'id,preferredFullName,emailAddress,azureAdObjectId';

    // if the staffId or azureAdObjectId is already in the pending load collection or in the load error collection
    // then, do nothing (we don't need to attempt to load the same staff multiple times)
    if (
      state.staff.staffCache.staffIdentifiersPendingLoad.includes(staffIdentifier) ||
      state.staff.staffCache.staffIdentifiersWithLoadError.includes(staffIdentifier)
    ) {
      return;
    }

    // trigger the start of the load
    dispatch(staffLoadingStarted(staffIdentifier));

    // try to get the staff from the cache
    let staff = state.staff.staffCache.staff.find(
      (s) => (!!staffId && s.id === staffId) || (!!azureAdObjectId && s.azureAdObjectId === azureAdObjectId)
    );

    // if the staff was not in the cache
    // then, load the staff from the API and insert it into the cache
    if (!staff) {
      if (!!staffId) {
        staff = await staffApi.getStaff(staffId, fields);
      } else {
        staff = await staffApi.getStaffByAzureAdObjectId(azureAdObjectId, fields);
      }

      // if the staff was not returned from the API
      // then there is an error, return a rejected response
      if (!staff) {
        // trigger the end of the load
        dispatch(staffLoadingCompleted(staffIdentifier));

        // reject
        return rejectWithValue();
      }

      // add the staff to the cache
      dispatch(staffAddedToCache(staff));
    }

    // trigger the end of the load
    dispatch(staffLoadingCompleted(staffIdentifier));
  }
);

// **********************************************************************
// * initial state

const initialState = {
  // info about the authenticated user from MSAL
  userAuthInfo: {
    userName: null,
    displayName: null,
    userObjectId: null
  },

  // cache of staff objects that can be re-used without having to hit the API each time we need the staff
  staffCache: {
    // the collection of staff that has been cached
    staff: [],

    // collection of staff identifiers that are pending load from the API
    staffIdentifiersPendingLoad: [],

    // collection of staff identifiers that had an error when loading
    staffIdentifiersWithLoadError: []
  }
};

// **********************************************************************
// * slice

const staffSlice = createSlice({
  name: 'staff',
  initialState,

  reducers: {
    // when triggered, add the staff to the cache
    staffAddedToCache: (state, action) => {
      const staff = action.payload;
      state.staffCache.staff.push(staff);
    },

    // when triggered, remove the staff identifier from the pending load collection
    staffLoadingCompleted: (state, action) => {
      const staffIdentifierToRemove = action.payload;

      state.staffCache.staffIdentifiersPendingLoad = state.staffCache.staffIdentifiersPendingLoad.filter(
        (staffIdentifier) => staffIdentifier !== staffIdentifierToRemove
      );
    },

    // when triggered, add the staff identifier to the pending load collection (if not already in it)
    staffLoadingStarted: (state, action) => {
      const staffIdentifier = action.payload;

      if (!state.staffCache.staffIdentifiersPendingLoad.includes(staffIdentifier)) {
        state.staffCache.staffIdentifiersPendingLoad.push(staffIdentifier);
      }
    },

    // when triggered, set the user auth info properties
    userAuthInfoChanged: (state, action) => {
      const { userName, displayName, userObjectId } = action.payload;
      state.userAuthInfo = { userName, displayName, userObjectId };
    }
  },

  extraReducers: (builder) => {
    builder.addCase(ensureStaffExistsInCache.rejected, (state, action) => {
      const { staffId, azureAdObjectId } = action.meta.arg;
      const staffIdentifier = staffId || azureAdObjectId;

      // if the staff identifier is not in the error collection, add it
      if (!state.staffCache.staffIdentifiersWithLoadError.includes(staffIdentifier)) {
        state.staffCache.staffIdentifiersWithLoadError.push(staffIdentifier);
      }

      // if the staff identifier is in the pending load collection, remove it
      if (state.staffCache.staffIdentifiersPendingLoad.includes(staffIdentifier)) {
        state.staffCache.staffIdentifiersPendingLoad = state.staffCache.staffIdentifiersPendingLoad.filter(
          (si) => si !== staffIdentifier
        );
      }
    });
  }
});

// **********************************************************************
// * actions

export const { staffAddedToCache, staffLoadingCompleted, staffLoadingStarted, userAuthInfoChanged } =
  staffSlice.actions;

// **********************************************************************
// * selectors

// selects the current users' staff object from the cache
export const selectCurrentUserFromCache = (state) => {
  const userObjectId = state.staff.userAuthInfo.userObjectId;
  const staff = state.staff.staffCache.staff.find((s) => s.azureAdObjectId === userObjectId);

  return staff;
};

// select a staff by id
export const selectStaff = (state, staffId) => state.staff.staffCache.staff.find((s) => s.id === staffId);

// selects the user's auth info
export const selectUserAuthInfo = (state) => state.staff.userAuthInfo;

// **********************************************************************
// * reducer

export default staffSlice.reducer;
