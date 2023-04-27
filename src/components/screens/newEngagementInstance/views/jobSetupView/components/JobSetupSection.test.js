import ReactDOM from 'react-dom';
import { render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import JobSetupSection from './JobSetupSection';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',
  jobSetupFields: 'job-setup-fields'
};

const defaultProps = {
  id: faker.random.alphaNumeric(10),
  title: faker.random.alphaNumeric(10)
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <JobSetupSection {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('../../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ id, title, children }) => {
    const props = { id, title, children };
    return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
  }
}));

jest.mock('./JobSetupFields', () => ({
  __esModule: true,
  default: () => {
    return <fake-job-setup-fields data-testid={testIds.jobSetupFields} />;
  }
}));

// **********************************************************************
// * unit tests

describe('JobSetupSection', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('CollapsibleFormSection', () => {
    it('is rendered', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.collapsibleFormSection)).toBeInTheDocument();
    });

    it('has correct id', () => {
      const expectedId = defaultProps.id;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('id', expectedId);
    });

    it('has correct title', () => {
      const expectedTitle = defaultProps.title;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
    });
  });

  describe('JobSetupFields', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.jobSetupFields)).toBeInTheDocument();
    });
  });
});
