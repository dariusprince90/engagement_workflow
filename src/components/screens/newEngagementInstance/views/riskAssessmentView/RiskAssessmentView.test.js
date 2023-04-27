import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../newEngagementInstanceSlice';
import NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS from '../../../../../helpers/enums/newEngagementApprovalWorkflowSteps';
import RiskAssessmentView from './RiskAssessmentView';

// **********************************************************************
// * constants

const testIds = {
  riskAssessmentAttestSection: 'risk-assessment-attest-section',
  riskAssessmentNonAttestSection: 'risk-assessment-non-attest-section'
};

const fakeNewEngagementInstance = { isAttest: faker.datatype.boolean() };
const fakeCurrentWorkflowStepId = faker.datatype.number();

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <RiskAssessmentView />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => {
      return callback();
    }
  };
});

jest.mock('../../newEngagementInstanceSlice', () => {
  return {
    selectCurrentWorkflowStepId: jest.fn(),
    selectNewEngagementInstance: jest.fn()
  };
});

jest.mock('./components/riskAssessmentAttestSection/RiskAssessmentAttestSection', () => ({
  __esModule: true,
  default: () => <fake-risk-assessment-attest-view data-testid={testIds.riskAssessmentAttestSection} />
}));

jest.mock('./components/riskAssessmentNonAttestSection/RiskAssessmentNonAttestSection', () => ({
  __esModule: true,
  default: () => <fake-risk-non-assessment-attest-view data-testid={testIds.riskAssessmentNonAttestSection} />
}));

// **********************************************************************
// * unit tests

describe('RiskAssessmentView', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(fakeCurrentWorkflowStepId);
    newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(fakeNewEngagementInstance);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  describe('renders risk assessment attest section component', () => {
    it.each([
      { currentWorkflowStepId: NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.pmfaPumApproval.id },
      { currentWorkflowStepId: NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.pmiaPartnerApproval.id },
      { currentWorkflowStepId: NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.pmtPartnerApproval.id },
      { currentWorkflowStepId: NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.pumApproval.id }
    ])(
      'does not render when isAttest is not true and currentWorkflowStepId equals to $currentWorkflowStepId',
      ({ currentWorkflowStepId }) => {
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isAttest: false
        });
        render(getComponentToRender());
        expect(screen.queryByTestId(testIds.riskAssessmentAttestSection)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(faker.datatype.number());
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isAttest: true
        });
      });

      it('renders when isAttest true', () => {
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.riskAssessmentAttestSection)).toBeInTheDocument();
      });
    });
  });

  describe('renders riskAssessmentNonAttestSection component', () => {
    it.each([
      { currentWorkflowStepId: NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.ebpaApproval.id },
      { currentWorkflowStepId: NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.secApproval.id },
      { currentWorkflowStepId: NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.industryGroupLeaderApproval.id }
    ])(
      'does not render when isAttest true and currentWorkflowStepId equals to $currentWorkflowStepId',
      ({ currentWorkflowStepId }) => {
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isAttest: true
        });
        render(getComponentToRender());
        expect(screen.queryByTestId(testIds.riskAssessmentNonAttestSection)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(faker.datatype.number());
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isAttest: false
        });
      });

      it('renders when isAttest is not true', () => {
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.riskAssessmentNonAttestSection)).toBeInTheDocument();
      });
    });
  });
});
