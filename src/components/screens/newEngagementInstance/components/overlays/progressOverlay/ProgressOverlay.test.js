import ReactDOM from 'react-dom';
import { render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import ProgressOverlay from './ProgressOverlay';

// **********************************************************************
// * constants

const testIds = {
  screenOverlay: 'screen-overlay',
  progressAlert: 'progress-alert'
};

const defaultProps = {
  alertType: 'info',
  message: faker.random.alphaNumeric(10)
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ProgressOverlay {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('../ScreenOverlay', () => ({
  __esModule: true,
  default: ({ children }) => {
    return <fake-screen-overlay data-testid={testIds.screenOverlay} children={children} />;
  }
}));

jest.mock('../../../../../common/alerts/ProgressAlert', () => ({
  __esModule: true,
  default: ({ alertType, message }) => {
    const props = { alertType, message };
    return <fake-progress-alert {...props} data-testid={testIds.progressAlert} />;
  }
}));

// **********************************************************************
// * unit tests

describe('ProgressOverlay', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('ProgressAlert', () => {
    it('renders within the ScreenOverlay', () => {
      render(getComponentToRender(defaultProps));
      const screenOverlay = screen.getByTestId(testIds.screenOverlay);
      expect(within(screenOverlay).getByTestId(testIds.progressAlert)).toBeInTheDocument();
    });

    it('has correct alertType prop', () => {
      const num = faker.datatype.number({ min: 1, max: 2 });
      const alertType = num % 2 === 0 ? 'info' : 'warning';
      const props = { ...defaultProps, alertType };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.progressAlert)).toHaveAttribute('alertType', alertType);
    });

    it('has correct message prop', () => {
      const message = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, message };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.progressAlert)).toHaveAttribute('message', message);
    });
  });
});
