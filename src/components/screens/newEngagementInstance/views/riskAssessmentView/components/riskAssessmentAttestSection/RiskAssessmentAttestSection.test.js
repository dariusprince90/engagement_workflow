import ReactDOM from 'react-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import ATTACHMENT_REFERENCE_TYPES from '../../../../../../../helpers/enums/attachmentReferenceTypes';

import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import RiskRatingRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/RiskRatingRadioButtonListOptions';
import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS from '../../../../../../../helpers/enums/newEngagementApprovalWorkflowSteps';
import RiskAssessmentAttestSection from './RiskAssessmentAttestSection';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form headers / form text
  attachmentsFormHeader: 'attachments-form-header',
  riskAssessmentAttestFormHeader: 'risk-assessment-attest-form-header',
  formText: 'form-text',

  // form fields
  usedInCapitalRaising: 'used-in-capital-raising',
  usedInCapitalRaisingComments: 'used-in-capital-raising-comments',
  usedInSignificantTransactions: 'used-in-significant-transactions',
  usedInSignificantTransactionsComments: 'used-in-significant-transactions-comments',
  newClientsInFinancialDifficulty: 'new-clients-in-financial-difficulty',
  newClientsInFinancialDifficultyComments: 'new-clients-in-financial-difficulty-comments',
  mustAcquireSpecialExpertise: 'must-acquire-special-expertise',
  mustAcquireSpecialExpertiseComments: 'must-acquire-special-expertise-comments',
  changeInExecutiveManagement: 'change-in-executive-management',
  changeInExecutiveManagementComments: 'change-in-executive-management-comments',
  changeInFinancialManagement: 'change-in-financial-management',
  changeInFinancialManagementComments: 'change-in-financial-management-comments',
  changeInLegalCouncil: 'change-in-legal-council',
  changeInLegalCouncilComments: 'change-in-legal-council-comments',
  legalActionsArePending: 'legal-actions-are-pending',
  legalActionsArePendingComments: 'legal-actions-are-pending-comments',
  significantManagementDisputesExist: 'significant-management-disputes-exist',
  significantManagementDisputesExistComments: 'significant-management-disputes-exist-comments',
  independenceMayBeQuestioned: 'independence-may-be-questioned',
  independenceMayBeQuestionedComments: 'independence-may-be-questioned-comments',
  potentialConflictOfInterestWithExistingClient: 'potential-conflict-of-interest-with-existing-client',
  potentialConflictOfInterestWithExistingClientComments: 'potential-conflict-of-interest-with-existing-client-comments',
  involvedInBusinessFailures: 'involved-in-business-failures',
  involvedInBusinessFailuresComments: 'involved-in-business-failures-comments',
  involvedInFraud: 'involved-in-fraud',
  involvedInFraudComments: 'involved-in-fraud-comments',
  entityInvolvedInFraud: 'entity-involved-in-fraud',
  entityInvolvedInFraudComments: 'entity-involved-in-fraud-comments',
  isEntityInternationallyActive: 'is-entity-internationally-active',
  requiresOtherFirmsInvolvement: 'requires-other-firms-involvement',
  requiresOtherFirmsInvolvementComments: 'requires-other-firms-involvement-comments',
  concernInWithRequiredCommunications: 'concern-in-with-required-communications',
  concernInWithRequiredCommunicationsComments: 'concern-in-with-required-communications-comments',
  inAccordanceWithFinancialFramework: 'in-accordance-with-financial-framework',
  inAccordanceWithFinancialFrameworkComments: 'in-accordance-with-financial-framework-comments',
  anticipatedAssuranceEngagementRiskRating: 'anticipated-assurance-engagement-risk-rating',
  understandingOfRiskImpactComments: 'understanding-of-risk-impact-comments',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change',

  // attachments table
  attachmentsTable: 'attachment-table'
};

const fakeRiskAssessmentView = {
  formData: {
    usedInCapitalRaising: faker.random.alphaNumeric(10),
    usedInCapitalRaisingComments: faker.random.alphaNumeric(10),
    usedInSignificantTransactions: faker.random.alphaNumeric(10),
    usedInSignificantTransactionsComments: faker.random.alphaNumeric(10),
    newClientsInFinancialDifficulty: faker.random.alphaNumeric(10),
    newClientsInFinancialDifficultyComments: faker.random.alphaNumeric(10),
    mustAcquireSpecialExpertise: faker.random.alphaNumeric(10),
    mustAcquireSpecialExpertiseComments: faker.random.alphaNumeric(10),
    changeInExecutiveManagement: faker.random.alphaNumeric(10),
    changeInExecutiveManagementComments: faker.random.alphaNumeric(10),
    changeInFinancialManagement: faker.random.alphaNumeric(10),
    changeInFinancialManagementComments: faker.random.alphaNumeric(10),
    changeInLegalCouncil: faker.random.alphaNumeric(10),
    changeInLegalCouncilComments: faker.random.alphaNumeric(10),
    legalActionsArePending: faker.random.alphaNumeric(10),
    legalActionsArePendingComments: faker.random.alphaNumeric(10),
    significantManagementDisputesExist: faker.random.alphaNumeric(10),
    significantManagementDisputesExistComments: faker.random.alphaNumeric(10),
    independenceMayBeQuestioned: faker.random.alphaNumeric(10),
    independenceMayBeQuestionedComments: faker.random.alphaNumeric(10),
    potentialConflictOfInterestWithExistingClient: faker.random.alphaNumeric(10),
    potentialConflictOfInterestWithExistingClientComments: faker.random.alphaNumeric(10),
    involvedInBusinessFailures: faker.random.alphaNumeric(10),
    involvedInBusinessFailuresComments: faker.random.alphaNumeric(10),
    involvedInFraud: faker.random.alphaNumeric(10),
    involvedInFraudComments: faker.random.alphaNumeric(10),
    entityInvolvedInFraud: faker.random.alphaNumeric(10),
    entityInvolvedInFraudComments: faker.random.alphaNumeric(10),
    isEntityInternationallyActive: faker.random.alphaNumeric(10),
    requiresOtherFirmsInvolvement: faker.random.alphaNumeric(10),
    requiresOtherFirmsInvolvementComments: faker.random.alphaNumeric(10),
    concernInWithRequiredCommunications: faker.random.alphaNumeric(10),
    concernInWithRequiredCommunicationsComments: faker.random.alphaNumeric(10),
    inAccordanceWithFinancialFramework: faker.random.alphaNumeric(10),
    inAccordanceWithFinancialFrameworkComments: faker.random.alphaNumeric(10),
    anticipatedAssuranceEngagementRiskRating: faker.random.alphaNumeric(10),
    understandingOfRiskImpactComments: faker.random.alphaNumeric(10)
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

const fakeCurrentWorkflowStepId = faker.datatype.number();

// **********************************************************************
// * functions

const getComponentToRender = (prop) => {
  return <RiskAssessmentAttestSection {...prop} {...hocInjectedProps} />;
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

jest.mock('../../../../newEngagementInstanceSlice', () => {
  return {
    selectCurrentView: jest.fn(),
    selectCurrentWorkflowStepId: jest.fn()
  };
});

jest.mock('../../../withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ title, children }) => (
    <fake-collapsible-form-section title={title} data-testid={testIds.collapsibleFormSection}>
      {children}
    </fake-collapsible-form-section>
  )
}));

jest.mock('../../../../../../common/formHeader/FormHeader', () => {
  return {
    __esModule: true,
    default: ({ text, name }) => {
      const props = { text, name };
      return <fake-form-header {...props} data-testid={testIds[name]} />;
    }
  };
});

jest.mock('../../../../components/formText/FormText', () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      const props = { children };
      return <fake-form-text {...props} data-testid={testIds.formText} />;
    }
  };
});

jest.mock('../../../../components/radioButtonList/RadioButtonList', () => ({
  __esModule: true,
  default: ({ name, label, options, horizontalItems, onChange, selectedValue, disabled }) => {
    const props = { name, label, horizontalItems, selectedValue, disabled };
    return (
      <fake-radio-button-list {...props} options={JSON.stringify(options)} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.radioButtonListOnChange}`} onClick={onChange} />
      </fake-radio-button-list>
    );
  }
}));

jest.mock('../../../../components/textArea/TextArea', () => ({
  __esModule: true,
  default: ({ name, label, placeholder, rows, onChange, value, disabled }) => {
    const props = { name, label, placeholder, rows, value, disabled };
    return (
      <fake-text-area {...props} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.textAreaOnChange}`} onClick={onChange} />
      </fake-text-area>
    );
  }
}));

jest.mock('../../../../components/attachmentsTable/AttachmentsTable', () => ({
  __esModule: true,
  default: ({ attachmentReferenceType }) => {
    return (
      <fake-attachments-table
        attachmentReferenceType={JSON.stringify(attachmentReferenceType)}
        data-testid={testIds.attachmentsTable}
      />
    );
  }
}));

// **********************************************************************
// * unit tests

describe('RiskAssessmentAttestSection', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeRiskAssessmentView);
    newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(fakeCurrentWorkflowStepId);
  });

  // **********************************************************************
  // * tear-down

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

  it('passes correct title prop to CollapsibleFormSection component', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', 'Risk Assessment');
  });

  describe('riskAssessmentAttest form header', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.riskAssessmentAttestFormHeader)).toBeInTheDocument();
    });

    it('renders correct text prop', () => {
      const expectedText =
        'Any question marked as TBD must be replaced with YES/NO at Relationship Partner Final Approval step.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.riskAssessmentAttestFormHeader)).toHaveAttribute('text', expectedText);
    });
  });

  describe('usedInCapitalRaising', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.usedInCapitalRaising)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'usedInCapitalRaising';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.usedInCapitalRaising)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        "1. Will the new client's financial statements be used in any capital-raising or financial activities " +
        '(private placements of debt or equity interests significant new financing)?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.usedInCapitalRaising)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.usedInCapitalRaising)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.usedInCapitalRaising;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.usedInCapitalRaising)).toHaveAttribute('selectedValue', expectedSelectedValue);
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.usedInCapitalRaising)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.usedInCapitalRaising}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('usedInCapitalRaisingComments', () => {
    it.each([{ usedInCapitalRaising: faker.random.alphaNumeric(10) }, { usedInCapitalRaising: null }])(
      'should not render when usedInCapitalRaising is not Yes',
      ({ usedInCapitalRaising }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            usedInCapitalRaising
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.usedInCapitalRaisingComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            usedInCapitalRaising: 'Yes'
          }
        });
      });

      it('should render when usedInCapitalRaising is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.usedInCapitalRaisingComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.usedInCapitalRaisingComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'usedInCapitalRaisingComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.usedInCapitalRaisingComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.usedInCapitalRaisingComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.usedInCapitalRaisingComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.usedInCapitalRaisingComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.usedInCapitalRaisingComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.usedInCapitalRaisingComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.usedInCapitalRaisingComments}-${testIds.textAreaOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('usedInSignificantTransactions', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.usedInSignificantTransactions)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'usedInSignificantTransactions';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.usedInSignificantTransactions)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        "2. Will the new client's financial statements be used in any significant transactions involving new or " +
        'existing owners (merger, acquisition, redemption, or buy-out)?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.usedInSignificantTransactions)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.usedInSignificantTransactions)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.usedInSignificantTransactions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.usedInSignificantTransactions)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.usedInSignificantTransactions)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.usedInSignificantTransactions}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('usedInSignificantTransactionsComments', () => {
    it.each([
      { usedInSignificantTransactions: faker.random.alphaNumeric(10) },
      { usedInSignificantTransactions: null }
    ])('should not render when usedInSignificantTransactions is not Yes', ({ usedInSignificantTransactions }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeRiskAssessmentView,
        formData: {
          ...fakeRiskAssessmentView.formData,
          usedInSignificantTransactions
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.usedInSignificantTransactionsComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            usedInSignificantTransactions: 'Yes'
          }
        });
      });

      it('should render when usedInSignificantTransactions is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.usedInSignificantTransactionsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.usedInSignificantTransactionsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'usedInSignificantTransactionsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.usedInSignificantTransactionsComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.usedInSignificantTransactionsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.usedInSignificantTransactionsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.usedInSignificantTransactionsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.usedInSignificantTransactionsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.usedInSignificantTransactionsComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.usedInSignificantTransactionsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('newClientsInFinancialDifficulty', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.newClientsInFinancialDifficulty)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'newClientsInFinancialDifficulty';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.newClientsInFinancialDifficulty)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '3. Is the new client in financial difficulty or is its financial condition deteriorating or questionable? ' +
        'Examples: excessive leverage, equity capital deficiencies, recurring losses, negative cash flow.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.newClientsInFinancialDifficulty)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.newClientsInFinancialDifficulty)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });
    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.newClientsInFinancialDifficulty;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.newClientsInFinancialDifficulty)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.newClientsInFinancialDifficulty)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.newClientsInFinancialDifficulty}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('newClientsInFinancialDifficultyComments', () => {
    it.each([
      { newClientsInFinancialDifficulty: faker.random.alphaNumeric(10) },
      { newClientsInFinancialDifficulty: null }
    ])('should not render when newClientsInFinancialDifficulty is not Yes', ({ newClientsInFinancialDifficulty }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeRiskAssessmentView,
        formData: {
          ...fakeRiskAssessmentView.formData,
          newClientsInFinancialDifficulty
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.newClientsInFinancialDifficultyComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            newClientsInFinancialDifficulty: 'Yes'
          }
        });
      });

      it('should render when newClientsInFinancialDifficulty is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.newClientsInFinancialDifficultyComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.newClientsInFinancialDifficultyComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'newClientsInFinancialDifficultyComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.newClientsInFinancialDifficultyComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.newClientsInFinancialDifficultyComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.newClientsInFinancialDifficultyComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.newClientsInFinancialDifficultyComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.newClientsInFinancialDifficultyComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.newClientsInFinancialDifficultyComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.newClientsInFinancialDifficultyComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('mustAcquireSpecialExpertise', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.mustAcquireSpecialExpertise)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'mustAcquireSpecialExpertise';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mustAcquireSpecialExpertise)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '4. Is there any special industry or technical expertise that the Firm, office or proposed engagement ' +
        'partner must acquire in order to perform the engagement?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mustAcquireSpecialExpertise)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mustAcquireSpecialExpertise)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });
    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.mustAcquireSpecialExpertise;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mustAcquireSpecialExpertise)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mustAcquireSpecialExpertise)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.mustAcquireSpecialExpertise}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('mustAcquireSpecialExpertiseComments', () => {
    it.each([{ mustAcquireSpecialExpertise: faker.random.alphaNumeric(10) }, { mustAcquireSpecialExpertise: null }])(
      'should not render when mustAcquireSpecialExpertise is not Yes',
      ({ mustAcquireSpecialExpertise }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            mustAcquireSpecialExpertise
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.mustAcquireSpecialExpertiseComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            mustAcquireSpecialExpertise: 'Yes'
          }
        });
      });

      it('should render when changeInExecutiveManagement is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mustAcquireSpecialExpertiseComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.mustAcquireSpecialExpertiseComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'mustAcquireSpecialExpertiseComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mustAcquireSpecialExpertiseComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mustAcquireSpecialExpertiseComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.mustAcquireSpecialExpertiseComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mustAcquireSpecialExpertiseComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mustAcquireSpecialExpertiseComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mustAcquireSpecialExpertiseComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.mustAcquireSpecialExpertiseComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('recentChange form text', () => {
    it('renders correct children prop', () => {
      const expectedChildren = '5. Has there been any recent change in the following:';
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getByTestId(testIds.formText);
      expect(formTextFields).toHaveTextContent(expectedChildren);
    });
  });

  describe('changeInExecutiveManagement', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.changeInExecutiveManagement)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'changeInExecutiveManagement';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.changeInExecutiveManagement)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'a. Key executive or operations management directors or ownership?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.changeInExecutiveManagement)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.changeInExecutiveManagement)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });
    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.changeInExecutiveManagement;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.changeInExecutiveManagement)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.changeInExecutiveManagement)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.changeInExecutiveManagement}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('changeInExecutiveManagementComments', () => {
    it.each([{ changeInExecutiveManagement: faker.random.alphaNumeric(10) }, { changeInExecutiveManagement: null }])(
      'should not render when changeInExecutiveManagement is not Yes',
      ({ changeInExecutiveManagement }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            changeInExecutiveManagement
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.changeInExecutiveManagementComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            changeInExecutiveManagement: 'Yes'
          }
        });
      });

      it('should render when changeInExecutiveManagement is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInExecutiveManagementComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.changeInExecutiveManagementComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'changeInExecutiveManagementComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInExecutiveManagementComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInExecutiveManagementComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.changeInExecutiveManagementComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInExecutiveManagementComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInExecutiveManagementComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInExecutiveManagementComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.changeInExecutiveManagementComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('changeInFinancialManagement', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.changeInFinancialManagement)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'changeInFinancialManagement';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.changeInFinancialManagement)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        'b. Key financial management such as chief financial or chief accounting officer or their equivalent?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.changeInFinancialManagement)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.changeInFinancialManagement)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.changeInFinancialManagement;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.changeInFinancialManagement)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.changeInFinancialManagement)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.changeInFinancialManagement}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('changeInFinancialManagementComments', () => {
    it.each([{ changeInFinancialManagement: faker.random.alphaNumeric(10) }, { changeInFinancialManagement: null }])(
      'should not render when changeInFinancialManagement is not Yes',
      ({ changeInFinancialManagement }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            changeInFinancialManagement
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.changeInFinancialManagementComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            changeInFinancialManagement: 'Yes'
          }
        });
      });

      it('should render when changeInFinancialManagement is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInFinancialManagementComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.changeInFinancialManagementComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'changeInFinancialManagementComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInFinancialManagementComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInFinancialManagementComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.changeInFinancialManagementComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInFinancialManagementComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInFinancialManagementComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInFinancialManagementComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.changeInFinancialManagementComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('changeInLegalCouncil', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.changeInLegalCouncil)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'changeInLegalCouncil';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.changeInLegalCouncil)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'c. Principal legal council?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.changeInLegalCouncil)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.changeInLegalCouncil)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.changeInLegalCouncil;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.changeInLegalCouncil)).toHaveAttribute('selectedValue', expectedSelectedValue);
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.changeInLegalCouncil)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.changeInLegalCouncil}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('changeInLegalCouncilComments', () => {
    it.each([{ changeInLegalCouncil: faker.random.alphaNumeric(10) }, { changeInLegalCouncil: null }])(
      'should not render when changeInLegalCouncil is not Yes',
      ({ changeInLegalCouncil }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            changeInLegalCouncil
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.changeInLegalCouncilComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            changeInLegalCouncil: 'Yes'
          }
        });
      });

      it('should render when changeInLegalCouncil is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInLegalCouncilComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.changeInLegalCouncilComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'changeInLegalCouncilComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInLegalCouncilComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInLegalCouncilComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.changeInLegalCouncilComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInLegalCouncilComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInLegalCouncilComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.changeInLegalCouncilComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.changeInLegalCouncilComments}-${testIds.textAreaOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('legalActionsArePending', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.legalActionsArePending)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'legalActionsArePending';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.legalActionsArePending)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '6. Are any significant legal actions pending against the entity or its owners officers or directors?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.legalActionsArePending)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.legalActionsArePending)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });
    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.legalActionsArePending;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.legalActionsArePending)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.legalActionsArePending)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.legalActionsArePending}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('legalActionsArePendingComments', () => {
    it.each([{ legalActionsArePending: faker.random.alphaNumeric(10) }, { legalActionsArePending: null }])(
      'should not render when legalActionsArePending is not Yes',
      ({ legalActionsArePending }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            legalActionsArePending
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.legalActionsArePendingComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            legalActionsArePending: 'Yes'
          }
        });
      });

      it('should render when legalActionsArePending is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.legalActionsArePendingComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.legalActionsArePendingComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'legalActionsArePendingComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.legalActionsArePendingComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.legalActionsArePendingComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.legalActionsArePendingComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.legalActionsArePendingComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.legalActionsArePendingComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.legalActionsArePendingComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.legalActionsArePendingComments}-${testIds.textAreaOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('significantManagementDisputesExist', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.significantManagementDisputesExist)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'significantManagementDisputesExist';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.significantManagementDisputesExist)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '7. Are there any significant management or owner disputes?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.significantManagementDisputesExist)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.significantManagementDisputesExist)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });
    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.significantManagementDisputesExist;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.significantManagementDisputesExist)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.significantManagementDisputesExist)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.significantManagementDisputesExist}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('significantManagementDisputesExistComments', () => {
    it.each([
      { significantManagementDisputesExist: faker.random.alphaNumeric(10) },
      { significantManagementDisputesExist: null }
    ])(
      'should not render when significantManagementDisputesExist is not Yes',
      ({ significantManagementDisputesExist }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            significantManagementDisputesExist
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.significantManagementDisputesExistComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            significantManagementDisputesExist: 'Yes'
          }
        });
      });

      it('should render when significantManagementDisputesExist is "Yes"', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantManagementDisputesExistComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.significantManagementDisputesExistComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'significantManagementDisputesExistComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantManagementDisputesExistComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantManagementDisputesExistComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.significantManagementDisputesExistComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantManagementDisputesExistComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantManagementDisputesExistComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantManagementDisputesExistComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.significantManagementDisputesExistComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('independenceMayBeQuestioned', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.independenceMayBeQuestioned)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'independenceMayBeQuestioned';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.independenceMayBeQuestioned)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '8. Is there any reason our independence or objectivity might be questioned?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.independenceMayBeQuestioned)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.independenceMayBeQuestioned)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });
    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.independenceMayBeQuestioned;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.independenceMayBeQuestioned)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.independenceMayBeQuestioned)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.independenceMayBeQuestioned}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('independenceMayBeQuestionedComments', () => {
    it.each([{ independenceMayBeQuestioned: faker.random.alphaNumeric(10) }, { independenceMayBeQuestioned: null }])(
      'should not render when independenceMayBeQuestioned is not Yes',
      ({ independenceMayBeQuestioned }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            independenceMayBeQuestioned
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.independenceMayBeQuestionedComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            independenceMayBeQuestioned: 'Yes'
          }
        });
      });

      it('should render when independenceMayBeQuestioned is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.independenceMayBeQuestionedComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.independenceMayBeQuestionedComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'independenceMayBeQuestionedComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.independenceMayBeQuestionedComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.independenceMayBeQuestionedComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.independenceMayBeQuestionedComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.independenceMayBeQuestionedComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.independenceMayBeQuestionedComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.independenceMayBeQuestionedComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.independenceMayBeQuestionedComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('potentialConflictOfInterestWithExistingClient', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.potentialConflictOfInterestWithExistingClient)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'potentialConflictOfInterestWithExistingClient';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.potentialConflictOfInterestWithExistingClient)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '9. Could association with the new client create a potential conflict of interest with an existing client?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.potentialConflictOfInterestWithExistingClient)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.potentialConflictOfInterestWithExistingClient)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });
    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.potentialConflictOfInterestWithExistingClient;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.potentialConflictOfInterestWithExistingClient)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.potentialConflictOfInterestWithExistingClient)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.potentialConflictOfInterestWithExistingClient}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('potentialConflictOfInterestWithExistingClientComments', () => {
    it.each([
      { potentialConflictOfInterestWithExistingClient: faker.random.alphaNumeric(10) },
      { potentialConflictOfInterestWithExistingClient: null }
    ])(
      'should not render when potentialConflictOfInterestWithExistingClient is not Yes',
      ({ potentialConflictOfInterestWithExistingClient }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            potentialConflictOfInterestWithExistingClient
          }
        });
        render(getComponentToRender(defaultProps));
        expect(
          screen.queryByTestId(testIds.potentialConflictOfInterestWithExistingClientComments)
        ).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            potentialConflictOfInterestWithExistingClient: 'Yes'
          }
        });
      });

      it('should render when potentialConflictOfInterestWithExistingClient is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialConflictOfInterestWithExistingClientComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.potentialConflictOfInterestWithExistingClientComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'potentialConflictOfInterestWithExistingClientComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialConflictOfInterestWithExistingClientComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialConflictOfInterestWithExistingClientComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.potentialConflictOfInterestWithExistingClientComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialConflictOfInterestWithExistingClientComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialConflictOfInterestWithExistingClientComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialConflictOfInterestWithExistingClientComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(
              `${testIds.potentialConflictOfInterestWithExistingClientComments}-${testIds.textAreaOnChange}`
            )
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('involvedInBusinessFailures', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.involvedInBusinessFailures)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'involvedInBusinessFailures';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvedInBusinessFailures)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        "10. Have any of the new client's management owners, officers or directors been involved in prior " +
        'business failures resulting in losses to their owners or creditors?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvedInBusinessFailures)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvedInBusinessFailures)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });
    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.involvedInBusinessFailures;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvedInBusinessFailures)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvedInBusinessFailures)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.involvedInBusinessFailures}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('involvedInBusinessFailuresComments', () => {
    it.each([{ involvedInBusinessFailures: faker.random.alphaNumeric(10) }, { involvedInBusinessFailures: null }])(
      'should not render when involvedInBusinessFailures is not Yes',
      ({ involvedInBusinessFailures }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            involvedInBusinessFailures
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.involvedInBusinessFailuresComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            involvedInBusinessFailures: 'Yes'
          }
        });
      });

      it('should render when involvedInBusinessFailures is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.involvedInBusinessFailuresComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.involvedInBusinessFailuresComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'involvedInBusinessFailuresComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.involvedInBusinessFailuresComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.involvedInBusinessFailuresComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.involvedInBusinessFailuresComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.involvedInBusinessFailuresComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.involvedInBusinessFailuresComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.involvedInBusinessFailuresComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.involvedInBusinessFailuresComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('involvedInFraud', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.involvedInFraud)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'involvedInFraud';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvedInFraud)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        "11. Have any of the new client's management owners, officers or directors been involved in any fraud or " +
        'other criminal matters?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvedInFraud)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvedInFraud)).toHaveAttribute('options', JSON.stringify(expectedOptions));
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.involvedInFraud;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvedInFraud)).toHaveAttribute('selectedValue', expectedSelectedValue);
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvedInFraud)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.involvedInFraud}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('involvedInFraudComments', () => {
    it.each([{ involvedInFraud: faker.random.alphaNumeric(10) }, { involvedInFraud: null }])(
      'should not render when involvedInFraud is not Yes',
      ({ involvedInFraud }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            involvedInFraud
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.involvedInFraudComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            involvedInFraud: 'Yes'
          }
        });
      });

      it('should render when involvedInFraud is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.involvedInFraudComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.involvedInFraudComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'involvedInFraudComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.involvedInFraudComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.involvedInFraudComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.involvedInFraudComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.involvedInFraudComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.involvedInFraudComments)).toHaveAttribute('placeholder', expectedPlaceHolder);
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.involvedInFraudComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.involvedInFraudComments}-${testIds.textAreaOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('entityInvolvedInFraud', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.entityInvolvedInFraud)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'entityInvolvedInFraud';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.entityInvolvedInFraud)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '12. Has the entity been involved in or the victim of significant fraud?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.entityInvolvedInFraud)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.entityInvolvedInFraud)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });
    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.entityInvolvedInFraud;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.entityInvolvedInFraud)).toHaveAttribute('selectedValue', expectedSelectedValue);
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.entityInvolvedInFraud)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.entityInvolvedInFraud}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('entityInvolvedInFraudComments', () => {
    it.each([{ entityInvolvedInFraud: faker.random.alphaNumeric(10) }, { entityInvolvedInFraud: null }])(
      'should not render when entityInvolvedInFraud is not Yes',
      ({ entityInvolvedInFraud }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            entityInvolvedInFraud
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.entityInvolvedInFraudComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            entityInvolvedInFraud: 'Yes'
          }
        });
      });

      it('should render when entityInvolvedInFraud is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.entityInvolvedInFraudComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.entityInvolvedInFraudComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'entityInvolvedInFraudComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.entityInvolvedInFraudComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.entityInvolvedInFraudComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.entityInvolvedInFraudComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.entityInvolvedInFraudComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.entityInvolvedInFraudComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.entityInvolvedInFraudComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.entityInvolvedInFraudComments}-${testIds.textAreaOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('isEntityInternationallyActive', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.isEntityInternationallyActive)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'isEntityInternationallyActive';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isEntityInternationallyActive)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '13. Is the entity internationally active?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isEntityInternationallyActive)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isEntityInternationallyActive)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });
    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.isEntityInternationallyActive;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isEntityInternationallyActive)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isEntityInternationallyActive)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.isEntityInternationallyActive}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('attachments form header', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.attachmentsFormHeader)).toBeInTheDocument();
    });

    it('renders correct text prop', () => {
      const expectedText = 'Attachments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.attachmentsFormHeader)).toHaveAttribute('text', expectedText);
    });
  });

  describe('Attachments', () => {
    it('renders inside collapsible', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.attachmentsTable)).toBeInTheDocument();
    });

    it('has correct attachmentReferenceType prop', () => {
      const expectedAttachmentReferenceType = JSON.stringify(ATTACHMENT_REFERENCE_TYPES.riskAssessmentAttest);
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.attachmentsTable)).toHaveAttribute(
        'attachmentReferenceType',
        expectedAttachmentReferenceType
      );
    });
  });

  describe('requiresOtherFirmsInvolvement', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.requiresOtherFirmsInvolvement)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'requiresOtherFirmsInvolvement';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.requiresOtherFirmsInvolvement)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '14. Will this engagement require the involvement of other audit firms handling affiliates, ' +
        'joint ventures, inventory observations, etc.?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.requiresOtherFirmsInvolvement)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.requiresOtherFirmsInvolvement)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });
    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.requiresOtherFirmsInvolvement;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.requiresOtherFirmsInvolvement)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.requiresOtherFirmsInvolvement)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.requiresOtherFirmsInvolvement}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('requiresOtherFirmsInvolvementComments', () => {
    it.each([
      { requiresOtherFirmsInvolvement: faker.random.alphaNumeric(10) },
      { requiresOtherFirmsInvolvement: null }
    ])('should not render when requiresOtherFirmsInvolvement is not Yes', ({ requiresOtherFirmsInvolvement }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeRiskAssessmentView,
        formData: {
          ...fakeRiskAssessmentView.formData,
          requiresOtherFirmsInvolvement
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.requiresOtherFirmsInvolvementComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            requiresOtherFirmsInvolvement: 'Yes'
          }
        });
      });

      it('should render when requiresOtherFirmsInvolvement is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.requiresOtherFirmsInvolvementComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.requiresOtherFirmsInvolvementComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'requiresOtherFirmsInvolvementComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.requiresOtherFirmsInvolvementComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel =
          'If yes, document the proportion of the group financial statements being audited/reviewed by PM. ' +
          'Also document expected difficulties in obtaining information from component auditors, component ' +
          'management, and/or group management';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.requiresOtherFirmsInvolvementComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.requiresOtherFirmsInvolvementComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.requiresOtherFirmsInvolvementComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.requiresOtherFirmsInvolvementComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.requiresOtherFirmsInvolvementComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.requiresOtherFirmsInvolvementComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('concernInWithRequiredCommunications', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.concernInWithRequiredCommunications)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'concernInWithRequiredCommunications';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.concernInWithRequiredCommunications)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '15. Is there any matter of concern identified in required communications, such as material weaknesses ' +
        'or significant deficiencies in internal control?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.concernInWithRequiredCommunications)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.concernInWithRequiredCommunications)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });
    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.concernInWithRequiredCommunications;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.concernInWithRequiredCommunications)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.concernInWithRequiredCommunications)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.concernInWithRequiredCommunications}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('concernInWithRequiredCommunicationsComments', () => {
    it.each([
      { concernInWithRequiredCommunications: faker.random.alphaNumeric(10) },
      { concernInWithRequiredCommunications: null }
    ])(
      'should not render when concernInWithRequiredCommunications is not Yes',
      ({ concernInWithRequiredCommunications }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            concernInWithRequiredCommunications
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.concernInWithRequiredCommunicationsComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            concernInWithRequiredCommunications: 'Yes'
          }
        });
      });

      it('should render when concernInWithRequiredCommunications is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.concernInWithRequiredCommunicationsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.concernInWithRequiredCommunicationsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'concernInWithRequiredCommunicationsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.concernInWithRequiredCommunicationsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, explain:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.concernInWithRequiredCommunicationsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.concernInWithRequiredCommunicationsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.concernInWithRequiredCommunicationsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.concernInWithRequiredCommunicationsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.concernInWithRequiredCommunicationsComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.concernInWithRequiredCommunicationsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('inAccordanceWithFinancialFramework', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.inAccordanceWithFinancialFramework)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'inAccordanceWithFinancialFramework';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.inAccordanceWithFinancialFramework)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '16. Will this engagement be performed in accordance with a financial reporting framework other than ' +
        'GAAP or IFRS (cash, tax, regulatory, or contractual basis of accounting)?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.inAccordanceWithFinancialFramework)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.inAccordanceWithFinancialFramework)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.inAccordanceWithFinancialFramework;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.inAccordanceWithFinancialFramework)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.inAccordanceWithFinancialFramework)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.inAccordanceWithFinancialFramework}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('inAccordanceWithFinancialFrameworkComments', () => {
    it.each([
      { inAccordanceWithFinancialFramework: faker.random.alphaNumeric(10) },
      { inAccordanceWithFinancialFramework: null }
    ])(
      'should not render when inAccordanceWithFinancialFramework is not Yes',
      ({ inAccordanceWithFinancialFramework }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            inAccordanceWithFinancialFramework
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.inAccordanceWithFinancialFrameworkComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            inAccordanceWithFinancialFramework: 'Yes'
          }
        });
      });

      it('should render when inAccordanceWithFinancialFramework is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.inAccordanceWithFinancialFrameworkComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.inAccordanceWithFinancialFrameworkComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'inAccordanceWithFinancialFrameworkComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.inAccordanceWithFinancialFrameworkComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel =
          'If yes, explain the purpose for and users of the financial statements prepared in this manner.';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.inAccordanceWithFinancialFrameworkComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.inAccordanceWithFinancialFrameworkComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.inAccordanceWithFinancialFrameworkComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.inAccordanceWithFinancialFrameworkComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.inAccordanceWithFinancialFrameworkComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.inAccordanceWithFinancialFrameworkComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('anticipatedAssuranceEngagementRiskRating', () => {
    it('does not render when currentWorkflowStepId equals to initiatorRework', () => {
      const currentWorkflowStepId = NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.initiatorRework.id;
      newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.anticipatedAssuranceEngagementRiskRating)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(faker.datatype.number());
      });

      it('render inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.anticipatedAssuranceEngagementRiskRating)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'anticipatedAssuranceEngagementRiskRating';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.anticipatedAssuranceEngagementRiskRating)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel =
          'What is the anticipated Assurance engagement risk rating? A, B, C, D (A=Low Risk. D= Highest Risk)';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.anticipatedAssuranceEngagementRiskRating)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct options prop', () => {
        const expectedOptions = RiskRatingRadioButtonListOptions;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.anticipatedAssuranceEngagementRiskRating)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('has correct selectedValue prop', () => {
        const expectedSelectedValue = fakeRiskAssessmentView.formData.anticipatedAssuranceEngagementRiskRating;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.anticipatedAssuranceEngagementRiskRating)).toHaveAttribute(
          'selectedValue',
          expectedSelectedValue
        );
      });

      it('has correct horizontalItems prop', () => {
        const expectedHorizontalItems = true;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.anticipatedAssuranceEngagementRiskRating)).toHaveAttribute(
          'horizontalItems',
          expectedHorizontalItems.toString()
        );
      });

      it('has disabled prop as false when currentWorkflowStepId is relationshipPartnerApproval', () => {
        const currentWorkflowStepId = NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.relationshipPartnerApproval.id;
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
        const expectedDisabledValue = false;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.anticipatedAssuranceEngagementRiskRating)).toHaveAttribute(
          'disabled',
          expectedDisabledValue.toString()
        );
      });

      it('has disabled prop as true when currentWorkflowStepId is not relationshipPartnerApproval', () => {
        const currentWorkflowStepId = faker.datatype.number();
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
        const expectedDisabledValue = true;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.anticipatedAssuranceEngagementRiskRating)).toHaveAttribute(
          'disabled',
          expectedDisabledValue.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.anticipatedAssuranceEngagementRiskRating}-${testIds.radioButtonListOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('understandingOfRiskImpactComments', () => {
    it('should not render when currentWorkflowStepId is initiatorRework', () => {
      const currentWorkflowStepId = NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.initiatorRework.id;
      newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.understandingOfRiskImpactComments)).not.toBeInTheDocument();
    });

    it('should render when currentWorkflowStepId is not initiatorRework', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.understandingOfRiskImpactComments)).toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(faker.datatype.number());
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.understandingOfRiskImpactComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'understandingOfRiskImpactComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.understandingOfRiskImpactComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel =
          'Explanations/Commentary that will assist approvers in understanding the impact of risks described above.';

        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.understandingOfRiskImpactComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.understandingOfRiskImpactComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.understandingOfRiskImpactComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.understandingOfRiskImpactComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.understandingOfRiskImpactComments)).toHaveAttribute('value', expectedValue);
      });

      it('has disabled prop as false when currentWorkflowStepId is relationshipPartnerApproval', () => {
        const currentWorkflowStepId = NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.relationshipPartnerApproval.id;
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
        const expectedDisabledValue = false;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.anticipatedAssuranceEngagementRiskRating)).toHaveAttribute(
          'disabled',
          expectedDisabledValue.toString()
        );
      });

      it('has disabled prop as true when currentWorkflowStepId is not relationshipPartnerApproval', () => {
        const currentWorkflowStepId = faker.datatype.number();
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
        const expectedDisabledValue = true;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.anticipatedAssuranceEngagementRiskRating)).toHaveAttribute(
          'disabled',
          expectedDisabledValue.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.understandingOfRiskImpactComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
