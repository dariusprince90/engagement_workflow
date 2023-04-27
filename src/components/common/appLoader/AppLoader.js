import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './AppLoader.scss';

const AppLoader = () => {
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
    <div className="app-loader">
      {/* pm logo */}
      <img src="/images/pm-logos/pm-logo-wide-color-small.png" alt="Company logo" className="pm-logo" />

      {/* spinner w/ message */}
      <h1 className="display-4">
        <small>
          <FontAwesomeIcon icon={['far', 'compass']} spin />
        </small>
        &ensp;Loading
      </h1>
    </div>
  );
};

export default AppLoader;
