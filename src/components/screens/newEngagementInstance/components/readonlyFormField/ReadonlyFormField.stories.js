import { action } from '@storybook/addon-actions';

import DYNAMIC_ALERT_TYPES from '../../../../../helpers/enums/dynamicAlertTypes';
import ReadonlyFormField from './ReadonlyFormField';

// **********************************************************************
// * configuration

export default {
  title: 'NEI Screen/Components/Forms/ReadonlyFormField',
  component: ReadonlyFormField,

  args: {
    name: 'readonly-form-field-001',
    label: 'This is a Label',
    value: 'This is the text',

    icon: false,
    iconType: 'fa-solid fa-pen-to-square',
    iconTitle: 'Edit This Thing',
    iconClassName: 'text-info icon-clickable',
    iconOnClick: action(),

    dynamicAlert: false,
    dynamicAlertType: 'information',
    dynamicAlertMessage: 'This is your message!',

    isRow: false
  },

  argTypes: {
    name: { table: { category: 'General' } },
    label: {
      table: { category: 'General', type: { summary: 'string' } },
      control: 'text'
    },
    value: { table: { category: 'General' } },
    icon: {
      table: { category: 'General' },
      control: 'boolean'
    },

    iconType: { table: { category: 'General' }, if: { arg: 'icon' } },
    iconTitle: { table: { category: 'General' }, if: { arg: 'icon' } },
    iconClassName: { table: { category: 'General' }, if: { arg: 'icon' } },
    iconOnClick: { table: { category: 'General', disable: true } },

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
      description: { component: 'A form field that is always read-only and renders as text' }
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
  const icon = args.icon
    ? { type: args.iconType, title: args.iconTitle, className: args.iconClassName, onClick: args.iconOnClick }
    : null;

  const dynamicAlert = args.dynamicAlert
    ? { type: DYNAMIC_ALERT_TYPES[args.dynamicAlertType], message: args.dynamicAlertMessage }
    : null;

  const { name, label, value, isRow } = args;
  const props = { name, label, value, icon, isRow, dynamicAlert };

  return <ReadonlyFormField {...props} />;
};

// **********************************************************************
// * default story

export const Default = Template.bind({});
