import api from './common';

class GaoResponsesApi {
  static async post(data) {
    const resourceName = 'gaoResponses';
    const apiVersion = 1;
    const paramValues = { apiVersion };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.postResource(resourceName, queryParams, data);

    return returnVal;
  }
}

export default GaoResponsesApi;
