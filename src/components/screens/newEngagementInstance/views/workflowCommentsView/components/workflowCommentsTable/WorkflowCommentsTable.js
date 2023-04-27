import { useSelector } from 'react-redux';

import { selectCurrentView } from '../../../../newEngagementInstanceSlice';
import TableHeader from '../../../../../../common/tables/TableHeader';
import TableInfoMessage from '../../../../../../common/tables/TableInfoMessage';
import TableLoadingMessage from '../../../../../../common/tables/TableLoadingMessage';
import TableErrorMessage from '../../../../../../common/tables/TableErrorMessage';
import WorkflowCommentsTableRow from './WorkflowCommentsTableRow';

const WorkflowCommentsTable = () => {
  // **********************************************************************
  // * constants

  const columnHeaders = ['Created On ', 'Created By', 'Comment Type', 'Comments'];
  const { workflowComments, isLoading, hasError, error } = useSelector(selectCurrentView);

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
            <TableLoadingMessage colSpan={columnHeaders.length} displayMessage="Loading workflow comments..." />
          )}

          {/* error message */}
          {!isLoading && hasError && (
            <TableErrorMessage
              colSpan={columnHeaders.length}
              displayMessage="There was an error loading the workflow comments."
              error={error}
            />
          )}

          {/* no workflow comments message */}
          {!isLoading && !hasError && workflowComments.length === 0 && (
            <TableInfoMessage colSpan={columnHeaders.length} displayMessage="There are no workflow comments." />
          )}

          {/* workflow comments rows */}
          {!isLoading &&
            !hasError &&
            workflowComments.length > 0 &&
            workflowComments.map((workflowComments) => (
              <WorkflowCommentsTableRow key={workflowComments.id} workflowComments={workflowComments} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkflowCommentsTable;
