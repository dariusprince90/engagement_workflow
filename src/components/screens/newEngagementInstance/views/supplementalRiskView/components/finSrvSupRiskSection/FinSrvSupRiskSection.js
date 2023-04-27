import { memo } from 'react';
import PropTypes from 'prop-types';

import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import StatisticalFinancialInfoFields from './StatisticalFinancialInfoFields';
import OtherInfoFields from './OtherInfoFields';

const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

let FinancialServicesSupplementalRiskSection = ({ id, title }) => {
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
    <CollapsibleFormSection id={id} title={title}>
      <div className="container-fluid">
        <StatisticalFinancialInfoFields />
        <OtherInfoFields />
      </div>
    </CollapsibleFormSection>
  );
};

FinancialServicesSupplementalRiskSection = memo(FinancialServicesSupplementalRiskSection);
FinancialServicesSupplementalRiskSection.propTypes = propTypes;
FinancialServicesSupplementalRiskSection.displayName = 'FinancialServicesSupplementalRiskSection';

export default FinancialServicesSupplementalRiskSection;
