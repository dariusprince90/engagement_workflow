import faker from '@faker-js/faker';

import * as api from './common';
import gaoResponsesApi from './gaoResponsesApi';

// **********************************************************************
// * constants

const fakeQueryParams = faker.random.alphaNumeric(10);
const fakeRequest = faker.random.alphaNumeric(10);

// **********************************************************************
// * mock external dependencies

jest.mock('./common', () => {
  return {
    buildResourceQueryParams: jest.fn(),
    postResource: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('GaoResponsesApi', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    jest.spyOn(api, 'buildResourceQueryParams').mockReturnValue(fakeQueryParams);
    jest.spyOn(api, 'postResource').mockReturnValue(fakeRequest);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('post', () => {
    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const data = { [faker.random.alpha(5)]: faker.random.alphaNumeric(10) };
      const expectedResourceName = 'gaoResponses';
      const expectedParams = { apiVersion: 1 };

      // * ACT
      await gaoResponsesApi.post(data);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.postResource).toHaveBeenCalledTimes(1);
      expect(api.postResource).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams, data);
    });

    it('returns results from the api', async () => {
      const data = { [faker.random.alpha(5)]: faker.random.alphaNumeric(10) };
      const actual = await gaoResponsesApi.post(data);
      expect(actual).toBe(fakeRequest);
    });
  });
});
