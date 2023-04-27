import { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectMetadata } from '../../../newEngagementInstanceSlice';
import ScreenOverlay from '../ScreenOverlay';
import ErrorAlert from '../../../../../common/alerts/ErrorAlert';

let ErrorOverlay = () => {
  // **********************************************************************
  // * constants

  const DEFAULT_MESSAGE = 'An error occurred!';

  const { error } = useSelector(selectMetadata);
  const displayMessage = error.friendlyMessage || DEFAULT_MESSAGE;

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <ScreenOverlay>
      <ErrorAlert displayMessage={displayMessage} error={error} />
    </ScreenOverlay>
  );
};

ErrorOverlay = memo(ErrorOverlay);

export default ErrorOverlay;
