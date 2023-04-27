import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import TableHeader from '../../../../../../common/tables/TableHeader';
import TableInfoMessage from '../../../../../../common/tables/TableInfoMessage';
import TableLoadingMessage from '../../../../../../common/tables/TableLoadingMessage';
import TableErrorMessage from '../../../../../../common/tables/TableErrorMessage';
import WorkflowHistoryTableRow from './WorkflowHistoryTableRow';

const WorkflowHistoryTable = () => {
  // **********************************************************************
  // * constants

  const columnHeaders = ['Activity Name', 'Start Date', 'Finish Date', 'User', 'Final Action'];
  const { workflowStepRunLogs, isLoading, hasError, error } = useSelector(selectCurrentView);

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className="table-responsive">
      <table className="table table-sm table-striped">
        <TableHeader columnHeaders={columnHeaders} />

        <tbody>
          {/* loading message */}
          {isLoading && (
            <TableLoadingMessage colSpan={columnHeaders.length} displayMessage="Loading workflow history..." />
          )}

          {/* error message */}
          {!isLoading && hasError && (
            <TableErrorMessage
              colSpan={columnHeaders.length}
              displayMessage="There was an error loading the workflow history."
              error={error}
            />
          )}

          {/* no workflow history message */}
          {!isLoading && !hasError && workflowStepRunLogs.length === 0 && (
            <TableInfoMessage colSpan={columnHeaders.length} displayMessage="There is no workflow history." />
          )}

          {/* workflow history rows */}
          {!isLoading &&
            !hasError &&
            workflowStepRunLogs.length > 0 &&
            workflowStepRunLogs.map((workflowStepRunLog) => (
              <WorkflowHistoryTableRow key={workflowStepRunLog.id} workflowStepRunLog={workflowStepRunLog} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkflowHistoryTable;
