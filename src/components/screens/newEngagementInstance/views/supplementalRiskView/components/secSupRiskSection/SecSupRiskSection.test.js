import ReactDOM from 'react-dom';
import { render, screen, fireEvent, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import * as newEngagementInstanceThunks from '../../../../newEngagementInstanceThunks';

import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import SecSupRiskSection from './SecSupRiskSection';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form headers / form text
  formHeader: 'form-header',
  formText: 'form-text',

  // form fields
  secAttachmentsMayImpactAcceptance: 'sec-attachments-may-impact-acceptance',
  secMarketCapitalization: 'sec-market-capitalization',
  secMarketPrices: 'sec-market-prices',
  secInsidersPercentage: 'sec-insiders-percentage',
  secLastYearsAuditFees: 'sec-last-years-audit-fees',
  secLastYearsOtherServicesFees: 'sec-last-years-other-services-fees',
  secEvaluationOfDiscussionNotesAboutOfficers: 'sec-evaluation-of-discussion-notes-about-officers',
  secAssuranceEngagementPartnerStaffNumber: 'sec-assurance-engagement-partner-staff-number',
  secEvaluationOfAssuranceEngagementPartnerPublicCompanyAuditExperience:
    'sec-evaluation-of-assurance-engagement-partner-public-company-audit-experience',
  secEvaluationOfAssuranceEngagementPartnerExpertiseInClientIndustry:
    'sec-evaluation-of-assurance-engagement-partner-expertise-in-client-industry',
  secAssuranceManagerStaffNumber: 'sec-assurance-manager-staff-number',
  secEvaluationOfAssuranceManagerPublicCompanyAuditExperience:
    'sec-evaluation-of-assurance-manager-public-company-audit-experience',
  secEvaluationOfAssuranceManagerExpertiseInClientIndustry:
    'sec-evaluation-of-assurance-manager-expertise-in-client-industry',
  secEvaluationOfLegalCounselsFirm: 'sec-evaluation-of-legal-counsels-firm',
  secEvaluationOfLegalCounselsPrimaryAttorney: 'sec-evaluation-of-legal-counsels-primary-attorney',
  secEvaluationOfCounselsExperience: 'sec-evaluation-of-counsels-experience',
  secEvaluationOfNatureOfCapitalRaise: 'sec-evaluation-of-nature-of-capital-raise',
  secEvaluationOfQualityAssessment: 'sec-evaluation-of-quality-assessment',
  secEvaluationOfClientsReputation: 'sec-evaluation-of-clients-reputation',
  secQuestionAboutAbilityToProvideService: 'sec-question-about-ability-to-provide-service',
  secQuestionAboutAbilityToProvideServiceComments: 'sec-question-about-ability-to-provide-service-comments',
  secUnderstandingOfSecIssuesComments: 'sec-understanding-of-sec-issues-comments',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change',

  // textBox events
  textBoxOnChange: 'text-box-on-change',

  // selectBox events
  selectBoxOnChange: 'select-box-on-change',

  // auto-complete events
  autoCompleteOnClearData: 'auto-complete-on-clear-data',
  autoCompleteOnResetItem: 'auto-complete-on-reset-item',
  autoCompleteOnSearch: 'auto-complete-on-search',
  autoCompleteOnSelect: 'auto-complete-on-select'
};

const fakeSupplementalRiskView = {
  formData: {
    secAttachmentsMayImpactAcceptance: faker.datatype.boolean(),
    secMarketCapitalization: faker.random.alphaNumeric(10),
    secMarketPrices: faker.random.alphaNumeric(10),
    secInsidersPercentage: faker.random.alphaNumeric(10),
    secLastYearsAuditFees: faker.random.alphaNumeric(10),
    secLastYearsOtherServicesFees: faker.random.alphaNumeric(10),
    secEvaluationOfDiscussionNotesAboutOfficers: faker.random.alphaNumeric(10),
    secAssuranceEngagementPartnerStaffNumber: faker.datatype.number(),
    secEvaluationOfAssuranceEngagementPartnerPublicCompanyAuditExperience: faker.random.alphaNumeric(10),
    secEvaluationOfAssuranceEngagementPartnerExpertiseInClientIndustry: faker.random.alphaNumeric(10),
    secAssuranceManagerStaffNumber: faker.datatype.number(),
    secEvaluationOfAssuranceManagerPublicCompanyAuditExperience: faker.random.alphaNumeric(10),
    secEvaluationOfAssuranceManagerExpertiseInClientIndustry: faker.random.alphaNumeric(10),
    secEvaluationOfLegalCounselsFirm: faker.random.alphaNumeric(10),
    secEvaluationOfLegalCounselsPrimaryAttorney: faker.random.alphaNumeric(10),
    secEvaluationOfCounselsExperience: faker.random.alphaNumeric(10),
    secEvaluationOfNatureOfCapitalRaise: faker.random.alphaNumeric(10),
    secEvaluationOfQualityAssessment: faker.random.alphaNumeric(10),
    secEvaluationOfClientsReputation: faker.random.alphaNumeric(10),
    secQuestionAboutAbilityToProvideService: faker.datatype.boolean(),
    secQuestionAboutAbilityToProvideServiceComments: faker.random.alphaNumeric(10),
    secUnderstandingOfSecIssuesComments: faker.random.alphaNumeric(10)
  },
  lookups: {
    secAssuranceEngagementPartners: {
      data: [],
      isLoading: false,
      hasError: false,
      error: null
    },
    secAssuranceManagers: {
      data: [],
      isLoading: false,
      hasError: false,
      error: null
    }
  }
};

const defaultProps = { id: faker.random.alphaNumeric(10), title: faker.random.alphaNumeric(10) };

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn(),
  handleAutoCompleteDataCleared: jest.fn(),
  handleAutoCompleteItemReset: jest.fn(),
  handleAutoCompleteItemSelected: jest.fn(),
  handleAutoCompleteSearch: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <SecSupRiskSection {...props} {...hocInjectedProps} />;
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
    selectCurrentView: jest.fn()
  };
});

jest.mock('../../../../newEngagementInstanceThunks', () => {
  return {
    tempThunk: jest.fn()
  };
});

jest.mock('../../../../views/withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../../../common/collapsibleFormSection/CollapsibleFormSection', () => {
  return {
    __esModule: true,
    default: ({ id, title, children }) => {
      const props = { id, title, children };
      return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
    }
  };
});

jest.mock('../../../../../../common/formHeader/FormHeader', () => {
  return {
    __esModule: true,
    default: ({ text }) => {
      const props = { text };
      return <fake-form-header {...props} data-testid={testIds.formHeader} />;
    }
  };
});

jest.mock('../../../../components/formText/FormText', () => {
  return {
    __esModule: true,
    default: ({ children, applyEmphasis, isLabel }) => {
      const props = { children, applyEmphasis, isLabel };
      return <fake-form-text {...props} data-testid={testIds.formText} />;
    }
  };
});

jest.mock('../../../../components/radioButtonList/RadioButtonList', () => ({
  __esModule: true,
  default: ({ horizontalItems, name, label, options, selectedValue, onChange }) => {
    const props = { horizontalItems, name, label, selectedValue };
    return (
      <fake-radio-button-list {...props} options={JSON.stringify(options)} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.radioButtonListOnChange}`} onClick={onChange} />
      </fake-radio-button-list>
    );
  }
}));

jest.mock('../../../../components/textArea/TextArea', () => ({
  __esModule: true,
  default: ({ name, label, placeholder, rows, value, onChange }) => {
    const props = { name, label, placeholder, rows, value };
    return (
      <fake-text-area {...props} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.textAreaOnChange}`} onClick={onChange} />
      </fake-text-area>
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

jest.mock('../../../../components/selectBox/SelectBox', () => ({
  __esModule: true,
  default: ({ name, label, defaultOption, options, isLoading, loadingText, value, onChange }) => {
    const props = { name, label, defaultOption, isLoading, loadingText, value };
    return (
      <fake-select-box {...props} options={JSON.stringify(options)} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.selectBoxOnChange}`} onClick={onChange} />
      </fake-select-box>
    );
  }
}));

jest.mock('../../../../components/autoComplete/AutoComplete', () => ({
  __esModule: true,
  default: ({ name, label, placeholder, selectedItem, matches, onClearData, onResetItem, onSearch, onSelect }) => {
    const props = { name, label, placeholder };

    // these are needed as they are passed to onSearch
    const sourcePropertyNames = 'source-property-names';
    const event = 'event';

    return (
      <fake-auto-complete
        {...props}
        selectedItem={JSON.stringify(selectedItem)}
        matches={JSON.stringify(matches)}
        sourcePropertyNames={JSON.stringify(sourcePropertyNames)}
        data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.autoCompleteOnClearData}`} onClick={() => onClearData()} />
        <button data-testid={`${testIds[name]}-${testIds.autoCompleteOnResetItem}`} onClick={() => onResetItem()} />
        <button
          data-testid={`${testIds[name]}-${testIds.autoCompleteOnSearch}`}
          onClick={() => onSearch(event, sourcePropertyNames)}
        />
        <button data-testid={`${testIds[name]}-${testIds.autoCompleteOnSelect}`} onClick={() => onSelect()} />
      </fake-auto-complete>
    );
  }
}));

// **********************************************************************
// * unit test

describe('SecSupplementalRiskSection', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    jest.spyOn(newEngagementInstanceSlice, 'selectCurrentView');
  });

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeSupplementalRiskView);
  });

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

  describe('secAttestRisk form text', () => {
    it('has correct text', () => {
      const expectedText = 'SEC Attest Risk';
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[0]).toHaveTextContent(expectedText);
    });

    it('has correct isLabel prop', () => {
      const expectedIsLabel = true;
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[0]).toHaveAttribute('isLabel', expectedIsLabel.toString());
    });
  });

  describe('secAttachmentsMayImpactAcceptance', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.secAttachmentsMayImpactAcceptance)).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secAttachmentsMayImpactAcceptance)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'secAttachmentsMayImpactAcceptance';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secAttachmentsMayImpactAcceptance)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '1. Do the items attached on the engagement risk tab as financial statements include the 10-K, ' +
        '10-Q, and proxy statement, as well as any recent 8-K issued that may impact our acceptance ' +
        'decision? Note: You will not be able to proceed in the workflow until all applicable reports ' +
        'have been attached.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secAttachmentsMayImpactAcceptance)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secAttachmentsMayImpactAcceptance)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSupplementalRiskView.formData.secAttachmentsMayImpactAcceptance;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secAttachmentsMayImpactAcceptance)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.secAttachmentsMayImpactAcceptance}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('informationFromYahooFinance form text', () => {
    it('has correct text', () => {
      const expectedText =
        '2. Based on the most recent information contained in the filings referenced above or information ' +
        'available from Yahoo Finance, please complete the following:';
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[1]).toHaveTextContent(expectedText);
    });

    it('renders correct isLabel prop', () => {
      const expectedIsLabel = true;
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[1]).toHaveAttribute('isLabel', expectedIsLabel.toString());
    });
  });

  describe('secMarketCapitalization', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.secMarketCapitalization)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secMarketCapitalization';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secMarketCapitalization)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Market capitalization:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secMarketCapitalization)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a numeric value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secMarketCapitalization)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.secMarketCapitalization;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secMarketCapitalization)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.secMarketCapitalization}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('secMarketPrices', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.secMarketPrices)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secMarketPrices';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secMarketPrices)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Market prices, last 4 quarters:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secMarketPrices)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a numeric value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secMarketPrices)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.secMarketPrices;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secMarketPrices)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.secMarketPrices}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('secInsidersPercentage', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.secInsidersPercentage)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secInsidersPercentage';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secInsidersPercentage)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Insiders percentage of ownership:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secInsidersPercentage)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a numeric value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secInsidersPercentage)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.secInsidersPercentage;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secInsidersPercentage)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.secInsidersPercentage}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('audit form text', () => {
    it('has correct text', () => {
      const expectedText = "Last year's fees";
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[2]).toHaveTextContent(expectedText);
    });

    it('has correct isLabel prop', () => {
      const expectedIsLabel = true;
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[2]).toHaveAttribute('isLabel', expectedIsLabel.toString());
    });
  });

  describe('secLastYearsAuditFees', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.secLastYearsAuditFees)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secLastYearsAuditFees';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secLastYearsAuditFees)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Audit:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secLastYearsAuditFees)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a numeric value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secLastYearsAuditFees)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.secLastYearsAuditFees;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secLastYearsAuditFees)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.secLastYearsAuditFees}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('secLastYearsOtherServicesFees', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.secLastYearsOtherServicesFees)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secLastYearsOtherServicesFees';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secLastYearsOtherServicesFees)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Other services:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secLastYearsOtherServicesFees)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a numeric value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secLastYearsOtherServicesFees)).toHaveAttribute(
        'placeholder',
        expectedPlaceholder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.secLastYearsOtherServicesFees;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secLastYearsOtherServicesFees)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.secLastYearsOtherServicesFees}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('secEvaluationOfDiscussionNotesAboutOfficers', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.secEvaluationOfDiscussionNotesAboutOfficers)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secEvaluationOfDiscussionNotesAboutOfficers';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfDiscussionNotesAboutOfficers)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '3. If the officers are not well known by the by the attorneys, underwriters, or Company personnel, ' +
        'consult with SEC Services Group Leader regarding potential additional means of inquiring. Note results ' +
        'of discussion:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfDiscussionNotesAboutOfficers)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfDiscussionNotesAboutOfficers)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfDiscussionNotesAboutOfficers)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.secEvaluationOfDiscussionNotesAboutOfficers;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfDiscussionNotesAboutOfficers)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.secEvaluationOfDiscussionNotesAboutOfficers}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('secAssuranceEngagementPartnerStaffNumber', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.secAssuranceEngagementPartnerStaffNumber)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secAssuranceEngagementPartnerStaffNumber';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secAssuranceEngagementPartnerStaffNumber)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = '4. Assurance Engagement Partner:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secAssuranceEngagementPartnerStaffNumber)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secAssuranceEngagementPartnerStaffNumber)).toHaveAttribute(
        'placeholder',
        expectedPlaceholder
      );
    });

    it('has correct selectedItem prop', () => {
      const expectedPartnerStaffNumber = fakeSupplementalRiskView.formData.secAssuranceEngagementPartnerStaffNumber;
      render(getComponentToRender(defaultProps));
      expect(fakeSupplementalRiskView.formData.secAssuranceEngagementPartnerStaffNumber).toBe(
        expectedPartnerStaffNumber
      );
    });

    it('has correct matches prop', () => {
      const expectedMatches = { data: [], isLoading: false, hasError: false, error: null };
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secAssuranceEngagementPartnerStaffNumber)).toHaveAttribute(
        'matches',
        JSON.stringify(expectedMatches)
      );
    });

    describe('functional', () => {
      it('invokes handleAutoCompleteItemSelected when the onSelect event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.secAssuranceEngagementPartnerStaffNumber}-${testIds.autoCompleteOnSelect}`)
        );
        expect(hocInjectedProps.handleAutoCompleteItemSelected).toHaveBeenCalledTimes(1);
      });

      it('invokes handleAutoCompleteItemSelected when the onClearData event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.secAssuranceEngagementPartnerStaffNumber}-${testIds.autoCompleteOnClearData}`)
        );
        expect(hocInjectedProps.handleAutoCompleteDataCleared).toHaveBeenCalledTimes(1);
      });

      it('invokes handleAutoCompleteItemSelected when the onResetItem event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.secAssuranceEngagementPartnerStaffNumber}-${testIds.autoCompleteOnResetItem}`)
        );
        expect(hocInjectedProps.handleAutoCompleteItemReset).toHaveBeenCalledTimes(1);
      });

      it('invokes handleAutoCompleteItemSelected when the onSearch event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.secAssuranceEngagementPartnerStaffNumber}-${testIds.autoCompleteOnSearch}`)
        );
        expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalledTimes(1);
        expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalledWith(
          'event',
          'source-property-names',
          newEngagementInstanceThunks.tempThunk
        );
      });
    });
  });

  describe('secEvaluationOfAssuranceEngagementPartnerPublicCompanyAuditExperience', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(
          testIds.secEvaluationOfAssuranceEngagementPartnerPublicCompanyAuditExperience
        )
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secEvaluationOfAssuranceEngagementPartnerPublicCompanyAuditExperience';
      render(getComponentToRender(defaultProps));
      expect(
        screen.getByTestId(testIds.secEvaluationOfAssuranceEngagementPartnerPublicCompanyAuditExperience)
      ).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '1. Public Company Audit experience';
      render(getComponentToRender(defaultProps));
      expect(
        screen.getByTestId(testIds.secEvaluationOfAssuranceEngagementPartnerPublicCompanyAuditExperience)
      ).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(
        screen.getByTestId(testIds.secEvaluationOfAssuranceEngagementPartnerPublicCompanyAuditExperience)
      ).toHaveAttribute('placeholder', expectedPlaceHolder);
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(
        screen.getByTestId(testIds.secEvaluationOfAssuranceEngagementPartnerPublicCompanyAuditExperience)
      ).toHaveAttribute('rows', expectedRows.toString());
    });

    it('has correct value prop', () => {
      const expectedValue =
        fakeSupplementalRiskView.formData.secEvaluationOfAssuranceEngagementPartnerPublicCompanyAuditExperience;
      render(getComponentToRender(defaultProps));
      expect(
        screen.getByTestId(testIds.secEvaluationOfAssuranceEngagementPartnerPublicCompanyAuditExperience)
      ).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.secEvaluationOfAssuranceEngagementPartnerPublicCompanyAuditExperience}-${testIds.textAreaOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('secEvaluationOfAssuranceEngagementPartnerExpertiseInClientIndustry', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(
          testIds.secEvaluationOfAssuranceEngagementPartnerExpertiseInClientIndustry
        )
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secEvaluationOfAssuranceEngagementPartnerExpertiseInClientIndustry';
      render(getComponentToRender(defaultProps));
      expect(
        screen.getByTestId(testIds.secEvaluationOfAssuranceEngagementPartnerExpertiseInClientIndustry)
      ).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '2. Expertise in client industry';
      render(getComponentToRender(defaultProps));
      expect(
        screen.getByTestId(testIds.secEvaluationOfAssuranceEngagementPartnerExpertiseInClientIndustry)
      ).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(
        screen.getByTestId(testIds.secEvaluationOfAssuranceEngagementPartnerExpertiseInClientIndustry)
      ).toHaveAttribute('placeholder', expectedPlaceHolder);
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(
        screen.getByTestId(testIds.secEvaluationOfAssuranceEngagementPartnerExpertiseInClientIndustry)
      ).toHaveAttribute('rows', expectedRows.toString());
    });

    it('has correct value prop', () => {
      const expectedValue =
        fakeSupplementalRiskView.formData.secEvaluationOfAssuranceEngagementPartnerExpertiseInClientIndustry;
      render(getComponentToRender(defaultProps));
      expect(
        screen.getByTestId(testIds.secEvaluationOfAssuranceEngagementPartnerExpertiseInClientIndustry)
      ).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.secEvaluationOfAssuranceEngagementPartnerExpertiseInClientIndustry}-${testIds.textAreaOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('secAssuranceManagerStaffNumber', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.secAssuranceManagerStaffNumber)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secAssuranceManagerStaffNumber';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secAssuranceManagerStaffNumber)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Choose Assurance Manager:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secAssuranceManagerStaffNumber)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secAssuranceManagerStaffNumber)).toHaveAttribute(
        'placeholder',
        expectedPlaceholder
      );
    });

    it('has correct selectedItem prop', () => {
      const expectedPartnerStaffNumber = fakeSupplementalRiskView.formData.secAssuranceManagerStaffNumber;
      render(getComponentToRender(defaultProps));
      expect(fakeSupplementalRiskView.formData.secAssuranceManagerStaffNumber).toBe(expectedPartnerStaffNumber);
    });

    it('has correct matches prop', () => {
      const expectedMatches = { data: [], isLoading: false, hasError: false, error: null };
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secAssuranceManagerStaffNumber)).toHaveAttribute(
        'matches',
        JSON.stringify(expectedMatches)
      );
    });

    describe('functional', () => {
      it('invokes handleAutoCompleteItemSelected when the onSelect event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.secAssuranceManagerStaffNumber}-${testIds.autoCompleteOnSelect}`)
        );
        expect(hocInjectedProps.handleAutoCompleteItemSelected).toHaveBeenCalledTimes(1);
      });

      it('invokes handleAutoCompleteItemSelected when the onClearData event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.secAssuranceManagerStaffNumber}-${testIds.autoCompleteOnClearData}`)
        );
        expect(hocInjectedProps.handleAutoCompleteDataCleared).toHaveBeenCalledTimes(1);
      });

      it('invokes handleAutoCompleteItemSelected when the onResetItem event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.secAssuranceManagerStaffNumber}-${testIds.autoCompleteOnResetItem}`)
        );
        expect(hocInjectedProps.handleAutoCompleteItemReset).toHaveBeenCalledTimes(1);
      });

      it('invokes handleAutoCompleteItemSelected when the onSearch event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.secAssuranceManagerStaffNumber}-${testIds.autoCompleteOnSearch}`)
        );
        expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalledTimes(1);
        expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalledWith(
          'event',
          'source-property-names',
          newEngagementInstanceThunks.tempThunk
        );
      });
    });
  });

  describe('secEvaluationOfAssuranceManagerPublicCompanyAuditExperience', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.secEvaluationOfAssuranceManagerPublicCompanyAuditExperience)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secEvaluationOfAssuranceManagerPublicCompanyAuditExperience';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfAssuranceManagerPublicCompanyAuditExperience)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = '1. Public Company Audit experience';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfAssuranceManagerPublicCompanyAuditExperience)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfAssuranceManagerPublicCompanyAuditExperience)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfAssuranceManagerPublicCompanyAuditExperience)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue =
        fakeSupplementalRiskView.formData.secEvaluationOfAssuranceManagerPublicCompanyAuditExperience;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfAssuranceManagerPublicCompanyAuditExperience)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.secEvaluationOfAssuranceManagerPublicCompanyAuditExperience}-${testIds.textAreaOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('secEvaluationOfAssuranceManagerExpertiseInClientIndustry', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.secEvaluationOfAssuranceManagerExpertiseInClientIndustry)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secEvaluationOfAssuranceManagerExpertiseInClientIndustry';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfAssuranceManagerExpertiseInClientIndustry)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = '2. Expertise in client industry';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfAssuranceManagerExpertiseInClientIndustry)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfAssuranceManagerExpertiseInClientIndustry)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfAssuranceManagerExpertiseInClientIndustry)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.secEvaluationOfAssuranceManagerExpertiseInClientIndustry;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfAssuranceManagerExpertiseInClientIndustry)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.secEvaluationOfAssuranceManagerExpertiseInClientIndustry}-${testIds.textAreaOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('beforeFinalApproval form text', () => {
    it('has correct text', () => {
      const expectedText =
        'Note: The following answers are required before leaving the Final Relationship Partner Approval step.';
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[3]).toHaveTextContent(expectedText);
    });

    it('has correct applyEmphasis prop', () => {
      const expectedApplyEmphasis = true;
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[3]).toHaveAttribute('applyEmphasis', expectedApplyEmphasis.toString());
    });
  });

  describe('secLegalCounsel form text', () => {
    it('has correct text', () => {
      const expectedText = '5. Identify SEC legal counsel:';
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[4]).toHaveTextContent(expectedText);
    });

    it('has correct isLabel prop', () => {
      const expectedIsLabel = true;
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[4]).toHaveAttribute('isLabel', expectedIsLabel.toString());
    });
  });

  describe('secEvaluationOfLegalCounselsFirm', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.secEvaluationOfLegalCounselsFirm)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secEvaluationOfLegalCounselsFirm';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfLegalCounselsFirm)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'a. Firm:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfLegalCounselsFirm)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfLegalCounselsFirm)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfLegalCounselsFirm)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.secEvaluationOfLegalCounselsFirm;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfLegalCounselsFirm)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.secEvaluationOfLegalCounselsFirm}-${testIds.textAreaOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('secEvaluationOfLegalCounselsPrimaryAttorney', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.secEvaluationOfLegalCounselsPrimaryAttorney)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secEvaluationOfLegalCounselsPrimaryAttorney';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfLegalCounselsPrimaryAttorney)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'b. Primary Attorney:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfLegalCounselsPrimaryAttorney)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfLegalCounselsPrimaryAttorney)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfLegalCounselsPrimaryAttorney)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.secEvaluationOfLegalCounselsPrimaryAttorney;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfLegalCounselsPrimaryAttorney)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.secEvaluationOfLegalCounselsPrimaryAttorney}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('secEvaluationOfCounselsExperience', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.secEvaluationOfCounselsExperience)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secEvaluationOfCounselsExperience';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfCounselsExperience)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        'c. If SEC counsel is unfamiliar to us, ascertain and describe counsel’s SEC experience and expertise:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfCounselsExperience)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfCounselsExperience)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfCounselsExperience)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.secEvaluationOfCounselsExperience;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfCounselsExperience)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.secEvaluationOfCounselsExperience}-${testIds.textAreaOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('secEvaluationOfNatureOfCapitalRaise', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.secEvaluationOfNatureOfCapitalRaise)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secEvaluationOfNatureOfCapitalRaise';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfNatureOfCapitalRaise)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '6. If the financial statements are being prepared for use in capital-raising activities (debt or equity), ' +
        'describe in detail the nature, size and timing of the capital raise, including registered or unregistered securities:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfNatureOfCapitalRaise)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfNatureOfCapitalRaise)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfNatureOfCapitalRaise)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.secEvaluationOfNatureOfCapitalRaise;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfNatureOfCapitalRaise)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.secEvaluationOfNatureOfCapitalRaise}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('secEvaluationOfQualityAssessment', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.secEvaluationOfQualityAssessment)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secEvaluationOfQualityAssessment';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfQualityAssessment)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '7. Based on meetings with the potential client and other inquiries, provide an assessment of the ' +
        'quality and experience of its accounting personnel, including relevant SEC experience. Comments:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfQualityAssessment)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfQualityAssessment)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfQualityAssessment)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.secEvaluationOfQualityAssessment;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfQualityAssessment)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.secEvaluationOfQualityAssessment}-${testIds.textAreaOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('secEvaluationOfClientsReputation', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.secEvaluationOfClientsReputation)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secEvaluationOfClientsReputation';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfClientsReputation)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        "8. Discuss the potential client with its securities attorney and attempt to determine the client's " +
        'reputation and character, and whether the attorney has a good working relationship with the ' +
        "client. Inquire as to the client's attitude toward full and complete disclosure in regulatory filings. " +
        'Note results of discussion:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfClientsReputation)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfClientsReputation)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfClientsReputation)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.secEvaluationOfClientsReputation;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secEvaluationOfClientsReputation)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.secEvaluationOfClientsReputation}-${testIds.textAreaOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('generalConclusion form header', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.formHeader)).toBeInTheDocument();
    });

    it('has correct text prop', () => {
      const expectedText = 'GENERAL CONCLUSION';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.formHeader)).toHaveAttribute('text', expectedText);
    });
  });

  describe('secQuestionAboutAbilityToProvideService', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.secQuestionAboutAbilityToProvideService)
      ).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secQuestionAboutAbilityToProvideService)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'secQuestionAboutAbilityToProvideService';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secQuestionAboutAbilityToProvideService)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '9. Given the nature of the client, its industry, its operating results, geographic locations, and our ability ' +
        'to staff this engagement, including the relative urgency of the project, is there any question about our ' +
        'ability to adequately service this engagement?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secQuestionAboutAbilityToProvideService)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secQuestionAboutAbilityToProvideService)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSupplementalRiskView.formData.secQuestionAboutAbilityToProvideService;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secQuestionAboutAbilityToProvideService)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.secQuestionAboutAbilityToProvideService}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('secQuestionAboutAbilityToProvideServiceComments', () => {
    it.each([
      { secQuestionAboutAbilityToProvideService: false },
      { secQuestionAboutAbilityToProvideService: null },
      { secQuestionAboutAbilityToProvideService: faker.datatype.string() }
    ])(
      'should not render TextArea when secQuestionAboutAbilityToProvideService is not true',
      ({ secQuestionAboutAbilityToProvideService }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSupplementalRiskView,
          formData: {
            ...fakeSupplementalRiskView.formData,
            secQuestionAboutAbilityToProvideService
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.secQuestionAboutAbilityToProvideServiceComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSupplementalRiskView,
          formData: {
            ...fakeSupplementalRiskView.formData,
            secQuestionAboutAbilityToProvideService: true
          }
        });
      });

      it('should render TextArea when secQuestionAboutAbilityToProvideService is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.secQuestionAboutAbilityToProvideServiceComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.secQuestionAboutAbilityToProvideServiceComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'secQuestionAboutAbilityToProvideServiceComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.secQuestionAboutAbilityToProvideServiceComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, please comment:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.secQuestionAboutAbilityToProvideServiceComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.secQuestionAboutAbilityToProvideServiceComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.secQuestionAboutAbilityToProvideServiceComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeSupplementalRiskView.formData.secQuestionAboutAbilityToProvideServiceComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.secQuestionAboutAbilityToProvideServiceComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.secQuestionAboutAbilityToProvideServiceComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('secUnderstandingOfSecIssuesComments', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.secUnderstandingOfSecIssuesComments)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'secUnderstandingOfSecIssuesComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secUnderstandingOfSecIssuesComments)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        'Explanation/Commentary that will assist approvers in understanding SEC issues relevant to acceptance of this engagement:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secUnderstandingOfSecIssuesComments)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secUnderstandingOfSecIssuesComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secUnderstandingOfSecIssuesComments)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.secUnderstandingOfSecIssuesComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.secUnderstandingOfSecIssuesComments)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.secUnderstandingOfSecIssuesComments}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });
});
