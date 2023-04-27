import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import WorkflowHistoryTable from './WorkflowHistoryTable';

// **********************************************************************
// * constants

const testIds = {
  tableErrorMessage: 'table-error-message',
  tableHeader: 'table-header',
  tableInfoMessage: 'table-info-message',
  tableLoadingMessage: 'table-loading-message',
  workflowHistoryTableRow: 'workflow-history-table-row'
};

const mockWorkflowHistory = {
  workflowStepRunLogs: [],
  isLoading: false,
  hasError: false,
  error: null
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <WorkflowHistoryTable />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => {
      return callback();
    }
  };
});

jest.mock('../../../../newEngagementInstanceSlice', () => {
  return {
    selectCurrentView: jest.fn()
  };
});

jest.mock('../../../../../../common/tables/TableHeader', () => {
  return {
    __esModule: true,
    default: ({ columnHeaders }) => {
      return <thead data-testid={testIds.tableHeader} data-column-headers={JSON.stringify(columnHeaders)} />;
    }
  };
});

jest.mock('../../../../../../common/tables/TableLoadingMessage', () => {
  return {
    __esModule: true,
    default: ({ colSpan, displayMessage }) => {
      const props = { colSpan, displayMessage };
      return (
        <tr>
          <td>
            <fake-table-loading-message data-testid={testIds.tableLoadingMessage} {...props} />
          </td>
        </tr>
      );
    }
  };
});

jest.mock('../../../../../../common/tables/TableErrorMessage', () => {
  return {
    __esModule: true,
    default: ({ colSpan, displayMessage, error }) => {
      const props = { colSpan, displayMessage, error };
      return (
        <tr>
          <td>
            <fake-table-error-message data-testid={testIds.tableErrorMessage} {...props} />
          </td>
        </tr>
      );
    }
  };
});

jest.mock('../../../../../../common/tables/TableInfoMessage', () => {
  return {
    __esModule: true,
    default: ({ colSpan, displayMessage }) => {
      const props = { colSpan, displayMessage };
      return (
        <tr>
          <td>
            <fake-table-info-message data-testid={testIds.tableInfoMessage} {...props} />
          </td>
        </tr>
      );
    }
  };
});

jest.mock('./WorkflowHistoryTableRow', () => {
  return {
    __esModule: true,
    default: ({ workflowStepRunLog }) => {
      return (
        <tr
          data-testid={testIds.workflowHistoryTableRow}
          data-workflow-step-run-log={JSON.stringify(workflowStepRunLog)}
        />
      );
    }
  };
});

// **********************************************************************
// * unit tests

describe('WorkflowHistoryTable', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(mockWorkflowHistory);
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  describe('TableHeader', () => {
    it('has correct columnHeaders prop', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue(mockWorkflowHistory);
      const expectedColumnHeaders = ['Activity Name', 'Start Date', 'Finish Date', 'User', 'Final Action'];
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.tableHeader)).toHaveAttribute(
        'data-column-headers',
        JSON.stringify(expectedColumnHeaders)
      );
    });
  });

  describe('TableLoadingMessage', () => {
    it('does not render when isLoading is false', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...mockWorkflowHistory,
        isLoading: false
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.tableLoadingMessage)).not.toBeInTheDocument();
    });

    it('renders when isLoading is true', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...mockWorkflowHistory,
        isLoading: true
      });
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.tableLoadingMessage)).toHaveAttribute(
        'displayMessage',
        'Loading workflow history...'
      );
    });

    it('has correct colSpan prop when isLoading is true', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...mockWorkflowHistory,
        isLoading: true
      });
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.tableLoadingMessage)).toHaveAttribute('colSpan', '5');
    });
  });

  describe('TableErrorMessage', () => {
    it('is not rendered when isLoading is true', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...mockWorkflowHistory,
        isLoading: true,
        hasError: faker.datatype.boolean()
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.tableErrorMessage)).not.toBeInTheDocument();
    });

    describe('when hasError is true and isLoading is false', () => {
      it('is rendered', () => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...mockWorkflowHistory,
          isLoading: false,
          hasError: true,
          error: faker.random.alphaNumeric(10)
        });
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.tableErrorMessage)).toBeInTheDocument();
      });

      it('has correct error prop', () => {
        const error = faker.random.alphaNumeric(10);
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...mockWorkflowHistory,
          isLoading: false,
          hasError: true,
          error
        });
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.tableErrorMessage)).toHaveAttribute('error', error);
      });

      it('has correct colSpan prop', () => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...mockWorkflowHistory,
          isLoading: false,
          hasError: true,
          error: faker.random.alphaNumeric(10)
        });
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.tableErrorMessage)).toHaveAttribute('colSpan', '5');
      });
    });
  });

  describe('TableInfoMessage', () => {
    it('does not render when isLoading is false, hasError is false, and workflowStepRunLogs has items', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...mockWorkflowHistory,
        isLoading: false,
        hasError: false,
        workflowStepRunLogs: [{ id: faker.datatype.number() }]
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.tableInfoMessage)).not.toBeInTheDocument();
    });

    it('does not render when isLoading is false and hasError is true', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...mockWorkflowHistory,
        isLoading: false,
        hasError: true
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.tableInfoMessage)).not.toBeInTheDocument();
    });

    it('does not render when isLoading is true', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...mockWorkflowHistory,
        isLoading: true
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.tableInfoMessage)).not.toBeInTheDocument();
    });

    it('is rendered when isLoading is false, hasError is false, and workflowStepRunLogs has no items', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...mockWorkflowHistory,
        isLoading: false,
        hasError: false,
        workflowStepRunLogs: []
      });
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.tableInfoMessage)).toBeInTheDocument();
    });

    it('has correct colSpan prop', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...mockWorkflowHistory,
        isLoading: false,
        hasError: false,
        workflowStepRunLogs: []
      });
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.tableInfoMessage)).toHaveAttribute('colSpan', '5');
    });

    it('has correct displayMessage prop', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...mockWorkflowHistory,
        isLoading: false,
        hasError: false,
        workflowStepRunLogs: []
      });
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.tableInfoMessage)).toHaveAttribute(
        'displayMessage',
        'There is no workflow history.'
      );
    });
  });

  describe('WorkflowHistoryTableRow', () => {
    it('renders when isLoading is false, hasError is false, and workflowStepRunLogs has items', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...mockWorkflowHistory,
        isLoading: false,
        hasError: false,
        workflowStepRunLogs: [{ id: faker.datatype.number() }]
      });
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.workflowHistoryTableRow)).toBeInTheDocument();
    });

    it('does not render when isLoading is true', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...mockWorkflowHistory,
        isLoading: true
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.workflowHistoryTableRow)).not.toBeInTheDocument();
    });

    it('does not render when isLoading is false and hasError is true', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...mockWorkflowHistory,
        isLoading: false,
        hasError: true
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.workflowHistoryTableRow)).not.toBeInTheDocument();
    });

    it('does not render when isLoading is false, hasError is false, and workflowStepRunLogs has no items', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...mockWorkflowHistory,
        isLoading: false,
        hasError: false,
        workflowStepRunLogs: []
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.workflowHistoryTableRow)).not.toBeInTheDocument();
    });

    it('renders once for each workflowStepRunLog in the collection', () => {
      const itemCount = faker.datatype.number({ min: 1, max: 20 });
      const workflowStepRunLogs = [...Array(itemCount).keys()].map(() => ({ id: faker.datatype.number() }));
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...mockWorkflowHistory,
        isLoading: false,
        hasError: false,
        workflowStepRunLogs
      });
      render(getComponentToRender());
      expect(screen.getAllByTestId(testIds.workflowHistoryTableRow)).toHaveLength(workflowStepRunLogs.length);
    });

    it('has correct workflowStepRunLog prop', () => {
      const expectedWorkflowStepRunLog = { id: faker.datatype.number() };
      const workflowStepRunLogs = [expectedWorkflowStepRunLog];
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...mockWorkflowHistory,
        isLoading: false,
        hasError: false,
        workflowStepRunLogs
      });
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.workflowHistoryTableRow)).toHaveAttribute(
        'data-workflow-step-run-log',
        JSON.stringify(expectedWorkflowStepRunLog)
      );
    });
  });
});
