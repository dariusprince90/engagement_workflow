/* istanbul ignore file -- justification: this is simply an enumeration; no testing needed */

const ATTACHMENT_REFERENCE_TYPES = {
  knowledgeOfNewClient: {
    id: 1,
    displayName: 'Knowledge of New Client',
    folderName: 'koc-new-client-attachments'
  },
  attestEngagementInformation: {
    id: 2,
    displayName: 'Attest Engagement Information',
    folderName: 'attest-engagement-info-attachments'
  },
  ebpaRisk: {
    id: 3,
    displayName: 'EBPA Risk',
    folderName: 'ebpa-risk-attachments'
  },
  riskAssessmentAttest: {
    id: 4,
    displayName: 'Risk Assessment (attest)',
    folderName: 'risk-assessment-attachments'
  }
};

export default Object.freeze(ATTACHMENT_REFERENCE_TYPES);
