import ReactDOM from 'react-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import ATTACHMENT_REFERENCE_TYPES from '../../../../../../../helpers/enums/attachmentReferenceTypes';

import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import EbpaRiskSection from './EbpaRiskSection';
import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form headers / form text
  attachmentsFormHeader: 'attachments-form-header',
  finalApprovalStepFormHeader: 'final-approval-step-form-header',

  // form fields
  ebpaRisk: 'ebpa-risk',
  ebpaPlanHasHighLevelOfComplaints: 'ebpa-plan-has-high-level-of-complaints',
  ebpaPlanHasHighLevelOfComplaintsComments: 'ebpa-plan-has-high-level-of-complaints-comments',
  ebpaUnderIrsOrDolReviewInPastYear: 'ebpa-under-irs-or-dol-review-in-past-year',
  ebpaUnderIrsOrDolReviewInPastYearComments: 'ebpa-under-irs-or-dol-review-in-past-year-comments',
  ebpaAwareOfIntentNotToCorrectComplianceIssues: 'ebpa-aware-of-intent-not-to-correct-compliance-issues',
  ebpaAwareOfIntentNotToCorrectComplianceIssuesComments:
    'ebpa-aware-of-intent-not-to-correct-compliance-issues-comments',
  ebpaPastInstancesOfNonComplianceCorrected: 'ebpa-past-instances-of-non-compliance-corrected',
  ebpaPastInstancesOfNonComplianceCorrectedComments: 'ebpa-past-instances-of-non-compliance-corrected-comments',
  ebpaPlanHoldsCompanyStockNotPubliclyTraded: 'ebpa-plan-holds-company-stock-not-publicly-traded',
  ebpaAppraisalComments: 'ebpa-appraisal-comments',
  ebpaIsEsopLeveraged: 'ebpa-is-esop-leveraged',
  ebpaIsEsopLeveragedComments: 'ebpa-is-esop-leveraged-comments',
  ebpaRecentMergerServiceProviderChangeAudit: 'ebpa-recent-merger-service-provider-change-audit',
  ebpaRecentMergerServiceProviderChangeAuditComments: 'ebpa-recent-merger-service-provider-change-audit-comments',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change',

  // attachment table
  attachmentsTable: 'attachment-table'
};

const fakeEbpaRiskSection = {
  formData: {
    ebpaPlanHasHighLevelOfComplaints: faker.random.alphaNumeric(10),
    ebpaPlanHasHighLevelOfComplaintsComments: faker.random.alphaNumeric(10),
    ebpaUnderIrsOrDolReviewInPastYear: faker.random.alphaNumeric(10),
    ebpaUnderIrsOrDolReviewInPastYearComments: faker.random.alphaNumeric(10),
    ebpaAwareOfIntentNotToCorrectComplianceIssues: faker.random.alphaNumeric(10),
    ebpaAwareOfIntentNotToCorrectComplianceIssuesComments: faker.random.alphaNumeric(10),
    ebpaPastInstancesOfNonComplianceCorrected: faker.random.alphaNumeric(10),
    ebpaPastInstancesOfNonComplianceCorrectedComments: faker.random.alphaNumeric(10),
    ebpaPlanHoldsCompanyStockNotPubliclyTraded: faker.random.alphaNumeric(10),
    ebpaAppraisalComments: faker.random.alphaNumeric(10),
    ebpaIsEsopLeveraged: faker.random.alphaNumeric(10),
    ebpaIsEsopLeveragedComments: faker.random.alphaNumeric(10),
    ebpaRecentMergerServiceProviderChangeAudit: faker.random.alphaNumeric(10),
    ebpaRecentMergerServiceProviderChangeAuditComments: faker.random.alphaNumeric(10)
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

const getComponentToRender = (prop) => {
  return <EbpaRiskSection {...prop} {...hocInjectedProps} />;
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

jest.mock('../../../../views/withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../newEngagementInstanceSlice', () => {
  return {
    selectCurrentView: jest.fn()
  };
});

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

jest.mock('../../../../components/radioButtonList/RadioButtonList', () => ({
  __esModule: true,
  default: ({ name, label, options, horizontalItems, onChange, selectedValue }) => {
    const prop = { name, label, horizontalItems, selectedValue };
    return (
      <fake-radio-button-list {...prop} options={JSON.stringify(options)} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.radioButtonListOnChange}`} onClick={onChange} />
      </fake-radio-button-list>
    );
  }
}));

jest.mock('../../../../components/textArea/TextArea', () => ({
  __esModule: true,
  default: ({ name, label, placeholder, value, rows, onChange }) => {
    const prop = { name, label, placeholder, value, rows };
    return (
      <fake-text-area {...prop} data-testid={testIds[name]}>
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

describe('EbpaRiskSection', () => {
  beforeAll(() => {
    jest.spyOn(newEngagementInstanceSlice, 'selectCurrentView');
  });

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeEbpaRiskSection);
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

  it('passes correct title prop to CollapsibleFormSection component', () => {
    const expectedTitle = 'Ebpa Risk';
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
  });

  describe('finalApprovalStep form header', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.finalApprovalStepFormHeader)).toBeInTheDocument();
    });

    it('has correct text prop', () => {
      const expectedText =
        'Any question marked as TBD must be replaced with YES/NO at Relationship Partner Final Approval step.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.finalApprovalStepFormHeader)).toHaveAttribute('text', expectedText);
    });
  });

  describe('Ebpa Risk', () => {
    it('renders correct text prop', () => {
      const expectedText = 'Ebpa Risk';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaRisk)).toHaveAttribute('text', expectedText);
    });
  });

  describe('EbpaPlanHasHighLevelOfComplaints', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.ebpaPlanHasHighLevelOfComplaints)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'ebpaPlanHasHighLevelOfComplaints';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPlanHasHighLevelOfComplaints)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '1. High level of participant complaints?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPlanHasHighLevelOfComplaints)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPlanHasHighLevelOfComplaints)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPlanHasHighLevelOfComplaints)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeEbpaRiskSection.formData.ebpaPlanHasHighLevelOfComplaints;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPlanHasHighLevelOfComplaints)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.ebpaPlanHasHighLevelOfComplaints}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ebpaPlanHasHighLevelOfComplaintsComments', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.ebpaPlanHasHighLevelOfComplaintsComments)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'ebpaPlanHasHighLevelOfComplaintsComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPlanHasHighLevelOfComplaintsComments)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'If yes, explain:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPlanHasHighLevelOfComplaintsComments)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPlanHasHighLevelOfComplaintsComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeEbpaRiskSection.formData.ebpaPlanHasHighLevelOfComplaintsComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPlanHasHighLevelOfComplaintsComments)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPlanHasHighLevelOfComplaintsComments)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.ebpaPlanHasHighLevelOfComplaintsComments}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ebpaUnderIrsOrDolReviewInPastYear', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.ebpaUnderIrsOrDolReviewInPastYear)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'ebpaUnderIrsOrDolReviewInPastYear';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaUnderIrsOrDolReviewInPastYear)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '2. Investigation or audited by DOL or IRS? Explain any issues that remain open for resolution.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaUnderIrsOrDolReviewInPastYear)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaUnderIrsOrDolReviewInPastYear)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaUnderIrsOrDolReviewInPastYear)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeEbpaRiskSection.formData.ebpaUnderIrsOrDolReviewInPastYear;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaUnderIrsOrDolReviewInPastYear)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.ebpaUnderIrsOrDolReviewInPastYear}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ebpaUnderIrsOrDolReviewInPastYearComments', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.ebpaUnderIrsOrDolReviewInPastYearComments)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'ebpaUnderIrsOrDolReviewInPastYearComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaUnderIrsOrDolReviewInPastYearComments)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'If yes, explain:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaUnderIrsOrDolReviewInPastYearComments)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaUnderIrsOrDolReviewInPastYearComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeEbpaRiskSection.formData.ebpaUnderIrsOrDolReviewInPastYearComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaUnderIrsOrDolReviewInPastYearComments)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaUnderIrsOrDolReviewInPastYearComments)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.ebpaUnderIrsOrDolReviewInPastYearComments}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ebpaAwareOfIntentNotToCorrectComplianceIssues', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.ebpaAwareOfIntentNotToCorrectComplianceIssues)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'ebpaAwareOfIntentNotToCorrectComplianceIssues';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaAwareOfIntentNotToCorrectComplianceIssues)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '3. Does the plan have current compliance issues? Explain including any matters the Sponsor in not planning to correct.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaAwareOfIntentNotToCorrectComplianceIssues)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaAwareOfIntentNotToCorrectComplianceIssues)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaAwareOfIntentNotToCorrectComplianceIssues)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeEbpaRiskSection.formData.ebpaAwareOfIntentNotToCorrectComplianceIssues;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaAwareOfIntentNotToCorrectComplianceIssues)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.ebpaAwareOfIntentNotToCorrectComplianceIssues}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ebpaAwareOfIntentNotToCorrectComplianceIssuesComments', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.ebpaAwareOfIntentNotToCorrectComplianceIssuesComments)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'ebpaAwareOfIntentNotToCorrectComplianceIssuesComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaAwareOfIntentNotToCorrectComplianceIssuesComments)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'If yes, explain:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaAwareOfIntentNotToCorrectComplianceIssuesComments)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaAwareOfIntentNotToCorrectComplianceIssuesComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeEbpaRiskSection.formData.ebpaAwareOfIntentNotToCorrectComplianceIssuesComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaAwareOfIntentNotToCorrectComplianceIssuesComments)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaAwareOfIntentNotToCorrectComplianceIssuesComments)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.ebpaAwareOfIntentNotToCorrectComplianceIssuesComments}-${testIds.textAreaOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ebpaPastInstancesOfNonComplianceCorrected', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.ebpaPastInstancesOfNonComplianceCorrected)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'ebpaPastInstancesOfNonComplianceCorrected';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPastInstancesOfNonComplianceCorrected)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = '4. Does the plan have past instances of noncompliance?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPastInstancesOfNonComplianceCorrected)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPastInstancesOfNonComplianceCorrected)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPastInstancesOfNonComplianceCorrected)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeEbpaRiskSection.formData.ebpaPastInstancesOfNonComplianceCorrected;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPastInstancesOfNonComplianceCorrected)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.ebpaPastInstancesOfNonComplianceCorrected}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ebpaPastInstancesOfNonComplianceCorrectedComments', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.ebpaPastInstancesOfNonComplianceCorrectedComments)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'ebpaPastInstancesOfNonComplianceCorrectedComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPastInstancesOfNonComplianceCorrectedComments)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'If yes, explain:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPastInstancesOfNonComplianceCorrectedComments)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPastInstancesOfNonComplianceCorrectedComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeEbpaRiskSection.formData.ebpaPastInstancesOfNonComplianceCorrectedComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPastInstancesOfNonComplianceCorrectedComments)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPastInstancesOfNonComplianceCorrectedComments)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.ebpaPastInstancesOfNonComplianceCorrectedComments}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ebpaPlanHoldsCompanyStockNotPubliclyTraded', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.ebpaPlanHoldsCompanyStockNotPubliclyTraded)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'ebpaPlanHoldsCompanyStockNotPubliclyTraded';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPlanHoldsCompanyStockNotPubliclyTraded)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = '5. Does the plan hold company stock that is not publicly traded(ESOP)?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPlanHoldsCompanyStockNotPubliclyTraded)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPlanHoldsCompanyStockNotPubliclyTraded)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPlanHoldsCompanyStockNotPubliclyTraded)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeEbpaRiskSection.formData.ebpaPlanHoldsCompanyStockNotPubliclyTraded;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaPlanHoldsCompanyStockNotPubliclyTraded)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.ebpaPlanHoldsCompanyStockNotPubliclyTraded}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ebpaAppraisalComments', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.ebpaAppraisalComments)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'ebpaAppraisalComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaAppraisalComments)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'If yes, explain:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaAppraisalComments)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaAppraisalComments)).toHaveAttribute('placeholder', expectedPlaceHolder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeEbpaRiskSection.formData.ebpaAppraisalComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaAppraisalComments)).toHaveAttribute('value', expectedValue);
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaAppraisalComments)).toHaveAttribute('rows', expectedRows.toString());
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.ebpaAppraisalComments}-${testIds.textAreaOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ebpaIsEsopLeveraged', () => {
    it('renders ebpaIsEsopLeveraged inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.ebpaIsEsopLeveraged)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'ebpaIsEsopLeveraged';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaIsEsopLeveraged)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '6. Is the ESOP leveraged (and fee quote adjusted)?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaIsEsopLeveraged)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaIsEsopLeveraged)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaIsEsopLeveraged)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeEbpaRiskSection.formData.ebpaIsEsopLeveraged;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaIsEsopLeveraged)).toHaveAttribute('selectedValue', expectedSelectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.ebpaIsEsopLeveraged}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ebpaIsEsopLeveragedComments', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.ebpaIsEsopLeveragedComments)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'ebpaIsEsopLeveragedComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaIsEsopLeveragedComments)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'If yes, explain:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaIsEsopLeveragedComments)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaIsEsopLeveragedComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeEbpaRiskSection.formData.ebpaIsEsopLeveragedComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaIsEsopLeveragedComments)).toHaveAttribute('value', expectedValue);
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaIsEsopLeveragedComments)).toHaveAttribute('rows', expectedRows.toString());
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.ebpaIsEsopLeveragedComments}-${testIds.textAreaOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ebpaRecentMergerServiceProviderChangeAudit', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.ebpaRecentMergerServiceProviderChangeAudit)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'ebpaRecentMergerServiceProviderChangeAudit';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaRecentMergerServiceProviderChangeAudit)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '7. Recent Merger, service provider changes or full scope audit?(Fee quote should be adjusted for any of these)';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaRecentMergerServiceProviderChangeAudit)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaRecentMergerServiceProviderChangeAudit)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaRecentMergerServiceProviderChangeAudit)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeEbpaRiskSection.formData.ebpaRecentMergerServiceProviderChangeAudit;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaRecentMergerServiceProviderChangeAudit)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.ebpaRecentMergerServiceProviderChangeAudit}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ebpaRecentMergerServiceProviderChangeAuditComments', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.ebpaRecentMergerServiceProviderChangeAuditComments)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'ebpaRecentMergerServiceProviderChangeAuditComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaRecentMergerServiceProviderChangeAuditComments)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'If yes, explain:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaRecentMergerServiceProviderChangeAuditComments)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaRecentMergerServiceProviderChangeAuditComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeEbpaRiskSection.formData.ebpaRecentMergerServiceProviderChangeAuditComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaRecentMergerServiceProviderChangeAuditComments)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ebpaRecentMergerServiceProviderChangeAuditComments)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.ebpaRecentMergerServiceProviderChangeAuditComments}-${testIds.textAreaOnChange}`
          )
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

    it('has correct  prop', () => {
      const expectedAttachmentReferenceType = JSON.stringify(ATTACHMENT_REFERENCE_TYPES.ebpaRisk);
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.attachmentsTable)).toHaveAttribute(
        'attachmentReferenceType',
        expectedAttachmentReferenceType
      );
    });
  });
});
