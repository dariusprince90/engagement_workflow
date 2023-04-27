import faker from '@faker-js/faker';

import * as api from './common';
import allowablePartnerRoleAssignmentsApi from './allowablePartnerRoleAssignmentsApi';

// **********************************************************************
// * constants

const fakeQueryParams = faker.random.alphaNumeric(10);
const fakeResourceCollection = faker.datatype.array();
const fakeResource = faker.random.alphaNumeric(10);

// **********************************************************************
// * mock external dependencies

jest.mock('./common', () => {
  return {
    buildResourceQueryParams: jest.fn(),
    getResourceCollection: jest.fn(),
    getResource: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('AllowablePartnerRoleAssignmentsApi', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    jest.spyOn(api, 'buildResourceQueryParams').mockReturnValue(fakeQueryParams);
    jest.spyOn(api, 'getResourceCollection').mockReturnValue(fakeResourceCollection);
    jest.spyOn(api, 'getResource').mockReturnValue(fakeResource);
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
      const expectedResourceName = 'allowablePartnerRoleAssignments';
      const expectedParams = { apiVersion: 1, ...defaultParams };

      // * ACT
      await allowablePartnerRoleAssignmentsApi.get(defaultParams);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('invokes api methods with correct parameters when no params are passed', async () => {
      // * ARRANGE
      const expectedResourceName = 'allowablePartnerRoleAssignments';
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
      await allowablePartnerRoleAssignmentsApi.get();

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('returns results from the api', async () => {
      const actual = await allowablePartnerRoleAssignmentsApi.get(defaultParams);
      expect(actual).toBe(fakeResourceCollection);
    });
  });

  describe('getAllowablePartnerRoleAssignment', () => {
    const id = faker.datatype.number();
    const fields = faker.random.alphaNumeric(10);

    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const expectedResourceName = 'allowablePartnerRoleAssignments';
      const expectedParams = { apiVersion: 1, fields };

      // * ACT
      await allowablePartnerRoleAssignmentsApi.getAllowablePartnerRoleAssignment(id, fields);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResource).toHaveBeenCalledTimes(1);
      expect(api.getResource).toHaveBeenCalledWith(expectedResourceName, id, fakeQueryParams);
    });

    it('returns results from the api', async () => {
      const actual = await allowablePartnerRoleAssignmentsApi.getAllowablePartnerRoleAssignment(id, fields);
      expect(actual).toBe(fakeResource);
    });
  });
});
