import api from './common';

class RiskAssessmentNonAttestResponsesApi {
  static async get({ pageSize, pageNumber, filter, searchQuery, orderBy, fields } = {}) {
    const resourceName = 'riskAssessmentNonAttestResponses';
    const apiVersion = 1;
    const paramValues = { apiVersion, pageSize, pageNumber, filter, searchQuery, orderBy, fields };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.getResourceCollection(resourceName, queryParams);

    return returnVal;
  }

  static async getRiskAssessmentNonAttestResponse(id, fields) {
    const resourceName = 'riskAssessmentNonAttestResponses';
    const apiVersion = 1;
    const paramValues = { apiVersion, fields };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.getResource(resourceName, id, queryParams);

    return returnVal;
  }

  static async patch(id, data, etag) {
    const resourceName = 'riskAssessmentNonAttestResponses';
    const apiVersion = 1;
    const paramValues = { apiVersion };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const newEtag = await api.patchResource(resourceName, id, queryParams, data, etag);

    return newEtag;
  }
}

export default RiskAssessmentNonAttestResponsesApi;
