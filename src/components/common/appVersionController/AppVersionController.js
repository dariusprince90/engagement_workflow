import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './AppVersionController.scss';

import LOCAL_STORAGE_KEYS from '../../../helpers/enums/localStorageKeys';
import { appVersionChecked, selectMetadata } from '../appLayout/appLayoutSlice';

let AppVersionController = () => {
  // **********************************************************************
  // * constants

  const dispatch = useDispatch();
  const { newAppVersionAvailable } = useSelector(selectMetadata);

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  const handleReloadButtonClick = () => {
    // create an array of local storage items to remove
    const storageItemsToRemove = [LOCAL_STORAGE_KEYS.app.version.name];

    // add all of the lookups to the collection of items to remove
    for (const key of Object.values(LOCAL_STORAGE_KEYS.lookups)) {
      storageItemsToRemove.push(key.name);
    }

    // remove each item from local storage
    for (const key of storageItemsToRemove) {
      localStorage.removeItem(key);
    }

    // reload the window
    window.location.reload();
  };

  // **********************************************************************
  // * side effects

  /**
   * when the page loads, check the app version
   */
  useEffect(
    function checkAppVersion() {
      dispatch(appVersionChecked());
    },
    [dispatch]
  );

  // **********************************************************************
  // * render

  return (
    <>
      {newAppVersionAvailable && (
        <div className="new-app-version-notification">
          A new app version is available&ensp;
          <button type="button" className="btn btn-sm btn-info" onClick={handleReloadButtonClick}>
            Reload
          </button>
        </div>
      )}
    </>
  );
};

AppVersionController = memo(AppVersionController);
AppVersionController.displayName = 'AppVersionController';

export default AppVersionController;
