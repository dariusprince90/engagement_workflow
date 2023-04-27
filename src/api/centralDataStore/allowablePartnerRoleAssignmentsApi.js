import api from './common';

class AllowablePartnerRoleAssignmentsApi {
  static async get({ pageSize, pageNumber, filter, searchQuery, orderBy, fields } = {}) {
    const resourceName = 'allowablePartnerRoleAssignments';
    const apiVersion = 1;
    const paramValues = { apiVersion, pageSize, pageNumber, filter, searchQuery, orderBy, fields };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.getResourceCollection(resourceName, queryParams);

    return returnVal;
  }

  static async getAllowablePartnerRoleAssignment(id, fields) {
    const resourceName = 'allowablePartnerRoleAssignments';
    const apiVersion = 1;
    const paramValues = { apiVersion, fields };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.getResource(resourceName, id, queryParams);

    return returnVal;
  }
}

export default AllowablePartnerRoleAssignmentsApi;
