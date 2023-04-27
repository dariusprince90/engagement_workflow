import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import './PageOverlay.scss';
import { selectApplicationFaultInfo } from '../appLayout/appLayoutSlice';

import AppLoader from '../appLoader/AppLoader';
import ApplicationFault from '../applicationFault/ApplicationFault';

const propTypes = {
  isTransparent: PropTypes.bool,
  isAppLoader: PropTypes.bool
};

const PageOverlay = ({ isTransparent, isAppLoader }) => {
  // **********************************************************************
  // * constants

  const { hasFault: hasApplicationFault } = useSelector(selectApplicationFaultInfo);

  // **********************************************************************
  // * component vars

  let overlayClassName = 'page-overlay';
  if (isTransparent) overlayClassName += ' transparent';

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className={overlayClassName} data-testid="page-overlay">
      {/* render the application fault if there is a fault */}
      {hasApplicationFault && <ApplicationFault showPmLogo={true} />}

      {/* render the app loader if there is no fault and this is an app loader */}
      {!hasApplicationFault && isAppLoader && <AppLoader />}
    </div>
  );
};

PageOverlay.propTypes = propTypes;

export default PageOverlay;
