import faker from '@faker-js/faker';

import * as api from './common';
import attachmentInfoResponsesApi from './attachmentInfoResponsesApi';

// **********************************************************************
// * constants

const fakeQueryParams = faker.lorem.words();
const fakeAttachmentCollection = faker.datatype.array();

// **********************************************************************
// * functions

// **********************************************************************
// * mock external dependencies

jest.mock('./common', () => {
  return {
    buildResourceQueryParams: jest.fn(),
    getResourceCollection: jest.fn(),
    getResource: jest.fn(),
    postResource: jest.fn(),
    rpcPost: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('AttachmentInfoResponsesApi', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    jest.spyOn(api, 'buildResourceQueryParams').mockReturnValue(fakeQueryParams);
    jest.spyOn(api, 'getResourceCollection').mockReturnValue(fakeAttachmentCollection);
    jest.spyOn(api, 'postResource');
    jest.spyOn(api, 'rpcPost');
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('createAzureSas', () => {
    const defaultParams = {
      data: {
        newEngagementInstanceId: faker.datatype.number(),
        fileName: faker.lorem.word(),
        filePath: faker.lorem.word(),
        attachmentTypeId: faker.datatype.number(),
        attachmentReferenceId: faker.datatype.number(),
        responseReferenceId: faker.datatype.number()
      }
    };

    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const expectedPath = 'attachmentInfoResponses/azureSas/create';
      const expectedParams = { apiVersion: 1 };

      // * ACT
      await attachmentInfoResponsesApi.createAzureSas(defaultParams.data);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.rpcPost).toHaveBeenCalledTimes(1);
      expect(api.rpcPost).toHaveBeenCalledWith(expectedPath, fakeQueryParams, defaultParams.data);
    });

    it('invokes api methods with correct parameters when no params are passed', async () => {
      // * ARRANGE
      const expectedPath = 'attachmentInfoResponses/azureSas/create';
      const expectedParams = {
        apiVersion: 1
      };

      // * ACT
      await attachmentInfoResponsesApi.createAzureSas();

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.rpcPost).toHaveBeenCalledTimes(1);
      expect(api.rpcPost).toHaveBeenCalledWith(expectedPath, fakeQueryParams, undefined);
    });
  });

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
      const expectedResourceName = 'attachmentInfoResponses';
      const expectedParams = { apiVersion: 1, ...defaultParams };

      // * ACT
      await attachmentInfoResponsesApi.get(defaultParams);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('invokes api methods with correct parameters when no params are passed', async () => {
      // * ARRANGE
      const expectedResourceName = 'attachmentInfoResponses';
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
      await attachmentInfoResponsesApi.get();

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.getResourceCollection).toHaveBeenCalledTimes(1);
      expect(api.getResourceCollection).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams);
    });

    it('returns results from the api', async () => {
      const actual = await attachmentInfoResponsesApi.get(defaultParams);
      expect(actual).toBe(fakeAttachmentCollection);
    });
  });

  describe('post', () => {
    const defaultParams = {
      data: {
        newEngagementInstanceId: faker.datatype.number(),
        fileName: faker.lorem.word(),
        filePath: faker.lorem.word(),
        attachmentTypeId: faker.datatype.number(),
        attachmentReferenceId: faker.datatype.number(),
        responseReferenceId: faker.datatype.number()
      }
    };

    it('invokes api methods with correct parameters', async () => {
      // * ARRANGE
      const expectedResourceName = 'attachmentInfoResponses';
      const expectedParams = { apiVersion: 1 };

      // * ACT
      await attachmentInfoResponsesApi.post(defaultParams.data);

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.postResource).toHaveBeenCalledTimes(1);
      expect(api.postResource).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams, defaultParams.data);
    });

    it('invokes api methods with correct parameters when no params are passed', async () => {
      // * ARRANGE
      const expectedResourceName = 'attachmentInfoResponses';
      const expectedParams = {
        apiVersion: 1
      };

      // * ACT
      await attachmentInfoResponsesApi.post();

      // * ASSERT
      expect(api.buildResourceQueryParams).toHaveBeenCalledTimes(1);
      expect(api.buildResourceQueryParams).toHaveBeenCalledWith(expectedParams);
      expect(api.postResource).toHaveBeenCalledTimes(1);
      expect(api.postResource).toHaveBeenCalledWith(expectedResourceName, fakeQueryParams, undefined);
    });
  });
});
