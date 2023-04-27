import { memo } from 'react';

import CollapsibleFormSection from '../../../../common/collapsibleFormSection/CollapsibleFormSection';
import ButtonContainer from './components/ButtonContainer';
import CardList from './components/CardList';

let ClientContactsView = () => {
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
    <div id="client-contacts-view">
      <CollapsibleFormSection title="Client Contacts">
        <div className="container-fluid">
          <ButtonContainer />
          <CardList />
        </div>
      </CollapsibleFormSection>
    </div>
  );
};

ClientContactsView = memo(ClientContactsView);
ClientContactsView.displayName = 'ClientContactsView';

export default ClientContactsView;
