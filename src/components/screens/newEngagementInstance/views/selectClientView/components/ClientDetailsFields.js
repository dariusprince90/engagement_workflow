import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import SORT_DIRECTION from '../../../../../../helpers/enums/sortDirection';
import TIN_FIELD_TYPES from '../../../../../../helpers/enums/tinFieldTypes';

import PmArray from '../../../../../../helpers/customTypes/PmArray';
import { selectCurrentView, selectLookups } from '../../../newEngagementInstanceSlice';
import { tempThunk } from '../../../newEngagementInstanceThunks';
import withNewEngagementInstanceViewData from '../../withNewEngagementInstanceViewData';

import AutoComplete from '../../../components/autoComplete/AutoComplete';
import ReadonlyFormField from '../../../components/readonlyFormField/ReadonlyFormField';
import SelectBox from '../../../components/selectBox/SelectBox';
import TextBox from '../../../components/textBox/TextBox';

const propTypes = {
  disabled: PropTypes.bool,
  tinFieldOptions: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(Object.values(TIN_FIELD_TYPES)).isRequired,
    allowMaskedEdit: PropTypes.bool.isRequired
  }).isRequired
};

let ClientDetailsFields = ({ disabled, tinFieldOptions, ...propsFromHoc }) => {
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
  const { countries, industryHierarchies, marketSectors, taxTypes } = useSelector(selectLookups);

  // **********************************************************************
  // * component vars

  const [tinCountryOptions, setTinCountryOptions] = useState([]);
  const [taxTypeOptions, setTaxTypeOptions] = useState([]);
  const [industryNameOptions, setIndustryNameOptions] = useState([]);
  const [verticalNameOptions, setVerticalNameOptions] = useState([]);
  const [industryHierarchyOptions, setIndustryHierarchyOptions] = useState([]);
  const [marketSectorOptions, setMarketSectorOptions] = useState([]);

  /**
   * setup the property names for the relationship partner AutoComplete
   */
  const relationshipPartnerSourcePropertyNames = useMemo(() => {
    return {
      matches: 'staff',
      value: 'relationshipPartnerStaffNumber',
      displayName: 'relationshipPartnerDisplayName'
    };
  }, []);

  /**
   * create the "selected" object for the relationship partner AutoComplete
   */
  const selectedRelationshipPartner = useMemo(() => {
    return {
      id: formData.relationshipPartnerStaffNumber,
      displayName: formData.relationshipPartnerDisplayName
    };
  }, [formData.relationshipPartnerDisplayName, formData.relationshipPartnerStaffNumber]);

  // **********************************************************************
  // * functions

  /**
   * Handler for the relationship partner AutoComplete.
   * @summary This is used in between the AutoComplete and the HOC handleAutoCompleteSearch method so that the
   * search method/thunk from the slice can be passed in.
   */
  const handleRelationshipPartnerSearch = useCallback(
    // todo: implement this when we add functionality for new clients
    // ! once a thunk exists to search relationship partners, replace tempThunk with the method to be called
    // ! replace the searchMethod arg with the thunk
    // * e.g. handleAutoCompleteSearch(event, sourcePropertyNames, searchRelationshipPartners);
    (event, sourcePropertyNames) => handleAutoCompleteSearch(event, sourcePropertyNames, tempThunk),
    [handleAutoCompleteSearch]
  );

  // **********************************************************************
  // * side effects

  /**
   * when countries.data changes
   *  - populate tinCountryCountryOptions
   */
  useEffect(
    function populateTinCountryOptions() {
      // if there is no data, the options should be empty
      if (!countries.data.length) {
        setTinCountryOptions([]);
        return;
      }

      // create a sorted array of active countries
      const activeCountries = new PmArray(...countries.data)
        .filter((ch) => ch.isActive)
        .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

      // create the options from the countries array
      const options = activeCountries.map((country) => {
        return { value: country.countryHierarchyReferenceId, text: country.displayName };
      });

      setTinCountryOptions(options);
    },
    [countries.data]
  );

  /**
   * when tinCountry or taxTypes.data changes
   *  - populate taxTypeOptions
   */
  useEffect(
    function populateTaxTypeOptions() {
      // if there is no data or no tinCountry, the options should be empty
      if (!taxTypes.data.length || !formData.tinCountry) {
        setTaxTypeOptions([]);
        return;
      }

      // create a sorted array of active tax types for the given tinCountry
      const activeTaxTypes = new PmArray(...taxTypes.data)
        .filter((tt) => tt.isActive && tt.countryHierarchyReferenceId === formData.tinCountry)
        .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

      // create the options from activeTaxTypes
      const options = activeTaxTypes.map((taxType) => {
        return { value: taxType.id, text: taxType.displayName };
      });

      setTaxTypeOptions(options);
    },
    [formData.tinCountry, taxTypes.data]
  );

  /**
   * when industryHierarchies.data changes
   *  - populate industryNameOptions
   */
  useEffect(
    function populateIndustryNameOptions() {
      // if there is no data, the options should be empty
      if (!industryHierarchies.data.length) {
        setIndustryNameOptions([]);
        return;
      }

      // create a sorted array of unique industry names for active industry hierarchies
      const uniqueIndustryNames = [
        ...new Set(
          industryHierarchies.data
            .filter((ih) => ih.isActive)
            .map((ih) => ih.displayName)
            .sort()
        )
      ];

      // create the options from uniqueIndustryNames
      const options = uniqueIndustryNames.map((industryName) => {
        return { value: industryName, text: industryName };
      });

      setIndustryNameOptions(options);
    },
    [industryHierarchies.data]
  );

  /**
   * when industryName changes
   *  - populate verticalNameOptions
   */
  useEffect(
    function populateVerticalNameOptions() {
      // if there is no data or no industryName, the options should be empty
      if (!industryHierarchies.data.length || !formData.industryName) {
        setVerticalNameOptions([]);
        return;
      }

      // create a sorted array of unique vertical names for active industry hierarchies for the given industryName
      const uniqueVerticalNames = [
        ...new Set(
          industryHierarchies.data
            .filter((ih) => ih.isActive && ih.displayName === formData.industryName)
            .map((ih) => ih.verticalName)
            .sort()
        )
      ];

      // create the options from uniqueVerticalNames
      const options = uniqueVerticalNames.map((verticalName) => {
        return { value: verticalName, text: verticalName };
      });

      setVerticalNameOptions(options);
    },
    [formData.industryName, industryHierarchies.data]
  );

  /**
   * when industryName or verticalName changes
   *  - populate industryHierarchyOptions
   */
  useEffect(
    function populateIndustryHierarchyOptions() {
      // if there is no data or no industryName or no verticalName, the options should be empty
      if (!industryHierarchies.data.length || !formData.industryName || !formData.verticalName) {
        setIndustryHierarchyOptions([]);
        return;
      }

      // create a sorted array of active industry hierarchies for the given industry name and vertical name
      const filteredIndustryHierarchies = new PmArray(...industryHierarchies.data)
        .filter(
          (ih) => ih.isActive && ih.displayName === formData.industryName && ih.verticalName === formData.verticalName
        )
        .sortObjects('subVerticalName', SORT_DIRECTION.ascending.abbreviation);

      // create the options from filteredIndustryHierarchies
      const options = filteredIndustryHierarchies.map((ih) => {
        return { value: ih.id, text: ih.subVerticalName };
      });

      setIndustryHierarchyOptions(options);
    },
    [formData.industryName, formData.verticalName, industryHierarchies.data]
  );

  /**
   * when marketSectors.data changes
   *  - populate marketSectorOptions
   */
  useEffect(
    function populateMarkerSectorOptions() {
      // if there is no data, the options should be empty
      if (!marketSectors.data.length) {
        setMarketSectorOptions([]);
        return;
      }

      // create a sorted array of active market sectors
      const activeMarketSectors = new PmArray(...marketSectors.data)
        .filter((ms) => ms.isActive)
        .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

      // create the options from activeMarketSectors
      const options = activeMarketSectors.map((marketSector) => {
        return { value: marketSector.id, text: marketSector.displayName };
      });

      setMarketSectorOptions(options);
    },
    [marketSectors.data]
  );

  // **********************************************************************
  // * render

  return (
    <>
      <SelectBox
        name="tinCountry"
        label="Taxpayer Identification Number Country"
        value={formData.tinCountry}
        defaultOption="Select a TIN country"
        options={tinCountryOptions}
        isLoading={countries.isLoading}
        loadingText="Loading TIN countries..."
        disabled={disabled}
        onChange={handleInputFieldValueChanged}
      />

      <SelectBox
        name="taxTypeId"
        label="Taxpayer Identification Number Type"
        value={formData.taxTypeId}
        defaultOption="Select a TIN type"
        options={taxTypeOptions}
        isLoading={taxTypes.isLoading}
        loadingText="Loading TIN types..."
        disabled={disabled}
        onChange={handleInputFieldValueChanged}
      />

      {tinFieldOptions.show && tinFieldOptions.type === TIN_FIELD_TYPES.full && (
        <TextBox
          name="taxPayerIdentificationNumber"
          label="Taxpayer Identification Number"
          placeholder="Enter a tin"
          value={formData.taxPayerIdentificationNumber}
          disabled={disabled}
          onChange={handleInputFieldValueChanged}
        />
      )}

      {tinFieldOptions.show && tinFieldOptions.type === TIN_FIELD_TYPES.masked && (
        <ReadonlyFormField
          name="taxPayerIdentificationNumberMasked"
          label="Taxpayer Identification Number"
          value={formData.taxPayerIdentificationNumberMasked}
          icon={
            tinFieldOptions.allowMaskedEdit
              ? {
                  type: 'fa-solid fa-pen-to-square',
                  title: 'Edit taxpayer identification number',
                  className: 'text-info',
                  // todo: implement this when we add functionality for new clients
                  onClick: () => {}
                }
              : null
          }
        />
      )}

      <SelectBox
        name="industryName"
        label="Industry"
        value={formData.industryName}
        defaultOption="Select an industry"
        options={industryNameOptions}
        isLoading={industryHierarchies.isLoading}
        loadingText="Loading industries..."
        disabled={disabled}
        onChange={handleInputFieldValueChanged}
      />

      <SelectBox
        name="verticalName"
        label="Industry Vertical"
        value={formData.verticalName}
        defaultOption="Select a vertical"
        options={verticalNameOptions}
        isLoading={industryHierarchies.isLoading}
        loadingText="Loading industry verticals..."
        disabled={disabled}
        onChange={handleInputFieldValueChanged}
      />

      <SelectBox
        name="industryHierarchyId"
        label="Industry Sub-Vertical"
        value={formData.industryHierarchyId}
        defaultOption="Select a sub-vertical"
        options={industryHierarchyOptions}
        isLoading={industryHierarchies.isLoading}
        loadingText="Loading industry sub-verticals..."
        disabled={disabled}
        onChange={handleInputFieldValueChanged}
      />

      <SelectBox
        name="marketSectorId"
        label="Market Sector"
        value={formData.marketSectorId}
        defaultOption="Select a market sector"
        options={marketSectorOptions}
        isLoading={marketSectors.isLoading}
        loadingText="Loading market sectors..."
        disabled={disabled}
        onChange={handleInputFieldValueChanged}
      />

      <AutoComplete
        name="relationshipPartnerStaffNumber"
        label="Relationship Partner"
        placeholder="Start typing to select a relationship partner"
        selectedItem={selectedRelationshipPartner}
        matches={lookups.staff}
        sourcePropertyNames={relationshipPartnerSourcePropertyNames}
        disabled={disabled}
        onClearData={handleAutoCompleteDataCleared}
        onResetItem={handleAutoCompleteItemReset}
        onSelect={handleAutoCompleteItemSelected}
        onSearch={handleRelationshipPartnerSearch}
      />
    </>
  );
};

ClientDetailsFields = memo(ClientDetailsFields);
ClientDetailsFields.propTypes = propTypes;
ClientDetailsFields.displayName = 'ClientDetailsFields';

export default withNewEngagementInstanceViewData(ClientDetailsFields);
