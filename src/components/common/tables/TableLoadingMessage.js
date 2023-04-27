import { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MessageTableRow from './MessageTableRow';

const propTypes = {
  colSpan: PropTypes.number.isRequired,
  displayMessage: PropTypes.string.isRequired
};

let TableLoadingMessage = ({ colSpan, displayMessage }) => {
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
      {displayMessage}&ensp;
      <FontAwesomeIcon icon={['fas', 'cog']} spin />
    </MessageTableRow>
  );
};

TableLoadingMessage = memo(TableLoadingMessage);
TableLoadingMessage.propTypes = propTypes;
TableLoadingMessage.displayName = 'TableLoadingMessage';

export default TableLoadingMessage;
