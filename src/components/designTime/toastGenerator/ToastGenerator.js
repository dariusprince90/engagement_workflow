/* istanbul ignore file -- justification: this is a design-time component and doesn't need to be tested */

import { toast } from 'react-toastify';

const ToastGenerator = () => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  const showColoredToasts = () => {
    const opts = { theme: 'colored' };

    toast('Lorem ipsum dolor', opts);
    toast.info('Lorem ipsum dolor', opts);
    toast.success('Lorem ipsum dolor', opts);
    toast.error('Lorem ipsum dolor', opts);
    toast.warn('Lorem ipsum dolor', opts);
  };

  const showDarkToasts = () => {
    const opts = { theme: 'dark' };

    toast('Lorem ipsum dolor', opts);
    toast.info('Lorem ipsum dolor', opts);
    toast.success('Lorem ipsum dolor', opts);
    toast.error('Lorem ipsum dolor', opts);
    toast.warn('Lorem ipsum dolor', opts);
  };

  const showLightToasts = () => {
    const opts = { theme: 'light' };

    toast('Lorem ipsum dolor', opts);
    toast.info('Lorem ipsum dolor', opts);
    toast.success('Lorem ipsum dolor', opts);
    toast.error('Lorem ipsum dolor', opts);
    toast.warn('Lorem ipsum dolor', opts);
  };

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <>
      <button className="btn btn-sm btn-light" onClick={showLightToasts}>
        toast:light
      </button>
      <button className="btn btn-sm btn-light" onClick={showDarkToasts}>
        toast:dark
      </button>
      <button className="btn btn-sm btn-light" onClick={showColoredToasts}>
        toast:colored
      </button>
    </>
  );
};

export default ToastGenerator;
