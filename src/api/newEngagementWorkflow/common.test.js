import faker from '@faker-js/faker';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import axios from 'axios';

import * as msal from '../../msal/Msal';
import * as config from '../../configs/config';
import * as helpers from '../helpers';
import api from './common';

// **********************************************************************
// * constants

const fakeAccount = { name: faker.internet.userName() };
const fakeAccounts = [fakeAccount];

const fakeMsalConfig = {
  newEngagementWorkflowApi: {
    scopes: faker.random.alphaNumeric(10),
    apiUrl: faker.internet.url()
  }
};

const fakeQueryParamValues = {
  apiVersion: faker.datatype.number(),
  pageSize: faker.datatype.number(),
  pageNumber: faker.datatype.number(),
  filter: faker.random.alphaNumeric(10),
  searchQuery: faker.random.alphaNumeric(10),
  orderBy: faker.random.alphaNumeric(10),
  fields: faker.random.alphaNumeric(10)
};

const fakeToken = { accessToken: faker.internet.password() };
const fakeTokenResponse = Promise.resolve(fakeToken);

// **********************************************************************
// * mock external dependencies

jest.mock('axios', () => {
  return {
    get: jest.fn(),
    patch: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  };
});

jest.mock('../../msal/Msal', () => {
  return {
    msalInstance: {
      acquireTokenRedirect: jest.fn(),
      acquireTokenSilent: jest.fn(),
      getAllAccounts: jest.fn()
    }
  };
});

jest.mock('../helpers', () => {
  return {
    handleApiError: jest.fn()
  };
});

// *********************************************************************
// * unit tests

describe('common', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    config.MSAL = fakeMsalConfig;
    msal.msalInstance.getAllAccounts.mockReturnValue(fakeAccounts);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('acquireToken', () => {
    it('returns token when no errors occur', async () => {
      // * ARRANGE
      const token = faker.random.alphaNumeric(10);
      const tokenResponse = Promise.resolve(token);
      const expectedRequest = { scopes: fakeMsalConfig.newEngagementWorkflowApi.scopes, account: fakeAccount };
      msal.msalInstance.acquireTokenSilent.mockReturnValue(tokenResponse);

      // * ACT
      const actualToken = await api.acquireToken();

      // * ASSERT
      expect(msal.msalInstance.acquireTokenSilent).toHaveBeenCalledWith(expectedRequest);
      expect(actualToken).toBe(token);
    });

    it('returns token via redirect when an InteractionRequiredAuthError error occurs', async () => {
      // * ARRANGE
      const token = faker.random.alphaNumeric(10);
      const error = new InteractionRequiredAuthError();
      const tokenResponse = Promise.reject(error);
      const expectedRequest = { scopes: fakeMsalConfig.newEngagementWorkflowApi.scopes, account: fakeAccount };
      msal.msalInstance.acquireTokenSilent.mockReturnValue(tokenResponse);
      msal.msalInstance.acquireTokenRedirect.mockReturnValue(token);

      // * ACT
      const actualToken = await api.acquireToken();

      // * ASSERT
      expect(msal.msalInstance.acquireTokenRedirect).toHaveBeenCalledWith(expectedRequest);
      expect(actualToken).toBe(token);
    });

    it('throws error when an error occurs that is not InteractionRequiredAuthError', async () => {
      // * ARRANGE
      const error = new Error(faker.random.alphaNumeric(10));
      const tokenResponse = Promise.reject(error);
      msal.msalInstance.acquireTokenSilent.mockReturnValue(tokenResponse);

      // * ACT / ASSERT
      await expect(api.acquireToken()).rejects.toThrow(error);
    });
  });

  describe('buildResourceQueryParams', () => {
    it('returns empty string when no params are passed', () => {
      const actual = api.buildResourceQueryParams();
      expect(actual).toBe('');
    });

    it('includes the api version param when apiVersion has a value', () => {
      const apiVersion = faker.datatype.number();
      const params = { ...fakeQueryParamValues, apiVersion };
      const expectedString = `apiVersion=${apiVersion}`;
      const actual = api.buildResourceQueryParams(params);
      expect(actual).toEqual(expect.stringContaining(expectedString));
    });

    it('includes the page size param when pageSize has a value', () => {
      const pageSize = faker.datatype.number();
      const params = { ...fakeQueryParamValues, pageSize };
      const expectedString = `pageSize=${pageSize}`;
      const actual = api.buildResourceQueryParams(params);
      expect(actual).toEqual(expect.stringContaining(expectedString));
    });

    it('includes the page number param when pageNumber has a value', () => {
      const pageNumber = faker.datatype.number();
      const params = { ...fakeQueryParamValues, pageNumber };
      const expectedString = `pageNumber=${pageNumber}`;
      const actual = api.buildResourceQueryParams(params);
      expect(actual).toEqual(expect.stringContaining(expectedString));
    });

    it('includes the filter param when filter has a value', () => {
      const filter = faker.random.alphaNumeric(10);
      const params = { ...fakeQueryParamValues, filter };
      const expectedString = `filter=${encodeURIComponent(filter)}`;
      const actual = api.buildResourceQueryParams(params);
      expect(actual).toEqual(expect.stringContaining(expectedString));
    });

    it('includes the search query param when searchQuery has a value', () => {
      const searchQuery = faker.random.alphaNumeric(10);
      const params = { ...fakeQueryParamValues, searchQuery };
      const expectedString = `searchQuery=${encodeURIComponent(searchQuery)}`;
      const actual = api.buildResourceQueryParams(params);
      expect(actual).toEqual(expect.stringContaining(expectedString));
    });

    it('includes the order by param when orderBy has a value', () => {
      const orderBy = faker.random.alphaNumeric(10);
      const params = { ...fakeQueryParamValues, orderBy };
      const expectedString = `orderBy=${encodeURIComponent(orderBy)}`;
      const actual = api.buildResourceQueryParams(params);
      expect(actual).toEqual(expect.stringContaining(expectedString));
    });

    it('includes the fields param when fields has a value', () => {
      const fields = faker.random.alphaNumeric(10);
      const params = { ...fakeQueryParamValues, fields };
      const expectedString = `fields=${encodeURIComponent(fields)}`;
      const actual = api.buildResourceQueryParams(params);
      expect(actual).toEqual(expect.stringContaining(expectedString));
    });

    it('does not include the api version param when apiVersion does not have a value', () => {
      const apiVersion = undefined;
      const params = { ...fakeQueryParamValues, apiVersion };
      const actual = api.buildResourceQueryParams(params);
      const expectedString = `apiVersion=`;
      expect(actual).toEqual(expect.not.stringContaining(expectedString));
    });

    it('does not include the page size param when pageSize does not have a value', () => {
      const pageSize = undefined;
      const params = { ...fakeQueryParamValues, pageSize };
      const expectedString = `pageSize=`;
      const actual = api.buildResourceQueryParams(params);
      expect(actual).toEqual(expect.not.stringContaining(expectedString));
    });

    it('does not include the page number param when pageNumber does not have a value', () => {
      const pageNumber = undefined;
      const params = { ...fakeQueryParamValues, pageNumber };
      const expectedString = `pageNumber=`;
      const actual = api.buildResourceQueryParams(params);
      expect(actual).toEqual(expect.not.stringContaining(expectedString));
    });

    it('does not include the filter param when filter does not have a value', () => {
      const filter = undefined;
      const params = { ...fakeQueryParamValues, filter };
      const expectedString = `filter=`;
      const actual = api.buildResourceQueryParams(params);
      expect(actual).toEqual(expect.not.stringContaining(expectedString));
    });

    it('does not include the search query param when searchQuery does not have a value', () => {
      const searchQuery = undefined;
      const params = { ...fakeQueryParamValues, searchQuery };
      const expectedString = `searchQuery=`;
      const actual = api.buildResourceQueryParams(params);
      expect(actual).toEqual(expect.not.stringContaining(expectedString));
    });

    it('does not include the order by param when orderBy does not have a value', () => {
      const orderBy = undefined;
      const params = { ...fakeQueryParamValues, orderBy };
      const expectedString = `orderBy=`;
      const actual = api.buildResourceQueryParams(params);
      expect(actual).toEqual(expect.not.stringContaining(expectedString));
    });

    it('does not include the fields param when fields does not have a value', () => {
      const fields = undefined;
      const params = { ...fakeQueryParamValues, fields };
      const expectedString = `fields=`;
      const actual = api.buildResourceQueryParams(params);
      expect(actual).toEqual(expect.not.stringContaining(expectedString));
    });
  });

  describe('deleteResource', () => {
    beforeEach(() => {
      jest.spyOn(api, 'acquireToken').mockReturnValue(fakeTokenResponse);

      jest.spyOn(helpers, 'handleApiError').mockImplementation(() => {
        throw new Error();
      });
    });

    it('invokes handleApiError when an error occurs', async () => {
      // * ARRANGE
      const resourceName = faker.random.alphaNumeric(10);
      const id = faker.datatype.number();
      const queryParams = faker.random.alphaNumeric(10);
      const error = new Error(faker.random.alphaNumeric(10));
      const apiResponse = Promise.reject(error);
      const etag = faker.random.alphaNumeric(10);

      axios.delete.mockReturnValue(apiResponse);

      // * ACT
      await expect(api.deleteResource(resourceName, id, queryParams, etag)).rejects.toThrow();

      // * ASSERT
      expect(helpers.handleApiError).toHaveBeenCalledTimes(1);
      expect(helpers.handleApiError).toHaveBeenCalledWith(error);
    });
  });

  describe('getResource', () => {
    beforeEach(() => {
      jest.spyOn(api, 'acquireToken').mockReturnValue(fakeTokenResponse);

      jest.spyOn(helpers, 'handleApiError').mockImplementation(() => {
        throw new Error();
      });
    });

    it('returns correct results', async () => {
      // * ARRANGE
      const resourceName = faker.random.alphaNumeric(10);
      const id = faker.datatype.number();
      const queryParams = faker.random.alphaNumeric(10);
      const responseData = faker.datatype.json();
      const etag = faker.random.alphaNumeric(10);
      const response = { data: responseData, headers: { etag } };
      const apiResponse = Promise.resolve(response);
      const expectedResults = { ...response.data, etag };

      axios.get.mockReturnValue(apiResponse);

      // * ACT
      const actual = await api.getResource(resourceName, id, queryParams);

      // * ASSERT
      expect(actual).toEqual(expectedResults);
    });

    it('invokes handleApiError when an error occurs', async () => {
      // * ARRANGE
      const resourceName = faker.random.alphaNumeric(10);
      const id = faker.datatype.number();
      const queryParams = faker.random.alphaNumeric(10);
      const error = new Error(faker.random.alphaNumeric(10));
      const apiResponse = Promise.reject(error);

      axios.get.mockReturnValue(apiResponse);

      // * ACT
      await expect(api.getResource(resourceName, id, queryParams)).rejects.toThrow();

      // * ASSERT
      expect(helpers.handleApiError).toHaveBeenCalledTimes(1);
      expect(helpers.handleApiError).toHaveBeenCalledWith(error);
    });
  });

  describe('getResourceCollection', () => {
    beforeEach(() => {
      jest.spyOn(api, 'acquireToken').mockReturnValue(fakeTokenResponse);

      jest.spyOn(helpers, 'handleApiError').mockImplementation(() => {
        throw new Error();
      });
    });

    it('returns correct results', async () => {
      // * ARRANGE
      const resourceName = faker.random.alphaNumeric(10);
      const queryParams = faker.random.alphaNumeric(10);
      const paginationHeaderValue = faker.datatype.json();
      const responseData = faker.datatype.json();
      const response = { data: responseData, headers: { 'x-pagination': paginationHeaderValue } };
      const apiResponse = Promise.resolve(response);

      const paginationMetadata = JSON.parse(paginationHeaderValue);
      const expectedResults = { paginationMetadata, [resourceName]: responseData };

      axios.get.mockReturnValue(apiResponse);

      // * ACT
      const actual = await api.getResourceCollection(resourceName, queryParams);

      // * ASSERT
      expect(actual).toEqual(expectedResults);
    });

    it('invokes handleApiError when an error occurs', async () => {
      // * ARRANGE
      const resourceName = faker.random.alphaNumeric(10);
      const queryParams = faker.random.alphaNumeric(10);
      const error = new Error(faker.random.alphaNumeric(10));
      const apiResponse = Promise.reject(error);

      axios.get.mockReturnValue(apiResponse);

      // * ACT
      await expect(api.getResourceCollection(resourceName, queryParams)).rejects.toThrow();

      // * ASSERT
      expect(helpers.handleApiError).toHaveBeenCalledTimes(1);
      expect(helpers.handleApiError).toHaveBeenCalledWith(error);
    });
  });

  describe('patchResource', () => {
    beforeEach(() => {
      jest.spyOn(api, 'acquireToken').mockReturnValue(fakeTokenResponse);

      jest.spyOn(helpers, 'handleApiError').mockImplementation(() => {
        throw new Error();
      });
    });

    it('returns correct results', async () => {
      // * ARRANGE
      const resourceName = faker.random.alphaNumeric(10);
      const resourceId = faker.datatype.number();
      const queryParams = faker.random.alphaNumeric(10);
      const data = faker.random.alphaNumeric(10);
      const etag = faker.random.alphaNumeric(10);
      const response = { headers: { etag } };
      const apiResponse = Promise.resolve(response);
      const expectedResults = etag;

      axios.patch.mockReturnValue(apiResponse);

      // * ACT
      const actual = await api.patchResource(resourceName, resourceId, queryParams, data, etag);

      // * ASSERT
      expect(actual).toEqual(expectedResults);
    });

    it('invokes handleApiError when an error occurs', async () => {
      // * ARRANGE
      const resourceName = faker.random.alphaNumeric(10);
      const resourceId = faker.datatype.number();
      const data = faker.random.alphaNumeric(10);
      const etag = faker.random.alphaNumeric(10);
      const queryParams = faker.random.alphaNumeric(10);
      const error = new Error(faker.random.alphaNumeric(10));
      const apiResponse = Promise.reject(error);

      axios.patch.mockReturnValue(apiResponse);

      // * ACT
      await expect(api.patchResource(resourceName, resourceId, queryParams, data, etag)).rejects.toThrow();

      // * ASSERT
      expect(helpers.handleApiError).toHaveBeenCalledTimes(1);
      expect(helpers.handleApiError).toHaveBeenCalledWith(error);
    });
  });

  describe('postResource', () => {
    beforeEach(() => {
      jest.spyOn(api, 'acquireToken').mockReturnValue(fakeTokenResponse);

      jest.spyOn(helpers, 'handleApiError').mockImplementation(() => {
        throw new Error();
      });
    });

    it('returns correct results', async () => {
      // * ARRANGE
      const resourceName = faker.random.alphaNumeric(10);
      const queryParams = faker.random.alphaNumeric(10);
      const responseData = faker.datatype.json();
      const mockData = faker.random.alphaNumeric(10);
      const etag = faker.random.alphaNumeric(10);
      const response = { data: responseData, headers: { etag } };
      const apiResponse = Promise.resolve(response);
      const expectedResults = { ...response.data, etag };

      axios.post.mockReturnValue(apiResponse);

      // * ACT
      const actual = await api.postResource(resourceName, queryParams, mockData);

      // * ASSERT
      expect(actual).toEqual(expectedResults);
    });

    it('invokes handleApiError when an error occurs', async () => {
      // * ARRANGE
      const resourceName = faker.random.alphaNumeric(10);
      const queryParams = faker.random.alphaNumeric(10);
      const mockData = faker.random.alphaNumeric(10);
      const error = new Error(faker.random.alphaNumeric(10));
      const apiResponse = Promise.reject(error);

      axios.post.mockReturnValue(apiResponse);

      // * ACT
      await expect(api.postResource(resourceName, queryParams, mockData)).rejects.toThrow();

      // * ASSERT
      expect(helpers.handleApiError).toHaveBeenCalledTimes(1);
      expect(helpers.handleApiError).toHaveBeenCalledWith(error);
    });
  });

  describe('rpcPost', () => {
    beforeEach(() => {
      jest.spyOn(api, 'acquireToken').mockReturnValue(fakeTokenResponse);

      jest.spyOn(helpers, 'handleApiError').mockImplementation(() => {
        throw new Error();
      });
    });

    it('returns correct results', async () => {
      // * ARRANGE
      const path = faker.random.alphaNumeric(10);
      const queryParams = faker.random.alphaNumeric(10);
      const responseData = faker.datatype.json();
      const mockData = faker.random.alphaNumeric(10);
      const response = { data: responseData };
      const apiResponse = Promise.resolve(response);
      const expectedResults = response.data;

      axios.post.mockReturnValue(apiResponse);

      // * ACT
      const actual = await api.rpcPost(path, queryParams, mockData);

      // * ASSERT
      expect(actual).toEqual(expectedResults);
    });

    it('invokes handleApiError when an error occurs', async () => {
      // * ARRANGE
      const path = faker.random.alphaNumeric(10);
      const queryParams = faker.random.alphaNumeric(10);
      const mockData = faker.random.alphaNumeric(10);
      const error = new Error(faker.random.alphaNumeric(10));
      const apiResponse = Promise.reject(error);

      axios.post.mockReturnValue(apiResponse);

      // * ACT
      await expect(api.rpcPost(path, queryParams, mockData)).rejects.toThrow();

      // * ASSERT
      expect(helpers.handleApiError).toHaveBeenCalledTimes(1);
      expect(helpers.handleApiError).toHaveBeenCalledWith(error);
    });
  });
});
