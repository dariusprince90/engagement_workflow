import ReactDOM from 'react-dom';
import { act, render } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as msal from '@azure/msal-react';
import { EventType } from '@azure/msal-browser';

import MsalAppInsights from './MsalAppInsights';
import * as telemetryService from '../appInsights/telemetryService';

// **********************************************************************
// * constants

const componentContents = faker.lorem.sentence();
const FakeComponent = () => <div>{componentContents}</div>;

const mockMsal = {
  instance: {
    addEventCallback: jest.fn(),
    getAllAccounts: jest.fn(),
    removeEventCallback: jest.fn()
  }
};

const mockAppInsights = {
  setAuthenticatedUserContext: jest.fn()
};

const componentToRender = (
  <MsalAppInsights>
    <FakeComponent />
  </MsalAppInsights>
);

let eventCallbacks = [];
const invokeAllCallbacks = (eventMessage) => {
  eventCallbacks.forEach((callback) => {
    callback(eventMessage);
  });
};

// **********************************************************************
// * mock external dependencies

jest.mock('@azure/msal-react');
jest.mock('../appInsights/telemetryService');

// **********************************************************************
// * unit tests

describe('MsalAppInsights', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    let eventId = 0;
    eventCallbacks = [];

    msal.useMsal.mockReturnValue(mockMsal);
    telemetryService.getAppInsights.mockReturnValue(mockAppInsights);

    jest.spyOn(mockMsal.instance, 'removeEventCallback');
    jest.spyOn(mockAppInsights, 'setAuthenticatedUserContext');

    jest.spyOn(mockMsal.instance, 'addEventCallback').mockImplementation((callbackFn) => {
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
  });

  describe('functional', () => {
    it('invokes addEventCallback when mounting', () => {
      render(componentToRender);
      expect(mockMsal.instance.addEventCallback).toHaveBeenCalled();
    });

    it('invokes removeEventCallback when unmounting and a callback id exists', () => {
      // * ARRANGE
      mockMsal.instance.addEventCallback.mockReturnValue(1);

      // * ACT
      let { unmount } = render(componentToRender);
      unmount();

      // * ASSERT
      expect(mockMsal.instance.removeEventCallback).toHaveBeenCalled();
    });

    it('does not invoke removeEventCallback when unmounting and no callback id exists', () => {
      // * ARRANGE
      mockMsal.instance.addEventCallback.mockReturnValue(null);

      // * ACT
      let { unmount } = render(componentToRender);
      unmount();

      // * ASSERT
      expect(mockMsal.instance.removeEventCallback).not.toHaveBeenCalled();
    });

    it('invokes setAuthenticatedUserContext after LOGIN_SUCCESS', () => {
      // * ARRANGE
      const eventType = EventType.LOGIN_SUCCESS;
      const userName = `${faker.name.firstName()} ${faker.name.lastName()}`;
      const eventMessage = { eventType, payload: { account: { username: userName } } };

      // * ACT
      render(componentToRender);
      act(() => invokeAllCallbacks(eventMessage));

      // * ASSERT
      expect(mockAppInsights.setAuthenticatedUserContext).toHaveBeenCalledWith(userName.toLowerCase());
    });

    it('invokes setAuthenticatedUserContext after HANDLE_REDIRECT_END and the msal instance has at least 1 account', () => {
      // * ARRANGE
      const eventType = EventType.HANDLE_REDIRECT_END;
      const userName = `${faker.name.firstName()} ${faker.name.lastName()}`;
      const account = { username: userName };
      const accounts = [account];
      const eventMessage = { eventType };
      mockMsal.instance.getAllAccounts.mockReturnValue(accounts);

      // * ACT
      render(componentToRender);
      act(() => invokeAllCallbacks(eventMessage));

      // * ASSERT
      expect(mockAppInsights.setAuthenticatedUserContext).toHaveBeenCalledWith(userName.toLowerCase());
    });

    it('does not invoke setAuthenticatedUserContext after HANDLE_REDIRECT_END and the msal instance has no accounts', () => {
      // * ARRANGE
      const eventType = EventType.HANDLE_REDIRECT_END;
      const accounts = [];
      const eventMessage = { eventType };
      mockMsal.instance.getAllAccounts.mockReturnValue(accounts);

      // * ACT
      render(componentToRender);
      act(() => invokeAllCallbacks(eventMessage));

      // * ASSERT
      expect(mockAppInsights.setAuthenticatedUserContext).not.toHaveBeenCalled();
    });

    it('does not invoke setAuthenticatedUserContext if appInsights is null', () => {
      // * ARRANGE
      const eventType = EventType.LOGIN_SUCCESS;
      const userName = `${faker.name.firstName()} ${faker.name.lastName()}`;
      const eventMessage = { eventType, payload: { account: { username: userName } } };
      telemetryService.getAppInsights.mockReturnValue(null);

      // * ACT
      render(componentToRender);
      act(() => invokeAllCallbacks(eventMessage));

      // * ASSERT
      expect(mockAppInsights.setAuthenticatedUserContext).not.toHaveBeenCalled();
    });

    it('does not invoke setAuthenticatedUserContext after an event that is not being watched', () => {
      // * ARRANGE
      const eventType = faker.random.word();
      const eventMessage = { eventType };

      // * ACT
      render(componentToRender);
      act(() => invokeAllCallbacks(eventMessage));

      // * ASSERT
      expect(mockAppInsights.setAuthenticatedUserContext).not.toHaveBeenCalled();
    });
  });
});
