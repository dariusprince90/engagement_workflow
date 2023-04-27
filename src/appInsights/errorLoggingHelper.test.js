import { SeverityLevel } from '@microsoft/applicationinsights-web';

import * as telemetryService from '../appInsights/telemetryService';
import errorLoggingHelper from './errorLoggingHelper';

// **********************************************************************
// * constants

const mockAppInsights = {
  trackException: jest.fn()
};

const error = { toJSON: jest.fn() };

// **********************************************************************
// * mock external dependencies

jest.mock('../appInsights/telemetryService', () => {
  return {
    getAppInsights: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('ErrorLoggingHelper', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    jest.spyOn(telemetryService, 'getAppInsights');
    jest.spyOn(mockAppInsights, 'trackException');
  });

  beforeEach(() => {
    telemetryService.getAppInsights.mockReturnValue(mockAppInsights);
  });

  // **********************************************************************
  // * tear-down

  afterEach(() => {
    telemetryService.getAppInsights.mockClear();
    mockAppInsights.trackException.mockClear();
  });

  // **********************************************************************
  // * execution

  it('invokes trackException when appInsights is not null', () => {
    errorLoggingHelper.logApiError(error);
    expect(mockAppInsights.trackException).toHaveBeenCalledTimes(1);
    expect(mockAppInsights.trackException).toHaveBeenCalledWith({
      error: error,
      severityLevel: SeverityLevel.Error,
      properties: error.toJSON()
    });
  });

  it('does not invoke trackException when appInsights is null', () => {
    telemetryService.getAppInsights.mockReturnValue(null);
    errorLoggingHelper.logApiError(error);
    expect(mockAppInsights.trackException).not.toHaveBeenCalled();
  });
});
