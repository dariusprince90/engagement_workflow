/* istanbul ignore file -- justification: this is a default file from create-react-app and does not require testing */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './scss/site.scss';
import './configs/fontAwesomeConfig';
import './configs/modals';

import { store } from './app/store';
import reportWebVitals from './reportWebVitals';

import App from './App';
import ErrorBoundary from './components/common/errorBoundary/ErrorBoundary';
import Msal from './msal/Msal';
import TelemetryProvider from './appInsights/TelemetryProvider';

const AppProvider = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary isRootBoundary>
        <Router>
          <TelemetryProvider>
            <Msal>
              <App />
            </Msal>
          </TelemetryProvider>
        </Router>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(<AppProvider />, document.getElementById('root'));

// To start measuring performance, pass a function to log results
// (for example: reportWebVitals(console.log)) or send to an analytics endpoint.
// Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line no-console
reportWebVitals();
