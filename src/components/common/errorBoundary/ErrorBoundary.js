import React from 'react';
import PropTypes from 'prop-types';
import { SeverityLevel } from '@microsoft/applicationinsights-common';

import { getAppInsights } from '../../../appInsights/telemetryService';
import ApplicationFault from '../applicationFault/ApplicationFault';

const propTypes = {
  isRootBoundary: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const appInsights = getAppInsights();

    if (appInsights) {
      appInsights.trackException({
        error: error,
        exception: error,
        severityLevel: SeverityLevel.Error,
        properties: errorInfo
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return <ApplicationFault showPmLogo={this.props.isRootBoundary} />;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = propTypes;

export default ErrorBoundary;
