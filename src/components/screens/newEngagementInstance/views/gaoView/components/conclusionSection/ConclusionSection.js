import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';
import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import FormText from '../../../../components/formText/FormText';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import TextArea from '../../../../components/textArea/TextArea';

let ConclusionSection = ({ ...propsFromHoc }) => {
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
    () => ({ projectRequiresMoreThan40HoursComments: formData.projectRequiresMoreThan40Hours === true }),
    [formData.projectRequiresMoreThan40Hours]
  );

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection title="Conclusion - Effect of Services on Independence">
      <div className="container-fluid">
        <RadioButtonList
          name="willImpairIndependence"
          label="16. Based on the above analysis, the proposed engagement(s) Will, Will Not  impair our independence."
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.willImpairIndependence}
          onChange={handleInputFieldValueChanged}
        />

        <TextArea
          name="basisForConclusion"
          label="Basis for conclusion:"
          value={formData.basisForConclusion}
          placeholder="Type a value"
          rows={6}
          onChange={handleInputFieldValueChanged}
        />

        <FormText applyEmphasis>
          GAO rules state that members of the audit team may not work on a non-attest engagement unless the engagement
          is dominium's in nature, it involves only routine matters, or involves matters that are not significant to the
          audit. The following questions are designed to identify whether audit team participation is permitted.
        </FormText>

        <RadioButtonList
          name="projectRequiresMoreThan40Hours"
          label="17. Will the project require more than 40 hours (in total from all participants) to complete?"
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.projectRequiresMoreThan40Hours}
          onChange={handleInputFieldValueChanged}
        />

        {showFields.projectRequiresMoreThan40HoursComments && (
          <TextArea
            name="projectRequiresMoreThan40HoursComments"
            label="If yes, Describe:"
            value={formData.projectRequiresMoreThan40HoursComments}
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
          />
        )}

        <RadioButtonList
          name="projectInvolvesMoreThanRoutineAdvice"
          label={
            '18. Will the project involve something more than providing routine advice regarding accounting, internal ' +
            'control or financial matters or preparation of routine tax filings?'
          }
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.projectInvolvesMoreThanRoutineAdvice}
          onChange={handleInputFieldValueChanged}
        />

        <RadioButtonList
          name="subjectMatterOfNonAttestIsRelated"
          label={
            '19. Is the subject matter of the non-attest engagement related to or significant to the subject ' +
            'matter of any PM audit or assurance services?'
          }
          options={YesNoRadioButtonListOptions}
          horizontalItems
          selectedValue={formData.subjectMatterOfNonAttestIsRelated}
          onChange={handleInputFieldValueChanged}
        />

        <FormText applyEmphasis>
          If the answer to #17 above is Yes and the answer to either #18 or #19 is yes, audit team members may not
          participate in the non-attest engagement
        </FormText>
      </div>
    </CollapsibleFormSection>
  );
};

ConclusionSection = memo(ConclusionSection);
ConclusionSection.displayName = 'ConclusionSection';

export default withNewEngagementInstanceViewData(ConclusionSection);
