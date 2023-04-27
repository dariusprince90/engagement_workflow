/* istanbul ignore file -- justification: this is simply an enumeration; no testing needed */

const COMMENT_TYPES = {
  Return: {
    id: 1,
    modalTitle: 'Return this workflow',
    commentsFieldLabel: 'Please enter the reason for returning this workflow',
    submitButtonText: 'Return Workflow'
  },
  Reject: {
    id: 2,
    modalTitle: 'Reject this workflow',
    commentsFieldLabel: 'Please enter the reason for rejecting this workflow',
    submitButtonText: 'Reject Workflow'
  },
  Terminate: {
    id: 3,
    modalTitle: 'Terminate this workflow',
    commentsFieldLabel: 'Please enter the reason for terminating this workflow',
    submitButtonText: 'Terminate Workflow'
  }
};

export default Object.freeze(COMMENT_TYPES);
