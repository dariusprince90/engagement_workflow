import api from './common';

class ContractsApi {
  static async get({ pageSize, pageNumber, filter, searchQuery, orderBy, fields } = {}) {
    const resourceName = 'contracts';
    const apiVersion = 1;
    const paramValues = { apiVersion, pageSize, pageNumber, filter, searchQuery, orderBy, fields };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.getResourceCollection(resourceName, queryParams);

    return returnVal;
  }
}

export default ContractsApi;
