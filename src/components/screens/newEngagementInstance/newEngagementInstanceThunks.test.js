import { addDays, subDays } from 'date-fns';
import faker from '@faker-js/faker';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import LOCAL_STORAGE_KEYS from '../../../helpers/enums/localStorageKeys';
import NEW_ENGAGEMENT_INSTANCE_VIEWS from '../../../helpers/enums/newEngagementInstanceViews';

import * as config from '../../../configs/config';
import ApiGeneralException from '../../../api/ApiGeneralException';

import allowablePartnerRoleAssignmentsApi from '../../../api/centralDataStore/allowablePartnerRoleAssignmentsApi';
import clientsApi from '../../../api/centralDataStore/clientsApi';
import clientTaxTypesApi from '../../../api/centralDataStore/clientTaxTypesApi';
import countriesApi from '../../../api/centralDataStore/countriesApi';
import industryHierarchiesApi from '../../../api/centralDataStore/industryHierarchiesApi';
import internationalHeadquarterCountriesApi from '../../../api/centralDataStore/internationalHeadquarterCountriesApi';
import jobCategoryRolesApi from '../../../api/centralDataStore/jobCategoryRolesApi';
import jobHierarchiesApi from '../../../api/centralDataStore/jobHierarchiesApi';
import jobRolesCdsApi from '../../../api/centralDataStore/jobRolesApi';
import marketSectorsApi from '../../../api/centralDataStore/marketSectorsApi';
import monthsApi from '../../../api/centralDataStore/monthsApi';
import ownershipTypesApi from '../../../api/centralDataStore/ownershipTypesApi';
import regionHierarchiesApi from '../../../api/centralDataStore/regionHierarchiesApi';
import staffApi from '../../../api/centralDataStore/staffApi';
import suffixesApi from '../../../api/centralDataStore/suffixesApi';
import taxTypesApi from '../../../api/centralDataStore/taxTypesApi';

import clientEntitiesApi from '../../../api/dataGovernanceConversion/clientEntitiesApi';

import attachmentInfoResponsesApi from '../../../api/newEngagementWorkflow/attachmentInfoResponsesApi';
import attachmentTypesApi from '../../../api/newEngagementWorkflow/attachmentTypesApi';
import clientSearchTypesApi from '../../../api/newEngagementWorkflow/clientSearchTypesApi';
import incompatibleNaturesOfServicesApi from '../../../api/newEngagementWorkflow/incompatibleNaturesOfServicesApi';
import initialSetupResponsesApi from '../../../api/newEngagementWorkflow/initialSetupResponsesApi';
import jobInfoResponsesApi from '../../../api/newEngagementWorkflow/jobInfoResponsesApi';
import jobRolesApi from '../../../api/newEngagementWorkflow/jobRolesApi';
import natureOfServiceJobHierarchyMapsApi from '../../../api/newEngagementWorkflow/natureOfServiceJobHierarchyMapsApi';
import naturesOfServicesApi from '../../../api/newEngagementWorkflow/naturesOfServicesApi';
import newEngagementInstancesApi from '../../../api/newEngagementWorkflow/newEngagementInstancesApi';
import subjectToSecOrGaoRulesApi from '../../../api/newEngagementWorkflow/subjectToSecOrGaoRulesApi';
import taxRiskResponsesApi from '../../../api/newEngagementWorkflow/taxRiskResponsesApi';

import userTasksApi from '../../../api/workflowPlatform/userTasksApi';
import workflowStepRunLogsApi from '../../../api/workflowPlatform/workflowStepRunLogsApi';
import workflowStepsApi from '../../../api/workflowPlatform/workflowStepsApi';

import staffSlice from '../../../app/staffSlice';
import * as newEngagementInstanceSlice from './newEngagementInstanceSlice';
import * as thunks from './newEngagementInstanceThunks';

import {
  SLICE_NAME,
  createJobInfoResponse,
  createJobRole,
  deleteJobInfoResponse,
  deleteJobRole,
  fetchAttachmentInfoResponsesForNei,
  fetchAttachmentTypes,
  fetchClient,
  fetchClientEntities,
  fetchClientSearchTypes,
  fetchClientTaxTypes,
  fetchCountries,
  fetchExistingClient,
  fetchIncompatibleNaturesOfServices,
  fetchIndustryHierarchies,
  fetchInitialSetupResponseForNei,
  fetchInternationalHeadquarterCountries,
  fetchJobCategoryRoles,
  fetchJobHierarchies,
  fetchJobInfoResponsesForNei,
  fetchJobRoles,
  fetchJobRolesForJobInfoResponse,
  fetchNatureOfServiceJobHierarchyMaps,
  fetchNaturesOfServices,
  fetchNewEngagementInstance,
  fetchMarketSectors,
  fetchMonths,
  fetchOwnershipTypes,
  fetchRegionHierarchies,
  fetchSubjectToSecOrGaoRules,
  fetchSuffixes,
  fetchTaxRiskResponseForNei,
  fetchTaxTypes,
  fetchUserTasks,
  fetchWorkflowStepRunLogs,
  fetchWorkflowSteps,
  searchAllowablePartnerRoleAssignments,
  searchClients,
  searchExistingClients,
  searchJobRoleAllowablePartnerRoleAssignments,
  searchJobRoleStaff,
  searchJobRoleStaffWhichHaveRoleAssignments,
  searchStaff,
  tempThunk
} from './newEngagementInstanceThunks';

// **********************************************************************
// * constants

const mockStore = configureMockStore([thunk])({});

// **********************************************************************
// * functions

// **********************************************************************
// * mock external dependencies

jest.mock('../../../api/centralDataStore/allowablePartnerRoleAssignmentsApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/centralDataStore/clientsApi', () => {
  return {
    get: jest.fn(),
    getClient: jest.fn()
  };
});

jest.mock('../../../api/centralDataStore/clientTaxTypesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/centralDataStore/countriesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/centralDataStore/industryHierarchiesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/centralDataStore/internationalHeadquarterCountriesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/centralDataStore/jobCategoryRolesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/centralDataStore/jobHierarchiesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/centralDataStore/jobRolesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/centralDataStore/marketSectorsApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/centralDataStore/monthsApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/centralDataStore/ownershipTypesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/centralDataStore/regionHierarchiesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/centralDataStore/staffApi', () => {
  return {
    get: jest.fn(),
    getStaff: jest.fn()
  };
});

jest.mock('../../../api/centralDataStore/suffixesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/centralDataStore/taxTypesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/dataGovernanceConversion/clientEntitiesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/newEngagementWorkflow/attachmentInfoResponsesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/newEngagementWorkflow/attachmentTypesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/newEngagementWorkflow/clientSearchTypesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/newEngagementWorkflow/incompatibleNaturesOfServicesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/newEngagementWorkflow/initialSetupResponsesApi', () => {
  return {
    get: jest.fn(),
    getInitialSetupResponse: jest.fn(),
    post: jest.fn()
  };
});

jest.mock('../../../api/newEngagementWorkflow/jobInfoResponsesApi', () => {
  return {
    delete: jest.fn(),
    get: jest.fn(),
    getJobInfoResponse: jest.fn(),
    post: jest.fn()
  };
});

jest.mock('../../../api/newEngagementWorkflow/jobRolesApi', () => {
  return {
    delete: jest.fn(),
    get: jest.fn(),
    getJobRole: jest.fn(),
    post: jest.fn()
  };
});

jest.mock('../../../api/newEngagementWorkflow/natureOfServiceJobHierarchyMapsApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/newEngagementWorkflow/naturesOfServicesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/newEngagementWorkflow/natureOfServiceJobHierarchyMapsApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/newEngagementWorkflow/naturesOfServicesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/newEngagementWorkflow/newEngagementInstancesApi', () => {
  return {
    getNewEngagementInstance: jest.fn(),
    post: jest.fn()
  };
});

jest.mock('../../../api/newEngagementWorkflow/subjectToSecOrGaoRulesApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/newEngagementWorkflow/taxRiskResponsesApi', () => {
  return {
    get: jest.fn(),
    getTaxRiskResponse: jest.fn()
  };
});

jest.mock('../../../api/workflowPlatform/userTasksApi', () => {
  return {
    get: jest.fn(),
    getUserTask: jest.fn()
  };
});

jest.mock('../../../api/workflowPlatform/workflowStepRunLogsApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../api/workflowPlatform/workflowStepsApi', () => {
  return {
    get: jest.fn()
  };
});

jest.mock('../../../app/staffSlice', () => {
  return {
    ensureStaffExistsInCache: jest.fn()
  };
});

jest.mock('./newEngagementInstanceSlice', () => ({
  jobSetupViewCreated: jest.fn()
}));

// **********************************************************************
// * unit tests

describe('newEngagementInstanceThunks', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    jest.spyOn(window.localStorage.__proto__, 'setItem');
  });

  beforeEach(() => {
    window.localStorage.__proto__.getItem.mockReturnValue(null);
    window.localStorage.__proto__.setItem.mockImplementation(() => {});
  });

  // **********************************************************************
  // * tear-down

  afterEach(() => {
    window.localStorage.__proto__.getItem.mockReset();
    window.localStorage.__proto__.setItem.mockReset();
  });

  afterAll(() => {
    window.localStorage.__proto__.getItem.mockRestore();
    window.localStorage.__proto__.setItem.mockRestore();
  });

  // **********************************************************************
  // * execution

  describe('tempThunk', () => {
    it('does nothing', () => {
      // * ARRANGE

      // * ACT
      mockStore.dispatch(tempThunk());

      // * ASSERT
      expect(true).toBeTruthy();
    });
  });

  describe('general', () => {
    describe('fetchClient', () => {
      it('returns the client returned from the api', async () => {
        // * ARRANGE
        const clientId = faker.datatype.number();
        const fields = faker.random.alpha(10);
        const args = { clientId, fields };
        const client = faker.random.alpha(10);
        const mockDispatch = jest.fn();

        clientsApi.getClient.mockReturnValue(client);

        // * ACT
        const actual = await fetchClient(args)(mockDispatch);

        // * ASSERT
        expect(actual.payload).toEqual(client);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const clientId = faker.datatype.number();
        const fields = faker.random.alpha(10);
        const args = { clientId, fields };
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/fetchClient/rejected`;
        jest.spyOn(clientsApi, 'getClient').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchClient(args));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const clientId = faker.datatype.number();
        const fields = faker.random.alpha(10);
        const args = { clientId, fields };
        const expectedType = `${SLICE_NAME}/fetchClient/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(clientsApi, 'getClient').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchClient(args));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });
  });

  describe('lookups', () => {
    describe('fetchAttachmentTypes', () => {
      it('invokes attachmentTypesApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            attachmentTypes: []
          };

          attachmentTypesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchAttachmentTypes());

        // * ASSERT
        expect(attachmentTypesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields = 'id,displayName';
          const orderBy = 'displayName asc';
          const params = { pageSize, pageNumber, fields, orderBy };
          expect(attachmentTypesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the attachment types returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const attachmentTypes = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            attachmentTypes
          };

          attachmentTypesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...attachmentTypes);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchAttachmentTypes());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchAttachmentTypes/rejected`;
        jest.spyOn(attachmentTypesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchAttachmentTypes());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchAttachmentTypes/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(attachmentTypesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchAttachmentTypes());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchClientEntities', () => {
      it('invokes clientEntities.get once for each page of data', async () => {
        // * ARRANGE
        const clientId = faker.datatype.number();
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            clientEntities: []
          };

          clientEntitiesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchClientEntities(clientId));

        // * ASSERT
        expect(clientEntitiesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const filter = `clientId eq ${clientId}`;
          const fields = 'id,legalEntityName,shortEntityName,isActive';
          const orderBy = 'legalEntityName asc';
          const params = { pageSize, pageNumber, filter, fields, orderBy };
          expect(clientEntitiesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the client entities returned from the api', async () => {
        // * ARRANGE
        const clientId = faker.datatype.number();
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const clientEntities = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            clientEntities
          };

          clientEntitiesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...clientEntities);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchClientEntities(clientId));

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const clientId = faker.datatype.number();
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchClientEntities/rejected`;
        jest.spyOn(clientEntitiesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchClientEntities(clientId));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const clientId = faker.datatype.number();
        const expectedType = `${SLICE_NAME}/lookups/fetchClientEntities/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(clientEntitiesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchClientEntities(clientId));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchClientSearchTypes', () => {
      it('invokes clientSearchTypesApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            clientSearchTypes: []
          };

          clientSearchTypesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchClientSearchTypes());

        // * ASSERT
        expect(clientSearchTypesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields = 'id,description,orderingKey,crmType';
          const orderBy = 'orderingKey asc';
          const params = { pageSize, pageNumber, fields, orderBy };
          expect(clientSearchTypesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the client search types returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const clientSearchTypes = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            clientSearchTypes
          };

          clientSearchTypesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...clientSearchTypes);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchClientSearchTypes());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the client search types returned from the api when the local storage cache is expired', async () => {
        const dataCache = {
          expiresOn: subDays(new Date(), LOCAL_STORAGE_KEYS.lookups.clientSearchTypes.expireDays).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const clientSearchTypes = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            clientSearchTypes
          };

          clientSearchTypesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...clientSearchTypes);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchClientSearchTypes());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchClientSearchTypes());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchClientSearchTypes/rejected`;
        jest.spyOn(clientSearchTypesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchClientSearchTypes());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchClientSearchTypes/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(clientSearchTypesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchClientSearchTypes());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchClientTaxTypes', () => {
      it('invokes clientTaxTypesApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            clientTaxTypes: []
          };

          clientTaxTypesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchClientTaxTypes());

        // * ASSERT
        expect(clientTaxTypesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields = 'id,displayName,isActive';
          const params = { pageSize, pageNumber, fields };
          expect(clientTaxTypesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the client tax types returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const clientTaxTypes = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            clientTaxTypes
          };

          clientTaxTypesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...clientTaxTypes);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchClientTaxTypes());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the client tax types returned from the api when the local storage cache is expired', async () => {
        const dataCache = {
          expiresOn: subDays(new Date(), LOCAL_STORAGE_KEYS.lookups.clientTaxTypes.expireDays).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const clientTaxTypes = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            clientTaxTypes
          };

          clientTaxTypesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...clientTaxTypes);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchClientTaxTypes());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchClientTaxTypes());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchClientTaxTypes/rejected`;
        jest.spyOn(clientTaxTypesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchClientTaxTypes());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchClientTaxTypes/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(clientTaxTypesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchClientTaxTypes());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchCountries', () => {
      it('invokes countriesApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            countries: []
          };

          countriesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchCountries());

        // * ASSERT
        expect(countriesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields = 'id,countryHierarchyReferenceId,displayName,internationalPhoneCode,isActive';
          const params = { pageSize, pageNumber, fields };
          expect(countriesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the countries returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const countries = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            countries
          };

          countriesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...countries);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchCountries());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the countries returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(new Date(), LOCAL_STORAGE_KEYS.lookups.countries.expireDays).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const countries = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            countries
          };

          countriesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...countries);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchCountries());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchCountries());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchCountries/rejected`;
        jest.spyOn(countriesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchCountries());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchCountries/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(countriesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchCountries());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchIncompatibleNaturesOfServices', () => {
      it('invokes incompatibleNaturesOfServicesApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            incompatibleNaturesOfServices: []
          };

          incompatibleNaturesOfServicesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchIncompatibleNaturesOfServices());

        // * ASSERT
        expect(incompatibleNaturesOfServicesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 600;
          const fields = 'id,natureOfServiceId1,natureOfServiceId2';
          const params = { pageSize, pageNumber, fields };
          expect(incompatibleNaturesOfServicesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the incompatible natures of services returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const incompatibleNaturesOfServices = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            incompatibleNaturesOfServices
          };

          incompatibleNaturesOfServicesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...incompatibleNaturesOfServices);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchIncompatibleNaturesOfServices());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the incompatible natures of services returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(
            new Date(),
            LOCAL_STORAGE_KEYS.lookups.incompatibleNaturesOfServices.expireDays
          ).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const incompatibleNaturesOfServices = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            incompatibleNaturesOfServices
          };

          incompatibleNaturesOfServicesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...incompatibleNaturesOfServices);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchIncompatibleNaturesOfServices());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchIncompatibleNaturesOfServices());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchIncompatibleNaturesOfServices/rejected`;
        jest.spyOn(incompatibleNaturesOfServicesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchIncompatibleNaturesOfServices());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchIncompatibleNaturesOfServices/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(incompatibleNaturesOfServicesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchIncompatibleNaturesOfServices());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchIndustryHierarchies', () => {
      it('invokes industryHierarchiesApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            industryHierarchies: []
          };

          industryHierarchiesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchIndustryHierarchies());

        // * ASSERT
        expect(industryHierarchiesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields = 'id,displayName,verticalName,subVerticalName,isActive';
          const params = { pageSize, pageNumber, fields };
          expect(industryHierarchiesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the industry hierarchies returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const industryHierarchies = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            industryHierarchies
          };

          industryHierarchiesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...industryHierarchies);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchIndustryHierarchies());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the industry hierarchies returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(new Date(), LOCAL_STORAGE_KEYS.lookups.industryHierarchies.expireDays).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const industryHierarchies = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            industryHierarchies
          };

          industryHierarchiesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...industryHierarchies);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchIndustryHierarchies());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchIndustryHierarchies());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchIndustryHierarchies/rejected`;
        jest.spyOn(industryHierarchiesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchIndustryHierarchies());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchIndustryHierarchies/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(industryHierarchiesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchIndustryHierarchies());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchInternationalHeadquarterCountries', () => {
      it('invokes internationalHeadquarterCountriesApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            internationalHeadquarterCountries: []
          };

          internationalHeadquarterCountriesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchInternationalHeadquarterCountries());

        // * ASSERT
        expect(internationalHeadquarterCountriesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 500;
          const fields = 'id,displayName,isActive';
          const params = { pageSize, pageNumber, fields };
          expect(internationalHeadquarterCountriesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the international headquarter countries returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const internationalHeadquarterCountries = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            internationalHeadquarterCountries
          };

          internationalHeadquarterCountriesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...internationalHeadquarterCountries);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchInternationalHeadquarterCountries());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the international headquarter countries returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(
            new Date(),
            LOCAL_STORAGE_KEYS.lookups.internationalHeadquarterCountries.expireDays
          ).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const internationalHeadquarterCountries = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            internationalHeadquarterCountries
          };

          internationalHeadquarterCountriesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...internationalHeadquarterCountries);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchInternationalHeadquarterCountries());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchInternationalHeadquarterCountries());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchInternationalHeadquarterCountries/rejected`;
        jest.spyOn(internationalHeadquarterCountriesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchInternationalHeadquarterCountries());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchInternationalHeadquarterCountries/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(internationalHeadquarterCountriesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchInternationalHeadquarterCountries());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchJobCategoryRoles', () => {
      it('invokes jobCategoryRolesApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            jobCategoryRoles: []
          };

          jobCategoryRolesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchJobCategoryRoles());

        // * ASSERT
        expect(jobCategoryRolesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields =
            'id,jobCategoryId,jobRoleId,numberOfStaffAllowedInRole,requiresEffectiveDate,isRequired,isActive';
          const params = { pageSize, pageNumber, fields };
          expect(jobCategoryRolesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the job category roles returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const jobCategoryRoles = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            jobCategoryRoles
          };

          jobCategoryRolesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...jobCategoryRoles);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchJobCategoryRoles());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the job category roles returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(new Date(), LOCAL_STORAGE_KEYS.lookups.jobCategoryRoles.expireDays).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const jobCategoryRoles = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            jobCategoryRoles
          };

          jobCategoryRolesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...jobCategoryRoles);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchJobCategoryRoles());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchJobCategoryRoles());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchJobCategoryRoles/rejected`;
        jest.spyOn(jobCategoryRolesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchJobCategoryRoles());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchJobCategoryRoles/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(jobCategoryRolesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchJobCategoryRoles());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchJobHierarchies', () => {
      it('invokes jobHierarchiesApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            jobHierarchies: []
          };

          jobHierarchiesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchJobHierarchies());

        // * ASSERT
        expect(jobHierarchiesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 250;
          const fields =
            'id,level4Name,complianceJobTypeId,jobNameFormat,requiresForPeriodEndDate,' +
            'allowsAdditionalCharactersInJobName,allowsExpectedFees,areExpectedFeesRequired,allowsExpectedRealization,' +
            'isExpectedRealizationRequired,allowsBudgetHours,areBudgetHoursRequired,jobCategoryId';
          const orderBy = 'level4Name asc';
          const params = { pageSize, pageNumber, fields, orderBy };
          expect(jobHierarchiesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the job hierarchies returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const jobHierarchies = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            jobHierarchies
          };

          jobHierarchiesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...jobHierarchies);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchJobHierarchies());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the job hierarchies returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(new Date(), LOCAL_STORAGE_KEYS.lookups.jobHierarchies.expireDays).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const jobHierarchies = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            jobHierarchies
          };

          jobHierarchiesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...jobHierarchies);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchJobHierarchies());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchJobHierarchies());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchJobHierarchies/rejected`;
        jest.spyOn(jobHierarchiesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchJobHierarchies());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchJobHierarchies/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(jobHierarchiesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchJobHierarchies());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchJobRoles', () => {
      it('invokes jobRolesApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            jobRoles: []
          };

          jobRolesCdsApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchJobRoles());

        // * ASSERT
        expect(jobRolesCdsApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields = 'id,displayName,isActive';
          const params = { pageSize, pageNumber, fields };
          expect(jobRolesCdsApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the job roles returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const jobRoles = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            jobRoles
          };

          jobRolesCdsApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...jobRoles);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchJobRoles());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the job roles returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(new Date(), LOCAL_STORAGE_KEYS.lookups.jobRoles.expireDays).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const jobRoles = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            jobRoles
          };

          jobRolesCdsApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...jobRoles);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchJobRoles());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchJobRoles());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchJobRoles/rejected`;
        jest.spyOn(jobRolesCdsApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchJobRoles());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchJobRoles/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(jobRolesCdsApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchJobRoles());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchMarketSectors', () => {
      it('invokes marketSectorsApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            marketSectors: []
          };

          marketSectorsApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchMarketSectors());

        // * ASSERT
        expect(marketSectorsApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields = 'id,displayName,isActive';
          const params = { pageSize, pageNumber, fields };
          expect(marketSectorsApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the market sectors returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const marketSectors = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            marketSectors
          };

          marketSectorsApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...marketSectors);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchMarketSectors());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the market sectors returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(new Date(), LOCAL_STORAGE_KEYS.lookups.marketSectors.expireDays).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const marketSectors = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            marketSectors
          };

          marketSectorsApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...marketSectors);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchMarketSectors());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchMarketSectors());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchMarketSectors/rejected`;
        jest.spyOn(marketSectorsApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchMarketSectors());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchMarketSectors/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(marketSectorsApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchMarketSectors());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchMonths', () => {
      it('invokes monthsApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            months: []
          };

          monthsApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchMonths());

        // * ASSERT
        expect(monthsApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields = 'id,displayName';
          const params = { pageSize, pageNumber, fields };
          expect(monthsApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the months returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const months = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            months
          };

          monthsApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...months);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchMonths());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the months returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(new Date(), LOCAL_STORAGE_KEYS.lookups.months.expireDays).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const months = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            months
          };

          monthsApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...months);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchMonths());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchMonths());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchMonths/rejected`;
        jest.spyOn(monthsApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchMonths());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchMonths/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(monthsApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchMonths());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchNatureOfServiceJobHierarchyMaps', () => {
      it('invokes natureOfServiceJobHierarchyMapsApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            natureOfServiceJobHierarchyMaps: []
          };

          natureOfServiceJobHierarchyMapsApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchNatureOfServiceJobHierarchyMaps());

        // * ASSERT
        expect(natureOfServiceJobHierarchyMapsApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 300;
          const fields = 'id,natureOfServiceId,jobHierarchyId,isActive';
          const params = { pageSize, pageNumber, fields };
          expect(natureOfServiceJobHierarchyMapsApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the nature of service job hierarchy maps returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const natureOfServiceJobHierarchyMaps = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            natureOfServiceJobHierarchyMaps
          };

          natureOfServiceJobHierarchyMapsApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...natureOfServiceJobHierarchyMaps);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchNatureOfServiceJobHierarchyMaps());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the nature of service job hierarchy maps returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(
            new Date(),
            LOCAL_STORAGE_KEYS.lookups.natureOfServiceJobHierarchyMaps.expireDays
          ).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const natureOfServiceJobHierarchyMaps = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            natureOfServiceJobHierarchyMaps
          };

          natureOfServiceJobHierarchyMapsApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...natureOfServiceJobHierarchyMaps);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchNatureOfServiceJobHierarchyMaps());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchNatureOfServiceJobHierarchyMaps());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchNatureOfServiceJobHierarchyMaps/rejected`;
        jest.spyOn(natureOfServiceJobHierarchyMapsApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchNatureOfServiceJobHierarchyMaps());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchNatureOfServiceJobHierarchyMaps/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(natureOfServiceJobHierarchyMapsApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchNatureOfServiceJobHierarchyMaps());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchNaturesOfServices', () => {
      it('invokes naturesOfServicesApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            naturesOfServices: []
          };

          naturesOfServicesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchNaturesOfServices());

        // * ASSERT
        expect(naturesOfServicesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields = 'id,natureOfService,natureOfServiceTypeId';
          const params = { pageSize, pageNumber, fields };
          expect(naturesOfServicesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the natures of services returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const naturesOfServices = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            naturesOfServices
          };

          naturesOfServicesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...naturesOfServices);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchNaturesOfServices());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the natures of services returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(new Date(), LOCAL_STORAGE_KEYS.lookups.naturesOfServices.expireDays).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const naturesOfServices = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            naturesOfServices
          };

          naturesOfServicesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...naturesOfServices);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchNaturesOfServices());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchNaturesOfServices());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchNaturesOfServices/rejected`;
        jest.spyOn(naturesOfServicesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchNaturesOfServices());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchNaturesOfServices/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(naturesOfServicesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchNaturesOfServices());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchOwnershipTypes', () => {
      it('invokes ownershipTypesApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            ownershipTypes: []
          };

          ownershipTypesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchOwnershipTypes());

        // * ASSERT
        expect(ownershipTypesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields = 'id,displayName,isActive';
          const params = { pageSize, pageNumber, fields };
          expect(ownershipTypesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the ownership types returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const ownershipTypes = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            ownershipTypes
          };

          ownershipTypesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...ownershipTypes);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchOwnershipTypes());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the ownership types returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(new Date(), LOCAL_STORAGE_KEYS.lookups.ownershipTypes.expireDays).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const ownershipTypes = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            ownershipTypes
          };

          ownershipTypesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...ownershipTypes);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchOwnershipTypes());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchOwnershipTypes());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchOwnershipTypes/rejected`;
        jest.spyOn(ownershipTypesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchOwnershipTypes());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchOwnershipTypes/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(ownershipTypesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchOwnershipTypes());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchRegionHierarchies', () => {
      it('invokes regionHierarchiesApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            regionHierarchies: []
          };

          regionHierarchiesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchRegionHierarchies());

        // * ASSERT
        expect(regionHierarchiesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields = 'id,regionalImpactGroupReferenceId,regionalImpactGroupName,isActive';
          const params = { pageSize, pageNumber, fields };
          expect(regionHierarchiesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the region hierarchies returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const regionHierarchies = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            regionHierarchies
          };

          regionHierarchiesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...regionHierarchies);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchRegionHierarchies());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the region hierarchies returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(new Date(), LOCAL_STORAGE_KEYS.lookups.regionHierarchies.expireDays).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const regionHierarchies = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            regionHierarchies
          };

          regionHierarchiesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...regionHierarchies);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchRegionHierarchies());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchRegionHierarchies());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchRegionHierarchies/rejected`;
        jest.spyOn(regionHierarchiesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchRegionHierarchies());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchRegionHierarchies/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(regionHierarchiesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchRegionHierarchies());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchSubjectToSecOrGaoRules', () => {
      it('invokes subjectToSecOrGaoRulesApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            subjectToSecOrGaoRules: []
          };

          subjectToSecOrGaoRulesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchSubjectToSecOrGaoRules());

        // * ASSERT
        expect(subjectToSecOrGaoRulesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields = 'id,displayName';
          const params = { pageSize, pageNumber, fields };
          expect(subjectToSecOrGaoRulesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the subjectToSecOrGaoRules returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const subjectToSecOrGaoRules = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            subjectToSecOrGaoRules
          };

          subjectToSecOrGaoRulesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...subjectToSecOrGaoRules);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchSubjectToSecOrGaoRules());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the subjectToSecOrGaoRules returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(new Date(), LOCAL_STORAGE_KEYS.lookups.subjectToSecOrGaoRules.expireDays).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const subjectToSecOrGaoRules = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            subjectToSecOrGaoRules
          };

          subjectToSecOrGaoRulesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...subjectToSecOrGaoRules);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchSubjectToSecOrGaoRules());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchSubjectToSecOrGaoRules());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchSubjectToSecOrGaoRules/rejected`;
        jest.spyOn(subjectToSecOrGaoRulesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchSubjectToSecOrGaoRules());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchSubjectToSecOrGaoRules/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(subjectToSecOrGaoRulesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchSubjectToSecOrGaoRules());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchSuffixes', () => {
      it('invokes suffixesApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            suffixes: []
          };

          suffixesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchSuffixes());

        // * ASSERT
        expect(suffixesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields = 'id,displayName,isActive';
          const params = { pageSize, pageNumber, fields };
          expect(suffixesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the suffixes returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const suffixes = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            suffixes
          };

          suffixesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...suffixes);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchSuffixes());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the suffixes returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(new Date(), LOCAL_STORAGE_KEYS.lookups.suffixes.expireDays).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const suffixes = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            suffixes
          };

          suffixesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...suffixes);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchSuffixes());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchSuffixes());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchSuffixes/rejected`;
        jest.spyOn(suffixesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchSuffixes());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchSuffixes/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(suffixesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchSuffixes());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchTaxTypes', () => {
      it('invokes taxTypesApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            taxTypes: []
          };

          taxTypesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchTaxTypes());

        // * ASSERT
        expect(taxTypesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 500;
          const fields = 'id,referenceId,displayName,countryHierarchyReferenceId,isActive';
          const params = { pageSize, pageNumber, fields };
          expect(taxTypesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the tax types returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const taxTypes = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            taxTypes
          };

          taxTypesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...taxTypes);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchTaxTypes());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the tax types returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(new Date(), LOCAL_STORAGE_KEYS.lookups.taxTypes.expireDays).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const taxTypes = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            taxTypes
          };

          taxTypesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...taxTypes);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchTaxTypes());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchTaxTypes());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchTaxTypes/rejected`;
        jest.spyOn(taxTypesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchTaxTypes());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchTaxTypes/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(taxTypesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchTaxTypes());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchWorkflowSteps', () => {
      it('invokes workflowStepsApi.get once for each page of data', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            workflowSteps: []
          };

          workflowStepsApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchWorkflowSteps());

        // * ASSERT
        expect(workflowStepsApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields = 'id,displayName,includeInWorkflowHistory';
          const filter = `workflowId eq ${config.WorkflowPlatform.newEngagementApproval.workflowId}`;
          const params = { pageSize, pageNumber, fields, filter };
          expect(workflowStepsApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the workflow steps returned from the api', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const workflowSteps = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            workflowSteps
          };

          workflowStepsApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...workflowSteps);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchWorkflowSteps());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns the workflow steps returned from the api when the local storage cache is expired', async () => {
        // * ARRANGE
        const dataCache = {
          expiresOn: subDays(new Date(), LOCAL_STORAGE_KEYS.lookups.workflowSteps.expireDays).toISOString(),
          data: faker.datatype.array()
        };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));

        const pageCount = faker.datatype.number({ min: 1, max: 5 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 5, max: 10 });
          const workflowSteps = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            workflowSteps
          };

          workflowStepsApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...workflowSteps);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchWorkflowSteps());

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('uses local storage cache when the data exists in local storage and is not expired', async () => {
        const dataCache = { expiresOn: addDays(new Date(), 1).toISOString, data: faker.datatype.array() };
        window.localStorage.__proto__.getItem.mockReturnValue(JSON.stringify(dataCache));
        const actual = await mockStore.dispatch(fetchWorkflowSteps());
        expect(actual.payload).toEqual(dataCache.data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchWorkflowSteps/rejected`;
        jest.spyOn(workflowStepsApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchWorkflowSteps());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const expectedType = `${SLICE_NAME}/lookups/fetchWorkflowSteps/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(workflowStepsApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchWorkflowSteps());

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('searchAllowablePartnerRoleAssignments', () => {
      it('invokes allowablePartnerRoleAssignmentsApi.get with correct args', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const thunkArgs = { searchQuery };
        const expectedApiArgs = {
          pageSize: 15,
          pageNumber: 1,
          filter: 'isActive eq true',
          orderBy: 'staffPreferredFullName asc',
          fields: 'id,staffId,staffPreferredFullName,regionHierarchyId',
          searchQuery: searchQuery
        };

        // * ACT
        await mockStore.dispatch(searchAllowablePartnerRoleAssignments(thunkArgs));

        // * ASSERT
        expect(allowablePartnerRoleAssignmentsApi.get).toHaveBeenCalledTimes(1);
        expect(allowablePartnerRoleAssignmentsApi.get).toHaveBeenCalledWith(expectedApiArgs);
      });

      it('returns the allowable partner role assignments returned from the api', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const thunkArgs = { searchQuery };
        const allowablePartnerRoleAssignments = faker.datatype.array();
        const returnValue = { allowablePartnerRoleAssignments };
        allowablePartnerRoleAssignmentsApi.get.mockReturnValueOnce(returnValue);

        // * ACT
        const actual = await mockStore.dispatch(searchAllowablePartnerRoleAssignments(thunkArgs));

        // * ASSERT
        expect(actual.payload).toEqual(allowablePartnerRoleAssignments);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const thunkArgs = { searchQuery };
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/searchAllowablePartnerRoleAssignments/rejected`;
        jest.spyOn(allowablePartnerRoleAssignmentsApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(searchAllowablePartnerRoleAssignments(thunkArgs));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const thunkArgs = { searchQuery };
        const expectedType = `${SLICE_NAME}/lookups/searchAllowablePartnerRoleAssignments/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(allowablePartnerRoleAssignmentsApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(searchAllowablePartnerRoleAssignments(thunkArgs));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('searchClients', () => {
      it('invokes clientsApi.get with correct args', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const thunkArgs = { searchQuery };
        const expectedApiArgs = {
          pageSize: 15,
          pageNumber: 1,
          filter: 'isActive eq true',
          orderBy: 'displayName asc',
          fields: 'id,displayName',
          searchQuery: searchQuery
        };

        // * ACT
        await mockStore.dispatch(searchClients(thunkArgs));

        // * ASSERT
        expect(clientsApi.get).toHaveBeenCalledTimes(1);
        expect(clientsApi.get).toHaveBeenCalledWith(expectedApiArgs);
      });

      it('returns the clients returned from the api', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const thunkArgs = { searchQuery };
        const clients = faker.datatype.array();
        const returnValue = { clients };
        clientsApi.get.mockReturnValueOnce(returnValue);

        // * ACT
        const actual = await mockStore.dispatch(searchClients(thunkArgs));

        // * ASSERT
        expect(actual.payload).toEqual(clients);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const thunkArgs = { searchQuery };
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/searchClients/rejected`;
        jest.spyOn(clientsApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(searchClients(thunkArgs));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const thunkArgs = { searchQuery };
        const expectedType = `${SLICE_NAME}/lookups/searchClients/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(clientsApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(searchClients(thunkArgs));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('searchStaff', () => {
      it('invokes staffApi.get with correct args', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const thunkArgs = { searchQuery };
        const expectedApiArgs = {
          pageSize: 15,
          pageNumber: 1,
          orderBy: 'preferredFullName asc',
          fields: 'id,preferredFullName',
          searchQuery: searchQuery
        };

        // * ACT
        await mockStore.dispatch(searchStaff(thunkArgs));

        // * ASSERT
        expect(staffApi.get).toHaveBeenCalledTimes(1);
        expect(staffApi.get).toHaveBeenCalledWith(expectedApiArgs);
      });

      it('returns the staff returned from the api', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const thunkArgs = { searchQuery };
        const staff = faker.datatype.array();
        const returnValue = { staff };
        staffApi.get.mockReturnValueOnce(returnValue);

        // * ACT
        const actual = await mockStore.dispatch(searchStaff(thunkArgs));

        // * ASSERT
        expect(actual.payload).toEqual(staff);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const thunkArgs = { searchQuery };
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/searchStaff/rejected`;
        jest.spyOn(staffApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(searchStaff(thunkArgs));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const thunkArgs = { searchQuery };
        const expectedType = `${SLICE_NAME}/lookups/searchStaff/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(staffApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(searchStaff(thunkArgs));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });
  });

  describe('select a client / initial setup', () => {
    describe('fetchExistingClient', () => {
      it('dispatches fetchClient with the correct args', async () => {
        // * ARRANGE
        const clientId = faker.datatype.number();
        const fields =
          'id,displayName,taxTypeId,taxIdentificationNumberMasked,industryHierarchyId,' +
          'marketSectorId,relationshipPartnerStaffId';
        const args = { clientId, fields };
        const thunkReturnValue = faker.random.alphaNumeric(10);
        const fetchClientSpy = jest.spyOn(thunks, 'fetchClient');
        const mockDispatch = jest.fn();

        fetchClientSpy.mockReturnValue(thunkReturnValue);

        // * ACT
        await fetchExistingClient(args)(mockDispatch);

        // * ASSERT
        expect(fetchClientSpy).toHaveBeenCalledTimes(1);
        expect(fetchClientSpy).toHaveBeenCalledWith(args);
        expect(mockDispatch).toHaveBeenCalledWith(thunkReturnValue);
      });

      it('returns the client returned from fetchClient', async () => {
        // * ARRANGE
        const clientId = faker.datatype.number();
        const args = { clientId };
        const client = { id: faker.datatype.number() };
        const dispatchResults = { payload: client };
        const expectedActionPayload = { client, relationshipPartner: null };
        const fetchClientSpy = jest.spyOn(thunks, 'fetchClient');
        const mockDispatch = jest.fn().mockReturnValue(dispatchResults);

        fetchClientSpy.mockReturnValue(client);

        // * ACT
        const actual = await fetchExistingClient(args)(mockDispatch);

        // * ASSERT
        expect(actual.payload).toEqual(expectedActionPayload);
      });

      it('returns null for relationshipPartner when client.relationshipPartnerStaffId has no value', async () => {
        // * ARRANGE
        const clientId = faker.datatype.number();
        const args = { clientId };
        const client = { id: faker.datatype.number() };
        const dispatchResults = { payload: client };
        const fetchClientSpy = jest.spyOn(thunks, 'fetchClient');
        const mockDispatch = jest.fn().mockReturnValue(dispatchResults);

        fetchClientSpy.mockReturnValue(client);

        // * ACT
        const actual = await fetchExistingClient(args)(mockDispatch);

        // * ASSERT
        expect(actual.payload.relationshipPartner).toBeNull();
      });

      it('dispatches ensureStaffExistsInCache when client.relationshipPartnerStaffId has a value', async () => {
        // * ARRANGE
        const clientId = faker.datatype.number();
        const args = { clientId };
        const client = { id: faker.datatype.number(), relationshipPartnerStaffId: faker.datatype.number() };
        const sliceMethodResults = faker.random.alphaNumeric(10);
        const expectedArg = { staffId: client.relationshipPartnerStaffId };
        const dispatchResults = { payload: client };
        const fetchClientSpy = jest.spyOn(thunks, 'fetchClient');
        const mockDispatch = jest.fn().mockReturnValue(dispatchResults);

        staffSlice.ensureStaffExistsInCache.mockReturnValue(sliceMethodResults);
        fetchClientSpy.mockReturnValue(client);

        // * ACT
        await fetchExistingClient(args)(mockDispatch);

        // * ASSERT
        expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
        expect(staffSlice.ensureStaffExistsInCache).toHaveBeenCalledTimes(1);
        expect(staffSlice.ensureStaffExistsInCache).toHaveBeenCalledWith(expectedArg);
      });

      it('returns the relationshipPartner from the staff cache when client.relationshipPartnerStaffId has a value', async () => {
        // * ARRANGE
        const clientId = faker.datatype.number();
        const args = { clientId };
        const client = { id: faker.datatype.number(), relationshipPartnerStaffId: faker.datatype.number() };
        const relationshipPartner = { id: client.relationshipPartnerStaffId };
        const dispatchResults = { payload: client };
        const fetchClientSpy = jest.spyOn(thunks, 'fetchClient');
        const mockDispatch = jest.fn().mockReturnValue(dispatchResults);
        const state = { staff: { staffCache: { staff: [...faker.datatype.array(), relationshipPartner] } } };
        const getState = jest.fn().mockReturnValue(state);

        fetchClientSpy.mockReturnValue(client);

        // * ACT
        const actual = await fetchExistingClient(args)(mockDispatch, getState);

        // * ASSERT
        expect(actual.payload.relationshipPartner).toBe(relationshipPartner);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const clientId = faker.datatype.number();
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/selectClient/fetchExistingClient/rejected`;
        const fetchClientSpy = jest.spyOn(thunks, 'fetchClient');
        fetchClientSpy.mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchExistingClient({ clientId }));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const clientId = faker.datatype.number();
        const expectedType = `${SLICE_NAME}/selectClient/fetchExistingClient/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        const fetchClientSpy = jest.spyOn(thunks, 'fetchClient');
        fetchClientSpy.mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchExistingClient({ clientId }));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('searchExistingClients', () => {
      it('dispatches searchClients', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const thunkArgs = { searchQuery };
        const thunkReturnValue = faker.random.alphaNumeric(10);
        const expectedArgs = { searchQuery, viewId: NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId };
        const searchClientsSpy = jest.spyOn(thunks, 'searchClients');
        searchClientsSpy.mockReturnValue(thunkReturnValue);
        const mockDispatch = jest.fn();

        // * ACT
        await searchExistingClients(thunkArgs)(mockDispatch);

        // * ASSERT
        expect(searchClientsSpy).toHaveBeenCalledTimes(1);
        expect(searchClientsSpy).toHaveBeenCalledWith(expectedArgs);
        expect(mockDispatch).toHaveBeenCalledWith(thunkReturnValue);
      });

      it('returns the clients returned from searchClients', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const thunkArgs = { searchQuery };
        const clients = faker.datatype.array();
        const unwrapResults = clients;
        const mockDispatch = jest.fn().mockReturnValue({
          unwrap: jest.fn().mockReturnValue(unwrapResults)
        });

        jest.spyOn(thunks, 'searchClients');

        // * ACT
        const actual = await searchExistingClients(thunkArgs)(mockDispatch);

        // * ASSERT
        expect(actual.payload).toEqual(clients);
      });
    });
  });

  describe('natures of service (add/remove jobs)', () => {
    describe('createJobInfoResponse', () => {
      it('calls jobInfoResponsesApi.post with correct arguments', async () => {
        const data = faker.datatype.json();
        const mockDispatch = jest.fn();
        await createJobInfoResponse(data)(mockDispatch);
        expect(jobInfoResponsesApi.post).toHaveBeenCalledOnce();
        expect(jobInfoResponsesApi.post).toHaveBeenCalledWith(data);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const data = faker.datatype.json();
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/neiData/createJobInfoResponse/rejected`;
        jest.spyOn(jobInfoResponsesApi, 'post').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(createJobInfoResponse(data));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const data = faker.datatype.json();
        const expectedType = `${SLICE_NAME}/neiData/createJobInfoResponse/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(jobInfoResponsesApi, 'post').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(createJobInfoResponse(data));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('deleteJobInfoResponse', () => {
      it('calls jobInfoResponsesApi.delete with correct arguments', async () => {
        const jobInfoResponseId = faker.datatype.number();
        const etag = faker.random.alpha(10);
        const args = { jobInfoResponseId, etag };
        const mockDispatch = jest.fn();
        await deleteJobInfoResponse(args)(mockDispatch);
        expect(jobInfoResponsesApi.delete).toHaveBeenCalledOnce();
        expect(jobInfoResponsesApi.delete).toHaveBeenCalledWith(jobInfoResponseId, etag);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const jobInfoResponseId = faker.datatype.number();
        const etag = faker.random.alpha(10);
        const args = { jobInfoResponseId, etag };
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/neiData/deleteJobInfoResponse/rejected`;
        jest.spyOn(jobInfoResponsesApi, 'delete').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(deleteJobInfoResponse(args));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const jobInfoResponseId = faker.datatype.number();
        const etag = faker.random.alpha(10);
        const args = { jobInfoResponseId, etag };
        const expectedType = `${SLICE_NAME}/neiData/deleteJobInfoResponse/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(jobInfoResponsesApi, 'delete').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(deleteJobInfoResponse(args));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });
  });

  describe('job setup', () => {
    describe('createJobRole', () => {
      it('invokes jobRolesApi.create with correct arguments', async () => {
        const roleId = faker.datatype.number();
        const staffNumber = faker.datatype.number();
        const jobInfoResponseId = faker.datatype.number();
        const mockDispatch = jest.fn();
        const data = { roleId, staffNumber, jobInfoResponseId };
        await createJobRole({ data })(mockDispatch);
        expect(jobRolesApi.post).toHaveBeenCalledOnce();
        expect(jobRolesApi.post).toHaveBeenCalledWith(data);
      });

      it('returns the new job role', async () => {
        // * ARRANGE
        const roleId = faker.datatype.number();
        const staffNumber = faker.datatype.number();
        const jobInfoResponseId = faker.datatype.number();
        const jobRole = { id: faker.datatype.number() };
        const mockDispatch = jest.fn();
        const data = { roleId, staffNumber, jobInfoResponseId };

        jobRolesApi.post.mockReturnValue(jobRole);

        // * ACT
        const actual = await createJobRole({ data })(mockDispatch);

        // * ASSERT
        expect(actual.payload).toBe(jobRole);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const roleId = faker.datatype.number();
        const staffNumber = faker.datatype.number();
        const jobInfoResponseId = faker.datatype.number();
        const data = { roleId, staffNumber, jobInfoResponseId };
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/neiData/createJobRole/rejected`;
        jest.spyOn(jobRolesApi, 'post').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(createJobRole({ data }));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const roleId = faker.datatype.number();
        const staffNumber = faker.datatype.number();
        const jobInfoResponseId = faker.datatype.number();
        const data = { roleId, staffNumber, jobInfoResponseId };
        const expectedType = `${SLICE_NAME}/neiData/createJobRole/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(jobRolesApi, 'post').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(createJobRole({ data }));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('deleteJobRole', () => {
      it('invokes jobRolesApi.delete with correct arguments', async () => {
        const jobRoleId = faker.datatype.number();
        const etag = faker.random.alpha(10);
        const args = { jobRoleId, etag };
        const mockDispatch = jest.fn();
        await deleteJobRole(args)(mockDispatch);
        expect(jobRolesApi.delete).toHaveBeenCalledOnce();
        expect(jobRolesApi.delete).toHaveBeenCalledWith(jobRoleId, etag);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const jobRoleId = faker.datatype.number();
        const etag = faker.random.alpha(10);
        const args = { jobRoleId, etag };
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/neiData/deleteJobRole/rejected`;
        jest.spyOn(jobRolesApi, 'delete').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(deleteJobRole(args));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const jobRoleId = faker.datatype.number();
        const etag = faker.random.alpha(10);
        const args = { jobRoleId, etag };
        const expectedType = `${SLICE_NAME}/neiData/deleteJobRole/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(jobRolesApi, 'delete').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(deleteJobRole(args));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('searchJobRoleAllowablePartnerRoleAssignments', () => {
      it('dispatches searchAllowablePartnerRoleAssignments with correct args', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const viewId = faker.random.alphaNumeric(10);
        const lookupName = faker.random.alphaNumeric(10);
        const thunkArgs = { searchQuery, viewId, lookupName };

        const searchSpy = jest.spyOn(thunks, 'searchAllowablePartnerRoleAssignments');

        // * ACT
        await mockStore.dispatch(searchJobRoleAllowablePartnerRoleAssignments(thunkArgs));

        // * ASSERT
        expect(searchSpy).toHaveBeenCalledWith(thunkArgs);
      });

      it('returns the allowable partner role assignments returned from searchJobRoleAllowablePartnerRoleAssignments', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const viewId = faker.random.alphaNumeric(10);
        const lookupName = faker.random.alphaNumeric(10);
        const thunkArgs = { searchQuery, viewId, lookupName };
        const allowablePartnerRoleAssignments = faker.datatype.array();

        const mockDispatch = jest.fn().mockReturnValue({
          unwrap: jest.fn().mockReturnValue(allowablePartnerRoleAssignments)
        });

        jest.spyOn(thunks, 'searchAllowablePartnerRoleAssignments');

        // * ACT
        const actual = await searchJobRoleAllowablePartnerRoleAssignments(thunkArgs)(mockDispatch);

        // * ASSERT
        expect(actual.payload).toEqual(allowablePartnerRoleAssignments);
      });
    });

    describe('searchJobRoleStaff', () => {
      it('dispatches searchStaff with correct args', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const viewId = faker.random.alphaNumeric(10);
        const lookupName = faker.random.alphaNumeric(10);

        const thunkArgs = {
          filter: 'isActive eq true',
          searchQuery,
          viewId,
          lookupName
        };

        const searchStaffSpy = jest.spyOn(thunks, 'searchStaff');

        // * ACT
        await mockStore.dispatch(searchJobRoleStaff(thunkArgs));

        // * ASSERT
        expect(searchStaffSpy).toHaveBeenCalledWith(thunkArgs);
      });

      it('returns the staff returned from searchStaff', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const viewId = faker.random.alphaNumeric(10);
        const lookupName = faker.random.alphaNumeric(10);

        const thunkArgs = {
          filter: 'isActive eq true',
          searchQuery,
          viewId,
          lookupName
        };
        const staff = faker.datatype.array();

        const mockDispatch = jest.fn().mockReturnValue({
          unwrap: jest.fn().mockReturnValue(staff)
        });

        jest.spyOn(thunks, 'searchStaff');

        // * ACT
        const actual = await searchJobRoleStaff(thunkArgs)(mockDispatch);

        // * ASSERT
        expect(actual.payload).toEqual(staff);
      });
    });

    describe('searchJobRoleStaffWhichHaveRoleAssignments', () => {
      it('dispatches searchStaff with correct args', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const viewId = faker.random.alphaNumeric(10);
        const lookupName = faker.random.alphaNumeric(10);

        const thunkArgs = {
          filter: 'isActive eq true,hasAllowablePartnerRoleAssignments eq true',
          searchQuery,
          viewId,
          lookupName
        };

        const searchStaffSpy = jest.spyOn(thunks, 'searchStaff');

        // * ACT
        await mockStore.dispatch(searchJobRoleStaffWhichHaveRoleAssignments(thunkArgs));

        // * ASSERT
        expect(searchStaffSpy).toHaveBeenCalledWith(thunkArgs);
      });

      it('returns the staff returned from searchStaff', async () => {
        // * ARRANGE
        const searchQuery = faker.random.alphaNumeric(10);
        const viewId = faker.random.alphaNumeric(10);
        const lookupName = faker.random.alphaNumeric(10);

        const thunkArgs = {
          filter: 'isActive eq true,hasAllowablePartnerRoleAssignments eq true',
          searchQuery,
          viewId,
          lookupName
        };
        const staff = faker.datatype.array();

        const mockDispatch = jest.fn().mockReturnValue({
          unwrap: jest.fn().mockReturnValue(staff)
        });

        jest.spyOn(thunks, 'searchStaff');

        // * ACT
        const actual = await searchJobRoleStaffWhichHaveRoleAssignments(thunkArgs)(mockDispatch);

        // * ASSERT
        expect(actual.payload).toEqual(staff);
      });
    });
  });

  describe('load new engagement instance data', () => {
    describe('fetchAttachmentInfoResponsesForNei', () => {
      it('invokes attachmentInfoResponses.get once for each page of data', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            attachmentInfoResponses: []
          };

          attachmentInfoResponsesApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchAttachmentInfoResponsesForNei(newEngagementInstanceId));

        // * ASSERT
        expect(attachmentInfoResponsesApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields = 'id,responseReferenceId,fileName,attachmentReferenceId,attachmentTypeId';
          const filter = `newEngagementInstanceId eq ${newEngagementInstanceId}`;
          const params = { pageSize, pageNumber, fields, filter };
          expect(attachmentInfoResponsesApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the attachment info responses returned from the api', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const pageCount = faker.datatype.number({ min: 5, max: 10 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 1, max: 3 });
          const attachmentInfoResponses = [...Array(itemCount).keys()].map((ix) => {
            return { id: ix };
          });

          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            attachmentInfoResponses
          };

          attachmentInfoResponsesApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...attachmentInfoResponses);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchAttachmentInfoResponsesForNei(newEngagementInstanceId));

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/lookups/fetchAttachmentInfoResponsesForNei/rejected`;
        jest.spyOn(attachmentInfoResponsesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchAttachmentInfoResponsesForNei(newEngagementInstanceId));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const expectedType = `${SLICE_NAME}/lookups/fetchAttachmentInfoResponsesForNei/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(attachmentInfoResponsesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchAttachmentInfoResponsesForNei(newEngagementInstanceId));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchInitialSetupResponseForNei', () => {
      it('returns the initialSetupResponse returned from the api', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const initialSetupResponse = { id: faker.datatype.number };
        const isrCollection = { initialSetupResponses: [initialSetupResponse] };
        const mockDispatch = jest.fn();

        initialSetupResponsesApi.get.mockReturnValue(isrCollection);
        initialSetupResponsesApi.getInitialSetupResponse.mockReturnValue(initialSetupResponse);

        // * ACT
        const actual = await fetchInitialSetupResponseForNei(newEngagementInstanceId)(mockDispatch);

        // * ASSERT
        expect(actual.payload).toEqual(initialSetupResponse);
      });

      it('adds clientDisplayName to the isr when isr.clientNumber has a value', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const initialSetupResponse = { id: faker.datatype.number, clientNumber: faker.datatype.number() };

        const clientDisplayName = faker.random.alpha(10);
        const client = { displayName: clientDisplayName };
        const fetchClientResults = faker.random.alpha(10);

        const isrCollection = { initialSetupResponses: [initialSetupResponse] };
        const fetchClientSpy = jest.spyOn(thunks, 'fetchClient');
        const expectedInitialSetupResponse = { ...initialSetupResponse, clientDisplayName };

        const mockDispatch = jest.fn().mockImplementation((arg) => {
          if (arg === fetchClientResults) {
            return { payload: client };
          }

          return null;
        });

        initialSetupResponsesApi.get.mockReturnValue(isrCollection);
        initialSetupResponsesApi.getInitialSetupResponse.mockReturnValue(initialSetupResponse);
        fetchClientSpy.mockReturnValue(fetchClientResults);

        // * ACT
        const actual = await fetchInitialSetupResponseForNei(newEngagementInstanceId)(mockDispatch);

        // * ASSERT
        expect(actual.payload).toEqual(expectedInitialSetupResponse);
      });

      it('adds relationshipPartnerDisplayName to the isr when isr.relationshipPartnerStaffNumber has a value', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const staffId = faker.datatype.number();
        const staffName = faker.random.alpha(10);
        const initialSetupResponse = { id: faker.datatype.number, relationshipPartnerStaffNumber: staffId };

        const relationshipPartner = { id: staffId, preferredFullName: staffName };
        const state = { staff: { staffCache: { staff: [...faker.datatype.array(), relationshipPartner] } } };
        const getState = jest.fn().mockReturnValue(state);

        const isrCollection = { initialSetupResponses: [initialSetupResponse] };
        const expectedInitialSetupResponse = { ...initialSetupResponse, relationshipPartnerDisplayName: staffName };
        const mockDispatch = jest.fn();

        initialSetupResponsesApi.get.mockReturnValue(isrCollection);
        initialSetupResponsesApi.getInitialSetupResponse.mockReturnValue(initialSetupResponse);

        // * ACT
        const actual = await fetchInitialSetupResponseForNei(newEngagementInstanceId)(mockDispatch, getState);

        // * ASSERT
        expect(actual.payload).toEqual(expectedInitialSetupResponse);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/neiData/fetchInitialSetupResponseForNei/rejected`;
        jest.spyOn(initialSetupResponsesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchInitialSetupResponseForNei(newEngagementInstanceId));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const expectedType = `${SLICE_NAME}/neiData/fetchInitialSetupResponseForNei/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(initialSetupResponsesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchInitialSetupResponseForNei(newEngagementInstanceId));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchJobInfoResponsesForNei', () => {
      // **********************************************************************
      // * setup

      let fetchJobRolesForJobInfoResponseSpy;

      beforeEach(() => {
        fetchJobRolesForJobInfoResponseSpy = jest.spyOn(thunks, 'fetchJobRolesForJobInfoResponse');
      });

      // **********************************************************************
      // * tear-down

      afterEach(() => {
        fetchJobRolesForJobInfoResponseSpy.mockRestore();
      });

      // **********************************************************************
      // * execution

      it('returns the jobInfoResponses returned from the api', async () => {
        // * ARRANGE
        const itemCount = faker.datatype.number({ min: 5, max: 10 });
        const jobInfoResponsesCollection1 = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
        const jobInfoResponsesCollection2 = [...Array(itemCount).keys()].map((ix) => ({
          id: ix,
          etag: faker.random.alpha(10)
        }));

        const getResults = { jobInfoResponses: jobInfoResponsesCollection1 };
        const newEngagementInstanceId = faker.datatype.number();
        const mockDispatch = jest.fn();

        jobInfoResponsesApi.get.mockReturnValue(getResults);

        for (let ix = 0; ix < itemCount; ix++) {
          jobInfoResponsesApi.getJobInfoResponse.mockReturnValueOnce(jobInfoResponsesCollection2[ix]);
        }

        // * ACT
        const actual = await fetchJobInfoResponsesForNei(newEngagementInstanceId)(mockDispatch);

        // * ASSERT
        expect(actual.payload).toEqual(jobInfoResponsesCollection2);
      });

      it('dispatches jobSetupViewCreated for each jir', async () => {
        // * ARRANGE
        const itemCount = faker.datatype.number({ min: 5, max: 10 });
        const jobInfoResponses = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));

        const getResults = { jobInfoResponses };
        const newEngagementInstanceId = faker.datatype.number();
        const sliceReturnValue = faker.random.alphaNumeric(10);
        const mockDispatch = jest.fn();

        jobInfoResponsesApi.get.mockReturnValue(getResults);
        newEngagementInstanceSlice.jobSetupViewCreated.mockReturnValue(sliceReturnValue);

        for (let ix = 0; ix < itemCount; ix++) {
          jobInfoResponsesApi.getJobInfoResponse.mockReturnValueOnce(jobInfoResponses[ix]);
        }

        // * ACT
        await fetchJobInfoResponsesForNei(newEngagementInstanceId)(mockDispatch);

        // * ASSERT
        expect(newEngagementInstanceSlice.jobSetupViewCreated).toHaveBeenCalledTimes(jobInfoResponses.length);

        for (let ix = 0; ix < itemCount; ix++) {
          expect(newEngagementInstanceSlice.jobSetupViewCreated).toHaveBeenCalledWith({ jobInfoResponseId: ix });
        }
      });

      it('dispatches fetchJobRolesForJobInfoResponseInternal for each jir', async () => {
        // * ARRANGE
        const itemCount = faker.datatype.number({ min: 5, max: 10 });
        const jobInfoResponses = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));

        const getResults = { jobInfoResponses };
        const newEngagementInstanceId = faker.datatype.number();
        const thunkReturnValue = faker.random.alphaNumeric(10);
        const mockDispatch = jest.fn();

        jobInfoResponsesApi.get.mockReturnValue(getResults);
        fetchJobRolesForJobInfoResponseSpy.mockReturnValue(thunkReturnValue);

        for (let ix = 0; ix < itemCount; ix++) {
          jobInfoResponsesApi.getJobInfoResponse.mockReturnValueOnce(jobInfoResponses[ix]);
        }

        // * ACT
        await fetchJobInfoResponsesForNei(newEngagementInstanceId)(mockDispatch);

        // * ASSERT
        expect(fetchJobRolesForJobInfoResponseSpy).toHaveBeenCalledTimes(jobInfoResponses.length);

        for (let ix = 0; ix < itemCount; ix++) {
          expect(fetchJobRolesForJobInfoResponseSpy).toHaveBeenCalledWith(ix);
        }
      });

      it('adds billToClientDisplayName to the jir when jir.billToClientNumber has a value', async () => {
        // * ARRANGE
        const jirId = faker.datatype.number();
        const billToClientNumber = faker.datatype.number();
        const billToClientDisplayName = faker.random.alpha(10);

        const jobInfoResponsesCollection1 = [{ id: jirId }];
        const jobInfoResponsesCollection2 = [{ id: jirId, billToClientNumber }];
        const jobInfoResponsesCollection3 = [{ id: jirId, billToClientNumber, billToClientDisplayName }];
        const client = { displayName: billToClientDisplayName };

        const getResults = { jobInfoResponses: jobInfoResponsesCollection1 };
        const newEngagementInstanceId = faker.datatype.number();
        const fetchClientResults = faker.random.alpha(10);
        const fetchClientSpy = jest.spyOn(thunks, 'fetchClient');

        const mockDispatch = jest.fn().mockImplementation((arg) => {
          if (arg === fetchClientResults) {
            return { payload: client };
          }

          return null;
        });

        jobInfoResponsesApi.get.mockReturnValue(getResults);
        jobInfoResponsesApi.getJobInfoResponse.mockReturnValueOnce(jobInfoResponsesCollection2[0]);
        fetchClientSpy.mockReturnValue(fetchClientResults);

        // * ACT
        const actual = await fetchJobInfoResponsesForNei(newEngagementInstanceId)(mockDispatch);

        // * ASSERT
        expect(actual.payload).toEqual(jobInfoResponsesCollection3);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/neiData/fetchJobInfoResponsesForNei/rejected`;
        jest.spyOn(jobInfoResponsesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchJobInfoResponsesForNei(newEngagementInstanceId));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const expectedType = `${SLICE_NAME}/neiData/fetchJobInfoResponsesForNei/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(jobInfoResponsesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchJobInfoResponsesForNei(newEngagementInstanceId));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchJobRolesForJobInfoResponse', () => {
      it('returns the jobRoles returned from the api', async () => {
        // * ARRANGE
        const itemCount = faker.datatype.number({ min: 5, max: 10 });
        const jobRolesCollection1 = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
        const jobRolesCollection2 = [...Array(itemCount).keys()].map((ix) => ({
          id: ix,
          etag: faker.random.alpha(10)
        }));

        const getResults = { jobRoles: jobRolesCollection1 };
        const jobInfoResponseId = faker.datatype.number();
        const mockDispatch = jest.fn();

        jobRolesApi.get.mockReturnValue(getResults);

        for (let ix = 0; ix < itemCount; ix++) {
          jobRolesApi.getJobRole.mockReturnValueOnce(jobRolesCollection2[ix]);
        }

        // * ACT
        const actual = await fetchJobRolesForJobInfoResponse(jobInfoResponseId)(mockDispatch);

        // * ASSERT
        expect(actual.payload).toEqual(jobRolesCollection2);
      });

      it('dispatches ensureStaffExistsInCache for each job role staff id', async () => {
        // * ARRANGE
        const itemCount = faker.datatype.number({ min: 5, max: 10 });
        const jobRolesCollection1 = [...Array(itemCount).keys()].map((ix) => ({ id: ix }));
        const jobRolesCollection2 = [...Array(itemCount).keys()].map((ix) => ({
          id: ix,
          staffNumber: faker.datatype.number()
        }));

        const getResults = { jobRoles: jobRolesCollection1 };
        const jobInfoResponseId = faker.datatype.number();
        const sliceReturnValue = faker.random.alphaNumeric(10);
        const mockDispatch = jest.fn();

        jobRolesApi.get.mockReturnValue(getResults);
        staffSlice.ensureStaffExistsInCache.mockReturnValue(sliceReturnValue);

        for (let ix = 0; ix < itemCount; ix++) {
          jobRolesApi.getJobRole.mockReturnValueOnce(jobRolesCollection2[ix]);
        }

        // * ACT
        await fetchJobRolesForJobInfoResponse(jobInfoResponseId)(mockDispatch);

        // * ASSERT
        expect(staffSlice.ensureStaffExistsInCache).toHaveBeenCalledTimes(jobRolesCollection1.length);

        for (let ix = 0; ix < itemCount; ix++) {
          const expected = { staffId: jobRolesCollection2[ix].staffNumber };
          expect(staffSlice.ensureStaffExistsInCache).toHaveBeenCalledWith(expected);
        }
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const jobInfoResponseId = faker.datatype.number();
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/neiData/fetchJobRolesForJobInfoResponse/rejected`;

        jest.spyOn(jobRolesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchJobRolesForJobInfoResponse(jobInfoResponseId));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const jobInfoResponseId = faker.datatype.number();
        const expectedType = `${SLICE_NAME}/neiData/fetchJobRolesForJobInfoResponse/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(jobRolesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchJobRolesForJobInfoResponse(jobInfoResponseId));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchNewEngagementInstance', () => {
      it('returns the newEngagementInstance returned from the api', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const newEngagementInstance = faker.random.alpha(10);
        const mockDispatch = jest.fn();

        newEngagementInstancesApi.getNewEngagementInstance.mockReturnValue(newEngagementInstance);

        // * ACT
        const actual = await fetchNewEngagementInstance(newEngagementInstanceId)(mockDispatch);

        // * ASSERT
        expect(actual.payload).toEqual(newEngagementInstance);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/neiData/fetchNewEngagementInstance/rejected`;
        jest.spyOn(newEngagementInstancesApi, 'getNewEngagementInstance').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchNewEngagementInstance(newEngagementInstanceId));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const expectedType = `${SLICE_NAME}/neiData/fetchNewEngagementInstance/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(newEngagementInstancesApi, 'getNewEngagementInstance').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchNewEngagementInstance(newEngagementInstanceId));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchTaxRiskResponseForNei', () => {
      it('returns the taxRiskResponse returned from the api', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const taxRiskResponse = { id: faker.datatype.number };
        const trrCollection = { taxRiskResponses: [taxRiskResponse] };
        const mockDispatch = jest.fn();

        taxRiskResponsesApi.get.mockReturnValue(trrCollection);
        taxRiskResponsesApi.getTaxRiskResponse.mockReturnValue(taxRiskResponse);

        // * ACT
        const actual = await fetchTaxRiskResponseForNei(newEngagementInstanceId)(mockDispatch);

        // * ASSERT
        expect(actual.payload).toEqual(taxRiskResponse);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/neiData/fetchTaxRiskResponseForNei/rejected`;
        jest.spyOn(taxRiskResponsesApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchTaxRiskResponseForNei(newEngagementInstanceId));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const expectedType = `${SLICE_NAME}/neiData/fetchTaxRiskResponseForNei/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(taxRiskResponsesApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchTaxRiskResponseForNei(newEngagementInstanceId));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });
  });

  describe('load new engagement instance workflow data', () => {
    describe('fetchUserTasks', () => {
      it('invokes userTasksApi.get for each page when newEngagementInstanceId has a value', async () => {
        // * ARRANGE
        const pageCount = faker.datatype.number({ min: 2, max: 10 });
        const newEngagementInstanceId = faker.datatype.number();
        const state = { staff: { userAuthInfo: { userObjectId: faker.random.alphaNumeric(10) } } };
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue(state);

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            userTasks: []
          };

          userTasksApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await fetchUserTasks(newEngagementInstanceId)(dispatch, getState);

        // * ASSERT
        expect(userTasksApi.get).toHaveBeenCalledTimes(pageCount);

        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const fields = 'id,isLocked,isLockedByAnotherUser,callbackUrl,userObjectId';
          const filter = `workflowId eq ${config.WorkflowPlatform.newEngagementApproval.workflowId}, appSpecificWorkflowId eq ${newEngagementInstanceId}`;
          const pageNumber = 1;
          const pageSize = 100;
          const params = { pageSize, pageNumber, fields, filter };
          expect(userTasksApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('does not invoke userTasksApi.get when newEngagementInstanceId has no value', async () => {
        // * ARRANGE
        const newEngagementInstanceId = null;
        const state = {};
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue(state);

        // * ACT
        await fetchUserTasks(newEngagementInstanceId)(dispatch, getState);

        // * ASSERT
        expect(userTasksApi.get).not.toHaveBeenCalled();
      });

      it('returns correct objects when newEngagementInstanceId has no value', async () => {
        // * ARRANGE
        const newEngagementInstanceId = null;
        const state = {};
        const expectedPayload = { currentUserTask: null, userTasks: [] };
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue(state);

        // * ACT
        const response = await fetchUserTasks(newEngagementInstanceId)(dispatch, getState);

        // * ASSERT
        expect(response.payload).toEqual(expectedPayload);
      });

      it('returns currentUserTask and userTasks when newEngagementInstanceId as a value and current user has a task', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const state = { staff: { userAuthInfo: { userObjectId: faker.datatype.uuid() } } };
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue(state);
        const userTask = { userObjectId: state.staff.userAuthInfo.userObjectId };
        const returnValue = {
          paginationMetadata: { currentPage: 1, totalPageCount: 1 },
          userTasks: [userTask]
        };
        const expectedPayload = { currentUserTask: userTask, userTasks: [userTask] };
        userTasksApi.get.mockReturnValue(returnValue);
        userTasksApi.getUserTask.mockReturnValue(userTask);

        // * ACT
        const response = await fetchUserTasks(newEngagementInstanceId)(dispatch, getState);

        // * ASSERT
        expect(response.payload).toEqual(expectedPayload);
      });

      it('returns null for currentUserTask when newEngagementInstanceId has a value and current user does not have a task', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const state = { staff: { userAuthInfo: { userObjectId: faker.datatype.uuid() } } };
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue(state);
        const userTask = { userObjectId: faker.datatype.uuid() };
        const returnValue = {
          paginationMetadata: { currentPage: 1, totalPageCount: 1 },
          userTasks: [userTask]
        };
        const expectedPayload = { currentUserTask: null, userTasks: [userTask] };
        userTasksApi.get.mockReturnValue(returnValue);

        // * ACT
        const response = await fetchUserTasks(newEngagementInstanceId)(dispatch, getState);

        // * ASSERT
        expect(response.payload).toEqual(expectedPayload);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/neiWorkflowData/fetchUserTasks/rejected`;
        const state = { staff: { userAuthInfo: { userObjectId: faker.datatype.uuid() } } };
        jest.spyOn(userTasksApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue(state);

        // * ACT
        const actual = await fetchUserTasks(newEngagementInstanceId)(dispatch, getState);

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const expectedType = `${SLICE_NAME}/neiWorkflowData/fetchUserTasks/rejected`;
        const state = { staff: { userAuthInfo: { userObjectId: faker.datatype.uuid() } } };
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue(state);
        const exceptionData = {
          message: faker.datatype.string(),
          response: {
            status: faker.datatype.string(),
            data: {
              title: faker.datatype.string(),
              traceId: faker.datatype.string()
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        userTasksApi.get.mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await fetchUserTasks(newEngagementInstanceId)(dispatch, getState);

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });

    describe('fetchWorkflowStepRunLogs', () => {
      it('invokes workflowStepRunLogsApi.get once for each page of data', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const pageCount = faker.datatype.number({ min: 2, max: 10 });

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            workflowStepRunLogs: []
          };

          workflowStepRunLogsApi.get.mockReturnValueOnce(returnValue);
        }

        // * ACT
        await mockStore.dispatch(fetchWorkflowStepRunLogs(newEngagementInstanceId));

        // * ASSERT
        expect(workflowStepRunLogsApi.get).toHaveBeenCalledTimes(pageCount);

        // assert the api was called with correct args for each page
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const pageSize = 100;
          const fields = 'id,workflowStepId,actionedByUserObjectId,actionTaken,stepStartDateTime,stepEndDateTime';
          const filter = `workflowId eq ${config.WorkflowPlatform.newEngagementApproval.workflowId}, appSpecificWorkflowId eq ${newEngagementInstanceId}`;
          const params = { pageSize, pageNumber, fields, filter };
          expect(workflowStepRunLogsApi.get).toHaveBeenCalledWith(params);
        }
      });

      it('returns the workflow step run logs returned from the api', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const pageCount = faker.datatype.number({ min: 5, max: 10 });
        const expectedPayload = [];

        // setup the return value for each page of data
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
          const itemCount = faker.datatype.number({ min: 1, max: 3 });
          const workflowStepRunLogs = [...Array(itemCount).keys()].map((ix) => {
            return { id: ix };
          });

          const returnValue = {
            paginationMetadata: { currentPage: pageNumber, totalPageCount: pageCount },
            workflowStepRunLogs
          };

          workflowStepRunLogsApi.get.mockReturnValueOnce(returnValue);
          expectedPayload.push(...workflowStepRunLogs);
        }

        // * ACT
        const actual = await mockStore.dispatch(fetchWorkflowStepRunLogs(newEngagementInstanceId));

        // * ASSERT
        expect(actual.payload).toEqual(expectedPayload);
      });

      it('returns correct action when an error is thrown', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const errorMessage = faker.datatype.string();
        const expectedType = `${SLICE_NAME}/neiWorkflowData/fetchWorkflowStepRunLogs/rejected`;
        jest.spyOn(workflowStepRunLogsApi, 'get').mockImplementation(() => {
          throw new Error(errorMessage);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchWorkflowStepRunLogs(newEngagementInstanceId));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.error.message).toBe(errorMessage);
      });

      it('returns correct action when an ApiGeneralException is thrown', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const expectedType = `${SLICE_NAME}/neiWorkflowData/fetchWorkflowStepRunLogs/rejected`;
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: {
              title: faker.random.alphaNumeric(10),
              traceId: faker.random.alphaNumeric(10)
            }
          }
        };
        const expectedPayload = {
          message: exceptionData.response.data.title,
          responseStatus: exceptionData.response.status,
          traceId: exceptionData.response.data.traceId
        };
        jest.spyOn(workflowStepRunLogsApi, 'get').mockImplementation(() => {
          throw new ApiGeneralException(exceptionData);
        });

        // * ACT
        const actual = await mockStore.dispatch(fetchWorkflowStepRunLogs(newEngagementInstanceId));

        // * ASSERT
        expect(actual.type).toBe(expectedType);
        expect(actual.payload).toEqual(expectedPayload);
      });
    });
  });
});
