import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../newEngagementInstanceSlice';
import { searchClients } from '../../newEngagementInstanceThunks';
import withNewEngagementInstanceViewData from '../withNewEngagementInstanceViewData';
import YesNoNaRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/YesNoNaRadioButtonListOptions';
import YesNoTbdRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import CollapsibleFormSection from '../../../../../components/common/collapsibleFormSection/CollapsibleFormSection';
import AutoComplete from '../../components/autoComplete/AutoComplete';
import RadioButtonList from '../../components/radioButtonList/RadioButtonList';
import TextArea from '../../components/textArea/TextArea';
import FormHeader from '../../../../../components/common/formHeader/FormHeader';

let AdditionalInformationView = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  /**
   * value which represents YES as a string
   */
  const YES_VALUE = 'Yes';

  const {
    handleAutoCompleteDataCleared,
    handleAutoCompleteItemReset,
    handleAutoCompleteItemSelected,
    handleAutoCompleteSearch,
    handleInputFieldValueChanged
  } = propsFromHoc;

  const { formData, lookups } = useSelector(selectCurrentView);

  // **********************************************************************
  // * component vars

  /**
   * setup the property names for the parent client AutoComplete
   */
  const parentClientSourcePropertyNames = useMemo(() => {
    return {
      matches: 'clients',
      value: 'parentClientNumber',
      displayName: 'parentClientDisplayName'
    };
  }, []);

  /**
   * create the "selected" object for the parent client AutoComplete
   */
  const selectedParentClient = useMemo(() => {
    return {
      id: formData.parentClientNumber,
      displayName: formData.parentClientDisplayName
    };
  }, [formData.parentClientDisplayName, formData.parentClientNumber]);

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      parentClientNumber: formData.relatedToExistingClient === YES_VALUE,
      externalReferralSourceDiscussedEthicsComments: formData.externalReferralSourceDiscussedEthics === YES_VALUE,
      awareOfPotentialConcernsComments: formData.awareOfPotentialConcerns === YES_VALUE
    }),
    [
      formData.awareOfPotentialConcerns,
      formData.externalReferralSourceDiscussedEthics,
      formData.relatedToExistingClient
    ]
  );

  // **********************************************************************
  // * functions

  /**
   * Handler for the parent client AutoComplete.
   * @summary This is used in between the AutoComplete and the HOC handleAutoCompleteSearch method so that the
   * search method/thunk from the slice can be passed in.
   */
  const handleParentClientSearch = useCallback(
    (event, sourcePropertyNames) => {
      handleAutoCompleteSearch(event, sourcePropertyNames, searchClients);
    },
    [handleAutoCompleteSearch]
  );

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection title="Additional Information">
      <div className="container-fluid">
        <FormHeader text="Any question marked as TBD must be replaced with YES/NO at Relationship Partner Final Approval step." />

        <RadioButtonList
          name="relatedToExistingClient"
          label="Is this client related to an existing client?"
          options={YesNoTbdRadioButtonListOptions}
          selectedValue={formData.relatedToExistingClient}
          horizontalItems
          onChange={handleInputFieldValueChanged}
        />

        {showFields.parentClientNumber && (
          <AutoComplete
            name="parentClientNumber"
            label="If yes, choose its parent client number:"
            placeholder="Start typing to select a parent client"
            selectedItem={selectedParentClient}
            matches={lookups.clients}
            sourcePropertyNames={parentClientSourcePropertyNames}
            onClearData={handleAutoCompleteDataCleared}
            onResetItem={handleAutoCompleteItemReset}
            onSearch={handleParentClientSearch}
            onSelect={handleAutoCompleteItemSelected}
          />
        )}

        <TextArea
          name="opportunityComments"
          label="Describe how we got this opportunity."
          value={formData.opportunityComments}
          placeholder="Type a value"
          rows={6}
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          name="externalReferralSourceDiscussedEthics"
          label={
            'If the opportunity came from an external referral source, did our discussions with the referral source ' +
            "regarding the prospective new client's ethics and integrity in financial reporting and business conduct " +
            'indicate any areas of potential concerns?'
          }
          options={YesNoNaRadioButtonListOptions}
          selectedValue={formData.externalReferralSourceDiscussedEthics}
          horizontalItems
          onChange={handleInputFieldValueChanged}
        />

        {showFields.externalReferralSourceDiscussedEthicsComments && (
          <TextArea
            name="externalReferralSourceDiscussedEthicsComments"
            label="If yes, describe:"
            value={formData.externalReferralSourceDiscussedEthicsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          label="Are we aware of any areas of potential concern regarding the prospective client?"
          name="awareOfPotentialConcerns"
          options={YesNoTbdRadioButtonListOptions}
          selectedValue={formData.awareOfPotentialConcerns}
          horizontalItems
          onChange={handleInputFieldValueChanged}
        />

        {showFields.awareOfPotentialConcernsComments && (
          <TextArea
            name="awareOfPotentialConcernsComments"
            label="If yes, describe:"
            value={formData.awareOfPotentialConcernsComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}
      </div>
    </CollapsibleFormSection>
  );
};

AdditionalInformationView = memo(AdditionalInformationView);
AdditionalInformationView.displayName = 'AdditionalInformationView';

export default withNewEngagementInstanceViewData(AdditionalInformationView);
