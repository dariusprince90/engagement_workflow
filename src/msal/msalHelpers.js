// todo: uncomment this when user roles are added
/*
import { msalInstance } from './Msal';
import { MSAL as msalConfig } from '../configs/config';
*/

export const getUserRoles = () => {
  // todo: uncomment this when user roles are added
  /*
  const accounts = msalInstance.getAllAccounts();
  const account = accounts[0];
  const roles = account.idTokenClaims.roles || [];
  */

  const userRoles = {
    // * this will contain information about the user's roles
    // e.g.
    // isSuperAdmin: roles.includes(msalConfig.webApp.userRoles.SuperAdministrators),
  };

  return userRoles;
};
