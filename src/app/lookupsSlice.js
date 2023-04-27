import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import clientsApi from '../api/centralDataStore/clientsApi';
import jobsApi from '../api/centralDataStore/jobsApi';

// **********************************************************************
// * constants

/**
 * The name of the slice (to be used in the slice and thunks).
 */
export const SLICE_NAME = 'lookups';

// **********************************************************************
// * functions

// **********************************************************************
// * thunks

/**
 * Ensure a client exists in the cache for a given client id.
 */
export const ensureClientExistsInCache = createAsyncThunk(
  'lookups/ensureClientExistsInCache',
  async (clientId, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const fields = 'id,displayName';

    // if the clientId is already in the pending load collection or in the load error collection
    // then, do nothing (we don't need to attempt to load the same client multiple times)
    if (
      state.lookups.clientsCache.clientIdsPendingLoad.includes(clientId) ||
      state.lookups.clientsCache.clientIdsWithLoadError.includes(clientId)
    ) {
      return;
    }

    // trigger the start of the load
    dispatch(clientLoadingStarted(clientId));

    // try to get the client from the cache
    let client = state.lookups.clientsCache.clients.find((j) => j.id === clientId);

    // if the client was not in the cache
    // then, load the client from the API and insert it into the cache
    if (!client) {
      client = await clientsApi.getClient(clientId, fields);

      // if the client was not returned from the API
      // then there is an error, return a rejected response
      if (!client) {
        // trigger the end of the load
        dispatch(clientLoadingCompleted(clientId));

        // reject
        return rejectWithValue();
      }

      // add the client to the cache
      dispatch(clientAddedToCache(client));
    }

    // trigger the end of the load
    dispatch(clientLoadingCompleted(clientId));
  }
);

/**
 * Ensure a job exists in the cache for a given job id.
 */
export const ensureJobExistsInCache = createAsyncThunk(
  'lookups/ensureJobExistsInCache',
  async (jobId, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const fields = 'id,externalProjectReference,clientId';

    // if the jobId is already in the pending load collection or in the load error collection
    // then, do nothing (we don't need to attempt to load the same job multiple times)
    if (
      state.lookups.jobsCache.jobIdsPendingLoad.includes(jobId) ||
      state.lookups.jobsCache.jobIdsWithLoadError.includes(jobId)
    ) {
      return;
    }

    // trigger the start of the load
    dispatch(jobLoadingStarted(jobId));

    // try to get the job from the cache
    let job = state.lookups.jobsCache.jobs.find((j) => j.id === jobId);

    // if the job was not in the cache
    // then, load the job from the API and insert it into the cache
    if (!job) {
      job = await jobsApi.getJob(jobId, fields);

      // if the job was not returned from the API
      // then there is an error, return a rejected response
      if (!job) {
        // trigger the end of the load
        dispatch(jobLoadingCompleted(jobId));

        // reject
        return rejectWithValue();
      }

      // add the job to the cache
      dispatch(jobAddedToCache(job));
    }

    // trigger the end of the load
    dispatch(jobLoadingCompleted(jobId));
  }
);

// **********************************************************************
// * initial state

const initialState = {
  // cache of client objects that can be re-used without having to hit the API each time we need the client
  clientsCache: {
    // the collection of clients that have been cached
    clients: [],

    // collection of client ids that are pending load from the API
    clientIdsPendingLoad: [],

    // collection of client ids that had an error when loading
    clientIdsWithLoadError: []
  },

  // cache of job objects that can be re-used without having to hit the API each time we need the job
  jobsCache: {
    // the collection of jobs that have been cached
    jobs: [],

    // collection of job ids that are pending load from the API
    jobIdsPendingLoad: [],

    // collection of job ids that had an error when loading
    jobIdsWithLoadError: []
  }
};

// **********************************************************************
// * slice

const lookupsSlice = createSlice({
  name: 'lookups',
  initialState,

  reducers: {
    /**
     * Adds the client to the cache.
     * @param {object} state - The redux state object.
     * @param {object} action - The action that was dispatched.
     */
    clientAddedToCache: (state, action) => {
      const client = action.payload;
      state.clientsCache.clients.push(client);
    },

    /**
     * Removes the client id from the pending load collection.
     * @param {object} state - The redux state object.
     * @param {object} action - The action that was dispatched.
     */
    clientLoadingCompleted: (state, action) => {
      const clientIdToRemove = action.payload;

      state.clientsCache.clientIdsPendingLoad = state.clientsCache.clientIdsPendingLoad.filter(
        (clientId) => clientId !== clientIdToRemove
      );
    },

    /**
     * Adds the client id to the pending load collection (if not already in it).
     * @param {object} state - The redux state object.
     * @param {object} action - The action that was dispatched.
     */
    clientLoadingStarted: (state, action) => {
      const clientId = action.payload;

      if (!state.clientsCache.clientIdsPendingLoad.includes(clientId)) {
        state.clientsCache.clientIdsPendingLoad.push(clientId);
      }
    },

    /**
     * Adds the job to the cache.
     * @param {object} state - The redux state object.
     * @param {object} action - The action that was dispatched.
     */
    jobAddedToCache: (state, action) => {
      const job = action.payload;
      state.jobsCache.jobs.push(job);
    },

    /**
     * Removes the job id from the pending load collection.
     * @param {object} state - The redux state object.
     * @param {object} action - The action that was dispatched.
     */
    jobLoadingCompleted: (state, action) => {
      const jobIdToRemove = action.payload;

      state.jobsCache.jobIdsPendingLoad = state.jobsCache.jobIdsPendingLoad.filter((jobId) => jobId !== jobIdToRemove);
    },

    /**
     * Adds the job id to the pending load collection (if not already in it).
     * @param {object} state - The redux state object.
     * @param {object} action - The action that was dispatched.
     */
    jobLoadingStarted: (state, action) => {
      const jobId = action.payload;

      if (!state.jobsCache.jobIdsPendingLoad.includes(jobId)) {
        state.jobsCache.jobIdsPendingLoad.push(jobId);
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // **********************************************************************
      // * ensureClientExistsInCache
      .addCase(ensureClientExistsInCache.rejected, (state, action) => {
        const clientId = action.meta.arg;

        // if the client id is not in the error collection, add it
        if (!state.clientsCache.clientIdsWithLoadError.includes(clientId)) {
          state.clientsCache.clientIdsWithLoadError.push(clientId);
        }

        // if the client id is in the pending load collection, remove it
        if (state.clientsCache.clientIdsPendingLoad.includes(clientId)) {
          state.clientsCache.clientIdsPendingLoad = state.clientsCache.clientIdsPendingLoad.filter(
            (id) => id !== clientId
          );
        }
      })

      // **********************************************************************
      // * ensureJobExistsInCache
      .addCase(ensureJobExistsInCache.rejected, (state, action) => {
        const jobId = action.meta.arg;

        // if the job id is not in the error collection, add it
        if (!state.jobsCache.jobIdsWithLoadError.includes(jobId)) {
          state.jobsCache.jobIdsWithLoadError.push(jobId);
        }

        // if the job id is in the pending load collection, remove it
        if (state.jobsCache.jobIdsPendingLoad.includes(jobId)) {
          state.jobsCache.jobIdsPendingLoad = state.jobsCache.jobIdsPendingLoad.filter((id) => id !== jobId);
        }
      });
  }
});

// **********************************************************************
// * actions

export const {
  clientAddedToCache,
  clientLoadingCompleted,
  clientLoadingStarted,
  jobAddedToCache,
  jobLoadingCompleted,
  jobLoadingStarted
} = lookupsSlice.actions;

// **********************************************************************
// * selectors

/**
 * Select a client by id.
 * @param {object} state - The redux state object.
 * @param {*} clientId - The id of the client to select.
 * @returns The client with the given id.
 */
export const selectClient = (state, clientId) =>
  state.lookups.clientsCache.clients.find((client) => client.id === clientId);

/**
 * Select clients.
 * @param {object} state - The redux state object.
 * @returns The clients in the cache.
 */
export const selectClients = (state) => state.lookups.clientsCache.clients;

/**
 * Select a job by id.
 * @param {object} state - The redux state object.
 * @param {*} jobId - The id of the job to select.
 * @returns The job with the given id.
 */
export const selectJob = (state, jobId) => state.lookups.jobsCache.jobs.find((job) => job.id === jobId);

// **********************************************************************
// * reducer

export default lookupsSlice.reducer;
