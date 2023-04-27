/* istanbul ignore file -- justification: this is simply an enumeration; no testing needed */

const ATTACHMENT_TYPES = {
  memo: { id: 1, displayName: 'Memo' },
  financialStatement: { id: 2, displayName: 'Financial Statement' },
  other: { id: 3, displayName: 'Other' }
};

export default Object.freeze(ATTACHMENT_TYPES);
