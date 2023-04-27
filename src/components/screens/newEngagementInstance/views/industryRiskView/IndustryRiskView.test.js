import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';

import IndustryRiskView from './IndustryRiskView';

// **********************************************************************
// * constants

const testIds = {
  industryRiskSection: 'industry-risk-section',
  ebpaRiskSection: 'ebpa-risk-section'
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <IndustryRiskView />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('../withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('./components/industryRiskSection/IndustryRiskSection', () => ({
  __esModule: true,
  default: () => <fake-industry-risk-section data-testid={testIds.industryRiskSection} />
}));

jest.mock('./components/ebpaRiskSection/EbpaRiskSection', () => ({
  __esModule: true,
  default: () => <fake-ebpa-risk-section data-testid={testIds.ebpaRiskSection} />
}));

// **********************************************************************
// * unit tests

describe('IndustryRiskView', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  it('renders IndustryRiskSection component', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.industryRiskSection)).toBeInTheDocument();
  });

  it('renders EbpaRiskSection component', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.ebpaRiskSection)).toBeInTheDocument();
  });
});
