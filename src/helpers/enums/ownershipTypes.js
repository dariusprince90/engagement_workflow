/* istanbul ignore file -- justification: this is simply an enumeration; no testing needed */

const OWNERSHIP_TYPES = {
  privateEquity: { id: '1', displayName: 'Private Equity / Family Office' },
  ventureCapital: { id: '3', displayName: 'Venture Capital / Investor Owned' }
};

export default Object.freeze(OWNERSHIP_TYPES);
