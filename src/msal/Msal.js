import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MsalProvider, MsalAuthenticationTemplate } from '@azure/msal-react';
import { EventType, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useDispatch } from 'react-redux';

import * as config from '../configs/config';
import { userAuthInfoChanged } from '../app/staffSlice';

import Error from './Error';
import MsalAppInsights from './MsalAppInsights';
import PageOverlay from '../components/common/pageOverlay/PageOverlay';

const msalConfig = {
  auth: {
    clientId: config.MSAL.webApp.clientId,
    authority: config.MSAL.webApp.authority,
    redirectUri: window.location.origin
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);

const propTypes = {
  children: PropTypes.element.isRequired
};

const Msal = ({ children }) => {
  const dispatch = useDispatch();

  // once authenticated, set info about the current user into state
  useEffect(() => {
    const callbackId = msalInstance.addEventCallback((message) => {
      // only process specific event types
      if (message.eventType === EventType.HANDLE_REDIRECT_END) {
        const accounts = msalInstance.getAllAccounts();

        if (accounts.length > 0) {
          const account = accounts[0];
          const userName = account.username.toLowerCase();
          const displayName = account.name;
          const userObjectId = account.idTokenClaims.oid;

          dispatch(userAuthInfoChanged({ userName, displayName, userObjectId }));
        }
      }
    });

    return () => {
      if (callbackId) {
        msalInstance.removeEventCallback(callbackId);
      }
    };
  }, [dispatch]);

  return (
    <MsalProvider instance={msalInstance}>
      <MsalAppInsights>
        <MsalAuthenticationTemplate
          interactionType={InteractionType.Redirect}
          errorComponent={Error}
          loadingComponent={() => <PageOverlay isAppLoader />}>
          {children}
        </MsalAuthenticationTemplate>
      </MsalAppInsights>
    </MsalProvider>
  );
};

Msal.propTypes = propTypes;

export default Msal;
