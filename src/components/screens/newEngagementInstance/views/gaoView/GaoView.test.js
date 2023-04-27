import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';

import GaoView from './GaoView';

// **********************************************************************
// * constants

const testIds = {
  independenceAnalysisSection: 'independence-analysis-section',
  conclusionSection: 'conclusion-section'
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <GaoView />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./components/independenceAnalysisSection/IndependenceAnalysisSection', () => ({
  __esModule: true,
  default: () => <fake-independence-analysis-section data-testid={testIds.independenceAnalysisSection} />
}));

jest.mock('./components/conclusionSection/ConclusionSection', () => ({
  __esModule: true,
  default: () => <fake-conclusion-section data-testid={testIds.conclusionSection} />
}));

// **********************************************************************
// * unit tests

describe('GaoView', () => {
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

  it('renders Independence Analysis Section component', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.independenceAnalysisSection)).toBeInTheDocument();
  });

  it('renders Conclusion Section component', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.conclusionSection)).toBeInTheDocument();
  });
});
