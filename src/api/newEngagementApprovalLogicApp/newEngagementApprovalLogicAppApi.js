import axios from 'axios';

import * as config from '../../configs/config';
import { handleApiError } from '../helpers';

class NewEngagementApprovalLogicAppApi {
  static async startWorkflow(data) {
    const endpoint = config.WorkflowPlatform.newEngagementApproval.workflowStartUrl;
    const axiosConfig = { headers: { 'Content-Type': 'application/json' } };
    await axios.post(endpoint, data, axiosConfig).catch(function (error) {
      handleApiError(error);
    });
  }
}

export default NewEngagementApprovalLogicAppApi;
