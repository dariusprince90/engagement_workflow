import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as newEngagementInstanceSlice from '../../newEngagementInstanceSlice';

import SupplementalRiskView from './SupplementalRiskView';

// **********************************************************************
// * constants

const testIds = {
  prospFinStmtSuppSection: 'prosp-fin-stmt-supp-section',
  finSrvSupRiskSection: 'fin-srv-sup-risk-section',
  secSupRiskSection: 'sec-sup-risk-section',
  viewNavigator: 'view-navigator'
};

const fakeSupplementalRiskView = {
  sections: {
    prospectiveFinancialStatementSupplemental: { id: faker.random.alpha(10), title: faker.random.alpha(10) },
    financialServicesSupplementalRisk: { id: faker.random.alpha(10), title: faker.random.alpha(10) },
    secSupplementalRisk: { id: faker.random.alpha(10), title: faker.random.alpha(10) }
  }
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <SupplementalRiskView />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => ({
  useSelector: (callback) => callback()
}));

jest.mock('../../newEngagementInstanceSlice', () => ({
  selectCurrentView: jest.fn()
}));

jest.mock('../../components/viewNavigator/ViewNavigator', () => ({
  __esModule: true,
  default: ({ viewSections }) => {
    return <fake-view-navigator viewSections={JSON.stringify(viewSections)} data-testid={testIds.viewNavigator} />;
  }
}));

jest.mock('./components/prospFinStmtSuppSection/ProspFinStmtSuppSection', () => ({
  __esModule: true,
  default: ({ id, title }) => {
    const props = { id, title };
    return <fake-prosp-fin-stmt-supp-section {...props} data-testid={testIds.prospFinStmtSuppSection} />;
  }
}));

jest.mock('./components/finSrvSupRiskSection/FinSrvSupRiskSection', () => ({
  __esModule: true,
  default: ({ id, title }) => {
    const props = { id, title };
    return <fake-fin-srv-sup-risk-section {...props} data-testid={testIds.finSrvSupRiskSection} />;
  }
}));

jest.mock('./components/secSupRiskSection/SecSupRiskSection', () => ({
  __esModule: true,
  default: ({ id, title }) => {
    const props = { id, title };
    return <fake-sec-sup-risk-section {...props} data-testid={testIds.secSupRiskSection} />;
  }
}));

// **********************************************************************
// * unit test

describe('SupplementalRiskView', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeSupplementalRiskView);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  describe('ViewNavigator', () => {
    it('is rendered', () => {
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.viewNavigator)).toBeInTheDocument();
    });

    it('has correct viewSections prop', () => {
      const expectedProps = Object.values(fakeSupplementalRiskView.sections);
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.viewNavigator)).toHaveAttribute('viewSections', JSON.stringify(expectedProps));
    });
  });

  describe('ProspectiveFinancialStatementSupplementalSection', () => {
    it('is rendered', () => {
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.prospFinStmtSuppSection)).toBeInTheDocument();
    });

    it('has correct id', () => {
      const expected = fakeSupplementalRiskView.sections.prospectiveFinancialStatementSupplemental.id;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.prospFinStmtSuppSection)).toHaveAttribute('id', expected);
    });

    it('has correct title', () => {
      const expected = fakeSupplementalRiskView.sections.prospectiveFinancialStatementSupplemental.title;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.prospFinStmtSuppSection)).toHaveAttribute('title', expected);
    });
  });

  describe('FinancialServicesSupplementalRiskSection', () => {
    it('is rendered', () => {
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.finSrvSupRiskSection)).toBeInTheDocument();
    });

    it('has correct id', () => {
      const expected = fakeSupplementalRiskView.sections.financialServicesSupplementalRisk.id;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.finSrvSupRiskSection)).toHaveAttribute('id', expected);
    });

    it('has correct title', () => {
      const expected = fakeSupplementalRiskView.sections.financialServicesSupplementalRisk.title;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.finSrvSupRiskSection)).toHaveAttribute('title', expected);
    });
  });

  describe('SecSupplementalRiskSection', () => {
    it('is rendered', () => {
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.secSupRiskSection)).toBeInTheDocument();
    });

    it('has correct id', () => {
      const expected = fakeSupplementalRiskView.sections.secSupplementalRisk.id;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.secSupRiskSection)).toHaveAttribute('id', expected);
    });

    it('has correct title', () => {
      const expected = fakeSupplementalRiskView.sections.secSupplementalRisk.title;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.secSupRiskSection)).toHaveAttribute('title', expected);
    });
  });
});
