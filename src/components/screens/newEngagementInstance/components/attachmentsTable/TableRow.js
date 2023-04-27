import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ATTACHMENT_TYPES from '../../../../../helpers/enums/attachmentTypes';

const propTypes = {
  attachment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fileName: PropTypes.string.isRequired,
    attachmentTypeId: PropTypes.number.isRequired
  }),
  onDelete: PropTypes.func.isRequired
};

let TableRow = ({ attachment, onDelete }) => {
  // **********************************************************************
  // * constants

  const { id, fileName, attachmentTypeId } = attachment;

  // **********************************************************************
  // * component vars

  /**
   * Get the display name based on the attachment type id.
   */
  const attachmentTypeDisplayName = Object.values(ATTACHMENT_TYPES).find(
    (at) => at.id === attachmentTypeId
  ).displayName;

  // **********************************************************************
  // * functions

  /**
   * Handler for the delete attachment icon onClick event.
   */
  const handleDeleteIconClick = useCallback(() => onDelete(id), [id, onDelete]);

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <tr>
      <td>{fileName}</td>
      <td>{attachmentTypeDisplayName}</td>
      <td>
        <FontAwesomeIcon
          className="delete-icon"
          icon="fa-solid fa-circle-x"
          size="lg"
          title="Delete this attachment"
          fixedWidth
          onClick={handleDeleteIconClick}
        />
      </td>
    </tr>
  );
};

TableRow = memo(TableRow);
TableRow.propTypes = propTypes;
TableRow.displayName = 'TableRow';

export default TableRow;
