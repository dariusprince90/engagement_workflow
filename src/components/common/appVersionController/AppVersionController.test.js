import ReactDOM from 'react-dom';
import * as reactRedux from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from '@faker-js/faker';

import LOCAL_STORAGE_KEYS from '../../../helpers/enums/localStorageKeys';
import * as appLayoutSlice from '../appLayout/appLayoutSlice';

import AppVersionController from './AppVersionController';

// **********************************************************************
// * constants

const defaultProps = {};
const fakeMetadata = { newAppVersionAvailable: faker.datatype.boolean() };
const mockDispatch = jest.fn();

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <AppVersionController {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useDispatch: jest.fn(),
    useSelector: (callback) => callback()
  };
});

jest.mock('../appLayout/appLayoutSlice', () => ({
  appVersionChecked: jest.fn(),
  selectMetadata: jest.fn()
}));

// **********************************************************************
// * unit tests

describe('AppVersionController', () => {
  // **********************************************************************
  // * setup

  const { location: originalWindowLocation } = window;

  beforeAll(() => {
    jest.spyOn(window.localStorage.__proto__, 'removeItem');

    delete window.location;
    window.location = { reload: jest.fn() };
  });

  beforeEach(() => {
    window.localStorage.__proto__.removeItem.mockImplementation(() => {});

    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    appLayoutSlice.selectMetadata.mockReturnValue(fakeMetadata);
  });

  // **********************************************************************
  // * tear-down

  afterEach(() => {
    window.localStorage.__proto__.removeItem.mockReset();
    window.location.reload.mockReset();
  });

  afterAll(() => {
    window.localStorage.__proto__.removeItem.mockRestore();
    window.location = originalWindowLocation;
  });

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('on-load', () => {
    it('dispatches appVersionChecked', () => {
      const sliceResults = faker.random.alphaNumeric(10);
      appLayoutSlice.appVersionChecked.mockReturnValue(sliceResults);
      render(getComponentToRender(defaultProps));
      expect(appLayoutSlice.appVersionChecked).toHaveBeenCalled();
      expect(appLayoutSlice.appVersionChecked).toHaveBeenCalledWith();
      expect(mockDispatch).toHaveBeenCalledWith(sliceResults);
    });
  });

  describe('new version notification', () => {
    const notificationText = 'A new app version is available';

    it('renders when newAppVersionAvailable is true', () => {
      const metadata = { newAppVersionAvailable: true };
      appLayoutSlice.selectMetadata.mockReturnValue(metadata);
      render(getComponentToRender(defaultProps));
      expect(screen.getByText(notificationText)).toBeInTheDocument();
    });

    it('does not render when newAppVersionAvailable is false', () => {
      const metadata = { newAppVersionAvailable: false };
      appLayoutSlice.selectMetadata.mockReturnValue(metadata);
      render(getComponentToRender(defaultProps));
      expect(screen.queryByText(notificationText)).not.toBeInTheDocument();
    });
  });

  describe('reload button', () => {
    const buttonText = 'Reload';

    beforeEach(() => {
      const metadata = { newAppVersionAvailable: true };
      appLayoutSlice.selectMetadata.mockReturnValue(metadata);
    });

    it('removes correct items from local storage when clicked', async () => {
      // * ARRANGE
      const user = userEvent.setup();
      const expectedStorageItemsToRemove = [
        LOCAL_STORAGE_KEYS.app.version.name,
        ...Object.values(LOCAL_STORAGE_KEYS.lookups).map((lookup) => lookup.name)
      ];

      // * ACT
      render(getComponentToRender(defaultProps));
      await user.click(screen.getByText(buttonText));

      // * ASSERT
      expect(window.localStorage.__proto__.removeItem).toHaveBeenCalledTimes(expectedStorageItemsToRemove.length);

      for (const item of expectedStorageItemsToRemove) {
        expect(window.localStorage.__proto__.removeItem).toHaveBeenCalledWith(item);
      }
    });

    it('reloads the window location when clicked', async () => {
      const user = userEvent.setup();
      render(getComponentToRender(defaultProps));
      await user.click(screen.getByText(buttonText));
      expect(window.location.reload).toHaveBeenCalledOnce();
      expect(window.location.reload).toHaveBeenCalledWith();
    });
  });
});
