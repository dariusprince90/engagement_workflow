import ReactDOM from 'react-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import IndependenceAnalysisSection from './IndependenceAnalysisSection';

// *********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form fields
  descriptionOfNonAttestServices: 'description-of-non-attest-services',
  roleInCreatingSourceDocumentsForTransactions: 'role-in-creating-source-documents-for-transactions',
  roleInCreatingSourceDocumentsForTransactionsComments: 'role-in-creating-source-documents-for-transactions-comments',
  roleInCreatingGeneralLedger: 'role-in-creating-general-ledger',
  roleInCreatingGeneralLedgerComments: 'role-in-creating-genera-ledger-comments',
  roleInAppraisalValuation: 'role-in-appraisal-valuation',
  roleInAppraisalValuationComments: 'role-in-appraisal-valuation-comments',
  roleInCustodyOrControlOfClientAssets: 'role-in-custody-or-control-of-client-assets',
  roleInCustodyOrControlOfClientAssetsComments: 'role-in-custody-or-control-of-client-assets-comments',
  abilityToAuthorizeTransactions: 'ability-to-authorize-transactions',
  abilityToAuthorizeTransactionsComments: 'ability-to-authorize-transactions-comments',
  roleInTransactionMonitoringOrControl: 'role-in-transaction-monitoring-or-control',
  roleInTransactionMonitoringOrControlComments: 'role-in-transaction-monitoring-or-control-comments',
  roleInOngoingComplianceOrQualityControl: 'role-in-ongoing-compliance-or-quality-control',
  roleInOngoingComplianceOrQualityControlComments: 'role-in-ongoing-compliance-or-quality-control-comments',
  roleInDesigningClientAccountingFunctions: 'role-in-designing-client-accounting-functions',
  roleInDesigningClientAccountingFunctionsComments: 'role-in-designing-client-accounting-functions-comments',
  roleInDesigningClientInfoSystems: 'role-in-designing-client-info-systems',
  roleInDesigningClientInfoSystemsComments: 'role-in-designing-client-info-systems-comments',
  roleInDecisionMakingOrOperations: 'role-in-decision-making-or-operations',
  roleInDecisionMakingOrOperationsComments: 'role-in-decision-making-or-operations-comments',
  roleAsPromoterOfClientFinancingTransactions: 'role-as-promoter-of-client-financing-transactions',
  roleAsPromoterOfClientFinancingTransactionsComments: 'role-as-promoter-of-client-financing-transactions-comments',
  creationOfMutualInterest: 'creation-of-mutual-interest',
  creationOfMutualInterestComments: 'creation-of-mutual-interest-comments',
  roleInForensicAccountingInSupportOfLitigation: 'role-in-forensic-accounting-in-support-of-litigation',
  roleInForensicAccountingInSupportOfLitigationComments:
    'role-in-forensic-accounting-in-support-of-litigation-comments',
  descriptionOfClientSkillsAndExperience: 'description-of-client-skills-and-experience',
  significantThreatToIndependence: 'significant-threat-to-independence',
  significantThreatToIndependenceComments: 'significant-threat-to-independence-comments',
  significantThreatToIndependenceSafeguards: 'significant-threat-to-independence-safeguards',
  safeguardsAdequatelyAddressThreats: 'safeguards-adequately-address-threats',

  // form text
  formText: 'form-text',

  // form header
  formHeader: 'form-header',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakeGaoView = {
  formData: {
    descriptionOfNonAttestServices: faker.random.alphaNumeric(10),
    roleInCreatingSourceDocumentsForTransactions: faker.datatype.boolean(),
    roleInCreatingSourceDocumentsForTransactionsComments: faker.random.alphaNumeric(10),
    roleInCreatingGeneralLedger: faker.datatype.boolean(),
    roleInCreatingGeneralLedgerComments: faker.random.alphaNumeric(10),
    roleInAppraisalValuation: faker.datatype.boolean(),
    roleInAppraisalValuationComments: faker.random.alphaNumeric(10),
    roleInCustodyOrControlOfClientAssets: faker.datatype.boolean(),
    roleInCustodyOrControlOfClientAssetsComments: faker.random.alphaNumeric(10),
    abilityToAuthorizeTransactions: faker.datatype.boolean(),
    abilityToAuthorizeTransactionsComments: faker.random.alphaNumeric(10),
    roleInTransactionMonitoringOrControl: faker.datatype.boolean(),
    roleInTransactionMonitoringOrControlComments: faker.random.alphaNumeric(10),
    roleInOngoingComplianceOrQualityControl: faker.datatype.boolean(),
    roleInOngoingComplianceOrQualityControlComments: faker.random.alphaNumeric(10),
    roleInDesigningClientAccountingFunctions: faker.datatype.boolean(),
    roleInDesigningClientAccountingFunctionsComments: faker.random.alphaNumeric(10),
    roleInDesigningClientInfoSystems: faker.datatype.boolean(),
    roleInDesigningClientInfoSystemsComments: faker.random.alphaNumeric(10),
    roleInDecisionMakingOrOperations: faker.datatype.boolean(),
    roleInDecisionMakingOrOperationsComments: faker.random.alphaNumeric(10),
    roleAsPromoterOfClientFinancingTransactions: faker.datatype.boolean(),
    roleAsPromoterOfClientFinancingTransactionsComments: faker.random.alphaNumeric(10),
    creationOfMutualInterest: faker.datatype.boolean(),
    creationOfMutualInterestComments: faker.random.alphaNumeric(10),
    roleInForensicAccountingInSupportOfLitigation: faker.datatype.boolean(),
    roleInForensicAccountingInSupportOfLitigationComments: faker.random.alphaNumeric(10),
    descriptionOfClientSkillsAndExperience: faker.random.alphaNumeric(10),
    significantThreatToIndependence: faker.datatype.boolean(),
    significantThreatToIndependenceComments: faker.random.alphaNumeric(10),
    significantThreatToIndependenceSafeguards: faker.random.alphaNumeric(10),
    safeguardsAdequatelyAddressThreats: faker.datatype.boolean()
  }
};

const fakeNewEngagementInstance = {
  isAttest: faker.datatype.boolean()
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <IndependenceAnalysisSection {...props} {...hocInjectedProps} />;
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

jest.mock('../../../withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../newEngagementInstanceSlice', () => {
  return {
    selectCurrentView: jest.fn(),
    selectNewEngagementInstance: jest.fn()
  };
});

jest.mock('../../../../components/formText/FormText', () => ({
  __esModule: true,
  default: ({ children, applyEmphasis }) => {
    const props = { children, applyEmphasis };
    return <fake-form-text {...props} data-testid={testIds.formText} />;
  }
}));

jest.mock('../../../../../../common/formHeader/FormHeader', () => {
  return {
    __esModule: true,
    default: ({ text }) => {
      const props = { text };
      return <fake-form-header {...props} data-testid={testIds.formHeader} />;
    }
  };
});

jest.mock('../../../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ title, children }) => {
    const props = { title, children };
    return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
  }
}));

jest.mock('../../../../components/radioButtonList/RadioButtonList', () => ({
  __esModule: true,
  default: ({ name, label, options, selectedValue, horizontalItems, onChange }) => {
    const props = { name, label, selectedValue, horizontalItems };
    return (
      <fake-radio-button-list {...props} data-testid={testIds[name]} options={JSON.stringify(options)}>
        <button data-testid={`${testIds[name]}-${testIds.radioButtonListOnChange}`} onClick={onChange} />
      </fake-radio-button-list>
    );
  }
}));

jest.mock('../../../../components/textArea/TextArea', () => ({
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

// **********************************************************************
// * unit tests

describe('IndependenceAnalysisSection', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeGaoView);
    newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(fakeNewEngagementInstance);
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

  it('renders CollapsibleFormSection component with correct title prop', () => {
    const expectedTitle = 'Independence Analysis';
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
  });

  describe('instructions form text', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.formText)).toBeInTheDocument();
    });

    it('has applyEmphasis prop', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.formText)).toHaveAttribute('applyEmphasis');
    });

    it('renders correct text as children', () => {
      const expectedText =
        'The questions below are designed to identify any potential threats to independence that could be created by ' +
        'the proposed non attest service(s) listed above. Click on the "?" for additional guidance as to what services ' +
        'are permitted or prohibited. If multiple non attest services are being proposed, consider the potential impact ' +
        "of each service when answering the questions and identify the specific non attest service when describing PM's " +
        'involvement for any question answered yes.';
      render(getComponentToRender(defaultProps));
      const formText = screen.getByTestId(testIds.formText);
      expect(within(formText).getByText(expectedText)).toBeInTheDocument();
    });
  });

  describe('descriptionOfNonAttestServices TextArea', () => {
    it.each([{ isAttest: true }, { isAttest: null }, { isAttest: faker.datatype.string() }])(
      'should not render descriptionOfNonAttestServices when isAttest is not false',
      ({ isAttest }) => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isAttest
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.descriptionOfNonAttestServices)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isAttest: false
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.descriptionOfNonAttestServices)).toBeInTheDocument();
      });

      it('should render TextArea when isAttest is false', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.descriptionOfNonAttestServices)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'descriptionOfNonAttestServices';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.descriptionOfNonAttestServices)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel =
          'Describe in detail the Non Attest services to be provided, Including any reports or other deliverables ' +
          "that will be provided and the Client's anticipated use and distribution of the deliverables";
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.descriptionOfNonAttestServices)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.descriptionOfNonAttestServices;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.descriptionOfNonAttestServices)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.descriptionOfNonAttestServices)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.descriptionOfNonAttestServices)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.descriptionOfNonAttestServices}-${testIds.textAreaOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('GAO form header', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.formHeader)).toBeInTheDocument();
    });

    it('renders correct text prop', () => {
      const expectedText = 'GAO: Will the proposed project involve:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.formHeader)).toHaveAttribute('text', expectedText);
    });
  });

  describe('roleInCreatingSourceDocumentsForTransactions RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.roleInCreatingSourceDocumentsForTransactions)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInCreatingSourceDocumentsForTransactions';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactions)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = '1. Any role in creating or preparing source documents for transactions?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactions)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactions)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactions)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.roleInCreatingSourceDocumentsForTransactions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactions)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(
        screen.getByTestId(`${testIds.roleInCreatingSourceDocumentsForTransactions}-${testIds.radioButtonListOnChange}`)
      );
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('roleInCreatingSourceDocumentsForTransactionsComments TextArea', () => {
    it.each([
      { roleInCreatingSourceDocumentsForTransactions: false },
      { roleInCreatingSourceDocumentsForTransactions: null },
      { roleInCreatingSourceDocumentsForTransactions: faker.datatype.string() }
    ])(
      'should not render TextArea when roleInCreatingSourceDocumentsForTransactions is not true',
      ({ roleInCreatingSourceDocumentsForTransactions }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInCreatingSourceDocumentsForTransactions }
        });
        render(getComponentToRender(defaultProps));
        expect(
          screen.queryByTestId(testIds.roleInCreatingSourceDocumentsForTransactionsComments)
        ).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInCreatingSourceDocumentsForTransactions: true }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInCreatingSourceDocumentsForTransactionsComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when roleInCreatingSourceDocumentsForTransactions is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactionsComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInCreatingSourceDocumentsForTransactionsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactionsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactionsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.roleInCreatingSourceDocumentsForTransactionsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactionsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactionsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactionsComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('does not yet invoke onChange', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(
              `${testIds.roleInCreatingSourceDocumentsForTransactionsComments}-${testIds.textAreaOnChange}`
            )
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInCreatingGeneralLedger RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.roleInCreatingGeneralLedger)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInCreatingGeneralLedger';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCreatingGeneralLedger)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '2. Any role in creating or maintaining general ledger or subsidiary general ledger records or their ' +
        'equivalents, preparing journal entries or reconciliations.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCreatingGeneralLedger)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCreatingGeneralLedger)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCreatingGeneralLedger)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.roleInCreatingGeneralLedger;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCreatingGeneralLedger)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(screen.getByTestId(`${testIds.roleInCreatingGeneralLedger}-${testIds.radioButtonListOnChange}`));
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('roleInCreatingGeneralLedgerComments TextArea', () => {
    it.each([
      { roleInCreatingGeneralLedger: false },
      { roleInCreatingGeneralLedger: null },
      { roleInCreatingGeneralLedger: faker.datatype.string() }
    ])('should not render TextArea when roleInCreatingGeneralLedger is not true', ({ roleInCreatingGeneralLedger }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeGaoView,
        formData: { ...fakeGaoView.formData, roleInCreatingGeneralLedger }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.roleInCreatingGeneralLedgerComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInCreatingGeneralLedger: true }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInCreatingGeneralLedgerComments)
        ).toBeInTheDocument();
      });

      it('should render textarea when roleInCreatingGeneralLedger is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCreatingGeneralLedgerComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInCreatingGeneralLedgerComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCreatingGeneralLedgerComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCreatingGeneralLedgerComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.roleInCreatingGeneralLedgerComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCreatingGeneralLedgerComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCreatingGeneralLedgerComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCreatingGeneralLedgerComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('does not yet invoke onChange', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.roleInCreatingGeneralLedgerComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInAppraisalValuation RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.roleInAppraisalValuation)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInAppraisalValuation';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInAppraisalValuation)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '3. Any role in appraisal valuation or otherwise in determining any material amounts for financial reporting purposes?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInAppraisalValuation)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInAppraisalValuation)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInAppraisalValuation)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.roleInAppraisalValuation;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInAppraisalValuation)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(screen.getByTestId(`${testIds.roleInAppraisalValuation}-${testIds.radioButtonListOnChange}`));
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('roleInAppraisalValuationComments TextArea', () => {
    it.each([
      { roleInAppraisalValuation: false },
      { roleInAppraisalValuation: null },
      { roleInAppraisalValuation: faker.datatype.string() }
    ])('should not render TextArea when roleInAppraisalValuation is not true', ({ roleInAppraisalValuation }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeGaoView,
        formData: { ...fakeGaoView.formData, roleInAppraisalValuation }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.roleInAppraisalValuationComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInAppraisalValuation: true }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInAppraisalValuationComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when roleInAppraisalValuation is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInAppraisalValuationComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInAppraisalValuationComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInAppraisalValuationComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInAppraisalValuationComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.roleInAppraisalValuationComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInAppraisalValuationComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInAppraisalValuationComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInAppraisalValuationComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('does not yet invoke onChange', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.roleInAppraisalValuationComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInCustodyOrControlOfClientAssets RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.roleInCustodyOrControlOfClientAssets)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInCustodyOrControlOfClientAssets';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCustodyOrControlOfClientAssets)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '4. Any role in custody or control of client assets?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCustodyOrControlOfClientAssets)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCustodyOrControlOfClientAssets)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCustodyOrControlOfClientAssets)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.roleInCustodyOrControlOfClientAssets;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCustodyOrControlOfClientAssets)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(
        screen.getByTestId(`${testIds.roleInCustodyOrControlOfClientAssets}-${testIds.radioButtonListOnChange}`)
      );
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('roleInCustodyOrControlOfClientAssetsComments TextArea', () => {
    it.each([
      { roleInCustodyOrControlOfClientAssets: false },
      { roleInCustodyOrControlOfClientAssets: null },
      { roleInCustodyOrControlOfClientAssets: faker.datatype.string() }
    ])(
      'should not render TextArea when roleInCustodyOrControlOfClientAssets is not true',
      ({ roleInCustodyOrControlOfClientAssets }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInCustodyOrControlOfClientAssets }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.roleInCustodyOrControlOfClientAssetsComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInCustodyOrControlOfClientAssets: true }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInCustodyOrControlOfClientAssetsComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when roleInCustodyOrControlOfClientAssets is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOrControlOfClientAssetsComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInCustodyOrControlOfClientAssetsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOrControlOfClientAssetsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOrControlOfClientAssetsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.roleInCustodyOrControlOfClientAssetsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOrControlOfClientAssetsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOrControlOfClientAssetsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOrControlOfClientAssetsComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('does not yet invoke onChange', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.roleInCustodyOrControlOfClientAssetsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('abilityToAuthorizeTransactions RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.abilityToAuthorizeTransactions)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'abilityToAuthorizeTransactions';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.abilityToAuthorizeTransactions)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '5. Any ability to authorize, approve or consummate transactions or exercise any form of authority on ' +
        'behalf of the client?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.abilityToAuthorizeTransactions)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.abilityToAuthorizeTransactions)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.abilityToAuthorizeTransactions)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.abilityToAuthorizeTransactions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.abilityToAuthorizeTransactions)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(
        screen.getByTestId(`${testIds.abilityToAuthorizeTransactions}-${testIds.radioButtonListOnChange}`)
      );
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('abilityToAuthorizeTransactionsComments TextArea', () => {
    it.each([
      { abilityToAuthorizeTransactions: false },
      { abilityToAuthorizeTransactions: null },
      { abilityToAuthorizeTransactions: faker.datatype.string() }
    ])(
      'should not render TextArea when abilityToAuthorizeTransactions is not true',
      ({ abilityToAuthorizeTransactions }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, abilityToAuthorizeTransactions }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.abilityToAuthorizeTransactionsComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, abilityToAuthorizeTransactions: true }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.abilityToAuthorizeTransactionsComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when abilityToAuthorizeTransactions is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'abilityToAuthorizeTransactionsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.abilityToAuthorizeTransactionsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('does not yet invoke onChange', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.abilityToAuthorizeTransactionsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInTransactionMonitoringOrControl RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.roleInTransactionMonitoringOrControl)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInTransactionMonitoringOrControl';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInTransactionMonitoringOrControl)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '6. Any role in monitoring or control activities that affect the execution of transactions or ensure that ' +
        'transactions are properly executed?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInTransactionMonitoringOrControl)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInTransactionMonitoringOrControl)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInTransactionMonitoringOrControl)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.roleInTransactionMonitoringOrControl;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInTransactionMonitoringOrControl)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(
        screen.getByTestId(`${testIds.roleInTransactionMonitoringOrControl}-${testIds.radioButtonListOnChange}`)
      );
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('roleInTransactionMonitoringOrControlComments TextArea', () => {
    it.each([
      { roleInTransactionMonitoringOrControl: false },
      { roleInTransactionMonitoringOrControl: null },
      { roleInTransactionMonitoringOrControl: faker.datatype.string() }
    ])(
      'should not render TextArea when roleInTransactionMonitoringOrControl is not true',
      ({ roleInTransactionMonitoringOrControl }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInTransactionMonitoringOrControl }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.roleInTransactionMonitoringOrControlComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInTransactionMonitoringOrControl: true }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInTransactionMonitoringOrControlComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when roleInTransactionMonitoringOrControl is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInTransactionMonitoringOrControlComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInTransactionMonitoringOrControlComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInTransactionMonitoringOrControlComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInTransactionMonitoringOrControlComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.roleInTransactionMonitoringOrControlComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInTransactionMonitoringOrControlComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInTransactionMonitoringOrControlComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInTransactionMonitoringOrControlComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('does not yet invoke onChange', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.roleInTransactionMonitoringOrControlComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('RoleInOngoingComplianceOrQualityControl RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.roleInOngoingComplianceOrQualityControl)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInOngoingComplianceOrQualityControl';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControl)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '7. Any role in connection with operating or production processes that would be equivalent to an ongoing ' +
        'compliance or quality control function?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControl)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControl)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControl)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.roleInOngoingComplianceOrQualityControl;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControl)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(
        screen.getByTestId(`${testIds.roleInOngoingComplianceOrQualityControl}-${testIds.radioButtonListOnChange}`)
      );
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('roleInOngoingComplianceOrQualityControlComments TextArea', () => {
    it.each([
      { roleInOngoingComplianceOrQualityControl: false },
      { roleInOngoingComplianceOrQualityControl: null },
      { roleInOngoingComplianceOrQualityControl: faker.datatype.string() }
    ])(
      'should not render TextArea when roleInOngoingComplianceOrQualityControl is not true',
      ({ roleInOngoingComplianceOrQualityControl }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInOngoingComplianceOrQualityControl }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.roleInOngoingComplianceOrQualityControlComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInOngoingComplianceOrQualityControl: true }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInOngoingComplianceOrQualityControlComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when roleInOngoingComplianceOrQualityControl is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControlComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInOngoingComplianceOrQualityControlComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControlComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControlComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.roleInOngoingComplianceOrQualityControlComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControlComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControlComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControlComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('does not yet invoke onChange', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.roleInOngoingComplianceOrQualityControlComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('RoleInDesigningClientAccountingFunctions RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.roleInDesigningClientAccountingFunctions)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInDesigningClientAccountingFunctions';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesigningClientAccountingFunctions)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '8. Any role in designing, installing, supervising, operating, modifying, or monitoring any client ' +
        'accounting or financial functions, systems or processes, including financial information systems or ' +
        'internal controls?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesigningClientAccountingFunctions)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesigningClientAccountingFunctions)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesigningClientAccountingFunctions)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.roleInDesigningClientAccountingFunctions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesigningClientAccountingFunctions)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(
        screen.getByTestId(`${testIds.roleInDesigningClientAccountingFunctions}-${testIds.radioButtonListOnChange}`)
      );
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('roleInDesigningClientAccountingFunctionsComments TextArea', () => {
    it.each([
      { roleInDesigningClientAccountingFunctions: false },
      { roleInDesigningClientAccountingFunctions: null },
      { roleInDesigningClientAccountingFunctions: faker.datatype.string() }
    ])(
      'should not render TextArea when roleInDesigningClientAccountingFunctions is not true',
      ({ roleInDesigningClientAccountingFunctions }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInDesigningClientAccountingFunctions }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.roleInDesigningClientAccountingFunctionsComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInDesigningClientAccountingFunctions: true }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInDesigningClientAccountingFunctionsComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when roleInDesigningClientAccountingFunctions is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningClientAccountingFunctionsComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInDesigningClientAccountingFunctionsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningClientAccountingFunctionsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningClientAccountingFunctionsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.roleInDesigningClientAccountingFunctionsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningClientAccountingFunctionsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningClientAccountingFunctionsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningClientAccountingFunctionsComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('does not yet invoke onChange', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(
              `${testIds.roleInDesigningClientAccountingFunctionsComments}-${testIds.textAreaOnChange}`
            )
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInDesigningClientInfoSystems RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.roleInDesigningClientInfoSystems)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInDesigningClientInfoSystems';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesigningClientInfoSystems)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '9. Any role in designing, supervising, operating, modifying, or monitoring of general information ' +
        'technology systems that significantly impact the subject matter of the attest services?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesigningClientInfoSystems)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesigningClientInfoSystems)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesigningClientInfoSystems)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.roleInDesigningClientInfoSystems;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesigningClientInfoSystems)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(
        screen.getByTestId(`${testIds.roleInDesigningClientInfoSystems}-${testIds.radioButtonListOnChange}`)
      );
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('roleInDesigningClientInfoSystemsComments TextArea', () => {
    it.each([
      { roleInDesigningClientInfoSystems: false },
      { roleInDesigningClientInfoSystems: null },
      { roleInDesigningClientInfoSystems: faker.datatype.string() }
    ])(
      'should not render TextArea when roleInDesigningClientInfoSystems is not true',
      ({ roleInDesigningClientInfoSystems }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInDesigningClientInfoSystems }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.roleInDesigningClientInfoSystemsComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInDesigningClientInfoSystems: true }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInDesigningClientInfoSystemsComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when roleInDesigningClientInfoSystems is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningClientInfoSystemsComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInDesigningClientInfoSystemsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningClientInfoSystemsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningClientInfoSystemsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.roleInDesigningClientInfoSystemsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningClientInfoSystemsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningClientInfoSystemsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningClientInfoSystemsComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('does not yet invoke onChange', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.roleInDesigningClientInfoSystemsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInDecisionMakingOrOperations RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.roleInDecisionMakingOrOperations)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInDecisionMakingOrOperations';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperations)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '10. Any decision-making role or participation with management in operating decisions? (We cannot perform ' +
        'management functions and maintain independence).';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperations)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperations)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperations)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.roleInDecisionMakingOrOperations;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperations)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(
        screen.getByTestId(`${testIds.roleInDecisionMakingOrOperations}-${testIds.radioButtonListOnChange}`)
      );
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('roleInDecisionMakingOrOperationsComments TextArea', () => {
    it.each([
      { roleInDecisionMakingOrOperations: false },
      { roleInDecisionMakingOrOperations: null },
      { roleInDecisionMakingOrOperations: faker.datatype.string() }
    ])(
      'should not render TextArea when roleInDecisionMakingOrOperations is not true',
      ({ roleInDecisionMakingOrOperations }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInDecisionMakingOrOperations }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.roleInDecisionMakingOrOperationsComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInDecisionMakingOrOperations: true }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInDecisionMakingOrOperationsComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when roleInDecisionMakingOrOperations is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperationsComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInDecisionMakingOrOperationsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperationsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperationsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.roleInDecisionMakingOrOperationsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperationsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperationsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperationsComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('does not yet invoke onChange', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.roleInDecisionMakingOrOperationsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleAsPromoterOfClientFinancingTransactions RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.roleAsPromoterOfClientFinancingTransactions)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleAsPromoterOfClientFinancingTransactions';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactions)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '11. Any role as a promoter, underwriter, or broker of client financing transactions, including bank loans, ' +
        'equity or debt offerings?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactions)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactions)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactions)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.roleAsPromoterOfClientFinancingTransactions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactions)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(
        screen.getByTestId(`${testIds.roleAsPromoterOfClientFinancingTransactions}-${testIds.radioButtonListOnChange}`)
      );
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('roleAsPromoterOfClientFinancingTransactionsComments TextArea', () => {
    it.each([
      { roleAsPromoterOfClientFinancingTransactions: false },
      { roleAsPromoterOfClientFinancingTransactions: null },
      { roleAsPromoterOfClientFinancingTransactions: faker.datatype.string() }
    ])(
      'should not render TextArea when roleAsPromoterOfClientFinancingTransactions is not true',
      ({ roleAsPromoterOfClientFinancingTransactions }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleAsPromoterOfClientFinancingTransactions }
        });
        render(getComponentToRender(defaultProps));
        expect(
          screen.queryByTestId(testIds.roleAsPromoterOfClientFinancingTransactionsComments)
        ).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleAsPromoterOfClientFinancingTransactions: true }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleAsPromoterOfClientFinancingTransactionsComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when roleAsPromoterOfClientFinancingTransactions is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactionsComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleAsPromoterOfClientFinancingTransactionsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactionsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactionsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.roleAsPromoterOfClientFinancingTransactionsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactionsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactionsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactionsComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('does not yet invoke onChange', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(
              `${testIds.roleAsPromoterOfClientFinancingTransactionsComments}-${testIds.textAreaOnChange}`
            )
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('creationOfMutualInterest RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.creationOfMutualInterest)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'creationOfMutualInterest';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creationOfMutualInterest)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '12. Creation of any form of mutual interest with the client?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creationOfMutualInterest)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creationOfMutualInterest)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creationOfMutualInterest)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.creationOfMutualInterest;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creationOfMutualInterest)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(screen.getByTestId(`${testIds.creationOfMutualInterest}-${testIds.radioButtonListOnChange}`));
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('creationOfMutualInterestComments TextArea', () => {
    it.each([
      { creationOfMutualInterest: false },
      { creationOfMutualInterest: null },
      { creationOfMutualInterest: faker.datatype.string() }
    ])('should not render TextArea when creationOfMutualInterest is not true', ({ creationOfMutualInterest }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeGaoView,
        formData: { ...fakeGaoView.formData, creationOfMutualInterest }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.creationOfMutualInterestComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, creationOfMutualInterest: true }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.creationOfMutualInterestComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when creationOfMutualInterest is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'creationOfMutualInterestComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.creationOfMutualInterestComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('does not yet invoke onChange', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.creationOfMutualInterestComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInForensicAccountingInSupportOfLitigation RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.roleInForensicAccountingInSupportOfLitigation)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInForensicAccountingInSupportOfLitigation';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInForensicAccountingInSupportOfLitigation)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '13. Any role in providing forensic accounting services in connection with known or potential litigation?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInForensicAccountingInSupportOfLitigation)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInForensicAccountingInSupportOfLitigation)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInForensicAccountingInSupportOfLitigation)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.roleInForensicAccountingInSupportOfLitigation;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInForensicAccountingInSupportOfLitigation)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(
        screen.getByTestId(
          `${testIds.roleInForensicAccountingInSupportOfLitigation}-${testIds.radioButtonListOnChange}`
        )
      );
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('roleInForensicAccountingInSupportOfLitigationComments TextArea', () => {
    it.each([
      { roleInForensicAccountingInSupportOfLitigation: false },
      { roleInForensicAccountingInSupportOfLitigation: null },
      { roleInForensicAccountingInSupportOfLitigation: faker.datatype.string() }
    ])(
      'should not render TextArea when roleInForensicAccountingInSupportOfLitigation is not true',
      ({ roleInForensicAccountingInSupportOfLitigation }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInForensicAccountingInSupportOfLitigation }
        });
        render(getComponentToRender(defaultProps));
        expect(
          screen.queryByTestId(testIds.roleInForensicAccountingInSupportOfLitigationComments)
        ).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, roleInForensicAccountingInSupportOfLitigation: true }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInForensicAccountingInSupportOfLitigationComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when roleInForensicAccountingInSupportOfLitigation is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInForensicAccountingInSupportOfLitigationComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInForensicAccountingInSupportOfLitigationComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInForensicAccountingInSupportOfLitigationComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInForensicAccountingInSupportOfLitigationComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.roleInForensicAccountingInSupportOfLitigationComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInForensicAccountingInSupportOfLitigationComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInForensicAccountingInSupportOfLitigationComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInForensicAccountingInSupportOfLitigationComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('does not yet invoke onChange', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(
              `${testIds.roleInForensicAccountingInSupportOfLitigationComments}-${testIds.textAreaOnChange}`
            )
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('descriptionOfClientSkillsAndExperience TextArea', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.descriptionOfClientSkillsAndExperience)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'descriptionOfClientSkillsAndExperience';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.descriptionOfClientSkillsAndExperience)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '14. To maintain our independence, an individual(s) at the client must have the skills, knowledge and ' +
        'experience (SKE) that allows them to effectively oversee and evaluate the services. Document the ' +
        'conclusion and the basis for our conclusion as to whether the client has sufficient SKE. (The client does ' +
        'not have to be able to perform the services, but only be able to oversee the performance of the services ' +
        'and understand and evaluate the results.)';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.descriptionOfClientSkillsAndExperience)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeGaoView.formData.descriptionOfClientSkillsAndExperience;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.descriptionOfClientSkillsAndExperience)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.descriptionOfClientSkillsAndExperience)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = '6';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.descriptionOfClientSkillsAndExperience)).toHaveAttribute('rows', expectedRows);
    });

    describe('functional', () => {
      it('does not yet invoke onChange', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.descriptionOfClientSkillsAndExperience}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('significantThreatToIndependence RadioButtonList', () => {
    it.each([{ isAttest: true }, { isAttest: null }, { isAttest: faker.datatype.string() }])(
      'should not render RadioButtonList when isAttest is not false',
      ({ isAttest }) => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isAttest
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.significantThreatToIndependence)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isAttest: false
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.significantThreatToIndependence)).toBeInTheDocument();
      });

      it('should render RadioButtonList when isAttest is false', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependence)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'significantThreatToIndependence';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependence)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = (
          <>
            15. Based on the nature of the proposed non-attest services and the client's ability to oversee and evaluate
            the services provided, will providing the non-attest services create a significant threat to independence?
            <br />
            Threats would include:
            <ul>
              <li>management participation threat</li>
              <li>self review threat (auditing balances or amounts that we computed)</li>
              <li>advocacy threat - actively promoting a client position</li>
            </ul>
          </>
        ).toString();
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependence)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct options prop', () => {
        const expectedOptions = YesNoRadioButtonListOptions;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependence)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('has correct horizontalItems prop', () => {
        const expectedHorizontalItems = true;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependence)).toHaveAttribute(
          'horizontalItems',
          expectedHorizontalItems.toString()
        );
      });

      it('has correct selectedValue prop', () => {
        const expectedSelectedValue = fakeGaoView.formData.significantThreatToIndependence;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependence)).toHaveAttribute(
          'selectedValue',
          expectedSelectedValue.toString()
        );
      });

      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.significantThreatToIndependence}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('significantThreatToIndependenceComments TextArea', () => {
    it.each([
      { isAttest: true, significantThreatToIndependence: true },
      { isAttest: true, significantThreatToIndependence: false },
      { isAttest: false, significantThreatToIndependence: false }
    ])(
      'should not render when isAttest ($isAttest) and significantThreatToIndependence ($significantThreatToIndependence)',
      ({ isAttest, significantThreatToIndependence }) => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isAttest
        });
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, significantThreatToIndependence }
        });

        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.significantThreatToIndependenceComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isAttest: false
        });
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, significantThreatToIndependence: true }
        });
      });

      it('should render TextArea when isAttest is false and significantThreatToIndependence is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependenceComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'significantThreatToIndependenceComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependenceComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = '15a. If yes. Document the significant threat to independence';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependenceComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.significantThreatToIndependenceComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependenceComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependenceComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependenceComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('does not yet invoke onChange', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.significantThreatToIndependenceComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('significantThreatToIndependenceSafeguards TextArea', () => {
    it.each([{ isAttest: true }, { isAttest: null }, { isAttest: faker.datatype.string() }])(
      'should not render significantThreatToIndependenceSafeguards when isAttest is not false',
      ({ isAttest }) => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isAttest
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.significantThreatToIndependenceSafeguards)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isAttest: false
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.significantThreatToIndependenceSafeguards)
        ).toBeInTheDocument();
      });

      it('should render TextArea when isAttest is false', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependenceSafeguards)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'significantThreatToIndependenceSafeguards';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependenceSafeguards)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = (
          <>
            15b. Describe safeguards that will be implemented to eliminate or reduce the threat to independence to an
            acceptable level.
            <br />
            Safeguards could include:
            <ul>
              <li>services reviewed by someone not on the audit engagement team</li>
              <li>discussion of independence issue with those charged with governance</li>
            </ul>
          </>
        ).toString();
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependenceSafeguards)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.significantThreatToIndependenceSafeguards;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependenceSafeguards)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependenceSafeguards)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.significantThreatToIndependenceSafeguards)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('does not yet invoke onChange', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.significantThreatToIndependenceSafeguards}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('safeguardsAdequatelyAddressThreats RadioButtonList', () => {
    it.each([{ isAttest: true }, { isAttest: null }, { isAttest: faker.datatype.string() }])(
      'should not render safeguardsAdequatelyAddressThreats when isAttest is not false',
      ({ isAttest }) => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isAttest
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.safeguardsAdequatelyAddressThreats)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isAttest: false
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.safeguardsAdequatelyAddressThreats)
        ).toBeInTheDocument();
      });

      it('should render RadioButtonList when isAttest is false', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.safeguardsAdequatelyAddressThreats)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'safeguardsAdequatelyAddressThreats';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.safeguardsAdequatelyAddressThreats)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = '15c. Conclusion: Do the safeguards adequately address the threats to independence?';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.safeguardsAdequatelyAddressThreats)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct options prop', () => {
        const expectedOptions = YesNoRadioButtonListOptions;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.safeguardsAdequatelyAddressThreats)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('has correct horizontalItems prop', () => {
        const expectedHorizontalItems = true;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.safeguardsAdequatelyAddressThreats)).toHaveAttribute(
          'horizontalItems',
          expectedHorizontalItems.toString()
        );
      });

      it('has correct selectedValue prop', () => {
        const expectedSelectedValue = fakeGaoView.formData.safeguardsAdequatelyAddressThreats;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.safeguardsAdequatelyAddressThreats)).toHaveAttribute(
          'selectedValue',
          expectedSelectedValue.toString()
        );
      });

      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.safeguardsAdequatelyAddressThreats}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });
});
