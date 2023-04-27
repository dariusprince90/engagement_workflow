import ReactDOM from 'react-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../../newEngagementInstance/newEngagementInstanceSlice';
import YesNoRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import YesNoNaRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/YesNoNaRadioButtonListOptions';
import RiskRatingRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/RiskRatingRadioButtonListOptions';
import TaxRiskView from './TaxRiskView';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form fields
  internationallyActive: 'internationally-Active',
  internationalTaxTeamMember: 'international-tax-team-member',
  requiresExpertiseOutsideOfCoreTeam: 'requires-expertise-outside-of-core-team',
  requiresExpertiseOutsideOfCoreTeamComments: 'requires-expertise-outside-of-core-team-comments',
  significantAuditAdjustments: 'significant-audit-adjustments',
  significantAuditAdjustmentsInstructionsFormText: 'significant-audit-adjustments-instructions-form-text',
  auditAdjustmentsIssueResolved: 'audit-adjustments-issue-resolved',
  auditAdjustmentsImplicationsForCurrentYear: 'audit-adjustments-implications-for-current-year',
  auditAdjustmentsImplicationsForCurrentYearComments: 'audit-adjustments-implications-for-current-year-comments',
  engagedInTaxLitigation: 'engaged-in-tax-litigation',
  engagedInTaxLitigationInstructionsFormText: 'engaged-in-tax-litigation-instructions-form-text',
  taxLitigationIssueResolved: 'tax-litigation-issue-resolved',
  taxLitigationImplicationsForCurrentYear: 'tax-litigation-implications-for-current-year',
  taxLitigationImplicationsForCurrentYearComments: 'tax-litigation-implications-for-current-year-comments',
  hasUncertainTaxPositions: 'has-uncertain-tax-positions',
  hasUncertainTaxPositionsComments: 'has-uncertain-tax-positions-comments',
  managementIntegrityConcerns: 'management-integrity-concerns',
  managementIntegrityConcernsComments: 'management-integrity-concerns-comments',
  involvesPreparation: 'involves-preparation',
  reviewedPriorYearReturn: 'reviewed-prior-year-return',
  reviewedPriorYearReturnComments: 'reviewed-prior-year-return-comments',
  preliminaryRiskRating: 'preliminary-risk-rating',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textBox events
  textBoxOnChange: 'text-box-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakeTaxRiskView = {
  formData: {
    internationallyActive: faker.datatype.boolean(),
    internationalTaxTeamMember: faker.random.alphaNumeric(10),
    requiresExpertiseOutsideOfCoreTeam: faker.datatype.boolean(),
    requiresExpertiseOutsideOfCoreTeamComments: faker.random.alphaNumeric(10),
    significantAuditAdjustments: faker.datatype.boolean(),
    auditAdjustmentsIssueResolved: faker.datatype.boolean(),
    auditAdjustmentsImplicationsForCurrentYear: faker.datatype.boolean(),
    auditAdjustmentsImplicationsForCurrentYearComments: faker.random.alphaNumeric(10),
    engagedInTaxLitigation: faker.datatype.boolean(),
    taxLitigationIssueResolved: faker.datatype.boolean(),
    taxLitigationImplicationsForCurrentYear: faker.datatype.boolean(),
    taxLitigationImplicationsForCurrentYearComments: faker.random.alphaNumeric(10),
    hasUncertainTaxPositions: faker.datatype.boolean(),
    hasUncertainTaxPositionsComments: faker.random.alphaNumeric(10),
    managementIntegrityConcerns: faker.datatype.boolean(),
    managementIntegrityConcernsComments: faker.random.alphaNumeric(10),
    involvesPreparation: faker.datatype.boolean(),
    reviewedPriorYearReturn: faker.random.alphaNumeric(10),
    reviewedPriorYearReturnComments: faker.random.alphaNumeric(10),
    preliminaryRiskRating: faker.datatype.boolean()
  },
  metadata: {
    isLoading: false,
    hasError: false,
    error: null
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <TaxRiskView {...props} {...hocInjectedProps} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => {
      return callback();
    }
  };
});

jest.mock('../../../newEngagementInstance/newEngagementInstanceSlice', () => {
  return {
    selectCurrentView: jest.fn()
  };
});

jest.mock('../../views/withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ title, children }) => {
    const props = { title, children };
    return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
  }
}));

jest.mock('../../components/radioButtonList/RadioButtonList', () => ({
  __esModule: true,
  default: ({ name, label, horizontalItems, options, onChange, selectedValue }) => {
    const props = { name, label, horizontalItems, selectedValue };
    return (
      <fake-radio-button-list {...props} options={JSON.stringify(options)} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.radioButtonListOnChange}`} onClick={onChange} />
      </fake-radio-button-list>
    );
  }
}));

jest.mock('../../components/textBox/TextBox', () => ({
  __esModule: true,
  default: ({ name, label, value, placeholder, onChange }) => {
    const props = { name, label, value, placeholder };
    return (
      <fake-text-box {...props} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.textBoxOnChange}`} onClick={onChange} />
      </fake-text-box>
    );
  }
}));

jest.mock('../../components/textArea/TextArea', () => ({
  __esModule: true,
  default: ({ name, label, value, placeholder, rows, onChange }) => {
    const props = { name, label, value, placeholder, rows };
    return (
      <fake-text-area {...props} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.textAreaOnChange}`} onClick={onChange} />
      </fake-text-area>
    );
  }
}));

jest.mock('../../components/formText/FormText', () => {
  return {
    __esModule: true,
    default: ({ applyEmphasis, children, name }) => {
      const props = { applyEmphasis, children, name };
      return <fake-form-text {...props} data-testid={`${testIds[name]}`} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('TaxRiskView', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    jest.spyOn(newEngagementInstanceSlice, 'selectCurrentView');
  });

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeTaxRiskView);
  });

  // **********************************************************************
  // * tear-down

  afterAll(() => {
    newEngagementInstanceSlice.selectCurrentView.mockClear();
  });

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  it('renders CollapsibleFormSection component', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toBeInTheDocument();
  });

  it('renders CollapsibleFormSection with correct title prop', () => {
    const expectedTitle = 'Tax Risk';
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
  });

  describe('internationallyActive', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.internationallyActive)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'internationallyActive';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.internationallyActive)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '1. Is the Taxpayer Internationally active or is Internationally activity imminent?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.internationallyActive)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.internationallyActive)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.internationallyActive)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeTaxRiskView.formData.internationallyActive;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.internationallyActive)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.internationallyActive}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('internationalTaxTeamMember', () => {
    it.each([
      { internationallyActive: false },
      { internationallyActive: null },
      { internationallyActive: faker.datatype.string() }
    ])('should not render TextBox when internationallyActive is not true', ({ internationallyActive }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeTaxRiskView,
        formData: {
          ...fakeTaxRiskView.formData,
          internationallyActive
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.internationalTaxTeamMember)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            internationallyActive: true
          }
        });
      });

      it('should render TextBox when internationallyActive is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.internationalTaxTeamMember)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.internationalTaxTeamMember)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'internationalTaxTeamMember';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.internationalTaxTeamMember)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel =
          'If yes, Name the member of the international tax team with whom you have consulted regarding this opportunity';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.internationalTaxTeamMember)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeTaxRiskView.formData.internationalTaxTeamMember;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.internationalTaxTeamMember)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.internationalTaxTeamMember)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.internationalTaxTeamMember}-${testIds.textBoxOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('requiresExpertiseOutsideOfCoreTeam', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.requiresExpertiseOutsideOfCoreTeam)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'requiresExpertiseOutsideOfCoreTeam';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.requiresExpertiseOutsideOfCoreTeam)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '2. Does the engagement require tax expertise outside of the core engagement team? Example include cost ' +
        'segregation, research and development, international, multi state, IRS controversy, etc.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.requiresExpertiseOutsideOfCoreTeam)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.requiresExpertiseOutsideOfCoreTeam)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.requiresExpertiseOutsideOfCoreTeam)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeTaxRiskView.formData.requiresExpertiseOutsideOfCoreTeam;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.requiresExpertiseOutsideOfCoreTeam)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.requiresExpertiseOutsideOfCoreTeam}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('requiresExpertiseOutsideOfCoreTeamComments', () => {
    it.each([
      { requiresExpertiseOutsideOfCoreTeam: false },
      { requiresExpertiseOutsideOfCoreTeam: null },
      { requiresExpertiseOutsideOfCoreTeam: faker.datatype.string() }
    ])(
      'should not render TextArea when requiresExpertiseOutsideOfCoreTeam is not true',
      ({ requiresExpertiseOutsideOfCoreTeam }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            requiresExpertiseOutsideOfCoreTeam
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.requiresExpertiseOutsideOfCoreTeamComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            requiresExpertiseOutsideOfCoreTeam: true
          }
        });
      });

      it('should render TextArea when requiresExpertiseOutsideOfCoreTeam is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.requiresExpertiseOutsideOfCoreTeamComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.requiresExpertiseOutsideOfCoreTeamComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'requiresExpertiseOutsideOfCoreTeamComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.requiresExpertiseOutsideOfCoreTeamComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, please explain:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.requiresExpertiseOutsideOfCoreTeamComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeTaxRiskView.formData.requiresExpertiseOutsideOfCoreTeamComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.requiresExpertiseOutsideOfCoreTeamComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.requiresExpertiseOutsideOfCoreTeamComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.requiresExpertiseOutsideOfCoreTeamComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.requiresExpertiseOutsideOfCoreTeamComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('significantAuditAdjustments', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.significantAuditAdjustments)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'significantAuditAdjustments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.significantAuditAdjustments)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '3. Has the Taxpayer had significant audit adjustments - Federal or State?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.significantAuditAdjustments)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.significantAuditAdjustments)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.significantAuditAdjustments)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeTaxRiskView.formData.significantAuditAdjustments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.significantAuditAdjustments)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.significantAuditAdjustments}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('followingListOfQuestionsAreCompleted form text', () => {
    it.each([
      { significantAuditAdjustments: false },
      { significantAuditAdjustments: null },
      { significantAuditAdjustments: faker.datatype.string() }
    ])(
      'should not render significantAuditAdjustmentsInstructionsFormText when significantAuditAdjustments is ($significantAuditAdjustments)',
      ({ significantAuditAdjustments }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            significantAuditAdjustments
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.significantAuditAdjustmentsInstructionsFormText)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            significantAuditAdjustments: true
          }
        });
      });

      it('should render FormText when significantAuditAdjustments is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantAuditAdjustmentsInstructionsFormText)).toBeInTheDocument();
      });

      it('has correct applyEmphasis prop', () => {
        const expectedApplyEmphasis = 'true';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantAuditAdjustmentsInstructionsFormText)).toHaveAttribute(
          'applyEmphasis',
          expectedApplyEmphasis
        );
      });

      it('has correct name prop', () => {
        const expectedName = 'significantAuditAdjustmentsInstructionsFormText';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantAuditAdjustmentsInstructionsFormText)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct text', () => {
        const expectedText = 'If yes the following list of questions are to be completed';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantAuditAdjustmentsInstructionsFormText)).toHaveTextContent(
          expectedText
        );
      });
    });
  });

  describe('auditAdjustmentsIssueResolved', () => {
    it.each([
      { significantAuditAdjustments: false },
      { significantAuditAdjustments: null },
      { significantAuditAdjustments: faker.datatype.string() }
    ])(
      'should not render RadioButtonList when significantAuditAdjustments is not true',
      ({ significantAuditAdjustments }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            significantAuditAdjustments
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.auditAdjustmentsIssueResolved)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            significantAuditAdjustments: true
          }
        });
      });

      it('should render RadioButtonList when significantAuditAdjustments is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsIssueResolved)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.auditAdjustmentsIssueResolved)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'auditAdjustmentsIssueResolved';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsIssueResolved)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Is the issue(s) resolved?';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsIssueResolved)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct options prop', () => {
        const expectedOptions = YesNoRadioButtonListOptions;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsIssueResolved)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('has correct horizontalItems prop', () => {
        const expectedHorizontalItems = true;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsIssueResolved)).toHaveAttribute(
          'horizontalItems',
          expectedHorizontalItems.toString()
        );
      });

      it('has correct selectedValue prop', () => {
        const expectedSelectedValue = fakeTaxRiskView.formData.auditAdjustmentsIssueResolved;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsIssueResolved)).toHaveAttribute(
          'selectedValue',
          expectedSelectedValue.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.auditAdjustmentsIssueResolved}-${testIds.radioButtonListOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('auditAdjustmentsImplicationsForCurrentYear', () => {
    it.each([
      { significantAuditAdjustments: false },
      { significantAuditAdjustments: null },
      { significantAuditAdjustments: faker.datatype.string() }
    ])(
      'should not render RadioButtonList when significantAuditAdjustments is not true',
      ({ significantAuditAdjustments }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            significantAuditAdjustments
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.auditAdjustmentsImplicationsForCurrentYear)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            significantAuditAdjustments: true
          }
        });
      });

      it('should render RadioButtonList when significantAuditAdjustments is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsImplicationsForCurrentYear)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.auditAdjustmentsImplicationsForCurrentYear)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'auditAdjustmentsImplicationsForCurrentYear';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsImplicationsForCurrentYear)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Are there implication on the current year?';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsImplicationsForCurrentYear)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct options prop', () => {
        const expectedOptions = YesNoRadioButtonListOptions;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsImplicationsForCurrentYear)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('has correct horizontalItems prop', () => {
        const expectedHorizontalItems = true;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsImplicationsForCurrentYear)).toHaveAttribute(
          'horizontalItems',
          expectedHorizontalItems.toString()
        );
      });

      it('has correct selectedValue prop', () => {
        const expectedSelectedValue = fakeTaxRiskView.formData.auditAdjustmentsImplicationsForCurrentYear;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsImplicationsForCurrentYear)).toHaveAttribute(
          'selectedValue',
          expectedSelectedValue.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(
              `${testIds.auditAdjustmentsImplicationsForCurrentYear}-${testIds.radioButtonListOnChange}`
            )
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('auditAdjustmentsImplicationsForCurrentYearComments', () => {
    it.each([
      { auditAdjustmentsImplicationsForCurrentYear: false, significantAuditAdjustments: false },
      { auditAdjustmentsImplicationsForCurrentYear: null, significantAuditAdjustments: null },
      {
        auditAdjustmentsImplicationsForCurrentYear: faker.datatype.string(),
        significantAuditAdjustments: faker.datatype.string()
      }
    ])(
      'should not render TextArea when auditAdjustmentsImplicationsForCurrentYear ($auditAdjustmentsImplicationsForCurrentYear)' +
        'and significantAuditAdjustments ($significantAuditAdjustments) are not true',
      ({ auditAdjustmentsImplicationsForCurrentYear, significantAuditAdjustments }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            auditAdjustmentsImplicationsForCurrentYear,
            significantAuditAdjustments
          }
        });
        render(getComponentToRender(defaultProps));
        expect(
          screen.queryByTestId(testIds.auditAdjustmentsImplicationsForCurrentYearComments)
        ).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            auditAdjustmentsImplicationsForCurrentYear: true,
            significantAuditAdjustments: true
          }
        });
      });

      it('should render TextArea when auditAdjustmentsImplicationsForCurrentYear is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsImplicationsForCurrentYearComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.auditAdjustmentsImplicationsForCurrentYearComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'auditAdjustmentsImplicationsForCurrentYearComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsImplicationsForCurrentYearComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, please explain:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsImplicationsForCurrentYearComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeTaxRiskView.formData.auditAdjustmentsImplicationsForCurrentYearComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsImplicationsForCurrentYearComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsImplicationsForCurrentYearComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditAdjustmentsImplicationsForCurrentYearComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(
              `${testIds.auditAdjustmentsImplicationsForCurrentYearComments}-${testIds.textAreaOnChange}`
            )
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('engagedInTaxLitigation', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.engagedInTaxLitigation)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'engagedInTaxLitigation';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagedInTaxLitigation)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '4. Has the taxpayer been engaged in tax litigation?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagedInTaxLitigation)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagedInTaxLitigation)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagedInTaxLitigation)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeTaxRiskView.formData.engagedInTaxLitigation;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagedInTaxLitigation)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.engagedInTaxLitigation}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('followingQuestionsAreCompleted form text', () => {
    it.each([
      { engagedInTaxLitigation: false },
      { engagedInTaxLitigation: null },
      { engagedInTaxLitigation: faker.datatype.string() }
    ])(
      'should not render engagedInTaxLitigationInstructionsFormText when engagedInTaxLitigation is ($engagedInTaxLitigation)',
      ({ engagedInTaxLitigation }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            engagedInTaxLitigation
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.engagedInTaxLitigationInstructionsFormText)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            engagedInTaxLitigation: true
          }
        });
      });

      it('should render FormText when engagedInTaxLitigation is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.engagedInTaxLitigationInstructionsFormText)).toBeInTheDocument();
      });

      it('has correct applyEmphasis prop', () => {
        const expectedApplyEmphasis = 'true';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.engagedInTaxLitigationInstructionsFormText)).toHaveAttribute(
          'applyEmphasis',
          expectedApplyEmphasis
        );
      });

      it('has correct name prop', () => {
        const expectedName = 'engagedInTaxLitigationInstructionsFormText';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.engagedInTaxLitigationInstructionsFormText)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct text', () => {
        const expectedText = 'If yes the following list of questions are to be completed';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.engagedInTaxLitigationInstructionsFormText)).toHaveTextContent(expectedText);
      });
    });
  });

  describe('taxLitigationIssueResolved', () => {
    it.each([
      { engagedInTaxLitigation: false },
      { engagedInTaxLitigation: null },
      { engagedInTaxLitigation: faker.datatype.string() }
    ])('should not render RadioButtonList when engagedInTaxLitigation is not true', ({ engagedInTaxLitigation }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeTaxRiskView,
        formData: {
          ...fakeTaxRiskView.formData,
          engagedInTaxLitigation
        }
      });

      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.taxLitigationIssueResolved)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            engagedInTaxLitigation: true
          }
        });
      });

      it('should render RadioButtonList when engagedInTaxLitigation is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationIssueResolved)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.taxLitigationIssueResolved)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'taxLitigationIssueResolved';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationIssueResolved)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Is the issue(s) resolved?';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationIssueResolved)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct options prop', () => {
        const expectedOptions = YesNoRadioButtonListOptions;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationIssueResolved)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('has correct horizontalItems prop', () => {
        const expectedHorizontalItems = true;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationIssueResolved)).toHaveAttribute(
          'horizontalItems',
          expectedHorizontalItems.toString()
        );
      });

      it('has correct selectedValue prop', () => {
        const expectedSelectedValue = fakeTaxRiskView.formData.taxLitigationIssueResolved;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationIssueResolved)).toHaveAttribute(
          'selectedValue',
          expectedSelectedValue.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.taxLitigationIssueResolved}-${testIds.radioButtonListOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('taxLitigationImplicationsForCurrentYear', () => {
    it.each([
      { engagedInTaxLitigation: false },
      { engagedInTaxLitigation: null },
      { engagedInTaxLitigation: faker.datatype.string() }
    ])('should not render RadioButtonList when engagedInTaxLitigation is not true', ({ engagedInTaxLitigation }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeTaxRiskView,
        formData: {
          ...fakeTaxRiskView.formData,
          engagedInTaxLitigation
        }
      });

      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.taxLitigationImplicationsForCurrentYear)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            engagedInTaxLitigation: true
          }
        });
      });

      it('should render RadioButtonList when engagedInTaxLitigation is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationImplicationsForCurrentYear)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.taxLitigationImplicationsForCurrentYear)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'taxLitigationImplicationsForCurrentYear';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationImplicationsForCurrentYear)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Are there implication on the current year?';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationImplicationsForCurrentYear)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct options prop', () => {
        const expectedOptions = YesNoRadioButtonListOptions;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationImplicationsForCurrentYear)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('has correct horizontalItems prop', () => {
        const expectedHorizontalItems = true;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationImplicationsForCurrentYear)).toHaveAttribute(
          'horizontalItems',
          expectedHorizontalItems.toString()
        );
      });

      it('has correct selectedValue prop', () => {
        const expectedSelectedValue = fakeTaxRiskView.formData.taxLitigationImplicationsForCurrentYear;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationImplicationsForCurrentYear)).toHaveAttribute(
          'selectedValue',
          expectedSelectedValue.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.taxLitigationImplicationsForCurrentYear}-${testIds.radioButtonListOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('taxLitigationImplicationsForCurrentYearComments', () => {
    it.each([
      { taxLitigationImplicationsForCurrentYear: false, engagedInTaxLitigation: false },
      { taxLitigationImplicationsForCurrentYear: null, engagedInTaxLitigation: null },
      {
        taxLitigationImplicationsForCurrentYear: faker.datatype.string(),
        engagedInTaxLitigation: faker.datatype.string()
      }
    ])(
      'should not render TextArea when taxLitigationImplicationsForCurrentYear ($taxLitigationImplicationsForCurrentYear)' +
        'engagedInTaxLitigation ($engagedInTaxLitigation) are not true',
      ({ taxLitigationImplicationsForCurrentYear, engagedInTaxLitigation }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            taxLitigationImplicationsForCurrentYear,
            engagedInTaxLitigation
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.taxLitigationImplicationsForCurrentYearComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            taxLitigationImplicationsForCurrentYear: true,
            engagedInTaxLitigation: true
          }
        });
      });

      it('should render TextArea when taxLitigationImplicationsForCurrentYear is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationImplicationsForCurrentYearComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.taxLitigationImplicationsForCurrentYearComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'taxLitigationImplicationsForCurrentYearComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationImplicationsForCurrentYearComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, please explain:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationImplicationsForCurrentYearComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeTaxRiskView.formData.taxLitigationImplicationsForCurrentYearComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationImplicationsForCurrentYearComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationImplicationsForCurrentYearComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxLitigationImplicationsForCurrentYearComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.taxLitigationImplicationsForCurrentYearComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('hasUncertainTaxPositions', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.hasUncertainTaxPositions)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'hasUncertainTaxPositions';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.hasUncertainTaxPositions)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '5. Does the Taxpayer have uncertain tax positions?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.hasUncertainTaxPositions)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.hasUncertainTaxPositions)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.hasUncertainTaxPositions)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeTaxRiskView.formData.hasUncertainTaxPositions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.hasUncertainTaxPositions)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.hasUncertainTaxPositions}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('hasUncertainTaxPositionsComments', () => {
    it.each([
      { hasUncertainTaxPositions: false },
      { hasUncertainTaxPositions: null },
      { hasUncertainTaxPositions: faker.datatype.string() }
    ])('should not render TextArea when hasUncertainTaxPositions is not true', ({ hasUncertainTaxPositions }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeTaxRiskView,
        formData: {
          ...fakeTaxRiskView.formData,
          hasUncertainTaxPositions
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.hasUncertainTaxPositionsComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            hasUncertainTaxPositions: true
          }
        });
      });

      it('should render TextArea when hasUncertainTaxPositions is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.hasUncertainTaxPositionsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.hasUncertainTaxPositionsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'hasUncertainTaxPositionsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.hasUncertainTaxPositionsComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, please explain:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.hasUncertainTaxPositionsComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeTaxRiskView.formData.hasUncertainTaxPositionsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.hasUncertainTaxPositionsComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.hasUncertainTaxPositionsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.hasUncertainTaxPositionsComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.hasUncertainTaxPositionsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('managementIntegrityConcerns', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.managementIntegrityConcerns)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'managementIntegrityConcerns';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.managementIntegrityConcerns)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '6. Do we have any concerns about the integrity of management in the tax area?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.managementIntegrityConcerns)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.managementIntegrityConcerns)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.managementIntegrityConcerns)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeTaxRiskView.formData.managementIntegrityConcerns;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.managementIntegrityConcerns)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.managementIntegrityConcerns}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('managementIntegrityConcernsComments', () => {
    it.each([
      { managementIntegrityConcerns: false },
      { managementIntegrityConcerns: null },
      { managementIntegrityConcerns: faker.datatype.string() }
    ])('should not render TextArea when managementIntegrityConcerns is not true', ({ managementIntegrityConcerns }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeTaxRiskView,
        formData: {
          ...fakeTaxRiskView.formData,
          managementIntegrityConcerns
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.managementIntegrityConcernsComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            managementIntegrityConcerns: true
          }
        });
      });

      it('should render TextArea when managementIntegrityConcerns is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.managementIntegrityConcernsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.managementIntegrityConcernsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'managementIntegrityConcernsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.managementIntegrityConcernsComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, please explain:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.managementIntegrityConcernsComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeTaxRiskView.formData.managementIntegrityConcernsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.managementIntegrityConcernsComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.managementIntegrityConcernsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.managementIntegrityConcernsComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.managementIntegrityConcernsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('involvesPreparation', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.involvesPreparation)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'involvesPreparation';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvesPreparation)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '7. Will engagement involve preparation of tax returns?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvesPreparation)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvesPreparation)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvesPreparation)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeTaxRiskView.formData.involvesPreparation;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvesPreparation)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.involvesPreparation}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('reviewedPriorYearReturn', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.reviewedPriorYearReturn)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'reviewedPriorYearReturn';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.reviewedPriorYearReturn)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '8. Have we reviewed the prior year tax return and have we communicated with the taxpayer/entity ' +
        'that we are required to review 3 years of prior year returns in total before completing the current year return?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.reviewedPriorYearReturn)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoNaRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.reviewedPriorYearReturn)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.reviewedPriorYearReturn)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeTaxRiskView.formData.reviewedPriorYearReturn;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.reviewedPriorYearReturn)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.reviewedPriorYearReturn}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('reviewedPriorYearReturnComments', () => {
    it.each([{ reviewedPriorYearReturn: null }, { reviewedPriorYearReturn: faker.random.alphaNumeric(10) }])(
      'should not render TextArea when reviewedPriorYearReturn is not N/A',
      ({ reviewedPriorYearReturn }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            reviewedPriorYearReturn
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.reviewedPriorYearReturnComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeTaxRiskView,
          formData: {
            ...fakeTaxRiskView.formData,
            reviewedPriorYearReturn: 'N/A'
          }
        });
      });

      it('should render TextArea when reviewedPriorYearReturn is N/A', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.reviewedPriorYearReturnComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.reviewedPriorYearReturnComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'reviewedPriorYearReturnComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.reviewedPriorYearReturnComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.reviewedPriorYearReturnComments)).toHaveAttribute('label', '');
      });

      it('has correct value prop', () => {
        const expectedValue = fakeTaxRiskView.formData.reviewedPriorYearReturnComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.reviewedPriorYearReturnComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.reviewedPriorYearReturnComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.reviewedPriorYearReturnComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.reviewedPriorYearReturnComments}-${testIds.textAreaOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('preliminaryRiskRating', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.preliminaryRiskRating)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'preliminaryRiskRating';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.preliminaryRiskRating)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '9. Based on your knowledge what is the preliminary risk rating of this engagement for tax purposes? ' +
        '(A=Lowest Risk, D=Highest Risk)';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.preliminaryRiskRating)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = RiskRatingRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.preliminaryRiskRating)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.preliminaryRiskRating)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeTaxRiskView.formData.preliminaryRiskRating;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.preliminaryRiskRating)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.preliminaryRiskRating}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });
});
