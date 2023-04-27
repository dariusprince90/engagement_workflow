import faker from '@faker-js/faker';

import * as api from './common';
import userTasksApi from './userTasksApi';

// **********************************************************************
// * constants

const fakeQueryParams = faker.lorem.words();
const fakeUserTasks = faker.datatype.array();
const fakeUserTask = faker.datatype.string;

// **********************************************************************
// * mock external dependencies

jest.mock('./common', () => {
  return {
    buildResourceQueryParams: jest.fn(),
    getResource: jest.fn(),
    getResourceCollection: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('UserTasksApi', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    jest.spyOn(api, 'buildResourceQueryParams').mockReturnValue(fakeQueryParams);
    jest.spyOn(api, 'getResourceCollection').mockReturnValue(fakeUserTasks);
    jest.spyOn(api, 'getResource').mockReturnValue(fakeUserTask);
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
      const expectedResourceName = 'userTasks';
      const expectedParams = { apiVersion: 1, ...defaultParams };

      // * ACT
      await userTasksApi.get(defaultParams);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('invokes api methods with correct parameters when no params are passed', async () => {
      // * ARRANGE
      const expectedResourceName = 'userTasks';
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
      await userTasksApi.get();

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('returns results from the api', async () => {
      const actual = await userTasksApi.get(defaultParams);
      expect(actual).toBe(fakeUserTasks);
    });
  });

  describe('getUserTask', () => {
    const userTaskId = faker.datatype.number();
    const fields = faker.lorem.words();

    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const expectedResourceName = 'userTasks';
      const expectedParams = { apiVersion: 1, fields };

      // * ACT
      await userTasksApi.getUserTask(userTaskId, fields);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResource).toHaveBeenCalledTimes(1);
      expect(api.getResource).toHaveBeenCalledWith(expectedResourceName, userTaskId, fakeQueryParams);
    });

    it('returns results from the api', async () => {
      const actual = await userTasksApi.getUserTask(userTaskId, fields);
      expect(actual).toBe(fakeUserTask);
    });
  });
});
