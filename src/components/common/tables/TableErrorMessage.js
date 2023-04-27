import { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MessageTableRow from './MessageTableRow';

const propTypes = {
  colSpan: PropTypes.number.isRequired,
  displayMessage: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    traceId: PropTypes.string
  }).isRequired
};

let TableErrorMessage = ({ colSpan, displayMessage, error }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <MessageTableRow colSpan={colSpan} rowClassName="table-danger">
      <FontAwesomeIcon icon={['fas', 'triangle-exclamation']} />
      &ensp;{displayMessage}
      <div>error: {error.message}</div>
      {!!error.traceId && <div>trace-id: {error.traceId}</div>}
    </MessageTableRow>
  );
};

TableErrorMessage = memo(TableErrorMessage);
TableErrorMessage.propTypes = propTypes;
TableErrorMessage.displayName = 'TableErrorMessage';

export default TableErrorMessage;
