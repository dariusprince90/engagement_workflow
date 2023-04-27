import { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MessageTableRow from './MessageTableRow';

const propTypes = {
  colSpan: PropTypes.number.isRequired,
  displayMessage: PropTypes.string.isRequired
};

let TableInfoMessage = ({ colSpan, displayMessage }) => {
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
    <MessageTableRow colSpan={colSpan} rowClassName="table-info">
      <FontAwesomeIcon icon={['fas', 'circle-info']} />
      &ensp;{displayMessage}
    </MessageTableRow>
  );
};

TableInfoMessage = memo(TableInfoMessage);
TableInfoMessage.propTypes = propTypes;
TableInfoMessage.displayName = 'TableInfoMessage';

export default TableInfoMessage;
