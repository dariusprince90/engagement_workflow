import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import BillingScheduleTableRow from './BillingScheduleTableRow';

// **********************************************************************
// * constants

const testIds = {
  jobScheduleItem: 'job-schedule-item',
  jobInfoResponseScheduleItem: 'job-info-response-schedule-item'
};

const defaultProps = {
  currentJobInfoResponseId: faker.datatype.number(),
  billingSchedule: {
    id: faker.datatype.number(),
    name: faker.random.alpha(10),
    jobs: [],
    jobInfoResponses: []
  },
  onClick: jest.fn()
};

const table = document.createElement('table');
const tableBody = document.createElement('tbody');

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <BillingScheduleTableRow {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./JobScheduleItem', () => ({
  __esModule: true,
  default: ({ job }) => <fake-job-schedule-item data-testid={testIds.jobScheduleItem} job={JSON.stringify(job)} />
}));

jest.mock('./JobInfoResponseScheduleItem', () => ({
  __esModule: true,
  default: ({ currentJobInfoResponseId, jobInfoResponse }) => (
    <fake-job-info-response-schedule-item
      data-testid={testIds.jobInfoResponseScheduleItem}
      currentJobInfoResponseId={currentJobInfoResponseId}
      jobInfoResponse={JSON.stringify(jobInfoResponse)}
    />
  )
}));

// **********************************************************************
// * unit tests

describe('BillingScheduleTableRow', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    table.appendChild(tableBody);
    document.body.appendChild(table);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    ReactDOM.render(getComponentToRender(defaultProps), tableBody);
  });

  describe('table row (tr)', () => {
    describe('when currentJobInfoResponseId is not in the billing schedule', () => {
      const props = {
        ...defaultProps,
        currentJobInfoResponseId: faker.datatype.number(),
        billingSchedule: {
          ...defaultProps.billingSchedule,
          jobInfoResponses: [{ id: faker.datatype.number(), jobName: faker.random.alpha(10) }]
        }
      };

      it('has selectable-row class', () => {
        const expectedClass = 'selectable-row';
        render(getComponentToRender(props), { container: tableBody });
        const row = screen.getByRole('row');
        expect(row).toHaveClass(expectedClass);
      });

      it('does not have table-info class', () => {
        const expectedClass = 'table-info';
        render(getComponentToRender(props), { container: tableBody });
        const row = screen.getByRole('row');
        expect(row).not.toHaveClass(expectedClass);
      });

      it('has title prop', () => {
        const expectedTitle = 'Click here to add the job to this billing schedule';
        render(getComponentToRender(props), { container: tableBody });
        const row = screen.getByRole('row');
        expect(row).toHaveAttribute('title', expectedTitle);
      });

      it('invokes onClick when clicked', () => {
        render(getComponentToRender(props), { container: tableBody });
        const row = screen.getByRole('row');
        expect(props.onClick).not.toHaveBeenCalled();
        fireEvent.click(row);
        expect(props.onClick).toHaveBeenCalledOnceWith(props.billingSchedule.id);
      });
    });

    describe('when currentJobInfoResponseId is in the billing schedule', () => {
      const currentJobInfoResponseId = faker.datatype.number();
      const props = {
        ...defaultProps,
        currentJobInfoResponseId,
        billingSchedule: {
          ...defaultProps.billingSchedule,
          jobInfoResponses: [{ id: currentJobInfoResponseId, jobName: faker.random.alpha(10) }]
        }
      };

      it('does not have selectable-row class', () => {
        const expectedClass = 'selectable-row';
        render(getComponentToRender(props), { container: tableBody });
        const row = screen.getByRole('row');
        expect(row).not.toHaveClass(expectedClass);
      });

      it('has table-info class', () => {
        const expectedClass = 'table-info';
        render(getComponentToRender(props), { container: tableBody });
        const row = screen.getByRole('row');
        expect(row).toHaveClass(expectedClass);
      });

      it('does not have title prop', () => {
        render(getComponentToRender(props), { container: tableBody });
        const row = screen.getByRole('row');
        expect(row).not.toHaveAttribute('title');
      });

      it('does not invoke onClick when clicked', () => {
        render(getComponentToRender(props), { container: tableBody });
        const row = screen.getByRole('row');
        expect(props.onClick).not.toHaveBeenCalled();
        fireEvent.click(row);
        expect(props.onClick).not.toHaveBeenCalled();
      });
    });
  });

  it('renders the billing schedule name', () => {
    const billingScheduleName = faker.random.alpha(10);
    const props = {
      ...defaultProps,
      billingSchedule: { ...defaultProps.billingSchedule, name: billingScheduleName }
    };
    render(getComponentToRender(props), { container: tableBody });
    expect(screen.getByText(billingScheduleName)).toBeInTheDocument();
  });

  it('renders a JobScheduleItem for each job in the billing schedule', () => {
    // * ARRANGE
    const itemCount = faker.datatype.number({ min: 1, max: 20 });
    const jobs = [...Array(itemCount).keys()].map(() => ({
      id: faker.datatype.number(),
      name: faker.random.alpha(10)
    }));
    const props = { ...defaultProps, billingSchedule: { ...defaultProps.billingSchedule, jobs } };

    // * ACT
    render(getComponentToRender(props), { container: tableBody });

    // * ASSERT
    const jobScheduleItems = screen.getAllByTestId(testIds.jobScheduleItem);
    expect(jobScheduleItems).toHaveLength(jobs.length);

    for (let ix = 0; ix < jobs.length; ix++) {
      expect(jobScheduleItems[ix]).toHaveAttribute('job', JSON.stringify(jobs[ix]));
    }
  });

  it('renders a JobInfoResponseScheduleItem for each jobInfoResponse in the billing schedule', () => {
    // * ARRANGE
    const itemCount = faker.datatype.number({ min: 1, max: 20 });
    const jobInfoResponses = [...Array(itemCount).keys()].map(() => ({
      id: faker.datatype.number(),
      jobName: faker.random.alpha(10)
    }));
    const props = { ...defaultProps, billingSchedule: { ...defaultProps.billingSchedule, jobInfoResponses } };

    // * ACT
    render(getComponentToRender(props), { container: tableBody });

    // * ASSERT
    const jobInfoResponseScheduleItems = screen.getAllByTestId(testIds.jobInfoResponseScheduleItem);
    expect(jobInfoResponseScheduleItems).toHaveLength(jobInfoResponses.length);

    for (let ix = 0; ix < jobInfoResponses.length; ix++) {
      expect(jobInfoResponseScheduleItems[ix]).toHaveAttribute('jobInfoResponse', JSON.stringify(jobInfoResponses[ix]));
    }
  });
});
