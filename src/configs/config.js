/* istanbul ignore file -- justification: this is simply a configuration file; no testing needed */

const CompanyAadTenantId = '64591f40-df92-4ba4-b17a-b8f7aac94a4e';

export const App = {
  version: process.env.REACT_APP__VERSION
};

export const MSAL = {
  webApp: {
    clientId: process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_FRONT_END_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${CompanyAadTenantId}`
  },

  centralDataStoreApi: {
    apiUrl: process.env.REACT_APP__CENTRAL_DATA_STORE_API_URL,
    scopes: [
      `${process.env.REACT_APP__CENTRAL_DATA_STORE_API_APP_ID_URI}/access_as_user`,
      `${process.env.REACT_APP__CENTRAL_DATA_STORE_API_APP_ID_URI}/AllowablePartnerRoleAssignments_Read`,
      `${process.env.REACT_APP__CENTRAL_DATA_STORE_API_APP_ID_URI}/BillingSchedules_Read`,
      `${process.env.REACT_APP__CENTRAL_DATA_STORE_API_APP_ID_URI}/Clients_Read`,
      `${process.env.REACT_APP__CENTRAL_DATA_STORE_API_APP_ID_URI}/Contracts_Read`,
      `${process.env.REACT_APP__CENTRAL_DATA_STORE_API_APP_ID_URI}/ContractLines_Read`,
      `${process.env.REACT_APP__CENTRAL_DATA_STORE_API_APP_ID_URI}/Jobs_Read`,
      `${process.env.REACT_APP__CENTRAL_DATA_STORE_API_APP_ID_URI}/Staff_Read`
    ]
  },

  dataGovernanceConversionApi: {
    apiUrl: process.env.REACT_APP__DATA_GOVERNANCE_CONVERSION_API_URL,
    scopes: [
      `${process.env.REACT_APP__DATA_GOVERNANCE_CONVERSION_API_APP_ID_URI}/access_as_user`,
      `${process.env.REACT_APP__DATA_GOVERNANCE_CONVERSION_API_APP_ID_URI}/ClientEntities_Read`
    ]
  },

  newEngagementWorkflowApi: {
    apiUrl: process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_URL,
    scopes: [
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/access_as_user`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/AttachmentInfoResponses.AzureStorageSasTokens_Create`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/AttachmentInfoResponses_ReadWrite`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/AttachmentTypes_Read`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/AttestEngagementInfoResponses_ReadWrite`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/ClientSearchTypes_Read`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/FinalApprovalResponses_ReadWrite`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/GaoResponses_ReadWrite`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/IncompatibleNaturesOfServices_Read`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/IndustryRiskResponses_ReadWrite`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/InitialSetupResponses_ReadWrite`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/JobInfoResponses_ReadWrite`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/JobRoles_ReadWrite`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/KnowledgeOfClientAllClientsResponses_ReadWrite`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/KnowledgeOfClientNewClientsResponses_ReadWrite`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/NatureOfServiceJobHierarchyMaps_Read`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/NaturesOfServices_Read`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/NewBillingSchedules_ReadWrite`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/NewEngagementInstances_ReadWrite`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/PmDetailsResponses_ReadWrite`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/SecResponses_ReadWrite`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/SubjectToSecOrGaoRules_Read`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/SupplementalRiskResponses_ReadWrite`,
      `${process.env.REACT_APP__NEW_ENGAGEMENT_WORKFLOW_API_APP_ID_URI}/TaxRiskResponses_ReadWrite`
    ]
  },

  workflowPlatformApi: {
    apiUrl: process.env.REACT_APP__PM_WORKFLOW_PLATFORM_API_URL,
    scopes: [`${process.env.REACT_APP__PM_WORKFLOW_PLATFORM_API_APP_ID_URI}/access_as_user`]
  }
};

export const AppInsights = {
  connectionString: process.env.REACT_APP__APP_INSIGHTS_CONNECTION_STRING
};

export const AzureStorage = {
  attachments: {
    accountName: process.env.REACT_APP__AZURE_STORAGE_ACCOUNT_NAME_ATTACHMENTS,
    containerName: 'new-instance-attachments'
  }
};

export const WorkflowPlatform = {
  newEngagementApproval: {
    workflowId: 100002,
    workflowStartUrl: process.env.REACT_APP__WORKFLOW_PLATFORM_NEA_WORKFLOW_START_URL
  }
};
