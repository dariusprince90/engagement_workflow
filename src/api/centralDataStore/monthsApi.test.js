import faker from '@faker-js/faker';

import * as api from './common';
import monthsApi from './monthsApi';

// **********************************************************************
// * constants

const fakeQueryParams = faker.lorem.words();
const fakeMonthsCollection = faker.datatype.array();

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

describe('monthsApi', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    jest.spyOn(api, 'buildResourceQueryParams').mockReturnValue(fakeQueryParams);
    jest.spyOn(api, 'getResourceCollection').mockReturnValue(fakeMonthsCollection);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('get', () => {
    const defaultParams = {
      pageSize: faker.datatype.number(),
      pageNumber: faker.datatype.number(),
      filter: faker.lorem.words(),
      searchQuery: faker.lorem.words(),
      orderBy: faker.lorem.words(),
      fields: faker.lorem.words()
    };

    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const expectedResourceName = 'months';
      const expectedParams = { apiVersion: 1, ...defaultParams };

      // * ACT
      await monthsApi.get(defaultParams);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('invokes api methods with correct parameters when no params are passed', async () => {
      // * ARRANGE
      const expectedResourceName = 'months';
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
      await monthsApi.get();

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('returns results from the api', async () => {
      const actual = await monthsApi.get(defaultParams);
      expect(actual).toBe(fakeMonthsCollection);
    });
  });
});
