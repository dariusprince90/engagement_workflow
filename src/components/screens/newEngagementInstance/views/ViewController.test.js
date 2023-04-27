import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as testHelper from '../../../../testing/testHelper';
import NEW_ENGAGEMENT_INSTANCE_VIEWS from '../../../../helpers/enums/newEngagementInstanceViews';
import * as newEngagementInstanceSlice from '../newEngagementInstanceSlice';
import ViewController from './ViewController';

// **********************************************************************
// * constants

const testIds = {
  viewControllerContainer: 'view-controller-container',

  // views
  additionalInformationView: 'additional-information-view',
  aicpaView: 'aicpa-view',
  billingScheduleSummaryView: 'billing-schedule-summary-view',
  clientContactDetails: 'client-contact-details',
  clientContactsView: 'client-contacts-view',
  clientInformationView: 'client-information-view',
  engagementInformationView: 'engagement-information-view',
  finalApprovalView: 'final-approval-view',
  gaoView: 'gao-view',
  industryRiskView: 'industry-risk-view',
  jobSetupView: 'job-setup-view',
  knowledgeOfClientAndEngagementView: 'knowledge-of-client-and-engagement-view',
  natureOfServiceView: 'nature-of-service-view',
  riskAssessmentView: 'risk-assessment-view',
  secView: 'sec-view',
  selectClientView: 'select-client-view',
  supplementalRiskView: 'supplemental-risk-view',
  taxRiskView: 'tax-risk-view',
  workflowCommentsView: 'workflow-comments-view',
  workflowHistoryView: 'workflow-history-view'
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <ViewController />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: (callback) => {
    return callback();
  }
}));

jest.mock('../newEngagementInstanceSlice', () => ({
  selectCurrentViewId: jest.fn()
}));

jest.mock('./aicpaView/AicpaView', () => ({
  __esModule: true,
  default: () => <fake-aicpa-view data-testid={testIds.aicpaView} role="region" />
}));

jest.mock('./additionalInformationView/AdditionalInformationView', () => ({
  __esModule: true,
  default: () => <fake-additional-information-view data-testid={testIds.additionalInformationView} role="region" />
}));

jest.mock('./billingScheduleSummaryView/BillingScheduleSummaryView', () => ({
  __esModule: true,
  default: () => <fake-billing-schedule-summary-view data-testid={testIds.billingScheduleSummaryView} role="region" />
}));

jest.mock('./clientContactDetailsView/ClientContactDetailsView', () => ({
  __esModule: true,
  default: () => <fake-client-contact-details-view data-testid={testIds.clientContactDetails} role="region" />
}));

jest.mock('./clientContactsView/ClientContactsView', () => ({
  __esModule: true,
  default: () => <fake-client-contacts-view data-testid={testIds.clientContactsView} role="region" />
}));

jest.mock('./clientInformationView/ClientInformationView', () => ({
  __esModule: true,
  default: () => <fake-client-information-view data-testid={testIds.clientInformationView} role="region" />
}));

jest.mock('./engagementInformationView/EngagementInformationView', () => ({
  __esModule: true,
  default: () => <fake-engagement-information-view data-testid={testIds.engagementInformationView} role="region" />
}));

jest.mock('./finalApprovalView/FinalApprovalView', () => ({
  __esModule: true,
  default: () => <fake-final-approval-view data-testid={testIds.finalApprovalView} role="region" />
}));

jest.mock('./gaoView/GaoView', () => ({
  __esModule: true,
  default: () => <fake-gao-view data-testid={testIds.gaoView} role="region" />
}));

jest.mock('./industryRiskView/IndustryRiskView', () => ({
  __esModule: true,
  default: () => <fake-industry-risk-view data-testid={testIds.industryRiskView} role="region" />
}));

jest.mock('./jobSetupView/JobSetupView', () => ({
  __esModule: true,
  default: () => <fake-job-setup-view data-testid={testIds.jobSetupView} role="region" />
}));

jest.mock('./knowledgeOfClientAndEngagementView/KnowledgeOfClientAndEngagementView', () => ({
  __esModule: true,
  default: () => (
    <fake-knowledge-of-client-and-engagement-view
      data-testid={testIds.knowledgeOfClientAndEngagementView}
      role="region"
    />
  )
}));

jest.mock('./natureOfServiceView/NatureOfServiceView', () => ({
  __esModule: true,
  default: () => <fake-nature-of-service-view data-testid={testIds.natureOfServiceView} role="region" />
}));

jest.mock('./riskAssessmentView/RiskAssessmentView', () => ({
  __esModule: true,
  default: () => <fake-risk-assessment-view data-testid={testIds.riskAssessmentView} role="region" />
}));

jest.mock('./secView/SecView', () => ({
  __esModule: true,
  default: () => <fake-sec-view data-testid={testIds.secView} role="region" />
}));

jest.mock('./selectClientView/SelectClientView', () => ({
  __esModule: true,
  default: () => <fake-select-client-view data-testid={testIds.selectClientView} role="region" />
}));

jest.mock('./supplementalRiskView/SupplementalRiskView', () => ({
  __esModule: true,
  default: () => <fake-workflow-history-view data-testid={testIds.supplementalRiskView} role="region" />
}));

jest.mock('./taxRiskView/TaxRiskView', () => ({
  __esModule: true,
  default: () => <fake-tax-risk-view data-testid={testIds.taxRiskView} role="region" />
}));

jest.mock('./workflowCommentsView/WorkflowCommentsView', () => ({
  __esModule: true,
  default: () => <fake-workflow-comments-view data-testid={testIds.workflowCommentsView} role="region" />
}));

jest.mock('./workflowHistoryView/WorkflowHistoryView', () => ({
  __esModule: true,
  default: () => <fake-workflow-history-view data-testid={testIds.workflowHistoryView} role="region" />
}));

// **********************************************************************
// * unit tests

describe('ViewController', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    jest.spyOn(newEngagementInstanceSlice, 'selectCurrentViewId');
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('rendering', () => {
    it('renders without crashing', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId);
      const div = document.createElement('div');
      ReactDOM.render(getComponentToRender(), div);
    });

    it('renders Additional Information View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(
        NEW_ENGAGEMENT_INSTANCE_VIEWS.additionalInformation.viewId
      );
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.additionalInformationView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders AICPA View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(NEW_ENGAGEMENT_INSTANCE_VIEWS.aicpa.viewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.aicpaView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders Billing Schedule Summary View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(
        NEW_ENGAGEMENT_INSTANCE_VIEWS.billingScheduleSummary.viewId
      );
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.billingScheduleSummaryView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders Client Contact Details View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(
        NEW_ENGAGEMENT_INSTANCE_VIEWS.clientContactDetails.viewId
      );
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.clientContactDetails)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders Client Contacts View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(
        NEW_ENGAGEMENT_INSTANCE_VIEWS.clientContacts.viewId
      );
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.clientContactsView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders Client Information View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(
        NEW_ENGAGEMENT_INSTANCE_VIEWS.clientInformation.viewId
      );
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.clientInformationView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders Engagement Information View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(
        NEW_ENGAGEMENT_INSTANCE_VIEWS.engagementInformation.viewId
      );
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.engagementInformationView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders Final Approval View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(
        NEW_ENGAGEMENT_INSTANCE_VIEWS.finalApproval.viewId
      );
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.finalApprovalView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders GAO View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(NEW_ENGAGEMENT_INSTANCE_VIEWS.gao.viewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.gaoView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders Industry Risk View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(NEW_ENGAGEMENT_INSTANCE_VIEWS.industryRisk.viewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.industryRiskView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders Job Setup View when currentViewId starts with the job setup view prefix', () => {
      const viewId = `${newEngagementInstanceSlice.JOB_SETUP_VIEW_PREFIX}${faker.random.alpha(10)}`;
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(viewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.jobSetupView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders Knowledge Of Client View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(
        NEW_ENGAGEMENT_INSTANCE_VIEWS.knowledgeOfClient.viewId
      );
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.knowledgeOfClientAndEngagementView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders Nature Of Service View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(
        NEW_ENGAGEMENT_INSTANCE_VIEWS.natureOfService.viewId
      );
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.natureOfServiceView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders Risk Assessment View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(
        NEW_ENGAGEMENT_INSTANCE_VIEWS.riskAssessment.viewId
      );
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.riskAssessmentView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders SEC View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(NEW_ENGAGEMENT_INSTANCE_VIEWS.sec.viewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.secView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders Select Client View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.selectClientView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders Supplemental Risk View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(
        NEW_ENGAGEMENT_INSTANCE_VIEWS.supplementalRisk.viewId
      );
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.supplementalRiskView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders Tax Risk View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(NEW_ENGAGEMENT_INSTANCE_VIEWS.taxRisk.viewId);
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.taxRiskView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders Workflow Comments View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(
        NEW_ENGAGEMENT_INSTANCE_VIEWS.workflowComments.viewId
      );
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.workflowCommentsView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });

    it('renders Workflow History View when currentViewId is equal to corresponding view id', () => {
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(
        NEW_ENGAGEMENT_INSTANCE_VIEWS.workflowHistory.viewId
      );
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.workflowHistoryView)).toBeInTheDocument();
      expect(screen.getAllByRole('region')).toHaveLength(1);
    });
  });

  describe('functional', () => {
    it('throws an error when currentViewId is invalid', () => {
      // * ARRANGE
      const fakeViewId = faker.datatype.string();
      newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(fakeViewId);

      // * ACT and ASSERT
      testHelper.mockConsoleError();
      expect(() => render(getComponentToRender())).toThrow(Error, `Invalid view id: ${fakeViewId}`);
      testHelper.restoreConsoleError();
    });
  });
});
