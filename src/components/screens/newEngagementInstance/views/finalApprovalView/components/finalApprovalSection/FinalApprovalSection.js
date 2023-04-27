import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';
import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import TextArea from '../../../../components/textArea/TextArea';

let FinalApprovalSection = ({ ...propsFromHoc }) => {
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
      conclusionOnWhetherConflictExists: formData.potentialConflictsIdentified === true,
      potentialConflictsIdentifiedComments: formData.potentialConflictsIdentified === true,
      noConflictComments:
        formData.conclusionOnWhetherConflictExists === false && formData.potentialConflictsIdentified === true,
      conflictResolutionComments:
        formData.conclusionOnWhetherConflictExists === true && formData.potentialConflictsIdentified === true
    }),
    [formData.potentialConflictsIdentified, formData.conclusionOnWhetherConflictExists]
  );

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection title="Final Approval">
      <div className="container-fluid">
        <RadioButtonList
          horizontalItems
          name="potentialConflictsIdentified"
          label="Have any potential conflicts been identified during the acceptance process?"
          options={YesNoRadioButtonListOptions}
          selectedValue={formData.potentialConflictsIdentified}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.potentialConflictsIdentifiedComments && (
          <TextArea
            name="potentialConflictsIdentifiedComments"
            label="Describe the potential conflicts in detail"
            placeholder="Type a value"
            value={formData.potentialConflictsIdentifiedComments}
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        {showFields.conclusionOnWhetherConflictExists && (
          <RadioButtonList
            horizontalItems
            name="conclusionOnWhetherConflictExists"
            label={
              'Conclusions and basis for conclusions as to whether a conflict(s) exists. ' +
              'No conflict of interest exists / The described situation does ' +
              'create a conflict of interest '
            }
            options={YesNoRadioButtonListOptions}
            selectedValue={formData.conclusionOnWhetherConflictExists}
            onChange={handleInputFieldValueChanged}
          />
        )}

        {showFields.noConflictComments && (
          <TextArea
            name="noConflictComments"
            label='If No conflict Basis for "No Conflict" conclusion'
            placeholder="Type a value"
            value={formData.noConflictComments}
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        {showFields.conflictResolutionComments && (
          <TextArea
            name="conflictResolutionComments"
            label="If Conflict Describe if and how the Conflict can be resolved"
            placeholder="Type a value"
            value={formData.conflictResolutionComments}
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <TextArea
          name="finalApprovalComments"
          label="Explanations / Commentary relevant to Final Approval/Rejection"
          placeholder="Type a value"
          value={formData.finalApprovalComments}
          rows={6}
          onChange={handleInputFieldValueChanged}
        />
      </div>
    </CollapsibleFormSection>
  );
};

FinalApprovalSection = memo(FinalApprovalSection);
FinalApprovalSection.displayName = 'FinalApprovalSection';

export default withNewEngagementInstanceViewData(FinalApprovalSection);
