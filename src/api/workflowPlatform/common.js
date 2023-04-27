import axios from 'axios';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

import * as config from '../../configs/config';
import { msalInstance } from '../../msal/Msal';
import { handleApiError } from '../helpers';

class Common {
  static acquireToken = async () => {
    const accounts = msalInstance.getAllAccounts();
    const account = accounts[0];

    const request = {
      scopes: config.MSAL.workflowPlatformApi.scopes,
      account: account
    };

    const tokenResponse = await msalInstance.acquireTokenSilent(request).catch((error) => {
      if (error instanceof InteractionRequiredAuthError) {
        // fallback to interaction when silent call fails
        return msalInstance.acquireTokenRedirect(request);
      }

      throw error;
    });

    return tokenResponse;
  };

  static buildResourceQueryParams = ({
    apiVersion,
    pageSize,
    pageNumber,
    filter,
    searchQuery,
    orderBy,
    fields
  } = {}) => {
    const apiVersionParam = !!apiVersion ? `apiVersion=${apiVersion}` : '';
    const pageSizeParam = !!pageSize ? `pageSize=${pageSize}` : '';
    const pageNumberParam = !!pageNumber ? `pageNumber=${pageNumber}` : '';
    const filterParam = !!filter ? `filter=${encodeURIComponent(filter)}` : '';
    const searchQueryParam = !!searchQuery ? `searchQuery=${encodeURIComponent(searchQuery)}` : '';
    const orderByParam = !!orderBy ? `orderBy=${encodeURIComponent(orderBy)}` : '';
    const fieldsParam = !!fields ? `fields=${encodeURIComponent(fields)}` : '';

    const paramsArray = [
      apiVersionParam,
      pageSizeParam,
      pageNumberParam,
      filterParam,
      searchQueryParam,
      orderByParam,
      fieldsParam
    ];

    const queryParams = paramsArray.filter(Boolean).join('&');

    return queryParams;
  };

  static getResource = async (resourceName, id, queryParams) => {
    const tokenResponse = await this.acquireToken();
    const endpoint = `${config.MSAL.workflowPlatformApi.apiUrl}/${resourceName}/${id}/?${queryParams}`;
    const axiosConfig = { headers: { Authorization: `bearer ${tokenResponse.accessToken}` } };
    const apiResponse = await axios.get(endpoint, axiosConfig).catch(function (error) {
      handleApiError(error);
    });
    const returnVal = { ...apiResponse.data, etag: apiResponse.headers.etag };

    return returnVal;
  };

  static getResourceCollection = async (resourceName, queryParams) => {
    const tokenResponse = await this.acquireToken();
    const endpoint = `${config.MSAL.workflowPlatformApi.apiUrl}/${resourceName}/?${queryParams}`;
    const axiosConfig = { headers: { Authorization: `bearer ${tokenResponse.accessToken}` } };
    const apiResponse = await axios.get(endpoint, axiosConfig).catch(function (error) {
      handleApiError(error);
    });
    const paginationMetadata = JSON.parse(apiResponse.headers['x-pagination']);
    const returnVal = { paginationMetadata, [resourceName]: apiResponse.data };

    return returnVal;
  };

  static patchResource = async (resourceName, resourceId, queryParams, data, etag) => {
    const tokenResponse = await this.acquireToken();
    const endpoint = `${config.MSAL.workflowPlatformApi.apiUrl}/${resourceName}/${resourceId}/?${queryParams}`;
    const axiosConfig = {
      headers: {
        Authorization: `bearer ${tokenResponse.accessToken}`,
        'Content-Type': 'application/json-patch+json',
        'If-Match': etag
      }
    };
    await axios.patch(endpoint, data, axiosConfig).catch(function (error) {
      handleApiError(error);
    });
  };
}

export default Common;
