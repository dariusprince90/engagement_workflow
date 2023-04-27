import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import CLIENT_SEARCH_TYPES from '../../../../../../helpers/enums/clientSearchTypes';

import { selectCurrentView } from '../../../newEngagementInstanceSlice';
import { searchExistingClients } from '../../../newEngagementInstanceThunks';
import withNewEngagementInstanceViewData from '../../withNewEngagementInstanceViewData';
import AutoComplete from '../../../components/autoComplete/AutoComplete';

let ClientSearch = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const {
    handleAutoCompleteDataCleared,
    handleAutoCompleteItemReset,
    handleAutoCompleteItemSelected,
    handleAutoCompleteSearch
  } = propsFromHoc;

  const { formData, lookups } = useSelector(selectCurrentView);

  // ! - THIS IS TEMPORARY UNTIL WE HAVE STATE IN PLACE
  // * this just allows us to not repeat this block below in every item
  const selectedItem = {
    displayName: '',
    id: ''
  };

  // ! - THIS IS TEMPORARY UNTIL WE HAVE STATE IN PLACE
  // * this just allows us to not repeat this block below in every item
  const initialMatch = {
    data: [],
    isLoading: false,
    error: null
  };

  // **********************************************************************
  // * component vars

  const [showClientNumberField, setShowClientNumberField] = useState(false);
  const [showClientOrgCrmGuidField, setShowClientOrgCrmGuidField] = useState(false);
  const [showClientContactCrmGuidField, setShowClientContactCrmGuidField] = useState(false);

  /**
   * setup the property names for the client number (existing client) AutoComplete
   */
  const existingClientSourcePropertyNames = useMemo(() => {
    return {
      matches: 'clients',
      value: 'clientNumber',
      displayName: 'clientDisplayName'
    };
  }, []);

  /**
   * create the "selected" object for the client number (existing client) AutoComplete
   */
  const selectedExistingClient = useMemo(() => {
    return {
      id: formData.clientNumber,
      displayName: formData.clientDisplayName
    };
  }, [formData.clientDisplayName, formData.clientNumber]);

  // **********************************************************************
  // * functions

  /**
   * Handler for the existing client AutoComplete.
   * @summary This is used in between the AutoComplete and the HOC handleAutoCompleteSearch method so that the
   * search method/thunk from the slice can be passed in.
   */
  const handleExistingClientSearch = useCallback(
    (event, sourcePropertyNames) => handleAutoCompleteSearch(event, sourcePropertyNames, searchExistingClients),
    [handleAutoCompleteSearch]
  );

  // **********************************************************************
  // * side effects

  /**
   * when clientSearchTypeId changes
   *  - show the proper search field based on clientSearchTypeId
   */
  useEffect(
    function showProperClientSearchField() {
      switch (parseInt(formData.clientSearchTypeId)) {
        case CLIENT_SEARCH_TYPES.existing.id:
          setShowClientNumberField(true);
          setShowClientOrgCrmGuidField(false);
          setShowClientContactCrmGuidField(false);
          break;
        case CLIENT_SEARCH_TYPES.newFromCrmOrg.id:
          setShowClientNumberField(false);
          setShowClientOrgCrmGuidField(true);
          setShowClientContactCrmGuidField(false);
          break;
        case CLIENT_SEARCH_TYPES.newFromCrmContact.id:
          setShowClientNumberField(false);
          setShowClientOrgCrmGuidField(false);
          setShowClientContactCrmGuidField(true);
          break;
        default:
          setShowClientNumberField(false);
          setShowClientOrgCrmGuidField(false);
          setShowClientContactCrmGuidField(false);
          break;
      }
    },
    [formData.clientSearchTypeId]
  );

  // **********************************************************************
  // * render

  return (
    <>
      {showClientNumberField && (
        <AutoComplete
          name="clientNumber"
          label="Select an existing client"
          placeholder="Start typing to select a client"
          selectedItem={selectedExistingClient}
          matches={lookups.clients}
          sourcePropertyNames={existingClientSourcePropertyNames}
          onClearData={handleAutoCompleteDataCleared}
          onResetItem={handleAutoCompleteItemReset}
          onSelect={handleAutoCompleteItemSelected}
          onSearch={handleExistingClientSearch}
        />
      )}

      {showClientOrgCrmGuidField && (
        <AutoComplete
          name="clientOrgCrmGuid"
          label="Select a CRM Organization"
          placeholder="Start typing to select a client"
          selectedItem={selectedItem}
          matches={initialMatch}
          onClearData={() => {}}
          onResetItem={() => {}}
          onSearch={() => {}}
          onSelect={() => {}}
        />
      )}

      {showClientContactCrmGuidField && (
        <AutoComplete
          name="clientContactCrmGuid"
          label="Select a CRM Contact"
          placeholder="Start typing to select a client"
          selectedItem={selectedItem}
          matches={initialMatch}
          onClearData={() => {}}
          onResetItem={() => {}}
          onSearch={() => {}}
          onSelect={() => {}}
        />
      )}
    </>
  );
};

ClientSearch = memo(ClientSearch);
ClientSearch.displayName = 'ClientSearch';

export default withNewEngagementInstanceViewData(ClientSearch);
