import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { selectCurrentWorkflowStepId, selectNewEngagementInstance } from '../../newEngagementInstanceSlice';
import NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS from '../../../../../helpers/enums/newEngagementApprovalWorkflowSteps';
import RiskAssessmentAttestSection from './components/riskAssessmentAttestSection/RiskAssessmentAttestSection';
import RiskAssessmentNonAttestSection from './components/riskAssessmentNonAttestSection/RiskAssessmentNonAttestSection';

const RiskAssessmentView = () => {
  // **********************************************************************
  // * constants

  const { isAttest } = useSelector(selectNewEngagementInstance);
  const currentWorkflowStepId = useSelector(selectCurrentWorkflowStepId);

  // **********************************************************************
  // * component vars

  /**
   * sections which have conditional visibility and whether they are shown
   */
  const showSections = useMemo(
    () => ({
      attest:
        isAttest === true &&
        ![
          NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.pmfaPumApproval.id,
          NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.pmiaPartnerApproval.id,
          NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.pmtPartnerApproval.id,
          NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.pumApproval.id
        ].includes(currentWorkflowStepId),
      nonAttest:
        isAttest === false &&
        ![
          NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.industryGroupLeaderApproval.id,
          NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.secApproval.id,
          NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.ebpaApproval.id
        ].includes(currentWorkflowStepId)
    }),
    [currentWorkflowStepId, isAttest]
  );

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <>
      {/* based on nature of service selected either attest or non attest section will be shown */}
      {showSections.attest && <RiskAssessmentAttestSection />}
      {showSections.nonAttest && <RiskAssessmentNonAttestSection />}
    </>
  );
};

export default RiskAssessmentView;
