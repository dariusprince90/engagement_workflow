import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';

import WorkflowHistoryView from './WorkflowHistoryView';

// **********************************************************************
// * constants

const testIds = {
  workflowHistoryTable: 'workflow-history-table'
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <WorkflowHistoryView />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./components/workflowHistoryTable/WorkflowHistoryTable', () => ({
  __esModule: true,
  default: () => <fake-workflow-history-table data-testid={testIds.workflowHistoryTable} />
}));

// **********************************************************************
// * unit tests

describe('WorkflowHistoryView', () => {
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

  it('should render WorkflowHistoryTable component', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.workflowHistoryTable)).toBeInTheDocument();
  });
});
