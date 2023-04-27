import { memo } from 'react';
import PropTypes from 'prop-types';

import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import BillingScheduleFields from './BillingScheduleFields';
import BillingScheduleTable from './BillingScheduleTable';

const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

let BillingScheduleSection = ({ id, title }) => {
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
        <BillingScheduleFields />
        <BillingScheduleTable />
      </div>
    </CollapsibleFormSection>
  );
};

BillingScheduleSection = memo(BillingScheduleSection);
BillingScheduleSection.propTypes = propTypes;
BillingScheduleSection.displayName = 'BillingScheduleSection';

export default BillingScheduleSection;
