import { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import './CollapsibleFormSection.scss';

import SectionHeader from './components/SectionHeader';
import SectionBody from './components/SectionBody';

const propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string
};

let CollapsibleFormSection = ({ id, title, children }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  const [isCollapsed, setIsCollapsed] = useState(false);

  // **********************************************************************
  // * functions

  const toggleCollapsedState = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div id={id} className="collapsible-form-section" data-testid="collapsible-form-section">
      <SectionHeader title={title} isCollapsed={isCollapsed} onClick={toggleCollapsedState} />
      <SectionBody isCollapsed={isCollapsed} onCollapsedContentClick={toggleCollapsedState}>
        {children}
      </SectionBody>
    </div>
  );
};

CollapsibleFormSection = memo(CollapsibleFormSection);
CollapsibleFormSection.propTypes = propTypes;

export default CollapsibleFormSection;
