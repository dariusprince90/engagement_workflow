import ReactDOM from 'react-dom';

import BillingScheduleTable from './BillingScheduleTable';

// **********************************************************************
// * constants

const testIds = {
  billingScheduleTableRow: 'billing-schedule-table-row'
};

const defaultProps = {};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <BillingScheduleTable {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./BillingScheduleTableRow', () => ({
  __esModule: true,
  default: ({ actionType, billingSchedule }) => (
    <tr
      data-testid={testIds.billingScheduleTableRow}
      data-billing-schedule={billingSchedule}
      data-action-type={actionType}
    />
  )
}));

// **********************************************************************
// * unit tests

describe('BillingScheduleTable', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });
});
