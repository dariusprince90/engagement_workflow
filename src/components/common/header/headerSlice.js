import { createSlice } from '@reduxjs/toolkit';

// **********************************************************************
// * constants

// **********************************************************************
// * functions

// **********************************************************************
// * thunks

// **********************************************************************
// * initial state

const initialState = { pageTitle: '', pageSubtitle: '' };

// **********************************************************************
// * slice

const headerSlice = createSlice({
  name: 'pageHeader',
  initialState,

  reducers: {
    pageTitleChanged: (state, action) => {
      state.pageTitle = action.payload;
    },

    pageSubtitleChanged: (state, action) => {
      state.pageSubtitle = action.payload;
    }
  },

  extraReducers: (builder) => {}
});

// **********************************************************************
// * actions

export const { pageTitleChanged, pageSubtitleChanged } = headerSlice.actions;

// **********************************************************************
// * selectors

export const selectPageTitle = (state) => state.pageHeader.pageTitle;
export const selectPageSubtitle = (state) => state.pageHeader.pageSubtitle;

// **********************************************************************
// * reducer

export default headerSlice.reducer;
