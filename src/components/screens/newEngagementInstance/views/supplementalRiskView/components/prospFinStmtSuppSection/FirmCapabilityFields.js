import { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';
import FormText from '../../../../components/formText/FormText';
import TextArea from '../../../../components/textArea/TextArea';

let FirmCapabilityFields = ({ ...propsFromHoc }) => {
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
      <FormText isLabel>Firm Capability</FormText>

      <TextArea
        name="pfsFirmEvaluationOfAbilityToProvideService"
        label={
          'Given the nature of the client, its industry and its operating peculiarities, and our ability to staff ' +
          'this engagement, including the relative urgency of the project, provide an evaluation of our ' +
          'ability to adequately service this engagement:'
        }
        placeholder="Type a value"
        rows={6}
        value={formData.pfsFirmEvaluationOfAbilityToProvideService}
        onChange={handleInputFieldValueChanged}
      />
    </>
  );
};

FirmCapabilityFields = memo(FirmCapabilityFields);
FirmCapabilityFields.displayName = 'FirmCapabilityFields';

export default withNewEngagementInstanceViewData(FirmCapabilityFields);
