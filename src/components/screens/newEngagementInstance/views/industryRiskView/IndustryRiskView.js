import { memo } from 'react';

import withNewEngagementInstanceViewData from '../withNewEngagementInstanceViewData';

import IndustryRiskSection from './components/industryRiskSection/IndustryRiskSection';
import EbpaRiskSection from './components/ebpaRiskSection/EbpaRiskSection';

let IndustryRiskView = () => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <>
      <IndustryRiskSection />
      <EbpaRiskSection />
    </>
  );
};

IndustryRiskView = memo(IndustryRiskView);
IndustryRiskView.displayName = 'IndustryRiskView';

export default withNewEngagementInstanceViewData(IndustryRiskView);
