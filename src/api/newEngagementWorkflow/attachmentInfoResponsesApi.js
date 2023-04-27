import api from './common';

class AttachmentInfoResponsesApi {
  static async createAzureSas(data) {
    const path = 'attachmentInfoResponses/azureSas/create';
    const apiVersion = 1;
    const paramValues = { apiVersion };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.rpcPost(path, queryParams, data);

    return returnVal;
  }

  static async get({ pageSize, pageNumber, filter, searchQuery, orderBy, fields } = {}) {
    const resourceName = 'attachmentInfoResponses';
    const apiVersion = 1;
    const paramValues = { apiVersion, pageSize, pageNumber, filter, searchQuery, orderBy, fields };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.getResourceCollection(resourceName, queryParams);

    return returnVal;
  }

  static async post(data) {
    const resourceName = 'attachmentInfoResponses';
    const apiVersion = 1;
    const paramValues = { apiVersion };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.postResource(resourceName, queryParams, data);

    return returnVal;
  }
}

export default AttachmentInfoResponsesApi;
