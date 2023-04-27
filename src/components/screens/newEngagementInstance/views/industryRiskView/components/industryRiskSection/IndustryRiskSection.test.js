import ReactDOM from 'react-dom';
import { render, screen, within } from '@testing-library/react';

import IndustryRiskSection from './IndustryRiskSection';

// **********************************************************************
// * constants

const testIds = {
  // form header fields
  finalApprovalStepFormHeader: 'final-approval-step-form-header',

  collapsibleFormSection: 'collapsible-form-section',
  governmentalIndustryFields: 'governmental-industry-fields',
  constructionIndustryFields: 'construction-industry-fields',
  realEstateIndustryFields: 'real-estate-industry-fields',
  k12EducationIndustryFields: 'k12-education-industry-fields'
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <IndustryRiskSection />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('../../../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ title, children }) => (
    <fake-collapsible-form-section title={title} children={children} data-testid={testIds.collapsibleFormSection} />
  )
}));

jest.mock('../../../../../../common/formHeader/FormHeader', () => {
  return {
    __esModule: true,
    default: ({ name, text }) => {
      const prop = { name, text };
      return <fake-form-header {...prop} data-testid={testIds[name]} />;
    }
  };
});

jest.mock('./GovernmentalIndustryFields', () => ({
  __esModule: true,
  default: () => <fake-governmental-industry-fields data-testid={testIds.governmentalIndustryFields} />
}));

jest.mock('./ConstructionIndustryFields', () => ({
  __esModule: true,
  default: () => <fake-construction-industry-fields data-testid={testIds.constructionIndustryFields} />
}));

jest.mock('./RealEstateIndustryFields', () => ({
  __esModule: true,
  default: () => <fake-real-estate-industry-fields data-testid={testIds.realEstateIndustryFields} />
}));

jest.mock('./K12EducationIndustryFields', () => ({
  __esModule: true,
  default: () => <fake-k12-education-industry-fields data-testid={testIds.k12EducationIndustryFields} />
}));

// **********************************************************************
// * unit tests

describe('IndustryRiskSection', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  it('renders CollapsibleFormSection component', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toBeInTheDocument();
  });

  it('passes correct title prop to CollapsibleFormSection component', () => {
    const expectedTitle = 'Industry Risk';
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
  });

  describe('finalApprovalStep form header', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.finalApprovalStepFormHeader)).toBeInTheDocument();
    });

    it('has correct text prop', () => {
      const expectedText =
        'Any question marked as TBD must be replaced with YES/NO at Relationship Partner Final Approval step.';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.finalApprovalStepFormHeader)).toHaveAttribute('text', expectedText);
    });
  });

  describe('governmentalIndustryFields', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.governmentalIndustryFields)).toBeInTheDocument();
    });
  });

  describe('constructionIndustryFields', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.constructionIndustryFields)).toBeInTheDocument();
    });
  });

  describe('realEstateIndustryFields', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.realEstateIndustryFields)).toBeInTheDocument();
    });
  });

  describe('k12EducationIndustryFields', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.k12EducationIndustryFields)).toBeInTheDocument();
    });
  });
});
