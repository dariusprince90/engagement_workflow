import { action } from '@storybook/addon-actions';

import Card from './Card';

// **********************************************************************
// * configuration

export default {
  title: 'NEI Screen/Views/Client Contact Details View/Components/Card',
  component: Card,

  args: {
    id: 1,
    contactInfoResponseId: 0,
    address1: '3000 Town Center',
    address2: 'Suite 100',
    city: 'Southfield',
    postalCode: '48075',
    countryHierarchyId: 0,
    isPrimary: true,

    onEdit: action(),
    onDelete: action()
  },

  argTypes: {
    id: { table: { disable: true } },
    contactInfoResponseId: {
      table: { category: 'Address', type: { summary: 'number' } },
      type: { required: true }
    },
    address1: {
      table: { category: 'Address', type: { summary: 'string' } },
      control: 'text',
      type: { required: true }
    },
    address2: {
      table: { category: 'Address', type: { summary: 'string' } },
      control: 'text',
      type: { required: true }
    },
    city: {
      table: { category: 'Address', type: { summary: 'string' } },
      control: 'text',
      type: { required: true }
    },
    postalCode: {
      table: { category: 'Address', type: { summary: 'number' } },
      type: { required: true }
    },
    countryHierarchyId: {
      table: { category: 'Address', type: { summary: 'number' } },
      type: { required: true }
    },
    isPrimary: {
      table: { category: 'Contact', type: { summary: 'bool' } },
      control: 'boolean',
      type: { required: true }
    },

    clientContactAddress: { table: { disable: true } },

    onEdit: { table: { category: 'Card' }, type: { required: true } },
    onDelete: { table: { category: 'Card' }, type: { required: true } }
  },

  parameters: {
    backgrounds: { default: 'cfs background' },
    docs: {
      source: { type: 'dynamic', excludeDecorators: true },
      description: { component: 'A card which displays a client address' }
    }
  },

  decorators: [
    (story) => (
      <div className="new-engagement-instance-screen">
        <div id="client-contact-details-view">
          <div className="card-list">
            <div className="mx-auto">{story()}</div>
          </div>
        </div>
      </div>
    )
  ]
};

// **********************************************************************
// * functions

// **********************************************************************
// * template

const Template = (args) => {
  const clientContactAddress = {
    id: args.id,
    contactInfoResponseId: args.contactInfoResponseId,
    address1: args.address1,
    address2: args.address2,
    city: args.city,
    state: args.state,
    postalCode: args.postalCode,
    country: args.country,
    countryHierarchyId: args.countryHierarchyId,
    isPrimary: args.isPrimary
  };

  const props = { clientContactAddress, onEdit: args.onEdit, onDelete: args.onDelete };

  return <Card {...props} />;
};

// **********************************************************************
// * default story

export const Default = Template.bind({});
