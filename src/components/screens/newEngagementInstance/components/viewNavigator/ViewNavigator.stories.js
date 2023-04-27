import faker from '@faker-js/faker';

import VIEW_STATUSES from '../../../../../helpers/enums/viewStatuses';
import ViewNavigator from './ViewNavigator';

// **********************************************************************
// * configuration

export default {
  title: 'NEI Screen/Components/ViewNavigator',
  component: ViewNavigator,

  args: {
    viewSectionCount: 3,
    withValidationStates: false
  },

  argTypes: {
    viewSections: {
      table: { type: { summary: 'string' }, disable: true }
    },

    viewSectionCount: {
      table: { type: { summary: 'number' } },
      control: 'number'
    },

    withValidationStates: {
      table: { type: { summary: 'bool' } },
      control: 'boolean'
    }
  },

  parameters: {
    docs: {
      source: { type: 'dynamic', excludeDecorators: true },
      description: { component: 'A nav control to display and navigate to the multiple sections within a view' }
    }
  }
};

// **********************************************************************
// * functions

const createViewSections = (sectionCount, withValidationStates) => {
  let viewSections = [];

  for (let i = 0; i < sectionCount; i++) {
    const id = `viewSection${i}`;
    const label = faker.lorem.words(4);
    const status = !withValidationStates
      ? VIEW_STATUSES.normal
      : i % 2 === 0
      ? VIEW_STATUSES.valid
      : VIEW_STATUSES.invalid;
    const viewSection = { id, label, status };

    viewSections.push(viewSection);
  }

  return viewSections;
};

// **********************************************************************
// * template

const Template = (args) => {
  const { viewSectionCount, withValidationStates } = args;

  const viewSections = createViewSections(viewSectionCount, withValidationStates);

  const props = { viewSections };

  return <ViewNavigator {...props} />;
};

// **********************************************************************
// * default story

export const Default = Template.bind({});

// **********************************************************************
// * with validation

export const WithValidation = Template.bind({});
WithValidation.args = { withValidationStates: true };
WithValidation.parameters = { docs: { description: { story: 'ViewNavigator showing validation states' } } };
