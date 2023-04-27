import ReactDOM from 'react-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import YesNoRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import WillWillNotRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/WillWillNotRadioButtonListOptions';
import newEngagementInstanceSlice from '../../../newEngagementInstance/newEngagementInstanceSlice';
import AicpaView from './AicpaView';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form headers
  aicpaHeader: 'aicpa-header',

  // form text
  instructionFormText: 'instruction-form-text',
  creationOfMutualInterestWithClientInstructionsFormText:
    'creation-of-mutual-interest-with-client-instructions-form-text',

  // form fields
  roleInCreatingSourceDocumentsForTransactions: 'role-in-creating-source-documents-for-transactions',
  roleInCreatingSourceDocumentsForTransactionsComments: 'role-in-creating-source-documents-for-transactions-comments',
  roleInAppraisalValuation: 'role-in-appraisal-valuation',
  roleInAppraisalValuationComments: 'role-in-appraisal-valuation-comments',
  roleInCustodyOfClientAssets: 'role-in-custody-of-client-assets',
  roleInCustodyOfClientAssetsComments: 'role-in-custody-of-client-assets-comments',
  abilityToAuthorizeTransactionsOnBehalf: 'ability-to-authorize-transactions-on-behalf',
  abilityToAuthorizeTransactionsOnBehalfComments: 'ability-to-authorize-transactions-on-behalf-comments',
  roleInMonitoringAffectingExecutionOfTransactions: 'role-in-monitoring-affecting-execution-of-transactions',
  roleInMonitoringAffectingExecutionOfTransactionsComments:
    'role-in-monitoring-affecting-execution-of-transactions-comments',
  roleInOngoingComplianceOrQualityControl: 'role-in-ongoing-compliance-or-quality-control',
  roleInOngoingComplianceOrQualityControlComments: 'role-in-ongoing-compliance-or-quality-control-comments',
  roleInDesigningFinancialInfoSystemsOrControls: 'role-in-designing-financial-info-systems-or-controls',
  roleInDesigningFinancialInfoSystemsOrControlsComments:
    'role-in-designing-financial-info-systems-or-controls-comments',
  roleInDesignOfSignificantModificationsToInfoSystems: 'role-in-design-of-significant-modifications-to-info-systems',
  roleInDesignOfSignificantModificationsToInfoSystemsComments:
    'role-in-design-of-significant-modifications-to-info-systems-comments',
  roleInDecisionMakingOrOperations: 'role-in-decision-making-or-operations',
  roleInDecisionMakingOrOperationsComments: 'role-in-decision-making-or-operations-comments',
  roleAsPromoterOfClientFinancingTransactions: 'role-as-promoter-of-client-financing-transactions',
  roleAsPromoterOfClientFinancingTransactionsComments: 'role-as-promoter-of-client-financing-transactions-comments',
  creationOfMutualInterestWithClient: 'creation-of-mutual-interest-with-client',
  creationOfMutualInterestWithClientComments: 'creation-of-mutual-interest-with-client-comments',
  engagementImpairsIndependence: 'engagement-impairs-independence',
  engagementImpairsIndependenceComments: 'engagement-impairs-independence-comments',

  // textArea events
  textAreaOnChange: 'text-area-on-change',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textBox events
  textBoxOnChange: 'text-box-on-change'
};

const fakeAicpaView = {
  formData: {
    roleInCreatingSourceDocumentsForTransactions: faker.datatype.boolean(),
    roleInCreatingSourceDocumentsForTransactionsComments: faker.random.alphaNumeric(10),
    roleInAppraisalValuation: faker.datatype.boolean(),
    roleInAppraisalValuationComments: faker.random.alphaNumeric(10),
    roleInCustodyOfClientAssets: faker.datatype.boolean(),
    roleInCustodyOfClientAssetsComments: faker.random.alphaNumeric(10),
    abilityToAuthorizeTransactionsOnBehalf: faker.datatype.boolean(),
    abilityToAuthorizeTransactionsOnBehalfComments: faker.random.alphaNumeric(10),
    roleInMonitoringAffectingExecutionOfTransactions: faker.datatype.boolean(),
    roleInMonitoringAffectingExecutionOfTransactionsComments: faker.random.alphaNumeric(10),
    roleInOngoingComplianceOrQualityControl: faker.datatype.boolean(),
    roleInOngoingComplianceOrQualityControlComments: faker.random.alphaNumeric(10),
    roleInDesigningFinancialInfoSystemsOrControls: faker.datatype.boolean(),
    roleInDesigningFinancialInfoSystemsOrControlsComments: faker.random.alphaNumeric(10),
    roleInDesignOfSignificantModificationsToInfoSystems: faker.datatype.boolean(),
    roleInDesignOfSignificantModificationsToInfoSystemsComments: faker.random.alphaNumeric(10),
    roleInDecisionMakingOrOperations: faker.datatype.boolean(),
    roleInDecisionMakingOrOperationsComments: faker.random.alphaNumeric(10),
    roleAsPromoterOfClientFinancingTransactions: faker.datatype.boolean(),
    roleAsPromoterOfClientFinancingTransactionsComments: faker.random.alphaNumeric(10),
    creationOfMutualInterestWithClient: faker.datatype.boolean(),
    creationOfMutualInterestWithClientComments: faker.random.alphaNumeric(10),
    engagementImpairsIndependence: faker.datatype.boolean(),
    engagementImpairsIndependenceComments: faker.random.alphaNumeric(10)
  }
};

const fakeNewEngagementInstance = {
  isAttest: faker.datatype.boolean(),
  isNewClient: faker.datatype.boolean()
};

const defaultProps = {};
const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <AicpaView {...props} {...hocInjectedProps} />;
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

jest.mock('../withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../newEngagementInstance/newEngagementInstanceSlice', () => {
  return {
    selectCurrentView: jest.fn(),
    selectNewEngagementInstance: jest.fn()
  };
});

jest.mock('../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ title, children }) => (
    <fake-collapsible-form-section title={title} data-testid={testIds.collapsibleFormSection}>
      {children}
    </fake-collapsible-form-section>
  )
}));

jest.mock('../../../../common/formHeader/FormHeader', () => {
  return {
    __esModule: true,
    default: ({ text }) => {
      const props = { text };
      return <fake-form-header {...props} data-testid={testIds.aicpaHeader} />;
    }
  };
});

jest.mock('../../components/formText/FormText', () => {
  return {
    __esModule: true,
    default: ({ applyEmphasis, children, name }) => {
      const props = { applyEmphasis, children, name };
      return <fake-form-text {...props} data-testid={`${testIds[name]}`} />;
    }
  };
});

jest.mock('../../components/radioButtonList/RadioButtonList', () => ({
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

jest.mock('../../components/textBox/TextBox', () => ({
  __esModule: true,
  default: ({ name, label, placeholder, onChange, value }) => {
    const props = { name, label, placeholder, value };
    return (
      <fake-text-box {...props} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.textBoxOnChange}`} onClick={onChange} />
      </fake-text-box>
    );
  }
}));

jest.mock('../../components/textArea/TextArea', () => ({
  __esModule: true,
  default: ({ name, label, placeholder, rows, onChange, value }) => {
    const props = { name, label, placeholder, rows, value };
    return (
      <fake-text-area {...props} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.textAreaOnChange}`} onClick={onChange} />
      </fake-text-area>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('AicpaView', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeAicpaView);
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

  it('passes correct title prop to CollapsibleFormSection component', () => {
    const expectedTitle = 'Independence Analysis';
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
  });

  describe('instructions form text', () => {
    it.each([
      { isNewClient: false, isAttest: false },
      { isNewClient: null, isAttest: null }
    ])('should not render when isNewClient is $isNewClient and isAttest is $isAttest', ({ isNewClient, isAttest }) => {
      newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
        fakeNewEngagementInstance: {
          ...fakeNewEngagementInstance,
          isNewClient,
          isAttest
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.instructionFormText)).not.toBeInTheDocument();
    });

    it.each([
      { isNewClient: true, isAttest: true },
      { isNewClient: true, isAttest: false },
      { isNewClient: false, isAttest: true }
    ])('should render when isNewClient is $isNewClient and isAttest is $isAttest', ({ isNewClient, isAttest }) => {
      newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
        ...fakeNewEngagementInstance,
        isNewClient,
        isAttest
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.instructionFormText)).toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isNewClient: true,
          isAttest: true
        });
      });

      it('has correct applyEmphasis prop', () => {
        const expectedApplyEmphasis = 'true';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.instructionFormText)).toHaveAttribute('applyEmphasis', expectedApplyEmphasis);
      });

      it('has correct name prop', () => {
        const expectedName = 'instructionFormText';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.instructionFormText)).toHaveAttribute('name', expectedName);
      });

      it('has correct children prop', () => {
        const expectedChildren =
          'The questions below are designed to identify any potential threats to independence that could be created by ' +
          'the proposed non attest service(s) listed above. Click on the "?" for additional guidance as to what services ' +
          'are permitted or prohibited. If multiple non attest services are being proposed, consider the impact of each ' +
          "service when answering the questions and identify the specific non attest service when describing PM's " +
          'involvement for any question answered yes. Questions below related to the following jobs:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.instructionFormText)).toHaveTextContent(expectedChildren);
      });
    });
  });

  describe('aicpa form header', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.aicpaHeader)).toBeInTheDocument();
    });

    it('renders correct text prop', () => {
      const expectedText = 'AICPA: Will the proposed project involve:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.aicpaHeader)).toHaveAttribute('text', expectedText);
    });
  });

  describe('roleInCreatingSourceDocumentsForTransactions', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.roleInCreatingSourceDocumentsForTransactions)
      ).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactions)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
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

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeAicpaView.formData.roleInCreatingSourceDocumentsForTransactions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactions)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.roleInCreatingSourceDocumentsForTransactions}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('roleInCreatingSourceDocumentsForTransactionsComments', () => {
    it.each([
      { roleInCreatingSourceDocumentsForTransactions: false },
      { roleInCreatingSourceDocumentsForTransactions: null },
      { roleInCreatingSourceDocumentsForTransactions: faker.datatype.string() }
    ])(
      'should not render when roleInCreatingSourceDocumentsForTransactions is $roleInCreatingSourceDocumentsForTransactions',
      ({ roleInCreatingSourceDocumentsForTransactions }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleInCreatingSourceDocumentsForTransactions
          }
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
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleInCreatingSourceDocumentsForTransactions: true
          }
        });
      });

      it('should render when roleInCreatingSourceDocumentsForTransactions is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactionsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInCreatingSourceDocumentsForTransactionsComments)
        ).toBeInTheDocument();
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
        const expectedLabel = 'If yes, describe PM involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactionsComments)).toHaveAttribute(
          'label',
          expectedLabel
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
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactionsComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeAicpaView.formData.roleInCreatingSourceDocumentsForTransactionsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCreatingSourceDocumentsForTransactionsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
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

  describe('roleInAppraisalValuation', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.roleInAppraisalValuation)).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInAppraisalValuation)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInAppraisalValuation';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInAppraisalValuation)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '2. Any role in appraisal valuation or otherwise determining material amounts ' +
        'for financial reporting purposes that involve a significant degree of subjectivity?';
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

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeAicpaView.formData.roleInAppraisalValuation;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInAppraisalValuation)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.roleInAppraisalValuation}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('roleInAppraisalValuationComments', () => {
    it.each([
      { roleInAppraisalValuation: false },
      { roleInAppraisalValuation: null },
      { roleInAppraisalValuation: faker.datatype.string() }
    ])(
      'should not render when roleInAppraisalValuation is $roleInAppraisalValuation',
      ({ roleInAppraisalValuation }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleInAppraisalValuation
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.roleInAppraisalValuationComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleInAppraisalValuation: true
          }
        });
      });

      it('should render when roleInAppraisalValuation is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInAppraisalValuationComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInAppraisalValuationComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInAppraisalValuationComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInAppraisalValuationComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe PM involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInAppraisalValuationComments)).toHaveAttribute('label', expectedLabel);
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
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInAppraisalValuationComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeAicpaView.formData.roleInAppraisalValuationComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInAppraisalValuationComments)).toHaveAttribute('value', expectedValue);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.roleInAppraisalValuationComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInCustodyOfClientAssets', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.roleInCustodyOfClientAssets)).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCustodyOfClientAssets)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInCustodyOfClientAssets';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCustodyOfClientAssets)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '3. Any role in custody or control of client assets?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCustodyOfClientAssets)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCustodyOfClientAssets)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeAicpaView.formData.roleInCustodyOfClientAssets;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCustodyOfClientAssets)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.roleInCustodyOfClientAssets}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('roleInCustodyOfClientAssetsComments', () => {
    it.each([
      { roleInCustodyOfClientAssets: false },
      { roleInCustodyOfClientAssets: null },
      { roleInCustodyOfClientAssets: faker.datatype.string() }
    ])(
      'should not render when roleInCustodyOfClientAssets is $roleInCustodyOfClientAssets',
      ({ roleInCustodyOfClientAssets }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleInCustodyOfClientAssets
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.roleInCustodyOfClientAssetsComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleInCustodyOfClientAssets: true
          }
        });
      });

      it('should render when roleInCustodyOfClientAssets is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOfClientAssetsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInCustodyOfClientAssetsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInCustodyOfClientAssetsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOfClientAssetsComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe PM involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOfClientAssetsComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOfClientAssetsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOfClientAssetsComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeAicpaView.formData.roleInCustodyOfClientAssetsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOfClientAssetsComments)).toHaveAttribute('value', expectedValue);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.roleInCustodyOfClientAssetsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('abilityToAuthorizeTransactionsOnBehalf', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.abilityToAuthorizeTransactionsOnBehalf)
      ).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsOnBehalf)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'abilityToAuthorizeTransactionsOnBehalf';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsOnBehalf)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '4. Any ability to authorize, approve or consummate transactions or exercise any form of authority on behalf of the client?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsOnBehalf)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsOnBehalf)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeAicpaView.formData.abilityToAuthorizeTransactionsOnBehalf;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsOnBehalf)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.abilityToAuthorizeTransactionsOnBehalf}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('abilityToAuthorizeTransactionsOnBehalfComments', () => {
    it.each([
      { abilityToAuthorizeTransactionsOnBehalf: false },
      { abilityToAuthorizeTransactionsOnBehalf: null },
      { abilityToAuthorizeTransactionsOnBehalf: faker.datatype.string() }
    ])(
      'should not render when abilityToAuthorizeTransactionsOnBehalf is $abilityToAuthorizeTransactionsOnBehalf',
      ({ abilityToAuthorizeTransactionsOnBehalf }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            abilityToAuthorizeTransactionsOnBehalf
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.abilityToAuthorizeTransactionsOnBehalfComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            abilityToAuthorizeTransactionsOnBehalf: true
          }
        });
      });

      it('should render when abilityToAuthorizeTransactionsOnBehalf is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsOnBehalfComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.abilityToAuthorizeTransactionsOnBehalfComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'abilityToAuthorizeTransactionsOnBehalfComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsOnBehalfComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe PM involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsOnBehalfComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsOnBehalfComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsOnBehalfComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeAicpaView.formData.abilityToAuthorizeTransactionsOnBehalfComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsOnBehalfComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.abilityToAuthorizeTransactionsOnBehalfComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInMonitoringAffectingExecutionOfTransactions', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.roleInMonitoringAffectingExecutionOfTransactions)
      ).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInMonitoringAffectingExecutionOfTransactions)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInMonitoringAffectingExecutionOfTransactions';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInMonitoringAffectingExecutionOfTransactions)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '5. Any role in monitoring or control activities that affect the execution of transactions or ensure that ' +
        'transactions are properly executed?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInMonitoringAffectingExecutionOfTransactions)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInMonitoringAffectingExecutionOfTransactions)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeAicpaView.formData.roleInMonitoringAffectingExecutionOfTransactions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInMonitoringAffectingExecutionOfTransactions)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.roleInMonitoringAffectingExecutionOfTransactions}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('roleInMonitoringAffectingExecutionOfTransactionsComments', () => {
    it.each([
      { roleInMonitoringAffectingExecutionOfTransactions: false },
      { roleInMonitoringAffectingExecutionOfTransactions: null },
      {
        roleInMonitoringAffectingExecutionOfTransactions: faker.datatype.string()
      }
    ])(
      'should not render when roleInMonitoringAffectingExecutionOfTransactions is $roleInMonitoringAffectingExecutionOfTransactions',
      ({ roleInMonitoringAffectingExecutionOfTransactions }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleInMonitoringAffectingExecutionOfTransactions
          }
        });
        render(getComponentToRender(defaultProps));
        expect(
          screen.queryByTestId(testIds.roleInMonitoringAffectingExecutionOfTransactionsComments)
        ).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleInMonitoringAffectingExecutionOfTransactions: true
          }
        });
      });

      it('should render when roleInMonitoringAffectingExecutionOfTransactions is true', () => {
        render(getComponentToRender(defaultProps));
        expect(
          screen.getByTestId(testIds.roleInMonitoringAffectingExecutionOfTransactionsComments)
        ).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInMonitoringAffectingExecutionOfTransactionsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInMonitoringAffectingExecutionOfTransactionsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInMonitoringAffectingExecutionOfTransactionsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe PM involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInMonitoringAffectingExecutionOfTransactionsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInMonitoringAffectingExecutionOfTransactionsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInMonitoringAffectingExecutionOfTransactionsComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeAicpaView.formData.roleInMonitoringAffectingExecutionOfTransactionsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInMonitoringAffectingExecutionOfTransactionsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(
              `${testIds.roleInMonitoringAffectingExecutionOfTransactionsComments}-${testIds.textAreaOnChange}`
            )
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInOngoingComplianceOrQualityControl', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.roleInOngoingComplianceOrQualityControl)
      ).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControl)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInOngoingComplianceOrQualityControl';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControl)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '6. Any role in connection with operating or production processes ' +
        'that would be equivalent to an ongoing compliance or quality control function?';
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

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeAicpaView.formData.roleInOngoingComplianceOrQualityControl;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControl)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.roleInOngoingComplianceOrQualityControl}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('roleInOngoingComplianceOrQualityControlComments', () => {
    it.each([
      { roleInOngoingComplianceOrQualityControl: false },
      { roleInOngoingComplianceOrQualityControl: null },
      { roleInOngoingComplianceOrQualityControl: faker.datatype.string() }
    ])(
      'should not render when roleInOngoingComplianceOrQualityControl is $roleInOngoingComplianceOrQualityControl',
      ({ roleInOngoingComplianceOrQualityControl }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleInOngoingComplianceOrQualityControl
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.roleInOngoingComplianceOrQualityControlComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleInOngoingComplianceOrQualityControl: true
          }
        });
      });

      it('should render when roleInOngoingComplianceOrQualityControl is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControlComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInOngoingComplianceOrQualityControlComments)
        ).toBeInTheDocument();
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
        const expectedLabel = 'If yes, describe PM involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControlComments)).toHaveAttribute(
          'label',
          expectedLabel
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
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControlComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeAicpaView.formData.roleInOngoingComplianceOrQualityControlComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOngoingComplianceOrQualityControlComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.roleInOngoingComplianceOrQualityControlComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInDesigningFinancialInfoSystemsOrControls', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.roleInDesigningFinancialInfoSystemsOrControls)
      ).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesigningFinancialInfoSystemsOrControls)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInDesigningFinancialInfoSystemsOrControls';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesigningFinancialInfoSystemsOrControls)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '7. Any role in designing, installing, supervising, operating, modifying, ' +
        'or monitoring any client accounting or financial functions, systems or ' +
        'processes, including financial information systems or internal controls?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesigningFinancialInfoSystemsOrControls)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesigningFinancialInfoSystemsOrControls)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeAicpaView.formData.roleInDesigningFinancialInfoSystemsOrControls;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesigningFinancialInfoSystemsOrControls)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.roleInDesigningFinancialInfoSystemsOrControls}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('roleInDesigningFinancialInfoSystemsOrControlsComments', () => {
    it.each([
      { roleInDesigningFinancialInfoSystemsOrControls: false },
      { roleInDesigningFinancialInfoSystemsOrControls: null },
      {
        roleInDesigningFinancialInfoSystemsOrControls: faker.datatype.string()
      }
    ])(
      'should not render when roleInDesigningFinancialInfoSystemsOrControls is $roleInDesigningFinancialInfoSystemsOrControls',
      ({ roleInDesigningFinancialInfoSystemsOrControls }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleInDesigningFinancialInfoSystemsOrControls
          }
        });
        render(getComponentToRender(defaultProps));
        expect(
          screen.queryByTestId(testIds.roleInDesigningFinancialInfoSystemsOrControlsComments)
        ).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleInDesigningFinancialInfoSystemsOrControls: true
          }
        });
      });

      it('should render when roleInDesigningFinancialInfoSystemsOrControls is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningFinancialInfoSystemsOrControlsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInDesigningFinancialInfoSystemsOrControlsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInDesigningFinancialInfoSystemsOrControlsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningFinancialInfoSystemsOrControlsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe PM involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningFinancialInfoSystemsOrControlsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningFinancialInfoSystemsOrControlsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningFinancialInfoSystemsOrControlsComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeAicpaView.formData.roleInDesigningFinancialInfoSystemsOrControlsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesigningFinancialInfoSystemsOrControlsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(
              `${testIds.roleInDesigningFinancialInfoSystemsOrControlsComments}-${testIds.textAreaOnChange}`
            )
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInDesignOfSignificantModificationsToInfoSystems', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.roleInDesignOfSignificantModificationsToInfoSystems)
      ).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesignOfSignificantModificationsToInfoSystems)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInDesignOfSignificantModificationsToInfoSystems';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesignOfSignificantModificationsToInfoSystems)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '8. Any role in design, development or installation other than insignificant modifications of financial ' +
        'information systems?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesignOfSignificantModificationsToInfoSystems)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesignOfSignificantModificationsToInfoSystems)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeAicpaView.formData.roleInDesignOfSignificantModificationsToInfoSystems;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesignOfSignificantModificationsToInfoSystems)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.roleInDesignOfSignificantModificationsToInfoSystems}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('roleInDesignOfSignificantModificationsToInfoSystemsComments', () => {
    it.each([
      { roleInDesignOfSignificantModificationsToInfoSystems: false },
      { roleInDesignOfSignificantModificationsToInfoSystems: null },
      {
        roleInDesignOfSignificantModificationsToInfoSystems: faker.datatype.string()
      }
    ])(
      'should not render when roleInDesignOfSignificantModificationsToInfoSystems is $roleInDesignOfSignificantModificationsToInfoSystems',
      ({ roleInDesignOfSignificantModificationsToInfoSystems }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleInDesignOfSignificantModificationsToInfoSystems
          }
        });
        render(getComponentToRender(defaultProps));
        expect(
          screen.queryByTestId(testIds.roleInDesignOfSignificantModificationsToInfoSystemsComments)
        ).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleInDesignOfSignificantModificationsToInfoSystems: true
          }
        });
      });

      it('should render when roleInDesignOfSignificantModificationsToInfoSystems is true', () => {
        render(getComponentToRender(defaultProps));
        expect(
          screen.getByTestId(testIds.roleInDesignOfSignificantModificationsToInfoSystemsComments)
        ).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(
            testIds.roleInDesignOfSignificantModificationsToInfoSystemsComments
          )
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInDesignOfSignificantModificationsToInfoSystemsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesignOfSignificantModificationsToInfoSystemsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe PM involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesignOfSignificantModificationsToInfoSystemsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesignOfSignificantModificationsToInfoSystemsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesignOfSignificantModificationsToInfoSystemsComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeAicpaView.formData.roleInDesignOfSignificantModificationsToInfoSystemsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesignOfSignificantModificationsToInfoSystemsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(
              `${testIds.roleInDesignOfSignificantModificationsToInfoSystemsComments}-${testIds.textAreaOnChange}`
            )
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInDecisionMakingOrOperations', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.roleInDecisionMakingOrOperations)).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperations)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInDecisionMakingOrOperations';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperations)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '9. Any decision-making role or participation with management in operating decisions?';
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

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeAicpaView.formData.roleInDecisionMakingOrOperations;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperations)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.roleInDecisionMakingOrOperations}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('roleInDecisionMakingOrOperationsComments', () => {
    it.each([
      { roleInDecisionMakingOrOperations: false },
      { roleInDecisionMakingOrOperations: null },
      { roleInDecisionMakingOrOperations: faker.datatype.string() }
    ])(
      'should not render when roleInDecisionMakingOrOperations is $roleInDecisionMakingOrOperations',
      ({ roleInDecisionMakingOrOperations }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleInDecisionMakingOrOperations
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.roleInDecisionMakingOrOperationsComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleInDecisionMakingOrOperations: true
          }
        });
      });

      it('should render when roleInDecisionMakingOrOperations is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperationsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInDecisionMakingOrOperationsComments)
        ).toBeInTheDocument();
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
        const expectedLabel = 'If yes, describe PM involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperationsComments)).toHaveAttribute(
          'label',
          expectedLabel
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
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperationsComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeAicpaView.formData.roleInDecisionMakingOrOperationsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDecisionMakingOrOperationsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.roleInDecisionMakingOrOperationsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleAsPromoterOfClientFinancingTransactions', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.roleAsPromoterOfClientFinancingTransactions)
      ).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactions)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
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
        '10. Any role as a promoter of client financing transactions, including bank loans, equity or debt offerings?';
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

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeAicpaView.formData.roleAsPromoterOfClientFinancingTransactions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactions)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.roleAsPromoterOfClientFinancingTransactions}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('roleAsPromoterOfClientFinancingTransactionsComments', () => {
    it.each([
      { roleAsPromoterOfClientFinancingTransactions: false },
      { roleAsPromoterOfClientFinancingTransactions: null },
      { roleAsPromoterOfClientFinancingTransactions: faker.datatype.string() }
    ])(
      'should not render when roleAsPromoterOfClientFinancingTransactions is $roleAsPromoterOfClientFinancingTransactions',
      ({ roleAsPromoterOfClientFinancingTransactions }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleAsPromoterOfClientFinancingTransactions
          }
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
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            roleAsPromoterOfClientFinancingTransactions: true
          }
        });
      });

      it('should render when roleAsPromoterOfClientFinancingTransactions is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactionsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleAsPromoterOfClientFinancingTransactionsComments)
        ).toBeInTheDocument();
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
        const expectedLabel = 'If yes, describe PM involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactionsComments)).toHaveAttribute(
          'label',
          expectedLabel
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
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactionsComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeAicpaView.formData.roleAsPromoterOfClientFinancingTransactionsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleAsPromoterOfClientFinancingTransactionsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
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

  describe('creationOfMutualInterestWithClient', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.creationOfMutualInterestWithClient)
      ).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creationOfMutualInterestWithClient)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'creationOfMutualInterestWithClient';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creationOfMutualInterestWithClient)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '11. Creation of any form of mutual interest with the client?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creationOfMutualInterestWithClient)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creationOfMutualInterestWithClient)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeAicpaView.formData.creationOfMutualInterestWithClient;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creationOfMutualInterestWithClient)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.creationOfMutualInterestWithClient}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('creationOfMutualInterestWithClientComments', () => {
    it.each([
      { creationOfMutualInterestWithClient: false },
      { creationOfMutualInterestWithClient: null },
      { creationOfMutualInterestWithClient: faker.datatype.string() }
    ])(
      'should not render when creationOfMutualInterestWithClient is $creationOfMutualInterestWithClient',
      ({ creationOfMutualInterestWithClient }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            creationOfMutualInterestWithClient
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.creationOfMutualInterestWithClientComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            creationOfMutualInterestWithClient: true
          }
        });
      });

      it('should render when creationOfMutualInterestWithClient is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestWithClientComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.creationOfMutualInterestWithClientComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'creationOfMutualInterestWithClientComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestWithClientComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe PM involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestWithClientComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestWithClientComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestWithClientComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeAicpaView.formData.creationOfMutualInterestWithClientComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestWithClientComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.creationOfMutualInterestWithClientComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('aicpaConclusion form text', () => {
    it.each([
      { creationOfMutualInterestWithClient: false },
      { creationOfMutualInterestWithClient: null },
      { creationOfMutualInterestWithClient: faker.datatype.string() }
    ])(
      'should not render when creationOfMutualInterestWithClient is $creationOfMutualInterestWithClient',
      ({ creationOfMutualInterestWithClient }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            creationOfMutualInterestWithClient
          }
        });
        render(getComponentToRender(defaultProps));
        expect(
          screen.queryByTestId(testIds.creationOfMutualInterestWithClientInstructionsFormText)
        ).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAicpaView,
          formData: {
            ...fakeAicpaView.formData,
            creationOfMutualInterestWithClient: true
          }
        });
      });

      it('should render when creationOfMutualInterestWithClient is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestWithClientInstructionsFormText)).toBeInTheDocument();
      });

      it('has correct applyEmphasis prop', () => {
        const expectedApplyEmphasis = 'true';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestWithClientInstructionsFormText)).toHaveAttribute(
          'applyEmphasis',
          expectedApplyEmphasis
        );
      });

      it('has correct name prop', () => {
        const expectedName = 'creationOfMutualInterestWithClientInstructionsFormText';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestWithClientInstructionsFormText)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('renders correct children prop', () => {
        const expectedChildren =
          'For each YES answer above, compare our involvement (as described) to the corresponding AICPA Limitations. ' +
          'Based on the nature of the non-attest services we will be providing, our conclusion is:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestWithClientInstructionsFormText)).toHaveTextContent(
          expectedChildren
        );
      });
    });
  });

  describe('engagementImpairsIndependence', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.engagementImpairsIndependence)).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementImpairsIndependence)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'engagementImpairsIndependence';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementImpairsIndependence)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'The proposed engagement(s) Will, Will Not impair our independence.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementImpairsIndependence)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = WillWillNotRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementImpairsIndependence)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeAicpaView.formData.engagementImpairsIndependence;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementImpairsIndependence)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.engagementImpairsIndependence}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('engagementImpairsIndependenceComments', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.engagementImpairsIndependenceComments)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'engagementImpairsIndependenceComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementImpairsIndependenceComments)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Basis for conclusion:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementImpairsIndependenceComments)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementImpairsIndependenceComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeAicpaView.formData.engagementImpairsIndependenceComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementImpairsIndependenceComments)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.engagementImpairsIndependenceComments}-${testIds.textBoxOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });
});
