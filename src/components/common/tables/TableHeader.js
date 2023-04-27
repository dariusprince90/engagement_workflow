import { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  columnHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddIconClick: PropTypes.func
};

let TableHeader = ({ columnHeaders, onAddIconClick }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  // only show the add icon if onAddIconClick is defined and not null
  const showAddIcon = typeof onAddIconClick !== 'undefined' && onAddIconClick !== null;

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <thead className="thead-dark">
      <tr>
        {columnHeaders.map((columnHeader, index) => (
          <th data-testid="header-column" key={index}>
            {columnHeader}
          </th>
        ))}

        {showAddIcon && (
          <th>
            <FontAwesomeIcon
              className="add-icon"
              icon="fa-solid fa-circle-plus"
              size="lg"
              title="Add an attachment"
              fixedWidth
              onClick={onAddIconClick}
            />
          </th>
        )}
      </tr>
    </thead>
  );
};

TableHeader = memo(TableHeader);
TableHeader.propTypes = propTypes;
TableHeader.displayName = 'TableHeader';

export default TableHeader;
