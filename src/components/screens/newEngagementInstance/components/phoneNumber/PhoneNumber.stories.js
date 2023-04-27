import { useState } from 'react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { action } from '@storybook/addon-actions';

import DYNAMIC_ALERT_TYPES from '../../../../../helpers/enums/dynamicAlertTypes';
import PhoneNumber from './PhoneNumber';

// **********************************************************************
// * mock redux state

export const state = {
  lookups: {
    countries: {
      data: [
        { isActive: true, countryHierarchyReferenceId: 'US', displayName: 'United States' },
        { isActive: true, countryHierarchyReferenceId: 'CA', displayName: 'Canada' },
        { isActive: true, countryHierarchyReferenceId: 'OT', displayName: 'Other' }
      ],
      isLoading: false,
      hasError: false,
      error: null
    }
  }
};

const mockSlice = createSlice({
  name: 'newEngagementInstance',
  initialState: state,
  reducers: {}
});

const store = configureStore({ reducer: { newEngagementInstance: mockSlice.reducer } });

// **********************************************************************
// * configuration

export default {
  title: 'NEI Screen/Components/Forms/PhoneNumber',
  component: PhoneNumber,

  args: {
    name: 'phone-number-001',
    label: 'Mobile Phone',
    countryHierarchyReferenceId: 'US',
    phoneNumber: '123-456-7890',
    isPrimary: false,
    isRow: false,
    disabled: false,
    onChange: action(),

    // used to build dynamicAlert prop
    dynamicAlert: false,
    dynamicAlertType: 'information',
    dynamicAlertMessage: 'This is your message!'
  },

  argTypes: {
    name: { table: { category: 'General' } },
    label: { table: { category: 'General' } },
    countryHierarchyReferenceId: { table: { category: 'General' } },
    phoneNumber: { table: { category: 'General' } },
    isPrimary: { table: { category: 'General' } },
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
      description: { component: 'An input in which to build a phone number.' }
    }
  },

  excludeStories: /.*state$/,

  decorators: [
    (Story) => (
      <Provider store={store}>
        <div className="new-engagement-instance-screen">
          <div className="container">
            <Story />
          </div>
        </div>
      </Provider>
    )
  ]
};

// **********************************************************************
// * functions

// **********************************************************************
// * template

const Template = (args) => {
  const [countryHierarchyReferenceId, setCountryHierarchyReferenceId] = useState(
    args.countryHierarchyReferenceId ?? ''
  );
  const [phoneNumber, setPhoneNumber] = useState(args.phoneNumber ?? '');
  const [isPrimary, setIsPrimary] = useState(args.isPrimary ?? false);

  const dynamicAlert = args.dynamicAlert
    ? { type: DYNAMIC_ALERT_TYPES[args.dynamicAlertType], message: args.dynamicAlertMessage }
    : null;

  const onChange = (event) => {
    const { countryHierarchyReferenceId, phoneNumber, isPrimary } = event;
    args.onChange(event);
    setCountryHierarchyReferenceId(countryHierarchyReferenceId);
    setPhoneNumber(phoneNumber);
    setIsPrimary(isPrimary);
  };

  const { name, label, isRow, disabled } = args;

  const props = {
    name,
    label,
    countryHierarchyReferenceId,
    phoneNumber,
    isPrimary,
    isRow,
    disabled,
    onChange,
    dynamicAlert
  };

  return <PhoneNumber {...props} />;
};

// **********************************************************************
// * default story

export const Default = Template.bind({});

// **********************************************************************
// * disabled

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
Disabled.parameters = { docs: { description: { story: 'A disabled PhoneNumber component' } } };

// **********************************************************************
// * with dynamic alert

export const WithDynamicAlert = Template.bind({});
WithDynamicAlert.args = {
  dynamicAlert: true,
  dynamicAlertType: 'information',
  dynamicAlertMessage: 'This is your message!'
};
WithDynamicAlert.parameters = { docs: { description: { story: 'A PhoneNumber with a dynamic alert' } } };
