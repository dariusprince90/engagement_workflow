import { memo } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node
};

let ScreenOverlay = ({ children }) => {
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
    <div className="screen-overlay">
      <div className="container">{children}</div>
    </div>
  );
};

ScreenOverlay = memo(ScreenOverlay);
ScreenOverlay.propTypes = propTypes;
ScreenOverlay.displayName = 'ScreenOverlay';

export default ScreenOverlay;
