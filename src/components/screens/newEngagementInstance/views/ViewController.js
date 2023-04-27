import { memo } from 'react';
import { useSelector } from 'react-redux';

import { JOB_SETUP_VIEW_PREFIX, selectCurrentViewId } from '../newEngagementInstanceSlice';
import NEW_ENGAGEMENT_INSTANCE_VIEWS from '../../../../helpers/enums/newEngagementInstanceViews';

import AdditionalInformationView from './additionalInformationView/AdditionalInformationView';
import AicpaView from './aicpaView/AicpaView';
import BillingScheduleSummaryView from './billingScheduleSummaryView/BillingScheduleSummaryView';
import ClientContactDetailsView from './clientContactDetailsView/ClientContactDetailsView';
import ClientContactsView from './clientContactsView/ClientContactsView';
import ClientInformationView from './clientInformationView/ClientInformationView';
import EngagementInformationView from './engagementInformationView/EngagementInformationView';
import FinalApprovalView from './finalApprovalView/FinalApprovalView';
import GaoView from './gaoView/GaoView';
import IndustryRiskView from './industryRiskView/IndustryRiskView';
import JobSetupView from './jobSetupView/JobSetupView';
import KnowledgeOfClientAndEngagementView from './knowledgeOfClientAndEngagementView/KnowledgeOfClientAndEngagementView';
import NatureOfServiceView from './natureOfServiceView/NatureOfServiceView';
import RiskAssessmentView from './riskAssessmentView/RiskAssessmentView';
import SecView from './secView/SecView';
import SelectClientView from './selectClientView/SelectClientView';
import SupplementalRiskView from './supplementalRiskView/SupplementalRiskView';
import TaxRiskView from './taxRiskView/TaxRiskView';
import WorkflowCommentsView from './workflowCommentsView/WorkflowCommentsView';
import WorkflowHistoryView from './workflowHistoryView/WorkflowHistoryView';

let ViewController = () => {
  // **********************************************************************
  // * constants

  const currentViewId = useSelector(selectCurrentViewId);

  // **********************************************************************
  // * functions

  const getCurrentView = () => {
    if (currentViewId.startsWith(JOB_SETUP_VIEW_PREFIX)) {
      return <JobSetupView key={currentViewId} />;
    }

    switch (currentViewId) {
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.additionalInformation.viewId:
        return <AdditionalInformationView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.aicpa.viewId:
        return <AicpaView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.billingScheduleSummary.viewId:
        return <BillingScheduleSummaryView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.clientContactDetails.viewId:
        return <ClientContactDetailsView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.clientContacts.viewId:
        return <ClientContactsView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.clientInformation.viewId:
        return <ClientInformationView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.engagementInformation.viewId:
        return <EngagementInformationView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.finalApproval.viewId:
        return <FinalApprovalView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.gao.viewId:
        return <GaoView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.industryRisk.viewId:
        return <IndustryRiskView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.knowledgeOfClient.viewId:
        return <KnowledgeOfClientAndEngagementView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.natureOfService.viewId:
        return <NatureOfServiceView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.riskAssessment.viewId:
        return <RiskAssessmentView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.sec.viewId:
        return <SecView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId:
        return <SelectClientView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.supplementalRisk.viewId:
        return <SupplementalRiskView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.taxRisk.viewId:
        return <TaxRiskView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.workflowComments.viewId:
        return <WorkflowCommentsView />;
      case NEW_ENGAGEMENT_INSTANCE_VIEWS.workflowHistory.viewId:
        return <WorkflowHistoryView />;
      default:
        throw new Error(`Invalid view id: ${currentViewId}`);
    }
  };

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className="view-container">
      <div className="container-fluid" data-testid="view-controller-container">
        {getCurrentView()}
      </div>
    </div>
  );
};

ViewController = memo(ViewController);

export default ViewController;
