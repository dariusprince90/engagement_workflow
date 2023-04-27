import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';

import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import FormHeader from '../../../../../../common/formHeader/FormHeader';
import FormText from '../../../../components/formText/FormText';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import TextArea from '../../../../components/textArea/TextArea';

let ConflictAssessmentSection = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const { handleInputFieldValueChanged } = propsFromHoc;
  const { formData } = useSelector(selectCurrentView);

  // **********************************************************************
  // * component vars

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      potentialConflictComments: formData.potentialConflictsExist === true
    }),
    [formData.potentialConflictsExist]
  );

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection title="Conflict Assessment">
      <div className="container-fluid">
        <FormHeader text="Initial Conflicts" />

        <RadioButtonList
          horizontalItems
          name="potentialConflictsExist"
          label="Are there any potential conflicts of interest in conjunction with this proposed engagement?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.potentialConflictsExist}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.potentialConflictComments && (
          <TextArea
            name="potentialConflictComments"
            label="If yes, describe potential conflict in detail:"
            value={formData.potentialConflictComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <FormText applyEmphasis>
          Note: If conflicts arise during the approval process, use Final Conflict Check area to document them.
        </FormText>

        <RadioButtonList
          horizontalItems
          name="requestDopsReview"
          label="Do you want to request a Director of Professional Standards review?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.requestDopsReview}
          onChange={handleInputFieldValueChanged}
        />
      </div>
    </CollapsibleFormSection>
  );
};

ConflictAssessmentSection = memo(ConflictAssessmentSection);
ConflictAssessmentSection.displayName = 'ConflictAssessmentSection';

export default withNewEngagementInstanceViewData(ConflictAssessmentSection);
