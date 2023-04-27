import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDays, isAfter } from 'date-fns';

import CURRENCIES from '../../../helpers/enums/currencies';
import JOB_ROLES from '../../../helpers/enums/jobRoles';
import LOCAL_STORAGE_KEYS from '../../../helpers/enums/localStorageKeys';
import NEW_ENGAGEMENT_INSTANCE_VIEWS from '../../../helpers/enums/newEngagementInstanceViews';

import * as config from '../../../configs/config';
import ApiGeneralException from '../../../api/ApiGeneralException';

import allowablePartnerRoleAssignmentsApi from '../../../api/centralDataStore/allowablePartnerRoleAssignmentsApi';
import billingSchedulesApi from '../../../api/centralDataStore/billingSchedulesApi';
import clientsApi from '../../../api/centralDataStore/clientsApi';
import clientTaxTypesApi from '../../../api/centralDataStore/clientTaxTypesApi';
import contractLinesApi from '../../../api/centralDataStore/contractLinesApi';
import contractsApi from '../../../api/centralDataStore/contractsApi';
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
import newBillingSchedulesApi from '../../../api/newEngagementWorkflow/newBillingSchedulesApi';
import newEngagementInstancesApi from '../../../api/newEngagementWorkflow/newEngagementInstancesApi';
import subjectToSecOrGaoRulesApi from '../../../api/newEngagementWorkflow/subjectToSecOrGaoRulesApi';
import taxRiskResponsesApi from '../../../api/newEngagementWorkflow/taxRiskResponsesApi';

import userTasksApi from '../../../api/workflowPlatform/userTasksApi';
import workflowStepRunLogsApi from '../../../api/workflowPlatform/workflowStepRunLogsApi';
import workflowStepsApi from '../../../api/workflowPlatform/workflowStepsApi';

import { ensureStaffExistsInCache } from '../../../app/staffSlice';
import { jobSetupViewCreated } from './newEngagementInstanceSlice';

// import modules that are used as internal methods; this allows mocking the internal modules during testing
// * NOTE: ES6 modules support cyclic dependencies automatically, so it is perfectly valid to import a module
// *       into itself so that functions within the module can call the module export for other functions in the module
import {
  getBillingSchedules as getBillingSchedulesInternal,
  getContractLinesForContract as getContractLinesForContractInternal,
  getContractLinesForContracts as getContractLinesForContractsInternal,
  getContracts as getContractsInternal,
  getNewBillingSchedules as getNewBillingSchedulesInternal,
  fetchClient as fetchClientInternal,
  fetchJobRolesForJobInfoResponse as fetchJobRolesForJobInfoResponseInternal,
  searchAllowablePartnerRoleAssignments as searchAllowablePartnerRoleAssignmentsInternal,
  searchClients as searchClientsInternal,
  searchStaff as searchStaffInternal
} from './newEngagementInstanceThunks';

// **********************************************************************
// * constants

/**
 * The name of the slice (to be used in the slice and thunks).
 */
export const SLICE_NAME = 'newEngagementInstance';

// **********************************************************************
// * functions

/**
 * Get the billing schedules for the given billing schedule ids.
 * @param {Array} billingScheduleIds - An array of billing schedule ids.
 * @returns All billing schedules for the given billing schedule ids.
 */
export const getBillingSchedules = async (billingScheduleIds) => {
  const billingSchedules = [];
  const promises = [];

  for (const billingScheduleId of billingScheduleIds) {
    promises.push(billingSchedulesApi.getBillingSchedule(billingScheduleId));
  }

  const promiseResults = await Promise.all(promises);

  for (const billingSchedule of promiseResults) {
    billingSchedules.push(billingSchedule);
  }

  return billingSchedules;
};

/**
 * Get the contract lines for the given contract.
 * @param {int} contractId - The contract id.
 * @returns All contract lines for the given contract.
 */
export const getContractLinesForContract = async (contractId) => {
  const contractLines = [];
  let pageNumber = 1;
  const pageSize = 100;
  const fields = 'id,billingScheduleId,jobId';

  const filter = `contractId eq ${contractId}`;

  // fetch each page of data as needed
  while (true) {
    const results = await contractLinesApi.get({ pageSize, pageNumber, fields, filter });
    const { currentPage, totalPageCount } = results.paginationMetadata;
    contractLines.push(...results.contractLines);

    if (currentPage >= totalPageCount) {
      break;
    }

    pageNumber += 1;
  }

  return contractLines;
};

/**
 * Get the contracts lines for the given contract ids.
 * @param {Array} contractIds - An array of contract ids.
 * @returns All contract lines for the given contract ids.
 */
export const getContractLinesForContracts = async (contractIds) => {
  const contractLines = [];
  const promises = [];

  for (const contractId of contractIds) {
    promises.push(getContractLinesForContractInternal(contractId));
  }

  const promiseResults = await Promise.all(promises);

  for (const results of promiseResults) {
    contractLines.push(...results);
  }

  return contractLines;
};

/**
 * Get the contracts based on the given args.
 * @param {int} billToClientId - The bill-to client id
 * @param {int} companyId - The company id
 * @param {int} currencyId - The currency id.
 * @returns All contracts for the given args.
 */
export const getContracts = async (billToClientId, companyId, currencyId) => {
  const contracts = [];
  let pageNumber = 1;
  const pageSize = 100;
  const fields = 'id';
  const filter = `billToClientId eq ${billToClientId},companyId eq ${companyId},currencyId eq ${currencyId}`;

  // fetch each page of data as needed
  while (true) {
    const results = await contractsApi.get({ pageSize, pageNumber, fields, filter });
    const { currentPage, totalPageCount } = results.paginationMetadata;
    contracts.push(...results.contracts);

    if (currentPage >= totalPageCount) {
      break;
    }

    pageNumber += 1;
  }

  return contracts;
};

/**
 * Get the new billing schedules based on the given args.
 * @param {int} billToClientId - The bill-to client id
 * @param {int} companyId - The company id
 * @param {int} currencyId - The currency id.
 * @returns All new billing schedules for the given args.
 */
export const getNewBillingSchedules = async (newEngagementInstanceId, billToClientId, companyId, currencyId) => {
  const newBillingSchedules = [];
  let pageNumber = 1;
  const pageSize = 100;
  const fields = 'id,displayName';
  const filter =
    `newEngagementInstanceId eq ${newEngagementInstanceId},` +
    `billToClientNumber eq ${billToClientId},` +
    `companyId eq ${companyId},` +
    `currencyId eq ${currencyId}`;

  // fetch each page of data as needed
  while (true) {
    const results = await newBillingSchedulesApi.get({ pageSize, pageNumber, fields, filter });
    const { currentPage, totalPageCount } = results.paginationMetadata;
    newBillingSchedules.push(...results.newBillingSchedules);

    if (currentPage >= totalPageCount) {
      break;
    }

    pageNumber += 1;
  }

  return newBillingSchedules;
};

// **********************************************************************
// * thunks

// ! remove this once an actual thunk is created
// ! this is currently being used by views not yet wired up to their thunks
export const tempThunk = createAsyncThunk('tempThunk', async () => {});

// **********************************************************************
// * *** GENERAL ***

export const fetchClient = createAsyncThunk(
  `${SLICE_NAME}/fetchClient`,
  async ({ clientId, fields }, { rejectWithValue }) => {
    try {
      const client = await clientsApi.getClient(clientId, fields);

      return client;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

// **********************************************************************
// * *** LOOKUPS ***

/**
 * Fetch all attachment types.
 */
export const fetchAttachmentTypes = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchAttachmentTypes`,
  async (_, { rejectWithValue }) => {
    try {
      const attachmentTypes = [];
      let pageNumber = 1;
      const pageSize = 100;
      const fields = 'id,displayName';
      const orderBy = 'displayName asc';

      // fetch each page of data as needed
      while (true) {
        const results = await attachmentTypesApi.get({ pageSize, pageNumber, fields, orderBy });
        const { currentPage, totalPageCount } = results.paginationMetadata;

        attachmentTypes.push(...results.attachmentTypes);

        if (currentPage >= totalPageCount) {
          break;
        }

        pageNumber += 1;
      }

      return attachmentTypes;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all client entities for a client.
 */
export const fetchClientEntities = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchClientEntities`,
  async (clientId, { rejectWithValue }) => {
    try {
      const clientEntities = [];
      let pageNumber = 1;
      const pageSize = 100;
      const filter = `clientId eq ${clientId}`;
      const fields = 'id,legalEntityName,shortEntityName,isActive';
      const orderBy = 'legalEntityName asc';

      // fetch each page of data as needed
      while (true) {
        const results = await clientEntitiesApi.get({ pageSize, pageNumber, filter, fields, orderBy });
        const { currentPage, totalPageCount } = results.paginationMetadata;

        clientEntities.push(...results.clientEntities);

        if (currentPage >= totalPageCount) {
          break;
        }

        pageNumber += 1;
      }

      return clientEntities;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all client search types.
 */
export const fetchClientSearchTypes = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchClientSearchTypes`,
  async (_, { rejectWithValue }) => {
    try {
      // try to get the data from local storage
      const nowDateTime = new Date();
      const { name: localStorageKey, expireDays: cacheExpireDays } = LOCAL_STORAGE_KEYS.lookups.clientSearchTypes;
      const storageDataObjectJson = localStorage.getItem(localStorageKey);
      let storageDataObject = JSON.parse(storageDataObjectJson);

      // if the data does not exist in local storage, then load it via the API
      // if the data exists in local storage but is expired, then reload it via the API
      if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
        const clientSearchTypes = [];
        let pageNumber = 1;
        const pageSize = 100;
        const fields = 'id,description,orderingKey,crmType';
        const orderBy = 'orderingKey asc';

        // fetch each page of data as needed
        while (true) {
          const results = await clientSearchTypesApi.get({ pageSize, pageNumber, fields, orderBy });
          const { currentPage, totalPageCount } = results.paginationMetadata;

          clientSearchTypes.push(...results.clientSearchTypes);

          if (currentPage >= totalPageCount) {
            break;
          }

          pageNumber += 1;
        }

        storageDataObject = {
          lastFetched: nowDateTime.toISOString(),
          expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
          data: clientSearchTypes
        };
      }

      // save the cache to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

      return storageDataObject.data;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all client tax types.
 */
export const fetchClientTaxTypes = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchClientTaxTypes`,
  async (_, { rejectWithValue }) => {
    try {
      // try to get the data from local storage
      const nowDateTime = new Date();
      const { name: localStorageKey, expireDays: cacheExpireDays } = LOCAL_STORAGE_KEYS.lookups.clientTaxTypes;
      const storageDataObjectJson = localStorage.getItem(localStorageKey);
      let storageDataObject = JSON.parse(storageDataObjectJson);

      // if the data does not exist in local storage, then load it via the API
      // if the data exists in local storage but is expired, then reload it via the API
      if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
        const clientTaxTypes = [];
        let pageNumber = 1;
        const pageSize = 100;
        const fields = 'id,displayName,isActive';

        // fetch each page of data as needed
        while (true) {
          const results = await clientTaxTypesApi.get({ pageSize, pageNumber, fields });
          const { currentPage, totalPageCount } = results.paginationMetadata;

          clientTaxTypes.push(...results.clientTaxTypes);

          if (currentPage >= totalPageCount) {
            break;
          }

          pageNumber += 1;
        }

        storageDataObject = {
          lastFetched: nowDateTime.toISOString(),
          expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
          data: clientTaxTypes
        };
      }

      // save the cache to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

      return storageDataObject.data;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all countries.
 */
export const fetchCountries = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchCountries`,
  async (_, { rejectWithValue }) => {
    try {
      // try to get the data from local storage
      const nowDateTime = new Date();
      const { name: localStorageKey, expireDays: cacheExpireDays } = LOCAL_STORAGE_KEYS.lookups.countries;
      const storageDataObjectJson = localStorage.getItem(localStorageKey);
      let storageDataObject = JSON.parse(storageDataObjectJson);

      // if the data does not exist in local storage, then load it via the API
      // if the data exists in local storage but is expired, then reload it via the API
      if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
        const countries = [];
        let pageNumber = 1;
        const pageSize = 100;
        const fields = 'id,countryHierarchyReferenceId,displayName,internationalPhoneCode,isActive';

        // fetch each page of data as needed
        while (true) {
          const results = await countriesApi.get({ pageSize, pageNumber, fields });
          const { currentPage, totalPageCount } = results.paginationMetadata;

          countries.push(...results.countries);

          if (currentPage >= totalPageCount) {
            break;
          }

          pageNumber += 1;
        }

        storageDataObject = {
          lastFetched: nowDateTime.toISOString(),
          expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
          data: countries
        };
      }

      // save the cache to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

      return storageDataObject.data;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all incompatible natures of services.
 */
export const fetchIncompatibleNaturesOfServices = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchIncompatibleNaturesOfServices`,
  async (_, { rejectWithValue }) => {
    try {
      // try to get the data from local storage
      const nowDateTime = new Date();
      const { name: localStorageKey, expireDays: cacheExpireDays } =
        LOCAL_STORAGE_KEYS.lookups.incompatibleNaturesOfServices;
      const storageDataObjectJson = localStorage.getItem(localStorageKey);
      let storageDataObject = JSON.parse(storageDataObjectJson);

      // if the data does not exist in local storage, then load it via the API
      // if the data exists in local storage but is expired, then reload it via the API
      if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
        const incompatibleNaturesOfServices = [];
        let pageNumber = 1;
        const pageSize = 600;
        const fields = 'id,natureOfServiceId1,natureOfServiceId2';

        // fetch each page of data as needed
        while (true) {
          const results = await incompatibleNaturesOfServicesApi.get({ pageSize, pageNumber, fields });
          const { currentPage, totalPageCount } = results.paginationMetadata;

          incompatibleNaturesOfServices.push(...results.incompatibleNaturesOfServices);

          if (currentPage >= totalPageCount) {
            break;
          }

          pageNumber += 1;
        }

        storageDataObject = {
          lastFetched: nowDateTime.toISOString(),
          expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
          data: incompatibleNaturesOfServices
        };
      }

      // save the cache to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

      return storageDataObject.data;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all industry hierarchies.
 */
export const fetchIndustryHierarchies = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchIndustryHierarchies`,
  async (_, { rejectWithValue }) => {
    try {
      // try to get the data from local storage
      const nowDateTime = new Date();
      const { name: localStorageKey, expireDays: cacheExpireDays } = LOCAL_STORAGE_KEYS.lookups.industryHierarchies;
      const storageDataObjectJson = localStorage.getItem(localStorageKey);
      let storageDataObject = JSON.parse(storageDataObjectJson);

      // if the data does not exist in local storage, then load it via the API
      // if the data exists in local storage but is expired, then reload it via the API
      if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
        const industryHierarchies = [];
        let pageNumber = 1;
        const pageSize = 100;
        const fields = 'id,displayName,verticalName,subVerticalName,isActive';

        // fetch each page of data as needed
        while (true) {
          const results = await industryHierarchiesApi.get({ pageSize, pageNumber, fields });
          const { currentPage, totalPageCount } = results.paginationMetadata;

          industryHierarchies.push(...results.industryHierarchies);

          if (currentPage >= totalPageCount) {
            break;
          }

          pageNumber += 1;
        }

        storageDataObject = {
          lastFetched: nowDateTime.toISOString(),
          expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
          data: industryHierarchies
        };
      }

      // save the cache to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

      return storageDataObject.data;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all international headquarter countries.
 */
export const fetchInternationalHeadquarterCountries = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchInternationalHeadquarterCountries`,
  async (_, { rejectWithValue }) => {
    try {
      // try to get the data from local storage
      const nowDateTime = new Date();
      const { name: localStorageKey, expireDays: cacheExpireDays } =
        LOCAL_STORAGE_KEYS.lookups.internationalHeadquarterCountries;
      const storageDataObjectJson = localStorage.getItem(localStorageKey);
      let storageDataObject = JSON.parse(storageDataObjectJson);

      // if the data does not exist in local storage, then load it via the API
      // if the data exists in local storage but is expired, then reload it via the API
      if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
        const internationalHeadquarterCountries = [];
        let pageNumber = 1;
        const pageSize = 500;
        const fields = 'id,displayName,isActive';

        // fetch each page of data as needed
        while (true) {
          const results = await internationalHeadquarterCountriesApi.get({ pageSize, pageNumber, fields });
          const { currentPage, totalPageCount } = results.paginationMetadata;

          internationalHeadquarterCountries.push(...results.internationalHeadquarterCountries);

          if (currentPage >= totalPageCount) {
            break;
          }

          pageNumber += 1;
        }

        storageDataObject = {
          lastFetched: nowDateTime.toISOString(),
          expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
          data: internationalHeadquarterCountries
        };
      }

      // save the cache to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

      return storageDataObject.data;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all job category roles.
 */
export const fetchJobCategoryRoles = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchJobCategoryRoles`,
  async (_, { rejectWithValue }) => {
    try {
      // try to get the data from local storage
      const nowDateTime = new Date();
      const { name: localStorageKey, expireDays: cacheExpireDays } = LOCAL_STORAGE_KEYS.lookups.jobCategoryRoles;
      const storageDataObjectJson = localStorage.getItem(localStorageKey);
      let storageDataObject = JSON.parse(storageDataObjectJson);

      // if the data does not exist in local storage, then load it via the API
      // if the data exists in local storage but is expired, then reload it via the API
      if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
        const jobCategoryRoles = [];
        let pageNumber = 1;
        const pageSize = 100;
        const fields =
          'id,jobCategoryId,jobRoleId,numberOfStaffAllowedInRole,requiresEffectiveDate,isRequired,isActive';

        // fetch each page of data as needed
        while (true) {
          const results = await jobCategoryRolesApi.get({ pageSize, pageNumber, fields });
          const { currentPage, totalPageCount } = results.paginationMetadata;

          jobCategoryRoles.push(...results.jobCategoryRoles);

          if (currentPage >= totalPageCount) {
            break;
          }

          pageNumber += 1;
        }

        storageDataObject = {
          lastFetched: nowDateTime.toISOString(),
          expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
          data: jobCategoryRoles
        };
      }

      // save the cache to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

      return storageDataObject.data;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all job hierarchies.
 */
export const fetchJobHierarchies = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchJobHierarchies`,
  async (_, { rejectWithValue }) => {
    try {
      // try to get the data from local storage
      const nowDateTime = new Date();
      const { name: localStorageKey, expireDays: cacheExpireDays } = LOCAL_STORAGE_KEYS.lookups.jobHierarchies;
      const storageDataObjectJson = localStorage.getItem(localStorageKey);
      let storageDataObject = JSON.parse(storageDataObjectJson);

      // if the data does not exist in local storage, then load it via the API
      // if the data exists in local storage but is expired, then reload it via the API
      if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
        const jobHierarchies = [];
        let pageNumber = 1;
        const pageSize = 250;
        const fields =
          'id,level4Name,complianceJobTypeId,jobNameFormat,requiresForPeriodEndDate,' +
          'allowsAdditionalCharactersInJobName,allowsExpectedFees,areExpectedFeesRequired,allowsExpectedRealization,' +
          'isExpectedRealizationRequired,allowsBudgetHours,areBudgetHoursRequired,jobCategoryId';
        const orderBy = 'level4Name asc';

        // fetch each page of data as needed
        while (true) {
          const results = await jobHierarchiesApi.get({ pageSize, pageNumber, fields, orderBy });
          const { currentPage, totalPageCount } = results.paginationMetadata;

          jobHierarchies.push(...results.jobHierarchies);

          if (currentPage >= totalPageCount) {
            break;
          }

          pageNumber += 1;
        }

        storageDataObject = {
          lastFetched: nowDateTime.toISOString(),
          expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
          data: jobHierarchies
        };
      }

      // save the cache to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

      return storageDataObject.data;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all job roles.
 */
export const fetchJobRoles = createAsyncThunk(`${SLICE_NAME}/lookups/fetchJobRoles`, async (_, { rejectWithValue }) => {
  try {
    // try to get the data from local storage
    const nowDateTime = new Date();
    const { name: localStorageKey, expireDays: cacheExpireDays } = LOCAL_STORAGE_KEYS.lookups.jobRoles;
    const storageDataObjectJson = localStorage.getItem(localStorageKey);
    let storageDataObject = JSON.parse(storageDataObjectJson);

    // if the data does not exist in local storage, then load it via the API
    // if the data exists in local storage but is expired, then reload it via the API
    if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
      const jobRoles = [];
      let pageNumber = 1;
      const pageSize = 100;
      const fields = 'id,displayName,isActive';

      // fetch each page of data as needed
      while (true) {
        const results = await jobRolesCdsApi.get({ pageSize, pageNumber, fields });
        const { currentPage, totalPageCount } = results.paginationMetadata;

        jobRoles.push(...results.jobRoles);

        if (currentPage >= totalPageCount) {
          break;
        }

        pageNumber += 1;
      }

      storageDataObject = {
        lastFetched: nowDateTime.toISOString(),
        expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
        data: jobRoles
      };
    }

    // save the cache to local storage
    localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

    return storageDataObject.data;
  } catch (error) {
    if (error instanceof ApiGeneralException) {
      return rejectWithValue(error.getExceptionData());
    } else {
      throw error;
    }
  }
});

/**
 * Fetch all market sectors.
 */
export const fetchMarketSectors = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchMarketSectors`,
  async (_, { rejectWithValue }) => {
    try {
      // try to get the data from local storage
      const nowDateTime = new Date();
      const { name: localStorageKey, expireDays: cacheExpireDays } = LOCAL_STORAGE_KEYS.lookups.marketSectors;
      const storageDataObjectJson = localStorage.getItem(localStorageKey);
      let storageDataObject = JSON.parse(storageDataObjectJson);

      // if the data does not exist in local storage, then load it via the API
      // if the data exists in local storage but is expired, then reload it via the API
      if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
        const marketSectors = [];
        let pageNumber = 1;
        const pageSize = 100;
        const fields = 'id,displayName,isActive';

        // fetch each page of data as needed
        while (true) {
          const results = await marketSectorsApi.get({ pageSize, pageNumber, fields });
          const { currentPage, totalPageCount } = results.paginationMetadata;

          marketSectors.push(...results.marketSectors);

          if (currentPage >= totalPageCount) {
            break;
          }

          pageNumber += 1;
        }

        storageDataObject = {
          lastFetched: nowDateTime.toISOString(),
          expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
          data: marketSectors
        };
      }

      // save the cache to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

      return storageDataObject.data;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all months.
 */
export const fetchMonths = createAsyncThunk(`${SLICE_NAME}/lookups/fetchMonths`, async (_, { rejectWithValue }) => {
  try {
    // try to get the data from local storage
    const nowDateTime = new Date();
    const { name: localStorageKey, expireDays: cacheExpireDays } = LOCAL_STORAGE_KEYS.lookups.months;
    const storageDataObjectJson = localStorage.getItem(localStorageKey);
    let storageDataObject = JSON.parse(storageDataObjectJson);

    // if the data does not exist in local storage, then load it via the API
    // if the data exists in local storage but is expired, then reload it via the API
    if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
      const months = [];
      let pageNumber = 1;
      const pageSize = 100;
      const fields = 'id,displayName';

      while (true) {
        const results = await monthsApi.get({ pageSize, pageNumber, fields });
        const { currentPage, totalPageCount } = results.paginationMetadata;

        months.push(...results.months);

        if (currentPage >= totalPageCount) {
          break;
        }

        pageNumber += 1;
      }

      storageDataObject = {
        lastFetched: nowDateTime.toISOString(),
        expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
        data: months
      };
    }

    // save the cache to local storage
    localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

    return storageDataObject.data;
  } catch (error) {
    if (error instanceof ApiGeneralException) {
      return rejectWithValue(error.getExceptionData());
    } else {
      throw error;
    }
  }
});

/**
 * Fetch all nature of service job hierarchy maps.
 */
export const fetchNatureOfServiceJobHierarchyMaps = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchNatureOfServiceJobHierarchyMaps`,
  async (_, { rejectWithValue }) => {
    try {
      // try to get the data from local storage
      const nowDateTime = new Date();
      const { name: localStorageKey, expireDays: cacheExpireDays } =
        LOCAL_STORAGE_KEYS.lookups.natureOfServiceJobHierarchyMaps;
      const storageDataObjectJson = localStorage.getItem(localStorageKey);
      let storageDataObject = JSON.parse(storageDataObjectJson);

      // if the data does not exist in local storage, then load it via the API
      // if the data exists in local storage but is expired, then reload it via the API
      if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
        const natureOfServiceJobHierarchyMaps = [];
        let pageNumber = 1;
        const pageSize = 300;
        const fields = 'id,natureOfServiceId,jobHierarchyId,isActive';

        while (true) {
          const results = await natureOfServiceJobHierarchyMapsApi.get({ pageSize, pageNumber, fields });
          const { currentPage, totalPageCount } = results.paginationMetadata;

          natureOfServiceJobHierarchyMaps.push(...results.natureOfServiceJobHierarchyMaps);

          if (currentPage >= totalPageCount) {
            break;
          }

          pageNumber += 1;
        }

        storageDataObject = {
          lastFetched: nowDateTime.toISOString(),
          expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
          data: natureOfServiceJobHierarchyMaps
        };
      }

      // save the cache to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

      return storageDataObject.data;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all natures of services.
 */
export const fetchNaturesOfServices = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchNaturesOfServices`,
  async (_, { rejectWithValue }) => {
    try {
      // try to get the data from local storage
      const nowDateTime = new Date();
      const { name: localStorageKey, expireDays: cacheExpireDays } = LOCAL_STORAGE_KEYS.lookups.naturesOfServices;
      const storageDataObjectJson = localStorage.getItem(localStorageKey);
      let storageDataObject = JSON.parse(storageDataObjectJson);

      // if the data does not exist in local storage, then load it via the API
      // if the data exists in local storage but is expired, then reload it via the API
      if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
        const naturesOfServices = [];
        let pageNumber = 1;
        const pageSize = 100;
        const fields = 'id,natureOfService,natureOfServiceTypeId';

        while (true) {
          const results = await naturesOfServicesApi.get({ pageSize, pageNumber, fields });
          const { currentPage, totalPageCount } = results.paginationMetadata;

          naturesOfServices.push(...results.naturesOfServices);

          if (currentPage >= totalPageCount) {
            break;
          }

          pageNumber += 1;
        }

        storageDataObject = {
          lastFetched: nowDateTime.toISOString(),
          expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
          data: naturesOfServices
        };
      }

      // save the cache to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

      return storageDataObject.data;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all ownership types.
 */
export const fetchOwnershipTypes = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchOwnershipTypes`,
  async (_, { rejectWithValue }) => {
    try {
      // try to get the data from local storage
      const nowDateTime = new Date();
      const { name: localStorageKey, expireDays: cacheExpireDays } = LOCAL_STORAGE_KEYS.lookups.ownershipTypes;
      const storageDataObjectJson = localStorage.getItem(localStorageKey);
      let storageDataObject = JSON.parse(storageDataObjectJson);

      // if the data does not exist in local storage, then load it via the API
      // if the data exists in local storage but is expired, then reload it via the API
      if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
        const ownershipTypes = [];
        let pageNumber = 1;
        const pageSize = 100;
        const fields = 'id,displayName,isActive';

        // fetch each page of data as needed
        while (true) {
          const results = await ownershipTypesApi.get({ pageSize, pageNumber, fields });
          const { currentPage, totalPageCount } = results.paginationMetadata;

          ownershipTypes.push(...results.ownershipTypes);

          if (currentPage >= totalPageCount) {
            break;
          }

          pageNumber += 1;
        }

        storageDataObject = {
          lastFetched: nowDateTime.toISOString(),
          expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
          data: ownershipTypes
        };
      }

      // save the cache to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

      return storageDataObject.data;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all region hierarchies.
 */
export const fetchRegionHierarchies = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchRegionHierarchies`,
  async (_, { rejectWithValue }) => {
    try {
      // try to get the data from local storage
      const nowDateTime = new Date();
      const { name: localStorageKey, expireDays: cacheExpireDays } = LOCAL_STORAGE_KEYS.lookups.regionHierarchies;
      const storageDataObjectJson = localStorage.getItem(localStorageKey);
      let storageDataObject = JSON.parse(storageDataObjectJson);

      // if the data does not exist in local storage, then load it via the API
      // if the data exists in local storage but is expired, then reload it via the API
      if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
        const regionHierarchies = [];
        let pageNumber = 1;
        const pageSize = 100;
        const fields = 'id,regionalImpactGroupReferenceId,regionalImpactGroupName,isActive';

        // fetch each page of data as needed
        while (true) {
          const results = await regionHierarchiesApi.get({ pageSize, pageNumber, fields });
          const { currentPage, totalPageCount } = results.paginationMetadata;

          regionHierarchies.push(...results.regionHierarchies);

          if (currentPage >= totalPageCount) {
            break;
          }

          pageNumber += 1;
        }

        storageDataObject = {
          lastFetched: nowDateTime.toISOString(),
          expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
          data: regionHierarchies
        };
      }

      // save the cache to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

      return storageDataObject.data;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all SubjectToSecOrGaoRules.
 */
export const fetchSubjectToSecOrGaoRules = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchSubjectToSecOrGaoRules`,
  async (_, { rejectWithValue }) => {
    try {
      // try to get the data from local storage
      const nowDateTime = new Date();
      const { name: localStorageKey, expireDays: cacheExpireDays } = LOCAL_STORAGE_KEYS.lookups.subjectToSecOrGaoRules;
      const storageDataObjectJson = localStorage.getItem(localStorageKey);
      let storageDataObject = JSON.parse(storageDataObjectJson);

      // if the data does not exist in local storage, then load it via the API
      // if the data exists in local storage but is expired, then reload it via the API
      if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
        const subjectToSecOrGaoRules = [];
        let pageNumber = 1;
        const pageSize = 100;
        const fields = 'id,displayName';

        // fetch each page of data as needed
        while (true) {
          const results = await subjectToSecOrGaoRulesApi.get({ pageSize, pageNumber, fields });
          const { currentPage, totalPageCount } = results.paginationMetadata;

          subjectToSecOrGaoRules.push(...results.subjectToSecOrGaoRules);

          if (currentPage >= totalPageCount) {
            break;
          }

          pageNumber += 1;
        }

        storageDataObject = {
          lastFetched: nowDateTime.toISOString(),
          expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
          data: subjectToSecOrGaoRules
        };
      }

      // save the cache to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

      return storageDataObject.data;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all suffixes.
 */
export const fetchSuffixes = createAsyncThunk(`${SLICE_NAME}/lookups/fetchSuffixes`, async (_, { rejectWithValue }) => {
  try {
    // try to get the data from local storage
    const nowDateTime = new Date();
    const { name: localStorageKey, expireDays: cacheExpireDays } = LOCAL_STORAGE_KEYS.lookups.suffixes;
    const storageDataObjectJson = localStorage.getItem(localStorageKey);
    let storageDataObject = JSON.parse(storageDataObjectJson);

    // if the data does not exist in local storage, then load it via the API
    // if the data exists in local storage but is expired, then reload it via the API
    if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
      const suffixes = [];
      let pageNumber = 1;
      const pageSize = 100;
      const fields = 'id,displayName,isActive';

      // fetch each page of data as needed
      while (true) {
        const results = await suffixesApi.get({ pageSize, pageNumber, fields });
        const { currentPage, totalPageCount } = results.paginationMetadata;

        suffixes.push(...results.suffixes);

        if (currentPage >= totalPageCount) {
          break;
        }

        pageNumber += 1;
      }

      storageDataObject = {
        lastFetched: nowDateTime.toISOString(),
        expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
        data: suffixes
      };
    }

    // save the cache to local storage
    localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

    return storageDataObject.data;
  } catch (error) {
    if (error instanceof ApiGeneralException) {
      return rejectWithValue(error.getExceptionData());
    } else {
      throw error;
    }
  }
});

/**
 * Fetch all tax types.
 */
export const fetchTaxTypes = createAsyncThunk(`${SLICE_NAME}/lookups/fetchTaxTypes`, async (_, { rejectWithValue }) => {
  try {
    // try to get the data from local storage
    const nowDateTime = new Date();
    const { name: localStorageKey, expireDays: cacheExpireDays } = LOCAL_STORAGE_KEYS.lookups.taxTypes;
    const storageDataObjectJson = localStorage.getItem(localStorageKey);
    let storageDataObject = JSON.parse(storageDataObjectJson);

    // if the data does not exist in local storage, then load it via the API
    // if the data exists in local storage but is expired, then reload it via the API
    if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
      const taxTypes = [];
      let pageNumber = 1;
      const pageSize = 500;
      const fields = 'id,referenceId,displayName,countryHierarchyReferenceId,isActive';

      // fetch each page of data as needed
      while (true) {
        const results = await taxTypesApi.get({ pageSize, pageNumber, fields });
        const { currentPage, totalPageCount } = results.paginationMetadata;

        taxTypes.push(...results.taxTypes);

        if (currentPage >= totalPageCount) {
          break;
        }

        pageNumber += 1;
      }

      storageDataObject = {
        lastFetched: nowDateTime.toISOString(),
        expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
        data: taxTypes
      };
    }

    // save the cache to local storage
    localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

    return storageDataObject.data;
  } catch (error) {
    if (error instanceof ApiGeneralException) {
      return rejectWithValue(error.getExceptionData());
    } else {
      throw error;
    }
  }
});

/**
 * Fetch all workflow steps for the new engagement approval workflow.
 */
export const fetchWorkflowSteps = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchWorkflowSteps`,
  async (_, { rejectWithValue }) => {
    try {
      // try to get the data from local storage
      const nowDateTime = new Date();
      const { name: localStorageKey, expireDays: cacheExpireDays } = LOCAL_STORAGE_KEYS.lookups.workflowSteps;
      const storageDataObjectJson = localStorage.getItem(localStorageKey);
      let storageDataObject = JSON.parse(storageDataObjectJson);

      // if the data does not exist in local storage, then load it via the API
      // if the data exists in local storage but is expired, then reload it via the API
      if (!storageDataObject || isAfter(nowDateTime, new Date(storageDataObject.expiresOn))) {
        const workflowSteps = [];
        let pageNumber = 1;
        const pageSize = 100;
        const filter = `workflowId eq ${config.WorkflowPlatform.newEngagementApproval.workflowId}`;
        const fields = 'id,displayName,includeInWorkflowHistory';

        // fetch each page of data as needed
        while (true) {
          const results = await workflowStepsApi.get({ pageSize, pageNumber, filter, fields });
          const { currentPage, totalPageCount } = results.paginationMetadata;

          workflowSteps.push(...results.workflowSteps);

          if (currentPage >= totalPageCount) {
            break;
          }

          pageNumber += 1;
        }

        storageDataObject = {
          lastFetched: nowDateTime.toISOString(),
          expiresOn: addDays(nowDateTime, cacheExpireDays).toISOString(),
          data: workflowSteps
        };
      }

      // save the cache to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(storageDataObject));

      return storageDataObject.data;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Search allowable partner role assignments.
 */
export const searchAllowablePartnerRoleAssignments = createAsyncThunk(
  `${SLICE_NAME}/lookups/searchAllowablePartnerRoleAssignments`,
  async ({ searchQuery }, { rejectWithValue }) => {
    const pageSize = 15;
    const pageNumber = 1;
    const filter = 'isActive eq true';
    const orderBy = 'staffPreferredFullName asc';
    const fields = 'id,staffId,staffPreferredFullName,regionHierarchyId';

    try {
      const results = await allowablePartnerRoleAssignmentsApi.get({
        pageSize,
        pageNumber,
        filter,
        searchQuery,
        orderBy,
        fields
      });
      return results.allowablePartnerRoleAssignments;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Search for clients.
 */
export const searchClients = createAsyncThunk(
  `${SLICE_NAME}/lookups/searchClients`,
  async ({ searchQuery }, { rejectWithValue }) => {
    const pageSize = 15;
    const pageNumber = 1;
    const filter = 'isActive eq true';
    const orderBy = 'displayName asc';
    const fields = 'id,displayName';

    try {
      const results = await clientsApi.get({ pageSize, pageNumber, filter, searchQuery, orderBy, fields });
      return results.clients;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Search for staff
 */
export const searchStaff = createAsyncThunk(
  `${SLICE_NAME}/lookups/searchStaff`,
  async ({ searchQuery, filter }, { rejectWithValue }) => {
    const pageSize = 15;
    const pageNumber = 1;
    const orderBy = 'preferredFullName asc';
    const fields = 'id,preferredFullName';

    try {
      const results = await staffApi.get({ pageSize, pageNumber, filter, searchQuery, orderBy, fields });
      return results.staff;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

// **********************************************************************
// * *** SELECT A CLIENT / INITIAL SETUP ***

export const fetchExistingClient = createAsyncThunk(
  `${SLICE_NAME}/selectClient/fetchExistingClient`,
  async ({ clientId }, { dispatch, getState, rejectWithValue }) => {
    // todo: MOB: switch to use the cache
    try {
      const fields =
        'id,displayName,taxTypeId,taxIdentificationNumberMasked,industryHierarchyId,' +
        'marketSectorId,relationshipPartnerStaffId';
      const action = await dispatch(fetchClientInternal({ clientId, fields }));
      const client = action.payload;
      let relationshipPartner = null;

      if (!!client.relationshipPartnerStaffId) {
        const staffId = client.relationshipPartnerStaffId;
        await dispatch(ensureStaffExistsInCache({ staffId }));

        relationshipPartner = getState().staff.staffCache.staff.find(
          (staff) => staff.id === client.relationshipPartnerStaffId
        );
      }

      return { client, relationshipPartner };
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

export const searchExistingClients = createAsyncThunk(
  `${SLICE_NAME}/selectClient/searchClients`,
  async ({ searchQuery }, { dispatch }) =>
    dispatch(searchClientsInternal({ searchQuery, viewId: NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId })).unwrap()
);

// **********************************************************************
// * *** NATURES OF SERVICE (add/remove jobs) ***

/**
 * Create a job info response.
 */
export const createJobInfoResponse = createAsyncThunk(
  `${SLICE_NAME}/neiData/createJobInfoResponse`,
  async (data, { rejectWithValue }) => {
    try {
      const jobInfoResponse = await jobInfoResponsesApi.post(data);
      return jobInfoResponse;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Delete a job info response.
 */
export const deleteJobInfoResponse = createAsyncThunk(
  `${SLICE_NAME}/neiData/deleteJobInfoResponse`,
  async ({ jobInfoResponseId, etag }, { rejectWithValue }) => {
    try {
      await jobInfoResponsesApi.delete(jobInfoResponseId, etag);
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

// **********************************************************************
// * *** JOB SETUP ***

/**
 * Create a new job role.
 */
export const createJobRole = createAsyncThunk(
  `${SLICE_NAME}/neiData/createJobRole`,
  async ({ data }, { dispatch, rejectWithValue }) => {
    try {
      // create new job role
      const jobRole = await jobRolesApi.post(data);

      // ensure the job role staff is in the staff cache
      await dispatch(ensureStaffExistsInCache({ staffId: jobRole.staffNumber }));

      return jobRole;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Delete an existing job role.
 */
export const deleteJobRole = createAsyncThunk(
  `${SLICE_NAME}/neiData/deleteJobRole`,
  async ({ jobRoleId, etag }, { rejectWithValue }) => {
    try {
      await jobRolesApi.delete(jobRoleId, etag);
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

export const fetchBillingSchedulesForJir = createAsyncThunk(
  `${SLICE_NAME}/neiData/fetchBillingSchedulesForJir`,
  async ({ viewId }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const newEngagementInstanceId = state.newEngagementInstance.newEngagementInstance.newEngagementInstanceId;
      const view = state.newEngagementInstance.views[viewId];
      const currencyId = CURRENCIES.usd.id;
      const { formData, lookups } = view;
      const { billToClientNumber: billToClientId } = formData;
      const { jobRoles } = lookups;
      const biller = jobRoles.data.find((jr) => jr.roleId === JOB_ROLES.biller.id);
      const { allowablePartnerRoleAssignmentId } = biller;

      const allowablePartnerRoleAssignment = await allowablePartnerRoleAssignmentsApi.getAllowablePartnerRoleAssignment(
        allowablePartnerRoleAssignmentId,
        'id,companyId'
      );

      const { companyId } = allowablePartnerRoleAssignment;
      const contracts = await getContractsInternal(billToClientId, companyId, currencyId);
      const contractIds = contracts.map((c) => c.id);
      const contractLines = await getContractLinesForContractsInternal(contractIds);
      const billingScheduleIds = Array.from(new Set(contractLines.map((cl) => cl.billingScheduleId)));

      const billingSchedulePromises = [
        getBillingSchedulesInternal(billingScheduleIds),
        getNewBillingSchedulesInternal(newEngagementInstanceId, billToClientId, companyId, currencyId)
      ];

      const promiseResults = await Promise.all(billingSchedulePromises);
      const billingSchedules = promiseResults[0];
      const newBillingSchedules = promiseResults[1];

      // get the job ids that are linked to each billing schedule
      for (const billingSchedule of billingSchedules) {
        const jobIds = Array.from(
          new Set(contractLines.filter((cl) => cl.billingScheduleId === billingSchedule.id).map((cl) => cl.jobId))
        );
        billingSchedule.linkedJobIds = jobIds;
      }

      const returnValue = { billingSchedules, newBillingSchedules };

      return returnValue;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Search for allowable partner role assignments (for job roles).
 */
export const searchJobRoleAllowablePartnerRoleAssignments = createAsyncThunk(
  `${SLICE_NAME}/neiData/searchJobRoleAllowablePartnerRoleAssignments`,
  async ({ searchQuery, viewId, lookupName }, { dispatch }) => {
    return dispatch(searchAllowablePartnerRoleAssignmentsInternal({ searchQuery, viewId, lookupName })).unwrap();
  }
);

/**
 * Search for staff (for job roles).
 */
export const searchJobRoleStaff = createAsyncThunk(
  `${SLICE_NAME}/neiData/searchJobRoleStaff`,
  async ({ searchQuery, viewId, lookupName }, { dispatch }) => {
    const filter = 'isActive eq true';
    return dispatch(searchStaffInternal({ searchQuery, filter, viewId, lookupName })).unwrap();
  }
);

/**
 * Search for staff which have role assignments (for job roles).
 */
export const searchJobRoleStaffWhichHaveRoleAssignments = createAsyncThunk(
  `${SLICE_NAME}/neiData/searchJobRoleStaffWhichHaveRoleAssignments`,
  async ({ searchQuery, viewId, lookupName }, { dispatch }) => {
    const filter = 'isActive eq true,hasAllowablePartnerRoleAssignments eq true';
    return dispatch(searchStaffInternal({ searchQuery, filter, viewId, lookupName })).unwrap();
  }
);

// **********************************************************************
// * *** LOAD NEW ENGAGEMENT INSTANCE DATA ***

/**
 * Fetch all attachment info responses for a new engagement instance.
 */
export const fetchAttachmentInfoResponsesForNei = createAsyncThunk(
  `${SLICE_NAME}/lookups/fetchAttachmentInfoResponsesForNei`,
  async (newEngagementInstanceId, { rejectWithValue }) => {
    try {
      const attachmentInfoResponses = [];
      let pageNumber = 1;
      const pageSize = 100;
      const fields = 'id,responseReferenceId,fileName,attachmentReferenceId,attachmentTypeId';
      const filter = `newEngagementInstanceId eq ${newEngagementInstanceId}`;

      // fetch each page of data as needed
      while (true) {
        const results = await attachmentInfoResponsesApi.get({ pageSize, pageNumber, fields, filter });
        const { currentPage, totalPageCount } = results.paginationMetadata;

        attachmentInfoResponses.push(...results.attachmentInfoResponses);

        if (currentPage >= totalPageCount) {
          break;
        }

        pageNumber += 1;
      }

      return attachmentInfoResponses;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch the initial setup response for a new engagement instance.
 */
export const fetchInitialSetupResponseForNei = createAsyncThunk(
  `${SLICE_NAME}/neiData/fetchInitialSetupResponseForNei`,
  async (newEngagementInstanceId, { dispatch, getState, rejectWithValue }) => {
    try {
      const pageNumber = 1;
      const pageSize = 1;
      const filter = `newEngagementInstanceId eq ${newEngagementInstanceId}`;
      let fields = 'id';
      const results = await initialSetupResponsesApi.get({ pageSize, pageNumber, filter, fields });
      const isrId = results.initialSetupResponses[0].id;

      fields = null;
      const initialSetupResponse = await initialSetupResponsesApi.getInitialSetupResponse(isrId, fields);

      if (!!initialSetupResponse.clientNumber) {
        const clientId = initialSetupResponse.clientNumber;
        fields = 'id,displayName';
        const action = await dispatch(fetchClientInternal({ clientId, fields }));
        const client = action.payload;
        initialSetupResponse.clientDisplayName = client.displayName;
      }

      if (!!initialSetupResponse.relationshipPartnerStaffNumber) {
        const staffId = initialSetupResponse.relationshipPartnerStaffNumber;
        await dispatch(ensureStaffExistsInCache({ staffId }));

        let relationshipPartner = getState().staff.staffCache.staff.find(
          (staff) => staff.id === initialSetupResponse.relationshipPartnerStaffNumber
        );

        initialSetupResponse.relationshipPartnerDisplayName = relationshipPartner.preferredFullName;
      }

      return initialSetupResponse;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all job info responses for a new engagement instance.
 */
export const fetchJobInfoResponsesForNei = createAsyncThunk(
  `${SLICE_NAME}/neiData/fetchJobInfoResponsesForNei`,
  async (newEngagementInstanceId, { dispatch, rejectWithValue }) => {
    try {
      const pageNumber = 1;
      const pageSize = 100;
      const filter = `newEngagementInstanceId eq ${newEngagementInstanceId}`;
      let fields = 'id';
      const results = await jobInfoResponsesApi.get({ pageSize, pageNumber, filter, fields });

      // create a jobSetup view object for each job info response
      results.jobInfoResponses.forEach((jir) => {
        dispatch(jobSetupViewCreated({ jobInfoResponseId: jir.id }));
      });

      // collection of jobInfoResponses to return
      const jobInfoResponses = [];

      // for each jir, get the full jir object (with etag)
      for (const jir of results.jobInfoResponses) {
        // we'll want all fields returned
        fields = null;

        // get the jir
        const jobInfoResponse = await jobInfoResponsesApi.getJobInfoResponse(jir.id, fields);

        // set any optional properties
        // these may or may not be set, depending on the jir data
        // so, we will default each of them here and they will be overridden as necessary
        jobInfoResponse.billToClientDisplayName = '';

        // if there is a billToClientNumber, fetch the client and set the billToClientDisplayName
        if (!!jobInfoResponse.billToClientNumber) {
          const clientId = jobInfoResponse.billToClientNumber;
          fields = 'id,displayName';
          const action = await dispatch(fetchClientInternal({ clientId, fields }));
          const client = action.payload;
          jobInfoResponse.billToClientDisplayName = client.displayName;
        }

        // add the jir to the collection
        jobInfoResponses.push(jobInfoResponse);

        // load the job roles for the jir
        dispatch(fetchJobRolesForJobInfoResponseInternal(jir.id));
      }

      return jobInfoResponses;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all job roles for a job info response.
 */
export const fetchJobRolesForJobInfoResponse = createAsyncThunk(
  `${SLICE_NAME}/neiData/fetchJobRolesForJobInfoResponse`,
  async (jobInfoResponseId, { dispatch, rejectWithValue }) => {
    try {
      const pageNumber = 1;
      const pageSize = 100;
      const filter = `jobInfoResponseId eq ${jobInfoResponseId}`;
      let fields = 'id';
      const orderBy = 'roleId asc';
      const results = await jobRolesApi.get({ pageSize, pageNumber, filter, fields, orderBy });

      // collection of jobRoles to return
      const jobRoles = [];

      // for each job role id, get the full job role object (with etag)
      for (const role of results.jobRoles) {
        // we'll want all fields returned
        fields = null;

        // get the jobRole
        const jobRole = await jobRolesApi.getJobRole(role.id, fields);

        // ensure the staff is in the cache
        dispatch(ensureStaffExistsInCache({ staffId: jobRole.staffNumber }));

        // add the job role to the collection
        jobRoles.push(jobRole);
      }

      return jobRoles;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch a new engagement instance.
 */
export const fetchNewEngagementInstance = createAsyncThunk(
  `${SLICE_NAME}/neiData/fetchNewEngagementInstance`,
  async (newEngagementInstanceId, { rejectWithValue }) => {
    try {
      const nei = await newEngagementInstancesApi.getNewEngagementInstance(newEngagementInstanceId);

      return nei;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch the tax risk response for a new engagement instance.
 */
export const fetchTaxRiskResponseForNei = createAsyncThunk(
  `${SLICE_NAME}/neiData/fetchTaxRiskResponseForNei`,
  async (newEngagementInstanceId, { rejectWithValue }) => {
    try {
      const pageNumber = 1;
      const pageSize = 1;
      const filter = `newEngagementInstanceId eq ${newEngagementInstanceId}`;
      let fields = 'id';
      const results = await taxRiskResponsesApi.get({ pageSize, pageNumber, filter, fields });
      const taxRiskResponseId = results.taxRiskResponses[0].id;

      fields = null;
      const taxRiskResponse = await taxRiskResponsesApi.getTaxRiskResponse(taxRiskResponseId, fields);

      return taxRiskResponse;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

// **********************************************************************
// * *** LOAD NEW ENGAGEMENT INSTANCE WORKFLOW DATA ***

/**
 * Fetch all user tasks for a new engagement instance.
 */
export const fetchUserTasks = createAsyncThunk(
  `${SLICE_NAME}/neiWorkflowData/fetchUserTasks`,
  async (newEngagementInstanceId, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      // if we do not have a new engagement instance id, then there can be no user tasks
      // return now
      if (newEngagementInstanceId === null) {
        return { currentUserTask: null, userTasks: [] };
      }

      // setup vars for fetching all user tasks for this new engagement instance id
      const userTasks = [];
      const pageSize = 100;
      let pageNumber = 1;
      const filter = `workflowId eq ${config.WorkflowPlatform.newEngagementApproval.workflowId}, appSpecificWorkflowId eq ${newEngagementInstanceId}`;
      const fields = 'id,isLocked,isLockedByAnotherUser,callbackUrl,userObjectId';

      // fetch each page of data as needed
      while (true) {
        const results = await userTasksApi.get({ pageSize, pageNumber, filter, fields });
        const { currentPage, totalPageCount } = results.paginationMetadata;

        userTasks.push(...results.userTasks);

        if (currentPage >= totalPageCount) {
          break;
        }

        pageNumber += 1;
      }

      // if the current user has a task, fetch the entire task
      // as it will need to be updated later if/when locking occurs
      const userObjectId = state.staff.userAuthInfo.userObjectId;
      let currentUserTask = userTasks.find((task) => task.userObjectId === userObjectId) ?? null;

      if (currentUserTask) {
        currentUserTask = await userTasksApi.getUserTask(currentUserTask.id, fields);
      }

      return { currentUserTask, userTasks };
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);

/**
 * Fetch all workflow step run logs for a new engagement instance.
 */
export const fetchWorkflowStepRunLogs = createAsyncThunk(
  `${SLICE_NAME}/neiWorkflowData/fetchWorkflowStepRunLogs`,
  async (newEngagementInstanceId, { rejectWithValue }) => {
    try {
      const workflowStepRunLogs = [];
      const pageSize = 100;
      let pageNumber = 1;
      const filter = `workflowId eq ${config.WorkflowPlatform.newEngagementApproval.workflowId}, appSpecificWorkflowId eq ${newEngagementInstanceId}`;
      const fields = 'id,workflowStepId,actionedByUserObjectId,actionTaken,stepStartDateTime,stepEndDateTime';

      // fetch each page of data as needed
      while (true) {
        const results = await workflowStepRunLogsApi.get({ pageSize, pageNumber, filter, fields });
        const { currentPage, totalPageCount } = results.paginationMetadata;

        workflowStepRunLogs.push(...results.workflowStepRunLogs);

        if (currentPage >= totalPageCount) {
          break;
        }

        pageNumber += 1;
      }

      return workflowStepRunLogs;
    } catch (error) {
      if (error instanceof ApiGeneralException) {
        return rejectWithValue(error.getExceptionData());
      } else {
        throw error;
      }
    }
  }
);
