/* istanbul ignore file -- justification: this is simply an enumeration; no testing needed */

const ATTACHMENT_ACTION_TYPES = {
  create: { id: 1, displayName: 'Create Attachment' },
  read: { id: 2, displayName: 'Read Attachment' },
  delete: { id: 3, displayName: 'Delete Attachment' }
};

export default Object.freeze(ATTACHMENT_ACTION_TYPES);
