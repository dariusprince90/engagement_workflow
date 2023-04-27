import faker from '@faker-js/faker';

import * as api from './common';
import privateEquitiesApi from './privateEquitiesApi';

// **********************************************************************
// * constants

const fakeQueryParams = faker.lorem.words();
const fakePrivateEquities = faker.datatype.array();

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

describe('PrivateEquitiesApi', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    jest.spyOn(api, 'buildResourceQueryParams').mockReturnValue(fakeQueryParams);
    jest.spyOn(api, 'getResourceCollection').mockReturnValue(fakePrivateEquities);
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
      const expectedResourceName = 'privateEquities';
      const expectedParams = { apiVersion: 1, ...defaultParams };

      // * ACT
      await privateEquitiesApi.get(defaultParams);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('invokes api methods with correct parameters when no params are passed', async () => {
      // * ARRANGE
      const expectedResourceName = 'privateEquities';
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
      await privateEquitiesApi.get();

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('returns results from the api', async () => {
      const actual = await privateEquitiesApi.get(defaultParams);
      expect(actual).toBe(fakePrivateEquities);
    });
  });
});
