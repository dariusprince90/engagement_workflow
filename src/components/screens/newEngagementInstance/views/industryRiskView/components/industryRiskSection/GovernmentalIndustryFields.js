import { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';

import FormHeader from '../../../../../../common/formHeader/FormHeader';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import TextArea from '../../../../components/textArea/TextArea';

let GovernmentalIndustryFields = ({ ...propsFromHoc }) => {
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
      <FormHeader
        text='Industry - "Governmental" / "Higher education" / "Not For Profit Other"'
        name="industryGovernmental"
      />

      <RadioButtonList
        horizontalItems
        name="governmentalRecurringSignificant"
        label="1. Has the client had recurring significant findings or questioned costs that have not been corrected?"
        options={YesNoTbdRadioButtonListOptions}
        onChange={handleInputFieldValueChanged}
        selectedValue={formData.governmentalRecurringSignificant}
      />

      <TextArea
        name="governmentalRecurringSignificantComments"
        label="If yes, describe:"
        placeholder="Type a value"
        value={formData.governmentalRecurringSignificantComments}
        rows={6}
        onChange={handleInputFieldValueChanged}
      />

      <RadioButtonList
        horizontalItems
        name="governmentalDifficultPoliticalEnvironment"
        label="2. Does the client have a difficult political environment that could impair our ability to serve them successfully?"
        options={YesNoTbdRadioButtonListOptions}
        onChange={handleInputFieldValueChanged}
        selectedValue={formData.governmentalDifficultPoliticalEnvironment}
      />

      <TextArea
        name="governmentalDifficultPoliticalEnvironmentComments"
        label="If yes, describe:"
        placeholder="Type a value"
        value={formData.governmentalDifficultPoliticalEnvironmentComments}
        rows={6}
        onChange={handleInputFieldValueChanged}
      />
    </>
  );
};

GovernmentalIndustryFields = memo(GovernmentalIndustryFields);
GovernmentalIndustryFields.displayName = 'GovernmentalIndustryFields';

export default withNewEngagementInstanceViewData(GovernmentalIndustryFields);
