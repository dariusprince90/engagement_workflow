import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withAITracking } from '@microsoft/applicationinsights-react-js';

import * as config from '../configs/config';
import { telemetryService } from './telemetryService';

const propTypes = {
  children: PropTypes.element.isRequired
};

export const TelemetryProvider = ({ children }) => {
  // **********************************************************************
  // * constants

  const [isInitialized, setIsInitialized] = useState(false);

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  useEffect(() => {
    const appInsightsConnectionString = config.AppInsights.connectionString;

    if (!Boolean(isInitialized) && Boolean(appInsightsConnectionString)) {
      telemetryService.initialize(appInsightsConnectionString);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // **********************************************************************
  // * render

  return <>{children}</>;
};

TelemetryProvider.propTypes = propTypes;

export default withAITracking(telemetryService.reactPlugin, TelemetryProvider);
