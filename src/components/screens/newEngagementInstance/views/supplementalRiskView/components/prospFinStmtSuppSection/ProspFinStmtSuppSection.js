import { memo } from 'react';
import PropTypes from 'prop-types';

import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import UnderstandingEngagementFields from './UnderstandingEngagementFields';
import UnderstandingClientFields from './UnderstandingClientFields';
import FeesAndRealizationFields from './FeesAndRealizationFields';
import FirmCapabilityFields from './FirmCapabilityFields';

const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

let ProspectiveFinancialStatementSupplementalSection = ({ id, title }) => {
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
        <UnderstandingEngagementFields />
        <UnderstandingClientFields />
        <FeesAndRealizationFields />
        <FirmCapabilityFields />
      </div>
    </CollapsibleFormSection>
  );
};

ProspectiveFinancialStatementSupplementalSection = memo(ProspectiveFinancialStatementSupplementalSection);
ProspectiveFinancialStatementSupplementalSection.propTypes = propTypes;
ProspectiveFinancialStatementSupplementalSection.displayName = 'ProspectiveFinancialStatementSupplementalSection';

export default ProspectiveFinancialStatementSupplementalSection;
