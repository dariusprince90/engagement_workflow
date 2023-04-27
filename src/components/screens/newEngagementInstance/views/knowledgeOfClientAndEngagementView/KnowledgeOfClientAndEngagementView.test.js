import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';

import KnowledgeOfClientAndEngagementView from './KnowledgeOfClientAndEngagementView';

// **********************************************************************
// * constants

const testIds = {
  allClientsSection: 'all-clients-section',
  newClientsSection: 'new-client-section',
  conflictAssessmentSection: 'conflict-assessment-section'
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <KnowledgeOfClientAndEngagementView />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./components/allClientsSection/AllClientsSection', () => ({
  __esModule: true,
  default: () => <fake-all-client-section data-testid={testIds.allClientsSection} />
}));

jest.mock('./components/newClientsSection/NewClientsSection', () => ({
  __esModule: true,
  default: () => <fake-new-client-section data-testid={testIds.newClientsSection} />
}));

jest.mock('./components/conflictAssessmentSection/ConflictAssessmentSection', () => ({
  __esModule: true,
  default: () => <fake-conflict-assessment-section data-testid={testIds.conflictAssessmentSection} />
}));

// **********************************************************************
// * unit tests

describe('KnowledgeOfClientAndEngagementView', () => {
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

  it('renders AllClientsSection component', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.allClientsSection)).toBeInTheDocument();
  });

  it('renders NewClientsSection component', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.newClientsSection)).toBeInTheDocument();
  });

  it('renders conflictAssessmentSection component', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.conflictAssessmentSection)).toBeInTheDocument();
  });
});
