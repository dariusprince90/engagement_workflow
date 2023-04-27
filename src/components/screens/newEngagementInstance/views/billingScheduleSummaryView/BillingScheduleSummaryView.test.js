import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';

import BillingScheduleSummaryView from './BillingScheduleSummaryView';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',
  instructionsFormText: 'instructions-form-text',
  billingScheduleTable: 'billing-schedule-table'
};

const defaultProps = {};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <BillingScheduleSummaryView {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ title, children }) => {
    const props = { title, children };
    return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
  }
}));

jest.mock('../../components/formText/FormText', () => ({
  __esModule: true,
  default: ({ isLabel, name, children }) => {
    const props = { isLabel, name, children };
    return <fake-form-text {...props} data-testid={testIds[name]} />;
  }
}));

jest.mock('./components/BillingScheduleTable', () => ({
  __esModule: true,
  default: () => <fake-billing-schedule-table data-testid={testIds.billingScheduleTable} />
}));

// **********************************************************************
// * unit tests

describe('BillingScheduleSummaryView', () => {
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

  describe('instructions form text', () => {
    it('is rendered', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.instructionsFormText)).toBeInTheDocument();
    });

    it('has isLabel prop', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.instructionsFormText)).toHaveAttribute('isLabel');
    });

    it('has correct text', () => {
      const expectedText =
        'Billing schedules will be created or updated as shown below. To make changes return to that job tab.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.instructionsFormText)).toHaveTextContent(expectedText);
    });
  });
});
