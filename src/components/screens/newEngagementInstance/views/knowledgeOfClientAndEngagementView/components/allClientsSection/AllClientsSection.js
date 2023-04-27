import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';

import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import FormHeader from '../../../../../../common/formHeader/FormHeader';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import TextBox from '../../../../components/textBox/TextBox';
import TextArea from '../../../../components/textArea/TextArea';

let AllClientsSection = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const { handleInputFieldValueChanged } = propsFromHoc;
  const { formData } = useSelector(selectCurrentView);

  // **********************************************************************
  // * component vars

  /**
   * value which represents YES as a string
   */
  const YES_VALUE = 'Yes';

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      internationallyActiveClientCountryName: formData.isClientInternationallyActive === true,
      completedConflictCheck: formData.engagementInvolvesLitigationSupport === true,
      statesInvolved: formData.involvePerformingServicesOutsideOfArea === YES_VALUE
    }),
    [
      formData.involvePerformingServicesOutsideOfArea,
      formData.engagementInvolvesLitigationSupport,
      formData.isClientInternationallyActive
    ]
  );

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection title="All Clients">
      <div className="container-fluid">
        <FormHeader
          name="finalApprovalStepFormHeader"
          text="Any TBDs must be replaced with Yes or No by the Final Approval step."
        />

        <TextBox
          name="creditLimit"
          label="Credit Limit (A/R + WIP):"
          value={formData.creditLimit}
          placeholder="Type a value"
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          horizontalItems
          name="inBankruptcyOrConsideringFiling"
          label="Is the potential new or existing client in bankruptcy or contemplating bankruptcy filing?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.inBankruptcyOrConsideringFiling}
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          horizontalItems
          name="engagementInvolvesLitigationSupport"
          label="Does this engagement involve litigation support?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.engagementInvolvesLitigationSupport}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.completedConflictCheck && (
          <RadioButtonList
            horizontalItems
            name="completedConflictCheck"
            label="If yes, has a completed conflict check form been submitted to FVS?"
            options={YesNoRadioButtonListOptions}
            selectedValue={formData.completedConflictCheck}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="involvePerformingServicesOutsideOfArea"
          label={
            'Will the engagement involve performing services in any state other than Colorado, Illinois, Michigan, ' +
            'or Ohio or in any other country? (If yes, the Licensing Coordinator will be notified to resolve ' +
            'Licensing issues.)'
          }
          options={YesNoTbdRadioButtonListOptions}
          selectedValue={formData.involvePerformingServicesOutsideOfArea}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.statesInvolved && (
          <TextArea
            name="statesInvolved"
            label="If yes, which states/countries?"
            value={formData.statesInvolved}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <TextArea
          name="knowledgeOfClientComments"
          label="Explanations/Commentary to assist approvers in understanding knowledge of client:"
          value={formData.knowledgeOfClientComments}
          placeholder="Type a value"
          rows={6}
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          horizontalItems
          name="isClientInternationallyActive"
          label="Is the client internationally active?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.isClientInternationallyActive}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.internationallyActiveClientCountryName && (
          <TextBox
            name="internationallyActiveClientCountryName"
            label="If yes, indicate which country:"
            value={formData.internationallyActiveClientCountryName}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}
      </div>
    </CollapsibleFormSection>
  );
};

AllClientsSection = memo(AllClientsSection);
AllClientsSection.displayName = 'AllClientsSection';

export default withNewEngagementInstanceViewData(AllClientsSection);
