import { action } from '@storybook/addon-actions';

import COMMENT_TYPES from '../../../../../helpers/enums/commentTypes';
import WorkflowCommentsModal from './WorkflowCommentsModal';

// **********************************************************************
// * configuration

export default {
  title: 'NEI Screen/Components/Modals/WorkflowCommentsModal',
  component: WorkflowCommentsModal,

  args: {
    isOpen: true,
    commentType: 'Terminate',
    onCancel: action(),
    onSubmit: action()
  },

  argTypes: {
    commentType: {
      control: 'select',
      options: Object.keys(COMMENT_TYPES)
    }
  },

  parameters: {
    docs: {
      source: { type: 'dynamic', excludeDecorators: true },
      description: { component: 'A modal in which to enter workflow comments' }
    }
  }
};

// **********************************************************************
// * functions

// **********************************************************************
// * template

const Template = (args) => {
  const { isOpen, commentType, onCancel, onSubmit } = args;
  const commentTypeProp = COMMENT_TYPES[commentType];
  const props = { isOpen, commentType: commentTypeProp, onCancel, onSubmit };

  return <WorkflowCommentsModal {...props} />;
};

// **********************************************************************
// * default story

export const Default = Template.bind({});
