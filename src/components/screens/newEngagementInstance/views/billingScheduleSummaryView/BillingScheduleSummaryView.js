import { memo } from 'react';

import CollapsibleFormSection from '../../../../common/collapsibleFormSection/CollapsibleFormSection';
import FormText from '../../components/formText/FormText';
import BillingScheduleTable from './components/BillingScheduleTable';

let BillingScheduleSummaryView = () => {
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
    <div id="billing-schedule-summary-view">
      <CollapsibleFormSection title="Billing Schedule Summary">
        <div className="container-fluid">
          <FormText isLabel name="instructionsFormText">
            Billing schedules will be created or updated as shown below. To make changes return to that job tab.
          </FormText>
          <BillingScheduleTable />
        </div>
      </CollapsibleFormSection>
    </div>
  );
};

BillingScheduleSummaryView = memo(BillingScheduleSummaryView);
BillingScheduleSummaryView.displayName = 'BillingScheduleSummaryView';

export default BillingScheduleSummaryView;
