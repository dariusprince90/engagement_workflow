import { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../../views/withNewEngagementInstanceViewData';

import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import FormHeader from '../../../../../../common/formHeader/FormHeader';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import TextArea from '../../../../components/textArea/TextArea';

let K12EducationIndustryFields = ({ ...propsFromHoc }) => {
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
      <FormHeader text="Industry - K12 Education" name="industryK12Education" />
      <RadioButtonList
        horizontalItems
        name="k12RecurringSignificantFindingsNotCorrected"
        label="1. Has the client had recurring significant findings or questioned costs that have not been corrected?"
        options={YesNoTbdRadioButtonListOptions}
        onChange={handleInputFieldValueChanged}
        selectedValue={formData.k12RecurringSignificantFindingsNotCorrected}
      />
      <TextArea
        name="k12RecurringSignificantFindingsNotCorrectedComments"
        label="If yes, describe:"
        placeholder="Type a value"
        rows={6}
        onChange={handleInputFieldValueChanged}
        value={formData.k12RecurringSignificantFindingsNotCorrectedComments}
      />
      <RadioButtonList
        horizontalItems
        name="k12DifficultPoliticalEnvironment"
        label="2. Does the client have a difficult political environment that could impair our ability to serve the successfully?"
        options={YesNoTbdRadioButtonListOptions}
        onChange={handleInputFieldValueChanged}
        selectedValue={formData.k12DifficultPoliticalEnvironment}
      />
      <TextArea
        name="k12DifficultPoliticalEnvironmentComments"
        label="If yes, describe:"
        placeholder="Type a value"
        rows={6}
        onChange={handleInputFieldValueChanged}
        value={formData.k12DifficultPoliticalEnvironmentComments}
      />
    </>
  );
};

K12EducationIndustryFields = memo(K12EducationIndustryFields);
K12EducationIndustryFields.displayName = 'K12EducationIndustryFields';

export default withNewEngagementInstanceViewData(K12EducationIndustryFields);
