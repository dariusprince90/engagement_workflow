import { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';
import FormText from '../../../../components/formText/FormText';
import TextArea from '../../../../components/textArea/TextArea';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';

let UnderstandingEngagementFields = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const { handleInputFieldValueChanged } = propsFromHoc;

  const { formData } = useSelector(selectCurrentView);

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <>
      <FormText isLabel>Understanding of the Engagement</FormText>

      <FormText applyEmphasis>
        Any question marked as TBD must be replaced with YES/NO at Relationship Partner Final Approval step.
      </FormText>

      <TextArea
        name="pfsEngagementEvaluationOfIntendedUse"
        label="1. What is the intended use for the prospective financial statements?"
        placeholder="Type a value"
        rows={6}
        value={formData.pfsEngagementEvaluationOfIntendedUse}
        onChange={handleInputFieldValueChanged}
      />

      <TextArea
        name="pfsEngagementEvaluationOfCapitalRaisingActivities"
        label={
          '2. If the prospective financial statements are being prepared for use in capital-raising activities ' +
          '(debt or equity), describe in detail the nature, size and timing of the capital raise.'
        }
        placeholder="Type a value"
        rows={6}
        value={formData.pfsEngagementEvaluationOfCapitalRaisingActivities}
        onChange={handleInputFieldValueChanged}
      />

      <RadioButtonList
        horizontalItems
        name="pfsEngagementHasPlannedPublicOffering"
        label="3. Is there a planned public offering?"
        options={YesNoTbdRadioButtonListOptions}
        selectedValue={formData.pfsEngagementHasPlannedPublicOffering}
        onChange={handleInputFieldValueChanged}
      />

      <RadioButtonList
        horizontalItems
        name="pfsEngagementHasPlannedPrivateOffering"
        label="4. Is there a planned private offering?"
        options={YesNoTbdRadioButtonListOptions}
        selectedValue={formData.pfsEngagementHasPlannedPrivateOffering}
        onChange={handleInputFieldValueChanged}
      />

      <RadioButtonList
        horizontalItems
        name="pfsEngagementPrivateOfferingIsLimited"
        label='5. Will any private offering be limited to "sophisticated investors" or financially "qualified investors"?'
        options={YesNoTbdRadioButtonListOptions}
        selectedValue={formData.pfsEngagementPrivateOfferingIsLimited}
        onChange={handleInputFieldValueChanged}
      />

      <TextArea
        name="pfsEngagementEvaluationOfOtherProfessionalsInvolved"
        label="6. Identify the other professionals that will be involved in the capital raise (lawyers, underwriters, etc..):"
        placeholder="Type a value"
        rows={6}
        value={formData.pfsEngagementEvaluationOfOtherProfessionalsInvolved}
        onChange={handleInputFieldValueChanged}
      />

      <RadioButtonList
        horizontalItems
        name="pfsEngagementHasInsufficientAssets"
        label={
          '7. Compare the proposed capital raise with the value of existing or potential collateral. If the deal ' +
          'goes bad, will there be insufficient assets or collateral to fully satisfy investors, thereby increasing our risk?'
        }
        options={YesNoTbdRadioButtonListOptions}
        selectedValue={formData.pfsEngagementHasInsufficientAssets}
        onChange={handleInputFieldValueChanged}
      />

      <TextArea
        name="pfsEngagementEvaluationOfEconomicSubstance"
        label="8. Provide an evaluation of the overall economic substance of the project or transaction."
        placeholder="Type a value"
        rows={6}
        value={formData.pfsEngagementEvaluationOfEconomicSubstance}
        onChange={handleInputFieldValueChanged}
      />

      <RadioButtonList
        horizontalItems
        name="pfsEngagementIsLimitedToInternalUse"
        label={
          '9. Will the prospective financial statements be limited exclusively to internal use only ' +
          'and is that expectation reasonable in the circumstances?'
        }
        options={YesNoTbdRadioButtonListOptions}
        selectedValue={formData.pfsEngagementIsLimitedToInternalUse}
        onChange={handleInputFieldValueChanged}
      />
    </>
  );
};

UnderstandingEngagementFields = memo(UnderstandingEngagementFields);
UnderstandingEngagementFields.displayName = 'UnderstandingEngagementFields';

export default withNewEngagementInstanceViewData(UnderstandingEngagementFields);
