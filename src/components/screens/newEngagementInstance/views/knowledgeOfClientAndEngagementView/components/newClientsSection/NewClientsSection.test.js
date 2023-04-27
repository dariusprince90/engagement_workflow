import ReactDOM from 'react-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import ATTACHMENT_REFERENCE_TYPES from '../../../../../../../helpers/enums/attachmentReferenceTypes';

import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import YesNoNotYetAvailableRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoNotYetAvailableRadioButtonListOptions';
import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import NewClientsSection from './NewClientsSection';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form fields
  isBackgroundCheckOptional: 'is-background-check-optional',
  otherAccountantsPreviouslyWorked: 'other-accountants-previously-worked',
  financialStatementsExist: 'financial-statements-exist',
  explanationForNoFinancialStatements: 'explanation-for-no-financial-statements',
  explanationOfTotalAssetsForClient: 'explanation-of-total-assets-for-client',
  explanationOfTotalEquityForClient: 'explanation-of-total-equity-for-client',
  explanationOfPast2YearsRevenue: 'explanation-of-past2-years-revenue',
  explanationOfPast2YearsIncome: 'explanation-of-past2-years-income',

  // form header fields
  attachmentsFormHeader: 'attachments-form-header',

  // form text fields
  formText: 'form-text',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  //textArea events
  textAreaOnChange: 'text-area-on-change',

  // attachment table
  attachmentsTable: 'attachment-table'
};

const fakeKnowledgeOfClientView = {
  formData: {
    isBackgroundCheckOptional: faker.datatype.boolean(),
    otherAccountantsPreviouslyWorked: faker.datatype.boolean(),
    financialStatementsExist: faker.datatype.boolean(),
    explanationForNoFinancialStatements: faker.random.alphaNumeric(10),
    explanationOfTotalAssetsForClient: faker.random.alphaNumeric(10),
    explanationOfTotalEquityForClient: faker.random.alphaNumeric(10),
    explanationOfPast2YearsRevenue: faker.random.alphaNumeric(10),
    explanationOfPast2YearsIncome: faker.random.alphaNumeric(10)
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <NewClientsSection {...props} {...hocInjectedProps} />;
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

jest.mock('../../../withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ title, children }) => {
    const props = { title, children };
    return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
  }
}));

jest.mock('../../../../../../common/formHeader/FormHeader', () => {
  return {
    __esModule: true,
    default: ({ name, text }) => {
      const props = { name, text };
      return <fake-form-header {...props} data-testid={testIds[name]} />;
    }
  };
});

jest.mock('../../../../components/formText/FormText', () => ({
  __esModule: true,
  default: ({ children, applyEmphasis }) => {
    const props = { children, applyEmphasis };
    return <fake-form-text {...props} data-testid={testIds.formText} />;
  }
}));

jest.mock('../../../../components/radioButtonList/RadioButtonList', () => ({
  __esModule: true,
  default: ({ name, label, options, horizontalItems, onChange, selectedValue }) => {
    const props = { name, label, horizontalItems, selectedValue };
    return (
      <fake-radio-button-list {...props} options={JSON.stringify(options)} data-testid={testIds[name]}>
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

describe('NewClientsSection', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeKnowledgeOfClientView);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  it('renders CollapsibleFormSection component', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toBeInTheDocument();
  });

  it('renders CollapsibleFormSection with correct title prop', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', 'New Clients');
  });

  describe('isBackgroundCheckOptional', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.isBackgroundCheckOptional)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'isBackgroundCheckOptional';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isBackgroundCheckOptional)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        'Would you like an optional background check to be conducted? This is required for financial statement ' +
        'audit of a SEC registrant with a 10-k filing requirement.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isBackgroundCheckOptional)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isBackgroundCheckOptional)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isBackgroundCheckOptional)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeKnowledgeOfClientView.formData.isBackgroundCheckOptional;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isBackgroundCheckOptional)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.isBackgroundCheckOptional}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('otherAccountantsPreviouslyWorked', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.otherAccountantsPreviouslyWorked)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'otherAccountantsPreviouslyWorked';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.otherAccountantsPreviouslyWorked)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Did other accountants previously work with this (potential) client?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.otherAccountantsPreviouslyWorked)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.otherAccountantsPreviouslyWorked)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.otherAccountantsPreviouslyWorked)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeKnowledgeOfClientView.formData.otherAccountantsPreviouslyWorked;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.otherAccountantsPreviouslyWorked)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.otherAccountantsPreviouslyWorked}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('financialStatementsExist', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.financialStatementsExist)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'financialStatementsExist';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.financialStatementsExist)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Do financial statements exist for this client?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.financialStatementsExist)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoNotYetAvailableRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.financialStatementsExist)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.financialStatementsExist)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeKnowledgeOfClientView.formData.financialStatementsExist;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.financialStatementsExist)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.financialStatementsExist}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('clientsFinancialStatements form text', () => {
    it('has correct applyEmphasis prop', () => {
      const expectedApplyEmphasis = 'true';
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[0]).toHaveAttribute('applyEmphasis', expectedApplyEmphasis);
    });

    it('renders correct text as children', () => {
      const expectedText =
        "If Yes, Attach client's financial statements (most recent annual and interim statements). For SEC audit " +
        "engagements, attach the most recent 10-K (or 11-K), 10-Q and proxy. Also attach recent 8K's that may be " +
        'relevant to acceptance decision. If they exist, attach communications regarding accounting, audit, or internal ' +
        'matters from prior accountants (management letters, reportable conditions letter, etc.).';
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[0]).toHaveTextContent(expectedText);
    });
  });

  describe('respondToQuestions form text', () => {
    it('has correct applyEmphasis prop', () => {
      const expectedApplyEmphasis = 'true';
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[1]).toHaveAttribute('applyEmphasis', expectedApplyEmphasis);
    });

    it('renders correct text as children', () => {
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[1]).toHaveTextContent('If no, respond to the following questions:');
    });
  });

  describe('explanationForNoFinancialStatements', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.explanationForNoFinancialStatements)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'explanationForNoFinancialStatements';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationForNoFinancialStatements)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Please explain why no financial statements are available?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationForNoFinancialStatements)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeKnowledgeOfClientView.formData.explanationForNoFinancialStatements;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationForNoFinancialStatements)).toHaveAttribute('value', expectedValue);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationForNoFinancialStatements)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = '6';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationForNoFinancialStatements)).toHaveAttribute('rows', expectedRows);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.explanationForNoFinancialStatements}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('explanationOfTotalAssetsForClient', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.explanationOfTotalAssetsForClient)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'explanationOfTotalAssetsForClient';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfTotalAssetsForClient)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'What are total assets for the proposed client?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfTotalAssetsForClient)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeKnowledgeOfClientView.formData.explanationOfTotalAssetsForClient;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfTotalAssetsForClient)).toHaveAttribute('value', expectedValue);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfTotalAssetsForClient)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = '6';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfTotalAssetsForClient)).toHaveAttribute('rows', expectedRows);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.explanationOfTotalAssetsForClient}-${testIds.textAreaOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('explanationOfTotalEquityForClient', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.explanationOfTotalEquityForClient)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'explanationOfTotalEquityForClient';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfTotalEquityForClient)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'What is total equity for the proposed client?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfTotalEquityForClient)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeKnowledgeOfClientView.formData.explanationOfTotalEquityForClient;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfTotalEquityForClient)).toHaveAttribute('value', expectedValue);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfTotalEquityForClient)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = '6';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfTotalEquityForClient)).toHaveAttribute('rows', expectedRows);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.explanationOfTotalEquityForClient}-${testIds.textAreaOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('explanationOfPast2YearsRevenue', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.explanationOfPast2YearsRevenue)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'explanationOfPast2YearsRevenue';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfPast2YearsRevenue)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'What was revenue for the past 2 years?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfPast2YearsRevenue)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeKnowledgeOfClientView.formData.explanationOfPast2YearsRevenue;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfPast2YearsRevenue)).toHaveAttribute('value', expectedValue);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfPast2YearsRevenue)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = '6';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfPast2YearsRevenue)).toHaveAttribute('rows', expectedRows);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.explanationOfPast2YearsRevenue}-${testIds.textAreaOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('explanationOfPast2YearsIncome', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.explanationOfPast2YearsIncome)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'explanationOfPast2YearsIncome';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfPast2YearsIncome)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'What was income for the past 2  years?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfPast2YearsIncome)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeKnowledgeOfClientView.formData.explanationOfPast2YearsIncome;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfPast2YearsIncome)).toHaveAttribute('value', expectedValue);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfPast2YearsIncome)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = '6';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.explanationOfPast2YearsIncome)).toHaveAttribute('rows', expectedRows);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.explanationOfPast2YearsIncome}-${testIds.textAreaOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('moreComplexClientsOrPotentialClients form text', () => {
    it('has correct applyEmphasis prop', () => {
      const expectedApplyEmphasis = 'true';
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[2]).toHaveAttribute('applyEmphasis', expectedApplyEmphasis);
    });

    it('renders correct text as children', () => {
      const expectedText =
        'For larger, more complex clients or potential clients that have apparent risks/results/attributes that would ' +
        'create questions about acceptance, attach a memo that describes your assessment of critical client acceptance ' +
        'factors. Identify relevant factors approvers should consider in making acceptance decisions.';
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[2]).toHaveTextContent(expectedText);
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
      const expectedAttachmentReferenceType = JSON.stringify(ATTACHMENT_REFERENCE_TYPES.knowledgeOfNewClient);
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.attachmentsTable)).toHaveAttribute(
        'attachmentReferenceType',
        expectedAttachmentReferenceType
      );
    });
  });
});
