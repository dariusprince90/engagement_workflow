import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';
import FormText from '../../../../components/formText/FormText';
import TextArea from '../../../../components/textArea/TextArea';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';

let UnderstandingClientFields = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  /**
   * value which represents No as a string
   */
  const NO_VALUE = 'No';

  const { handleInputFieldValueChanged } = propsFromHoc;

  const { formData } = useSelector(selectCurrentView);

  // **********************************************************************
  // * component vars

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      pfsClientAreContinuingAccountantsComments: formData.pfsClientAreContinuingAccountants === NO_VALUE
    }),
    [formData.pfsClientAreContinuingAccountants]
  );

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <>
      <FormText isLabel>Understanding of the Client</FormText>
      <FormText applyEmphasis>Any TBDs must be replaced with Yes or No by the Final Approval step.</FormText>

      <RadioButtonList
        horizontalItems
        name="pfsClientAreContinuingAccountants"
        label="1. Are we the continuing accountants?"
        options={YesNoTbdRadioButtonListOptions}
        selectedValue={formData.pfsClientAreContinuingAccountants}
        onChange={handleInputFieldValueChanged}
      />

      {showFields.pfsClientAreContinuingAccountantsComments && (
        <TextArea
          name="pfsClientAreContinuingAccountantsComments"
          label="If NO, describe the reason for not using continuing accountants."
          placeholder="Type a value"
          rows={6}
          value={formData.pfsClientAreContinuingAccountantsComments}
          onChange={handleInputFieldValueChanged}
        />
      )}

      <RadioButtonList
        horizontalItems
        name="pfsClientHasContactedReferralSources"
        label={
          '2. Have we contacted referral sources or other professionals, including the other professionals, ' +
          'involved in any capital raise, to investigate the background of the potential new client?'
        }
        options={YesNoTbdRadioButtonListOptions}
        selectedValue={formData.pfsClientHasContactedReferralSources}
        onChange={handleInputFieldValueChanged}
      />

      <RadioButtonList
        horizontalItems
        name="pfsClientIdentifiedConcerns"
        label="3. Did our investigation identify any concerns with the ethics and integrity of the potential new client?"
        options={YesNoTbdRadioButtonListOptions}
        selectedValue={formData.pfsClientIdentifiedConcerns}
        onChange={handleInputFieldValueChanged}
      />

      <TextArea
        name="pfsClientEvaluationOfFinancialStrengthOfPrincipalParties"
        label="4. Provide an evaluation of the financial strength of the principal parties."
        placeholder="Type a value"
        rows={6}
        value={formData.pfsClientEvaluationOfFinancialStrengthOfPrincipalParties}
        onChange={handleInputFieldValueChanged}
      />

      <FormText isLabel>
        5. Management must assume responsibility for the prospective financial statements and have the ability to
        determine the appropriateness of assumptions. To evaluating management's ability, we should consider the
        following factors:
      </FormText>

      <TextArea
        name="pfsClientEvaluationOfConsideringNatureOfIndustry"
        label={
          "- The nature of the industry and predictability of the company's operations. (The financial results of " +
          'certain industries may be subject to extreme fluctuation. Furthermore, such characteristics may be ' +
          'further evident within the company itself.)'
        }
        placeholder="Type a value"
        rows={6}
        value={formData.pfsClientEvaluationOfConsideringNatureOfIndustry}
        onChange={handleInputFieldValueChanged}
      />

      <TextArea
        name="pfsClientEvaluationOfConsideringCompanysHistory"
        label="- The company's history/operations."
        placeholder="Type a value"
        rows={6}
        value={formData.pfsClientEvaluationOfConsideringCompanysHistory}
        onChange={handleInputFieldValueChanged}
      />

      <TextArea
        name="pfsClientEvaluationOfConsideringNewVentures"
        label="- New ventures without an operating history may not be able to establish a basis for developing reasonable assumptions."
        placeholder="Type a value"
        rows={6}
        value={formData.pfsClientEvaluationOfConsideringNewVentures}
        onChange={handleInputFieldValueChanged}
      />

      <TextArea
        name="pfsClientEvaluationOfLengthOfPeriodCovered"
        label={
          '6. What is the length of the period covered by the prospective financial statements? Generally speaking, ' +
          'the reliability of prospective financial statements decreases in direct proportion to the length of the ' +
          'period covered. In some cases, a client may not have a reasonable basis for forecasting periods of ' +
          'more than 3 to 5 years. However, certain industries (e.g., certain real estate) may be highly predictable ' +
          "over a long period. Indicate management's knowledge of the industry based upon its experience and " +
          "other factors. Assess management's ability to determine appropriate assumptions and the extent to " +
          'which management may have to rely on us to help them develop such assumptions.'
        }
        placeholder="Type a value"
        rows={6}
        value={formData.pfsClientEvaluationOfLengthOfPeriodCovered}
        onChange={handleInputFieldValueChanged}
      />
    </>
  );
};

UnderstandingClientFields = memo(UnderstandingClientFields);
UnderstandingClientFields.displayName = 'UnderstandingClientFields';

export default withNewEngagementInstanceViewData(UnderstandingClientFields);
