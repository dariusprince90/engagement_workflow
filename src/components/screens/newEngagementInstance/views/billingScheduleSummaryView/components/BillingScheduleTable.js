import { memo } from 'react';

import BillingScheduleTableRow from './BillingScheduleTableRow';

let BillingScheduleTable = () => {
  // **********************************************************************
  // * constants

  // todo: this will come from state once state is in place
  const billingSchedules = [
    {
      id: 1,
      name: 'Billing Schedule 111110',
      billToClientDisplayName: 'Some Bill-To Client 001, Inc.',
      companyDisplayName: 'Some Company 001',
      jobs: [
        { id: 1, name: 'Audit 2017 really long', clientDisplayName: 'Some Client Name 001' },
        { id: 2, name: 'Audit 2018', clientDisplayName: 'Some Client Name 002' },
        { id: 3, name: 'Audit 2019', clientDisplayName: 'Some Client Name 003' }
      ],
      jobInfoResponses: [{ id: 3, jobName: 'Some Job 003', clientDisplayName: 'Some Client Name 004' }]
    },
    {
      id: 2,
      name: 'Billing Schedule 111111',
      billToClientDisplayName: 'Some Bill-To Client 002, Inc.',
      companyDisplayName: 'Some Company 002',
      jobs: [
        { id: 4, name: '1040', clientDisplayName: 'Some Client Name 005' },
        { id: 5, name: '1065', clientDisplayName: 'Some Client Name 006' }
      ],
      jobInfoResponses: [
        {
          id: 1,
          jobName: 'Some Job 001',
          clientDisplayName: 'Some Client Name 007'
        },
        { id: 2, jobName: 'Some Job 002', clientDisplayName: 'Some Client Name 008' }
      ]
    }
  ];

  // todo: this will come from state once state is in place
  const newBillingSchedules = [
    {
      id: 11,
      name: 'New Billing Schedule 999990',
      billToClientDisplayName: 'Some Bill-To Client 003, Inc.',
      companyDisplayName: 'Some Company 003',
      jobs: [],
      jobInfoResponses: [{ id: 4, jobName: 'Some Job 004', clientDisplayName: 'Some Client Name 009' }]
    },
    {
      id: 12,
      name: 'New Billing Schedule 999991',
      billToClientDisplayName: 'Some Bill-To Client 004, Inc.',
      companyDisplayName: 'Some Company 004',
      jobs: [],
      jobInfoResponses: [{ id: 5, jobName: 'Some Job 005', clientDisplayName: 'Some Client Name 010' }]
    }
  ];

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className="table-responsive">
      <table className="table billing-schedule-table">
        {/* table header */}
        <thead>
          <tr>
            <th>Action</th>
            <th>Schedule</th>
            <th>Bill-To Client</th>
            <th>Company</th>
            <th>
              Jobs <small>(sold-to client)</small>
            </th>
          </tr>
        </thead>

        {/* table body */}
        <tbody>
          {/* rows for existing billing schedules */}
          {billingSchedules.map((billingSchedule) => (
            <BillingScheduleTableRow key={billingSchedule.id} actionType="Update" billingSchedule={billingSchedule} />
          ))}

          {/* rows for new billing schedules */}
          {newBillingSchedules.map((billingSchedule) => (
            <BillingScheduleTableRow key={billingSchedule.id} actionType="Create" billingSchedule={billingSchedule} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

BillingScheduleTable = memo(BillingScheduleTable);
BillingScheduleTable.displayName = 'BillingScheduleTable';

export default BillingScheduleTable;
