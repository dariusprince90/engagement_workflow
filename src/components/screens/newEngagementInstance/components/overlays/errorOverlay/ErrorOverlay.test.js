import ReactDOM from 'react-dom';
import { render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../../newEngagementInstanceSlice';
import ErrorOverlay from './ErrorOverlay';

// **********************************************************************
// * constants

const testIds = {
  screenOverlay: 'screen-overlay',
  errorAlert: 'error-alert'
};

const fakeMetadata = { error: { friendlyMessage: null } };

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <ErrorOverlay />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => callback()
  };
});

jest.mock('../../../newEngagementInstanceSlice', () => {
  return {
    selectMetadata: jest.fn()
  };
});

jest.mock('../ScreenOverlay', () => ({
  __esModule: true,
  default: ({ children }) => {
    return <fake-screen-overlay data-testid={testIds.screenOverlay} children={children} />;
  }
}));

jest.mock('../../../../../common/alerts/ErrorAlert', () => ({
  __esModule: true,
  default: ({ displayMessage, error }) => {
    const props = { displayMessage };
    return <fake-error-alert {...props} error={JSON.stringify(error)} data-testid={testIds.errorAlert} />;
  }
}));

// **********************************************************************
// * unit tests

describe('ErrorOverlay', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectMetadata.mockReturnValue(fakeMetadata);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  describe('ErrorAlert', () => {
    it('renders within the ScreenOverlay', () => {
      render(getComponentToRender());
      const screenOverlay = screen.getByTestId(testIds.screenOverlay);
      expect(within(screenOverlay).getByTestId(testIds.errorAlert)).toBeInTheDocument();
    });

    it('has correct error', () => {
      const error = { fakeProperty: faker.datatype.array() };
      const metadata = { ...fakeMetadata, error };
      newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.errorAlert)).toHaveAttribute('error', JSON.stringify(error));
    });

    it('has correct displayMessage when error.friendlyMessage has no value', () => {
      const expectedDisplayMessage = 'An error occurred!';
      const error = { ...fakeMetadata.error, friendlyMessage: null };
      const metadata = { ...fakeMetadata, error };
      newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.errorAlert)).toHaveAttribute('displayMessage', expectedDisplayMessage);
    });

    it('has correct displayMessage when error.friendlyMessage has a value', () => {
      const expectedDisplayMessage = faker.random.alphaNumeric(10);
      const error = { ...fakeMetadata.error, friendlyMessage: expectedDisplayMessage };
      const metadata = { ...fakeMetadata, error };
      newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.errorAlert)).toHaveAttribute('displayMessage', expectedDisplayMessage);
    });
  });
});
