import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../newEngagementInstanceSlice';

import ViewNavigator from '../../components/viewNavigator/ViewNavigator';
import ProspectiveFinancialStatementSupplementalSection from './components/prospFinStmtSuppSection/ProspFinStmtSuppSection';
import FinancialServicesSupplementalRiskSection from './components/finSrvSupRiskSection/FinSrvSupRiskSection';
import SecSupplementalRiskSection from './components/secSupRiskSection/SecSupRiskSection';

let SupplementalRiskView = () => {
  // **********************************************************************
  // * constants

  const { sections } = useSelector(selectCurrentView);

  // **********************************************************************
  // * component vars

  const viewSections = useMemo(() => Object.values(sections), [sections]);

  const prospFinStmtSuppSectionProps = { ...sections.prospectiveFinancialStatementSupplemental };
  const finSrvSupRiskSectionProps = { ...sections.financialServicesSupplementalRisk };
  const secSupRiskSectionProps = { ...sections.secSupplementalRisk };

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <>
      <ViewNavigator viewSections={viewSections} />
      <ProspectiveFinancialStatementSupplementalSection {...prospFinStmtSuppSectionProps} />
      <FinancialServicesSupplementalRiskSection {...finSrvSupRiskSectionProps} />
      <SecSupplementalRiskSection {...secSupRiskSectionProps} />
    </>
  );
};

SupplementalRiskView = memo(SupplementalRiskView);

export default SupplementalRiskView;
