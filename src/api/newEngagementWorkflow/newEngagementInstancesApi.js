import api from './common';

class NewEngagementInstancesApi {
  static async getNewEngagementInstance(id, fields) {
    const resourceName = 'newEngagementInstances';
    const apiVersion = 1;
    const paramValues = { apiVersion, fields };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.getResource(resourceName, id, queryParams);

    return returnVal;
  }

  static async post(data) {
    const resourceName = 'newEngagementInstances';
    const apiVersion = 1;
    const paramValues = { apiVersion };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.postResource(resourceName, queryParams, data);

    return returnVal;
  }
}

export default NewEngagementInstancesApi;
