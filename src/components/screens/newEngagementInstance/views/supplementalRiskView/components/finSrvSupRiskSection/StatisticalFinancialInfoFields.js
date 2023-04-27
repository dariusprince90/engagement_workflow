import { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';
import FormText from '../../../../components/formText/FormText';
import TextBox from '../../../../components/textBox/TextBox';
let StatisticalFinancialInfoFields = ({ ...propsFromHoc }) => {
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
      <FormText isLabel>Statistical/Financial Information</FormText>

      <TextBox
        name="fsStatsTotalAssets"
        label="Total Assets"
        placeholder="Type a numeric value"
        value={formData.fsStatsTotalAssets}
        onChange={handleInputFieldValueChanged}
      />

      <TextBox
        name="fsStatsLoans"
        label="Loans"
        placeholder="Type a numeric value"
        value={formData.fsStatsLoans}
        onChange={handleInputFieldValueChanged}
      />

      <TextBox
        name="fsStatsInvestments"
        label="Investments"
        placeholder="Type a numeric value"
        value={formData.fsStatsInvestments}
        onChange={handleInputFieldValueChanged}
      />

      <TextBox
        name="fsStatsTotalEquity"
        label="Total Equity"
        placeholder="Type a numeric value"
        value={formData.fsStatsTotalEquity}
        onChange={handleInputFieldValueChanged}
      />

      <TextBox
        name="fsStatsCamelRating"
        label="CAMEL Rating"
        placeholder="Type a numeric value"
        value={formData.fsStatsCamelRating}
        onChange={handleInputFieldValueChanged}
      />

      <TextBox
        name="fsStatsCapitalRatio"
        label="Capital Ratio"
        placeholder="Type a numeric value"
        value={formData.fsStatsCapitalRatio}
        onChange={handleInputFieldValueChanged}
      />

      <TextBox
        name="fsStatsRoa"
        label="ROA"
        placeholder="Type a numeric value"
        value={formData.fsStatsRoa}
        onChange={handleInputFieldValueChanged}
      />

      <TextBox
        name="fsStatsRoe"
        label="ROE"
        placeholder="Type a numeric value"
        value={formData.fsStatsRoe}
        onChange={handleInputFieldValueChanged}
      />

      <TextBox
        name="fsStatsNumberOfShareholders"
        label="Number Of Shareholders:"
        placeholder="Type a numeric value"
        value={formData.fsStatsNumberOfShareholders}
        onChange={handleInputFieldValueChanged}
      />

      <TextBox
        name="fsStatsPercentageOfStockOwned"
        label="Percentage of stock owned by insiders:"
        placeholder="Type a numeric value"
        value={formData.fsStatsPercentageOfStockOwned}
        onChange={handleInputFieldValueChanged}
      />
    </>
  );
};

StatisticalFinancialInfoFields = memo(StatisticalFinancialInfoFields);
StatisticalFinancialInfoFields.displayName = 'StatisticalFinancialInfoFields';

export default withNewEngagementInstanceViewData(StatisticalFinancialInfoFields);
