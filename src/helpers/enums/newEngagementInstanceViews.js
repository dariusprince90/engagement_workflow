/* istanbul ignore file -- justification: this is simply an enumeration; no testing needed */

const NEW_ENGAGEMENT_INSTANCE_VIEWS = {
  additionalInformation: { viewId: 'additionalInformation', displayName: 'Additional Information' },
  aicpa: { viewId: 'aicpa', displayName: 'AICPA Independence' },
  billingScheduleSummary: { viewId: 'billingScheduleSummary', displayName: 'Billing Schedule Summary' },
  clientContactDetails: { viewId: 'clientContactDetails', displayName: "Client's Contact Details" },
  clientContacts: { viewId: 'clientContacts', displayName: 'Client Contacts' },
  clientInformation: { viewId: 'clientInformation', displayName: 'Client Information' },
  engagementInformation: { viewId: 'engagementInformation', displayName: 'Engagement Information' },
  finalApproval: { viewId: 'finalApproval', displayName: 'Final Approval' },
  gao: { viewId: 'gao', displayName: 'GAO Independence' },
  industryRisk: { viewId: 'industryRisk', displayName: 'Industry Risk' },
  knowledgeOfClient: { viewId: 'knowledgeOfClient', displayName: 'Knowledge of Client' },
  natureOfService: { viewId: 'natureOfService ', displayName: 'Nature of Service' },
  riskAssessment: { viewId: 'riskAssessment', displayName: 'Risk Assessment' },
  sec: { viewId: 'sec', displayName: 'SEC Independence' },
  selectClient: { viewId: 'selectClient', displayName: 'Select a Client' },
  supplementalRisk: { viewId: 'supplementalRisk', displayName: 'Supplemental Risk' },
  taxRisk: { viewId: 'taxRisk', displayName: 'Tax Risk' },
  workflowComments: { viewId: 'workflowComments', displayName: 'Workflow Comments' },
  workflowHistory: { viewId: 'workflowHistory', displayName: 'Workflow History' }
};

export default Object.freeze(NEW_ENGAGEMENT_INSTANCE_VIEWS);
