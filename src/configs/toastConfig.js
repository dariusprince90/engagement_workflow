/* istanbul ignore file -- justification: this is simply a configuration file; no testing needed */

import { toast, Slide } from 'react-toastify';

export const toastConfig = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 5000,
  transition: Slide,
  hideProgressBar: false,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  closeOnClick: true,
  newestOnTop: false,
  draggable: true,
  draggablePercent: 80,
  draggableDirection: 'x',
  theme: 'dark'
};
