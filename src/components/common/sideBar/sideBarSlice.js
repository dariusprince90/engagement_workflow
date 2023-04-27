import { createSlice } from '@reduxjs/toolkit';

// **********************************************************************
// * constants

// **********************************************************************
// * functions

// **********************************************************************
// * thunks

// **********************************************************************
// * initial state

const initialState = {
  isExpanded: false,
  lockExpanded: false
};

// **********************************************************************
// * slice

const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,

  reducers: {
    collapse: (state, action) => {
      const force = action.payload;

      // if we are expanded and EITHER
      //  - lockExpanded is false OR
      //  - force is true
      // then collapse
      if (state.isExpanded && (!state.lockExpanded || force)) {
        state.isExpanded = false;
        state.lockExpanded = false;
      }
    },

    expand: (state, action) => {
      const lock = action.payload;

      // always set expanded
      state.isExpanded = true;

      // if we are not already locked
      // then set locked based on input
      if (!state.lockExpanded) {
        state.lockExpanded = lock;
      }
    },

    forceToggle: (state) => {
      // if we are expanded and locked
      // then force a collapse: set expanded and locked to false
      if (state.isExpanded && state.lockExpanded) {
        state.isExpanded = false;
        state.lockExpanded = false;
        return;
      }

      // if we are not locked
      // then expand and lock
      if (!state.lockExpanded) {
        state.isExpanded = true;
        state.lockExpanded = true;
      }
    }
  }
});

// **********************************************************************
// * actions

export const { collapse, expand, forceToggle } = sideBarSlice.actions;

// **********************************************************************
// * selectors
export const selectSideBarState = (state) => state.sideBar;

// **********************************************************************
// * reducer

export default sideBarSlice.reducer;
