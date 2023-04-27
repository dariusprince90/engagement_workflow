import axios from 'axios';
import faker from '@faker-js/faker';

import * as config from '../../configs/config';
import * as helpers from '../helpers';
import newEngagementApprovalLogicAppApi from './newEngagementApprovalLogicAppApi';

// **********************************************************************
// * constants

const fakeWorkflowPlatformConfig = { newEngagementApproval: { workflowStartUrl: faker.internet.url() } };

// **********************************************************************
// * mock external dependencies

jest.mock('axios', () => ({
  post: jest.fn()
}));

jest.mock('../helpers', () => ({
  handleApiError: jest.fn()
}));

// **********************************************************************
// * unit tests

describe('NewEngagementApprovalLogicAppApi', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    config.WorkflowPlatform = fakeWorkflowPlatformConfig;
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('startWorkflow', () => {
    it('invokes axios.post with correct params', async () => {
      // * ARRANGE
      const responseData = faker.datatype.json();
      const data = faker.random.alphaNumeric(10);
      const etag = faker.random.alphaNumeric(10);
      const response = { data: responseData, headers: { etag } };
      const apiResponse = Promise.resolve(response);
      const config = { headers: { 'Content-Type': 'application/json' } };

      axios.post.mockImplementation(() => Promise.resolve(apiResponse));

      // * ACT
      await newEngagementApprovalLogicAppApi.startWorkflow(data);

      // * ASSERT
      expect(axios.post).toHaveBeenCalledWith(
        fakeWorkflowPlatformConfig.newEngagementApproval.workflowStartUrl,
        data,
        config
      );
    });

    it('invokes handleApiError when an error occurs', async () => {
      // * ARRANGE
      const data = faker.random.alphaNumeric(10);
      const error = new Error(faker.lorem.words());
      axios.post.mockImplementation(() => Promise.reject(error));
      helpers.handleApiError.mockImplementation(() => {
        throw new Error();
      });

      // * ACT
      await expect(newEngagementApprovalLogicAppApi.startWorkflow(data)).rejects.toThrow();

      // * ASSERT
      expect(helpers.handleApiError).toHaveBeenCalledTimes(1);
      expect(helpers.handleApiError).toHaveBeenCalledWith(error);
    });
  });
});
