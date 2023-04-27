import { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectLookup } from '../../newEngagementInstanceSlice';

import ATTACHMENT_REFERENCE_TYPES from '../../../../../helpers/enums/attachmentReferenceTypes';
import TableInfoMessage from '../../../../common/tables/TableInfoMessage';
import TableErrorMessage from '../../../../common/tables/TableErrorMessage';
import TableLoadingMessage from '../../../../common/tables/TableLoadingMessage';
import TableHeader from '../../../../common/tables/TableHeader';
import TableRow from './TableRow';

const propTypes = {
  attachmentReferenceType: PropTypes.oneOf(Object.values(ATTACHMENT_REFERENCE_TYPES)).isRequired
};

let AttachmentTable = ({ attachmentReferenceType }) => {
  // **********************************************************************
  // * constants

  const attachmentInfoResponses = useSelector((state) => selectLookup(state, 'attachmentInfoResponses'));
  const { isLoading, hasError, error, data } = attachmentInfoResponses;

  // **********************************************************************
  // * component vars

  const columnHeaders = useMemo(() => ['File Name', 'File Type'], []);
  const attachments = data.filter((air) => air.attachmentReferenceId === attachmentReferenceType.id);

  // +1 due to final column that contains the add/delete icons
  const colSpan = columnHeaders.length + 1;

  // **********************************************************************
  // * functions

  /**
   * Handler for the add attachment icon onClick event.
   */
  const handleAttAttachmentIconClick = useCallback(() => {
    // todo: implement me in separate issue
  }, []);

  /**
   * Deletes an attachment.
   */
  const deleteAttachment = useCallback(() => {
    // todo: implement me in separate issue
  }, []);

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div id="attachments-table" className="table-responsive">
      <table className="table table-sm table-striped">
        <TableHeader columnHeaders={columnHeaders} onAddIconClick={handleAttAttachmentIconClick} />

        <tbody>
          {/* loading message */}
          {isLoading && <TableLoadingMessage colSpan={colSpan} displayMessage="Loading attachments..." />}

          {/* error message */}
          {!isLoading && hasError && (
            <TableErrorMessage
              colSpan={colSpan}
              displayMessage="There was an error loading the attachments."
              error={error}
            />
          )}

          {/* no attachments message */}
          {!isLoading && !hasError && attachments.length === 0 && (
            <TableInfoMessage colSpan={colSpan} displayMessage="No attachments have been added." />
          )}

          {/* attachment rows */}
          {!isLoading &&
            !hasError &&
            attachments.length > 0 &&
            attachments.map((attachment) => (
              <TableRow key={attachment.id} attachment={attachment} onDelete={deleteAttachment} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

AttachmentTable = memo(AttachmentTable);
AttachmentTable.propTypes = propTypes;
AttachmentTable.displayName = 'AttachmentTable';

export default AttachmentTable;
