import { memo } from 'react';
import PropTypes from 'prop-types';

import './ViewNavigator.scss';

import VIEW_STATUSES from '../../../../../helpers/enums/viewStatuses';
import NavItem from './NavItem';

const propTypes = {
  viewSections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      status: PropTypes.oneOf(Object.values(VIEW_STATUSES))
    })
  )
};

let ViewNavigator = ({ viewSections }) => {
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
    <div className="view-navigator">
      <div className="nav-items-container">
        {viewSections.map((viewSection, index) => (
          <NavItem key={index} {...viewSection} />
        ))}
      </div>
    </div>
  );
};

ViewNavigator = memo(ViewNavigator);
ViewNavigator.propTypes = propTypes;
ViewNavigator.displayName = 'ViewNavigator';

export default ViewNavigator;
