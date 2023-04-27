import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import BillingScheduleSection from './BillingScheduleSection';

// **********************************************************************
// * constants

const testIds = {
  billingScheduleFields: 'billing-schedules-fields',
  billingScheduleTable: 'billing-schedules-table'
};

const defaultProps = {
  id: faker.random.alpha(10),
  title: faker.random.alpha(10)
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <BillingScheduleSection {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('../../../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ id, title, children }) => {
    const props = { id, title, children };
    return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
  }
}));

jest.mock('./BillingScheduleFields', () => ({
  __esModule: true,
  default: () => <fake-billing-schedule-fields data-testid={testIds.billingScheduleFields} />
}));

jest.mock('./BillingScheduleTable', () => ({
  __esModule: true,
  default: () => <fake-billing-schedule-table data-testid={testIds.billingScheduleTable} />
}));

// **********************************************************************
// * unit tests

describe('BillingScheduleSection', () => {
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

  it('renders the BillingScheduleFields', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.billingScheduleFields)).toBeInTheDocument();
  });

  it('renders the BillingScheduleTable', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.billingScheduleTable)).toBeInTheDocument();
  });
});
