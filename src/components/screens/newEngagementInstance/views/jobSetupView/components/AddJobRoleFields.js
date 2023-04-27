import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PmArray from '../../../../../../helpers/customTypes/PmArray';
import SORT_DIRECTION from '../../../../../../helpers/enums/sortDirection';
import JOB_ROLES from '../../../../../../helpers/enums/jobRoles';

import {
  selectCurrentView,
  selectCurrentViewId,
  selectJobHierarchy,
  selectLookups,
  viewFormDataChanged
} from '../../../newEngagementInstanceSlice';

import {
  createJobRole,
  searchJobRoleAllowablePartnerRoleAssignments,
  searchJobRoleStaff,
  searchJobRoleStaffWhichHaveRoleAssignments
} from '../../../newEngagementInstanceThunks';

import withNewEngagementInstanceViewData from '../../withNewEngagementInstanceViewData';
import AutoComplete from '../../../components/autoComplete/AutoComplete';
import SelectBox from '../../../components/selectBox/SelectBox';

let AddJobRoleFields = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const {
    handleAutoCompleteDataCleared,
    handleAutoCompleteItemReset,
    handleAutoCompleteItemSelected,
    handleAutoCompleteSearch,
    handleInputFieldValueChanged
  } = propsFromHoc;

  const dispatch = useDispatch();
  const currentViewId = useSelector(selectCurrentViewId);
  const { formData, lookups } = useSelector(selectCurrentView);
  const { jobCategoryRoles, jobRoles, regionHierarchies } = useSelector(selectLookups);
  const jobHierarchy = useSelector((state) => selectJobHierarchy(state, formData.jobHierarchyId));

  // **********************************************************************
  // * component vars

  // the options for the job role ddl
  const [jobRoleOptions, setJobRoleOptions] = useState([]);

  // the "selected" object for the job role staff AutoComplete
  const [selectedJobRoleStaff, setSelectedJobRoleStaff] = useState({ id: '', displayName: '' });

  /**
   * setup the property names for the job role staff AutoComplete
   */
  const jobRoleStaffIdSourcePropertyNames = useMemo(() => {
    const selectedJobRoleId = parseInt(formData.jobRoleId);

    // if the selected job role is 'biller'
    // - then use jobRoleAllowablePartnerRoleAssignmentId
    // - otherwise use jobRoleStaffId
    const valuePropertyName =
      selectedJobRoleId === JOB_ROLES.biller.id ? 'jobRoleAllowablePartnerRoleAssignmentId' : 'jobRoleStaffId';

    return {
      matches: 'jobRoleStaff',
      value: valuePropertyName,
      displayName: 'jobRoleStaffDisplayName'
    };
  }, [formData.jobRoleId]);

  /**
   * setup the suggestion text prop name
   */
  const jobRoleStaffSuggestionTextPropName = useMemo(() => {
    const selectedJobRoleId = parseInt(formData.jobRoleId);

    // if the selected job role is 'biller'
    // - then use staffPreferredFullName
    // - otherwise use preferredFullName
    return selectedJobRoleId === JOB_ROLES.biller.id ? 'staffPreferredFullName' : 'preferredFullName';
  }, [formData.jobRoleId]);

  /**
   * elements which are conditionally disabled and whether they are disabled
   */
  const disabledElements = useMemo(
    () => ({
      // if jobRoleId has no value, then jobRoleStaffId is disabled
      jobRoleStaffId: !formData.jobRoleId,

      // if either jobRoleId or both jobRoleStaffId and jobRoleAllowablePartnerRoleAssignmentId has no value
      // - then addRoleButton is disabled
      addRoleButton:
        !formData.jobRoleId || (!formData.jobRoleStaffId && !formData.jobRoleAllowablePartnerRoleAssignmentId)
    }),
    [formData.jobRoleAllowablePartnerRoleAssignmentId, formData.jobRoleId, formData.jobRoleStaffId]
  );

  // **********************************************************************
  // * functions

  /**
   * click handler for the 'add role' button
   */
  const handleAddRoleButtonClick = useCallback(() => {
    const selectedJobRoleId = parseInt(formData.jobRoleId);
    const jobInfoResponseId = formData.id;
    const roleId = formData.jobRoleId;
    let allowablePartnerRoleAssignmentId = null;
    let staffNumber = null;

    // if the selected job role is 'biller'
    // - then we need the jobRoleAllowablePartnerRoleAssignmentId and will look up the staff number based on this value
    // - otherwise we just need the jobRoleStaffId as the staff number
    if (selectedJobRoleId === JOB_ROLES.biller.id) {
      allowablePartnerRoleAssignmentId = formData.jobRoleAllowablePartnerRoleAssignmentId;

      const allowablePartnerRoleAssignment = lookups.allowablePartnerRoleAssignments.find(
        (roleAssignment) => roleAssignment.id === allowablePartnerRoleAssignmentId
      );

      staffNumber = allowablePartnerRoleAssignment.staffId;
    } else {
      staffNumber = formData.jobRoleStaffId;
    }

    const data = { jobInfoResponseId, roleId, staffNumber, allowablePartnerRoleAssignmentId };
    const args = { viewId: currentViewId, data };

    dispatch(createJobRole(args));
  }, [
    currentViewId,
    dispatch,
    formData.id,
    formData.jobRoleAllowablePartnerRoleAssignmentId,
    formData.jobRoleId,
    formData.jobRoleStaffId,
    lookups.allowablePartnerRoleAssignments
  ]);

  /**
   * Search handler for the job role staff AutoComplete.
   * @summary This is used in between the AutoComplete and the HOC handleAutoCompleteSearch method so that the
   * search method/thunk from the slice can be passed in.
   */
  const handleJobRoleStaffSearch = useCallback(
    (event, sourcePropertyNames) => {
      const selectedJobRoleId = parseInt(formData.jobRoleId);

      // get the job category role for the selected job role id
      const jobCategoryRole = jobCategoryRoles.data
        .filter((jcr) => jcr.jobCategoryId === jobHierarchy.jobCategoryId)
        .find((j) => j.jobRoleId === selectedJobRoleId);

      // if the selected job role is 'biller'
      // - then search allowable partner role assignments
      // else if the job category role for the selected job role id requires an effective date
      // - then search staff which have role assignments
      // - otherwise just search staff
      const searchMethod =
        selectedJobRoleId === JOB_ROLES.biller.id
          ? searchJobRoleAllowablePartnerRoleAssignments
          : jobCategoryRole.requiresEffectiveDate === true
          ? searchJobRoleStaffWhichHaveRoleAssignments
          : searchJobRoleStaff;

      handleAutoCompleteSearch(event, sourcePropertyNames, searchMethod);
    },
    [formData.jobRoleId, handleAutoCompleteSearch, jobCategoryRoles.data, jobHierarchy.jobCategoryId]
  );

  /**
   * render suggestions for the job role staff autocomplete
   */
  const renderJobRoleStaffAutocompleteSuggestion = useCallback(
    (suggestion) => {
      let renderedSuggestion = null;
      const selectedJobRoleId = parseInt(formData.jobRoleId);

      // if the selected job role is 'biller'
      // - the suggestion is an allowable partner role assignment
      // - otherwise, the suggestion is a staff
      if (selectedJobRoleId === JOB_ROLES.biller.id) {
        const regionalImpactGroupName = regionHierarchies.data.find(
          (rh) => rh.id === suggestion.regionHierarchyId
        ).regionalImpactGroupName;

        renderedSuggestion = (
          <div>
            {suggestion.staffPreferredFullName} - {regionalImpactGroupName} ({suggestion.staffId})
          </div>
        );
      } else {
        renderedSuggestion = (
          <div>
            {suggestion.preferredFullName} ({suggestion.id})
          </div>
        );
      }

      return renderedSuggestion;
    },
    [formData.jobRoleId, regionHierarchies.data]
  );

  // **********************************************************************
  // * side effects

  /**
   * update the "selected" object for the job role staff AutoComplete
   */
  useEffect(
    function updateSelectedJobRoleStaff() {
      const selectedJobRoleId = parseInt(formData.jobRoleId);

      // if the selected job role is 'biller'
      // - then use
      const id =
        selectedJobRoleId === JOB_ROLES.biller.id
          ? formData.jobRoleAllowablePartnerRoleAssignmentId
          : formData.jobRoleStaffId;

      setSelectedJobRoleStaff({ id, displayName: formData.jobRoleStaffDisplayName });
    },
    [
      formData.jobRoleAllowablePartnerRoleAssignmentId,
      formData.jobRoleId,
      formData.jobRoleStaffDisplayName,
      formData.jobRoleStaffId
    ]
  );

  /**
   * when jobCategoryRoles.data, jobRoles.data, or jobHierarchy.jobCategoryId changes
   *  - populate jobRoleOptions
   */
  useEffect(
    function populateJobRoleOptions() {
      // get the allowed job role ids
      // - filter jobCategoryRoles where jobCategoryId === jobHierarchy.jobCategoryId
      // - from those jobCategoryRoles, get the jobRoleIds
      const allowedJobRoleIds = jobCategoryRoles.data
        .filter((jcr) => jcr.jobCategoryId === jobHierarchy.jobCategoryId)
        .map((jcr) => jcr.jobRoleId);

      // get the allowed job roles
      // - filter allowedJobRoleIds where the jobRole is active and the id is in the collection of jobRoleIds
      const allowedJobRoles = new PmArray(...jobRoles.data)
        .filter((jr) => jr.isActive && allowedJobRoleIds.includes(jr.id))
        .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

      // create the options
      const options = allowedJobRoles.map((jobRole) => {
        return { value: jobRole.id, text: jobRole.displayName };
      });

      setJobRoleOptions(options);
    },
    [jobCategoryRoles.data, jobHierarchy.jobCategoryId, jobRoles.data]
  );

  /**
   * When formData.jobRoleId changes, clear out jobRoleStaffId autoComplete.
   * We need to ensure that after selecting a new job role, that the user searches for a new staff.
   * This is because the pool of staff differs based on the selected job role.
   */
  useEffect(
    function clearJobRoleStaffAutoComplete() {
      // update form data
      const updatedFormData = {
        jobRoleStaffId: '',
        jobRoleStaffDisplayName: '',
        jobRoleAllowablePartnerRoleAssignmentId: ''
      };
      const payload = { viewId: currentViewId, formData: updatedFormData };
      dispatch(viewFormDataChanged(payload));

      // update selectedJobRoleStaff to have forceReset to be true
      // this will force the autocomplete to reset and clear out the values stored within it
      setSelectedJobRoleStaff({ id: '', displayName: '', forceReset: true });
    },
    [dispatch, formData.jobRoleId, currentViewId]
  );

  // **********************************************************************
  // * render

  return (
    <div className="add-job-roles-container">
      <SelectBox
        name="jobRoleId"
        label="Job Role:"
        value={formData.jobRoleId}
        defaultOption="Select a job role"
        options={jobRoleOptions}
        isLoading={false}
        onChange={handleInputFieldValueChanged}
      />
      <AutoComplete
        name="jobRoleStaffId"
        label="Name:"
        placeholder="Start typing to select a staff"
        selectedItem={selectedJobRoleStaff}
        matches={lookups.jobRoleStaff}
        suggestionTextPropName={jobRoleStaffSuggestionTextPropName}
        sourcePropertyNames={jobRoleStaffIdSourcePropertyNames}
        renderSuggestionOverride={renderJobRoleStaffAutocompleteSuggestion}
        disabled={disabledElements.jobRoleStaffId}
        onClearData={handleAutoCompleteDataCleared}
        onResetItem={handleAutoCompleteItemReset}
        onSelect={handleAutoCompleteItemSelected}
        onSearch={handleJobRoleStaffSearch}
      />
      <button
        type="button"
        className="btn btn-primary"
        disabled={disabledElements.addRoleButton}
        onClick={handleAddRoleButtonClick}>
        Add Role
      </button>
    </div>
  );
};

AddJobRoleFields = memo(AddJobRoleFields);
AddJobRoleFields.displayName = 'AddJobRoleFields';

export default withNewEngagementInstanceViewData(AddJobRoleFields);
