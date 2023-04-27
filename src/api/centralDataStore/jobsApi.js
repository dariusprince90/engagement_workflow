import api from './common';

class JobsApi {
  static async getJob(id, fields) {
    const resourceName = 'jobs';
    const apiVersion = 1;
    const paramValues = { apiVersion, fields };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.getResource(resourceName, id, queryParams);

    return returnVal;
  }
}

export default JobsApi;
