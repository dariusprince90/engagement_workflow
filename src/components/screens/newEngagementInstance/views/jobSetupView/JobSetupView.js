import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../newEngagementInstanceSlice';

import ViewNavigator from '../../components/viewNavigator/ViewNavigator';
import JobSetupSection from './components/JobSetupSection';
import JobRolesSection from './components/JobRolesSection';
import BillingScheduleSection from './components/billingSchedule/BillingScheduleSection';

let JobSetupView = () => {
  // **********************************************************************
  // * constants

  const { sections } = useSelector(selectCurrentView);

  // **********************************************************************
  // * component vars

  const viewSections = useMemo(() => Object.values(sections), [sections]);
  const jobSetupSectionProps = { ...sections.jobSetup };
  const jobRolesSectionProps = { ...sections.jobRoles };
  const billingScheduleSectionProps = { ...sections.billingSchedule };

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div id="job-setup-view">
      <ViewNavigator viewSections={viewSections} />
      <JobSetupSection {...jobSetupSectionProps} />
      <JobRolesSection {...jobRolesSectionProps} />
      <BillingScheduleSection {...billingScheduleSectionProps} />
    </div>
  );
};

JobSetupView = memo(JobSetupView);
JobSetupView.displayName = 'JobSetupView';

export default JobSetupView;
