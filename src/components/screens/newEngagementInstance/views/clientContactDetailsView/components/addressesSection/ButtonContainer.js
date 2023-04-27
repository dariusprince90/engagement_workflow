import { memo } from 'react';

let ButtonContainer = () => {
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
    <div className="button-container text-right">
      <button type="button" className="btn btn-primary" onClick={() => {}}>
        Add Address
      </button>
    </div>
  );
};

ButtonContainer = memo(ButtonContainer);
ButtonContainer.displayName = 'ButtonContainer';

export default ButtonContainer;
