import faker from '@faker-js/faker';

import * as api from './common';
import staffApi from './staffApi';

// **********************************************************************
// * constants

const fakeQueryParams = faker.lorem.words();
const fakeStaffCollection = faker.datatype.array();
const fakeStaff = faker.datatype.string;

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

describe('StaffApi', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    jest.spyOn(api, 'buildResourceQueryParams').mockReturnValue(fakeQueryParams);
    jest.spyOn(api, 'getResourceCollection').mockReturnValue(fakeStaffCollection);
    jest.spyOn(api, 'getResource').mockReturnValue(fakeStaff);
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
      const expectedResourceName = 'staff';
      const expectedParams = { apiVersion: 1, ...defaultParams };

      // * ACT
      await staffApi.get(defaultParams);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('invokes api methods with correct parameters when no params are passed', async () => {
      // * ARRANGE
      const expectedResourceName = 'staff';
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
      await staffApi.get();

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('returns results from the api', async () => {
      const actual = await staffApi.get(defaultParams);
      expect(actual).toBe(fakeStaffCollection);
    });
  });

  describe('getStaff', () => {
    const staffId = faker.datatype.number();
    const fields = faker.lorem.words();

    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const expectedResourceName = 'staff';
      const expectedParams = { apiVersion: 1, fields };

      // * ACT
      await staffApi.getStaff(staffId, fields);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResource).toHaveBeenCalledTimes(1);
      expect(api.getResource).toHaveBeenCalledWith(expectedResourceName, staffId, fakeQueryParams);
    });

    it('returns results from the api', async () => {
      const actual = await staffApi.getStaff(staffId, fields);
      expect(actual).toBe(fakeStaff);
    });
  });

  describe('getStaffByAzureAdObjectId', () => {
    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const azureAdObjectId = faker.random.alphaNumeric(10);
      const expectedResourceName = 'staff';
      const fields = faker.random.alphaNumeric(10);
      const filter = `azureAdObjectId eq "${azureAdObjectId}"`;
      const expectedParams = { apiVersion: 1, pageSize: 1, pageNumber: 1, filter, fields };
      const apiReturnValue = { staff: faker.datatype.array() };
      jest.spyOn(api, 'getResourceCollection').mockReturnValue(apiReturnValue);

      // * ACT
      await staffApi.getStaffByAzureAdObjectId(azureAdObjectId, fields);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('returns the staff when the staff is returned from the api', async () => {
      // * ARRANGE
      const azureAdObjectId = faker.random.alphaNumeric(10);
      const fields = faker.random.alphaNumeric(10);
      const apiReturnValue = { staff: faker.datatype.array() };
      jest.spyOn(api, 'getResourceCollection').mockReturnValue(apiReturnValue);

      // * ACT
      const actual = await staffApi.getStaffByAzureAdObjectId(azureAdObjectId, fields);

      // * ASSERT
      expect(actual).toBe(apiReturnValue.staff[0]);
    });

    it('returns null when no staff is returned from the api', async () => {
      // * ARRANGE
      const azureAdObjectId = faker.random.alphaNumeric(10);
      const fields = faker.random.alphaNumeric(10);
      const apiReturnValue = { staff: [] };
      jest.spyOn(api, 'getResourceCollection').mockReturnValue(apiReturnValue);

      // * ACT
      const actual = await staffApi.getStaffByAzureAdObjectId(azureAdObjectId, fields);

      // * ASSERT
      expect(actual).toBeNull();
    });
  });
});
