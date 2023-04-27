import faker from '@faker-js/faker';

import LOCAL_STORAGE_KEYS from '../../../helpers/enums/localStorageKeys';
import * as config from '../../../configs/config';

import appLayoutReducer, {
  applicationFaulted,
  appVersionChecked,
  hideSideBar,
  selectApplicationFaultInfo,
  selectMetadata,
  selectShowSideBar,
  showSideBar
} from './appLayoutSlice';

// **********************************************************************
// * constants

const initialState = {
  appLayout: {
    applicationFaultInfo: {
      hasFault: null,
      faultMessage: null,
      faultError: null
    },

    showSideBar: null
  }
};

// **********************************************************************
// * mock external dependencies

jest.mock('../../../configs/config', () => ({ App: { version: 'app-version' } }));

// **********************************************************************
// * unit tests

describe('appLayoutSlice', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    jest.spyOn(window.localStorage.__proto__, 'setItem');
  });

  beforeEach(() => {
    window.localStorage.__proto__.getItem.mockReturnValue(null);
    window.localStorage.__proto__.setItem.mockImplementation(() => {});
  });

  // **********************************************************************
  // * tear-down

  afterEach(() => {
    window.localStorage.__proto__.getItem.mockReset();
    window.localStorage.__proto__.setItem.mockReset();
  });

  afterAll(() => {
    window.localStorage.__proto__.getItem.mockRestore();
    window.localStorage.__proto__.setItem.mockRestore();
  });

  // **********************************************************************
  // * execution

  describe('actions', () => {
    it('updates applicationFaultInfo when applicationFaulted is dispatched', () => {
      // * ARRANGE
      const payload = { faultMessage: faker.lorem.sentence(), error: faker.lorem.sentence() };
      const state = { ...initialState.appLayout, applicationFaultInfo: { hasFault: false, message: null } };
      const expectedState = {
        ...state,
        applicationFaultInfo: { hasFault: true, faultMessage: payload.faultMessage, faultError: payload.error }
      };

      // * ACT
      const actualState = appLayoutReducer(state, applicationFaulted(payload));

      // * ASSERT
      expect(actualState).toEqual(expectedState);
    });

    describe('appVersionChecked', () => {
      it('writes the app version to local storage when it does not yet exist', () => {
        const expectedAppVersion = config.App.version;
        const expectedKey = LOCAL_STORAGE_KEYS.app.version.name;
        const state = {};
        window.localStorage.__proto__.getItem.mockReturnValue(null);
        appLayoutReducer(state, appVersionChecked());
        expect(window.localStorage.__proto__.setItem).toHaveBeenCalledOnce();
        expect(window.localStorage.__proto__.setItem).toHaveBeenCalledWith(expectedKey, expectedAppVersion);
      });

      it('updates metadata.newAppVersionAvailable when the app versions do not match', () => {
        const localStorageAppVersion = faker.random.alpha(10);
        const state = { metadata: {} };
        const expectedState = { metadata: { newAppVersionAvailable: true } };
        window.localStorage.__proto__.getItem.mockReturnValue(localStorageAppVersion);
        const actualState = appLayoutReducer(state, appVersionChecked());
        expect(actualState).toEqual(expectedState);
      });

      it('does not write the app version to local storage when the app versions do not match', () => {
        const localStorageAppVersion = faker.random.alpha(10);
        const state = { metadata: {} };
        window.localStorage.__proto__.getItem.mockReturnValue(localStorageAppVersion);
        appLayoutReducer(state, appVersionChecked());
        expect(window.localStorage.__proto__.setItem).not.toHaveBeenCalled();
      });

      it('does nothing when the app versions match', () => {
        const localStorageAppVersion = config.App.version;
        const state = { metadata: {} };
        const expectedState = { metadata: {} };
        window.localStorage.__proto__.getItem.mockReturnValue(localStorageAppVersion);
        const actualState = appLayoutReducer(state, appVersionChecked());
        expect(actualState).toEqual(expectedState);
        expect(window.localStorage.__proto__.setItem).not.toHaveBeenCalled();
      });
    });

    it('sets showSideBar to false when hideSidBar is dispatched', () => {
      // * ARRANGE
      const state = { ...initialState.appLayout, showSideBar: true };
      const expectedState = { ...state, showSideBar: false };

      // * ACT
      const actualState = appLayoutReducer(state, hideSideBar());

      // * ASSERT
      expect(actualState).toEqual(expectedState);
    });
  });

  it('sets showSideBar to true when showSidBar is dispatched', () => {
    // * ARRANGE
    const state = { ...initialState.appLayout, showSideBar: false };
    const expectedState = { ...state, showSideBar: true };

    // * ACT
    const actualState = appLayoutReducer(state, showSideBar());

    // * ASSERT
    expect(actualState).toEqual(expectedState);
  });

  describe('selectors', () => {
    it('returns applicationFaultInfo when the selectApplicationFaultInfo selector is invoked', () => {
      const expectedValue = initialState.appLayout.applicationFaultInfo;
      const actualValue = selectApplicationFaultInfo(initialState);
      expect(actualValue).toEqual(expectedValue);
    });

    describe('selectMetadata', () => {
      it('returns metadata when invoked', () => {
        const state = { appLayout: { metadata: faker.random.alpha(10) } };
        const expectedValue = state.appLayout.metadata;
        const actualValue = selectMetadata(state);
        expect(actualValue).toEqual(expectedValue);
      });
    });

    it('returns showSideBar when the selectShowSideBar selector is invoked', () => {
      const expectedValue = initialState.appLayout.showSideBar;
      const actualValue = selectShowSideBar(initialState);
      expect(actualValue).toEqual(expectedValue);
    });
  });
});
