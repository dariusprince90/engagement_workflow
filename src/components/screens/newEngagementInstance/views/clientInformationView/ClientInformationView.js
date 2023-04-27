import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import OWNERSHIP_TYPES from '../../../../../helpers/enums/ownershipTypes';
import SORT_DIRECTION from '../../../../../helpers/enums/sortDirection';

import PmArray from '../../../../../helpers/customTypes/PmArray';
import { selectCurrentView, selectLookups } from '../../../newEngagementInstance/newEngagementInstanceSlice';
import { tempThunk } from '../../../newEngagementInstance/newEngagementInstanceThunks';
import withNewEngagementInstanceViewData from '../../views/withNewEngagementInstanceViewData';

import YesNoRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import CollapsibleFormSection from '../../../../common/collapsibleFormSection/CollapsibleFormSection';
import RadioButtonList from '../../components/radioButtonList/RadioButtonList';
import SelectBox from '../../components/selectBox/SelectBox';
import TextBox from '../../components/textBox/TextBox';
import AutoComplete from '../../components/autoComplete/AutoComplete';

let ClientInformationView = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const {
    handleAutoCompleteDataCleared,
    handleAutoCompleteItemReset,
    handleAutoCompleteItemSelected,
    handleAutoCompleteSearch,
    handleInputFieldValueChanged
  } = propsFromHoc;

  const { formData, lookups } = useSelector(selectCurrentView);
  const { clientTaxTypes, suffixes, ownershipTypes, internationalHeadquarterCountries } = useSelector(selectLookups);

  // **********************************************************************
  // * component vars

  const [clientTaxTypeOptions, setClientTaxTypeOptions] = useState([]);
  const [suffixOptions, setSuffixOptions] = useState([]);
  const [ownershipTypeOptions, setOwnershipTypeOptions] = useState([]);
  const [internationalHeadquarterCountryOptions, setInternationalHeadquarterCountryOptions] = useState([]);

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      privateEquityGroups:
        formData.ownershipTypeId === OWNERSHIP_TYPES.privateEquity.id ||
        formData.ownershipTypeId === OWNERSHIP_TYPES.ventureCapital.id
    }),
    [formData.ownershipTypeId]
  );

  /**
   * setup the property names for the scheduling biller staff AutoComplete
   */
  const schedulingBillerStaffSourcePropertyNames = useMemo(() => {
    return {
      matches: 'schedulingBillers',
      value: 'schedulingBillerStaffNumber',
      displayName: 'schedulingBillerDisplayName'
    };
  }, []);

  /**
   * create the "selected" object for the scheduling biller staff AutoComplete
   */
  const selectedSchedulingBillerStaff = useMemo(
    () => ({ id: formData.schedulingBillerStaffNumber, displayName: formData.schedulingBillerDisplayName }),
    [formData.schedulingBillerDisplayName, formData.schedulingBillerStaffNumber]
  );

  // **********************************************************************
  // * functions

  /**
   * Handler for the scheduling biller AutoComplete.
   * @summary This is used in between the AutoComplete and the HOC handleAutoCompleteSearch method so that the
   * search method/thunk from the slice can be passed in.
   */
  const handleSchedulingBillerSearch = useCallback(
    // todo: implement this when we add functionality
    // ! once a thunk exists to search scheduling biller, replace tempThunk with the method to be called
    // ! replace the searchMethod arg with the thunk
    // * e.g. handleAutoCompleteSearch(event, sourcePropertyNames, searchSchedulingBiller);
    (event, sourcePropertyNames) => handleAutoCompleteSearch(event, sourcePropertyNames, tempThunk),
    [handleAutoCompleteSearch]
  );

  // **********************************************************************
  // * side effects

  /**
   * when clientTaxTypes.data changes
   *  - populate clientTaxTypeOptions
   */
  useEffect(
    function populateClientTaxTypeOptions() {
      // if there is no data, the options should be empty
      if (!clientTaxTypes.data.length) {
        setClientTaxTypeOptions([]);
        return;
      }

      // create a sorted array of client tax types
      const taxTypes = new PmArray(...clientTaxTypes.data)
        .filter((ch) => ch.isActive)
        .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

      // create the options from the taxTypes array
      const options = taxTypes.map((taxType) => {
        return { value: taxType.id, text: taxType.displayName };
      });

      setClientTaxTypeOptions(options);
    },
    [clientTaxTypes.data]
  );

  /**
   * when suffixes.data changes
   *  - populate suffixOptions
   */
  useEffect(
    function populateSuffixOptions() {
      // if there is no data, the options should be empty
      if (!suffixes.data.length) {
        setSuffixOptions([]);
        return;
      }

      // create a sorted array suffixes
      const suffixesData = new PmArray(...suffixes.data)
        .filter((ch) => ch.isActive)
        .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

      // create the options from the suffixes array
      const options = suffixesData.map((suffix) => {
        return { value: suffix.id, text: suffix.displayName };
      });

      setSuffixOptions(options);
    },
    [suffixes.data]
  );

  /**
   * when ownershipTypes.data changes
   *  - populate ownershipTypeOptions
   */
  useEffect(
    function populateOwnershipTypeOptions() {
      // if there is no data, the options should be empty
      if (!ownershipTypes.data.length) {
        setOwnershipTypeOptions([]);
        return;
      }

      // create a sorted array of ownership types
      const ownershipTypesData = new PmArray(...ownershipTypes.data)
        .filter((ch) => ch.isActive)
        .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

      // create the options from the ownership types array
      const options = ownershipTypesData.map((ownershipType) => {
        return { value: ownershipType.id, text: ownershipType.displayName };
      });

      setOwnershipTypeOptions(options);
    },
    [ownershipTypes.data]
  );

  /**
   * when internationalHeadquarterCountries.data changes
   *  - populate internationalHeadquarterCountriesOptions
   */
  useEffect(
    function populateInternationalHeadquarterCountryOptions() {
      // if there is no data, the options should be empty
      if (!internationalHeadquarterCountries.data.length) {
        setInternationalHeadquarterCountryOptions([]);
        return;
      }

      // create a sorted array of unique international headquarter countries data
      const internationalHeadquarterCountriesData = new PmArray(...internationalHeadquarterCountries.data)
        .filter((ch) => ch.isActive)
        .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

      // create the options from the international headquarter countries options array
      const options = internationalHeadquarterCountriesData.map((internationalHeadquarterCountriesOption) => {
        return {
          value: internationalHeadquarterCountriesOption.id,
          text: internationalHeadquarterCountriesOption.displayName
        };
      });

      setInternationalHeadquarterCountryOptions(options);
    },
    [internationalHeadquarterCountries.data]
  );

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection title="Client Information">
      <div className="container-fluid">
        <SelectBox
          name="clientTaxTypeId"
          label="Client Tax Type"
          defaultOption="Select Client Type"
          options={clientTaxTypeOptions}
          onChange={handleInputFieldValueChanged}
          isLoading={clientTaxTypes.isLoading}
          loadingText="Loading client tax types.."
          value={formData.clientTaxTypeId}
        />

        <TextBox
          name="firstName"
          label="First Name"
          placeholder="Type a value"
          onChange={handleInputFieldValueChanged}
          value={formData.firstName}
        />

        <TextBox
          name="middleName"
          label="Middle Name"
          placeholder="Type a value"
          onChange={handleInputFieldValueChanged}
          value={formData.middleName}
        />

        <TextBox
          name="lastName"
          label="Last Name"
          placeholder="Type a value"
          onChange={handleInputFieldValueChanged}
          value={formData.lastName}
        />

        <SelectBox
          name="suffixId"
          label="Suffix"
          defaultOption="Select Suffix"
          options={suffixOptions}
          onChange={handleInputFieldValueChanged}
          isLoading={suffixes.isLoading}
          loadingText="Loading suffixes.."
          value={formData.suffixId}
        />

        <TextBox
          name="clientName"
          label="Client Name"
          placeholder="Type a value"
          onChange={handleInputFieldValueChanged}
          value={formData.clientName}
        />

        <SelectBox
          name="ownershipTypeId"
          label="Majority Ownership Type"
          defaultOption="Select Ownership Type"
          options={ownershipTypeOptions}
          onChange={handleInputFieldValueChanged}
          isLoading={ownershipTypes.isLoading}
          loadingText="Loading Ownership Types.."
          value={formData.ownershipTypeId}
        />

        <AutoComplete
          name="schedulingBillerStaffNumber"
          label="Scheduling Biller"
          placeholder="Start typing to select a scheduling biller"
          selectedItem={selectedSchedulingBillerStaff}
          matches={lookups.schedulingBillers}
          sourcePropertyNames={schedulingBillerStaffSourcePropertyNames}
          onClearData={handleAutoCompleteDataCleared}
          onResetItem={handleAutoCompleteItemReset}
          onSelect={handleAutoCompleteItemSelected}
          onSearch={handleSchedulingBillerSearch}
        />

        <SelectBox
          name="internationalHeadquarterCountryReferenceId"
          label="Primary Headquarters Location"
          defaultOption="Select Primary Headquarters Location"
          options={internationalHeadquarterCountryOptions}
          onChange={handleInputFieldValueChanged}
          isLoading={internationalHeadquarterCountries.isLoading}
          loadingText="Loading headquarter locations.."
          value={formData.internationalHeadquarterCountryReferenceId}
        />

        <RadioButtonList
          horizontalItems
          name="isCommunityTaxPractice"
          label="Community Tax Practice"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.isCommunityTaxPractice}
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          horizontalItems
          name="isGovernmentContractor"
          label="Government Contractor"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.isGovernmentContractor}
          onChange={handleInputFieldValueChanged}
        />

        {/*
          // todo: replace this with the PEG components
          // - component to add a PEG
          // - PEG list
         */}
        {showFields.privateEquityGroups && <div>[Private Equity Groups]</div>}
      </div>
    </CollapsibleFormSection>
  );
};

ClientInformationView = memo(ClientInformationView);
ClientInformationView.displayName = 'ClientInformationView';

export default withNewEngagementInstanceViewData(ClientInformationView);
