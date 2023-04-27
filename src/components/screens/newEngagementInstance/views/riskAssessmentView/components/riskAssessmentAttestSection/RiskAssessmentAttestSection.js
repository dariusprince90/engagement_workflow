import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import ATTACHMENT_REFERENCE_TYPES from '../../../../../../../helpers/enums/attachmentReferenceTypes';
import NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS from '../../../../../../../helpers/enums/newEngagementApprovalWorkflowSteps';

import { selectCurrentView, selectCurrentWorkflowStepId } from '../../../../newEngagementInstanceSlice';
import withNewEngagementInstanceViewData from '../../../withNewEngagementInstanceViewData';

import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import TextArea from '../../../../components/textArea/TextArea';
import RadioButtonList from '../../../../components/radioButtonList/RadioButtonList';
import FormHeader from '../../../../../../common/formHeader/FormHeader';
import FormText from '../../../../components/formText/FormText';
import RiskRatingRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/RiskRatingRadioButtonListOptions';
import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import AttachmentsTable from '../../../../components/attachmentsTable/AttachmentsTable';

let RiskAssessmentAttestSection = ({ ...propsFromHoc }) => {
  // **********************************************************************
  // * constants

  /**
   * value which represents YES as a string
   */
  const YES_VALUE = 'Yes';

  const { handleInputFieldValueChanged } = propsFromHoc;
  const { formData } = useSelector(selectCurrentView);
  const currentWorkflowStepId = useSelector(selectCurrentWorkflowStepId);

  // **********************************************************************
  // * component vars

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      usedInCapitalRaisingComments: formData.usedInCapitalRaising === YES_VALUE,
      usedInSignificantTransactionsComments: formData.usedInSignificantTransactions === YES_VALUE,
      newClientsInFinancialDifficultyComments: formData.newClientsInFinancialDifficulty === YES_VALUE,
      mustAcquireSpecialExpertiseComments: formData.mustAcquireSpecialExpertise === YES_VALUE,
      changeInExecutiveManagementComments: formData.changeInExecutiveManagement === YES_VALUE,
      changeInFinancialManagementComments: formData.changeInFinancialManagement === YES_VALUE,
      changeInLegalCouncilComments: formData.changeInLegalCouncil === YES_VALUE,
      legalActionsArePendingComments: formData.legalActionsArePending === YES_VALUE,
      significantManagementDisputesExistComments: formData.significantManagementDisputesExist === YES_VALUE,
      independenceMayBeQuestionedComments: formData.independenceMayBeQuestioned === YES_VALUE,
      potentialConflictOfInterestWithExistingClientComments:
        formData.potentialConflictOfInterestWithExistingClient === YES_VALUE,
      involvedInBusinessFailuresComments: formData.involvedInBusinessFailures === YES_VALUE,
      involvedInFraudComments: formData.involvedInFraud === YES_VALUE,
      entityInvolvedInFraudComments: formData.entityInvolvedInFraud === YES_VALUE,
      requiresOtherFirmsInvolvementComments: formData.requiresOtherFirmsInvolvement === YES_VALUE,
      concernInWithRequiredCommunicationsComments: formData.concernInWithRequiredCommunications === YES_VALUE,
      inAccordanceWithFinancialFrameworkComments: formData.inAccordanceWithFinancialFramework === YES_VALUE,
      anticipatedAssuranceEngagementRiskRating: ![NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.initiatorRework.id].includes(
        currentWorkflowStepId
      ),
      understandingOfRiskImpactComments: ![NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.initiatorRework.id].includes(
        currentWorkflowStepId
      )
    }),
    [
      formData.usedInCapitalRaising,
      formData.usedInSignificantTransactions,
      formData.newClientsInFinancialDifficulty,
      formData.mustAcquireSpecialExpertise,
      formData.changeInExecutiveManagement,
      formData.changeInFinancialManagement,
      formData.changeInLegalCouncil,
      formData.legalActionsArePending,
      formData.significantManagementDisputesExist,
      formData.independenceMayBeQuestioned,
      formData.potentialConflictOfInterestWithExistingClient,
      formData.involvedInBusinessFailures,
      formData.involvedInFraud,
      formData.entityInvolvedInFraud,
      formData.requiresOtherFirmsInvolvement,
      formData.concernInWithRequiredCommunications,
      formData.inAccordanceWithFinancialFramework,
      currentWorkflowStepId
    ]
  );

  /**
   * fields which have conditional disable and whether they are disabled
   */
  const disabledFields = useMemo(
    () => ({
      anticipatedAssuranceEngagementRiskRating: ![
        NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.relationshipPartnerApproval.id
      ].includes(currentWorkflowStepId),
      understandingOfRiskImpactComments: ![
        NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.relationshipPartnerApproval.id
      ].includes(currentWorkflowStepId)
    }),
    [currentWorkflowStepId]
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
        <FormHeader
          text="Any question marked as TBD must be replaced with YES/NO at Relationship Partner Final Approval step."
          name="riskAssessmentAttestFormHeader"
        />
        <RadioButtonList
          horizontalItems
          name="usedInCapitalRaising"
          label={
            "1. Will the new client's financial statements be used in any capital-raising or financial activities " +
            '(private placements of debt or equity interests significant new financing)?'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.usedInCapitalRaising}
        />

        {showFields.usedInCapitalRaisingComments && (
          <TextArea
            name="usedInCapitalRaisingComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.usedInCapitalRaisingComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="usedInSignificantTransactions"
          label={
            "2. Will the new client's financial statements be used in any significant transactions involving new or " +
            'existing owners (merger, acquisition, redemption, or buy-out)?'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.usedInSignificantTransactions}
        />

        {showFields.usedInSignificantTransactionsComments && (
          <TextArea
            name="usedInSignificantTransactionsComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.usedInSignificantTransactionsComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="newClientsInFinancialDifficulty"
          label={
            '3. Is the new client in financial difficulty or is its financial condition deteriorating or questionable? ' +
            'Examples: excessive leverage, equity capital deficiencies, recurring losses, negative cash flow.'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.newClientsInFinancialDifficulty}
        />

        {showFields.newClientsInFinancialDifficultyComments && (
          <TextArea
            name="newClientsInFinancialDifficultyComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.newClientsInFinancialDifficultyComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="mustAcquireSpecialExpertise"
          label={
            '4. Is there any special industry or technical expertise that the Firm, office or proposed engagement ' +
            'partner must acquire in order to perform the engagement?'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.mustAcquireSpecialExpertise}
        />

        {showFields.mustAcquireSpecialExpertiseComments && (
          <TextArea
            name="mustAcquireSpecialExpertiseComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.mustAcquireSpecialExpertiseComments}
          />
        )}

        <FormText isLabel>5. Has there been any recent change in the following:</FormText>
        <RadioButtonList
          horizontalItems
          name="changeInExecutiveManagement"
          label="a. Key executive or operations management directors or ownership?"
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.changeInExecutiveManagement}
        />

        {showFields.changeInExecutiveManagementComments && (
          <TextArea
            name="changeInExecutiveManagementComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.changeInExecutiveManagementComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="changeInFinancialManagement"
          label="b. Key financial management such as chief financial or chief accounting officer or their equivalent?"
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.changeInFinancialManagement}
        />

        {showFields.changeInFinancialManagementComments && (
          <TextArea
            name="changeInFinancialManagementComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.changeInFinancialManagementComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="changeInLegalCouncil"
          label="c. Principal legal council?"
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.changeInLegalCouncil}
        />

        {showFields.changeInLegalCouncilComments && (
          <TextArea
            name="changeInLegalCouncilComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.changeInLegalCouncilComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="legalActionsArePending"
          label="6. Are any significant legal actions pending against the entity or its owners officers or directors?"
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.legalActionsArePending}
        />

        {showFields.legalActionsArePendingComments && (
          <TextArea
            name="legalActionsArePendingComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.legalActionsArePendingComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="significantManagementDisputesExist"
          label="7. Are there any significant management or owner disputes?"
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.significantManagementDisputesExist}
        />

        {showFields.significantManagementDisputesExistComments && (
          <TextArea
            name="significantManagementDisputesExistComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.significantManagementDisputesExistComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="independenceMayBeQuestioned"
          label="8. Is there any reason our independence or objectivity might be questioned?"
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.independenceMayBeQuestioned}
        />

        {showFields.independenceMayBeQuestionedComments && (
          <TextArea
            name="independenceMayBeQuestionedComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.independenceMayBeQuestionedComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="potentialConflictOfInterestWithExistingClient"
          label="9. Could association with the new client create a potential conflict of interest with an existing client?"
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.potentialConflictOfInterestWithExistingClient}
        />

        {showFields.potentialConflictOfInterestWithExistingClientComments && (
          <TextArea
            name="potentialConflictOfInterestWithExistingClientComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.potentialConflictOfInterestWithExistingClientComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="involvedInBusinessFailures"
          label={
            "10. Have any of the new client's management owners, officers or directors been involved in prior " +
            'business failures resulting in losses to their owners or creditors?'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.involvedInBusinessFailures}
        />

        {showFields.involvedInBusinessFailuresComments && (
          <TextArea
            name="involvedInBusinessFailuresComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.involvedInBusinessFailuresComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="involvedInFraud"
          label={
            "11. Have any of the new client's management owners, officers or directors been involved in any fraud or " +
            'other criminal matters?'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.involvedInFraud}
        />

        {showFields.involvedInFraudComments && (
          <TextArea
            name="involvedInFraudComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.involvedInFraudComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="entityInvolvedInFraud"
          label="12. Has the entity been involved in or the victim of significant fraud?"
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.entityInvolvedInFraud}
        />

        {showFields.entityInvolvedInFraudComments && (
          <TextArea
            name="entityInvolvedInFraudComments"
            label="If yes, describe:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.entityInvolvedInFraudComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="isEntityInternationallyActive"
          label="13. Is the entity internationally active?"
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.isEntityInternationallyActive}
        />

        <FormHeader text="Attachments" name="attachmentsFormHeader" />
        <AttachmentsTable attachmentReferenceType={ATTACHMENT_REFERENCE_TYPES.riskAssessmentAttest} />

        <RadioButtonList
          horizontalItems
          name="requiresOtherFirmsInvolvement"
          label={
            '14. Will this engagement require the involvement of other audit firms handling affiliates, ' +
            'joint ventures, inventory observations, etc.?'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.requiresOtherFirmsInvolvement}
        />

        {showFields.requiresOtherFirmsInvolvementComments && (
          <TextArea
            name="requiresOtherFirmsInvolvementComments"
            label={
              'If yes, document the proportion of the group financial statements being audited/reviewed by PM. ' +
              'Also document expected difficulties in obtaining information from component auditors, component ' +
              'management, and/or group management'
            }
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.requiresOtherFirmsInvolvementComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="concernInWithRequiredCommunications"
          label={
            '15. Is there any matter of concern identified in required communications, such as material weaknesses ' +
            'or significant deficiencies in internal control?'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.concernInWithRequiredCommunications}
        />

        {showFields.concernInWithRequiredCommunicationsComments && (
          <TextArea
            name="concernInWithRequiredCommunicationsComments"
            label="If yes, explain:"
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.concernInWithRequiredCommunicationsComments}
          />
        )}

        <RadioButtonList
          horizontalItems
          name="inAccordanceWithFinancialFramework"
          label={
            '16. Will this engagement be performed in accordance with a financial reporting framework other than ' +
            'GAAP or IFRS (cash, tax, regulatory, or contractual basis of accounting)?'
          }
          options={YesNoTbdRadioButtonListOptions}
          onChange={handleInputFieldValueChanged}
          selectedValue={formData.inAccordanceWithFinancialFramework}
        />

        {showFields.inAccordanceWithFinancialFrameworkComments && (
          <TextArea
            name="inAccordanceWithFinancialFrameworkComments"
            label="If yes, explain the purpose for and users of the financial statements prepared in this manner."
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.inAccordanceWithFinancialFrameworkComments}
          />
        )}

        {showFields.anticipatedAssuranceEngagementRiskRating && (
          <RadioButtonList
            horizontalItems
            name="anticipatedAssuranceEngagementRiskRating"
            label={'What is the anticipated Assurance engagement risk rating? A, B, C, D (A=Low Risk. D= Highest Risk)'}
            options={RiskRatingRadioButtonListOptions}
            selectedValue={formData.anticipatedAssuranceEngagementRiskRating}
            onChange={handleInputFieldValueChanged}
            disabled={disabledFields.anticipatedAssuranceEngagementRiskRating}
          />
        )}

        {showFields.understandingOfRiskImpactComments && (
          <TextArea
            name="understandingOfRiskImpactComments"
            label="Explanations/Commentary that will assist approvers in understanding the impact of risks described above."
            placeholder="Type a value"
            rows={6}
            onChange={handleInputFieldValueChanged}
            value={formData.understandingOfRiskImpactComments}
            disabled={disabledFields.understandingOfRiskImpactComments}
          />
        )}
      </div>
    </CollapsibleFormSection>
  );
};

RiskAssessmentAttestSection = memo(RiskAssessmentAttestSection);
RiskAssessmentAttestSection.displayName = 'RiskAssessmentAttestSection';

export default withNewEngagementInstanceViewData(RiskAssessmentAttestSection);
