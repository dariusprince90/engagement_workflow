import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';

import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import TextArea from '../../../../components/textArea/TextArea';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import FormHeader from '../../../../../../common/formHeader/FormHeader';
import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';

let RiskAssessmentNonAttestSection = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  const { handleInputFieldValueChanged } = propsFromHoc;
  const { formData } = useSelector(selectCurrentView);

  // **********************************************************************
  // * component vars

  /**
   * value which represents YES as a string
   */
  const YES_VALUE = 'Yes';

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      potentialForAdversarialPositionComments: formData.potentialForAdversarialPosition === YES_VALUE,
      concernAboutIntegrityOfManagementComments: formData.concernAboutIntegrityOfManagement === YES_VALUE,
      inconsistentWithFirmsFocusComments: formData.inconsistentWithFirmsFocus === YES_VALUE,
      mustAcquireSpecialKnowledgeComments: formData.mustAcquireSpecialKnowledge === YES_VALUE,
      expectationsAppearUnreasonableComments: formData.expectationsAppearUnreasonable === YES_VALUE,
      partneringWithOutsideConsultantComments: formData.partneringWithOutsideConsultant === YES_VALUE,
      mayCreateAdversarialPositionComments: formData.mayCreateAdversarialPosition === YES_VALUE,
      consultantAppearsToNeedStaffComments: formData.consultantAppearsToNeedStaff === YES_VALUE,
      firmWillHaveInsufficientControlComments: formData.firmWillHaveInsufficientControl === YES_VALUE,
      isEntityInternationallyActiveComments: formData.isEntityInternationallyActive === YES_VALUE
    }),
    [
      formData.potentialForAdversarialPosition,
      formData.concernAboutIntegrityOfManagement,
      formData.inconsistentWithFirmsFocus,
      formData.mustAcquireSpecialKnowledge,
      formData.expectationsAppearUnreasonable,
      formData.partneringWithOutsideConsultant,
      formData.mayCreateAdversarialPosition,
      formData.consultantAppearsToNeedStaff,
      formData.firmWillHaveInsufficientControl,
      formData.isEntityInternationallyActive
    ]
  );

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection title="Risk Assessment">
      <div className="container-fluid">
        <FormHeader text="Any question marked as TBD must be replaced with YES/NO at Relationship Partner Final Approval step." />

        <RadioButtonList
          horizontalItems
          name="anyQuestionAboutCollectibility"
          label={
            '1. Given our knowledge of the financial strength of the client, is there any question about collectibility ' +
            'of our fees? Note : Consider conducting a formal credit check, collecting a retainer or setting credit ' +
            'limits if financial strength is questionable'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.anyQuestionAboutCollectibility}
        />

        <RadioButtonList
          horizontalItems
          name="potentialForAdversarialPosition"
          label={
            '2. Do we believe involvement with this client will create a potential for an adversarial position with ' +
            'another client or with another practice area in the firm?'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.potentialForAdversarialPosition}
        />

        {showFields.potentialForAdversarialPositionComments && (
          <TextArea
            name="potentialForAdversarialPositionComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.potentialForAdversarialPositionComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="concernAboutIntegrityOfManagement"
          label={
            '3. Do we believe there is reason for concern about the integrity of management or other client ' +
            'personnel involved in the engagement(s)?'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.concernAboutIntegrityOfManagement}
        />

        {showFields.concernAboutIntegrityOfManagementComments && (
          <TextArea
            name="concernAboutIntegrityOfManagementComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.concernAboutIntegrityOfManagementComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="inconsistentWithFirmsFocus"
          label={
            "4. Will acceptance of the engagement(s) be inconsistent with the firm's Focus & Choices strategic " +
            'planning goal?'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.inconsistentWithFirmsFocus}
        />

        {showFields.inconsistentWithFirmsFocusComments && (
          <TextArea
            name="inconsistentWithFirmsFocusComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.inconsistentWithFirmsFocusComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="mustAcquireSpecialKnowledge"
          label={
            '5. Does the Firm, the proposed engagement partner and engagement team currently need to acquire ' +
            'specialized knowledge and expertise necessary to complete the project(s)?'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.mustAcquireSpecialKnowledge}
        />

        {showFields.mustAcquireSpecialKnowledgeComments && (
          <TextArea
            name="mustAcquireSpecialKnowledgeComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.mustAcquireSpecialKnowledgeComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="expectationsAppearUnreasonable"
          label={
            "6. Do the client's expectations of the outcomes of the project(s) appear unreasonable and unachievable? " +
            "In responding, consider: top management's commitment of resources and implementation ability in " +
            'terms of client staff acceptance, levels, and knowledge and skills.'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.expectationsAppearUnreasonable}
        />

        {showFields.expectationsAppearUnreasonableComments && (
          <TextArea
            name="expectationsAppearUnreasonableComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.expectationsAppearUnreasonableComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="partneringWithOutsideConsultant"
          label={
            '7. Are we partnering with or subcontracting to an outside consultant? NOTE: Consult with engagement ' +
            'partner about the Process for Approval of Strategic Business Alliances or Affiliation Agreements ' +
            'approved by Policy Committee and related implementation guidance.'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.partneringWithOutsideConsultant}
        />

        {showFields.partneringWithOutsideConsultantComments && (
          <TextArea
            name="partneringWithOutsideConsultantComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.partneringWithOutsideConsultantComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="mayCreateAdversarialPosition"
          label={
            'a. Do we believe this arrangement will create a potential for an adversarial position between the ' +
            'outside consultant and the client?'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.mayCreateAdversarialPosition}
        />

        {showFields.mayCreateAdversarialPositionComments && (
          <TextArea
            name="mayCreateAdversarialPositionComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.mayCreateAdversarialPositionComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="consultantAppearsToNeedStaff"
          label={
            'b. Does the outside consultant appear to need the necessary staff, knowledge, and specific ' +
            'expertise to complete the engagement?'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.consultantAppearsToNeedStaff}
        />

        {showFields.consultantAppearsToNeedStaffComments && (
          <TextArea
            name="consultantAppearsToNeedStaffComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.consultantAppearsToNeedStaffComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="firmWillHaveInsufficientControl"
          label="c. Will the Firm have sufficient control of the project to ensure successful completion?"
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.firmWillHaveInsufficientControl}
        />

        {showFields.firmWillHaveInsufficientControlComments && (
          <TextArea
            name="firmWillHaveInsufficientControlComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.firmWillHaveInsufficientControlComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="isEntityInternationallyActive"
          label="8. Is the entity internationally active?"
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.isEntityInternationallyActive}
        />

        {showFields.isEntityInternationallyActiveComments && (
          <TextArea
            name="isEntityInternationallyActiveComments"
            label={
              "If yes, describe how our work will involve client's international activity and how we expect to " +
              "handle client's international needs"
            }
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.isEntityInternationallyActiveComments}
          />
        )}

        <TextArea
          name="understandingOfRiskImpactComments"
          label="Explanations/Commentary that will assist approvers in understanding the impact of risks described above."
          placeholder="Type a value"
          rows={6}
          onChange={handleInputFieldValueChanged}
          value={formData.understandingOfRiskImpactComments}
        />
      </div>
    </CollapsibleFormSection>
  );
};

RiskAssessmentNonAttestSection = memo(RiskAssessmentNonAttestSection);
RiskAssessmentNonAttestSection.displayName = 'RiskAssessmentNonAttestSection';

export default withNewEngagementInstanceViewData(RiskAssessmentNonAttestSection);
