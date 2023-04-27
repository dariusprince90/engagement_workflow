import faker from '@faker-js/faker';

import { store } from '../../../../../../app/store';
import staffSlice from '../../../../../../app/staffSlice';
import newEngagementInstanceSlice from '../../../newEngagementInstanceSlice';

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

import { saveNewEngagementInstanceAndStartWorkflow } from './startWorkflowHelper';

// **********************************************************************
// * constants

const fakeState = {};
const fakeUser = { id: faker.datatype.number() };

const fakeSelectClientView = {
  formData: {
    clientNumber: faker.datatype.number(),
    clientSearchTypeId: faker.datatype.number(),
    taxTypeId: faker.datatype.number(),
    taxPayerIdentificationNumber: faker.random.alphaNumeric(10),
    taxPayerIdentificationNumberMasked: faker.random.alphaNumeric(10),
    industryHierarchyId: faker.datatype.number(),
    marketSectorId: faker.datatype.number(),
    relationshipPartnerStaffNumber: faker.datatype.number()
  }
};

const fakeNewEngagementInstance = { id: faker.datatype.number() };

// **********************************************************************
// * functions

// **********************************************************************
// * mock external dependencies

jest.mock('../../../../../../app/store', () => ({
  store: {
    getState: jest.fn()
  }
}));

jest.mock('../../../../../../app/staffSlice', () => ({
  selectCurrentUserFromCache: jest.fn()
}));

jest.mock('../../../newEngagementInstanceSlice', () => ({
  selectView: jest.fn()
}));

jest.mock('../../../../../../api/newEngagementWorkflow/attestEngagementInfoResponsesApi', () => ({
  post: jest.fn()
}));

jest.mock('../../../../../../api/newEngagementWorkflow/finalApprovalResponsesApi', () => ({
  post: jest.fn()
}));

jest.mock('../../../../../../api/newEngagementWorkflow/gaoResponsesApi', () => ({
  post: jest.fn()
}));

jest.mock('../../../../../../api/newEngagementWorkflow/industryRiskResponsesApi', () => ({
  post: jest.fn()
}));

jest.mock('../../../../../../api/newEngagementWorkflow/initialSetupResponsesApi', () => ({
  post: jest.fn()
}));

jest.mock('../../../../../../api/newEngagementWorkflow/knowledgeOfClientAllClientsResponsesApi', () => ({
  post: jest.fn()
}));

jest.mock('../../../../../../api/newEngagementWorkflow/knowledgeOfClientNewClientsResponsesApi', () => ({
  post: jest.fn()
}));

jest.mock('../../../../../../api/newEngagementWorkflow/newEngagementInstancesApi', () => ({
  post: jest.fn()
}));

jest.mock('../../../../../../api/newEngagementWorkflow/nonAttestEngagementInfoResponsesApi', () => ({
  post: jest.fn()
}));

jest.mock('../../../../../../api/newEngagementWorkflow/pmDetailsResponsesApi', () => ({
  post: jest.fn()
}));

jest.mock('../../../../../../api/newEngagementWorkflow/secResponsesApi', () => ({
  post: jest.fn()
}));

jest.mock('../../../../../../api/newEngagementWorkflow/supplementalRiskResponsesApi', () => ({
  post: jest.fn()
}));

jest.mock('../../../../../../api/newEngagementApprovalLogicApp/newEngagementApprovalLogicAppApi', () => ({
  startWorkflow: jest.fn()
}));

// **********************************************************************
// * unit tests

describe('saveNewEngagementInstanceAndStartWorkflow', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    store.getState.mockReturnValue(fakeState);
    staffSlice.selectCurrentUserFromCache.mockReturnValue(fakeUser);
    newEngagementInstanceSlice.selectView.mockReturnValue(fakeSelectClientView);
    newEngagementInstancesApi.post.mockReturnValue(fakeNewEngagementInstance);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('creates a new engagement instance', async () => {
    const expectedPayload = { createdByStaffNumber: fakeUser.id };
    await saveNewEngagementInstanceAndStartWorkflow();
    expect(newEngagementInstancesApi.post).toHaveBeenCalledOnceWith(expectedPayload);
  });

  it('creates an initial setup response', async () => {
    const {
      clientSearchTypeId,
      clientNumber,
      taxTypeId,
      taxPayerIdentificationNumber,
      industryHierarchyId,
      marketSectorId,
      relationshipPartnerStaffNumber
    } = fakeSelectClientView.formData;

    const expectedPayload = {
      newEngagementInstanceId: fakeNewEngagementInstance.id,
      clientSearchTypeId,
      clientNumber,
      taxTypeId,
      taxPayerIdentificationNumber,
      industryHierarchyId,
      marketSectorId,
      relationshipPartnerStaffNumber
    };

    await saveNewEngagementInstanceAndStartWorkflow();
    expect(initialSetupResponsesApi.post).toHaveBeenCalledOnceWith(expectedPayload);
  });

  it('creates an initial setup response with the masked tin when there is no tin', async () => {
    const formData = { ...fakeSelectClientView.formData, taxPayerIdentificationNumber: null };
    const selectClientView = { ...fakeSelectClientView, formData: { ...formData } };
    newEngagementInstanceSlice.selectView.mockReturnValue(selectClientView);

    const {
      clientSearchTypeId,
      clientNumber,
      taxTypeId,
      taxPayerIdentificationNumberMasked,
      industryHierarchyId,
      marketSectorId,
      relationshipPartnerStaffNumber
    } = formData;

    const expectedPayload = {
      newEngagementInstanceId: fakeNewEngagementInstance.id,
      clientSearchTypeId,
      clientNumber,
      taxTypeId,
      taxPayerIdentificationNumber: taxPayerIdentificationNumberMasked,
      industryHierarchyId,
      marketSectorId,
      relationshipPartnerStaffNumber
    };

    await saveNewEngagementInstanceAndStartWorkflow();
    expect(initialSetupResponsesApi.post).toHaveBeenCalledOnceWith(expectedPayload);
  });

  it('starts the workflow', async () => {
    const expectedPayload = { newEngagementInstanceId: fakeNewEngagementInstance.id };
    await saveNewEngagementInstanceAndStartWorkflow();
    expect(newEngagementApprovalLogicAppApi.startWorkflow).toHaveBeenCalledOnceWith(expectedPayload);
  });

  it('invokes methods in proper order', async () => {
    // * ARRANGE

    // * ACT
    await saveNewEngagementInstanceAndStartWorkflow();

    // * ASSERT
    // ensure nei is created first, then isr, then start the workflow
    expect(initialSetupResponsesApi.post).toHaveBeenCalledAfter(newEngagementInstancesApi.post);
    expect(newEngagementApprovalLogicAppApi.startWorkflow).toHaveBeenCalledAfter(initialSetupResponsesApi.post);

    // ensure all other methods are called after starting the workflow
    expect(attestEngagementInfoResponsesApi.post).toHaveBeenCalledAfter(newEngagementApprovalLogicAppApi.startWorkflow);
    expect(finalApprovalResponsesApi.post).toHaveBeenCalledAfter(newEngagementApprovalLogicAppApi.startWorkflow);
    expect(gaoResponsesApi.post).toHaveBeenCalledAfter(newEngagementApprovalLogicAppApi.startWorkflow);
    expect(industryRiskResponsesApi.post).toHaveBeenCalledAfter(newEngagementApprovalLogicAppApi.startWorkflow);
    expect(knowledgeOfClientAllClientsResponsesApi.post).toHaveBeenCalledAfter(
      newEngagementApprovalLogicAppApi.startWorkflow
    );
    expect(knowledgeOfClientNewClientsResponsesApi.post).toHaveBeenCalledAfter(
      newEngagementApprovalLogicAppApi.startWorkflow
    );
    expect(nonAttestEngagementInfoResponsesApi.post).toHaveBeenCalledAfter(
      newEngagementApprovalLogicAppApi.startWorkflow
    );
    expect(pmDetailsResponsesApi.post).toHaveBeenCalledAfter(newEngagementApprovalLogicAppApi.startWorkflow);
    expect(secResponsesApi.post).toHaveBeenCalledAfter(newEngagementApprovalLogicAppApi.startWorkflow);
    expect(supplementalRiskResponsesApi.post).toHaveBeenCalledAfter(newEngagementApprovalLogicAppApi.startWorkflow);
  });

  it('returns the new engagement instance id', async () => {
    const expected = fakeNewEngagementInstance.id;
    const actual = await saveNewEngagementInstanceAndStartWorkflow();
    expect(actual).toBe(expected);
  });
});
