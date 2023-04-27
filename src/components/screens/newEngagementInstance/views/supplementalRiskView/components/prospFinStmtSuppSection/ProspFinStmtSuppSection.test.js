import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import ProspectiveFinancialStatementSupplementalSection from './ProspFinStmtSuppSection';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',
  feesAndRealizationFields: 'fees-and-realization-fields',
  firmCapabilityFields: 'firm-capability-fields',
  understandingClientFields: 'understanding-client-fields',
  understandingEngagementFields: 'understanding-engagement-fields'
};

const defaultProps = {
  id: faker.random.alphaNumeric(10),
  title: faker.random.alphaNumeric(10)
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ProspectiveFinancialStatementSupplementalSection {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('../../../../../../common/collapsibleFormSection/CollapsibleFormSection', () => {
  return {
    __esModule: true,
    default: ({ id, title, children }) => {
      const props = { id, title, children };
      return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
    }
  };
});

jest.mock('./FeesAndRealizationFields', () => ({
  __esModule: true,
  default: () => <fake-fees-and-realization-fields data-testid={testIds.feesAndRealizationFields} />
}));

jest.mock('./FirmCapabilityFields', () => ({
  __esModule: true,
  default: () => <fake-firm-capability-fields data-testid={testIds.firmCapabilityFields} />
}));

jest.mock('./UnderstandingClientFields', () => ({
  __esModule: true,
  default: () => <fake-understanding-client-fields data-testid={testIds.understandingClientFields} />
}));

jest.mock('./UnderstandingEngagementFields', () => ({
  __esModule: true,
  default: () => <fake-understanding-engagement-fields data-testid={testIds.understandingEngagementFields} />
}));

// **********************************************************************
// * unit test

describe('ProspectiveFinancialStatementSupplementalSection', () => {
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

  describe('CollapsibleFormSection', () => {
    it('is rendered', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.collapsibleFormSection)).toBeInTheDocument();
    });

    it('has correct id', () => {
      const expectedId = defaultProps.id;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('id', expectedId);
    });

    it('has correct title', () => {
      const expectedTitle = defaultProps.title;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
    });
  });

  it('renders UnderstandingEngagementFields component', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.understandingEngagementFields)).toBeInTheDocument();
  });

  it('renders UnderstandingClientFields component', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.understandingClientFields)).toBeInTheDocument();
  });

  it('renders FeesAndRealizationFields component', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.feesAndRealizationFields)).toBeInTheDocument();
  });

  it('renders FirmCapabilityFields component', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.firmCapabilityFields)).toBeInTheDocument();
  });
});
