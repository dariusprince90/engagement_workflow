import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';

import ClientContactDetailsView from './ClientContactDetailsView';

// **********************************************************************
// * constants

const testIds = {
  addressesSection: 'addresses-section',
  clientCommunicationInfoSection: 'client-communication-info-section'
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <ClientContactDetailsView />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./components/addressesSection/AddressesSection', () => ({
  __esModule: true,
  default: () => <fake-addresses-section data-testid={testIds.addressesSection} />
}));

jest.mock('./components/clientCommunicationInfoSection/ClientCommunicationInfoSection', () => ({
  __esModule: true,
  default: () => <fake-client-communication-section data-testid={testIds.clientCommunicationInfoSection} />
}));

// **********************************************************************
// * unit tests

describe('ClientContactDetailsView', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  it('renders AddressesSection component', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.addressesSection)).toBeInTheDocument();
  });

  it('renders ClientCommunicationInfoSection component', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.clientCommunicationInfoSection)).toBeInTheDocument();
  });
});
