import { store } from '../../../../../../app/store';
import { selectCurrentUserFromCache } from '../../../../../../app/staffSlice';
import { selectView } from '../../../newEngagementInstanceSlice';

import NEW_ENGAGEMENT_INSTANCE_VIEWS from '../../../../../../helpers/enums/newEngagementInstanceViews';

import attestEngagementInfoResponsesApi from '../../../../../../api/newEngagementWorkflow/attestEngagementInfoResponsesApi';
import finalApprovalResponsesApi from '../../../../../../api/newEngagementWorkflow/finalApprovalResponsesApi';
import gaoResponsesApi from '../../../../../../api/newEngagementWorkflow/gaoResponsesApi';
import industryRiskResponsesApi from '../../../../../../api/newEngagementWorkflow/industryRiskResponsesApi';
import initialSetupResponsesApi from '../../../../../../api/newEngagementWorkflow/initialSetupResponsesApi';
import knowledgeOfClientAllClientsResponsesApi from '../../../../../../api/newEngagementWorkflow/knowledgeOfClientAllClientsResponsesApi';
import knowledgeOfClientNewClientsResponsesApi from '../../../../../../api/newEngagementWorkflow/knowledgeOfClientNewClientsResponsesApi';
import newEngagementInstancesApi from '../../../../../../api/newEngagementWorkflow/newEngagementInstancesApi';
import nonAttestEngagementInfoResponsesApi from '../../../../../../api/newEngagementWorkflow/nonAttestEngagementInfoResponsesApi';
import pmDetailsResponsesApi from '../../../../../../api/newEngagementWorkflow/pmDetailsResponsesApi';
import secResponsesApi from '../../../../../../api/newEngagementWorkflow/secResponsesApi';
import supplementalRiskResponsesApi from '../../../../../../api/newEngagementWorkflow/supplementalRiskResponsesApi';

import newEngagementApprovalLogicAppApi from '../../../../../../api/newEngagementApprovalLogicApp/newEngagementApprovalLogicAppApi';

/**
 * Saves (creates) a new engagement instance (NEI) and starts the workflow.
 * @summary The following tasks will be performed when creating the NEI:
 * - create the new engagement instance
 * - create the initial setup response
 * - start the new engagement approval workflow
 * - perform the following tasks in parallel
 *   - create the attestEngagementInfoResponse
 *   - create the final approval response
 *   - create the gao response
 *   - create the industry risk response
 *   - create the knowledge of client - all clients response
 *   - create the knowledge of client - new clients response
 *   - create the non attest engagement info response
 *   - create the pm details response
 *   - create the sec response
 *   - create the supplemental risk response
 */
export const saveNewEngagementInstanceAndStartWorkflow = async () => {
  const SELECT_CLIENT_VIEW_ID = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
  const state = store.getState();
  const currentUser = selectCurrentUserFromCache(state);
  const { formData } = selectView(state, SELECT_CLIENT_VIEW_ID);

  const {
    clientNumber,
    clientSearchTypeId,
    taxTypeId,
    taxPayerIdentificationNumber,
    taxPayerIdentificationNumberMasked,
    industryHierarchyId,
    marketSectorId,
    relationshipPartnerStaffNumber
  } = formData;

  // **********************************************************************
  // * create the new engagement instance

  const newNeiData = { createdByStaffNumber: currentUser.id };
  const nei = await newEngagementInstancesApi.post(newNeiData);

  // **********************************************************************
  // * create the initial setup response

  const newIsrData = {
    newEngagementInstanceId: nei.id,
    clientSearchTypeId,
    clientNumber,
    taxTypeId,
    taxPayerIdentificationNumber: taxPayerIdentificationNumber || taxPayerIdentificationNumberMasked,
    industryHierarchyId,
    marketSectorId,
    relationshipPartnerStaffNumber
  };
  await initialSetupResponsesApi.post(newIsrData);

  // **********************************************************************
  // * start the workflow

  const startWorkflowData = { newEngagementInstanceId: nei.id };
  await newEngagementApprovalLogicAppApi.startWorkflow(startWorkflowData);

  // common payload for all xxxResponse objects that are created when creating a new engagement instance
  const commonResponsePayload = { newEngagementInstanceId: nei.id };

  // create all other xxxResponse objects in parallel
  // these have no dependencies on each other, so we can kick them all off
  await Promise.all([
    attestEngagementInfoResponsesApi.post(commonResponsePayload),
    finalApprovalResponsesApi.post(commonResponsePayload),
    gaoResponsesApi.post(commonResponsePayload),
    industryRiskResponsesApi.post(commonResponsePayload),
    knowledgeOfClientAllClientsResponsesApi.post(commonResponsePayload),
    knowledgeOfClientNewClientsResponsesApi.post(commonResponsePayload),
    nonAttestEngagementInfoResponsesApi.post(commonResponsePayload),
    pmDetailsResponsesApi.post(commonResponsePayload),
    secResponsesApi.post(commonResponsePayload),
    supplementalRiskResponsesApi.post(commonResponsePayload)
  ]);

  // return the new engagement instance id
  return nei.id;
};
