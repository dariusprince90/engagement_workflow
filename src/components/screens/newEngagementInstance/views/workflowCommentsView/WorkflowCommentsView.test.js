import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';

import WorkflowCommentsView from './WorkflowCommentsView';

// **********************************************************************
// * constants

const testIds = {
  workflowCommentsTable: 'workflow-comments-table'
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <WorkflowCommentsView />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./components/workflowCommentsTable/WorkflowCommentsTable', () => ({
  __esModule: true,
  default: () => <fake-workflow-comments-table data-testid={testIds.workflowCommentsTable} />
}));

// **********************************************************************
// * unit tests

describe('WorkflowCommentsView', () => {
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

  it('should render WorkflowCommentsTable component', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.workflowCommentsTable)).toBeInTheDocument();
  });
});
