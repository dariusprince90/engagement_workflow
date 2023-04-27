import faker from '@faker-js/faker';

import * as api from './common';
import jobsApi from './jobsApi';

// **********************************************************************
// * constants

const fakeQueryParams = faker.random.alphaNumeric(10);
const fakeResource = faker.random.alphaNumeric(10);

// **********************************************************************
// * mock external dependencies

jest.mock('./common', () => {
  return {
    buildResourceQueryParams: jest.fn(),
    getResource: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('ClientsApi', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    jest.spyOn(api, 'buildResourceQueryParams').mockReturnValue(fakeQueryParams);
    jest.spyOn(api, 'getResource').mockReturnValue(fakeResource);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('getClient', () => {
    const id = faker.datatype.number();
    const fields = faker.random.alphaNumeric(10);

    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const expectedResourceName = 'jobs';
      const expectedParams = { apiVersion: 1, fields };

      // * ACT
      await jobsApi.getJob(id, fields);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResource).toHaveBeenCalledTimes(1);
      expect(api.getResource).toHaveBeenCalledWith(expectedResourceName, id, fakeQueryParams);
    });

    it('returns results from the api', async () => {
      const actual = await jobsApi.getJob(id, fields);
      expect(actual).toBe(fakeResource);
    });
  });
});
