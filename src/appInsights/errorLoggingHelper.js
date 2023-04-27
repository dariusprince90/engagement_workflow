import { SeverityLevel } from '@microsoft/applicationinsights-web';

import { getAppInsights } from '../appInsights/telemetryService';

class ErrorLoggingHelper {
  static logApiError = (error) => {
    const appInsights = getAppInsights();

    if (appInsights) {
      appInsights.trackException({ error: error, severityLevel: SeverityLevel.Error, properties: error.toJSON() });
    }
  };
}

export default ErrorLoggingHelper;
