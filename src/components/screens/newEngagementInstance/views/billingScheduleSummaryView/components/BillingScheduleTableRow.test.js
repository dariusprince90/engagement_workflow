import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import BillingScheduleTableRow from './BillingScheduleTableRow';

// **********************************************************************
// * constants

const testIds = {
  jobScheduleItem: 'job-schedule-item',
  jobInfoResponseScheduleItem: 'job-info-response-schedule-item'
};

const defaultProps = {
  actionType: faker.helpers.arrayElement(['Create', 'Update']),
  billingSchedule: {
    id: faker.datatype.number(),
    name: faker.random.alphaNumeric(10),
    billToClientDisplayName: faker.random.alphaNumeric(10),
    companyDisplayName: faker.random.alphaNumeric(10),
    jobs: [],
    jobInfoResponses: []
  }
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
  default: ({ job }) => {
    const props = { job: JSON.stringify(job) };
    return <fake-job-schedule-item {...props} data-testid={testIds.jobScheduleItem} />;
  }
}));

jest.mock('./JobInfoResponseScheduleItem', () => ({
  __esModule: true,
  default: ({ jobInfoResponse }) => {
    const props = { jobInfoResponse: JSON.stringify(jobInfoResponse) };
    return <fake-job-info-response-schedule-item {...props} data-testid={testIds.jobInfoResponseScheduleItem} />;
  }
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

  it('renders the actionType', () => {
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(defaultProps.actionType)).toBeInTheDocument();
  });

  it('renders the billing schedule name', () => {
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(defaultProps.billingSchedule.name)).toBeInTheDocument();
  });

  it('renders the billing schedule bill-to client name', () => {
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(defaultProps.billingSchedule.billToClientDisplayName)).toBeInTheDocument();
  });

  it('renders the billing schedule company name', () => {
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(defaultProps.billingSchedule.companyDisplayName)).toBeInTheDocument();
  });

  it('renders a JobScheduleItem for each billing schedule job', () => {
    // * ARRANGE
    const itemCount = faker.datatype.number({ min: 1, max: 20 });
    const jobs = [...Array(itemCount).keys()].map(() => ({
      id: faker.datatype.number(),
      name: faker.random.alphaNumeric(10),
      clientDisplayName: faker.random.alphaNumeric(10)
    }));

    const props = { ...defaultProps, billingSchedule: { ...defaultProps.billingSchedule, jobs: jobs } };

    // * ACT
    render(getComponentToRender(props), { container: tableBody });

    // * ASSERT
    const jobScheduleItems = screen.getAllByTestId(testIds.jobScheduleItem);
    expect(jobScheduleItems).toHaveLength(itemCount);

    for (let ix = 0; ix < jobs.length; ix++) {
      const expectedJob = jobs[ix];
      expect(jobScheduleItems[ix]).toHaveAttribute('job', JSON.stringify(expectedJob));
    }
  });

  it('renders a JobInfoResponseScheduleItem for each billing schedule jobInfoResponse', () => {
    // * ARRANGE
    const itemCount = faker.datatype.number({ min: 1, max: 20 });
    const jobInfoResponses = [...Array(itemCount).keys()].map(() => ({
      id: faker.datatype.number(),
      jobName: faker.random.alphaNumeric(10),
      clientDisplayName: faker.random.alphaNumeric(10)
    }));

    const props = { ...defaultProps, billingSchedule: { ...defaultProps.billingSchedule, jobInfoResponses } };

    // * ACT
    render(getComponentToRender(props), { container: tableBody });

    // * ASSERT
    const jobInfoResponseScheduleItems = screen.getAllByTestId(testIds.jobInfoResponseScheduleItem);
    expect(jobInfoResponseScheduleItems).toHaveLength(itemCount);

    for (let ix = 0; ix < jobInfoResponses.length; ix++) {
      const expectedJirScheduleItem = jobInfoResponses[ix];
      expect(jobInfoResponseScheduleItems[ix]).toHaveAttribute(
        'jobInfoResponse',
        JSON.stringify(expectedJirScheduleItem)
      );
    }
  });
});
