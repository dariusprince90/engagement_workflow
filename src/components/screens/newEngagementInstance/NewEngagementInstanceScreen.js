import { memo, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import './newEngagementInstanceScreen.scss';

import NEW_ENGAGEMENT_INSTANCE_VIEWS from '../../../helpers/enums/newEngagementInstanceViews';
import { pageSubtitleChanged, pageTitleChanged } from '../../common/header/headerSlice';
import { showSideBar } from '../../common/appLayout/appLayoutSlice';
import { ensureStaffExistsInCache, selectUserAuthInfo } from '../../../app/staffSlice';
import {
  incrementLoadingTasksTotal,
  loadScreenLookupsCompleted,
  loadExistingNewEngagementInstanceCompleted,
  loadExistingNewEngagementInstanceStarted,
  newEngagementInstanceIdSet,
  selectLookupsMetadata,
  selectMetadata,
  selectNewEngagementInstance,
  selectView
} from './newEngagementInstanceSlice';

import {
  fetchAttachmentInfoResponsesForNei,
  fetchAttachmentTypes,
  fetchClientEntities,
  fetchClientSearchTypes,
  fetchClientTaxTypes,
  fetchCountries,
  fetchIncompatibleNaturesOfServices,
  fetchIndustryHierarchies,
  fetchInitialSetupResponseForNei,
  fetchInternationalHeadquarterCountries,
  fetchJobCategoryRoles,
  fetchJobHierarchies,
  fetchJobInfoResponsesForNei,
  fetchJobRoles,
  fetchMarketSectors,
  fetchMonths,
  fetchNatureOfServiceJobHierarchyMaps,
  fetchNaturesOfServices,
  fetchNewEngagementInstance,
  fetchOwnershipTypes,
  fetchRegionHierarchies,
  fetchSubjectToSecOrGaoRules,
  fetchSuffixes,
  fetchTaxRiskResponseForNei,
  fetchTaxTypes,
  fetchUserTasks,
  fetchWorkflowStepRunLogs,
  fetchWorkflowSteps
} from './newEngagementInstanceThunks';

import ErrorOverlay from './components/overlays/errorOverlay/ErrorOverlay';
import ProgressOverlay from './components/overlays/progressOverlay/ProgressOverlay';
import ViewController from './views/ViewController';
import FormButtons from './components/formButtons/FormButtons';

let NewEngagementInstanceScreen = () => {
  // **********************************************************************
  // * constants

  const { newEngagementInstanceId: newEngagementInstanceIdParam } = useParams();

  const dispatch = useDispatch();
  const PAGE_TITLE = 'Engagement Workflow';
  const PAGE_SUBTITLE = '';

  const { userObjectId: currentUserObjectId } = useSelector(selectUserAuthInfo);
  const { hasError, isLoading, isSaving, loadingTasksCompleted, loadingTasksTotal, savingMessage, toastInfo } =
    useSelector(selectMetadata);
  const { lookupsAreLoaded } = useSelector(selectLookupsMetadata);
  const { newEngagementInstanceId } = useSelector(selectNewEngagementInstance);

  const { formData: selectClientFormData } = useSelector((state) =>
    selectView(state, NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId)
  );

  // **********************************************************************
  // * component vars

  const loadingPercentComplete = Math.ceil((loadingTasksCompleted / loadingTasksTotal) * 100);
  const savingProgressMessage = useMemo(() => savingMessage || 'Saving, please wait...', [savingMessage]);

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  /**
   * when the screen loads
   * - set the page title
   * - set the page subtitle
   * - show the sidebar
   */
  useEffect(
    function setupScreen() {
      dispatch(pageTitleChanged(PAGE_TITLE));
      dispatch(pageSubtitleChanged(PAGE_SUBTITLE));
      dispatch(showSideBar());
    },
    [dispatch]
  );

  /**
   * when the screen loads
   * - if the lookups are not loaded
   *    - load all lookups that can be pre-loaded
   *      - attachment types
   *      - client search types
   *      - client tax types
   *      - countries
   *      - incompatible natures of services
   *      - industry hierarchies
   *      - international headquarter countries
   *      - job category roles
   *      - job hierarchies
   *      - job roles
   *      - market sectors
   *      - months
   *      - nature of service / job hierarchy maps
   *      - natures of services
   *      - ownership types
   *      - subjectToSecOrGaoRules
   *      - suffixes
   *      - tax types
   *      - user tasks
   *      - workflow steps
   */
  useEffect(
    function loadLookups() {
      // if the lookups are already loaded, do nothing
      if (lookupsAreLoaded) {
        return;
      }

      const fetchData = async () => {
        // gather up all lookup methods
        const lookupMethods = [
          fetchAttachmentTypes,
          fetchClientSearchTypes,
          fetchClientTaxTypes,
          fetchCountries,
          fetchIncompatibleNaturesOfServices,
          fetchIndustryHierarchies,
          fetchInternationalHeadquarterCountries,
          fetchJobCategoryRoles,
          fetchJobHierarchies,
          fetchJobRoles,
          fetchMarketSectors,
          fetchMonths,
          fetchNatureOfServiceJobHierarchyMaps,
          fetchNaturesOfServices,
          fetchOwnershipTypes,
          fetchRegionHierarchies,
          fetchSubjectToSecOrGaoRules,
          fetchSuffixes,
          fetchTaxTypes,
          fetchWorkflowSteps
        ];

        // increment loading tasks count
        dispatch(incrementLoadingTasksTotal(lookupMethods.length));

        // create promises array
        const promises = [];
        lookupMethods.forEach((method) => promises.push(dispatch(method())));

        // load all of the lookups in parallel
        await Promise.all(promises);

        // once all lookups are loaded, dispatch that the load of lookups is completed
        await dispatch(loadScreenLookupsCompleted());
      };

      fetchData();
    },
    [dispatch, lookupsAreLoaded]
  );

  /**
   * - ensure the current user is in the staff cache
   *    - we will need the user's info (e.g. staff number as the user uses the screen)
   */
  useEffect(
    function ensureCurrentUserInStaffCache() {
      if (currentUserObjectId !== null) {
        dispatch(ensureStaffExistsInCache({ azureAdObjectId: currentUserObjectId }));
      }
    },
    [currentUserObjectId, dispatch]
  );

  /**
   * when the screen loads
   * - if we have a proper newEngagementInstanceIdParam
   *    - start the nei loading process
   */
  useEffect(
    function startNewEngagementInstanceLoadingProcess() {
      // check if the newEngagementInstanceIdParam is only digits
      const isNeiIdOnlyDigits = newEngagementInstanceIdParam?.match(/^\d+$/)?.length === 1;

      // if we have a newEngagementInstanceIdParam and it is only digits
      // then start the nei loading process
      if (!!newEngagementInstanceIdParam && isNeiIdOnlyDigits) {
        const existingNeiId = parseInt(newEngagementInstanceIdParam);
        dispatch(loadExistingNewEngagementInstanceStarted());
        dispatch(newEngagementInstanceIdSet(existingNeiId));
      }
    },
    [dispatch, newEngagementInstanceIdParam]
  );

  /**
   * when the screen loads
   * - if we have a newEngagementInstanceIdParam, a newEngagementInstanceId, and the lookups are loaded
   *    - load all data for the existing nei
   *      - new engagement instance
   *      - initial setup response
   *      - job info responses
   *      - attachment info responses
   *      - tax risk response
   */
  useEffect(
    function loadNewEngagementInstanceData() {
      // if we don't have a newEngagementInstanceIdParam, we are not working with an existing nei
      // if we don't have a newEngagementInstanceId, we are not working with an existing nei
      // if the lookups are not yet loaded, don't load the nei
      if (!newEngagementInstanceIdParam || !newEngagementInstanceId || !lookupsAreLoaded) {
        return;
      }

      const fetchData = async () => {
        // gather up all nei data loading methods
        const neiDataLoadingMethods = [
          fetchNewEngagementInstance,
          fetchInitialSetupResponseForNei,
          fetchJobInfoResponsesForNei,
          fetchAttachmentInfoResponsesForNei,
          fetchTaxRiskResponseForNei
        ];

        // gather up all methods to execute once all nei data is loaded
        const neiWorkflowDataLoadingMethods = [fetchUserTasks, fetchWorkflowStepRunLogs];

        // increment loading tasks count
        dispatch(incrementLoadingTasksTotal(neiDataLoadingMethods.length + neiWorkflowDataLoadingMethods.length));

        // create promises array for tasks to execute to load nei data
        const neiDataPromises = [];
        neiDataLoadingMethods.forEach((method) => neiDataPromises.push(dispatch(method(newEngagementInstanceId))));

        // load everything in parallel that we possibly can
        // if anything ends up having a dependency, we will adjust so that we start loading the dependency as soon as
        // possible after the parent item is loaded
        await Promise.all(neiDataPromises);

        // create promises array for tasks to execute after loading nei data
        const neiWorkflowDataPromises = [];
        neiWorkflowDataLoadingMethods.forEach((method) =>
          neiWorkflowDataPromises.push(dispatch(method(newEngagementInstanceId)))
        );

        // once all data are loaded, dispatch that the load of the existing nei is completed
        await dispatch(loadExistingNewEngagementInstanceCompleted());
      };

      // we are working with an existing nei and the lookups are loaded
      // load all of the new engagement instance data
      fetchData();
    },
    [dispatch, lookupsAreLoaded, newEngagementInstanceIdParam, newEngagementInstanceId]
  );

  /**
   * when we have a client number
   *  - fetch the client entities for the client
   */
  useEffect(
    function loadClientEntities() {
      const clientNumber = selectClientFormData.clientNumber;

      if (!clientNumber) {
        return;
      }

      dispatch(fetchClientEntities(clientNumber));
    },
    [dispatch, selectClientFormData.clientNumber]
  );

  /**
   * if we have a new engagement instance id
   * - update the page subtitle to show the client name and nei id
   */
  useEffect(
    function setPageSubtitle() {
      if (!newEngagementInstanceId) {
        return;
      }

      // todo: MOB: use the clients cache
      const clientName = selectClientFormData.clientName || selectClientFormData.clientDisplayName;
      const pageSubTitle = `${clientName} - Workflow #${newEngagementInstanceId}`;
      dispatch(pageSubtitleChanged(pageSubTitle));
    },
    [dispatch, newEngagementInstanceId, selectClientFormData.clientDisplayName, selectClientFormData.clientName]
  );

  /**
   * when the toastInfo is updated and there is a message
   * - show a toast with the provided message/options
   */
  useEffect(
    function showToast() {
      if (!toastInfo.message) {
        return;
      }

      const options = { type: toastInfo.type };
      toast(toastInfo.message, options);
    },
    [toastInfo]
  );

  // **********************************************************************
  // * render

  return (
    <div className="new-engagement-instance-screen">
      <form autoComplete="off" className="needs-validation" noValidate>
        <ViewController />
        <FormButtons />
      </form>

      {/* if we're loading (existing workflow) and there is no error, show a progress overlay with the current progress */}
      {isLoading && !hasError && (
        <ProgressOverlay alertType="info" message="Loading your workflow..." percentComplete={loadingPercentComplete} />
      )}

      {/* if we're saving and there is no error, show a progress overlay w/ a saving message  */}
      {isSaving && !hasError && <ProgressOverlay alertType="info" message={savingProgressMessage} />}

      {/* if we have an error, show the error overlay */}
      {hasError && <ErrorOverlay />}
    </div>
  );
};

NewEngagementInstanceScreen = memo(NewEngagementInstanceScreen);

export default NewEngagementInstanceScreen;
