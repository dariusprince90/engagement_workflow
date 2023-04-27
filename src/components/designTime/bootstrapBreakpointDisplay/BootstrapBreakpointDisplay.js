/* istanbul ignore file -- justification: this is a design-time component and doesn't need to be tested */

import './BootstrapBreakpointDisplay.scss';

const BootstrapBreakpointDisplay = () => {
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
    <div className="bootstrap-breakpoint-display-container" title="bootstrap breakpoint">
      <div className="d-flex d-sm-none">
        <button className="btn btn-sm btn-light">bs:XS</button>
      </div>
      <div className="d-none d-sm-flex d-md-none">
        <button className="btn btn-sm btn-light">bs:SM</button>
      </div>
      <div className="d-none d-md-flex d-lg-none">
        <button className="btn btn-sm btn-light">bs:MD</button>
      </div>
      <div className="d-none d-lg-flex d-xl-none">
        <button className="btn btn-sm btn-light">bs:LG</button>
      </div>
      <div className="d-none d-xl-flex">
        <button className="btn btn-sm btn-light">bs:XL</button>
      </div>
    </div>
  );
};

export default BootstrapBreakpointDisplay;
