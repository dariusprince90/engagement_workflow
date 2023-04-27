import { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';
import FormText from '../../../../components/formText/FormText';
import TextArea from '../../../../components/textArea/TextArea';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';

let FeesAndRealizationFields = ({ ...propsFromHoc }) => {
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
      <FormText isLabel>Fees and Realization</FormText>
      <FormText applyEmphasis>Any TBDs must be replaced with Yes or No by the Final Approval step.</FormText>

      <TextArea
        name="pfsFeesEvaluationOfResponsibleForPaying"
        label="1. Who is responsible for paying our fees?"
        placeholder="Type a value"
        rows={6}
        value={formData.pfsFeesEvaluationOfResponsibleForPaying}
        onChange={handleInputFieldValueChanged}
      />

      <RadioButtonList
        horizontalItems
        name="pfsFeesCollectabilityIsQuestionable"
        label={
          '2. Given our knowledge of the financial strength of the principal parties, is there any question ' +
          'about collectability of our fees if proposed capital-raising transactions are not completed?'
        }
        options={YesNoTbdRadioButtonListOptions}
        selectedValue={formData.pfsFeesCollectabilityIsQuestionable}
        onChange={handleInputFieldValueChanged}
      />

      <RadioButtonList
        horizontalItems
        name="pfsFeesObtainingRetainerWasConsidered"
        label="3. Have we considered obtaining a retainer?"
        options={YesNoTbdRadioButtonListOptions}
        selectedValue={formData.pfsFeesObtainingRetainerWasConsidered}
        onChange={handleInputFieldValueChanged}
      />
    </>
  );
};

FeesAndRealizationFields = memo(FeesAndRealizationFields);
FeesAndRealizationFields.displayName = 'FeesAndRealizationFields';

export default withNewEngagementInstanceViewData(FeesAndRealizationFields);
