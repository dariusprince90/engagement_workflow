/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { act, render } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as msalBrowser from '@azure/msal-browser';
import * as reactRedux from 'react-redux';

import Msal, { msalInstance } from './Msal';
import * as staffSlice from '../app/staffSlice';

// **********************************************************************
// * constants

const componentContents = faker.lorem.sentence();
const componentContentsForSnapshot = 'This is the contents for the snapshot.';

const FakeComponent = () => <fake-component>{componentContents}</fake-component>;
const FakeComponentForSnapshot = () => <fake-component>{componentContentsForSnapshot}</fake-component>;

const mockDispatch = jest.fn();

const componentToRender = (
  <Msal>
    <FakeComponent />
  </Msal>
);

const componentToRenderForSnapshot = (
  <Msal>
    <FakeComponentForSnapshot />
  </Msal>
);

let eventCallbacks = [];
const invokeAllCallbacks = (eventMessage) => {
  eventCallbacks.forEach((callback) => {
    callback(eventMessage);
  });
};

// **********************************************************************
// * mock external dependencies

jest.mock('@azure/msal-react', () => {
  return {
    MsalProvider: ({ children }) => {
      return <fake-msal-provider>{children}</fake-msal-provider>;
    },

    MsalAuthenticationTemplate: ({ children, interactionType, errorComponent, loadingComponent }) => {
      return (
        <fake-msal-auth-template data-interaction-type={interactionType}>
          <error-component>{errorComponent()}</error-component>
          <loading-component>{loadingComponent()}</loading-component>
          {children}
        </fake-msal-auth-template>
      );
    }
  };
});

jest.mock('@azure/msal-browser', () => {
  const originalModule = jest.requireActual('@azure/msal-browser');

  return {
    __esModule: true,
    ...originalModule,

    PublicClientApplication: jest.fn().mockImplementation(() => {
      return {
        addEventCallback: jest.fn(),
        getAllAccounts: jest.fn(),
        removeEventCallback: jest.fn()
      };
    })
  };
});

jest.mock('react-redux');

jest.mock('./MsalAppInsights', () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <fake-msal-app-insights>{children}</fake-msal-app-insights>;
    }
  };
});

jest.mock('./Error', () => {
  return {
    __esModule: true,
    default: () => {
      return <fake-error-component />;
    }
  };
});

jest.mock('../components/common/pageOverlay/PageOverlay', () => {
  return {
    __esModule: true,
    default: ({ isAppLoader }) => {
      return <fake-page-overly data-is-app-loader={isAppLoader} />;
    }
  };
});

jest.mock('../app/staffSlice');

// **********************************************************************
// * unit tests

describe('Msal', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    let eventId = 0;
    eventCallbacks = [];

    reactRedux.useDispatch.mockReturnValue(mockDispatch);

    jest.spyOn(msalInstance, 'removeEventCallback');
    jest.spyOn(staffSlice, 'userAuthInfoChanged');

    jest.spyOn(msalInstance, 'addEventCallback').mockImplementation((callbackFn) => {
      eventCallbacks.push(callbackFn);
      eventId += 1;
      return eventId.toString();
    });
  });

  // **********************************************************************
  // * tear-down

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  // **********************************************************************
  // * execution

  describe('rendering', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(componentToRender, div);
    });

    it('renders components nested in oder: provider > app-insights > auth-template > fake-component', () => {
      const tree = renderer.create(componentToRenderForSnapshot).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('functional', () => {
    it('invokes addEventCallback when mounting', () => {
      render(componentToRender);
      expect(msalInstance.addEventCallback).toHaveBeenCalled();
    });

    it('invokes removeEventCallback when unmounting and a callback id exists', () => {
      // * ARRANGE
      msalInstance.addEventCallback.mockReturnValue(1);

      // * ACT
      let { unmount } = render(componentToRender);
      unmount();

      // * ASSERT
      expect(msalInstance.removeEventCallback).toHaveBeenCalled();
    });

    it('does not invoke removeEventCallback when unmounting and no callback id exists', () => {
      // * ARRANGE
      msalInstance.addEventCallback.mockReturnValue(null);

      // * ACT
      let { unmount } = render(componentToRender);
      unmount();

      // * ASSERT
      expect(msalInstance.removeEventCallback).not.toHaveBeenCalled();
    });

    it('dispatches userAuthInfoChanged after HANDLE_REDIRECT_END and the msal instance has at least 1 account', () => {
      // * ARRANGE
      const eventType = msalBrowser.EventType.HANDLE_REDIRECT_END;
      const userName = `${faker.name.firstName()} ${faker.name.lastName()}`;
      const accountName = faker.internet.email();
      const userObjectId = faker.datatype.uuid();
      const eventMessage = { eventType, payload: { account: { username: userName } } };
      const account = { username: userName, name: accountName, idTokenClaims: { oid: userObjectId } };
      const accounts = [account];
      msalInstance.getAllAccounts.mockReturnValue(accounts);

      // * ACT
      render(componentToRender);
      act(() => invokeAllCallbacks(eventMessage));

      // * ASSERT
      expect(mockDispatch).toHaveBeenCalledWith(staffSlice.userAuthInfoChanged());
      expect(staffSlice.userAuthInfoChanged).toHaveBeenCalledWith({
        userName: userName.toLowerCase(),
        displayName: accountName,
        userObjectId
      });
    });

    it('does not dispatch userAuthInfoChanged after HANDLE_REDIRECT_END and the msal instance has no accounts', () => {
      // * ARRANGE
      const eventType = msalBrowser.EventType.HANDLE_REDIRECT_END;
      const eventMessage = { eventType };
      const accounts = [];
      msalInstance.getAllAccounts.mockReturnValue(accounts);

      // * ACT
      render(componentToRender);
      act(() => invokeAllCallbacks(eventMessage));

      // * ASSERT
      expect(mockDispatch).not.toHaveBeenCalled();
      expect(staffSlice.userAuthInfoChanged).not.toHaveBeenCalled();
    });

    it('does not dispatch userAuthInfoChanged after an event that is not being watched', () => {
      // * ARRANGE
      const eventType = faker.random.word();
      const eventMessage = { eventType };

      // * ACT
      render(componentToRender);
      act(() => invokeAllCallbacks(eventMessage));

      // * ASSERT
      expect(mockDispatch).not.toHaveBeenCalled();
      expect(staffSlice.userAuthInfoChanged).not.toHaveBeenCalled();
    });
  });
});
