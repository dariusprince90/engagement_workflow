import faker from '@faker-js/faker';

import * as api from './common';
import newEngagementInstancesApi from './newEngagementInstancesApi';

// **********************************************************************
// * constants

const fakeQueryParams = faker.random.alphaNumeric(10);
const fakeRequest = faker.random.alphaNumeric(10);
const fakeResource = faker.random.alphaNumeric(10);

// **********************************************************************
// * mock external dependencies

jest.mock('./common', () => {
  return {
    buildResourceQueryParams: jest.fn(),
    getResource: jest.fn(),
    postResource: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('NewEngagementInstancesApi', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    jest.spyOn(api, 'buildResourceQueryParams').mockReturnValue(fakeQueryParams);
    jest.spyOn(api, 'getResource').mockReturnValue(fakeResource);
    jest.spyOn(api, 'postResource').mockReturnValue(fakeRequest);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('getNewEngagementInstance', () => {
    const id = faker.datatype.number();
    const fields = faker.random.alphaNumeric(10);

    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const expectedResourceName = 'newEngagementInstances';
      const expectedParams = { apiVersion: 1, fields };

      // * ACT
      await newEngagementInstancesApi.getNewEngagementInstance(id, fields);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResource).toHaveBeenCalledTimes(1);
      expect(api.getResource).toHaveBeenCalledWith(expectedResourceName, id, fakeQueryParams);
    });

    it('returns results from the api', async () => {
      const actual = await newEngagementInstancesApi.getNewEngagementInstance(id, fields);
      expect(actual).toBe(fakeResource);
    });
  });

  describe('post', () => {
    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const data = { [faker.random.alpha(5)]: faker.random.alphaNumeric(10) };
      const expectedResourceName = 'newEngagementInstances';
      const expectedParams = { apiVersion: 1 };

      // * ACT
      await newEngagementInstancesApi.post(data);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.postResource).toHaveBeenCalledTimes(1);
      expect(api.postResource).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams, data);
    });

    it('returns results from the api', async () => {
      const data = { [faker.random.alpha(5)]: faker.random.alphaNumeric(10) };
      const actual = await newEngagementInstancesApi.post(data);
      expect(actual).toBe(fakeRequest);
    });
  });
});
