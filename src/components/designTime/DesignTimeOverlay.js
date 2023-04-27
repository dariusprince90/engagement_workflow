/* istanbul ignore file -- justification: this is a design-time component and doesn't need to be tested */

import './DesignTimeOverlay.scss';

import BootstrapBreakpointDisplay from './bootstrapBreakpointDisplay/BootstrapBreakpointDisplay';
import ModalExample from './modalExample/ModalExample';
import ToastGenerator from './toastGenerator/ToastGenerator';

const DesignTimeOverlay = () => {
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
    <div className="design-time-overlay">
      <BootstrapBreakpointDisplay />
      <ToastGenerator />
      <ModalExample />
    </div>
  );
};

export default DesignTimeOverlay;
