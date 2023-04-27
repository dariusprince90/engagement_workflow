import ErrorAlert from './ErrorAlert';

// **********************************************************************
// * configuration

export default {
  title: 'Components/Common/Alerts/ErrorAlert',
  component: ErrorAlert,

  args: {
    displayMessage: 'This is the display message!',
    errorMessage: 'This is an error message!',
    traceId: '00000000-0000-0000-0000-000000000000'
  },

  argTypes: {
    displayMessage: {
      table: { type: { summary: 'string' } },
      control: 'text'
    },
    errorMessage: { table: { type: { summary: 'string' } } },
    traceId: { table: { type: { summary: 'string' } } },
    error: { table: { disable: true } }
  },

  parameters: {
    docs: {
      source: { type: 'dynamic', excludeDecorators: true },
      description: { component: 'An alert that shows error information' }
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
  const { displayMessage, errorMessage, traceId } = args;
  const error = { message: errorMessage, traceId };
  const props = { displayMessage, error };

  return <ErrorAlert {...props} />;
};

// **********************************************************************
// * default story

export const Default = Template.bind({});
