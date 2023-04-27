import { memo } from 'react';

import SelectNatureOfServiceSection from './components/SelectNatureOfServiceSection';
import NaturesOfServiceTable from './components/NaturesOfServiceTable';

let NatureOfServiceView = () => {
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
    <div id="natures-of-service-view">
      <SelectNatureOfServiceSection />
      <NaturesOfServiceTable />
    </div>
  );
};

NatureOfServiceView = memo(NatureOfServiceView);

export default NatureOfServiceView;
