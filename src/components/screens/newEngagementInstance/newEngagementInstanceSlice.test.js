import faker from '@faker-js/faker';

import NEW_ENGAGEMENT_INSTANCE_VIEWS from '../../../helpers/enums/newEngagementInstanceViews';
import SORT_DIRECTION from '../../../helpers/enums/sortDirection';
import VIEW_STATUSES from '../../../helpers/enums/viewStatuses';

import PmArray from '../../../helpers/customTypes/PmArray';

import newEngagementScreenReducer, {
  JOB_SETUP_VIEW_PREFIX,
  SLICE_NAME,
  existingClientDetailsCleared,
  incrementLoadingTasksTotal,
  jobSetupViewCreated,
  loadExistingNewEngagementInstanceCompleted,
  loadExistingNewEngagementInstanceStarted,
  loadScreenLookupsCompleted,
  lookupItemDataCleared,
  newEngagementInstanceIdSet,
  saveNewEngagementInstanceCompleted,
  saveNewEngagementInstanceFailed,
  saveNewEngagementInstanceStarted,
  selectClientEntity,
  selectCurrentView,
  selectCurrentViewId,
  selectCurrentWorkflowStepId,
  selectDisallowedJobHierarchyIds,
  selectJobHierarchy,
  selectJobSideBarMenuItemDetails,
  selectLookup,
  selectLookups,
  selectLookupsMetadata,
  selectMetadata,
  selectNatureOfServiceJobInfoResponses,
  selectNewEngagementInstance,
  selectView,
  viewChanged,
  viewFormDataChanged
} from './newEngagementInstanceSlice';

// **********************************************************************
// * constants

// **********************************************************************
// * functions

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('newEngagementInstanceSlice', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('actions', () => {
    describe('existingClientDetailsCleared', () => {
      it('clears all existing client details in the selectClient view when dispatched', () => {
        // * ARRANGE
        const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
        const initialState = {
          views: {
            [viewId]: {
              formData: {
                clientNumber: faker.datatype.number(),
                clientName: faker.random.alphaNumeric(10),
                industryHierarchyId: faker.datatype.number(),
                marketSectorId: faker.datatype.number(),
                taxTypeId: faker.datatype.number(),
                taxPayerIdentificationNumberMasked: faker.random.alphaNumeric(10),
                relationshipPartnerStaffNumber: faker.datatype.number(),
                industryName: faker.random.alphaNumeric(10),
                verticalName: faker.random.alphaNumeric(10),
                tinCountry: faker.random.alphaNumeric(10),
                clientDisplayName: faker.random.alphaNumeric(10),
                relationshipPartnerDisplayName: faker.random.alphaNumeric(10)
              }
            }
          }
        };
        const expectedState = {
          views: {
            [viewId]: {
              formData: {
                clientNumber: '',
                clientName: '',
                industryHierarchyId: '',
                marketSectorId: '',
                taxTypeId: '',
                taxPayerIdentificationNumberMasked: '',
                relationshipPartnerStaffNumber: '',
                industryName: '',
                verticalName: '',
                tinCountry: '',
                clientDisplayName: '',
                relationshipPartnerDisplayName: ''
              }
            }
          }
        };

        // * ACT
        const actualState = newEngagementScreenReducer(initialState, existingClientDetailsCleared());

        // * ASSERT
        expect(actualState).toEqual(expectedState);
      });
    });

    describe('incrementLoadingTasksTotal', () => {
      it('updates state.metadata.loadingTasksTotal with the proper amount when dispatched', () => {
        // * ARRANGE
        let initialState = { metadata: { loadingTasksTotal: faker.datatype.number() } };
        const incrementAmount = faker.datatype.number();
        const expectedTotal = initialState.metadata.loadingTasksTotal + incrementAmount;
        const payload = incrementAmount;
        const expectedState = { metadata: { loadingTasksTotal: expectedTotal } };

        // * ACT
        const actualState = newEngagementScreenReducer(initialState, incrementLoadingTasksTotal(payload));

        // * ASSERT
        expect(actualState).toEqual(expectedState);
      });
    });

    describe('jobSetupViewCreated', () => {
      it('creates a jobSetup view for the given jobInfoResponseId', () => {
        const jobInfoResponseId = faker.datatype.number();
        const payload = { jobInfoResponseId };
        const viewId = `${JOB_SETUP_VIEW_PREFIX}${jobInfoResponseId}`;
        const initialState = { views: {} };
        const expectedState = {
          views: {
            [viewId]: {
              sections: {
                jobSetup: {
                  id: 'job-setup-section',
                  label: 'Job Setup',
                  title: 'Job Setup',
                  status: VIEW_STATUSES.normal
                },

                jobRoles: {
                  id: 'job-roles-section',
                  label: 'Job Roles',
                  title: 'Job Roles',
                  status: VIEW_STATUSES.normal
                },

                billingSchedule: {
                  id: 'billing-schedule-section',
                  label: 'Billing Schedule',
                  title: 'Billing Schedule',
                  status: VIEW_STATUSES.normal
                }
              },

              formData: {
                id: null,
                etag: null,
                natureOfServiceId: null,
                jobHierarchyId: null,
                billToClientNumber: '',
                jobName: '',
                jobNameYear: '',
                forPeriodEndedDate: null,
                additionalCustomCharacters: '',
                clientEntityId: '',
                entityLegalName: '',
                entityShortName: '',
                expectedFees: '',
                expectedRealization: '',
                expectedJobBudgetHours: '',
                isApprovingEngagementPartner: '',
                descriptionOfNonAttestServices: '',
                descriptionOfOtherAttestationEngagement: '',
                isBusinessCoveringTheCost: '',
                areAnySpecialReturnsNeeded: '',
                hasMoreThanThreeForms5472: '',
                hasMoreThanFiveBankAccountsForFinCen114: '',
                willReturnsBePreparedForFivePlusStateLocal: '',
                billingScheduleId: null,
                newBillingScheduleId: null,
                billToClientDisplayName: '',
                jobRoleId: '',
                jobRoleStaffId: '',
                jobRoleAllowablePartnerRoleAssignmentId: '',
                jobRoleStaffDisplayName: '',
                jobTypeDisplayName: ''
              },

              lookups: {
                clients: {
                  data: [],
                  isLoading: false,
                  hasError: false,
                  error: null
                },

                jobRoles: {
                  data: [],
                  isLoading: false,
                  hasError: false,
                  error: null
                },

                jobRoleStaff: {
                  data: [],
                  isLoading: false,
                  hasError: false,
                  error: null
                },

                allowablePartnerRoleAssignments: []
              },

              metadata: {
                isLoading: false,
                hasError: false,
                error: null
              }
            }
          }
        };
        const actualState = newEngagementScreenReducer(initialState, jobSetupViewCreated(payload));
        expect(actualState).toEqual(expectedState);
      });
    });

    describe('loadExistingNewEngagementInstanceCompleted', () => {
      it('updates state metadata.isLoading to false when dispatched', () => {
        const initialState = { metadata: { isLoading: true } };
        const expectedState = { metadata: { isLoading: false } };
        const actualState = newEngagementScreenReducer(initialState, loadExistingNewEngagementInstanceCompleted());
        expect(actualState).toEqual(expectedState);
      });
    });

    describe('loadExistingNewEngagementInstanceStarted', () => {
      it('updates state metadata.isLoading to true when dispatched', () => {
        const initialState = { metadata: { isLoading: false } };
        const expectedState = { metadata: { isLoading: true } };
        const actualState = newEngagementScreenReducer(initialState, loadExistingNewEngagementInstanceStarted());
        expect(actualState).toEqual(expectedState);
      });
    });

    describe('loadScreenLookupsCompleted', () => {
      it('updates lookups.metadata.lookupsAreLoaded to true when dispatched', () => {
        const initialState = { lookups: { metadata: { lookupsAreLoaded: false } } };
        const expectedState = { lookups: { metadata: { lookupsAreLoaded: true } } };
        const actualState = newEngagementScreenReducer(initialState, loadScreenLookupsCompleted());
        expect(actualState).toEqual(expectedState);
      });
    });

    describe('lookupItemDataCleared', () => {
      it('clears the data array for the given lookup within the given view when dispatched', () => {
        // * ARRANGE
        const viewId = faker.random.alpha(10);
        const lookupName = faker.random.alpha(10);
        const initialState = {
          views: { [viewId]: { lookups: { [lookupName]: { data: faker.datatype.array() } } } }
        };
        const payload = { viewId, lookupName };
        const expectedState = { views: { [viewId]: { lookups: { [lookupName]: { data: [] } } } } };

        // * ACT
        const actualState = newEngagementScreenReducer(initialState, lookupItemDataCleared(payload));

        // * ASSERT
        expect(actualState).toEqual(expectedState);
      });
    });

    describe('newEngagementInstanceIdSet', () => {
      it('updates newEngagementInstance.newEngagementInstanceId when dispatched', () => {
        const newEngagementInstanceId = faker.datatype.number();
        const payload = newEngagementInstanceId;
        const initialState = { newEngagementInstance: { newEngagementInstanceId: null } };
        const expectedState = { newEngagementInstance: { newEngagementInstanceId } };
        const actualState = newEngagementScreenReducer(initialState, newEngagementInstanceIdSet(payload));
        expect(actualState).toEqual(expectedState);
      });
    });

    describe('saveNewEngagementInstanceCompleted', () => {
      it('updates state metadata.isSaving to false when dispatched', () => {
        // * ARRANGE
        const initialState = { metadata: { isSaving: true } };
        const expectedState = { metadata: { isSaving: false } };

        // * ACT
        const actualState = newEngagementScreenReducer(initialState, saveNewEngagementInstanceCompleted());

        // * ASSERT
        expect(actualState).toEqual(expectedState);
      });
    });

    describe('saveNewEngagementInstanceFailed', () => {
      it('updates state metadata when dispatched', () => {
        // * ARRANGE
        const initialState = { metadata: { isSaving: true, hasError: false, error: null } };
        const error = faker.random.alphaNumeric(10);
        const payload = { error };
        const expectedState = { metadata: { isSaving: false, hasError: true, error } };

        // * ACT
        const actualState = newEngagementScreenReducer(initialState, saveNewEngagementInstanceFailed(payload));

        // * ASSERT
        expect(actualState).toEqual(expectedState);
      });
    });

    describe('saveNewEngagementInstanceStarted', () => {
      it('updates state metadata.isSaving to true when dispatched', () => {
        // * ARRANGE
        const initialState = { metadata: { isSaving: false } };
        const expectedState = { metadata: { isSaving: true } };

        // * ACT
        const actualState = newEngagementScreenReducer(initialState, saveNewEngagementInstanceStarted());

        // * ASSERT
        expect(actualState).toEqual(expectedState);
      });
    });

    describe('viewChanged', () => {
      it('updates views.currentViewId when dispatched', () => {
        // * ARRANGE
        let initialState = { views: { currentViewId: faker.random.alphaNumeric(10) } };
        const newViewId = faker.random.alphaNumeric(10);
        const payload = newViewId;
        const expectedState = { views: { currentViewId: newViewId } };

        // * ACT
        const actualState = newEngagementScreenReducer(initialState, viewChanged(payload));

        // * ASSERT
        expect(actualState).toEqual(expectedState);
      });
    });

    describe('viewFormDataChanged', () => {
      it('updates each matching property in formData for the given view when dispatched', () => {
        // * ARRANGE
        const viewId = faker.random.alpha(10);
        const initialState = { views: { [viewId]: { formData: {} } } };
        const propertyCount = faker.datatype.number({ min: 5, max: 20 });
        const updatedFormData = {};

        // add properties to initialState.formData
        // only add some of them to the updated formData
        for (let index = 0; index < propertyCount; index++) {
          const propertyName = faker.random.alphaNumeric(10);
          const propertyValue = faker.random.alphaNumeric(10);
          const newPropertyValue = faker.random.alphaNumeric(10);
          initialState.views[viewId].formData[propertyName] = propertyValue;

          if (index % 2 === 0) {
            updatedFormData[propertyName] = newPropertyValue;
          }
        }

        const payload = { viewId, formData: updatedFormData };
        const expectedState = {
          views: { [viewId]: { formData: { ...initialState.views[viewId].formData, ...updatedFormData } } }
        };

        // * ACT
        const actualState = newEngagementScreenReducer(initialState, viewFormDataChanged(payload));

        // * ASSERT
        expect(actualState).toEqual(expectedState);
      });
    });
  });

  describe('selectors', () => {
    describe('selectClientEntity', () => {
      it('returns the client entity with the given clientEntityId', () => {
        const clientEntityId = faker.datatype.number();
        const clientEntity = { id: clientEntityId };
        const state = {
          newEngagementInstance: {
            lookups: {
              clientEntities: {
                data: [{ id: faker.datatype.number() }, clientEntity, { id: faker.datatype.number() }]
              }
            }
          }
        };
        const actualValue = selectClientEntity(state, clientEntityId);
        expect(actualValue).toEqual(clientEntity);
      });

      it('returns null when clientEntityId is NaN', () => {
        const clientEntityId = faker.random.alpha(10);
        const state = {};
        const actualValue = selectClientEntity(state, clientEntityId);
        expect(actualValue).toBeNull();
      });
    });

    describe('selectCurrentView', () => {
      it('returns the view object for the current view when invoked', () => {
        // * ARRANGE
        const currentViewId = faker.random.alpha(10);
        const currentViewInfo = faker.random.alphaNumeric(10);
        const expectedValue = currentViewInfo;
        const state = {
          newEngagementInstance: {
            views: {
              currentViewId,
              [faker.random.alpha(10)]: faker.random.alphaNumeric(10),
              [currentViewId]: currentViewInfo,
              [faker.random.alpha(10)]: faker.random.alphaNumeric(10)
            }
          }
        };

        // * ACT
        const actualValue = selectCurrentView(state);

        // * ASSERT
        expect(actualValue).toEqual(expectedValue);
      });
    });

    describe('selectCurrentViewId', () => {
      it('returns views.currentViewId when invoked', () => {
        const currentViewId = faker.random.alphaNumeric(10);
        const state = { newEngagementInstance: { views: { currentViewId } } };
        const expectedValue = currentViewId;
        const actualValue = selectCurrentViewId(state);
        expect(actualValue).toEqual(expectedValue);
      });
    });

    describe('selectCurrentWorkflowStepId', () => {
      it('returns null when there are no workflow step run logs', () => {
        const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.workflowHistory.viewId;
        const state = {
          newEngagementInstance: { views: { [viewId]: { lookups: { workflowStepRunLogs: { data: [] } } } } }
        };
        const actual = selectCurrentWorkflowStepId(state);
        expect(actual).toBeNull();
      });

      it('returns the workflow step id of the most recent workflow step run log', () => {
        // * ARRANGE
        const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.workflowHistory.viewId;
        const itemCount = faker.datatype.number({ min: 5, max: 10 });

        const workflowStepRunLogs = [...Array(itemCount).keys()].map((_, ix) => ({
          id: ix,
          workflowStepId: faker.datatype.number(),
          stepStartDateTime: faker.date.past().toISOString()
        }));

        const state = {
          newEngagementInstance: {
            views: { [viewId]: { lookups: { workflowStepRunLogs: { data: workflowStepRunLogs } } } }
          }
        };

        const expectedWorkflowStepId = new PmArray(...workflowStepRunLogs).sortObjects(
          'stepStartDateTime',
          SORT_DIRECTION.descending.abbreviation
        )[0].workflowStepId;

        // * ACT
        const actual = selectCurrentWorkflowStepId(state);

        // * ASSERT
        expect(actual).toBe(expectedWorkflowStepId);
      });
    });

    describe('selectDisallowedJobHierarchyIds', () => {
      it('select the job hierarchies ids that are not allowed to be used on the nei', () => {
        // * ARRANGE
        const jobHierarchyId1 = faker.datatype.number();
        const jobHierarchyId2 = faker.datatype.number();
        const incompatibleNosId1 = faker.datatype.number();
        const incompatibleNosId2 = faker.datatype.number();
        const nosId1 = faker.datatype.number();
        const nosId2 = faker.datatype.number();
        const expectedJobHierarchyIds = [jobHierarchyId1, jobHierarchyId2];

        const state = {
          newEngagementInstance: {
            views: {
              [`${JOB_SETUP_VIEW_PREFIX}_001`]: { formData: { natureOfServiceId: nosId1 } },
              [`${JOB_SETUP_VIEW_PREFIX}_002`]: { formData: { natureOfServiceId: faker.datatype.number() } },
              [`${JOB_SETUP_VIEW_PREFIX}_003`]: { formData: { natureOfServiceId: nosId2 } }
            },
            lookups: {
              incompatibleNaturesOfServices: {
                data: [
                  { natureOfServiceId1: nosId1, natureOfServiceId2: incompatibleNosId1 },
                  { natureOfServiceId1: faker.datatype.number(), natureOfServiceId2: faker.datatype.number() },
                  { natureOfServiceId1: nosId2, natureOfServiceId2: incompatibleNosId2 }
                ]
              },
              natureOfServiceJobHierarchyMaps: {
                data: [
                  { natureOfServiceId: incompatibleNosId1, jobHierarchyId: jobHierarchyId1 },
                  { natureOfServiceId: faker.datatype.number(), jobHierarchyId: faker.datatype.number() },
                  { natureOfServiceId: incompatibleNosId2, jobHierarchyId: jobHierarchyId2 }
                ]
              }
            }
          }
        };

        // * ACT
        const actual = selectDisallowedJobHierarchyIds(state);

        // * ASSERT
        expect(actual).toEqual(expectedJobHierarchyIds);
      });
    });

    describe('selectJobHierarchy', () => {
      it('returns the job hierarchy object for a given job hierarchy id when invoked', () => {
        const jobHierarchyId = faker.random.alphaNumeric(10);
        const expectedJobHierarchy = { id: jobHierarchyId };
        const state = {
          newEngagementInstance: {
            lookups: {
              jobHierarchies: {
                data: [{ id: faker.datatype.number() }, { id: jobHierarchyId }, { id: faker.datatype.number() }]
              }
            }
          }
        };
        const actual = selectJobHierarchy(state, jobHierarchyId);
        expect(actual).toEqual(expectedJobHierarchy);
      });
    });

    describe('selectJobSideBarMenuItemDetails', () => {
      it('returns the job setup view details needed for the side bar menu items', () => {
        // * ARRANGE
        const itemCount = faker.datatype.number({ min: 5, max: 10 });
        const jobSetupViews = {};
        const anotherView = { formData: { id: faker.datatype.number() } };

        // create job setup views
        [...Array(itemCount).keys()].forEach((itemKey) => {
          jobSetupViews[`${JOB_SETUP_VIEW_PREFIX}${itemKey}`] = {
            formData: {
              id: itemKey,
              jobTypeDisplayName: faker.random.alpha(10),
              // create some with and without job names
              jobName: itemKey % 2 === 0 ? faker.random.alpha(10) : null
            }
          };
        });

        const state = { newEngagementInstance: { views: { ...jobSetupViews, anotherView } } };
        const expected = Object.values(jobSetupViews).map((jsv) => ({
          viewId: `${JOB_SETUP_VIEW_PREFIX}${jsv.formData.id}`,
          label: jsv.formData.jobName || jsv.formData.jobTypeDisplayName
        }));

        // * ACT
        const actual = selectJobSideBarMenuItemDetails(state);

        // * ASSERT
        expect(actual).toEqual(expected);
      });
    });

    describe('selectLookup', () => {
      it('returns the lookup object for a given lookup name when invoked', () => {
        const lookupName = faker.random.alphaNumeric(10);
        const expected = faker.random.alphaNumeric(10);
        const state = { newEngagementInstance: { lookups: { [lookupName]: expected } } };
        const actualValue = selectLookup(state, lookupName);
        expect(actualValue).toEqual(expected);
      });
    });

    describe('selectLookups', () => {
      it('returns lookups when invoked', () => {
        const state = {
          newEngagementInstance: {
            lookups: { fakeLookup1: faker.datatype.array(), fakeLookup2: faker.datatype.array() }
          }
        };
        const expectedValue = state.newEngagementInstance.lookups;
        const actualValue = selectLookups(state);
        expect(actualValue).toEqual(expectedValue);
      });
    });

    describe('selectLookupsMetadata', () => {
      it('returns lookups.metadata when invoked', () => {
        const state = {
          newEngagementInstance: {
            lookups: {
              metadata: { fakeProperty1: faker.datatype.array(), fakeProperty2: faker.datatype.boolean() }
            }
          }
        };
        const expectedValue = state.newEngagementInstance.lookups.metadata;
        const actualValue = selectLookupsMetadata(state);
        expect(actualValue).toEqual(expectedValue);
      });
    });

    describe('selectMetadata', () => {
      it('returns metadata when invoked', () => {
        const state = {
          newEngagementInstance: {
            metadata: { fakeProperty1: faker.datatype.array(), fakeProperty2: faker.datatype.boolean() }
          }
        };
        const expectedValue = state.newEngagementInstance.metadata;
        const actualValue = selectMetadata(state);
        expect(actualValue).toEqual(expectedValue);
      });
    });

    describe('selectNatureOfServiceJobInfoResponses', () => {
      it('returns info for each job info response needed for nos view', () => {
        // * ARRANGE
        const itemCount = faker.datatype.number({ min: 5, max: 10 });
        const jobSetupViews = {};
        const anotherView = { formData: { id: faker.datatype.number() } };

        // create job setup views
        [...Array(itemCount).keys()].forEach((itemKey) => {
          jobSetupViews[`${JOB_SETUP_VIEW_PREFIX}${itemKey}`] = {
            formData: {
              id: itemKey,
              jobName: faker.random.alpha(10),
              jobTypeDisplayName: faker.random.alpha(10),
              natureOfServiceId: faker.datatype.number()
            }
          };
        });

        const state = { newEngagementInstance: { views: { ...jobSetupViews, anotherView } } };

        const expected = Object.values(jobSetupViews).map((jsv) => {
          const { id, jobName, jobTypeDisplayName, natureOfServiceId } = jsv.formData;
          return { id, jobName, jobTypeDisplayName, natureOfServiceId };
        });

        // * ACT
        const actual = selectNatureOfServiceJobInfoResponses(state);

        // * ASSERT
        expect(actual).toEqual(expected);
      });
    });

    describe('selectNewEngagementInstance', () => {
      it('returns newEngagementInstance when invoked', () => {
        const state = {
          newEngagementInstance: {
            newEngagementInstance: {
              fakeProperty1: faker.datatype.number(),
              fakeProperty2: faker.datatype.boolean()
            }
          }
        };
        const expectedValue = state.newEngagementInstance.newEngagementInstance;
        const actualValue = selectNewEngagementInstance(state);
        expect(actualValue).toEqual(expectedValue);
      });
    });

    describe('selectView', () => {
      it('returns the view object for a given view id when invoked', () => {
        const viewId = faker.random.alphaNumeric(10);
        const expectedView = faker.random.alphaNumeric(10);
        const state = {
          newEngagementInstance: {
            views: {
              [faker.random.alphaNumeric(10)]: faker.random.alphaNumeric(10),
              [viewId]: expectedView,
              [faker.random.alphaNumeric(10)]: faker.random.alphaNumeric(10)
            }
          }
        };
        const actualValue = selectView(state, viewId);
        expect(actualValue).toEqual(expectedView);
      });
    });
  });

  describe('thunks', () => {
    // ! see newEngagementInstanceThunks.test.js for all thunks
  });

  describe('extra reducers', () => {
    describe('lookups', () => {
      describe('fetchAttachmentTypes', () => {
        it('updates lookups.attachmentTypes when fetchAttachmentTypes.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchAttachmentTypes/pending`;
          const action = { type: actionType };
          const state = { lookups: { attachmentTypes: {} } };
          const expectedState = {
            lookups: { attachmentTypes: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.attachmentTypes and metadata when fetchAttachmentTypes.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchAttachmentTypes/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { attachmentTypes: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { attachmentTypes: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.attachmentTypes and metadata when fetchAttachmentTypes.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchAttachmentTypes/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { attachmentTypes: {} }, metadata: {} };
          const expectedState = {
            lookups: { attachmentTypes: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the attachment types!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.attachmentTypes and metadata when fetchAttachmentTypes.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchAttachmentTypes/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { attachmentTypes: {} }, metadata: {} };
          const expectedState = {
            lookups: { attachmentTypes: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the attachment types!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchClientEntities', () => {
        it('updates lookups.clientEntities when fetchClientEntities.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchClientEntities/pending`;
          const action = { type: actionType };
          const state = { lookups: { clientEntities: {} } };
          const expectedState = {
            lookups: { clientEntities: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.clientEntities when fetchClientEntities.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchClientEntities/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const state = { lookups: { clientEntities: {} } };
          const expectedState = { lookups: { clientEntities: { data: payload, isLoading: false } } };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.clientEntities and metadata when fetchClientEntities.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchClientEntities/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { clientEntities: {} }, metadata: {} };
          const expectedState = {
            lookups: { clientEntities: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the client entities!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.clientEntities and metadata when fetchClientEntities.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchClientEntities/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { clientEntities: {} }, metadata: {} };
          const expectedState = {
            lookups: { clientEntities: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the client entities!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchClientSearchTypes', () => {
        it('updates lookups.clientSearchTypes when fetchClientSearchTypes.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchClientSearchTypes/pending`;
          const action = { type: actionType };
          const state = { lookups: { clientSearchTypes: {} } };
          const expectedState = {
            lookups: { clientSearchTypes: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.clientSearchTypes when fetchClientSearchTypes.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchClientSearchTypes/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { clientSearchTypes: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { clientSearchTypes: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.clientSearchTypes and metadata when fetchClientSearchTypes.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchClientSearchTypes/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { clientSearchTypes: {} }, metadata: {} };
          const expectedState = {
            lookups: { clientSearchTypes: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the client search types!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.clientSearchTypes and metadata when fetchClientSearchTypes.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchClientSearchTypes/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { clientSearchTypes: {} }, metadata: {} };
          const expectedState = {
            lookups: { clientSearchTypes: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the client search types!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchClientTaxTypes', () => {
        it('updates lookups.clientTaxTypes when fetchClientTaxTypes.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchClientTaxTypes/pending`;
          const action = { type: actionType };
          const state = { lookups: { clientTaxTypes: {} } };
          const expectedState = {
            lookups: { clientTaxTypes: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.clientTaxTypes when fetchClientTaxTypes.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchClientTaxTypes/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { clientTaxTypes: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { clientTaxTypes: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.clientTaxTypes and metadata when fetchClientTaxTypes.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchClientTaxTypes/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { clientTaxTypes: {} }, metadata: {} };
          const expectedState = {
            lookups: { clientTaxTypes: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the client tax types!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.clientTaxTypes and metadata when fetchClientTaxTypes.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchClientTaxTypes/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { clientTaxTypes: {} }, metadata: {} };
          const expectedState = {
            lookups: { clientTaxTypes: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the client tax types!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchCountries', () => {
        it('updates lookups.countries when fetchCountries.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchCountries/pending`;
          const action = { type: actionType };
          const state = { lookups: { countries: {} } };
          const expectedState = {
            lookups: { countries: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.countries when fetchCountries.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchCountries/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { countries: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { countries: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.countries and metadata when fetchCountries.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchCountries/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { countries: {} }, metadata: {} };
          const expectedState = {
            lookups: { countries: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the countries!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.countries and metadata when fetchCountries.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchCountries/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { countries: {} }, metadata: {} };
          const expectedState = {
            lookups: { countries: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the countries!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchIncompatibleNaturesOfServices', () => {
        it('updates lookups.incompatibleNaturesOfServices when fetchIncompatibleNaturesOfServices.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchIncompatibleNaturesOfServices/pending`;
          const action = { type: actionType };
          const state = { lookups: { incompatibleNaturesOfServices: {} } };
          const expectedState = {
            lookups: { incompatibleNaturesOfServices: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.incompatibleNaturesOfServices when fetchIncompatibleNaturesOfServices.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchIncompatibleNaturesOfServices/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { incompatibleNaturesOfServices: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { incompatibleNaturesOfServices: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.incompatibleNaturesOfServices and metadata when fetchIncompatibleNaturesOfServices.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchIncompatibleNaturesOfServices/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { incompatibleNaturesOfServices: {} }, metadata: {} };
          const expectedState = {
            lookups: { incompatibleNaturesOfServices: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the incompatible natures of services!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.incompatibleNaturesOfServices and metadata when fetchIncompatibleNaturesOfServices.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchIncompatibleNaturesOfServices/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { incompatibleNaturesOfServices: {} }, metadata: {} };
          const expectedState = {
            lookups: { incompatibleNaturesOfServices: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the incompatible natures of services!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchIndustryHierarchies', () => {
        it('updates lookups.industryHierarchies when fetchIndustryHierarchies.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchIndustryHierarchies/pending`;
          const action = { type: actionType };
          const state = { lookups: { industryHierarchies: {} } };
          const expectedState = {
            lookups: { industryHierarchies: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.industryHierarchies when fetchIndustryHierarchies.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchIndustryHierarchies/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { industryHierarchies: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { industryHierarchies: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.industryHierarchies and metadata when fetchIndustryHierarchies.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchIndustryHierarchies/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { industryHierarchies: {} }, metadata: {} };
          const expectedState = {
            lookups: { industryHierarchies: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the industry hierarchies!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.industryHierarchies and metadata when fetchIndustryHierarchies.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchIndustryHierarchies/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { industryHierarchies: {} }, metadata: {} };
          const expectedState = {
            lookups: { industryHierarchies: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the industry hierarchies!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchInternationalHeadquarterCountries', () => {
        it('updates lookups.internationalHeadquarterCountries when fetchInternationalHeadquarterCountries.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchInternationalHeadquarterCountries/pending`;
          const action = { type: actionType };
          const state = { lookups: { internationalHeadquarterCountries: {} } };
          const expectedState = {
            lookups: { internationalHeadquarterCountries: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.internationalHeadquarterCountries when fetchInternationalHeadquarterCountries.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchInternationalHeadquarterCountries/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { internationalHeadquarterCountries: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { internationalHeadquarterCountries: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.internationalHeadquarterCountries and metadata when fetchInternationalHeadquarterCountries.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchInternationalHeadquarterCountries/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { internationalHeadquarterCountries: {} }, metadata: {} };
          const expectedState = {
            lookups: { internationalHeadquarterCountries: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: {
                ...payload,
                friendlyMessage: 'An error occurred fetching the international headquarter countries!'
              }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.internationalHeadquarterCountries and metadata when fetchInternationalHeadquarterCountries.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchInternationalHeadquarterCountries/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { internationalHeadquarterCountries: {} }, metadata: {} };
          const expectedState = {
            lookups: { internationalHeadquarterCountries: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: {
                ...error,
                friendlyMessage: 'An error occurred fetching the international headquarter countries!'
              }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchJobCategoryRoles', () => {
        it('updates lookups.jobCategoryRoles when fetchJobCategoryRoles.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchJobCategoryRoles/pending`;
          const action = { type: actionType };
          const state = { lookups: { jobCategoryRoles: {} } };
          const expectedState = {
            lookups: { jobCategoryRoles: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.jobCategoryRoles when fetchJobCategoryRoles.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchJobCategoryRoles/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { jobCategoryRoles: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { jobCategoryRoles: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.jobCategoryRoles and metadata when fetchJobCategoryRoles.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchJobCategoryRoles/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { jobCategoryRoles: {} }, metadata: {} };
          const expectedState = {
            lookups: { jobCategoryRoles: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the job category roles!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.jobCategoryRoles and metadata when fetchJobCategoryRoles.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchJobCategoryRoles/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { jobCategoryRoles: {} }, metadata: {} };
          const expectedState = {
            lookups: { jobCategoryRoles: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the job category roles!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchJobHierarchies', () => {
        it('updates lookups.jobHierarchies when fetchJobHierarchies.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchJobHierarchies/pending`;
          const action = { type: actionType };
          const state = { lookups: { jobHierarchies: {} } };
          const expectedState = {
            lookups: { jobHierarchies: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.jobHierarchies when fetchJobHierarchies.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchJobHierarchies/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { jobHierarchies: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { jobHierarchies: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.jobHierarchies and metadata when fetchJobHierarchies.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchJobHierarchies/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { jobHierarchies: {} }, metadata: {} };
          const expectedState = {
            lookups: { jobHierarchies: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the job hierarchies!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.jobHierarchies and metadata when fetchJobHierarchies.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchJobHierarchies/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { jobHierarchies: {} }, metadata: {} };
          const expectedState = {
            lookups: { jobHierarchies: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the job hierarchies!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchJobRoles', () => {
        it('updates lookups.jobRoles when fetchJobRoles.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchJobRoles/pending`;
          const action = { type: actionType };
          const state = { lookups: { jobRoles: {} } };
          const expectedState = {
            lookups: { jobRoles: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.jobRoles when fetchJobRoles.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchJobRoles/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { jobRoles: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { jobRoles: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.jobRoles and metadata when fetchJobRoles.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchJobRoles/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { jobRoles: {} }, metadata: {} };
          const expectedState = {
            lookups: { jobRoles: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the job roles!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.jobRoles and metadata when fetchJobRoles.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchJobRoles/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { jobRoles: {} }, metadata: {} };
          const expectedState = {
            lookups: { jobRoles: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the job roles!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchMarketSectors', () => {
        it('updates lookups.marketSectors when fetchMarketSectors.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchMarketSectors/pending`;
          const action = { type: actionType };
          const state = { lookups: { marketSectors: {} } };
          const expectedState = {
            lookups: { marketSectors: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.marketSectors when fetchMarketSectors.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchMarketSectors/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { marketSectors: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { marketSectors: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.marketSectors and metadata when fetchMarketSectors.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchMarketSectors/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { marketSectors: {} }, metadata: {} };
          const expectedState = {
            lookups: { marketSectors: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the market sectors!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.marketSectors and metadata when fetchMarketSectors.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchMarketSectors/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { marketSectors: {} }, metadata: {} };
          const expectedState = {
            lookups: { marketSectors: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the market sectors!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchMonths', () => {
        it('updates lookups.months when fetchMonths.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchMonths/pending`;
          const action = { type: actionType };
          const state = { lookups: { months: {} } };
          const expectedState = {
            lookups: { months: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.months when fetchMonths.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchMonths/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { months: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { months: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.months and metadata when fetchMonths.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchMonths/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { months: {} }, metadata: {} };
          const expectedState = {
            lookups: { months: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the months!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.months and metadata when fetchMonths.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchMonths/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { months: {} }, metadata: {} };
          const expectedState = {
            lookups: { months: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the months!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchNatureOfServiceJobHierarchyMaps', () => {
        it('updates lookups.natureOfServiceJobHierarchyMaps when fetchNatureOfServiceJobHierarchyMaps.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchNatureOfServiceJobHierarchyMaps/pending`;
          const action = { type: actionType };
          const state = { lookups: { natureOfServiceJobHierarchyMaps: {} } };
          const expectedState = {
            lookups: { natureOfServiceJobHierarchyMaps: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.natureOfServiceJobHierarchyMaps when fetchNatureOfServiceJobHierarchyMaps.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchNatureOfServiceJobHierarchyMaps/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { natureOfServiceJobHierarchyMaps: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { natureOfServiceJobHierarchyMaps: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.natureOfServiceJobHierarchyMaps and metadata when fetchNatureOfServiceJobHierarchyMaps.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchNatureOfServiceJobHierarchyMaps/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { natureOfServiceJobHierarchyMaps: {} }, metadata: {} };
          const expectedState = {
            lookups: { natureOfServiceJobHierarchyMaps: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: {
                ...payload,
                friendlyMessage: 'An error occurred fetching the nature of service / job hierarchy maps!'
              }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.natureOfServiceJobHierarchyMaps and metadata when fetchNatureOfServiceJobHierarchyMaps.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchNatureOfServiceJobHierarchyMaps/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { natureOfServiceJobHierarchyMaps: {} }, metadata: {} };
          const expectedState = {
            lookups: { natureOfServiceJobHierarchyMaps: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: {
                ...error,
                friendlyMessage: 'An error occurred fetching the nature of service / job hierarchy maps!'
              }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchNaturesOfServices', () => {
        it('updates lookups.naturesOfServices when fetchNaturesOfServices.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchNaturesOfServices/pending`;
          const action = { type: actionType };
          const state = { lookups: { naturesOfServices: {} } };
          const expectedState = {
            lookups: { naturesOfServices: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.naturesOfServices when fetchNaturesOfServices.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchNaturesOfServices/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { naturesOfServices: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { naturesOfServices: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.naturesOfServices and metadata when fetchNaturesOfServices.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchNaturesOfServices/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { naturesOfServices: {} }, metadata: {} };
          const expectedState = {
            lookups: { naturesOfServices: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the natures of services!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.naturesOfServices and metadata when fetchNaturesOfServices.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchNaturesOfServices/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { naturesOfServices: {} }, metadata: {} };
          const expectedState = {
            lookups: { naturesOfServices: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the natures of services!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchOwnershipTypes', () => {
        it('updates lookups.ownershipTypes when fetchOwnershipTypes.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchOwnershipTypes/pending`;
          const action = { type: actionType };
          const state = { lookups: { ownershipTypes: {} } };
          const expectedState = {
            lookups: { ownershipTypes: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.ownershipTypes when fetchOwnershipTypes.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchOwnershipTypes/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { ownershipTypes: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { ownershipTypes: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.ownershipTypes and metadata when fetchOwnershipTypes.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchOwnershipTypes/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { ownershipTypes: {} }, metadata: {} };
          const expectedState = {
            lookups: { ownershipTypes: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the ownership types!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.ownershipTypes and metadata when fetchOwnershipTypes.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchOwnershipTypes/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { ownershipTypes: {} }, metadata: {} };
          const expectedState = {
            lookups: { ownershipTypes: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the ownership types!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchRegionHierarchies', () => {
        it('updates lookups.regionHierarchies when fetchRegionHierarchies.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchRegionHierarchies/pending`;
          const action = { type: actionType };
          const state = { lookups: { regionHierarchies: {} } };
          const expectedState = {
            lookups: { regionHierarchies: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.regionHierarchies when fetchRegionHierarchies.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchRegionHierarchies/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { regionHierarchies: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { regionHierarchies: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.regionHierarchies and metadata when fetchRegionHierarchies.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchRegionHierarchies/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { regionHierarchies: {} }, metadata: {} };
          const expectedState = {
            lookups: { regionHierarchies: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the region hierarchies!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.regionHierarchies and metadata when fetchRegionHierarchies.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchRegionHierarchies/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { regionHierarchies: {} }, metadata: {} };
          const expectedState = {
            lookups: { regionHierarchies: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the region hierarchies!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchSubjectToSecOrGaoRules', () => {
        it('updates lookups.subjectToSecOrGaoRules when fetchSubjectToSecOrGaoRules.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchSubjectToSecOrGaoRules/pending`;
          const action = { type: actionType };
          const state = { lookups: { subjectToSecOrGaoRules: {} } };
          const expectedState = {
            lookups: { subjectToSecOrGaoRules: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.subjectToSecOrGaoRules when fetchSubjectToSecOrGaoRules.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchSubjectToSecOrGaoRules/fulfilled`;
          const payload = [{ id: faker.datatype.number(), displayName: faker.datatype.string() }];
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { subjectToSecOrGaoRules: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { subjectToSecOrGaoRules: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.subjectToSecOrGaoRules and metadata when fetchSubjectToSecOrGaoRules.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchSubjectToSecOrGaoRules/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { subjectToSecOrGaoRules: {} }, metadata: {} };
          const expectedState = {
            lookups: { subjectToSecOrGaoRules: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the subjectToSecOrGaoRules!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.subjectToSecOrGaoRules and metadata when fetchSubjectToSecOrGaoRules.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchSubjectToSecOrGaoRules/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { subjectToSecOrGaoRules: {} }, metadata: {} };
          const expectedState = {
            lookups: { subjectToSecOrGaoRules: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the subjectToSecOrGaoRules!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchSuffixes', () => {
        it('updates lookups.suffixes when fetchSuffixes.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchSuffixes/pending`;
          const action = { type: actionType };
          const state = { lookups: { suffixes: {} } };
          const expectedState = {
            lookups: { suffixes: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.suffixes when fetchSuffixes.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchSuffixes/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { suffixes: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { suffixes: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.suffixes and metadata when fetchSuffixes.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchSuffixes/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { suffixes: {} }, metadata: {} };
          const expectedState = {
            lookups: { suffixes: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the suffixes!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.suffixes and metadata when fetchSuffixes.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchSuffixes/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { suffixes: {} }, metadata: {} };
          const expectedState = {
            lookups: { suffixes: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the suffixes!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchTaxTypes', () => {
        it('updates lookups.taxTypes when fetchTaxTypes.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchTaxTypes/pending`;
          const action = { type: actionType };
          const state = { lookups: { taxTypes: {} } };
          const expectedState = {
            lookups: { taxTypes: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.taxTypes when fetchTaxTypes.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchTaxTypes/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { taxTypes: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { taxTypes: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.taxTypes and metadata when fetchTaxTypes.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchTaxTypes/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { taxTypes: {} }, metadata: {} };
          const expectedState = {
            lookups: { taxTypes: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the tax types!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.taxTypes and metadata when fetchTaxTypes.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchTaxTypes/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { taxTypes: {} }, metadata: {} };
          const expectedState = {
            lookups: { taxTypes: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the tax types!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchWorkflowSteps', () => {
        it('updates lookups.workflowSteps when fetchWorkflowSteps.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchWorkflowSteps/pending`;
          const action = { type: actionType };
          const state = { lookups: { workflowSteps: {} } };
          const expectedState = {
            lookups: { workflowSteps: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.workflowSteps when fetchWorkflowSteps.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchWorkflowSteps/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = { lookups: { workflowSteps: {} }, metadata: { loadingTasksCompleted } };
          const expectedState = {
            lookups: { workflowSteps: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.workflowSteps and metadata when fetchWorkflowSteps.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchWorkflowSteps/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { workflowSteps: {} }, metadata: {} };
          const expectedState = {
            lookups: { workflowSteps: { isLoading: false, hasError: true, error: payload } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the workflow steps!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.workflowSteps and metadata when fetchWorkflowSteps.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchWorkflowSteps/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { workflowSteps: {} }, metadata: {} };
          const expectedState = {
            lookups: { workflowSteps: { isLoading: false, hasError: true, error } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the workflow steps!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('searchAllowablePartnerRoleAssignments', () => {
        it(
          'updates allowable partner role assignments search results (lookupName) in the correct view ' +
            'when searchAllowablePartnerRoleAssignments.pending is invoked',
          () => {
            // * ARRANGE
            const actionType = `${SLICE_NAME}/lookups/searchAllowablePartnerRoleAssignments/pending`;
            const viewId = faker.random.alphaNumeric(10);
            const lookupName = faker.random.alphaNumeric(10);
            const action = { type: actionType, meta: { arg: { viewId, lookupName } } };
            const state = { views: { [viewId]: { lookups: { [lookupName]: {} } } } };
            const expectedState = {
              views: {
                [viewId]: { lookups: { [lookupName]: { data: [], isLoading: true, hasError: false, error: null } } }
              }
            };

            // * ACT
            const actualState = newEngagementScreenReducer(state, action);

            // * ASSERT
            expect(actualState).toEqual(expectedState);
          }
        );

        it(
          'updates allowable partner role assignments search results (lookupName) in the correct view ' +
            'when searchAllowablePartnerRoleAssignments.fulfilled is invoked',
          () => {
            // * ARRANGE
            const actionType = `${SLICE_NAME}/lookups/searchAllowablePartnerRoleAssignments/fulfilled`;
            const viewId = faker.random.alphaNumeric(10);
            const lookupName = faker.random.alphaNumeric(10);
            const existingAllowablePartnerRoleAssignmentId = faker.datatype.number();
            const allowablePartnerRoleAssignmentsInLookups = [{ id: existingAllowablePartnerRoleAssignmentId }];
            const itemCount = faker.datatype.number({ min: 10, max: 20 });
            const allowablePartnerRoleAssignments = [...Array(itemCount).keys()].map((_, ix) => ({
              id: faker.datatype.number()
            }));

            allowablePartnerRoleAssignments.push({ id: existingAllowablePartnerRoleAssignmentId });

            const payload = allowablePartnerRoleAssignments;
            const action = { type: actionType, meta: { arg: { viewId, lookupName } }, payload };
            const state = {
              views: {
                [viewId]: {
                  lookups: {
                    [lookupName]: { data: null, isLoading: null },
                    allowablePartnerRoleAssignments: allowablePartnerRoleAssignmentsInLookups
                  }
                }
              }
            };

            const expectedAllowablePartnerRoleAssignments = [
              ...allowablePartnerRoleAssignmentsInLookups,
              ...allowablePartnerRoleAssignments.filter((o) => o.id !== existingAllowablePartnerRoleAssignmentId)
            ];

            const expectedState = {
              views: {
                [viewId]: {
                  lookups: {
                    [lookupName]: { data: payload, isLoading: false },
                    allowablePartnerRoleAssignments: expectedAllowablePartnerRoleAssignments
                  }
                }
              }
            };

            // * ACT
            const actualState = newEngagementScreenReducer(state, action);

            // * ASSERT
            expect(actualState).toEqual(expectedState);
          }
        );

        it(
          'updates allowable partner role assignments search results (lookupName) and metadata ' +
            'when searchAllowablePartnerRoleAssignments.rejected is invoked and action.payload has a value',
          () => {
            // * ARRANGE
            const actionType = `${SLICE_NAME}/lookups/searchAllowablePartnerRoleAssignments/rejected`;
            const viewId = faker.random.alphaNumeric(10);
            const lookupName = faker.random.alphaNumeric(10);
            const payload = { fakerProperty: faker.random.alphaNumeric(10) };
            const error = { fakerProperty: faker.random.alphaNumeric(10) };
            const action = { type: actionType, meta: { arg: { viewId, lookupName } }, payload, error };
            const state = {
              views: { [viewId]: { lookups: { [lookupName]: { isLoading: null, hasError: null, error: null } } } },
              metadata: {}
            };
            const expectedState = {
              views: {
                [viewId]: { lookups: { [lookupName]: { isLoading: false, hasError: true, error: { ...payload } } } }
              },
              metadata: {
                hasError: true,
                error: {
                  ...payload,
                  friendlyMessage: 'An error occurred searching for partners (allowable role assignments)!'
                }
              }
            };

            // * ACT
            const actualState = newEngagementScreenReducer(state, action);

            // * ASSERT
            expect(actualState).toEqual(expectedState);
          }
        );

        it(
          'updates allowable partner role assignments search results (lookupName) and metadata ' +
            'when searchAllowablePartnerRoleAssignments.rejected is invoked and action.payload has no value',
          () => {
            // * ARRANGE
            const actionType = `${SLICE_NAME}/lookups/searchAllowablePartnerRoleAssignments/rejected`;
            const viewId = faker.random.alphaNumeric(10);
            const lookupName = faker.random.alphaNumeric(10);
            const error = { fakerProperty: faker.random.alphaNumeric(10) };
            const action = { type: actionType, meta: { arg: { viewId, lookupName } }, error };
            const state = {
              views: { [viewId]: { lookups: { [lookupName]: { isLoading: null, hasError: null, error: null } } } },
              metadata: {}
            };
            const expectedState = {
              views: {
                [viewId]: { lookups: { [lookupName]: { isLoading: false, hasError: true, error: { ...error } } } }
              },
              metadata: {
                hasError: true,
                error: {
                  ...error,
                  friendlyMessage: 'An error occurred searching for partners (allowable role assignments)!'
                }
              }
            };

            // * ACT
            const actualState = newEngagementScreenReducer(state, action);

            // * ASSERT
            expect(actualState).toEqual(expectedState);
          }
        );
      });

      describe('searchClients', () => {
        it('updates lookups.clients in the correct view when searchClients.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/searchClients/pending`;
          const viewId = faker.random.alphaNumeric(10);
          const action = { type: actionType, meta: { arg: { viewId } } };
          const state = { views: { [viewId]: { lookups: { clients: {} } } } };
          const expectedState = {
            views: { [viewId]: { lookups: { clients: { data: [], isLoading: true, hasError: false, error: null } } } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.clients in the correct view when searchClients.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/searchClients/fulfilled`;
          const viewId = faker.random.alphaNumeric(10);
          const payload = faker.datatype.array();
          const action = { type: actionType, meta: { arg: { viewId } }, payload };
          const state = { views: { [viewId]: { lookups: { clients: {} } } } };
          const expectedState = { views: { [viewId]: { lookups: { clients: { data: payload, isLoading: false } } } } };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.clients in the correct view and metadata when searchClients.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/searchClients/rejected`;
          const viewId = faker.random.alphaNumeric(10);
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, meta: { arg: { viewId } }, payload, error };
          const state = { views: { [viewId]: { lookups: { clients: {} } } }, metadata: {} };
          const expectedState = {
            views: { [viewId]: { lookups: { clients: { isLoading: false, hasError: true, error: { ...payload } } } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred searching for clients!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.clients in the correct view and metadata when searchClients.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/searchClients/rejected`;
          const viewId = faker.random.alphaNumeric(10);
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, meta: { arg: { viewId } }, error };
          const state = { views: { [viewId]: { lookups: { clients: {} } } }, metadata: {} };
          const expectedState = {
            views: { [viewId]: { lookups: { clients: { isLoading: false, hasError: true, error: { ...error } } } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred searching for clients!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('searchStaff', () => {
        it('updates staff search results (lookupName) in the correct view when searchStaff.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/searchStaff/pending`;
          const viewId = faker.random.alphaNumeric(10);
          const lookupName = faker.random.alphaNumeric(10);
          const action = { type: actionType, meta: { arg: { viewId, lookupName } } };
          const state = { views: { [viewId]: { lookups: { [lookupName]: {} } } } };
          const expectedState = {
            views: {
              [viewId]: { lookups: { [lookupName]: { data: [], isLoading: true, hasError: false, error: null } } }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates staff search results (lookupName) in the correct view when searchStaff.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/searchStaff/fulfilled`;
          const viewId = faker.random.alphaNumeric(10);
          const lookupName = faker.random.alphaNumeric(10);
          const payload = faker.datatype.array();
          const action = { type: actionType, meta: { arg: { viewId, lookupName } }, payload };
          const state = { views: { [viewId]: { lookups: { [lookupName]: { data: null, isLoading: null } } } } };
          const expectedState = {
            views: { [viewId]: { lookups: { [lookupName]: { data: payload, isLoading: false } } } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates staff search results (lookupName) and metadata when searchStaff.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/searchStaff/rejected`;
          const viewId = faker.random.alphaNumeric(10);
          const lookupName = faker.random.alphaNumeric(10);
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, meta: { arg: { viewId, lookupName } }, payload, error };
          const state = {
            views: { [viewId]: { lookups: { [lookupName]: { isLoading: null, hasError: null, error: null } } } },
            metadata: {}
          };
          const expectedState = {
            views: {
              [viewId]: { lookups: { [lookupName]: { isLoading: false, hasError: true, error: { ...payload } } } }
            },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred searching for staff!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates staff search results (lookupName) and metadata when searchStaff.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/searchStaff/rejected`;
          const viewId = faker.random.alphaNumeric(10);
          const lookupName = faker.random.alphaNumeric(10);
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, meta: { arg: { viewId, lookupName } }, error };
          const state = {
            views: { [viewId]: { lookups: { [lookupName]: { isLoading: null, hasError: null, error: null } } } },
            metadata: {}
          };
          const expectedState = {
            views: {
              [viewId]: { lookups: { [lookupName]: { isLoading: false, hasError: true, error: { ...error } } } }
            },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred searching for staff!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });
    });

    describe('select client', () => {
      describe('fetchExistingClient', () => {
        it('updates the metadata in the selectClient view when fetchExistingClient.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/selectClient/fetchExistingClient/pending`;
          const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
          const action = { type: actionType };
          const state = { views: { [viewId]: { metadata: {} } } };
          const expectedState = {
            views: {
              [viewId]: {
                metadata: {
                  isLoading: true,
                  hasError: false,
                  error: null
                }
              }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the formData and metadata in the selectClient view when fetchExistingClient.fulfilled is invoked and no exception occurs', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/selectClient/fetchExistingClient/fulfilled`;
          const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
          const client = {
            taxTypeId: faker.datatype.number(),
            industryHierarchyId: faker.datatype.number(),
            taxIdentificationNumberMasked: faker.random.alphaNumeric(10),
            marketSectorId: faker.datatype.number(),
            relationshipPartnerStaffNumber: faker.datatype.number()
          };
          const relationshipPartner = { preferredFullName: faker.random.alphaNumeric(10) };
          const payload = { client, relationshipPartner };
          const action = { type: actionType, payload };

          // expected values to be found
          const expectedTaxType = { id: client.taxTypeId, countryHierarchyReferenceId: faker.random.alphaNumeric(10) };
          const expectedIndustryHierarchy = {
            id: client.industryHierarchyId,
            displayName: faker.random.alphaNumeric(10),
            verticalName: faker.random.alphaNumeric(10)
          };

          // lookups
          const taxTypes = [...faker.datatype.array(), expectedTaxType];
          const industryHierarchies = [...faker.datatype.array(), expectedIndustryHierarchy];

          const state = {
            lookups: { taxTypes: { data: taxTypes }, industryHierarchies: { data: industryHierarchies } },
            views: { [viewId]: { metadata: {}, formData: {} } }
          };
          const expectedState = {
            lookups: { taxTypes: { data: taxTypes }, industryHierarchies: { data: industryHierarchies } },
            views: {
              [viewId]: {
                metadata: { isLoading: false },
                formData: {
                  tinCountry: expectedTaxType.countryHierarchyReferenceId,
                  taxTypeId: client.taxTypeId,
                  taxPayerIdentificationNumberMasked: client.taxIdentificationNumberMasked,
                  industryName: expectedIndustryHierarchy.displayName,
                  verticalName: expectedIndustryHierarchy.verticalName,
                  industryHierarchyId: client.industryHierarchyId,
                  marketSectorId: client.marketSectorId,
                  relationshipPartnerStaffNumber: client.relationshipPartnerStaffId,
                  relationshipPartnerDisplayName: relationshipPartner.preferredFullName
                }
              }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the slice metadata when fetchExistingClient.fulfilled is invoked and an exception occurs setting the formData values', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/selectClient/fetchExistingClient/fulfilled`;
          const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
          const client = { taxTypeId: faker.datatype.number(), industryHierarchyId: faker.datatype.number() };
          const relationshipPartner = {};
          const payload = { client, relationshipPartner };
          const action = { type: actionType, payload };

          // lookups
          const taxTypes = [...faker.datatype.array()];
          const industryHierarchies = [...faker.datatype.array()];

          const state = {
            lookups: { taxTypes: { data: taxTypes }, industryHierarchies: { data: industryHierarchies } },
            views: { [viewId]: { metadata: {}, formData: {} } },
            metadata: {}
          };
          const expectedState = {
            lookups: { taxTypes: { data: taxTypes }, industryHierarchies: { data: industryHierarchies } },
            views: { [viewId]: { metadata: { isLoading: false }, formData: {} } },
            metadata: {
              hasError: true,
              error: {
                message: expect.any(String),
                friendlyMessage: 'An error occurred loading the existing client details!'
              }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the metadata in the selectClient view and slice metadata when fetchExistingClient.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/selectClient/fetchExistingClient/rejected`;
          const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { views: { [viewId]: { metadata: {} } }, metadata: {} };
          const expectedState = {
            views: { [viewId]: { metadata: { isLoading: false, hasError: true, error: { ...payload } } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred loading the existing client details!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the metadata in the selectClient view and slice metadata when fetchExistingClient.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/selectClient/fetchExistingClient/rejected`;
          const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { views: { [viewId]: { metadata: {} } }, metadata: {} };
          const expectedState = {
            views: { [viewId]: { metadata: { isLoading: false, hasError: true, error: { ...error } } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred loading the existing client details!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });
    });

    describe('natures of service (add/remove jobs)', () => {
      describe('createJobInfoResponse', () => {
        it('updates the slice metadata when createJobInfoResponse.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/createJobInfoResponse/pending`;
          const action = { type: actionType };
          const state = { metadata: {} };
          const expectedState = { metadata: { isSaving: true, savingMessage: 'Adding the new job...' } };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('creates a new jobSetupView and updates slice metadata when createJobInfoResponse.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/createJobInfoResponse/fulfilled`;
          const jobHierarchyId = faker.datatype.number();
          const jobHierarchy = { id: jobHierarchyId, level4Name: faker.random.alpha(10) };
          const jobInfoResponse = {
            id: faker.datatype.number(),
            etag: faker.random.alpha(10),
            natureOfServiceId: faker.datatype.number(),
            jobHierarchyId,
            billToClientNumber: faker.datatype.number(),
            jobName: faker.random.alpha(10),
            jobNameYear: faker.datatype.number(),
            forPeriodEndedDate: faker.random.alpha(10),
            additionalCustomCharacters: faker.random.alpha(10),
            clientEntityId: faker.datatype.number(),
            entityLegalName: faker.random.alpha(10),
            entityShortName: faker.random.alpha(10),
            expectedFees: faker.random.alpha(10),
            expectedRealization: faker.random.alpha(10),
            expectedJobBudgetHours: faker.random.alpha(10),
            isApprovingEngagementPartner: faker.random.alpha(10),
            descriptionOfNonAttestServices: faker.random.alpha(10),
            descriptionOfOtherAttestationEngagement: faker.random.alpha(10),
            isBusinessCoveringTheCost: faker.datatype.boolean(),
            areAnySpecialReturnsNeeded: faker.datatype.boolean(),
            hasMoreThanThreeForms5472: faker.datatype.boolean(),
            hasMoreThanFiveBankAccountsForFinCen114: faker.datatype.boolean(),
            willReturnsBePreparedForFivePlusStateLocal: faker.datatype.boolean(),
            billingScheduleId: faker.datatype.number(),
            newBillingScheduleId: faker.datatype.number(),
            billToClientDisplayName: faker.random.alpha(10),
            jobRoleId: null,
            extraPropertyNotToBeMapped: faker.random.alpha(10)
          };

          const payload = jobInfoResponse;
          const action = { type: actionType, payload };

          const state = {
            views: {},
            lookups: { jobHierarchies: { data: [jobHierarchy] } },
            metadata: {}
          };

          const viewId = `${JOB_SETUP_VIEW_PREFIX}${jobInfoResponse.id}`;
          const expectedJobSetupView = {
            sections: {
              jobSetup: {
                id: 'job-setup-section',
                label: 'Job Setup',
                title: 'Job Setup',
                status: VIEW_STATUSES.normal
              },

              jobRoles: {
                id: 'job-roles-section',
                label: 'Job Roles',
                title: 'Job Roles',
                status: VIEW_STATUSES.normal
              },

              billingSchedule: {
                id: 'billing-schedule-section',
                label: 'Billing Schedule',
                title: 'Billing Schedule',
                status: VIEW_STATUSES.normal
              }
            },

            formData: {
              ...jobInfoResponse,
              jobTypeDisplayName: jobHierarchy.level4Name,
              jobRoleId: '',
              jobRoleStaffId: '',
              jobRoleAllowablePartnerRoleAssignmentId: '',
              jobRoleStaffDisplayName: '',
              extraPropertyNotToBeMapped: undefined
            },

            lookups: {
              clients: {
                data: [],
                isLoading: false,
                hasError: false,
                error: null
              },

              jobRoles: {
                data: [],
                isLoading: false,
                hasError: false,
                error: null
              },

              jobRoleStaff: {
                data: [],
                isLoading: false,
                hasError: false,
                error: null
              },

              allowablePartnerRoleAssignments: []
            },

            metadata: {
              isLoading: false,
              hasError: false,
              error: null
            }
          };
          const expectedState = {
            views: { [viewId]: expectedJobSetupView },
            lookups: { jobHierarchies: { data: [jobHierarchy] } },
            metadata: {
              isSaving: false,
              savingMessage: '',
              toastInfo: { type: 'success', message: 'Your job has been added!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the slice metadata when createJobInfoResponse.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/createJobInfoResponse/rejected`;
          const payload = { message: faker.random.alphaNumeric(10), traceId: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };

          const friendlyMessage = 'An error occurred adding the job.';
          const errorMessage = `error: ${payload.message}`;
          const traceIdMessage = `trace-id: ${payload.traceId}`;
          const expectedMessage = `${friendlyMessage} ${errorMessage} ${traceIdMessage}`;

          const action = { type: actionType, payload, error };
          const state = { metadata: {} };
          const expectedState = {
            metadata: {
              isSaving: false,
              savingMessage: '',
              toastInfo: { type: 'error', message: expectedMessage }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the slice metadata when createJobInfoResponse.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/createJobInfoResponse/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };

          const friendlyMessage = 'An error occurred adding the job.';
          const errorMessage = `error: ${error.message}`;
          const traceIdMessage = '';
          const expectedMessage = `${friendlyMessage} ${errorMessage} ${traceIdMessage}`;

          const action = { type: actionType, error };
          const state = { metadata: {} };
          const expectedState = {
            metadata: {
              isSaving: false,
              savingMessage: '',
              toastInfo: { type: 'error', message: expectedMessage }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('deleteJobInfoResponse', () => {
        it('updates the slice metadata when deleteJobInfoResponse.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/deleteJobInfoResponse/pending`;
          const action = { type: actionType };
          const state = { metadata: {} };
          const expectedState = { metadata: { isSaving: true, savingMessage: 'Deleting the job...' } };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('removes the deleted job view and updates the slice metadata when deleteJobInfoResponse.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/deleteJobInfoResponse/fulfilled`;
          const viewId = faker.datatype.number();
          const meta = { arg: { viewId } };
          const action = { type: actionType, meta };
          const state = { views: { [viewId]: {} }, metadata: {} };
          const expectedState = {
            views: {},
            metadata: {
              isSaving: false,
              savingMessage: '',
              toastInfo: { type: 'success', message: 'The job has been deleted!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the jobSetup view and slice metadata when deleteJobInfoResponse.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/deleteJobInfoResponse/rejected`;
          const viewId = faker.datatype.number();
          const meta = { arg: { viewId } };
          const payload = { message: faker.random.alphaNumeric(10), traceId: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };

          const friendlyMessage = 'An error occurred deleting the job.';
          const errorMessage = `error: ${payload.message}`;
          const traceIdMessage = `trace-id: ${payload.traceId}`;
          const expectedMessage = `${friendlyMessage} ${errorMessage} ${traceIdMessage}`;

          const action = { type: actionType, meta, payload, error };
          const state = { views: { [viewId]: { metadata: {} } }, metadata: {} };
          const expectedState = {
            views: {
              [viewId]: {
                metadata: {
                  hasError: true,
                  error: { ...payload, friendlyMessage: 'There was an error deleting the job!' }
                }
              }
            },
            metadata: {
              isSaving: false,
              savingMessage: '',
              toastInfo: { type: 'error', message: expectedMessage }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the jobSetup view and slice metadata when deleteJobInfoResponse.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/deleteJobInfoResponse/rejected`;
          const viewId = faker.datatype.number();
          const meta = { arg: { viewId } };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };

          const friendlyMessage = 'An error occurred deleting the job.';
          const errorMessage = `error: ${error.message}`;
          const traceIdMessage = '';
          const expectedMessage = `${friendlyMessage} ${errorMessage} ${traceIdMessage}`;

          const action = { type: actionType, meta, error };
          const state = { views: { [viewId]: { metadata: {} } }, metadata: {} };
          const expectedState = {
            views: {
              [viewId]: {
                metadata: {
                  hasError: true,
                  error: { ...error, friendlyMessage: 'There was an error deleting the job!' }
                }
              }
            },
            metadata: {
              isSaving: false,
              savingMessage: '',
              toastInfo: { type: 'error', message: expectedMessage }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });
    });

    describe('job Setup', () => {
      describe('createJobRole', () => {
        it('updates the slice metadata when createJobRole.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/createJobRole/pending`;
          const action = { type: actionType };
          const state = { metadata: {} };
          const expectedState = { metadata: { isSaving: true, savingMessage: 'Saving the job role...' } };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('adds the new job role to the correct view and updates the slice metadata when createJobRole.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/createJobRole/fulfilled`;
          const viewId = faker.datatype.number();
          const jobRoleId = faker.datatype.number();
          const meta = { arg: { viewId, jobRoleId } };
          const newJobRole = { id: jobRoleId };
          const action = { type: actionType, meta, payload: newJobRole };
          const state = {
            views: {
              [viewId]: {
                lookups: { jobRoles: { data: [] } },
                formData: { jobRoleId: null, jobRoleStaffId: null, jobRoleStaffDisplayName: null }
              }
            },
            metadata: {}
          };
          const expectedState = {
            views: {
              [viewId]: {
                lookups: { jobRoles: { data: [newJobRole] } },
                formData: { jobRoleId: '', jobRoleStaffId: '', jobRoleStaffDisplayName: '' }
              }
            },
            metadata: {
              isSaving: false,
              savingMessage: '',
              toastInfo: { type: 'success', message: 'The job role has been created!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the job roles in the jobSetup view and slice metadata when createJobRole.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/createJobRole/rejected`;
          const viewId = faker.datatype.number();
          const meta = { arg: { viewId } };
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, meta, payload, error };
          const state = { views: { [viewId]: { lookups: { jobRoles: {} } } }, metadata: {} };
          const expectedState = {
            views: {
              [viewId]: {
                lookups: {
                  jobRoles: {
                    hasError: true,
                    error: { ...payload, friendlyMessage: 'There was an error creating the job role!' }
                  }
                }
              }
            },
            metadata: { isSaving: false, savingMessage: '' }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the job roles in the jobSetup view and slice metadata when createJobRole.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/createJobRole/rejected`;
          const viewId = faker.datatype.number();
          const meta = { arg: { viewId } };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, meta, error };
          const state = { views: { [viewId]: { lookups: { jobRoles: {} } } }, metadata: {} };
          const expectedState = {
            views: {
              [viewId]: {
                lookups: {
                  jobRoles: {
                    hasError: true,
                    error: { ...error, friendlyMessage: 'There was an error creating the job role!' }
                  }
                }
              }
            },
            metadata: { isSaving: false, savingMessage: '' }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('deleteJobRole', () => {
        it('updates the slice metadata when deleteJobRole.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/deleteJobRole/pending`;
          const action = { type: actionType };
          const state = { metadata: {} };
          const expectedState = { metadata: { isSaving: true, savingMessage: 'Deleting the job role...' } };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('removes the deleted job role and updates the slice metadata when deleteJobRole.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/deleteJobRole/fulfilled`;
          const viewId = faker.datatype.number();
          const jobRoleId = faker.datatype.number();
          const meta = { arg: { viewId, jobRoleId } };
          const action = { type: actionType, meta };
          const state = {
            views: {
              [viewId]: {
                lookups: { jobRoles: { data: [{ id: jobRoleId - 1 }, { id: jobRoleId }, { id: jobRoleId + 1 }] } }
              }
            },
            metadata: {}
          };
          const expectedState = {
            views: { [viewId]: { lookups: { jobRoles: { data: [{ id: jobRoleId - 1 }, { id: jobRoleId + 1 }] } } } },
            metadata: {
              isSaving: false,
              savingMessage: '',
              toastInfo: { type: 'success', message: 'The job role has been deleted!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the job roles in the jobSetup view and slice metadata when deleteJobRole.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/deleteJobRole/rejected`;
          const viewId = faker.datatype.number();
          const meta = { arg: { viewId } };
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, meta, payload, error };
          const state = { views: { [viewId]: { lookups: { jobRoles: {} } } }, metadata: {} };
          const expectedState = {
            views: {
              [viewId]: {
                lookups: {
                  jobRoles: {
                    hasError: true,
                    error: { ...payload, friendlyMessage: 'There was an error deleting the job role!' }
                  }
                }
              }
            },
            metadata: { isSaving: false, savingMessage: '' }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the job roles in the jobSetup view and slice metadata when deleteJobRole.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/deleteJobRole/rejected`;
          const viewId = faker.datatype.number();
          const meta = { arg: { viewId } };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, meta, error };
          const state = { views: { [viewId]: { lookups: { jobRoles: {} } } }, metadata: {} };
          const expectedState = {
            views: {
              [viewId]: {
                lookups: {
                  jobRoles: {
                    hasError: true,
                    error: { ...error, friendlyMessage: 'There was an error deleting the job role!' }
                  }
                }
              }
            },
            metadata: { isSaving: false, savingMessage: '' }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });
    });

    describe('load new engagement instance data', () => {
      describe('fetchAttachmentInfoResponsesForNei', () => {
        it('updates lookups.attachmentInfoResponses when fetchAttachmentInfoResponsesForNei.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchAttachmentInfoResponsesForNei/pending`;
          const action = { type: actionType };
          const state = { lookups: { attachmentInfoResponses: {} } };
          const expectedState = {
            lookups: { attachmentInfoResponses: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.attachmentInfoResponses and metadata when fetchAttachmentInfoResponsesForNei.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchAttachmentInfoResponsesForNei/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const state = {
            lookups: { attachmentInfoResponses: {} },
            metadata: { loadingTasksCompleted: faker.datatype.number() }
          };
          const expectedState = {
            lookups: { attachmentInfoResponses: { data: payload, isLoading: false } },
            metadata: { loadingTasksCompleted: state.metadata.loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.attachmentInfoResponses and slice metadata when fetchAttachmentInfoResponsesForNei.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchAttachmentInfoResponsesForNei/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { attachmentInfoResponses: {} }, metadata: {} };
          const expectedState = {
            lookups: { attachmentInfoResponses: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred loading the attachment info responses!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.attachmentInfoResponses and slice metadata when fetchAttachmentInfoResponsesForNei.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/lookups/fetchAttachmentInfoResponsesForNei/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { attachmentInfoResponses: {} }, metadata: {} };
          const expectedState = {
            lookups: { attachmentInfoResponses: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred loading the attachment info responses!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchInitialSetupResponseForNei', () => {
        it('updates the metadata in the selectClient view when fetchInitialSetupResponseForNei.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchInitialSetupResponseForNei/pending`;
          const action = { type: actionType };
          const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
          const state = { views: { [viewId]: { metadata: {} } } };
          const expectedState = {
            views: { [viewId]: { metadata: { isLoading: true, hasError: false, error: null } } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the formData and metadata in the selectClient view when fetchInitialSetupResponseForNei.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchInitialSetupResponseForNei/fulfilled`;
          const initialSetupResponse = {
            id: faker.datatype.number(),
            etag: faker.random.alpha(10),
            crmSyncId: faker.random.alpha(10),
            crmGuid: faker.random.alpha(10),
            clientNumber: faker.datatype.number(),
            clientName: faker.random.alpha(10),
            industryHierarchyId: faker.datatype.number(),
            marketSectorId: faker.datatype.number(),
            taxTypeId: faker.datatype.number(),
            taxPayerIdentificationNumberMasked: faker.random.alpha(10),
            taxPayerIdentificationNumber: faker.random.alpha(10),
            relationshipPartnerStaffNumber: faker.datatype.number(),
            clientSearchTypeId: faker.datatype.number(),
            industryName: faker.random.alpha(10),
            verticalName: faker.random.alpha(10),
            tinCountry: faker.random.alpha(10),
            clientDisplayName: faker.random.alpha(10),
            relationshipPartnerDisplayName: faker.random.alpha(10),
            extraPropertyNotToBeMapped: faker.random.alpha(10)
          };
          const payload = initialSetupResponse;
          const action = { type: actionType, payload };

          const industryHierarchy = {
            id: initialSetupResponse.industryHierarchyId,
            displayName: faker.random.alpha(10),
            verticalName: faker.random.alpha(10)
          };
          const taxType = {
            id: initialSetupResponse.taxTypeId,
            countryHierarchyReferenceId: faker.random.alpha(10)
          };

          const state = {
            views: {
              [NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId]: {
                formData: {
                  id: null,
                  etag: null,
                  crmSyncId: null,
                  crmGuid: null,
                  clientNumber: null,
                  clientName: null,
                  industryHierarchyId: null,
                  marketSectorId: null,
                  taxTypeId: null,
                  taxPayerIdentificationNumberMasked: null,
                  taxPayerIdentificationNumber: null,
                  relationshipPartnerStaffNumber: null,
                  clientSearchTypeId: null,
                  industryName: null,
                  verticalName: null,
                  tinCountry: null,
                  clientDisplayName: null,
                  relationshipPartnerDisplayName: null
                }
              }
            },
            lookups: { industryHierarchies: { data: [industryHierarchy] }, taxTypes: { data: [taxType] } },
            metadata: { loadingTasksCompleted: faker.datatype.number() }
          };

          const expectedState = {
            views: {
              [NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId]: {
                formData: {
                  ...initialSetupResponse,
                  extraPropertyNotToBeMapped: undefined,
                  industryName: industryHierarchy.displayName,
                  verticalName: industryHierarchy.verticalName,
                  tinCountry: taxType.countryHierarchyReferenceId
                }
              }
            },
            lookups: { ...state.lookups },
            metadata: { loadingTasksCompleted: state.metadata.loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('sets a formData property to empty string if the isr property has no value when fetchInitialSetupResponseForNei.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchInitialSetupResponseForNei/fulfilled`;
          const initialSetupResponse = { id: faker.datatype.number(), propertyName: null };
          const payload = initialSetupResponse;
          const action = { type: actionType, payload };

          const industryHierarchy = {
            id: initialSetupResponse.industryHierarchyId,
            displayName: faker.random.alpha(10),
            verticalName: faker.random.alpha(10)
          };
          const taxType = {
            id: initialSetupResponse.taxTypeId,
            countryHierarchyReferenceId: faker.random.alpha(10)
          };

          const state = {
            views: {
              [NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId]: { formData: { id: null, propertyName: null } }
            },
            lookups: { industryHierarchies: { data: [industryHierarchy] }, taxTypes: { data: [taxType] } },
            metadata: { loadingTasksCompleted: faker.datatype.number() }
          };

          const expectedState = {
            views: {
              [NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId]: {
                formData: {
                  ...initialSetupResponse,
                  industryName: industryHierarchy.displayName,
                  verticalName: industryHierarchy.verticalName,
                  tinCountry: taxType.countryHierarchyReferenceId,
                  propertyName: ''
                }
              }
            },
            lookups: { ...state.lookups },
            metadata: { loadingTasksCompleted: state.metadata.loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the metadata in the selectClient view and slice metadata when fetchInitialSetupResponseForNei.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchInitialSetupResponseForNei/rejected`;
          const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { views: { [viewId]: { metadata: {} } }, metadata: {} };
          const expectedState = {
            views: { [viewId]: { metadata: { isLoading: false, hasError: true, error: { ...payload } } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred loading the initial setup response!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the metadata in the selectClient view and slice metadata when fetchInitialSetupResponseForNei.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchInitialSetupResponseForNei/rejected`;
          const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { views: { [viewId]: { metadata: {} } }, metadata: {} };
          const expectedState = {
            views: { [viewId]: { metadata: { isLoading: false, hasError: true, error: { ...error } } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred loading the initial setup response!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchJobInfoResponsesForNei', () => {
        it('does nothing when fetchJobInfoResponsesForNei.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchJobInfoResponsesForNei/pending`;
          const action = { type: actionType };
          const state = { lookups: { jobHierarchies: { data: [] } } };
          const expectedState = { lookups: { jobHierarchies: { data: [] } } };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the formData in each job setup view view when fetchJobInfoResponsesForNei.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchJobInfoResponsesForNei/fulfilled`;
          const itemCount = faker.datatype.number({ min: 1, max: 10 });
          const jobHierarchyId = faker.datatype.number();
          const jobHierarchy = { id: jobHierarchyId, level4Name: faker.random.alpha(10) };

          const stateJobInfoResponses = [...Array(itemCount).keys()].map((_, ix) => ({
            id: ix,
            etag: null,
            natureOfServiceId: null,
            jobHierarchyId: null,
            billToClientNumber: null,
            jobName: null,
            jobNameYear: null,
            forPeriodEndedDate: null,
            additionalCustomCharacters: null,
            clientEntityId: null,
            entityLegalName: null,
            expectedFees: null,
            expectedRealization: null,
            expectedJobBudgetHours: null,
            isApprovingEngagementPartner: null,
            descriptionOfNonAttestServices: null,
            descriptionOfOtherAttestationEngagement: null,
            isBusinessCoveringTheCost: null,
            areAnySpecialReturnsNeeded: null,
            hasMoreThanThreeForms5472: null,
            hasMoreThanFiveBankAccountsForFinCen114: null,
            willReturnsBePreparedForFivePlusStateLocal: null,
            billingScheduleId: null,
            newBillingScheduleId: null,
            billToClientDisplayName: null
          }));

          const payloadJobInfoResponses = [...Array(itemCount).keys()].map((_, ix) => ({
            id: ix,
            etag: faker.random.alpha(10),
            natureOfServiceId: faker.datatype.number(),
            jobHierarchyId,
            billToClientNumber: faker.datatype.number(),
            jobName: faker.random.alpha(10),
            jobNameYear: faker.datatype.number(),
            forPeriodEndedDate: faker.random.alpha(10),
            additionalCustomCharacters: faker.random.alpha(10),
            clientEntityId: faker.datatype.number(),
            entityLegalName: faker.random.alpha(10),
            expectedFees: faker.random.alpha(10),
            expectedRealization: faker.random.alpha(10),
            expectedJobBudgetHours: faker.random.alpha(10),
            isApprovingEngagementPartner: faker.random.alpha(10),
            descriptionOfNonAttestServices: faker.random.alpha(10),
            descriptionOfOtherAttestationEngagement: faker.random.alpha(10),
            isBusinessCoveringTheCost: faker.datatype.boolean(),
            areAnySpecialReturnsNeeded: faker.datatype.boolean(),
            hasMoreThanThreeForms5472: faker.datatype.boolean(),
            hasMoreThanFiveBankAccountsForFinCen114: faker.datatype.boolean(),
            willReturnsBePreparedForFivePlusStateLocal: faker.datatype.boolean(),
            billingScheduleId: faker.datatype.number(),
            newBillingScheduleId: faker.datatype.number(),
            billToClientDisplayName: faker.random.alpha(10),
            extraPropertyNotToBeMapped: faker.random.alpha(10)
          }));

          const payload = payloadJobInfoResponses;
          const action = { type: actionType, payload };

          const state = {
            views: {},
            lookups: { jobHierarchies: { data: [jobHierarchy] } },
            metadata: { loadingTasksCompleted: faker.datatype.number() }
          };

          stateJobInfoResponses.forEach((jir) => {
            const viewId = `${JOB_SETUP_VIEW_PREFIX}${jir.id}`;
            state.views[viewId] = { formData: { ...jir } };
          });

          const expectedState = {
            views: {},
            lookups: { jobHierarchies: { data: [jobHierarchy] } },
            metadata: { loadingTasksCompleted: state.metadata.loadingTasksCompleted + 1 }
          };

          payloadJobInfoResponses.forEach((jir) => {
            const viewId = `${JOB_SETUP_VIEW_PREFIX}${jir.id}`;
            expectedState.views[viewId] = {
              formData: { ...jir, jobTypeDisplayName: jobHierarchy.level4Name, extraPropertyNotToBeMapped: undefined }
            };
          });

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('sets a formData property to empty string if the jir property has no value when fetchJobInfoResponsesForNei.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchJobInfoResponsesForNei/fulfilled`;
          const itemCount = faker.datatype.number({ min: 1, max: 10 });

          const stateJobInfoResponses = [...Array(itemCount).keys()].map((_, ix) => ({
            id: ix,
            propertyName: null
          }));

          const payloadJobInfoResponses = [...Array(itemCount).keys()].map((_, ix) => ({
            id: ix,
            propertyName: null
          }));

          const payload = payloadJobInfoResponses;
          const action = { type: actionType, payload };

          const state = {
            views: {},
            metadata: { loadingTasksCompleted: faker.datatype.number() }
          };

          stateJobInfoResponses.forEach((jir) => {
            const viewId = `${JOB_SETUP_VIEW_PREFIX}${jir.id}`;
            state.views[viewId] = { formData: { ...jir } };
          });

          const expectedState = {
            views: {},
            metadata: { loadingTasksCompleted: state.metadata.loadingTasksCompleted + 1 }
          };

          payloadJobInfoResponses.forEach((jir) => {
            const viewId = `${JOB_SETUP_VIEW_PREFIX}${jir.id}`;
            expectedState.views[viewId] = {
              formData: { ...jir, propertyName: '' }
            };
          });

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the slice metadata when fetchJobInfoResponsesForNei.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchJobInfoResponsesForNei/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { metadata: {} };
          const expectedState = {
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred loading the job info response!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the slice metadata when fetchJobInfoResponsesForNei.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchJobInfoResponsesForNei/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { metadata: {} };
          const expectedState = {
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred loading the job info response!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchJobRolesForJobInfoResponse', () => {
        it('updates the job roles lookup in the jobSetup view when fetchJobRolesForJobInfoResponse.pending is invoked', () => {
          // * ARRANGE
          const jobInfoResponseId = faker.datatype.number();
          const actionType = `${SLICE_NAME}/neiData/fetchJobRolesForJobInfoResponse/pending`;
          const action = { type: actionType, meta: { arg: jobInfoResponseId } };
          const viewId = `${JOB_SETUP_VIEW_PREFIX}${jobInfoResponseId}`;
          const state = { views: { [viewId]: { lookups: { jobRoles: {} } } } };
          const expectedState = {
            views: { [viewId]: { lookups: { jobRoles: { isLoading: true, hasError: false, error: null } } } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the job roles lookup in the jobSetup view when fetchJobRolesForJobInfoResponse.fulfilled is invoked', () => {
          // * ARRANGE
          const jobInfoResponseId = faker.datatype.number();
          const jobRoles = faker.datatype.array();
          const actionType = `${SLICE_NAME}/neiData/fetchJobRolesForJobInfoResponse/fulfilled`;
          const action = { type: actionType, meta: { arg: jobInfoResponseId }, payload: jobRoles };
          const viewId = `${JOB_SETUP_VIEW_PREFIX}${jobInfoResponseId}`;
          const state = { views: { [viewId]: { lookups: { jobRoles: {} } } } };
          const expectedState = {
            views: { [viewId]: { lookups: { jobRoles: { isLoading: false, data: jobRoles } } } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the job roles lookup in the jobSetup view and slice metadata when fetchJobRolesForJobInfoResponse.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const jobInfoResponseId = faker.datatype.number();
          const actionType = `${SLICE_NAME}/neiData/fetchJobRolesForJobInfoResponse/rejected`;
          const viewId = `${JOB_SETUP_VIEW_PREFIX}${jobInfoResponseId}`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, meta: { arg: jobInfoResponseId }, payload, error };
          const state = { views: { [viewId]: { lookups: { jobRoles: {} } } }, metadata: {} };
          const expectedState = {
            views: { [viewId]: { lookups: { jobRoles: { isLoading: false, hasError: true, error: { ...payload } } } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred loading the roles for the job!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the job roles lookup in the jobSetup view and slice metadata when fetchJobRolesForJobInfoResponse.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const jobInfoResponseId = faker.datatype.number();
          const actionType = `${SLICE_NAME}/neiData/fetchJobRolesForJobInfoResponse/rejected`;
          const viewId = `${JOB_SETUP_VIEW_PREFIX}${jobInfoResponseId}`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, meta: { arg: jobInfoResponseId }, error };
          const state = { views: { [viewId]: { lookups: { jobRoles: {} } } }, metadata: {} };
          const expectedState = {
            views: { [viewId]: { lookups: { jobRoles: { isLoading: false, hasError: true, error: { ...error } } } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred loading the roles for the job!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchNewEngagementInstance', () => {
        it('updates the newEngagementInstance metadata when fetchNewEngagementInstance.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchNewEngagementInstance/pending`;
          const action = { type: actionType };
          const state = { newEngagementInstance: { metadata: {} } };
          const expectedState = {
            newEngagementInstance: { metadata: { isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('update the newEngagementInstance state data and metadata when fetchNewEngagementInstance.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchNewEngagementInstance/fulfilled`;

          const newEngagementInstance = {
            etag: faker.random.alpha(10),
            isCompleted: faker.random.alpha(10),
            isDeleted: faker.datatype.boolean(),
            isTerminated: faker.datatype.boolean(),
            isAttest: faker.datatype.boolean()
          };
          const payload = newEngagementInstance;
          const action = { type: actionType, payload };

          const state = { newEngagementInstance: {}, metadata: { loadingTasksCompleted: faker.datatype.number() } };

          const expectedState = {
            newEngagementInstance: { ...newEngagementInstance },

            metadata: { loadingTasksCompleted: state.metadata.loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the newEngagementInstance metadata and slice metadata when fetchNewEngagementInstance.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchNewEngagementInstance/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { newEngagementInstance: { metadata: {} }, metadata: {} };
          const expectedState = {
            newEngagementInstance: { metadata: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred loading the new engagement instance!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the newEngagementInstance metadata and slice metadata when fetchNewEngagementInstance.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchNewEngagementInstance/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { newEngagementInstance: { metadata: {} }, metadata: {} };
          const expectedState = {
            newEngagementInstance: { metadata: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred loading the new engagement instance!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchTaxRiskResponseForNei', () => {
        it('updates the metadata in the taxRisk view when fetchTaxRiskResponseForNei.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchTaxRiskResponseForNei/pending`;
          const action = { type: actionType };
          const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.taxRisk.viewId;
          const state = { views: { [viewId]: { metadata: {} } } };
          const expectedState = {
            views: { [viewId]: { metadata: { isLoading: true, hasError: false, error: null } } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the formData and metadata in the taxRisk view when fetchTaxRiskResponseForNei.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchTaxRiskResponseForNei/fulfilled`;
          const existingPropertyName = faker.datatype.string();
          const existingNullPropertyName = faker.datatype.string();
          const nonExistingPropertyName = faker.datatype.string();
          const taxRiskResponse = {
            id: faker.datatype.number(),
            [existingPropertyName]: faker.random.alphaNumeric(10),
            [existingNullPropertyName]: null,
            [nonExistingPropertyName]: faker.random.alphaNumeric(10)
          };
          const payload = taxRiskResponse;
          const action = { type: actionType, payload };

          const state = {
            views: {
              [NEW_ENGAGEMENT_INSTANCE_VIEWS.taxRisk.viewId]: {
                formData: { id: null, [existingPropertyName]: null, [existingNullPropertyName]: null },
                metadata: {}
              }
            },
            metadata: { loadingTasksCompleted: faker.datatype.number() }
          };

          const expectedState = {
            views: {
              [NEW_ENGAGEMENT_INSTANCE_VIEWS.taxRisk.viewId]: {
                formData: {
                  id: taxRiskResponse.id,
                  [existingPropertyName]: taxRiskResponse[existingPropertyName],
                  [existingNullPropertyName]: ''
                },
                metadata: { isLoading: false }
              }
            },
            metadata: { loadingTasksCompleted: state.metadata.loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the metadata in the taxRisk view and slice metadata when fetchTaxRiskResponseForNei.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchTaxRiskResponseForNei/rejected`;
          const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.taxRisk.viewId;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { views: { [viewId]: { metadata: {} } }, metadata: {} };
          const expectedState = {
            views: { [viewId]: { metadata: { isLoading: false, hasError: true, error: { ...payload } } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred loading the tax risk response!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates the metadata in the taxRisk view and slice metadata when fetchTaxRiskResponseForNei.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiData/fetchTaxRiskResponseForNei/rejected`;
          const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.taxRisk.viewId;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { views: { [viewId]: { metadata: {} } }, metadata: {} };
          const expectedState = {
            views: { [viewId]: { metadata: { isLoading: false, hasError: true, error: { ...error } } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred loading the tax risk response!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });
    });

    describe('load new engagement instance workflow data', () => {
      describe('fetchUserTasks', () => {
        it('updates lookups.userTasks when fetchUserTasks.pending is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiWorkflowData/fetchUserTasks/pending`;
          const action = { type: actionType };
          const state = { newEngagementInstance: { currentUserTask: null }, lookups: { userTasks: {} } };
          const expectedState = {
            newEngagementInstance: {
              currentUserTask: []
            },
            lookups: { userTasks: { data: [], isLoading: true, hasError: false, error: null } }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.userTasks when fetchUserTasks.fulfilled is invoked', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiWorkflowData/fetchUserTasks/fulfilled`;
          const payload = { currentUserTask: faker.datatype.string(), userTasks: faker.datatype.array() };
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = {
            newEngagementInstance: { currentUserTask: null },
            lookups: { userTasks: { data: [] } },
            metadata: { loadingTasksCompleted }
          };
          const expectedState = {
            newEngagementInstance: {
              currentUserTask: payload.currentUserTask
            },
            lookups: { userTasks: { data: payload.userTasks, isLoading: false } },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.userTasks and metadata when fetchUserTasks.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiWorkflowData/fetchUserTasks/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { lookups: { userTasks: {} }, metadata: {} };
          const expectedState = {
            lookups: { userTasks: { isLoading: false, hasError: true, error: { ...payload } } },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the user tasks!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.userTasks and metadata when fetchUserTasks.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const actionType = `${SLICE_NAME}/neiWorkflowData/fetchUserTasks/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { lookups: { userTasks: {} }, metadata: {} };
          const expectedState = {
            lookups: { userTasks: { isLoading: false, hasError: true, error: { ...error } } },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the user tasks!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });

      describe('fetchWorkflowStepRunLogs', () => {
        it('updates lookups.workflowStepRunLogs in the workflowHistory view when fetchWorkflowStepRunLogs.pending is invoked', () => {
          // * ARRANGE
          const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.workflowHistory.viewId;
          const actionType = `${SLICE_NAME}/neiWorkflowData/fetchWorkflowStepRunLogs/pending`;
          const action = { type: actionType };
          const state = { views: { [viewId]: { lookups: { workflowStepRunLogs: {} } } } };
          const expectedState = {
            views: {
              [viewId]: {
                lookups: { workflowStepRunLogs: { isLoading: true, hasError: false, error: null, data: [] } }
              }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.workflowStepRunLogs in the workflowHistory view and metadata when fetchWorkflowStepRunLogs.fulfilled is invoked', () => {
          // * ARRANGE
          const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.workflowHistory.viewId;
          const actionType = `${SLICE_NAME}/neiWorkflowData/fetchWorkflowStepRunLogs/fulfilled`;
          const payload = faker.datatype.array();
          const action = { type: actionType, payload };
          const loadingTasksCompleted = faker.datatype.number();
          const state = {
            views: { [viewId]: { lookups: { workflowStepRunLogs: {} } } },
            metadata: { loadingTasksCompleted }
          };
          const expectedState = {
            views: {
              [viewId]: {
                lookups: { workflowStepRunLogs: { isLoading: false, data: payload } }
              }
            },
            metadata: { loadingTasksCompleted: loadingTasksCompleted + 1 }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.workflowStepRunLogs in the workflowHistory view and metadata when fetchWorkflowStepRunLogs.rejected is invoked and action.payload has a value', () => {
          // * ARRANGE
          const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.workflowHistory.viewId;
          const actionType = `${SLICE_NAME}/neiWorkflowData/fetchWorkflowStepRunLogs/rejected`;
          const payload = { fakerProperty: faker.random.alphaNumeric(10) };
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, payload, error };
          const state = { views: { [viewId]: { lookups: { workflowStepRunLogs: {} } } }, metadata: {} };

          const expectedState = {
            views: {
              [viewId]: {
                lookups: { workflowStepRunLogs: { isLoading: false, hasError: true, error: { ...payload } } }
              }
            },
            metadata: {
              hasError: true,
              error: { ...payload, friendlyMessage: 'An error occurred fetching the workflow step run logs!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });

        it('updates lookups.workflowStepRunLogs in the workflowHistory view and metadata when fetchWorkflowStepRunLogs.rejected is invoked and action.payload has no value', () => {
          // * ARRANGE
          const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.workflowHistory.viewId;
          const actionType = `${SLICE_NAME}/neiWorkflowData/fetchWorkflowStepRunLogs/rejected`;
          const error = { fakerProperty: faker.random.alphaNumeric(10) };
          const action = { type: actionType, error };
          const state = { views: { [viewId]: { lookups: { workflowStepRunLogs: {} } } }, metadata: {} };

          const expectedState = {
            views: {
              [viewId]: {
                lookups: { workflowStepRunLogs: { isLoading: false, hasError: true, error: { ...error } } }
              }
            },
            metadata: {
              hasError: true,
              error: { ...error, friendlyMessage: 'An error occurred fetching the workflow step run logs!' }
            }
          };

          // * ACT
          const actualState = newEngagementScreenReducer(state, action);

          // * ASSERT
          expect(actualState).toEqual(expectedState);
        });
      });
    });
  });
});
