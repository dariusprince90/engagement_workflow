import { memo } from 'react';

import AddressesSection from './components/addressesSection/AddressesSection';
import ClientCommunicationInfoSection from './components/clientCommunicationInfoSection/ClientCommunicationInfoSection';

let ClientContactDetailsView = () => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div id="client-contact-details-view">
      <AddressesSection />
      <ClientCommunicationInfoSection />
    </div>
  );
};

ClientContactDetailsView = memo(ClientContactDetailsView);
ClientContactDetailsView.displayName = 'ClientContactDetailsView';

export default ClientContactDetailsView;
