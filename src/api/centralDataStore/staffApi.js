import api from './common';

class StaffApi {
  static async get({ pageSize, pageNumber, filter, searchQuery, orderBy, fields } = {}) {
    const resourceName = 'staff';
    const apiVersion = 1;
    const paramValues = { apiVersion, pageSize, pageNumber, filter, searchQuery, orderBy, fields };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.getResourceCollection(resourceName, queryParams);

    return returnVal;
  }

  static async getStaff(staffId, fields) {
    const resourceName = 'staff';
    const apiVersion = 1;
    const paramValues = { apiVersion, fields };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const returnVal = await api.getResource(resourceName, staffId, queryParams);

    return returnVal;
  }

  /**
   * gets a staff by the azure aad object id
   *
   * @param {string} appId - the appId (clientId) for the application
   * @returns a staff object which has the matching azure aad object id, null otherwise
   */
  static async getStaffByAzureAdObjectId(azureAdObjectId, fields) {
    const resourceName = 'staff';
    const apiVersion = 1;
    const pageSize = 1;
    const pageNumber = 1;
    const filter = `azureAdObjectId eq "${azureAdObjectId}"`;
    const paramValues = { apiVersion, pageSize, pageNumber, filter, fields };
    const queryParams = api.buildResourceQueryParams(paramValues);
    const result = await api.getResourceCollection(resourceName, queryParams);

    const staff = result.staff.length > 0 ? result.staff[0] : null;

    return staff;
  }
}

export default StaffApi;
