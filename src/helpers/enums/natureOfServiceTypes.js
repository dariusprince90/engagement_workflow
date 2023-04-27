/* istanbul ignore file -- justification: this is simply an enumeration; no testing needed */

const NATURE_OF_SERVICE_TYPES = {
  attest: { id: 1, displayName: 'Attest' },
  nonAttest: { id: 2, displayName: 'Non-Attest' }
};

export default Object.freeze(NATURE_OF_SERVICE_TYPES);
