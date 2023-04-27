import api from './common';

class PmDetailsResponsesApi {
  static async get({ pageSize, pageNumber, filter, searchQuery, orderBy, fields } = {}) {
    const resourceName = 'pmDetailsResponses';
    const apiVersion = 1;
    const paramValues = { apiVersion, pageSize, pageNumber, filter, searchQuery, orderBy, fields };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.getResourceCollection(resourceName, queryParams);

    return returnVal;
  }

  static async getPmDetailsResponse(id, fields) {
    const resourceName = 'pmDetailsResponses';
    const apiVersion = 1;
    const paramValues = { apiVersion, fields };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.getResource(resourceName, id, queryParams);

    return returnVal;
  }

  static async patch(id, data, etag) {
    const resourceName = 'pmDetailsResponses';
    const apiVersion = 1;
    const paramValues = { apiVersion };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const newEtag = await api.patchResource(resourceName, id, queryParams, data, etag);

    return newEtag;
  }

  static async post(data) {
    const resourceName = 'pmDetailsResponses';
    const apiVersion = 1;
    const paramValues = { apiVersion };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.postResource(resourceName, queryParams, data);

    return returnVal;
  }
}

export default PmDetailsResponsesApi;
