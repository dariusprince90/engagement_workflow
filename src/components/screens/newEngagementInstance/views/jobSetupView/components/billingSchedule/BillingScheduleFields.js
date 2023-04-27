import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import { searchClients } from '../../../../newEngagementInstanceThunks';

import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';
import AutoComplete from '../../../../components/autoComplete/AutoComplete';
import FormText from '../../../../components/formText/FormText';

let BillingScheduleFields = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const {
    handleAutoCompleteDataCleared,
    handleAutoCompleteItemReset,
    handleAutoCompleteItemSelected,
    handleAutoCompleteSearch
  } = propsFromHoc;

  const { formData, lookups } = useSelector(selectCurrentView);

  // **********************************************************************
  // * component vars

  /**
   * setup the property names for the bill-to client AutoComplete
   */
  const billToClientNumberSourcePropertyNames = useMemo(
    () => ({
      matches: 'clients',
      value: 'billToClientNumber',
      displayName: 'billToClientDisplayName'
    }),
    []
  );

  /**
   * create the "selected" object for the bill-to client AutoComplete
   */
  const selectedBillToClient = useMemo(
    () => ({ id: formData.billToClientNumber, displayName: formData.billToClientDisplayName }),
    [formData.billToClientDisplayName, formData.billToClientNumber]
  );

  // **********************************************************************
  // * functions

  /**
   * Handler for the bill-to client AutoComplete.
   * @summary This is used in between the AutoComplete and the HOC handleAutoCompleteSearch method so that the
   * search method/thunk from the slice can be passed in.
   */
  const handleBillToClientSearch = useCallback(
    (event, sourcePropertyNames) => handleAutoCompleteSearch(event, sourcePropertyNames, searchClients),
    [handleAutoCompleteSearch]
  );

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <>
      <AutoComplete
        name="billToClientNumber"
        label="Bill To:"
        placeholder="Start typing to select a client"
        selectedItem={selectedBillToClient}
        matches={lookups.clients}
        sourcePropertyNames={billToClientNumberSourcePropertyNames}
        onClearData={handleAutoCompleteDataCleared}
        onResetItem={handleAutoCompleteItemReset}
        onSelect={handleAutoCompleteItemSelected}
        onSearch={handleBillToClientSearch}
      />

      <FormText isLabel>
        Either select an existing billing schedule to add this job to or choose to create a new billing schedule
      </FormText>
    </>
  );
};

BillingScheduleFields = memo(BillingScheduleFields);
BillingScheduleFields.displayName = 'BillingScheduleFields';

export default withNewEngagementInstanceViewData(BillingScheduleFields);
