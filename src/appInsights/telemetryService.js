/* istanbul ignore file -- justification: this file is for configuring application insights */

import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

let reactPlugin = null;
let appInsights = null;

const createTelemetryService = () => {
  const initialize = (connectionString) => {
    const errorPrefix = 'Could not initialize app insights telemetry service:';

    if (!connectionString) {
      throw new Error(`${errorPrefix} connection string not provided`);
    }

    reactPlugin = new ReactPlugin();

    appInsights = new ApplicationInsights({
      config: {
        connectionString: connectionString,
        maxBatchInterval: 500,
        disableFetchTracking: false,
        autoTrackPageVisitTime: true,
        extensions: [reactPlugin],
        enableAutoRouteTracking: true
      }
    });

    appInsights.loadAppInsights();
  };

  return { reactPlugin, appInsights, initialize };
};

export const telemetryService = createTelemetryService();
export const getAppInsights = () => appInsights;
