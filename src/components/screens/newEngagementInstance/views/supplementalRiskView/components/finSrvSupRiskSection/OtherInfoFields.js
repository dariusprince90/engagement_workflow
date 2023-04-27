import { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';
import FormText from '../../../../components/formText/FormText';
import TextArea from '../../../../components/textArea/TextArea';

let OtherInfoFields = ({ ...propsFromHoc }) => {
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
      <FormText isLabel>Other Information</FormText>

      <TextArea
        name="fsOtherEvaluationOfExperienceWithBoard"
        label={
          '1. If we know or we have had experience with members of the Board, comment on the experience, ' +
          'including an assessment of the capability of the Board members (especially members of the audit ' +
          'committee). Describe or Indicate N/A:'
        }
        placeholder="Type a value"
        rows={6}
        value={formData.fsOtherEvaluationOfExperienceWithBoard}
        onChange={handleInputFieldValueChanged}
      />

      <TextArea
        name="fsOtherEvaluationOfExperienceWithManagement"
        label={
          '2. If we know or we have had experience with members of the management, comment on the ' +
          'experience, including an assessment of the capability of management. Describe or Indicate N/A:'
        }
        placeholder="Type a value"
        rows={6}
        value={formData.fsOtherEvaluationOfExperienceWithManagement}
        onChange={handleInputFieldValueChanged}
      />

      <TextArea
        name="fsOtherEvaluationOfRegulatoryIssues"
        label="3. Are we aware of any regulatory issues facing the potential client that should be considered? Describe or Indicate N/A:"
        placeholder="Type a value"
        rows={6}
        value={formData.fsOtherEvaluationOfRegulatoryIssues}
        onChange={handleInputFieldValueChanged}
      />

      <TextArea
        name="fsOtherEvaluationOfImpactConsiderations"
        label={
          '4. Based on the financial and other information made available to us, consider whether any of the ' +
          'following items may impact our acceptance decision. Describe or Indicate N/A:'
        }
        placeholder="Type a value"
        rows={6}
        value={formData.fsOtherEvaluationOfImpactConsiderations}
        onChange={handleInputFieldValueChanged}
      />

      <FormText applyEmphasis>
        <ul>
          <li>Unusual growth or decline in size</li>
          <li>Loan losses</li>
          <li>Significant stock or other compensation plans</li>
          <li>Significant internal control weaknesses</li>
        </ul>
      </FormText>

      <TextArea
        name="fsOtherEvaluationOfOtherSignificantMatters"
        label="5. Are there any other significant matters that should be considered? Describe or Indicate N/A:"
        placeholder="Type a value"
        rows={6}
        value={formData.fsOtherEvaluationOfOtherSignificantMatters}
        onChange={handleInputFieldValueChanged}
      />
    </>
  );
};

OtherInfoFields = memo(OtherInfoFields);
OtherInfoFields.displayName = 'OtherInfoFields';

export default withNewEngagementInstanceViewData(OtherInfoFields);
