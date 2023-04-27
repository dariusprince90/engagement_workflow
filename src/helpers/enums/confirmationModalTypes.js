/* istanbul ignore file -- justification: this is simply an enumeration; no testing needed */

const CONFIRMATION_MODAL_TYPES = {
  default: { contextClass: 'primary', icon: 'fa-solid fa-circle-question' },
  warning: { contextClass: 'warning', icon: 'fa-solid fa-triangle-exclamation' },
  danger: { contextClass: 'danger', icon: 'fa-solid fa-circle-exclamation' }
};

export default Object.freeze(CONFIRMATION_MODAL_TYPES);
