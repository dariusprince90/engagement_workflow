import ReactDOM from 'react-dom';
import { render, screen, fireEvent, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import PredecessorInformationSection from './PredecessorInformationSection';
import newEngagementInstanceSlice from '../../../../../newEngagementInstance/newEngagementInstanceSlice';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form fields
  predecessorInfoExperiencedDisagreementsWithAccounting: 'predecessor-info-experienced-disagreements-with-accounting',
  predecessorInfoExperiencedDisagreementsWithNature: 'predecessor-info-experienced-disagreements-with-nature',
  predecessorInfoExperiencedDisagreementsWithReport: 'predecessor-info-experienced-disagreements-with-report',
  predecessorInfoExperiencedDisagreementsWithConditions: 'predecessor-info-experienced-disagreements-with-conditions',
  predecessorInfoExperiencedDisagreementsComments: 'predecessor-info-experienced-disagreements-comments',
  predecessorInfoHadDisagreementsWithFees: 'predecessor-info-had-disagreements-with-fees',
  predecessorInfoHadDisagreementsWithFeesComments: 'predecessor-info-had-disagreements-with-fees-comments',
  predecessorInfoMattersDoSuggestClientLacksEthics: 'predecessor-info-matters-do-suggest-client-lacks-ethics',
  predecessorInfoMattersDoSuggestClientLacksEthicsComments:
    'predecessor-info-matters-do-suggest-client-lacks-ethics-comments',
  predecessorInfoMattersDoIndicateFraud: 'predecessor-info-matters-do-indicate-fraud',
  predecessorInfoMattersDoIndicateFraudComments: 'predecessor-info-matters-do-indicate-fraud-comments',
  predecessorInfoHasIssuedCommunications: 'predecessor-info-has-issued-communications',
  predecessorInfoHasIssuedCommunicationsComments: 'predecessor-info-has-issued-communications-comments',
  predecessorInfoHasRefusedReview: 'predecessor-info-has-refused-review',
  predecessorInfoHasRefusedReviewComments: 'predecessor-info-has-refused-review-comments',
  predecessorInfoUnderstoodReasonForEngagingComments: 'predecessor-info-understood-reason-for-engaging-comments',
  predecessorInfoStatedReasonForEngagingComments: 'predecessor-info-stated-reason-for-engaging-comments',
  predecessorInfoDidIndicateResponseWasLimited: 'predecessor-info-did-indicate-response-was-limited',
  predecessorInfoDidIndicateResponseWasLimitedComments: 'predecessor-info-did-indicate-response-was-limited-comments',

  // form text / formHeader
  requiredForAuditEngagementsFormHeader: 'required-for-audit-engagements-form-header',
  disagreementWithClientFormText: 'disagreement-with-client-form-text',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakePredecessorInformationSection = {
  formData: {
    predecessorInfoExperiencedDisagreementsWithAccounting: faker.datatype.boolean(),
    predecessorInfoExperiencedDisagreementsWithNature: faker.datatype.boolean(),
    predecessorInfoExperiencedDisagreementsWithReport: faker.datatype.boolean(),
    predecessorInfoExperiencedDisagreementsWithConditions: faker.datatype.boolean(),
    predecessorInfoExperiencedDisagreementsComments: faker.datatype.string(),
    predecessorInfoHadDisagreementsWithFees: faker.datatype.boolean(),
    predecessorInfoHadDisagreementsWithFeesComments: faker.datatype.string(),
    predecessorInfoMattersDoSuggestClientLacksEthics: faker.datatype.boolean(),
    predecessorInfoMattersDoSuggestClientLacksEthicsComments: faker.datatype.string(),
    predecessorInfoMattersDoIndicateFraud: faker.datatype.boolean(),
    predecessorInfoMattersDoIndicateFraudComments: faker.datatype.string(),
    predecessorInfoHasIssuedCommunications: faker.datatype.boolean(),
    predecessorInfoHasIssuedCommunicationsComments: faker.datatype.string(),
    predecessorInfoHasRefusedReview: faker.datatype.boolean(),
    predecessorInfoHasRefusedReviewComments: faker.datatype.string(),
    predecessorInfoUnderstoodReasonForEngagingComments: faker.datatype.string(),
    predecessorInfoStatedReasonForEngagingComments: faker.datatype.string(),
    predecessorInfoDidIndicateResponseWasLimited: faker.datatype.boolean(),
    predecessorInfoDidIndicateResponseWasLimitedComments: faker.datatype.string()
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <PredecessorInformationSection {...props} {...hocInjectedProps} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => callback(),
    useDispatch: () => jest.fn()
  };
});

jest.mock('../../../withNewEngagementInstanceViewData', () => (component) => component);

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
    default: ({ text }) => {
      const props = { text };
      return <fake-form-header {...props} data-testid={testIds.requiredForAuditEngagementsFormHeader} />;
    }
  };
});

jest.mock('../../../../components/formText/FormText', () => {
  return {
    __esModule: true,
    default: ({ isLabel, children }) => {
      const props = { isLabel, children };
      return <fake-form-text {...props} data-testid={testIds.disagreementWithClientFormText} />;
    }
  };
});

jest.mock('../../../../components/radioButtonList/RadioButtonList', () => ({
  __esModule: true,
  default: ({ name, label, options, horizontalItems, selectedValue, onChange }) => {
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
  default: ({ name, label, placeholder, value, rows, onChange }) => {
    const props = { name, label, placeholder, value, rows };
    return (
      <fake-text-area {...props} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.textAreaOnChange}`} onClick={onChange} />
      </fake-text-area>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('PredecessorInformationSection', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakePredecessorInformationSection);
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
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toBeInTheDocument();
  });

  it('passes correct title prop to CollapsibleFormSection component', () => {
    const expectedTitle = 'Predecessor Information';
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
  });

  describe('requiredForAuditEngagements form header', () => {
    it('renders correct text prop', () => {
      const expectedText = 'Predecessor Assessment - Required for Audit Engagements';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.requiredForAuditEngagementsFormHeader)).toHaveAttribute('text', expectedText);
    });
  });

  describe('disagreementWithClient form text', () => {
    it('renders correct isLabel prop', () => {
      const isLabel = true;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.disagreementWithClientFormText)).toHaveAttribute('isLabel', isLabel.toString());
    });

    it('renders correct text as children', () => {
      const expectedText = '1. Did the Predecessor accountant experience any disagreement with the client';
      render(getComponentToRender());
      const formTextFields = screen.getByTestId(testIds.disagreementWithClientFormText);
      expect(formTextFields).toHaveTextContent(expectedText);
    });
  });

  describe('predecessorInfoExperiencedDisagreementsWithAccounting', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithAccounting)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'predecessorInfoExperiencedDisagreementsWithAccounting';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithAccounting)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'a. Accounting matters?';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithAccounting)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options props', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithAccounting)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems props', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithAccounting)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue props', () => {
      const expectedValue =
        fakePredecessorInformationSection.formData.predecessorInfoExperiencedDisagreementsWithAccounting;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithAccounting)).toHaveAttribute(
        'selectedValue',
        expectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.predecessorInfoExperiencedDisagreementsWithAccounting}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('predecessorInfoExperiencedDisagreementsWithNature', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithNature)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'predecessorInfoExperiencedDisagreementsWithNature';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithNature)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = "b. The nature and scope of the accountant's procedures?";
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithNature)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options props', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithNature)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems props', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithNature)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue props', () => {
      const expectedValue =
        fakePredecessorInformationSection.formData.predecessorInfoExperiencedDisagreementsWithNature;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithNature)).toHaveAttribute(
        'selectedValue',
        expectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.predecessorInfoExperiencedDisagreementsWithNature}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('predecessorInfoExperiencedDisagreementsWithReport', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithReport)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'predecessorInfoExperiencedDisagreementsWithReport';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithReport)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = "c. The accountant's report?";
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithReport)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options props', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithReport)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems props', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithReport)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue props', () => {
      const expectedValue =
        fakePredecessorInformationSection.formData.predecessorInfoExperiencedDisagreementsWithReport;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithReport)).toHaveAttribute(
        'selectedValue',
        expectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.predecessorInfoExperiencedDisagreementsWithReport}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('predecessorInfoExperiencedDisagreementsWithConditions', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithConditions)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'predecessorInfoExperiencedDisagreementsWithConditions';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithConditions)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'd. Reportable conditions or other internal control matters?';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithConditions)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options props', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithConditions)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems props', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithConditions)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue props', () => {
      const expectedValue =
        fakePredecessorInformationSection.formData.predecessorInfoExperiencedDisagreementsWithConditions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsWithConditions)).toHaveAttribute(
        'selectedValue',
        expectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.predecessorInfoExperiencedDisagreementsWithConditions}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('predecessorInfoExperiencedDisagreementsComments', () => {
    it.each([
      {
        predecessorInfoExperiencedDisagreementsWithConditions: false,
        predecessorInfoExperiencedDisagreementsWithReport: false,
        predecessorInfoExperiencedDisagreementsWithNature: false,
        predecessorInfoExperiencedDisagreementsWithAccounting: false
      },
      {
        predecessorInfoExperiencedDisagreementsWithConditions: null,
        predecessorInfoExperiencedDisagreementsWithReport: null,
        predecessorInfoExperiencedDisagreementsWithNature: null,
        predecessorInfoExperiencedDisagreementsWithAccounting: null
      }
    ])(
      'should not render when predecessorInfoExperiencedDisagreementsWithConditions is $predecessorInfoExperiencedDisagreementsWithConditions, ' +
        'predecessorInfoExperiencedDisagreementsWithReport is $predecessorInfoExperiencedDisagreementsWithReport, ' +
        'predecessorInfoExperiencedDisagreementsWithNature is $predecessorInfoExperiencedDisagreementsWithNature and ' +
        'predecessorInfoExperiencedDisagreementsWithAccounting is $predecessorInfoExperiencedDisagreementsWithAccounting',
      ({
        predecessorInfoExperiencedDisagreementsWithConditions,
        predecessorInfoExperiencedDisagreementsWithReport,
        predecessorInfoExperiencedDisagreementsWithNature,
        predecessorInfoExperiencedDisagreementsWithAccounting
      }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakePredecessorInformationSection,
          formData: {
            ...fakePredecessorInformationSection.formData,
            predecessorInfoExperiencedDisagreementsWithConditions,
            predecessorInfoExperiencedDisagreementsWithReport,
            predecessorInfoExperiencedDisagreementsWithNature,
            predecessorInfoExperiencedDisagreementsWithAccounting
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.predecessorInfoExperiencedDisagreementsComments)).not.toBeInTheDocument();
      }
    );

    it.each([
      {
        predecessorInfoExperiencedDisagreementsWithConditions: true,
        predecessorInfoExperiencedDisagreementsWithReport: true,
        predecessorInfoExperiencedDisagreementsWithNature: true,
        predecessorInfoExperiencedDisagreementsWithAccounting: true
      },
      {
        predecessorInfoExperiencedDisagreementsWithConditions: true,
        predecessorInfoExperiencedDisagreementsWithReport: false,
        predecessorInfoExperiencedDisagreementsWithNature: false,
        predecessorInfoExperiencedDisagreementsWithAccounting: false
      },
      {
        predecessorInfoExperiencedDisagreementsWithConditions: false,
        predecessorInfoExperiencedDisagreementsWithReport: true,
        predecessorInfoExperiencedDisagreementsWithNature: false,
        predecessorInfoExperiencedDisagreementsWithAccounting: false
      },
      {
        predecessorInfoExperiencedDisagreementsWithConditions: false,
        predecessorInfoExperiencedDisagreementsWithReport: false,
        predecessorInfoExperiencedDisagreementsWithNature: true,
        predecessorInfoExperiencedDisagreementsWithAccounting: false
      },
      {
        predecessorInfoExperiencedDisagreementsWithConditions: false,
        predecessorInfoExperiencedDisagreementsWithReport: false,
        predecessorInfoExperiencedDisagreementsWithNature: false,
        predecessorInfoExperiencedDisagreementsWithAccounting: true
      }
    ])(
      'should render when predecessorInfoExperiencedDisagreementsWithConditions is $predecessorInfoExperiencedDisagreementsWithConditions, ' +
        'predecessorInfoExperiencedDisagreementsWithReport is $predecessorInfoExperiencedDisagreementsWithReport, ' +
        'predecessorInfoExperiencedDisagreementsWithNature is $predecessorInfoExperiencedDisagreementsWithNature and ' +
        'predecessorInfoExperiencedDisagreementsWithAccounting is $predecessorInfoExperiencedDisagreementsWithAccounting',
      ({
        predecessorInfoExperiencedDisagreementsWithConditions,
        predecessorInfoExperiencedDisagreementsWithReport,
        predecessorInfoExperiencedDisagreementsWithNature,
        predecessorInfoExperiencedDisagreementsWithAccounting
      }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakePredecessorInformationSection,
          formData: {
            ...fakePredecessorInformationSection.formData,
            predecessorInfoExperiencedDisagreementsWithConditions,
            predecessorInfoExperiencedDisagreementsWithReport,
            predecessorInfoExperiencedDisagreementsWithNature,
            predecessorInfoExperiencedDisagreementsWithAccounting
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsComments)).toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakePredecessorInformationSection,
          formData: {
            ...fakePredecessorInformationSection.formData,
            predecessorInfoExperiencedDisagreementsWithConditions: true
          }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender());
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.predecessorInfoExperiencedDisagreementsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'predecessorInfoExperiencedDisagreementsComments';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel =
          "If any of the above answered as 'yes'  the describe the nature of disagreements and how it was resolved";
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct value prop', () => {
        const expectedValue =
          fakePredecessorInformationSection.formData.predecessorInfoExperiencedDisagreementsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoExperiencedDisagreementsComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.predecessorInfoExperiencedDisagreementsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('predecessorInfoHadDisagreementsWithFees', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.predecessorInfoHadDisagreementsWithFees)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'predecessorInfoHadDisagreementsWithFees';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoHadDisagreementsWithFees)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '2. Did the predecessor accountant have any disagreements with regards to fees or disputes involving payment?';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoHadDisagreementsWithFees)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options props', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoHadDisagreementsWithFees)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems props', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoHadDisagreementsWithFees)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue props', () => {
      const expectedValue = fakePredecessorInformationSection.formData.predecessorInfoHadDisagreementsWithFees;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.predecessorInfoHadDisagreementsWithFees)).toHaveAttribute(
        'selectedValue',
        expectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.predecessorInfoHadDisagreementsWithFees}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('predecessorInfoHadDisagreementsWithFeesComments', () => {
    it.each([
      { predecessorInfoHadDisagreementsWithFees: false },
      { predecessorInfoHadDisagreementsWithFees: null },
      { predecessorInfoHadDisagreementsWithFees: faker.datatype.string() }
    ])(
      'should not render TextArea when predecessorInfoHadDisagreementsWithFees is not true',
      ({ predecessorInfoHadDisagreementsWithFees }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakePredecessorInformationSection,
          formData: {
            ...fakePredecessorInformationSection.formData,
            predecessorInfoHadDisagreementsWithFees
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.predecessorInfoHadDisagreementsWithFeesComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakePredecessorInformationSection,
          formData: {
            ...fakePredecessorInformationSection.formData,
            predecessorInfoHadDisagreementsWithFees: true
          }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender());
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.predecessorInfoHadDisagreementsWithFeesComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when predecessorInfoHadDisagreementsWithFees is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.predecessorInfoHadDisagreementsWithFeesComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'predecessorInfoHadDisagreementsWithFeesComments';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoHadDisagreementsWithFeesComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoHadDisagreementsWithFeesComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoHadDisagreementsWithFeesComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct value prop', () => {
        const expectedValue =
          fakePredecessorInformationSection.formData.predecessorInfoHadDisagreementsWithFeesComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.predecessorInfoHadDisagreementsWithFeesComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoHadDisagreementsWithFeesComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.predecessorInfoHadDisagreementsWithFeesComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('predecessorInfoMattersDoSuggestClientLacksEthics', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.predecessorInfoMattersDoSuggestClientLacksEthics)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'predecessorInfoMattersDoSuggestClientLacksEthics';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoMattersDoSuggestClientLacksEthics)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '3. Did the predecessor accountant identify any matters that suggest the client ' +
        'lacks ethics or integrity in financial reporting or business conduct? ';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoMattersDoSuggestClientLacksEthics)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options props', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoMattersDoSuggestClientLacksEthics)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems props', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoMattersDoSuggestClientLacksEthics)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue props', () => {
      const expectedValue = fakePredecessorInformationSection.formData.predecessorInfoMattersDoSuggestClientLacksEthics;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.predecessorInfoMattersDoSuggestClientLacksEthics)).toHaveAttribute(
        'selectedValue',
        expectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.predecessorInfoMattersDoSuggestClientLacksEthics}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('predecessorInfoMattersDoSuggestClientLacksEthicsComments', () => {
    it.each([
      { predecessorInfoMattersDoSuggestClientLacksEthics: false },
      { predecessorInfoMattersDoSuggestClientLacksEthics: null },
      { predecessorInfoMattersDoSuggestClientLacksEthics: faker.datatype.string() }
    ])(
      'should not render TextArea when predecessorInfoMattersDoSuggestClientLacksEthics is not true',
      ({ predecessorInfoMattersDoSuggestClientLacksEthics }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakePredecessorInformationSection,
          formData: { ...fakePredecessorInformationSection.formData, predecessorInfoMattersDoSuggestClientLacksEthics }
        });
        render(getComponentToRender(defaultProps));
        expect(
          screen.queryByTestId(testIds.predecessorInfoMattersDoSuggestClientLacksEthicsComments)
        ).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakePredecessorInformationSection,
          formData: {
            ...fakePredecessorInformationSection.formData,
            predecessorInfoMattersDoSuggestClientLacksEthics: true
          }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender());
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.predecessorInfoMattersDoSuggestClientLacksEthicsComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when predecessorInfoMattersDoSuggestClientLacksEthics is true', () => {
        render(getComponentToRender(defaultProps));
        expect(
          screen.getByTestId(testIds.predecessorInfoMattersDoSuggestClientLacksEthicsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'predecessorInfoMattersDoSuggestClientLacksEthicsComments';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoMattersDoSuggestClientLacksEthicsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoMattersDoSuggestClientLacksEthicsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoMattersDoSuggestClientLacksEthicsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct value prop', () => {
        const expectedValue =
          fakePredecessorInformationSection.formData.predecessorInfoMattersDoSuggestClientLacksEthicsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.predecessorInfoMattersDoSuggestClientLacksEthicsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoMattersDoSuggestClientLacksEthicsComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(
              `${testIds.predecessorInfoMattersDoSuggestClientLacksEthicsComments}-${testIds.textAreaOnChange}`
            )
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('predecessorInfoMattersDoIndicateFraud', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.predecessorInfoMattersDoIndicateFraud)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'predecessorInfoMattersDoIndicateFraud';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoMattersDoIndicateFraud)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '4. Did the predecessor accountant identify any matters indicating potential fraud or illegal acts?';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoMattersDoIndicateFraud)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options props', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoMattersDoIndicateFraud)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems props', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoMattersDoIndicateFraud)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue props', () => {
      const expectedValue = fakePredecessorInformationSection.formData.predecessorInfoMattersDoIndicateFraud;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.predecessorInfoMattersDoIndicateFraud)).toHaveAttribute(
        'selectedValue',
        expectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.predecessorInfoMattersDoIndicateFraud}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('predecessorInfoMattersDoIndicateFraudComments', () => {
    it.each([
      { predecessorInfoMattersDoIndicateFraud: false },
      { predecessorInfoMattersDoIndicateFraud: null },
      { predecessorInfoMattersDoIndicateFraud: faker.datatype.string() }
    ])(
      'should not render TextArea when predecessorInfoMattersDoIndicateFraud is not true',
      ({ predecessorInfoMattersDoIndicateFraud }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakePredecessorInformationSection,
          formData: { ...fakePredecessorInformationSection.formData, predecessorInfoMattersDoIndicateFraud }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.predecessorInfoMattersDoIndicateFraudComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakePredecessorInformationSection,
          formData: {
            ...fakePredecessorInformationSection.formData,
            predecessorInfoMattersDoIndicateFraud: true
          }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender());
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.predecessorInfoMattersDoIndicateFraudComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when predecessorInfoMattersDoIndicateFraud is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.predecessorInfoMattersDoIndicateFraudComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'predecessorInfoMattersDoIndicateFraudComments';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoMattersDoIndicateFraudComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoMattersDoIndicateFraudComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoMattersDoIndicateFraudComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakePredecessorInformationSection.formData.predecessorInfoMattersDoIndicateFraudComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.predecessorInfoMattersDoIndicateFraudComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoMattersDoIndicateFraudComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.predecessorInfoMattersDoIndicateFraudComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('predecessorInfoHasIssuedCommunications', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.predecessorInfoHasIssuedCommunications)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'predecessorInfoHasIssuedCommunications';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoHasIssuedCommunications)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '5. Has the predecessor accountant issued any communications to the client ' +
        'regarding fraud, illegal act or matters related to internal controls? ';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoHasIssuedCommunications)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options props', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoHasIssuedCommunications)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems props', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoHasIssuedCommunications)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue props', () => {
      const expectedValue = fakePredecessorInformationSection.formData.predecessorInfoHasIssuedCommunications;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.predecessorInfoHasIssuedCommunications)).toHaveAttribute(
        'selectedValue',
        expectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.predecessorInfoHasIssuedCommunications}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('predecessorInfoHasIssuedCommunicationsComments', () => {
    it.each([
      { predecessorInfoHasIssuedCommunications: false },
      { predecessorInfoHasIssuedCommunications: null },
      { predecessorInfoHasIssuedCommunications: faker.datatype.string() }
    ])(
      'should not render TextArea when predecessorInfoHasIssuedCommunications is not true',
      ({ predecessorInfoHasIssuedCommunications }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakePredecessorInformationSection,
          formData: { ...fakePredecessorInformationSection.formData, predecessorInfoHasIssuedCommunications }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.predecessorInfoHasIssuedCommunicationsComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakePredecessorInformationSection,
          formData: {
            ...fakePredecessorInformationSection.formData,
            predecessorInfoHasIssuedCommunications: true
          }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender());
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.predecessorInfoHasIssuedCommunicationsComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when predecessorInfoHasIssuedCommunications is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.predecessorInfoHasIssuedCommunicationsComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'predecessorInfoHasIssuedCommunicationsComments';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoHasIssuedCommunicationsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoHasIssuedCommunicationsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoHasIssuedCommunicationsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakePredecessorInformationSection.formData.predecessorInfoHasIssuedCommunicationsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.predecessorInfoHasIssuedCommunicationsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoHasIssuedCommunicationsComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.predecessorInfoHasIssuedCommunicationsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('predecessorInfoHasRefusedReview', () => {
    it('renders predecessorInfoHasRefusedReview inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.predecessorInfoHasRefusedReview)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'predecessorInfoHasRefusedReview';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoHasRefusedReview)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '6. Has the predecessor accountant refused to allow us to review work papers?';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoHasRefusedReview)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options props', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoHasRefusedReview)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems props', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoHasRefusedReview)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue props', () => {
      const expectedValue = fakePredecessorInformationSection.formData.predecessorInfoHasRefusedReview;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.predecessorInfoHasRefusedReview)).toHaveAttribute(
        'selectedValue',
        expectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.predecessorInfoHasRefusedReview}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('predecessorInfoHasRefusedReviewComments', () => {
    it.each([
      { predecessorInfoHasRefusedReview: false },
      { predecessorInfoHasRefusedReview: null },
      { predecessorInfoHasRefusedReview: faker.datatype.string() }
    ])(
      'should not render TextArea when predecessorInfoHasRefusedReview is not true',
      ({ predecessorInfoHasRefusedReview }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakePredecessorInformationSection,
          formData: { ...fakePredecessorInformationSection.formData, predecessorInfoHasRefusedReview }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.predecessorInfoHasRefusedReviewComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakePredecessorInformationSection,
          formData: {
            ...fakePredecessorInformationSection.formData,
            predecessorInfoHasRefusedReview: true
          }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender());
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.predecessorInfoHasRefusedReviewComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when predecessorInfoHasRefusedReview is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.predecessorInfoHasRefusedReviewComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'predecessorInfoHasRefusedReviewComments';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoHasRefusedReviewComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoHasRefusedReviewComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoHasRefusedReviewComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakePredecessorInformationSection.formData.predecessorInfoHasRefusedReviewComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.predecessorInfoHasRefusedReviewComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoHasRefusedReviewComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.predecessorInfoHasRefusedReviewComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('predecessorInfoUnderstoodReasonForEngagingComments', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.predecessorInfoUnderstoodReasonForEngagingComments)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'predecessorInfoUnderstoodReasonForEngagingComments';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoUnderstoodReasonForEngagingComments)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        "7. What is the predecessor accountant's understanding of the reason for engaging a new firm?";
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoUnderstoodReasonForEngagingComments)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoUnderstoodReasonForEngagingComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue =
        fakePredecessorInformationSection.formData.predecessorInfoUnderstoodReasonForEngagingComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.predecessorInfoUnderstoodReasonForEngagingComments)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoUnderstoodReasonForEngagingComments)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.predecessorInfoUnderstoodReasonForEngagingComments}-${testIds.textAreaOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('predecessorInfoStatedReasonForEngagingComments', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.predecessorInfoStatedReasonForEngagingComments)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'predecessorInfoStatedReasonForEngagingComments';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoStatedReasonForEngagingComments)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = "8. What is the potential client's stated reason for engaging a new firm?";
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoStatedReasonForEngagingComments)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoStatedReasonForEngagingComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakePredecessorInformationSection.formData.predecessorInfoStatedReasonForEngagingComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.predecessorInfoStatedReasonForEngagingComments)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoStatedReasonForEngagingComments)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.predecessorInfoStatedReasonForEngagingComments}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('predecessorInfoDidIndicateResponseWasLimited', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.predecessorInfoDidIndicateResponseWasLimited)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'predecessorInfoDidIndicateResponseWasLimited';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoDidIndicateResponseWasLimited)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '9. Did the predecessor accountant indicate that their response to our inquiries was limited in anyway?';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoDidIndicateResponseWasLimited)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options props', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoDidIndicateResponseWasLimited)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems props', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.predecessorInfoDidIndicateResponseWasLimited)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue props', () => {
      const expectedValue = fakePredecessorInformationSection.formData.predecessorInfoDidIndicateResponseWasLimited;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.predecessorInfoDidIndicateResponseWasLimited)).toHaveAttribute(
        'selectedValue',
        expectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.predecessorInfoDidIndicateResponseWasLimited}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('predecessorInfoDidIndicateResponseWasLimitedComments', () => {
    it.each([
      { predecessorInfoDidIndicateResponseWasLimited: false },
      { predecessorInfoDidIndicateResponseWasLimited: null },
      { predecessorInfoDidIndicateResponseWasLimited: faker.datatype.string() }
    ])(
      'should not render TextArea when predecessorInfoDidIndicateResponseWasLimited is not true',
      ({ predecessorInfoDidIndicateResponseWasLimited }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakePredecessorInformationSection,
          formData: { ...fakePredecessorInformationSection.formData, predecessorInfoDidIndicateResponseWasLimited }
        });
        render(getComponentToRender(defaultProps));
        expect(
          screen.queryByTestId(testIds.predecessorInfoDidIndicateResponseWasLimitedComments)
        ).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakePredecessorInformationSection,
          formData: {
            ...fakePredecessorInformationSection.formData,
            predecessorInfoDidIndicateResponseWasLimited: true
          }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender());
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.predecessorInfoDidIndicateResponseWasLimitedComments)
        ).toBeInTheDocument();
      });

      it('should render TextArea when predecessorInfoDidIndicateResponseWasLimited is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.predecessorInfoDidIndicateResponseWasLimitedComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'predecessorInfoDidIndicateResponseWasLimitedComments';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoDidIndicateResponseWasLimitedComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoDidIndicateResponseWasLimitedComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoDidIndicateResponseWasLimitedComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct value prop', () => {
        const expectedValue =
          fakePredecessorInformationSection.formData.predecessorInfoDidIndicateResponseWasLimitedComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.predecessorInfoDidIndicateResponseWasLimitedComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.predecessorInfoDidIndicateResponseWasLimitedComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(
              `${testIds.predecessorInfoDidIndicateResponseWasLimitedComments}-${testIds.textAreaOnChange}`
            )
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
