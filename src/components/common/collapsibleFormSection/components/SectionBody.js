import { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  isCollapsed: PropTypes.bool,
  onCollapsedContentClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

let SectionBody = ({ isCollapsed, onCollapsedContentClick, children }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  const bodyClass = 'section-body' + (isCollapsed ? ' collapsed' : '');

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className={bodyClass} data-testid="section-body">
      {/* if not collapsed, render the children */}
      {!isCollapsed && children}

      {/* if collapsed, render the collapsed content */}
      {isCollapsed && (
        <div className="collapsed-content" data-testid="collapsed-content" onClick={onCollapsedContentClick}>
          <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
        </div>
      )}
    </div>
  );
};

SectionBody = memo(SectionBody);
SectionBody.propTypes = propTypes;

export default SectionBody;
