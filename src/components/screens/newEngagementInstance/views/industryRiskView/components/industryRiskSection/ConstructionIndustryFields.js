import { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../../views/withNewEngagementInstanceViewData';

import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import FormHeader from '../../../../../../common/formHeader/FormHeader';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import TextArea from '../../../../components/textArea/TextArea';

let ConstructionIndustryFields = ({ ...propsFromHoc }) => {
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
      <FormHeader text="Industry - Construction" name="industryConstruction" />
      <RadioButtonList
        horizontalItems
        name="constructionCashFlowInsufficient"
        label="Is the client cashflow inadequate to support current and expected needs?"
        options={YesNoTbdRadioButtonListOptions}
        onChange={handleInputFieldValueChanged}
        selectedValue={formData.constructionCashFlowInsufficient}
      />
      <TextArea
        name="constructionCashFlowInsufficientComments"
        label="If yes, describe:"
        placeholder="Type a value"
        value={formData.constructionCashFlowInsufficientComments}
        rows={6}
        onChange={handleInputFieldValueChanged}
      />
      <RadioButtonList
        horizontalItems
        name="constructionBacklogSufficient"
        label="Is the client backlog insufficient or significantly reduced?"
        options={YesNoTbdRadioButtonListOptions}
        onChange={handleInputFieldValueChanged}
        selectedValue={formData.constructionBacklogSufficient}
      />
      <TextArea
        name="constructionBacklogSufficientComments"
        label="If yes, describe:"
        placeholder="Type a value"
        value={formData.constructionBacklogSufficientComments}
        rows={6}
        onChange={handleInputFieldValueChanged}
      />
      <RadioButtonList
        horizontalItems
        name="constructionInadequateCostSystemOrLargeChangeOrders"
        label="Does the client have an inadequate cost system or recurring large unapproved change order?"
        options={YesNoTbdRadioButtonListOptions}
        onChange={handleInputFieldValueChanged}
        selectedValue={formData.constructionInadequateCostSystemOrLargeChangeOrders}
      />
      <TextArea
        name="constructionInadequateCostSystemOrLargeChangeOrdersComments"
        label="If yes, describe:"
        placeholder="Type a value"
        value={formData.constructionInadequateCostSystemOrLargeChangeOrdersComments}
        rows={6}
        onChange={handleInputFieldValueChanged}
      />
    </>
  );
};

ConstructionIndustryFields = memo(ConstructionIndustryFields);
ConstructionIndustryFields.displayName = 'ConstructionIndustryFields';

export default withNewEngagementInstanceViewData(ConstructionIndustryFields);
