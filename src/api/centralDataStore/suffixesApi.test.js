import faker from '@faker-js/faker';

import * as api from './common';
import suffixesApi from './suffixesApi';

// **********************************************************************
// * constants

const fakeResourceQueryParams = faker.random.alphaNumeric(10);
const fakeResourceCollection = faker.datatype.array();

// **********************************************************************
// * mock external dependencies

jest.mock('./common', () => {
  return {
    buildResourceQueryParams: jest.fn(),
    getResourceCollection: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('SuffixesApi', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    jest.spyOn(api, 'buildResourceQueryParams').mockReturnValue(fakeResourceQueryParams);
    jest.spyOn(api, 'getResourceCollection').mockReturnValue(fakeResourceCollection);
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
      const expectedResourceName = 'suffixes';
      const expectedParams = { apiVersion: 1, ...defaultParams };

      // * ACT
      await suffixesApi.get(defaultParams);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeResourceQueryParams);
    });

    it('invokes api methods with correct parameters when no params are passed', async () => {
      // * ARRANGE
      const expectedResourceName = 'suffixes';
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
      await suffixesApi.get();

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeResourceQueryParams);
    });

    it('returns results from the api', async () => {
      const actual = await suffixesApi.get(defaultParams);
      expect(actual).toBe(fakeResourceCollection);
    });
  });
});
