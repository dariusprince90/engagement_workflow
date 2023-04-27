import ProgressAlert from './ProgressAlert';

// **********************************************************************
// * configuration

export default {
  title: 'Components/Common/Alerts/ProgressAlert',
  component: ProgressAlert,

  args: {
    alertType: 'info',
    message: 'This is the progress message...',
    percentComplete: 50
  },

  argTypes: {
    alertType: { control: 'select' },
    message: { table: { type: { summary: 'string' } }, control: 'text' },
    percentComplete: { control: 'number' }
  },

  parameters: {
    docs: {
      source: { type: 'dynamic', excludeDecorators: true },
      description: { component: 'An alert that shows progress (where a % complete cannot be known)' }
    }
  }
};

// **********************************************************************
// * additional template vars

// **********************************************************************
// * functions

// **********************************************************************
// * template

const Template = (args) => {
  const { alertType, message, percentComplete } = args;
  const props = { alertType, message, percentComplete };

  return <ProgressAlert {...props} />;
};

// **********************************************************************
// * default story

export const Default = Template.bind({});

// **********************************************************************
// * style: information

export const StyledInfo = Template.bind({});
StyledInfo.args = { alertType: 'info' };
StyledInfo.parameters = { docs: { description: { story: 'Styled with the "info" style' } } };

// **********************************************************************
// * style: warning

export const StyledWarning = Template.bind({});
StyledWarning.args = { alertType: 'warning' };
StyledWarning.parameters = { docs: { description: { story: 'Styled with the "warning" style' } } };
