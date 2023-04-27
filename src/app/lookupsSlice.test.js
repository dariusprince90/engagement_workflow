import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import faker from '@faker-js/faker';

import lookupsReducer from './lookupsSlice';

// **********************************************************************
// * constants

const initialState = {};
const reduxState = {};

const mockStore = configureMockStore([thunk])(initialState);

// **********************************************************************
// * functions

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('lookupsSlice', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('actions', () => {});

  describe('selectors', () => {});

  describe('thunks', () => {
    // **********************************************************************
    // * setup

    beforeAll(() => {});

    beforeEach(() => {});

    // **********************************************************************
    // * tear-down

    afterEach(() => {});

    afterAll(() => {});

    // **********************************************************************
    // * execution
  });

  describe('extra reducers', () => {});
});
