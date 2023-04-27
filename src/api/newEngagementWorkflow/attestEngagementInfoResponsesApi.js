import api from './common';

class AttestEngagementInfoResponsesApi {
  static async get({ pageSize, pageNumber, filter, searchQuery, orderBy, fields } = {}) {
    const resourceName = 'attestEngagementInfoResponses';
    const apiVersion = 1;
    const paramValues = { apiVersion, pageSize, pageNumber, filter, searchQuery, orderBy, fields };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.getResourceCollection(resourceName, queryParams);

    return returnVal;
  }

  static async getAttestEngagementInfoResponse(id, fields) {
    const resourceName = 'attestEngagementInfoResponses';
    const apiVersion = 1;
    const paramValues = { apiVersion, fields };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.getResource(resourceName, id, queryParams);

    return returnVal;
  }

  static async patch(id, data, etag) {
    const resourceName = 'attestEngagementInfoResponses';
    const apiVersion = 1;
    const paramValues = { apiVersion };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const newEtag = await api.patchResource(resourceName, id, queryParams, data, etag);

    return newEtag;
  }

  static async post(data) {
    const resourceName = 'attestEngagementInfoResponses';
    const apiVersion = 1;
    const paramValues = { apiVersion };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.postResource(resourceName, queryParams, data);

    return returnVal;
  }
}

export default AttestEngagementInfoResponsesApi;
