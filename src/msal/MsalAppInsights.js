import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMsal } from '@azure/msal-react';
import { EventType } from '@azure/msal-browser';

import { getAppInsights } from '../appInsights/telemetryService';

const propTypes = {
  children: PropTypes.element.isRequired
};

const MsalAppInsights = ({ children }) => {
  const { instance } = useMsal();

  useEffect(() => {
    // set the authenticated user in app insights
    const setAuthenticatedUser = (userName) => {
      const appInsights = getAppInsights();

      if (appInsights) {
        appInsights.setAuthenticatedUserContext(userName);
      }
    };

    // add event callbacks to set the authenticated user in app insights
    const callbackId = instance.addEventCallback((message) => {
      // only process specific event types
      switch (message.eventType) {
        case EventType.LOGIN_SUCCESS: {
          const result = message.payload;
          const userName = result.account.username.toLowerCase();
          setAuthenticatedUser(userName);

          break;
        }

        case EventType.HANDLE_REDIRECT_END: {
          const accounts = instance.getAllAccounts();

          if (accounts.length > 0) {
            const userName = accounts[0].username.toLowerCase();
            setAuthenticatedUser(userName);
          }

          break;
        }

        default:
          break;
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);

  return <>{children}</>;
};

MsalAppInsights.propTypes = propTypes;

export default MsalAppInsights;
