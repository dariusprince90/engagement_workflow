import { useState } from 'react';
import { action } from '@storybook/addon-actions';

import DYNAMIC_ALERT_TYPES from '../../../../../helpers/enums/dynamicAlertTypes';
import INPUT_GROUP_ADD_ON_TYPES from '../../../../../helpers/enums/inputGroupAddOnTypes';
import SelectBox from './SelectBox';

// **********************************************************************
// * configuration

export default {
  title: 'NEI Screen/Components/Forms/SelectBox',
  component: SelectBox,

  args: {
    name: 'select-box-001',
    label: 'Select an Item',
    value: '',
    defaultOption: 'Select something...',
    options: [
      { value: 1, text: 'Item 1' },
      { value: 2, text: 'Item 2' },
      { value: 3, text: 'Item 3' },
      { value: 4, text: 'Item 4' }
    ],
    isLoading: false,
    loadingText: 'Loading items...',
    disabled: false,
    readOnly: false,
    isRow: false,

    // used to build prependAddOns prop
    prependAddOn: false,
    prependAddOnType: 'text',
    prependAddOnText: 'add-on-text',
    prependAddOnIcon: 'fa-solid fa-cog',
    prependAddOnButtonClass: 'btn btn-primary',
    prependAddOnButtonOnClick: action(),

    // used to build appendAddOns prop
    appendAddOn: false,
    appendAddOnType: 'text',
    appendAddOnText: 'add-on-text',
    appendAddOnIcon: 'fa-solid fa-cog',
    appendAddOnButtonClass: 'btn btn-primary',
    appendAddOnButtonOnClick: action(),

    // used to build dynamicAlert prop
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
    value: { table: { category: 'General' } },
    defaultOption: { table: { category: 'General' } },
    options: { table: { category: 'General' } },
    isLoading: { table: { category: 'General' } },
    loadingText: { table: { category: 'General' } },
    disabled: { table: { category: 'General' } },
    readOnly: { table: { category: 'General' } },
    onChange: { table: { category: 'General' } },

    prependAddOns: { table: { category: 'Input Group', disable: true } },
    prependAddOn: {
      table: { category: 'Input Group', type: { summary: 'bool' } },
      control: 'boolean'
    },
    prependAddOnType: {
      table: { category: 'Input Group' },
      if: { arg: 'prependAddOn' },
      control: 'select',
      options: Object.keys(INPUT_GROUP_ADD_ON_TYPES)
    },
    prependAddOnText: {
      table: { category: 'Input Group' },
      if: { arg: 'prependAddOn' },
      control: 'text'
    },
    prependAddOnIcon: {
      table: { category: 'Input Group' },
      if: { arg: 'prependAddOn' },
      control: 'text'
    },
    prependAddOnButtonClass: {
      table: { category: 'Input Group' },
      if: { arg: 'prependAddOn' },
      control: 'text'
    },
    prependAddOnButtonOnClick: { table: { category: 'Input Group', disable: true } },

    appendAddOns: { table: { category: 'Input Group', disable: true } },
    appendAddOn: {
      table: { category: 'Input Group', type: { summary: 'bool' } },
      control: 'boolean'
    },
    appendAddOnType: {
      table: { category: 'Input Group' },
      if: { arg: 'appendAddOn' },
      control: 'select',
      options: Object.keys(INPUT_GROUP_ADD_ON_TYPES)
    },
    appendAddOnText: {
      table: { category: 'Input Group' },
      if: { arg: 'appendAddOn' },
      control: 'text'
    },
    appendAddOnIcon: {
      table: { category: 'Input Group' },
      if: { arg: 'appendAddOn' },
      control: 'text'
    },
    appendAddOnButtonClass: {
      table: { category: 'Input Group' },
      if: { arg: 'appendAddOn' },
      control: 'text'
    },
    appendAddOnButtonOnClick: { table: { category: 'Input Group', disable: true } },

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
      description: { component: 'An input with multiple options from which to select' }
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
// * functions

const createAddOns = (addOnType, addOnText, addOnIcon, buttonClass, onClick) => {
  switch (addOnType) {
    case 'text':
      return [{ addOnType: INPUT_GROUP_ADD_ON_TYPES.text, text: addOnText }];
    case 'icon':
      return [{ addOnType: INPUT_GROUP_ADD_ON_TYPES.icon, icon: addOnIcon }];
    case 'button':
      return [
        {
          addOnType: INPUT_GROUP_ADD_ON_TYPES.button,
          text: addOnText,
          buttonClass,
          onClick: (event) => onClick('clicked!', event)
        }
      ];
    default:
      return null;
  }
};

// **********************************************************************
// * template

const Template = (args) => {
  const [value, setValue] = useState(args.value ?? '');

  const prependAddOns = args.prependAddOn
    ? createAddOns(
        args.prependAddOnType,
        args.prependAddOnText,
        args.prependAddOnIcon,
        args.prependAddOnButtonClass,
        args.prependAddOnButtonOnClick
      )
    : null;

  const appendAddOns = args.appendAddOn
    ? createAddOns(
        args.appendAddOnType,
        args.appendAddOnText,
        args.appendAddOnIcon,
        args.appendAddOnButtonClass,
        args.appendAddOnButtonOnClick
      )
    : null;

  const dynamicAlert = args.dynamicAlert
    ? { type: DYNAMIC_ALERT_TYPES[args.dynamicAlertType], message: args.dynamicAlertMessage }
    : null;

  const onChange = (event) => {
    const newValue = event.target.value;
    args.onChange(newValue, event);
    setValue(newValue);
  };

  const { name, label, defaultOption, options, isLoading, loadingText, isRow, disabled, readOnly } = args;

  const props = {
    name,
    label,
    defaultOption,
    options,
    isLoading,
    loadingText,
    isRow,
    disabled,
    readOnly,
    value,
    prependAddOns,
    appendAddOns,
    dynamicAlert,
    onChange
  };

  return <SelectBox {...props} />;
};

// **********************************************************************
// * default story

export const Default = Template.bind({});

// **********************************************************************
// * disabled

export const Disabled = Template.bind({});
Disabled.args = { disabled: true, value: 1 };
Disabled.parameters = { docs: { description: { story: 'A disabled SelectBox' } } };

// **********************************************************************
// * with add-ons

export const WithAddOns = Template.bind({});
WithAddOns.args = {
  prependAddOn: true,
  prependAddOnType: 'icon',
  prependAddOnText: 'add-on-text',
  prependAddOnIcon: 'fa-solid fa-dollar-sign',
  prependAddOnButtonClass: 'btn btn-primary',
  prependAddOnButtonOnClick: action(),

  appendAddOn: true,
  appendAddOnType: 'button',
  appendAddOnText: 'submit',
  appendAddOnButtonClass: 'btn btn-primary',
  appendAddOnButtonOnClick: action()
};
WithAddOns.parameters = { docs: { description: { story: 'A SelectBox with add-ons' } } };

// **********************************************************************
// * with dynamic alert

export const WithDynamicAlert = Template.bind({});
WithDynamicAlert.args = {
  dynamicAlert: true,
  dynamicAlertType: 'information',
  dynamicAlertMessage: 'This is your message!'
};
WithDynamicAlert.parameters = { docs: { description: { story: 'A SelectBox with a dynamic alert' } } };
