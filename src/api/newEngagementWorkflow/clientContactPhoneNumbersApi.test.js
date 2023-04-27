import faker from '@faker-js/faker';

import * as api from './common';
import clientContactPhoneNumbersApi from './clientContactPhoneNumbersApi';

// **********************************************************************
// * constants

const fakeQueryParams = faker.random.alphaNumeric(10);
const fakeResource = faker.datatype.array();
const fakeResourceCollection = faker.datatype.array();

// **********************************************************************
// * mock external dependencies

jest.mock('./common', () => {
  return {
    buildResourceQueryParams: jest.fn(),
    deleteResource: jest.fn(),
    getResource: jest.fn(),
    getResourceCollection: jest.fn(),
    patchResource: jest.fn(),
    postResource: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('ClientContactPhoneNumbersApi', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    jest.spyOn(api, 'buildResourceQueryParams').mockReturnValue(fakeQueryParams);
    jest.spyOn(api, 'deleteResource');
    jest.spyOn(api, 'getResource').mockReturnValue(fakeResource);
    jest.spyOn(api, 'getResourceCollection').mockReturnValue(fakeResourceCollection);
    jest.spyOn(api, 'patchResource').mockReturnValue(fakeResource);
    jest.spyOn(api, 'postResource').mockReturnValue(fakeResource);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('delete', () => {
    const id = faker.datatype.number();
    const etag = faker.datatype.number();

    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const expectedResourceName = 'clientContactPhoneNumbers';
      const expectedParams = { apiVersion: 1 };

      // * ACT
      await clientContactPhoneNumbersApi.delete(id, etag);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.deleteResource).toHaveBeenCalledTimes(1);
      expect(api.deleteResource).toHaveBeenCalledWith(expectedResourceName, id, fakeQueryParams, etag);
    });

    it('invokes api methods with correct parameters when no params are passed', async () => {
      // * ARRANGE
      const expectedResourceName = 'clientContactPhoneNumbers';
      const expectedParams = { apiVersion: 1 };

      // * ACT
      await clientContactPhoneNumbersApi.delete();

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.deleteResource).toHaveBeenCalledTimes(1);
      expect(api.deleteResource).toHaveBeenCalledWith(expectedResourceName, undefined, fakeQueryParams, undefined);
    });
  });

  describe('get', () => {
    const defaultParams = {
      pageSize: faker.datatype.number(),
      pageNumber: faker.datatype.number(),
      filter: faker.random.alphaNumeric(10),
      searchQuery: faker.random.alphaNumeric(10),
      orderBy: faker.random.alphaNumeric(10),
      fields: faker.random.alphaNumeric(10)
    };

    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const expectedResourceName = 'clientContactPhoneNumbers';
      const expectedParams = { apiVersion: 1, ...defaultParams };

      // * ACT
      await clientContactPhoneNumbersApi.get(defaultParams);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('invokes api methods with correct parameters when no params are passed', async () => {
      // * ARRANGE
      const expectedResourceName = 'clientContactPhoneNumbers';
      const expectedParams = {
        apiVersion: 1,
        pageSize: undefined,
        pageNumber: undefined,
        filter: undefined,
        searchQuery: undefined,
        orderBy: undefined,
        fields: undefined
      };

      // * ACT
      await clientContactPhoneNumbersApi.get();

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('returns results from the api', async () => {
      const actual = await clientContactPhoneNumbersApi.get(defaultParams);
      expect(actual).toBe(fakeResourceCollection);
    });
  });

  describe('getClientContactPhoneNumber', () => {
    const id = faker.datatype.number();
    const fields = faker.random.alphaNumeric(10);

    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const expectedResourceName = 'clientContactPhoneNumbers';
      const expectedParams = { apiVersion: 1, fields };

      // * ACT
      await clientContactPhoneNumbersApi.getClientContactPhoneNumber(id, fields);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResource).toHaveBeenCalledTimes(1);
      expect(api.getResource).toHaveBeenCalledWith(expectedResourceName, id, fakeQueryParams);
    });

    it('returns results from the api', async () => {
      const actual = await clientContactPhoneNumbersApi.getClientContactPhoneNumber(id, fields);
      expect(actual).toBe(fakeResource);
    });
  });

  describe('patch', () => {
    const id = faker.datatype.number();
    const etag = faker.datatype.string();
    const data = [
      {
        value: faker.datatype.string(),
        path: faker.datatype.string(),
        op: faker.datatype.string()
      }
    ];

    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const expectedResourceName = 'clientContactPhoneNumbers';
      const expectedParams = { apiVersion: 1 };

      // * ACT
      await clientContactPhoneNumbersApi.patch(id, data, etag);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.patchResource).toHaveBeenCalledTimes(1);
      expect(api.patchResource).toHaveBeenCalledWith(expectedResourceName, id, fakeQueryParams, data, etag);
    });

    it('invokes api methods with correct parameters when no params are passed', async () => {
      // * ARRANGE
      const expectedResourceName = 'clientContactPhoneNumbers';
      const expectedParams = {
        apiVersion: 1
      };

      // * ACT
      await clientContactPhoneNumbersApi.patch();

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.patchResource).toHaveBeenCalledTimes(1);
      expect(api.patchResource).toHaveBeenCalledWith(
        expectedResourceName,
        undefined,
        fakeQueryParams,
        undefined,
        undefined
      );
    });

    it('returns results from the api', async () => {
      const actual = await clientContactPhoneNumbersApi.patch(id, data, etag);
      expect(actual).toBe(fakeResource);
    });
  });

  describe('post', () => {
    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const data = { [faker.random.alpha(5)]: faker.random.alphaNumeric(10) };
      const expectedResourceName = 'clientContactPhoneNumbers';
      const expectedParams = { apiVersion: 1 };

      // * ACT
      await clientContactPhoneNumbersApi.post(data);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.postResource).toHaveBeenCalledTimes(1);
      expect(api.postResource).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams, data);
    });

    it('returns results from the api', async () => {
      const data = { [faker.random.alpha(5)]: faker.random.alphaNumeric(10) };
      const actual = await clientContactPhoneNumbersApi.post(data);
      expect(actual).toBe(fakeResource);
    });
  });
});
