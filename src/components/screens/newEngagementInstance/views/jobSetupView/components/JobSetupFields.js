import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PmArray from '../../../../../../helpers/customTypes/PmArray';
import COMPLIANCE_JOB_TYPES from '../../../../../../helpers/enums/complianceJobTypes';
import DYNAMIC_ALERT_TYPES from '../../../../../../helpers/enums/dynamicAlertTypes';
import INPUT_GROUP_ADD_ON_TYPES from '../../../../../../helpers/enums/inputGroupAddOnTypes';
import SORT_DIRECTION from '../../../../../../helpers/enums/sortDirection';

import {
  selectClientEntity,
  selectCurrentView,
  selectCurrentViewId,
  selectJobHierarchy,
  selectLookups,
  viewFormDataChanged
} from '../../../newEngagementInstanceSlice';

import withNewEngagementInstanceViewData from '../../withNewEngagementInstanceViewData';
import YesNoRadioButtonListOptions from '../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';

import FormText from '../../../components/formText/FormText';
import DatePicker from '../../../components/datePicker/DatePicker';
import RadioButtonList from '../../../components/radioButtonList/RadioButtonList';
import ReadonlyFormField from '../../../components/readonlyFormField/ReadonlyFormField';
import SelectBox from '../../../components/selectBox/SelectBox';
import TextArea from '../../../components/textArea/TextArea';
import TextBox from '../../../components/textBox/TextBox';

// import modules that are used as internal methods; this allows mocking the internal modules during testing
// * NOTE: ES6 modules support cyclic dependencies automatically, so it is perfectly valid to import a module
// *       into itself so that functions within the module can call the module export for other functions in the module
import { getJobNameYears as getJobNameYearsInternal } from './JobSetupFields';

/**
 * Gets the list of years to be used in the jobNameYear field.
 * @param {integer} includeYear - A specific year to always be in the list.
 * @returns
 */
export const getJobNameYears = (includeYear) => {
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 8;
  const maxYear = currentYear + 2;
  const selectedYear = includeYear || currentYear;
  const years = PmArray.fromRange(minYear, maxYear);
  const distinctYears = [...new Set([...years, selectedYear])];
  return distinctYears;
};

let JobSetupFields = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const dispatch = useDispatch();
  const { handleDatePickerValueChanged, handleInputFieldValueChanged } = propsFromHoc;
  const currentViewId = useSelector(selectCurrentViewId);
  const { formData } = useSelector(selectCurrentView);
  const { clientEntities } = useSelector(selectLookups);
  const jobHierarchy = useSelector((state) => selectJobHierarchy(state, formData.jobHierarchyId));
  const clientEntity = useSelector((state) => selectClientEntity(state, formData.clientEntityId));

  // **********************************************************************
  // * component vars

  const [jobNameYearOptions, setJobNameYearOptions] = useState([]);
  const [clientEntityOptions, setClientEntityOptions] = useState([]);

  // *** dynamic alerts ***
  const [isBusinessCoveringTheCostDynamicAlert, setIsBusinessCoveringTheCostDynamicAlert] = useState(null);
  const [areAnySpecialReturnsNeededDynamicAlert, setAreAnySpecialReturnsNeededDynamicAlert] = useState(null);
  const [hasMoreThanThreeForms5472DynamicAlert, setHasMoreThanThreeForms5472DynamicAlert] = useState(null);
  const [hasMoreThanFiveBankAccountsForFinCen114DynamicAlert, setHasMoreThanFiveBankAccountsForFinCen114DynamicAlert] =
    useState(null);
  const [
    willReturnsBePreparedForFivePlusStateLocalDynamicAlert,
    setWillReturnsBePreparedForFivePlusStateLocalDynamicAlert
  ] = useState(null);

  // *** input add-ons ***
  const clientEntityIdInputAddOns = useMemo(() => {
    const handleAddNewEntityButtonClick = () => {
      // todo: implement me
      // (launch new entity modal)
    };

    return [
      {
        addOnType: INPUT_GROUP_ADD_ON_TYPES.button,
        text: 'New Entity',
        buttonClass: 'btn btn-primary',
        onClick: handleAddNewEntityButtonClick
      }
    ];
  }, []);

  const entityLegalNameInputAddOns = useMemo(() => {
    const handleEditNewEntityButtonClick = () => {
      // todo: implement me
      // (launch edit new entity modal)
    };

    const handleUseExistingEntityButtonClick = () => {
      // todo: implement me
      // (change back to use existing entity ddl)
    };

    return [
      {
        addOnType: INPUT_GROUP_ADD_ON_TYPES.button,
        text: 'Edit',
        buttonClass: 'btn btn-primary',
        onClick: handleEditNewEntityButtonClick
      },
      {
        addOnType: INPUT_GROUP_ADD_ON_TYPES.button,
        text: 'Use Existing Entity',
        buttonClass: 'btn btn-info',
        onClick: handleUseExistingEntityButtonClick
      }
    ];
  }, []);

  const expectedFeesInputAddOns = useMemo(
    () => [{ addOnType: INPUT_GROUP_ADD_ON_TYPES.icon, icon: 'fa-solid fa-dollar-sign' }],
    []
  );

  const expectedRealizationInputAddOns = useMemo(
    () => [{ addOnType: INPUT_GROUP_ADD_ON_TYPES.icon, icon: 'fa-solid fa-percent' }],
    []
  );

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      clientEntityId: jobHierarchy.complianceJobTypeId !== null,
      entityLegalName: !!formData.entityLegalName,
      additionalCustomCharacters: jobHierarchy.allowsAdditionalCharactersInJobName === true,
      jobNameYear: jobHierarchy.complianceJobTypeId === COMPLIANCE_JOB_TYPES.Tax.id,
      jobName: jobHierarchy.complianceJobTypeId === null,
      jobNameWillBe: jobHierarchy.complianceJobTypeId !== null,
      expectedFees: jobHierarchy.allowsExpectedFees === true,
      expectedRealization: jobHierarchy.allowsExpectedRealization === true,
      expectedJobBudgetHours: jobHierarchy.allowsBudgetHours === true,
      isBusinessCoveringTheCost: jobHierarchy.complianceJobTypeId === COMPLIANCE_JOB_TYPES.Tax.id,
      areAnySpecialReturnsNeeded: jobHierarchy.complianceJobTypeId === COMPLIANCE_JOB_TYPES.Tax.id,
      hasMoreThanThreeForms5472: jobHierarchy.complianceJobTypeId === COMPLIANCE_JOB_TYPES.Tax.id,
      hasMoreThanFiveBankAccountsForFinCen114: jobHierarchy.complianceJobTypeId === COMPLIANCE_JOB_TYPES.Tax.id,
      willReturnsBePreparedForFivePlusStateLocal: jobHierarchy.complianceJobTypeId === COMPLIANCE_JOB_TYPES.Tax.id
    }),
    [
      formData.entityLegalName,
      jobHierarchy.allowsAdditionalCharactersInJobName,
      jobHierarchy.allowsBudgetHours,
      jobHierarchy.allowsExpectedFees,
      jobHierarchy.allowsExpectedRealization,
      jobHierarchy.complianceJobTypeId
    ]
  );

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  /**
   * when formData.jobNameYear is set/changes
   *  - populate jobNameYearOptions
   */
  useEffect(
    function populateJobNameYearOptions() {
      const includeYear = parseInt(formData.jobNameYear);
      const years = getJobNameYearsInternal(includeYear);
      const options = years.map((year) => ({ value: year, text: year.toString() }));
      setJobNameYearOptions(options);
    },
    [formData.jobNameYear]
  );

  /**
   * when clientEntities.data changes
   *  - populate clientEntityOptions
   */
  useEffect(
    function populateClientEntityOptions() {
      // if there is no data, the options should be empty
      if (!clientEntities.data.length) {
        setClientEntityOptions([]);
        return;
      }

      // create a sorted array of active client entities
      const activeClientEntities = new PmArray(...clientEntities.data)
        .filter((ms) => ms.isActive)
        .sortObjects('legalEntityName', SORT_DIRECTION.ascending.abbreviation);

      // create the options from activeClientEntities
      const options = activeClientEntities.map((clientEntity) => {
        return { value: clientEntity.id, text: clientEntity.legalEntityName };
      });

      setClientEntityOptions(options);
    },
    [clientEntities.data]
  );

  /**
   * when formData.isBusinessCoveringTheCost is true, set the dynamic alert
   * otherwise, set it to null
   */
  useEffect(
    function toggleIsBusinessCoveringTheCostDynamicAlert() {
      const dynamicAlert = {
        type: DYNAMIC_ALERT_TYPES.warning,
        message: (
          <span>
            Because you answered YES to this question, an International Individual Compliance job code needs to be
            created.
            <br />
            This job will not be automatically created. You must navigate to the Nature of Service tab and create the
            job.
          </span>
        )
      };

      setIsBusinessCoveringTheCostDynamicAlert(formData.isBusinessCoveringTheCost === true ? dynamicAlert : null);
    },
    [formData.isBusinessCoveringTheCost]
  );

  /**
   * when formData.areAnySpecialReturnsNeeded is true, set the dynamic alert
   * otherwise, set it to null
   */
  useEffect(
    function toggleAreAnySpecialReturnsNeededDynamicAlert() {
      const dynamicAlert = {
        type: DYNAMIC_ALERT_TYPES.warning,
        message: (
          <span>
            Because you answered YES to this question, an International Business Compliance job code needs to be
            created.
            <br />
            This job will not be automatically created. You must navigate to the Nature of Service tab and create the
            job.
          </span>
        )
      };

      setAreAnySpecialReturnsNeededDynamicAlert(formData.areAnySpecialReturnsNeeded === true ? dynamicAlert : null);
    },
    [formData.areAnySpecialReturnsNeeded]
  );

  /**
   * when formData.hasMoreThanThreeForms5472 is true, set the dynamic alert
   * otherwise, set it to null
   */
  useEffect(
    function toggleHasMoreThanThreeForms5472DynamicAlert() {
      const dynamicAlert = {
        type: DYNAMIC_ALERT_TYPES.warning,
        message: (
          <span>
            Because you answered YES to this question, an International Business Compliance job code needs to be
            created.
            <br />
            This job will not be automatically created. You must navigate to the Nature of Service tab and create the
            job.
          </span>
        )
      };

      setHasMoreThanThreeForms5472DynamicAlert(formData.hasMoreThanThreeForms5472 === true ? dynamicAlert : null);
    },
    [formData.hasMoreThanThreeForms5472]
  );

  /**
   * when formData.hasMoreThanFiveBankAccountsForFinCen114 is true, set the dynamic alert
   * otherwise, set it to null
   */
  useEffect(
    function toggleHasMoreThanFiveBankAccountsForFinCen114DynamicAlert() {
      const dynamicAlert = {
        type: DYNAMIC_ALERT_TYPES.warning,
        message: (
          <span>
            Because you answered YES to this question, an International Business Compliance job code needs to be
            created.
            <br />
            This job will not be automatically created. You must navigate to the Nature of Service tab and create the
            job.
          </span>
        )
      };

      setHasMoreThanFiveBankAccountsForFinCen114DynamicAlert(
        formData.hasMoreThanFiveBankAccountsForFinCen114 === true ? dynamicAlert : null
      );
    },
    [formData.hasMoreThanFiveBankAccountsForFinCen114]
  );

  /**
   * when formData.willReturnsBePreparedForFivePlusStateLocal is true, set the dynamic alert
   * otherwise, set it to null
   */
  useEffect(
    function toggleWillReturnsBePreparedForFivePlusStateLocalDynamicAlert() {
      const dynamicAlert = {
        type: DYNAMIC_ALERT_TYPES.warning,
        message: (
          <span>
            Because you answered YES to this question, a SALT Compliance job code needs to be created.
            <br />
            This job will not be automatically created. You must navigate to the Nature of Service tab and create the
            job.
          </span>
        )
      };

      setWillReturnsBePreparedForFivePlusStateLocalDynamicAlert(
        formData.willReturnsBePreparedForFivePlusStateLocal === true ? dynamicAlert : null
      );
    },
    [formData.willReturnsBePreparedForFivePlusStateLocal]
  );

  /**
   * when jobHierarchy.complianceJobTypeId has a value, auto-calculate the job name
   */
  useEffect(
    function calculateJobName() {
      // * NOTE: we only calculate the job name when jobHierarchy.complianceJobTypeId is not null
      // if jobHierarchy.complianceJobTypeId is null, then there is nothing to do, just return
      if (jobHierarchy.complianceJobTypeId === null) {
        return;
      }

      // if we have a value for forPeriodEndedDate
      // - use the year portion
      // - otherwise, use empty string
      const forPeriodEndedDateYear = !!formData.forPeriodEndedDate
        ? new Date(formData.forPeriodEndedDate).getFullYear()
        : '';

      // suffix comes from additionalCustomCharacters
      const suffix = formData.additionalCustomCharacters ?? '';

      // form year comes from jobNameYear
      const formYear = formData.jobNameYear ?? '';

      // if we have a value for clientEntity
      // - use the client entity short name
      // - otherwise, use the entityShortName from formData
      const entityShortName = !!clientEntity ? clientEntity.shortEntityName : formData.entityShortName ?? '';

      // calculate the new job name
      // - start with the jobNameFormat from the job hierarchy
      // - replace any/all of the placeholders in the name format
      const newJobName = jobHierarchy.jobNameFormat
        .replace('{{suffix}}', suffix)
        .replace('{{entity-short-name}}', entityShortName)
        .replace('{{period-end-date-year}}', forPeriodEndedDateYear)
        .replace('{form-year}}', formYear);

      // dispatch viewFormDataChanged to update the job name field manually
      const updatedFormData = { jobName: newJobName };
      const payload = { viewId: currentViewId, formData: updatedFormData };
      dispatch(viewFormDataChanged(payload));
    },
    [
      clientEntity,
      currentViewId,
      dispatch,
      formData.additionalCustomCharacters,
      formData.clientEntityId,
      formData.entityShortName,
      formData.forPeriodEndedDate,
      formData.jobNameYear,
      jobHierarchy.complianceJobTypeId,
      jobHierarchy.jobNameFormat
    ]
  );

  // **********************************************************************
  // * render

  return (
    <>
      <FormText isLabel>Job Type: {formData.jobTypeDisplayName}</FormText>

      <FormText applyEmphasis>
        This job will be linked to the client selected at the start of this workflow. If the job needs to be tied to an
        entity that is not the client, please select or add in the drop-down below.
      </FormText>

      {showFields.clientEntityId && (
        <SelectBox
          name="clientEntityId"
          label="Entity Name:"
          value={formData.clientEntityId}
          defaultOption="Select a value"
          options={clientEntityOptions}
          isLoading={clientEntities.isLoading}
          loadingText="Loading entities..."
          appendAddOns={clientEntityIdInputAddOns}
          onChange={handleInputFieldValueChanged}
        />
      )}

      {showFields.entityLegalName && (
        <TextBox
          name="entityLegalName"
          label="Entity Legal Name will be:"
          value={formData.entityLegalName}
          appendAddOns={entityLegalNameInputAddOns}
          readOnly
        />
      )}

      {showFields.additionalCustomCharacters && (
        <TextBox
          name="additionalCustomCharacters"
          label="Additional Custom Characters:"
          placeholder="Type a value"
          value={formData.additionalCustomCharacters}
          onChange={handleInputFieldValueChanged}
        />
      )}

      <DatePicker
        name="forPeriodEndedDate"
        label="For Period Ended Date:"
        placeholder="Select a date"
        value={!!formData.forPeriodEndedDate ? new Date(formData.forPeriodEndedDate) : null}
        onChange={handleDatePickerValueChanged}
      />

      {showFields.jobNameYear && (
        <SelectBox
          name="jobNameYear"
          label="Form Year:"
          value={formData.jobNameYear}
          defaultOption="Select a value"
          options={jobNameYearOptions}
          isLoading={false}
          loadingText="Loading form years..."
          onChange={handleInputFieldValueChanged}
        />
      )}

      {showFields.jobName && (
        <TextBox
          name="jobName"
          label="Job Name:"
          placeholder="Type a value"
          value={formData.jobName}
          onChange={handleInputFieldValueChanged}
        />
      )}

      {showFields.jobNameWillBe && (
        <ReadonlyFormField name="jobName" label="Job Name will be:" value={formData.jobName} />
      )}

      {showFields.expectedFees && (
        <TextBox
          name="expectedFees"
          label="Expected Fees (for this job):"
          placeholder="Type a value"
          prependAddOns={expectedFeesInputAddOns}
          value={formData.expectedFees}
          onChange={handleInputFieldValueChanged}
        />
      )}

      {showFields.expectedRealization && (
        <TextBox
          name="expectedRealization"
          label="Expected Realization (for this job):"
          placeholder="Type a value"
          appendAddOns={expectedRealizationInputAddOns}
          value={formData.expectedRealization}
          onChange={handleInputFieldValueChanged}
        />
      )}

      {showFields.expectedJobBudgetHours && (
        <TextBox
          name="expectedJobBudgetHours"
          label="Expected Job Budget Hours:"
          placeholder="Type a value"
          value={formData.expectedJobBudgetHours}
          onChange={handleInputFieldValueChanged}
        />
      )}

      <TextArea
        name="descriptionOfOtherAttestationEngagement"
        label="Attest Other - Describe for Other Attestation Engagements:"
        placeholder="Type a value"
        value={formData.descriptionOfOtherAttestationEngagement}
        rows={6}
        onChange={handleInputFieldValueChanged}
      />

      <TextArea
        name="descriptionOfNonAttestServices"
        label={
          'Non Attest Engagements - Please provide complete description of the services proposed for this ' +
          'engagement so that approvers will understand the nature of the engagement:'
        }
        placeholder="Type a value"
        value={formData.descriptionOfNonAttestServices}
        rows={6}
        onChange={handleInputFieldValueChanged}
      />

      {showFields.isBusinessCoveringTheCost && (
        <RadioButtonList
          name="isBusinessCoveringTheCost"
          label={
            'Is this business client covering the cost of expat return preparation on behalf of its expat or ' +
            'inpat employees?'
          }
          horizontalItems
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.isBusinessCoveringTheCost}
          dynamicAlert={isBusinessCoveringTheCostDynamicAlert}
          onChange={handleInputFieldValueChanged}
        />
      )}

      {showFields.areAnySpecialReturnsNeeded && (
        <RadioButtonList
          name="areAnySpecialReturnsNeeded"
          label="Will returns for 1120-F, 8858, 8865, 5471 or 1118 be needed?"
          horizontalItems
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.areAnySpecialReturnsNeeded}
          dynamicAlert={areAnySpecialReturnsNeededDynamicAlert}
          onChange={handleInputFieldValueChanged}
        />
      )}

      {showFields.hasMoreThanThreeForms5472 && (
        <RadioButtonList
          name="hasMoreThanThreeForms5472"
          label="Are there more than three form 5472's?"
          horizontalItems
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.hasMoreThanThreeForms5472}
          dynamicAlert={hasMoreThanThreeForms5472DynamicAlert}
          onChange={handleInputFieldValueChanged}
        />
      )}

      {showFields.hasMoreThanFiveBankAccountsForFinCen114 && (
        <RadioButtonList
          name="hasMoreThanFiveBankAccountsForFinCen114"
          label="Are there more than five bank accounts for Fin CEN 114?"
          horizontalItems
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.hasMoreThanFiveBankAccountsForFinCen114}
          dynamicAlert={hasMoreThanFiveBankAccountsForFinCen114DynamicAlert}
          onChange={handleInputFieldValueChanged}
        />
      )}

      {showFields.willReturnsBePreparedForFivePlusStateLocal && (
        <RadioButtonList
          name="willReturnsBePreparedForFivePlusStateLocal"
          label="Will returns be prepared for five or more state and local jurisdictions?"
          horizontalItems
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.willReturnsBePreparedForFivePlusStateLocal}
          dynamicAlert={willReturnsBePreparedForFivePlusStateLocalDynamicAlert}
          onChange={handleInputFieldValueChanged}
        />
      )}

      <RadioButtonList
        name="isApprovingEngagementPartner"
        label="Is this the approving Responsible Engagement Partner for the entire workflow?"
        horizontalItems
        options={YesNoRadioButtonListOptions}
        selectedValue={formData.isApprovingEngagementPartner}
        onChange={handleInputFieldValueChanged}
      />
    </>
  );
};

JobSetupFields = memo(JobSetupFields);
JobSetupFields.displayName = 'JobSetupFields';

export default withNewEngagementInstanceViewData(JobSetupFields);
