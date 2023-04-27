/* eslint-disable no-console */

import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as telemetryService from '../../../appInsights/telemetryService';
import ErrorBoundary from './ErrorBoundary';

// **********************************************************************
// * constants

const testIds = {
  applicationFault: 'application-fault',
  fakeChildren: 'fake-children'
};

const FakeComponentThatThrowsError = () => {
  throw new Error(faker.lorem.sentence());
};

const consoleError = console.error;
const FakeChildren = () => <fake-children data-testid={testIds.fakeChildren} />;
const mockAppInsights = { trackException: jest.fn() };
const isRootBoundary = faker.random.word();

const getComponentToRender = (forError = false) => (
  <ErrorBoundary isRootBoundary={isRootBoundary}>
    {forError && <FakeComponentThatThrowsError />}
    {!forError && <FakeChildren />}
  </ErrorBoundary>
);

// **********************************************************************
// * mock external dependencies

jest.mock('../applicationFault/ApplicationFault', () => {
  return {
    __esModule: true,
    default: ({ showPmLogo }) => {
      return (
        <fake-application-fault-component data-testid={testIds.applicationFault}>
          <div>{showPmLogo}</div>
        </fake-application-fault-component>
      );
    }
  };
});

jest.mock('../../../appInsights/telemetryService', () => {
  return {
    getAppInsights: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('ErrorBoundary', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    console.error = jest.fn();
    jest.spyOn(telemetryService, 'getAppInsights');
    jest.spyOn(mockAppInsights, 'trackException');
  });

  beforeEach(() => {
    telemetryService.getAppInsights.mockReturnValue(mockAppInsights);
  });

  // **********************************************************************
  // * tear-down

  afterAll(() => {
    console.error = consoleError;
    telemetryService.getAppInsights.mockClear();
    mockAppInsights.trackException.mockClear();
  });

  // **********************************************************************
  // * execution

  describe('rendering', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(getComponentToRender(), div);
    });

    it('renders children when hasError is false', () => {
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.fakeChildren)).toBeInTheDocument();
    });

    it('does not render children when hasError is true', () => {
      render(getComponentToRender(true));
      expect(screen.queryByTestId(testIds.fakeChildren)).not.toBeInTheDocument();
    });

    it('renders ApplicationFault when hasError is true', () => {
      render(getComponentToRender(true));
      expect(screen.getByTestId(testIds.applicationFault)).toBeInTheDocument();
    });

    it('does not render ApplicationFault when hasError is false', () => {
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.applicationFault)).not.toBeInTheDocument();
    });

    it('passes isRootBoundary to the showPmLogo prop of the ApplicationFault component', () => {
      render(getComponentToRender(true));
      expect(screen.getByText(isRootBoundary)).toBeInTheDocument();
    });
  });

  describe('functional', () => {
    it('invokes getAppInsights when an error is thrown', () => {
      render(getComponentToRender(true));
      expect(telemetryService.getAppInsights).toHaveBeenCalled();
    });

    it('does not invoke getAppInsights when no error is thrown', () => {
      render(getComponentToRender());
      expect(telemetryService.getAppInsights).not.toHaveBeenCalled();
    });

    it('invokes trackException when an error is thrown and getAppInsights is defined', () => {
      render(getComponentToRender(true));
      expect(mockAppInsights.trackException).toHaveBeenCalled();
    });

    it('does not invoke trackException when an error is thrown and getAppInsights is not defined', () => {
      telemetryService.getAppInsights.mockReturnValue(null);
      render(getComponentToRender(true));
      expect(mockAppInsights.trackException).not.toHaveBeenCalled();
    });

    it('does not invoke trackException when no error is thrown', () => {
      render(getComponentToRender());
      expect(mockAppInsights.trackException).not.toHaveBeenCalled();
    });
  });
});
