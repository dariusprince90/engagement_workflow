import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import FinancialServicesSupplementalRiskSection from './FinSrvSupRiskSection';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',
  otherInfoFields: 'other-info-fields',
  statisticalFinancialInfoFields: 'statistical-financial-info-fields'
};

const defaultProps = {
  id: faker.random.alphaNumeric(10),
  title: faker.random.alphaNumeric(10)
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <FinancialServicesSupplementalRiskSection {...props} />;
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

jest.mock('./OtherInfoFields', () => ({
  __esModule: true,
  default: () => <fake-other-info-fields data-testid={testIds.otherInfoFields} />
}));

jest.mock('./StatisticalFinancialInfoFields', () => ({
  __esModule: true,
  default: () => <fake-statistical-financial-info-fields data-testid={testIds.statisticalFinancialInfoFields} />
}));

// **********************************************************************
// * unit test

describe('FinancialServicesSupplementalRiskSection', () => {
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

  it('renders OtherInfoFields component', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.otherInfoFields)).toBeInTheDocument();
  });

  it('renders StatisticalFinancialInfoFields component', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.statisticalFinancialInfoFields)).toBeInTheDocument();
  });
});
