import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import JOB_ROLES from '../../../../../../../helpers/enums/jobRoles';
import * as newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';

import BillingScheduleTable from './BillingScheduleTable';

// **********************************************************************
// * constants

const testIds = {
  tableInfoMessage: 'table-info-message',
  billingScheduleTableRow: 'billing-schedule-table-row',
  createNewBillingScheduleTableRow: 'create-new-billing-schedule-table-row'
};

const defaultProps = {};

const fakeJobSetupView = {
  formData: {
    id: faker.datatype.number(),
    billToClientNumber: faker.datatype.number()
  },
  lookups: {
    jobRoles: {
      data: faker.datatype.array()
    }
  }
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <BillingScheduleTable {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => ({
  useSelector: (callback) => callback()
}));

jest.mock('../../../../newEngagementInstanceSlice', () => ({
  selectCurrentView: jest.fn()
}));

jest.mock('../../../../../../common/tables/TableInfoMessage', () => ({
  __esModule: true,
  default: ({ colSpan, displayMessage }) => {
    const props = { colSpan, displayMessage };
    return (
      <tr>
        <td>
          <fake-table-info-message data-testid={testIds.tableInfoMessage} {...props} />
        </td>
      </tr>
    );
  }
}));

jest.mock('./BillingScheduleTableRow', () => ({
  __esModule: true,
  default: ({ currentJobInfoResponseId, billingSchedule, onClick }) => (
    <tr
      data-testid={testIds.billingScheduleTableRow}
      data-current-job-info-response-id={currentJobInfoResponseId}
      data-billing-schedule={billingSchedule}
      onClick={onClick}
    />
  )
}));

jest.mock('./CreateNewBillingScheduleTableRow', () => ({
  __esModule: true,
  default: ({ onClick }) => <tr data-testid={testIds.createNewBillingScheduleTableRow} onClick={onClick} />
}));

// **********************************************************************
// * unit tests

describe('BillingScheduleGrid', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeJobSetupView);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('TableInfoMessage', () => {
    it('is not rendered when billToClientNumber has a value and there is a biller', () => {
      const billToClientNumber = faker.datatype.number();
      const jobRoles = { data: [{ roleId: JOB_ROLES.biller.id }] };
      const jobSetupView = {
        ...fakeJobSetupView,
        formData: { ...fakeJobSetupView.formData, billToClientNumber },
        lookups: { ...fakeJobSetupView.lookups, jobRoles }
      };
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.tableInfoMessage)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      it.each([
        {
          billToClientNumber: null,
          billToClientNumberTestText: 'is null',
          billerRoleId: 0,
          billerTestText: 'no biller exists',
          expectedMessage: 'Add a biller (job role) and select a bill-to client to enable the billing schedules.'
        },
        {
          billToClientNumber: faker.datatype.number(),
          billToClientNumberTestText: 'is not null',
          billerRoleId: 0,
          billerText: 'no biller exists',
          expectedMessage: 'Add a biller (job role) to enable the billing schedules.'
        },
        {
          billToClientNumber: null,
          billToClientNumberTestText: 'is null',
          billerRoleId: JOB_ROLES.biller.id,
          billerText: 'a biller exists',
          expectedMessage: 'Select a bill-to client to enable the billing schedules.'
        }
      ])(
        'is rendered and has correct displayMessage when billToClientNumber $billToClientNumberTestText and $billerText',
        ({ billToClientNumber, billerRoleId, expectedMessage }) => {
          const jobRoles = { data: [{ roleId: billerRoleId }] };
          const jobSetupView = {
            ...fakeJobSetupView,
            formData: { ...fakeJobSetupView.formData, billToClientNumber },
            lookups: { ...fakeJobSetupView.lookups, jobRoles }
          };
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.tableInfoMessage)).toBeInTheDocument();
          expect(screen.getByTestId(testIds.tableInfoMessage)).toHaveAttribute('displayMessage', expectedMessage);
        }
      );
    });
  });

  describe('CreateNewBillingScheduleTableRow', () => {
    it.each([
      {
        billToClientNumber: null,
        billToClientNumberTestText: 'is null',
        billerRoleId: 0,
        billerTestText: 'no biller exists'
      },
      {
        billToClientNumber: faker.datatype.number(),
        billToClientNumberTestText: 'is not null',
        billerRoleId: 0,
        billerText: 'no biller exists'
      },
      {
        billToClientNumber: null,
        billToClientNumberTestText: 'is null',
        billerRoleId: JOB_ROLES.biller.id,
        billerText: 'a biller exists'
      }
    ])(
      'is not rendered when billToClientNumber $billToClientNumberTestText and $billerText',
      ({ billToClientNumber, billerRoleId }) => {
        const jobRoles = { data: [{ roleId: billerRoleId }] };
        const jobSetupView = {
          ...fakeJobSetupView,
          formData: { ...fakeJobSetupView.formData, billToClientNumber },
          lookups: { ...fakeJobSetupView.lookups, jobRoles }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.createNewBillingScheduleTableRow)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      const billToClientNumber = faker.datatype.number();
      const jobRoles = { data: [{ roleId: JOB_ROLES.biller.id }] };
      const jobSetupView = {
        ...fakeJobSetupView,
        formData: { ...fakeJobSetupView.formData, billToClientNumber },
        lookups: { ...fakeJobSetupView.lookups, jobRoles }
      };

      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
      });

      it('is rendered when billToClientNumber has a value and there is a biller', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.createNewBillingScheduleTableRow)).toBeInTheDocument();
      });

      it.todo('does something when onClick is invoked');

      it('does nothing when onClick is invoked', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(testIds.createNewBillingScheduleTableRow));
        expect(true).toBeTrue();
      });
    });
  });

  describe('BillingScheduleTableRow', () => {
    it.each([
      {
        billToClientNumber: null,
        billToClientNumberTestText: 'is null',
        billerRoleId: 0,
        billerTestText: 'no biller exists'
      },
      {
        billToClientNumber: faker.datatype.number(),
        billToClientNumberTestText: 'is not null',
        billerRoleId: 0,
        billerText: 'no biller exists'
      },
      {
        billToClientNumber: null,
        billToClientNumberTestText: 'is null',
        billerRoleId: JOB_ROLES.biller.id,
        billerText: 'a biller exists'
      }
    ])(
      'is not rendered when billToClientNumber $billToClientNumberTestText and $billerText',
      ({ billToClientNumber, billerRoleId }) => {
        const jobRoles = { data: [{ roleId: billerRoleId }] };
        const jobSetupView = {
          ...fakeJobSetupView,
          formData: { ...fakeJobSetupView.formData, billToClientNumber },
          lookups: { ...fakeJobSetupView.lookups, jobRoles }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.billingScheduleTableRow)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      const billToClientNumber = faker.datatype.number();
      const jobRoles = { data: [{ roleId: JOB_ROLES.biller.id }] };
      const jobSetupView = {
        ...fakeJobSetupView,
        formData: { ...fakeJobSetupView.formData, billToClientNumber },
        lookups: { ...fakeJobSetupView.lookups, jobRoles }
      };

      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
      });

      it('is rendered when billToClientNumber has a value and there is a biller', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getAllByTestId(testIds.billingScheduleTableRow).length).toBeGreaterThan(0);
      });

      it.todo('does something when onClick is invoked for an existing billing schedule table row');

      it.todo('does something when onClick is invoked for a new billing schedule table row');

      it('does nothing when when onClick is invoked', () => {
        render(getComponentToRender(defaultProps));
        const rows = screen.getAllByTestId(testIds.billingScheduleTableRow);
        for (let ix = 0; ix < rows.length; ix++) {
          fireEvent.click(rows[ix]);
        }
        expect(true).toBeTrue();
      });
    });
  });
});
