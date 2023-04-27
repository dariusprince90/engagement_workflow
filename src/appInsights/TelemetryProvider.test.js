import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import * as reactRouterDom from 'react-router-dom';

import { TelemetryProvider } from './TelemetryProvider';
import { telemetryService } from './telemetryService';

// **********************************************************************
// * constants

const FakeChildren = () => <fake-children />;

const getComponentToRender = () => (
  <TelemetryProvider>
    <FakeChildren />
  </TelemetryProvider>
);

// **********************************************************************
// * mock external dependencies

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn()
}));

jest.mock('./telemetryService', () => {
  return {
    telemetryService: {
      initialize: jest.fn()
    }
  };
});

// **********************************************************************
// * unit tests

describe('TelemetryProvider', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    jest.spyOn(telemetryService, 'initialize');
    jest.spyOn(reactRouterDom, 'useHistory');
  });

  // **********************************************************************
  // * tear-down

  afterEach(() => {
    telemetryService.initialize.mockClear();
    reactRouterDom.useHistory.mockClear();
  });

  // **********************************************************************
  // * execution

  describe('rendering', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(getComponentToRender(), div);
    });

    it('renders the children', () => {
      const tree = renderer.create(getComponentToRender()).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('functional', () => {
    it('initializes the telemetry service when history is defined', () => {
      reactRouterDom.useHistory.mockReturnValue();
      render(getComponentToRender());
      expect(telemetryService.initialize).toHaveBeenCalled();
    });
  });
});
