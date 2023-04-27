import ReactDOM from 'react-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import ATTACHMENT_REFERENCE_TYPES from '../../../../../../../helpers/enums/attachmentReferenceTypes';

import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';

import EngagementInformationAttestSection from './EngagementInformationAttestSection';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form headers / form text
  instructionsFormHeader: 'instructions-form-header',
  attachmentsFormHeader: 'attachments-form-header',

  // form fields
  isNewClientSecRegistrant: 'is-newClient-sec-registrant',
  tickerSymbol: 'ticker-symbol',
  doSituationsApply: 'do-situations-apply',
  doSituationsApplyInstructionsFormText: 'do-situations-apply-instructions-form-text',
  engagementIncludesAuditOfSecFilings: 'engagement-includes-audit-of-sec-filings',
  engagementIncludesAuditOfEmployeeBenefitPlan: 'engagement-includes-audit-of-employee-benefit-plan',
  auditedFinancialStatementsIncludedIn11K: 'audited-financial-statements-included-in-11k',
  subjectToSecOrGaoRuleId: 'subject-to-sec-or-gao-rule-id',
  engagementIncludesAuditOfFinancialInstitution: 'engagement-includes-audit-of-financial-institution',
  prospectiveFinancialStatementsToBeIssued: 'prospective-financial-statements-to-be-issued',
  prospectiveFinancialStatementsToBeIssuedInstructionsFormText:
    'prospective-financial-statements-to-be-issued-instructions-form-text',
  performedPreviousTaxWork: 'performed-previous-tax-work',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textBox events
  textBoxOnChange: 'text-box-on-change',

  // attachments table
  attachmentsTable: 'attachment-table'
};

const fakeEngagementInfoView = {
  formData: {
    id: faker.datatype.number(),
    isNewClientSecRegistrant: faker.datatype.boolean(),
    tickerSymbol: faker.random.alphaNumeric(10),
    doSituationsApply: faker.datatype.boolean(),
    engagementIncludesAuditOfSecFilings: faker.datatype.boolean(),
    engagementIncludesAuditOfEmployeeBenefitPlan: faker.datatype.boolean(),
    auditedFinancialStatementsIncludedIn11K: faker.datatype.boolean(),
    subjectToSecOrGaoRuleId: faker.datatype.number(),
    engagementIncludesAuditOfFinancialInstitution: faker.datatype.boolean(),
    prospectiveFinancialStatementsToBeIssued: faker.datatype.boolean(),
    performedPreviousTaxWork: faker.datatype.boolean()
  }
};

const fakeEngagementInstance = {
  isNewClient: faker.datatype.boolean()
};

const fakeLookups = {
  subjectToSecOrGaoRules: {
    data: [],
    isLoading: true,
    hasError: false,
    error: null
  }
};

// **********************************************************************
// * functions

const defaultProps = {};
const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <EngagementInformationAttestSection {...props} {...hocInjectedProps} />;
};

// **********************************************************************
// * mock external dependencies
jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => callback()
  };
});

jest.mock('../../../../newEngagementInstanceSlice', () => {
  return {
    selectCurrentView: jest.fn(),
    selectNewEngagementInstance: jest.fn(),
    selectLookups: jest.fn()
  };
});

jest.mock('../../../withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../../../common/collapsibleFormSection/CollapsibleFormSection', () => {
  return {
    __esModule: true,
    default: ({ title, children }) => {
      const props = { title, children };
      return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
    }
  };
});

jest.mock('../../../../../../common/formHeader/FormHeader', () => {
  return {
    __esModule: true,
    default: ({ name, text }) => {
      const props = { text, name };
      return <fake-form-header {...props} data-testid={testIds[name]} />;
    }
  };
});

jest.mock('../../../../components/formText/FormText', () => {
  return {
    __esModule: true,
    default: ({ applyEmphasis, children, name }) => {
      const props = { applyEmphasis, children, name };
      return <fake-form-text {...props} data-testid={`${testIds[name]}`} />;
    }
  };
});

jest.mock('../../../../components/radioButtonList/RadioButtonList', () => ({
  __esModule: true,
  default: ({ horizontalItems, name, label, options, selectedValue, isLoading, loadingText, onChange }) => {
    const props = { horizontalItems, name, label, selectedValue, isLoading, loadingText };
    return (
      <fake-radio-button-list {...props} options={JSON.stringify(options)} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.radioButtonListOnChange}`} onClick={onChange} />
      </fake-radio-button-list>
    );
  }
}));

jest.mock('../../../../components/textBox/TextBox', () => ({
  __esModule: true,
  default: ({ name, label, placeholder, value, onChange }) => {
    const props = { name, label, placeholder, value };
    return (
      <fake-text-box {...props} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.textBoxOnChange}`} onClick={onChange} />
      </fake-text-box>
    );
  }
}));

jest.mock('../../../../components/attachmentsTable/AttachmentsTable', () => ({
  __esModule: true,
  default: ({ attachmentReferenceType, name, text }) => {
    const props = { name, text };
    return (
      <fake-attachments-table
        {...props}
        attachmentReferenceType={JSON.stringify(attachmentReferenceType)}
        data-testid={testIds.attachmentsTable}
      />
    );
  }
}));

// **********************************************************************
// * unit tests

describe('EngagementInformationAttestSection', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeEngagementInfoView);
    newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(fakeEngagementInstance);
    newEngagementInstanceSlice.selectLookups.mockReturnValue(fakeLookups);
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

  it('renders CollapsibleFormSection with correct title prop', () => {
    const expectedTitle = 'Engagement Information';
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
  });

  describe('instructions form header', () => {
    it('does not render when isNewClient false', () => {
      newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
        ...fakeEngagementInstance,
        isNewClient: false
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.instructionsFormHeader)).not.toBeInTheDocument();
    });

    describe('rendering', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeEngagementInstance,
          isNewClient: true
        });
      });

      it('renders when isNewClient  true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.instructionsFormHeader)).toBeInTheDocument();
      });

      it('render inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.instructionsFormHeader)).toBeInTheDocument();
      });

      it('has correct text prop', () => {
        const expectedText =
          'CHECKING YES REQUIRES THE ATTACHMENT OF SUPPORTING FINANCIAL STATEMENT OR INPUT OF OTHER INFORMATION';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.instructionsFormHeader)).toHaveAttribute('text', expectedText);
      });
    });
  });

  describe('isNewClientSecRegistrant', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.isNewClientSecRegistrant)).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isNewClientSecRegistrant)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'isNewClientSecRegistrant';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isNewClientSecRegistrant)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        'Is the prospective client an SEC registrant for which we will be performing attest services?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isNewClientSecRegistrant)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isNewClientSecRegistrant)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeEngagementInfoView.formData.isNewClientSecRegistrant;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isNewClientSecRegistrant)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.isNewClientSecRegistrant}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('tickerSymbol', () => {
    it('should not render when isNewClientSecRegistrant false', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeEngagementInfoView,
        formData: {
          ...fakeEngagementInfoView.formData,
          isNewClientSecRegistrant: false
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.tickerSymbol)).not.toBeInTheDocument();
    });

    describe('rendering', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeEngagementInfoView,
          formData: {
            ...fakeEngagementInfoView.formData,
            isNewClientSecRegistrant: true
          }
        });
      });

      it('renders when isNewClientSecRegistrant equals Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.tickerSymbol)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.tickerSymbol)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'tickerSymbol';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.tickerSymbol)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, Enter the ticker symbol:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.tickerSymbol)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceholder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.tickerSymbol)).toHaveAttribute('placeholder', expectedPlaceholder);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeEngagementInfoView.formData.tickerSymbol;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.tickerSymbol)).toHaveAttribute('value', expectedValue);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.tickerSymbol}-${testIds.textBoxOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
        });
      });
    });
  });

  describe('doSituationsApply', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.doSituationsApply)).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.doSituationsApply)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'doSituationsApply';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.doSituationsApply)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        "Will our engagement include the audit of the taxpayer's financial statements filed with the SEC?";
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.doSituationsApply)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.doSituationsApply)).toHaveAttribute('options', JSON.stringify(expectedOptions));
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeEngagementInfoView.formData.doSituationsApply;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.doSituationsApply)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.doSituationsApply}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('doSituationsApplyInstructionsFormText', () => {
    it('does not render when isNewClient false', () => {
      newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
        ...fakeEngagementInstance,
        isNewClient: false
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.doSituationsApplyInstructionsFormText)).not.toBeInTheDocument();
    });

    describe('rendering', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeEngagementInstance,
          isNewClient: true
        });
      });

      it('render when new client  true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.doSituationsApplyInstructionsFormText)).toBeInTheDocument();
      });

      it('renders correct applyEmphasis prop', () => {
        const expectedApplyEmphasis = true;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.doSituationsApplyInstructionsFormText)).toHaveAttribute(
          'applyEmphasis',
          expectedApplyEmphasis.toString()
        );
      });

      it('has correct name prop', () => {
        const expectedName = 'doSituationsApplyInstructionsFormText';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.doSituationsApplyInstructionsFormText)).toHaveAttribute('name', expectedName);
      });

      it('renders correct children prop', () => {
        const expectedChildren = 'Note: If this answer is yes, the SEC supplemental section must be completed.';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.doSituationsApplyInstructionsFormText)).toHaveTextContent(expectedChildren);
      });
    });
  });

  describe('engagementIncludesAuditOfSecFilings', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.engagementIncludesAuditOfSecFilings)
      ).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementIncludesAuditOfSecFilings)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'engagementIncludesAuditOfSecFilings';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementIncludesAuditOfSecFilings)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = "Will our engagement include an audit of the taxpayer's employee benefit plan?";
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementIncludesAuditOfSecFilings)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementIncludesAuditOfSecFilings)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeEngagementInfoView.formData.engagementIncludesAuditOfSecFilings;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementIncludesAuditOfSecFilings)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.engagementIncludesAuditOfSecFilings}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('engagementIncludesAuditOfEmployeeBenefitPlan', () => {
    it('does not render when engagementIncludesAuditOfSecFilings false', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeEngagementInfoView,
        formData: {
          ...fakeEngagementInfoView.formData,
          engagementIncludesAuditOfSecFilings: false
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.engagementIncludesAuditOfEmployeeBenefitPlan)).not.toBeInTheDocument();
    });

    describe('rendering', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeEngagementInfoView,
          formData: {
            ...fakeEngagementInfoView.formData,
            engagementIncludesAuditOfSecFilings: true
          }
        });
      });

      it('renders when engagementIncludesAuditOfSecFilings equals Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.engagementIncludesAuditOfEmployeeBenefitPlan)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.engagementIncludesAuditOfEmployeeBenefitPlan)
        ).toBeInTheDocument();
      });

      it('has correct horizontalItems prop', () => {
        const expectedHorizontalItems = true;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.engagementIncludesAuditOfEmployeeBenefitPlan)).toHaveAttribute(
          'horizontalItems',
          expectedHorizontalItems.toString()
        );
      });

      it('has correct name prop', () => {
        const expectedName = 'engagementIncludesAuditOfEmployeeBenefitPlan';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.engagementIncludesAuditOfEmployeeBenefitPlan)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel =
          'Will those audited plan financial statements be included in a Form 11-K filing with the SEC?';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.engagementIncludesAuditOfEmployeeBenefitPlan)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct options prop', () => {
        const expectedOptions = YesNoRadioButtonListOptions;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.engagementIncludesAuditOfEmployeeBenefitPlan)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('has correct selectedValue prop', () => {
        const expectedSelectedValue = fakeEngagementInfoView.formData.engagementIncludesAuditOfEmployeeBenefitPlan;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.engagementIncludesAuditOfEmployeeBenefitPlan)).toHaveAttribute(
          'selectedValue',
          expectedSelectedValue.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(
              `${testIds.engagementIncludesAuditOfEmployeeBenefitPlan}-${testIds.radioButtonListOnChange}`
            )
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
        });
      });
    });
  });

  describe('auditedFinancialStatementsIncludedIn11K', () => {
    it('does not render when new client  true', () => {
      newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
        ...fakeEngagementInstance,
        isNewClient: true
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.auditedFinancialStatementsIncludedIn11K)).not.toBeInTheDocument();
    });

    describe('rendering', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeEngagementInstance,
          isNewClient: false
        });
      });

      it('renders when existing client  true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditedFinancialStatementsIncludedIn11K)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.auditedFinancialStatementsIncludedIn11K)
        ).toBeInTheDocument();
      });

      it('has correct horizontalItems prop', () => {
        const expectedHorizontalItems = true;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditedFinancialStatementsIncludedIn11K)).toHaveAttribute(
          'horizontalItems',
          expectedHorizontalItems.toString()
        );
      });

      it('has correct name prop', () => {
        const expectedName = 'auditedFinancialStatementsIncludedIn11K';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditedFinancialStatementsIncludedIn11K)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = (
          <div>
            Do any of these situations apply?
            <br />
            <ul type="none">
              <li>- A previous client returning to the firm</li>
              <li>
                - An upgrade to a higher Attest service (e.g. Review to Audit, EBPA only to Audit of Sponsor, etc.)
              </li>
              <li>- Performing first time Attest services for an existing NonAttest client</li>
              <li>- Engagement to compile or examine a forecast or projection</li>
            </ul>
          </div>
        ).toString();
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditedFinancialStatementsIncludedIn11K)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct options prop', () => {
        const expectedOptions = YesNoRadioButtonListOptions;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditedFinancialStatementsIncludedIn11K)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('has correct selectedValue prop', () => {
        const expectedSelectedValue = fakeEngagementInfoView.formData.auditedFinancialStatementsIncludedIn11K;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.auditedFinancialStatementsIncludedIn11K)).toHaveAttribute(
          'selectedValue',
          expectedSelectedValue.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.auditedFinancialStatementsIncludedIn11K}-${testIds.radioButtonListOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
        });
      });
    });
  });

  describe('subjectToSecOrGaoRuleId', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.subjectToSecOrGaoRuleId)).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.subjectToSecOrGaoRuleId)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'subjectToSecOrGaoRuleId';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.subjectToSecOrGaoRuleId)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Will this client be subject to SEC, GAO or other independence rules?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.subjectToSecOrGaoRuleId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop when subjectToSecOrGaoRules.data is empty', () => {
      // * ARRANGE
      const expectedOptions = [];
      newEngagementInstanceSlice.selectLookups.mockReturnValue({
        ...fakeLookups,
        subjectToSecOrGaoRules: {
          ...fakeLookups.subjectToSecOrGaoRules,
          data: []
        }
      });

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.subjectToSecOrGaoRuleId)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct options prop when subjectToSecOrGaoRules.data is not empty', () => {
      // * ARRANGE
      const itemCount = faker.datatype.number({ min: 1, max: 20 });
      const subjectToSecOrGaoRules = [...Array(itemCount).keys()].map(() => ({
        displayName: faker.random.alphaNumeric(10),
        id: faker.datatype.number()
      }));
      const expectedOptions = subjectToSecOrGaoRules.map((rule) => ({
        value: rule.id,
        label: rule.displayName
      }));
      newEngagementInstanceSlice.selectLookups.mockReturnValue({
        ...fakeLookups,
        subjectToSecOrGaoRules: {
          ...fakeLookups.subjectToSecOrGaoRules,
          data: subjectToSecOrGaoRules
        }
      });

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.subjectToSecOrGaoRuleId)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      // * ARRANGE
      const subjectToSecOrGaoRuleId = faker.datatype.number();
      const EngagementInfoView = {
        ...fakeEngagementInfoView,
        formData: { ...fakeEngagementInfoView.formData, subjectToSecOrGaoRuleId }
      };
      const expectedSelectedValue = subjectToSecOrGaoRuleId;
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue(EngagementInfoView);

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.subjectToSecOrGaoRuleId)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('has correct isLoading prop', () => {
      const expectedIsLoading = faker.datatype.boolean();
      newEngagementInstanceSlice.selectLookups.mockReturnValue({
        ...fakeLookups,
        subjectToSecOrGaoRules: { ...fakeLookups.subjectToSecOrGaoRules, isLoading: expectedIsLoading }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.subjectToSecOrGaoRuleId)).toHaveAttribute(
        'isLoading',
        expectedIsLoading.toString()
      );
    });

    it('has correct loadingText prop', () => {
      const expectedLoadingText = 'Loading options...';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.subjectToSecOrGaoRuleId)).toHaveAttribute('loadingText', expectedLoadingText);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.subjectToSecOrGaoRuleId}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('engagementIncludesAuditOfFinancialInstitution', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.engagementIncludesAuditOfFinancialInstitution)
      ).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementIncludesAuditOfFinancialInstitution)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'engagementIncludesAuditOfFinancialInstitution';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementIncludesAuditOfFinancialInstitution)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        'Does the engagement include an audit of a financial institution? If yes, the financial services supplemental information must be completed.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementIncludesAuditOfFinancialInstitution)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementIncludesAuditOfFinancialInstitution)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeEngagementInfoView.formData.engagementIncludesAuditOfFinancialInstitution;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementIncludesAuditOfFinancialInstitution)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.engagementIncludesAuditOfFinancialInstitution}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('prospectiveFinancialStatementsToBeIssued', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.prospectiveFinancialStatementsToBeIssued)
      ).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.prospectiveFinancialStatementsToBeIssued)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'prospectiveFinancialStatementsToBeIssued';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.prospectiveFinancialStatementsToBeIssued)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Are Prospective Financial Statements (forecasts or projections) to be issued?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.prospectiveFinancialStatementsToBeIssued)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.prospectiveFinancialStatementsToBeIssued)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeEngagementInfoView.formData.prospectiveFinancialStatementsToBeIssued;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.prospectiveFinancialStatementsToBeIssued)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.prospectiveFinancialStatementsToBeIssued}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('prospectiveFinancialStatementsToBeIssuedInstructionsFormText', () => {
    it('does not render when prospectiveFinancialStatementsToBeIssued false', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeEngagementInfoView,
        formData: {
          ...fakeEngagementInfoView.formData,
          prospectiveFinancialStatementsToBeIssued: false
        }
      });
      render(getComponentToRender(defaultProps));
      expect(
        screen.queryByTestId(testIds.prospectiveFinancialStatementsToBeIssuedInstructionsFormText)
      ).not.toBeInTheDocument();
    });

    describe('rendering', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeEngagementInfoView,
          formData: {
            ...fakeEngagementInfoView.formData,
            prospectiveFinancialStatementsToBeIssued: true
          }
        });
      });

      it('renders when prospectiveFinancialStatementsToBeIssued equals Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(
          screen.getByTestId(testIds.prospectiveFinancialStatementsToBeIssuedInstructionsFormText)
        ).toBeInTheDocument();
      });

      it('renders correct applyEmphasis prop', () => {
        const expectedApplyEmphasis = true;
        render(getComponentToRender(defaultProps));
        expect(
          screen.getByTestId(testIds.prospectiveFinancialStatementsToBeIssuedInstructionsFormText)
        ).toHaveAttribute('applyEmphasis', expectedApplyEmphasis.toString());
      });

      it('has correct name prop', () => {
        const expectedName = 'prospectiveFinancialStatementsToBeIssuedInstructionsFormText';
        render(getComponentToRender(defaultProps));
        expect(
          screen.getByTestId(testIds.prospectiveFinancialStatementsToBeIssuedInstructionsFormText)
        ).toHaveAttribute('name', expectedName);
      });

      it('renders correct children prop', () => {
        const expectedChildren =
          'If yes, the prospective financial statements supplemental information must be completed.';
        render(getComponentToRender(defaultProps));
        expect(
          screen.getByTestId(testIds.prospectiveFinancialStatementsToBeIssuedInstructionsFormText)
        ).toHaveTextContent(expectedChildren);
      });
    });
  });

  describe('performedPreviousTaxWork', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.performedPreviousTaxWork)).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.performedPreviousTaxWork)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'performedPreviousTaxWork';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.performedPreviousTaxWork)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Have we prepared the federal tax return for this client in the last year?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.performedPreviousTaxWork)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.performedPreviousTaxWork)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeEngagementInfoView.formData.performedPreviousTaxWork;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.performedPreviousTaxWork)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.performedPreviousTaxWork}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
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
      const expectedAttachmentReferenceType = JSON.stringify(ATTACHMENT_REFERENCE_TYPES.attestEngagementInformation);
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.attachmentsTable)).toHaveAttribute(
        'attachmentReferenceType',
        expectedAttachmentReferenceType
      );
    });
  });
});
