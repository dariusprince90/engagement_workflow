import { memo } from 'react';

import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import ButtonContainer from './ButtonContainer';
import CardList from './CardList';

let AddressesSection = () => {
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
    <CollapsibleFormSection title="Addresses">
      <div className="container-fluid">
        <ButtonContainer />
        <CardList />
      </div>
    </CollapsibleFormSection>
  );
};

AddressesSection = memo(AddressesSection);
AddressesSection.displayName = 'AddressesSection';

export default AddressesSection;
