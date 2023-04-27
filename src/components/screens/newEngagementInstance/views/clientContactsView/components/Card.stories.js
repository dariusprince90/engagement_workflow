import { action } from '@storybook/addon-actions';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import Card from './Card';

// **********************************************************************
// * mock redux state

export const state = {
  lookups: {
    prefixes: { data: [{ id: 1, displayName: 'Mr.' }] },
    suffixes: { data: [{ id: 1, displayName: 'Jr.' }] }
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
  title: 'NEI Screen/Views/Client Contacts View/Components/Card',
  component: Card,

  args: {
    id: 1,
    prefixId: 1,
    firstName: 'Holly',
    lastName: 'Gennero',
    suffixId: 1,
    emailAddress: 'holly.gennero@nakatomi-corp.com',
    receiveCustomerInvoice: true,
    receiveCustomerStatement: false,
    isPrimary: true,

    internationalPhoneCode1: 1,
    phoneNumber1: '310-555-1234',
    phoneDeviceTypeName1: 'Office',
    isPrimary1: true,

    internationalPhoneCode2: 1,
    phoneNumber2: '310-555-9876',
    phoneDeviceTypeName2: 'Office',
    isPrimary2: false,

    onEdit: action(),
    onDelete: action()
  },

  argTypes: {
    id: { table: { disable: true } },
    prefixId: {
      table: { category: 'Contact', type: { summary: 'number' } },
      type: { required: false }
    },
    firstName: {
      table: { category: 'Contact', type: { summary: 'string' } },
      control: 'text',
      type: { required: true }
    },
    lastName: {
      table: { category: 'Contact', type: { summary: 'string' } },
      control: 'text',
      type: { required: true }
    },
    suffixId: {
      table: { category: 'Contact', type: { summary: 'number' } },
      type: { required: false }
    },
    emailAddress: {
      table: { category: 'Contact', type: { summary: 'string' } },
      control: 'text',
      type: { required: true }
    },
    receiveCustomerInvoice: {
      table: { category: 'Contact', type: { summary: 'bool' } },
      control: 'boolean',
      type: { required: true }
    },
    receiveCustomerStatement: {
      table: { category: 'Contact', type: { summary: 'bool' } },
      control: 'boolean',
      type: { required: true }
    },
    isPrimary: {
      table: { category: 'Contact', type: { summary: 'bool' } },
      control: 'boolean',
      type: { required: true }
    },

    internationalPhoneCode1: {
      table: { category: 'Phone Numbers', subcategory: 'Phone 1', type: { summary: 'number' } },
      type: { required: true }
    },
    phoneNumber1: {
      table: { category: 'Phone Numbers', subcategory: 'Phone 1', type: { summary: 'string' } },
      type: { required: true }
    },
    phoneDeviceTypeName1: {
      table: { category: 'Phone Numbers', subcategory: 'Phone 1', type: { summary: 'string' } },
      type: { required: true }
    },
    isPrimary1: {
      table: { category: 'Phone Numbers', subcategory: 'Phone 1', type: { summary: 'bool' } },
      type: { required: true }
    },

    internationalPhoneCode2: {
      table: { category: 'Phone Numbers', subcategory: 'Phone 2', type: { summary: 'number' } },
      type: { required: true }
    },
    phoneNumber2: {
      table: { category: 'Phone Numbers', subcategory: 'Phone 2', type: { summary: 'string' } },
      type: { required: true }
    },
    phoneDeviceTypeName2: {
      table: { category: 'Phone Numbers', subcategory: 'Phone 2', type: { summary: 'string' } },
      type: { required: true }
    },
    isPrimary2: {
      table: { category: 'Phone Numbers', subcategory: 'Phone 2', type: { summary: 'bool' } },
      type: { required: true }
    },

    clientContact: { table: { disable: true } },

    onEdit: { table: { category: 'Card' }, type: { required: true } },
    onDelete: { table: { category: 'Card' }, type: { required: true } }
  },

  parameters: {
    backgrounds: { default: 'cfs background' },
    docs: {
      source: { type: 'dynamic', excludeDecorators: true },
      description: { component: 'A card which displays information about a client contact' }
    }
  },

  excludeStories: /.*state$/,

  decorators: [
    (story) => (
      <Provider store={store}>
        <div className="new-engagement-instance-screen">
          <div id="client-contacts-view">
            <div className="card-list">
              <div className="mx-auto">{story()}</div>
            </div>
          </div>
        </div>
      </Provider>
    )
  ]
};

// **********************************************************************
// * functions

const createPhoneNumber = (internationalPhoneCode, phoneNumber, phoneDeviceTypeName, isPrimary) => {
  return { internationalPhoneCode, phoneNumber, phoneDeviceTypeName, isPrimary };
};

// **********************************************************************
// * template

const Template = (args) => {
  const phone1 = createPhoneNumber(
    args.internationalPhoneCode1,
    args.phoneNumber1,
    args.phoneDeviceTypeName1,
    args.isPrimary1
  );

  const phone2 = createPhoneNumber(
    args.internationalPhoneCode2,
    args.phoneNumber2,
    args.phoneDeviceTypeName2,
    args.isPrimary2
  );

  const clientContact = {
    id: args.id,
    prefixId: args.prefixId,
    firstName: args.firstName,
    lastName: args.lastName,
    suffixId: args.suffixId,
    emailAddress: args.emailAddress,
    receiveCustomerInvoice: args.receiveCustomerInvoice,
    receiveCustomerStatement: args.receiveCustomerStatement,
    isPrimary: args.isPrimary,
    clientContactPhoneNumbers: [phone1, phone2]
  };

  const props = { clientContact, onEdit: args.onEdit, onDelete: args.onDelete };

  return <Card {...props} />;
};

// **********************************************************************
// * default story

export const Default = Template.bind({});
