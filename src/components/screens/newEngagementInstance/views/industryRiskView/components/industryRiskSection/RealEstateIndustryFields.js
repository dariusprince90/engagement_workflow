import { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../../views/withNewEngagementInstanceViewData';

import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import FormHeader from '../../../../../../common/formHeader/FormHeader';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import TextArea from '../../../../components/textArea/TextArea';

let RealEstateIndustryFields = ({ ...propsFromHoc }) => {
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
      <FormHeader text="Industry - Real Estate" name="industryRealEstate" />
      <RadioButtonList
        horizontalItems
        name="realEstateImpairmentInMarketValue"
        label="Has there been a significant impairment in the market value of Client's property?"
        options={YesNoTbdRadioButtonListOptions}
        onChange={handleInputFieldValueChanged}
        selectedValue={formData.realEstateImpairmentInMarketValue}
      />
      <TextArea
        name="realEstateImpairmentInMarketValueComments"
        label="If yes, describe:"
        placeholder="Type a value"
        rows={6}
        onChange={handleInputFieldValueChanged}
        value={formData.realEstateImpairmentInMarketValueComments}
      />
    </>
  );
};

RealEstateIndustryFields = memo(RealEstateIndustryFields);
RealEstateIndustryFields.displayName = 'RealEstateIndustryFields';

export default withNewEngagementInstanceViewData(RealEstateIndustryFields);
