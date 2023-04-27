import { action } from '@storybook/addon-actions';

import CONFIRMATION_MODAL_TYPES from '../../../../../helpers/enums/confirmationModalTypes';
import ConfirmationModal from './ConfirmationModal';

// **********************************************************************
// * configuration

export default {
  title: 'NEI Screen/Components/Modals/ConfirmationModal',
  component: ConfirmationModal,

  args: {
    isOpen: true,
    confirmationType: 'default',
    title: 'Are you sure?',
    message: 'Do you want to perform this action?',
    confirmButtonText: 'Yes',
    onConfirm: action(),
    onCancel: action()
  },

  argTypes: {
    confirmationType: {
      control: 'select',
      options: Object.keys(CONFIRMATION_MODAL_TYPES)
    }
  },

  parameters: {
    docs: {
      source: { type: 'dynamic', excludeDecorators: true },
      description: { component: 'A modal in which to confirm an action' }
    }
  },

  decorators: [
    (story) => (
      <div className="new-engagement-instance-screen">
        {content}
        {story()}
      </div>
    )
  ]
};

// **********************************************************************
// * additional template vars

const content = (
  <div className="container-fluid">
    <h4>Phasellus venenatis nibh a interdum commodo</h4>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae blandit nisi. Nunc lacinia imperdiet risus in
      vehicula. Ut pulvinar felis metus, et fermentum diam mollis non. Maecenas vulputate, leo vel posuere vulputate, ex
      quam vehicula ex, non efficitur dolor nisi eu lacus. Phasellus volutpat consequat diam, vulputate ullamcorper
      erat. Cras sollicitudin faucibus nunc eu faucibus. Donec consectetur venenatis turpis. Mauris ac erat a ex
      malesuada pharetra id vel leo. Maecenas at nisi in ex tristique vehicula. Ut vitae pellentesque tortor, eget
      ultricies tortor. Aliquam vitae mauris molestie, vehicula eros vel, suscipit leo. Ut sed ante posuere, vestibulum
      mi at, tincidunt sapien. Praesent et diam ut ipsum congue fermentum at sit amet justo.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae blandit nisi. Nunc lacinia imperdiet risus in
      vehicula. Ut pulvinar felis metus, et fermentum diam mollis non. Maecenas vulputate, leo vel posuere vulputate, ex
      quam vehicula ex, non efficitur dolor nisi eu lacus. Phasellus volutpat consequat diam, vulputate ullamcorper
      erat. Cras sollicitudin faucibus nunc eu faucibus. Donec consectetur venenatis turpis. Mauris ac erat a ex
      malesuada pharetra id vel leo. Maecenas at nisi in ex tristique vehicula. Ut vitae pellentesque tortor, eget
      ultricies tortor. Aliquam vitae mauris molestie, vehicula eros vel, suscipit leo. Ut sed ante posuere, vestibulum
      mi at, tincidunt sapien. Praesent et diam ut ipsum congue fermentum at sit amet justo.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae blandit nisi. Nunc lacinia imperdiet risus in
      vehicula. Ut pulvinar felis metus, et fermentum diam mollis non. Maecenas vulputate, leo vel posuere vulputate, ex
      quam vehicula ex, non efficitur dolor nisi eu lacus. Phasellus volutpat consequat diam, vulputate ullamcorper
      erat. Cras sollicitudin faucibus nunc eu faucibus. Donec consectetur venenatis turpis. Mauris ac erat a ex
      malesuada pharetra id vel leo. Maecenas at nisi in ex tristique vehicula. Ut vitae pellentesque tortor, eget
      ultricies tortor. Aliquam vitae mauris molestie, vehicula eros vel, suscipit leo. Ut sed ante posuere, vestibulum
      mi at, tincidunt sapien. Praesent et diam ut ipsum congue fermentum at sit amet justo.
    </p>
  </div>
);

// **********************************************************************
// * functions

// **********************************************************************
// * template

const Template = (args) => {
  const { isOpen, confirmationType, title, message, confirmButtonText, onConfirm, onCancel } = args;
  const confirmationTypeProp = CONFIRMATION_MODAL_TYPES[confirmationType];
  const props = {
    isOpen,
    confirmationType: confirmationTypeProp,
    title,
    message,
    confirmButtonText,
    onConfirm,
    onCancel
  };

  return <ConfirmationModal {...props} />;
};

// **********************************************************************
// * default story

export const DefaultType = Template.bind({});

// **********************************************************************
// * warning

export const WarningType = Template.bind({});
WarningType.args = {
  isOpen: false,
  confirmationType: 'warning',
  title: 'Cancel?',
  message: 'Do you want to cancel your chnges?',
  confirmButtonText: 'Yes, cancel'
};
WarningType.parameters = { docs: { description: { story: 'Confirmation modal in the "warning" type' } } };

// **********************************************************************
// * danger

export const DangerType = Template.bind({});
DangerType.args = {
  isOpen: false,
  confirmationType: 'danger',
  title: 'Delete Resource?',
  message: 'Are you sure you want to delete this resource? This cannot be undone.',
  confirmButtonText: 'Delete'
};
DangerType.parameters = { docs: { description: { story: 'Confirmation modal in the "danger" type' } } };
