/* istanbul ignore file -- justification: this is simply an enumeration; no testing needed */

const CLIENT_SEARCH_TYPES = {
  existing: { id: 1, type: 'existing' },
  newFromCrmOrg: { id: 2, type: 'newFromCrmOrg' },
  newFromCrmContact: { id: 3, type: 'newFromCrmContact' }
};

export default Object.freeze(CLIENT_SEARCH_TYPES);
