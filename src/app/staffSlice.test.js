import faker from '@faker-js/faker';

import staffApi from '../api/centralDataStore/staffApi';
import staffReducer, {
  ensureStaffExistsInCache,
  selectCurrentUserFromCache,
  selectStaff,
  selectUserAuthInfo,
  staffAddedToCache,
  staffLoadingCompleted,
  staffLoadingStarted,
  userAuthInfoChanged
} from './staffSlice';

// **********************************************************************
// * constants

const initialState = {
  userAuthInfo: {
    userName: faker.internet.email(),
    displayName: faker.name.firstName()
  },

  staffCache: {
    staff: [],
    staffIdentifiersPendingLoad: [],
    staffIdentifiersWithLoadError: []
  }
};

const reduxState = {
  staff: {
    ...initialState
  }
};

// **********************************************************************
// * mock external dependencies

jest.mock('../api/centralDataStore/staffApi', () => {
  return {
    getStaff: jest.fn(),
    getStaffByAzureAdObjectId: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('staffSlice', () => {
  describe('actions', () => {
    describe('staffAddedToCache', () => {
      it('adds the staff to staffCache.staff', () => {
        // * ARRANGE
        const staff = { fakeProperty: faker.datatype.number() };
        const payload = staff;
        const expectedState = {
          ...initialState,
          staffCache: { ...initialState.staffCache, staff: [...initialState.staffCache.staff, staff] }
        };

        // * ACT
        const actualState = staffReducer(initialState, staffAddedToCache(payload));

        // * ASSERT
        expect(actualState).toEqual(expectedState);
      });
    });

    describe('staffLoadingCompleted', () => {
      it('removes the staff identifier from the pending load collection when the identifier is in the collection', () => {
        // * ARRANGE
        const staffIdentifier = faker.random.alphaNumeric(10);
        const expectedArray = [...faker.datatype.array()];
        const state = {
          ...initialState,
          staffCache: { ...initialState.staffCache, staffIdentifiersPendingLoad: [...expectedArray, staffIdentifier] }
        };
        const expectedState = {
          ...initialState,
          staffCache: { ...initialState.staffCache, staffIdentifiersPendingLoad: [...expectedArray] }
        };

        // * ACT
        const actualState = staffReducer(state, staffLoadingCompleted(staffIdentifier));

        // * ASSERT
        expect(actualState).toEqual(expectedState);
      });

      it('does not modify the pending load collection when the identifier is not in the collection', () => {
        // * ARRANGE
        const staffIdentifier = faker.random.alphaNumeric(10);
        const expectedArray = [...faker.datatype.array()];
        const state = {
          ...initialState,
          staffCache: { ...initialState.staffCache, staffIdentifiersPendingLoad: [...expectedArray] }
        };

        // * ACT
        const actualState = staffReducer(state, staffLoadingCompleted(staffIdentifier));

        // * ASSERT
        expect(actualState).toEqual(state);
      });
    });

    describe('staffLoadingStarted', () => {
      it('adds the staff identifier to the pending load collection when the identifier is not in the collection', () => {
        // * ARRANGE
        const staffIdentifier = faker.random.alphaNumeric(10);
        const expectedArray = [...faker.datatype.array()];
        const state = {
          ...initialState,
          staffCache: { ...initialState.staffCache, staffIdentifiersPendingLoad: [...expectedArray] }
        };
        const expectedState = {
          ...initialState,
          staffCache: { ...initialState.staffCache, staffIdentifiersPendingLoad: [...expectedArray, staffIdentifier] }
        };

        // * ACT
        const actualState = staffReducer(state, staffLoadingStarted(staffIdentifier));

        // * ASSERT
        expect(actualState).toEqual(expectedState);
      });

      it('does not modify the pending load collection when the identifier is already in the collection', () => {
        // * ARRANGE
        const staffIdentifier = faker.random.alphaNumeric(10);
        const expectedArray = [...faker.datatype.array()];
        const state = {
          ...initialState,
          staffCache: { ...initialState.staffCache, staffIdentifiersPendingLoad: [...expectedArray, staffIdentifier] }
        };

        // * ACT
        const actualState = staffReducer(state, staffLoadingStarted(staffIdentifier));

        // * ASSERT
        expect(actualState).toEqual(state);
      });
    });

    describe('userAuthInfoChanged', () => {
      it('updates userAuthInfo', () => {
        // * ARRANGE
        const payload = { userName: faker.internet.email(), displayName: faker.name.firstName() };
        const expectedState = { ...initialState, userAuthInfo: payload };

        // * ACT
        const actualState = staffReducer(initialState, userAuthInfoChanged(payload));

        // * ASSERT
        expect(actualState).toEqual(expectedState);
      });
    });
  });

  describe('selectors', () => {
    describe('selectCurrentUserFromCache', () => {
      it("returns the current user's staff record from the cache", () => {
        const userObjectId = faker.random.alphaNumeric(10);
        const expectedStaff = { azureAdObjectId: userObjectId };
        const state = {
          staff: {
            userAuthInfo: { userObjectId },
            staffCache: {
              staff: [
                { azureAdObjectId: faker.random.alphaNumeric(10) },
                expectedStaff,
                { azureAdObjectId: faker.random.alphaNumeric(10) }
              ]
            }
          }
        };
        const actual = selectCurrentUserFromCache(state);
        expect(actual).toBe(expectedStaff);
      });
    });

    describe('selectStaff', () => {
      it('returns the staff with the given staffId', () => {
        const staffId = faker.datatype.number();
        const expected = { id: staffId };
        const state = { staff: { staffCache: { staff: [{ id: staffId - 1 }, expected, { id: staffId + 1 }] } } };
        const actual = selectStaff(state, staffId);
        expect(actual).toEqual(expected);
      });
    });

    describe('selectUserAuthInfo', () => {
      it('returns userAuthInfo when invoked', () => {
        const expectedValue = initialState.userAuthInfo;
        const actualValue = selectUserAuthInfo(reduxState);
        expect(actualValue).toEqual(expectedValue);
      });
    });
  });

  describe('thunks', () => {
    describe('ensureStaffExistsInCache', () => {
      const THUNK_ACTION_TYPE = 'staff/ensureStaffExistsInCache';

      describe.each([
        {
          staffId: faker.datatype.number(),
          azureAdObjectId: null,
          staffIdentifierType: 'staffId',
          staffPropertyName: 'id',
          allowedApiMethod: 'getStaff',
          disallowedApiMethod: 'getStaffByAzureAdObjectId'
        },
        {
          staffId: null,
          azureAdObjectId: faker.random.alphaNumeric(10),
          staffIdentifierType: 'azureAdObjectId',
          staffPropertyName: 'azureAdObjectId',
          allowedApiMethod: 'getStaffByAzureAdObjectId',
          disallowedApiMethod: 'getStaff'
        }
      ])(
        'using $staffIdentifierType as the staff identifier',
        ({ staffId, azureAdObjectId, staffPropertyName, allowedApiMethod, disallowedApiMethod }) => {
          it('does nothing when the staff identifier is already in the pending load collection', async () => {
            // * ARRANGE
            const arg = { staffId, azureAdObjectId };
            const staffIdentifier = staffId || azureAdObjectId;
            const state = { staff: { staffCache: { staffIdentifiersPendingLoad: [staffIdentifier] } } };
            const dispatch = jest.fn();
            const getState = jest.fn().mockReturnValue(state);

            // * ACT
            await ensureStaffExistsInCache(arg)(dispatch, getState);

            // * ASSERT
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: `${THUNK_ACTION_TYPE}/pending` }));
            expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: `${THUNK_ACTION_TYPE}/fulfilled` }));
          });

          it('does not attempt to fetch the staff from api when staff is already in the cache', async () => {
            // * ARRANGE
            const arg = { staffId, azureAdObjectId };
            const staffIdentifier = staffId || azureAdObjectId;
            const state = {
              staff: {
                staffCache: {
                  staff: [{ [staffPropertyName]: staffIdentifier }],
                  staffIdentifiersPendingLoad: [],
                  staffIdentifiersWithLoadError: []
                }
              }
            };
            const dispatch = jest.fn();
            const getState = jest.fn().mockReturnValue(state);

            // * ACT
            await ensureStaffExistsInCache(arg)(dispatch, getState);

            // * ASSERT
            expect(dispatch).toHaveBeenCalledTimes(4);
            expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: `${THUNK_ACTION_TYPE}/pending` }));
            expect(dispatch).toHaveBeenCalledWith({ payload: staffIdentifier, type: `staff/staffLoadingStarted` });
            expect(dispatch).toHaveBeenCalledWith({ payload: staffIdentifier, type: `staff/staffLoadingCompleted` });
            expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: `${THUNK_ACTION_TYPE}/fulfilled` }));
            expect(staffApi.getStaff).not.toHaveBeenCalled();
            expect(staffApi.getStaffByAzureAdObjectId).not.toHaveBeenCalled();
          });

          it('attempts to fetch the staff from the api when the staff is not in the cache', async () => {
            // * ARRANGE
            const arg = { staffId, azureAdObjectId };
            const state = {
              staff: {
                staffCache: {
                  staff: [],
                  staffIdentifiersPendingLoad: [],
                  staffIdentifiersWithLoadError: []
                }
              }
            };
            const dispatch = jest.fn();
            const getState = jest.fn().mockReturnValue(state);

            // * ACT
            await ensureStaffExistsInCache(arg)(dispatch, getState);

            // * ASSERT
            expect(staffApi[allowedApiMethod]).toHaveBeenCalled();
            expect(staffApi[disallowedApiMethod]).not.toHaveBeenCalled();
          });

          it('dispatches correct actions when the staff is not in the cache', async () => {
            // * ARRANGE
            const arg = { staffId, azureAdObjectId };
            const staffIdentifier = staffId || azureAdObjectId;
            const state = {
              staff: {
                staffCache: {
                  staff: [],
                  staffIdentifiersPendingLoad: [],
                  staffIdentifiersWithLoadError: []
                }
              }
            };
            const dispatch = jest.fn();
            const getState = jest.fn().mockReturnValue(state);
            const staff = { [staffPropertyName]: staffIdentifier };
            staffApi[allowedApiMethod].mockReturnValue(staff);

            // * ACT
            await ensureStaffExistsInCache(arg)(dispatch, getState);

            // * ASSERT
            expect(dispatch).toHaveBeenCalledTimes(5);
            expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: `${THUNK_ACTION_TYPE}/pending` }));
            expect(dispatch).toHaveBeenCalledWith({ payload: staffIdentifier, type: 'staff/staffLoadingStarted' });
            expect(dispatch).toHaveBeenCalledWith({ payload: staff, type: 'staff/staffAddedToCache' });
            expect(dispatch).toHaveBeenCalledWith({ payload: staffIdentifier, type: 'staff/staffLoadingCompleted' });
            expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: `${THUNK_ACTION_TYPE}/fulfilled` }));
          });

          it('dispatches correct actions when the staff is not returned from the api', async () => {
            // * ARRANGE
            const arg = { staffId, azureAdObjectId };
            const staffIdentifier = staffId || azureAdObjectId;
            const state = {
              staff: {
                staffCache: {
                  staff: [],
                  staffIdentifiersPendingLoad: [],
                  staffIdentifiersWithLoadError: []
                }
              }
            };
            const dispatch = jest.fn();
            const getState = jest.fn().mockReturnValue(state);
            staffApi[allowedApiMethod].mockReturnValue(null);

            // * ACT
            await ensureStaffExistsInCache(arg)(dispatch, getState);

            // * ASSERT
            expect(dispatch).toHaveBeenCalledTimes(4);
            expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: `${THUNK_ACTION_TYPE}/pending` }));
            expect(dispatch).toHaveBeenCalledWith({ payload: staffIdentifier, type: 'staff/staffLoadingStarted' });
            expect(dispatch).toHaveBeenCalledWith({ payload: staffIdentifier, type: 'staff/staffLoadingCompleted' });
            expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: `${THUNK_ACTION_TYPE}/rejected` }));
          });
        }
      );
    });
  });

  describe('extra reducers', () => {
    describe('ensureStaffExistsInCache', () => {
      describe.each([
        { staffId: faker.datatype.number(), azureAdObjectId: null, staffIdentifierType: 'staffId' },
        { staffId: null, azureAdObjectId: faker.random.alphaNumeric(10), staffIdentifierType: 'azureAdObjectId' }
      ])('using $staffIdentifierType as the staff identifier', ({ staffId, azureAdObjectId }) => {
        describe('rejected', () => {
          it('adds the staff identifier to staffCache.staffIdentifiersWithLoadError when the staff identifier is not in the collection', () => {
            // * ARRANGE
            const actionType = ensureStaffExistsInCache.rejected.type;
            const arg = { staffId, azureAdObjectId };
            const staffIdentifier = staffId || azureAdObjectId;
            const action = { type: actionType, meta: { arg } };
            const state = { ...initialState, staffCache: { ...initialState.staffCache } };
            const expectedState = {
              ...initialState,
              staffCache: {
                ...initialState.staffCache,
                staffIdentifiersWithLoadError: [staffIdentifier]
              }
            };

            // * ACT
            const actualState = staffReducer(state, action);

            // * ASSERT
            expect(actualState).toEqual(expectedState);
          });

          it('does not modify staffCache.staffIdentifiersWithLoadError when the staff identifier is already in the collection', () => {
            // * ARRANGE
            const actionType = ensureStaffExistsInCache.rejected.type;
            const arg = { staffId, azureAdObjectId };
            const staffIdentifier = staffId || azureAdObjectId;
            const action = { type: actionType, meta: { arg } };
            const state = {
              ...initialState,
              staffCache: { ...initialState.staffCache, staffIdentifiersWithLoadError: [staffIdentifier] }
            };

            // * ACT
            const actualState = staffReducer(state, action);

            // * ASSERT
            expect(actualState).toEqual(state);
          });

          it('removes the staff identifier from staffCache.staffIdentifiersPendingLoad when the staff identifier is in the collection', () => {
            // * ARRANGE
            const actionType = ensureStaffExistsInCache.rejected.type;
            const arg = { staffId, azureAdObjectId };
            const staffIdentifier = staffId || azureAdObjectId;
            const action = { type: actionType, meta: { arg } };
            const state = {
              ...initialState,
              staffCache: { ...initialState.staffCache, staffIdentifiersPendingLoad: [staffIdentifier] }
            };
            const expectedState = {
              ...initialState,
              staffCache: {
                ...initialState.staffCache,
                staffIdentifiersPendingLoad: [],
                staffIdentifiersWithLoadError: [staffIdentifier]
              }
            };

            // * ACT
            const actualState = staffReducer(state, action);

            // * ASSERT
            expect(actualState).toEqual(expectedState);
          });

          it('does not modify staffCache.staffIdentifiersPendingLoad when the staff identifier is not in the collection', () => {
            // * ARRANGE
            const actionType = ensureStaffExistsInCache.rejected.type;
            const arg = { staffId, azureAdObjectId };
            const staffIdentifier = staffId || azureAdObjectId;
            const action = { type: actionType, meta: { arg } };
            const state = {
              ...initialState,
              staffCache: { ...initialState.staffCache, staffIdentifiersPendingLoad: [] }
            };
            const expectedState = {
              ...initialState,
              staffCache: {
                ...initialState.staffCache,
                staffIdentifiersPendingLoad: [],
                staffIdentifiersWithLoadError: [staffIdentifier]
              }
            };

            // * ACT
            const actualState = staffReducer(state, action);

            // * ASSERT
            expect(actualState).toEqual(expectedState);
          });
        });
      });
    });
  });
});
