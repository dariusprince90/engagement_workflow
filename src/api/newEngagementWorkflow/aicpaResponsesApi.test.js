import faker from '@faker-js/faker';

import * as api from './common';
import aicpaResponsesApi from './aicpaResponsesApi';

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
    getResource: jest.fn(),
    getResourceCollection: jest.fn(),
    patchResource: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('AicpaResponsesApi', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    jest.spyOn(api, 'buildResourceQueryParams').mockReturnValue(fakeQueryParams);
    jest.spyOn(api, 'getResource').mockReturnValue(fakeResource);
    jest.spyOn(api, 'getResourceCollection').mockReturnValue(fakeResourceCollection);
    jest.spyOn(api, 'patchResource').mockReturnValue(fakeResource);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

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
      const expectedResourceName = 'aicpaResponses';
      const expectedParams = { apiVersion: 1, ...defaultParams };

      // * ACT
      await aicpaResponsesApi.get(defaultParams);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('invokes api methods with correct parameters when no params are passed', async () => {
      // * ARRANGE
      const expectedResourceName = 'aicpaResponses';
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
      await aicpaResponsesApi.get();

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('returns results from the api', async () => {
      const actual = await aicpaResponsesApi.get(defaultParams);
      expect(actual).toBe(fakeResourceCollection);
    });
  });

  describe('getAicpaResponse', () => {
    const id = faker.datatype.number();
    const fields = faker.random.alphaNumeric(10);

    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const expectedResourceName = 'aicpaResponses';
      const expectedParams = { apiVersion: 1, fields };

      // * ACT
      await aicpaResponsesApi.getAicpaResponse(id, fields);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResource).toHaveBeenCalledTimes(1);
      expect(api.getResource).toHaveBeenCalledWith(expectedResourceName, id, fakeQueryParams);
    });

    it('returns results from the api', async () => {
      const actual = await aicpaResponsesApi.getAicpaResponse(id, fields);
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
      const expectedResourceName = 'aicpaResponses';
      const expectedParams = { apiVersion: 1 };

      // * ACT
      await aicpaResponsesApi.patch(id, data, etag);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.patchResource).toHaveBeenCalledTimes(1);
      expect(api.patchResource).toHaveBeenCalledWith(expectedResourceName, id, fakeQueryParams, data, etag);
    });

    it('invokes api methods with correct parameters when no params are passed', async () => {
      // * ARRANGE
      const expectedResourceName = 'aicpaResponses';
      const expectedParams = {
        apiVersion: 1
      };

      // * ACT
      await aicpaResponsesApi.patch();

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
      const actual = await aicpaResponsesApi.patch(id, data, etag);
      expect(actual).toBe(fakeResource);
    });
  });
});
