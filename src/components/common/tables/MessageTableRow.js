import PropTypes from 'prop-types';

const propTypes = {
  rowClassName: PropTypes.string.isRequired,
  colSpan: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

const MessageTableRow = ({ rowClassName, colSpan, children }) => {
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
    <tr className={rowClassName + ' no-hover-action'} data-message-row data-testid="table-row">
      <td colSpan={colSpan} className="text-center" data-testid="table-col">
        {children}
      </td>
    </tr>
  );
};

MessageTableRow.propTypes = propTypes;

export default MessageTableRow;
