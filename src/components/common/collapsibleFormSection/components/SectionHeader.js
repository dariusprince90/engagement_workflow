import { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool
};

let SectionHeader = ({ title, onClick, isCollapsed }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  // collapsed icon type is determined by the collapsed state
  const collapseIconType = isCollapsed ? ['fas', 'caret-up'] : ['fas', 'caret-down'];

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className="section-header" data-testid="section-header" onClick={onClick}>
      <div className="title">{title}</div>
      <FontAwesomeIcon icon={collapseIconType} />
    </div>
  );
};

SectionHeader = memo(SectionHeader);
SectionHeader.propTypes = propTypes;

export default SectionHeader;
