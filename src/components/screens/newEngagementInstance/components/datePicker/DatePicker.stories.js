import { useState } from 'react';

import DYNAMIC_ALERT_TYPES from '../../../../../helpers/enums/dynamicAlertTypes';
import DatePicker from './DatePicker';

// **********************************************************************
// * configuration

export default {
  title: 'NEI Screen/Components/Forms/DatePicker',
  component: DatePicker,

  args: {
    name: 'date-picker-001',
    label: 'When is it?',
    value: null,
    placeholder: 'Select a date...',
    isRow: false,
    disabled: false,

    dynamicAlert: false,
    dynamicAlertType: 'information',
    dynamicAlertMessage: 'This is your message!'
  },

  argTypes: {
    name: { table: { category: 'General' } },
    label: {
      table: { category: 'General', type: { summary: 'string' } },
      control: 'text'
    },
    value: {
      table: { category: 'General' },
      control: 'date'
    },
    placeholder: { table: { category: 'General' } },
    disabled: { table: { category: 'General' } },
    onChange: { table: { category: 'General' } },

    isRow: { table: { category: 'Form Group' } },

    dynamicAlert: {
      table: { category: 'Form Group', type: { summary: 'bool' } },
      control: 'boolean'
    },
    dynamicAlertType: {
      table: { category: 'Form Group' },
      if: { arg: 'dynamicAlert' },
      control: 'select',
      options: Object.keys(DYNAMIC_ALERT_TYPES)
    },
    dynamicAlertMessage: {
      table: { category: 'Form Group' },
      if: { arg: 'dynamicAlert' },
      control: 'text'
    }
  },

  parameters: {
    backgrounds: { default: 'cfs background' },
    docs: {
      source: { type: 'dynamic', excludeDecorators: true },
      description: { component: 'An input in which to enter a date' }
    }
  },

  decorators: [
    (story) => (
      <div className="new-engagement-instance-screen">
        <div className="container">{story()}</div>
      </div>
    )
  ]
};

// **********************************************************************
// * template

const Template = (args) => {
  const [value, setValue] = useState(args.value ? new Date(args.value) : null);

  const dynamicAlert = args.dynamicAlert
    ? { type: DYNAMIC_ALERT_TYPES[args.dynamicAlertType], message: args.dynamicAlertMessage }
    : null;

  const onChange = (newDate) => {
    args.onChange(newDate);
    setValue(newDate);
  };

  const { name, label, placeholder, isRow, disabled } = args;
  const props = { name, label, placeholder, isRow, disabled, value, dynamicAlert, onChange };

  return <DatePicker {...props} />;
};

// **********************************************************************
// * default story

export const Default = Template.bind({});
