/* istanbul ignore file -- justification: this is simply an enumeration; no testing needed */

const DYNAMIC_ALERT_TYPES = {
  commonLight: { bsClassSuffix: 'light', defaultIcon: 'fa-solid fa-bell' },
  commonDark: { bsClassSuffix: 'dark', defaultIcon: 'fa-solid fa-bell' },
  error: { bsClassSuffix: 'danger', defaultIcon: 'fa-solid fa-triangle-exclamation' },
  information: { bsClassSuffix: 'info', defaultIcon: 'fa-solid fa-circle-info' },
  success: { bsClassSuffix: 'success', defaultIcon: 'fa-solid fa-check' },
  warning: { bsClassSuffix: 'warning', defaultIcon: 'fa-solid fa-triangle-exclamation' }
};

export default Object.freeze(DYNAMIC_ALERT_TYPES);
