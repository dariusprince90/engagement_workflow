import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import UnderstandingClientFields from './UnderstandingClientFields';

// **********************************************************************
// * constants

const testIds = {
  //form text
  formText: 'form-text',

  // form fields
  pfsClientAreContinuingAccountants: 'pfs-client-are-continuing-accountants',
  pfsClientAreContinuingAccountantsComments: 'pfs-client-are-continuing-accountants-comments',
  pfsClientHasContactedReferralSources: 'pfs-client-has-contacted-referral-sources',
  pfsClientIdentifiedConcerns: 'pfs-client-identified-concerns',
  pfsClientEvaluationOfFinancialStrengthOfPrincipalParties:
    'pfs-client-evaluation-of-financial-strength-of-principal-parties',
  pfsClientEvaluationOfConsideringNatureOfIndustry: 'pfs-client-evaluation-of-considering-nature-of-industry',
  pfsClientEvaluationOfConsideringCompanysHistory: 'pfs-client-evaluation-of-considering-companys-history',
  pfsClientEvaluationOfConsideringNewVentures: 'pfs-client-evaluation-of-considering-new-ventures',
  pfsClientEvaluationOfLengthOfPeriodCovered: 'pfs-client-evaluation-of-length-of-period-covered',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakeSupplementalRiskView = {
  formData: {
    pfsClientAreContinuingAccountants: faker.random.alphaNumeric(10),
    pfsClientAreContinuingAccountantsComments: faker.random.alphaNumeric(10),
    pfsClientHasContactedReferralSources: faker.random.alphaNumeric(10),
    pfsClientIdentifiedConcerns: faker.random.alphaNumeric(10),
    pfsClientEvaluationOfFinancialStrengthOfPrincipalParties: faker.random.alphaNumeric(10),
    pfsClientEvaluationOfConsideringNatureOfIndustry: faker.random.alphaNumeric(10),
    pfsClientEvaluationOfConsideringCompanysHistory: faker.random.alphaNumeric(10),
    pfsClientEvaluationOfConsideringNewVentures: faker.random.alphaNumeric(10),
    pfsClientEvaluationOfLengthOfPeriodCovered: faker.random.alphaNumeric(10)
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <UnderstandingClientFields {...props} {...hocInjectedProps} />;
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

jest.mock('../../../../views/withNewEngagementInstanceViewData', () => (component) => component);

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

// **********************************************************************
// * unit tests

describe('UnderstandingClientFields', () => {
  // **********************************************************************
  // * setup

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

  describe('understandingClient form text', () => {
    it('has correct text', () => {
      const expectedText = 'Understanding of the Client';
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

  describe('tbdFinalApproval form text', () => {
    it('has correct text', () => {
      const expectedText = 'Any TBDs must be replaced with Yes or No by the Final Approval step.';
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[1]).toHaveTextContent(expectedText);
    });

    it('has correct applyEmphasis prop', () => {
      const expectedApplyEmphasis = true;
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[1]).toHaveAttribute('applyEmphasis', expectedApplyEmphasis.toString());
    });
  });

  describe('pfsClientAreContinuingAccountants', () => {
    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientAreContinuingAccountants)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'pfsClientAreContinuingAccountants';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientAreContinuingAccountants)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '1. Are we the continuing accountants?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientAreContinuingAccountants)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientAreContinuingAccountants)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSupplementalRiskView.formData.pfsClientAreContinuingAccountants;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientAreContinuingAccountants)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsClientAreContinuingAccountants}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('pfsClientAreContinuingAccountantsComments', () => {
    it.each([
      { pfsClientAreContinuingAccountants: null },
      { pfsClientAreContinuingAccountants: faker.random.alphaNumeric(10) }
    ])(
      'should not render TextArea when pfsClientAreContinuingAccountants is not No',
      ({ pfsClientAreContinuingAccountants }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSupplementalRiskView,
          formData: {
            ...fakeSupplementalRiskView.formData,
            pfsClientAreContinuingAccountants
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.pfsClientAreContinuingAccountantsComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSupplementalRiskView,
          formData: {
            ...fakeSupplementalRiskView.formData,
            pfsClientAreContinuingAccountants: 'No'
          }
        });
      });

      it('should render TextArea when pfsClientAreContinuingAccountants is No', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.pfsClientAreContinuingAccountantsComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'pfsClientAreContinuingAccountantsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.pfsClientAreContinuingAccountantsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If NO, describe the reason for not using continuing accountants.';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.pfsClientAreContinuingAccountantsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.pfsClientAreContinuingAccountantsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.pfsClientAreContinuingAccountantsComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeSupplementalRiskView.formData.pfsClientAreContinuingAccountantsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.pfsClientAreContinuingAccountantsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.pfsClientAreContinuingAccountantsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('pfsClientHasContactedReferralSources', () => {
    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientHasContactedReferralSources)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'pfsClientHasContactedReferralSources';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientHasContactedReferralSources)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '2. Have we contacted referral sources or other professionals, including the other professionals, ' +
        'involved in any capital raise, to investigate the background of the potential new client?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientHasContactedReferralSources)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientHasContactedReferralSources)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSupplementalRiskView.formData.pfsClientHasContactedReferralSources;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientHasContactedReferralSources)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsClientHasContactedReferralSources}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('pfsClientIdentifiedConcerns', () => {
    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientIdentifiedConcerns)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'pfsClientIdentifiedConcerns';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientIdentifiedConcerns)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '3. Did our investigation identify any concerns with the ethics and integrity of the potential new client?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientIdentifiedConcerns)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientIdentifiedConcerns)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSupplementalRiskView.formData.pfsClientIdentifiedConcerns;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientIdentifiedConcerns)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsClientIdentifiedConcerns}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('pfsClientEvaluationOfFinancialStrengthOfPrincipalParties', () => {
    it('has correct name prop', () => {
      const expectedName = 'pfsClientEvaluationOfFinancialStrengthOfPrincipalParties';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfFinancialStrengthOfPrincipalParties)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = '4. Provide an evaluation of the financial strength of the principal parties.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfFinancialStrengthOfPrincipalParties)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfFinancialStrengthOfPrincipalParties)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfFinancialStrengthOfPrincipalParties)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.pfsClientEvaluationOfFinancialStrengthOfPrincipalParties;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfFinancialStrengthOfPrincipalParties)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.pfsClientEvaluationOfFinancialStrengthOfPrincipalParties}-${testIds.textAreaOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('responsibilityFactors form text', () => {
    it('has correct text', () => {
      const expectedText =
        '5. Management must assume responsibility for the prospective financial statements and have the ability ' +
        "to determine the appropriateness of assumptions. To evaluating management's ability, we should consider " +
        'the following factors:';
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

  describe('pfsClientEvaluationOfConsideringNatureOfIndustry', () => {
    it('has correct name prop', () => {
      const expectedName = 'pfsClientEvaluationOfConsideringNatureOfIndustry';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfConsideringNatureOfIndustry)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        "- The nature of the industry and predictability of the company's operations. (The financial results of " +
        'certain industries may be subject to extreme fluctuation. Furthermore, such characteristics may be ' +
        'further evident within the company itself.)';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfConsideringNatureOfIndustry)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfConsideringNatureOfIndustry)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfConsideringNatureOfIndustry)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.pfsClientEvaluationOfConsideringNatureOfIndustry;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfConsideringNatureOfIndustry)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsClientEvaluationOfConsideringNatureOfIndustry}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('pfsClientEvaluationOfConsideringCompanysHistory', () => {
    it('has correct name prop', () => {
      const expectedName = 'pfsClientEvaluationOfConsideringCompanysHistory';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfConsideringCompanysHistory)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = "- The company's history/operations.";
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfConsideringCompanysHistory)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfConsideringCompanysHistory)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfConsideringCompanysHistory)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.pfsClientEvaluationOfConsideringCompanysHistory;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfConsideringCompanysHistory)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsClientEvaluationOfConsideringCompanysHistory}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('pfsClientEvaluationOfConsideringNewVentures', () => {
    it('has correct name prop', () => {
      const expectedName = 'pfsClientEvaluationOfConsideringNewVentures';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfConsideringNewVentures)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '- New ventures without an operating history may not be able to establish a basis for developing ' +
        'reasonable assumptions.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfConsideringNewVentures)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfConsideringNewVentures)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfConsideringNewVentures)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.pfsClientEvaluationOfConsideringNewVentures;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfConsideringNewVentures)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsClientEvaluationOfConsideringNewVentures}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('pfsClientEvaluationOfLengthOfPeriodCovered', () => {
    it('has correct name prop', () => {
      const expectedName = 'pfsClientEvaluationOfLengthOfPeriodCovered';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfLengthOfPeriodCovered)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '6. What is the length of the period covered by the prospective financial statements? Generally speaking, ' +
        'the reliability of prospective financial statements decreases in direct proportion to the length of the ' +
        'period covered. In some cases, a client may not have a reasonable basis for forecasting periods of ' +
        'more than 3 to 5 years. However, certain industries (e.g., certain real estate) may be highly predictable ' +
        "over a long period. Indicate management's knowledge of the industry based upon its experience and " +
        "other factors. Assess management's ability to determine appropriate assumptions and the extent to " +
        'which management may have to rely on us to help them develop such assumptions.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfLengthOfPeriodCovered)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfLengthOfPeriodCovered)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfLengthOfPeriodCovered)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.pfsClientEvaluationOfLengthOfPeriodCovered;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsClientEvaluationOfLengthOfPeriodCovered)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsClientEvaluationOfLengthOfPeriodCovered}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });
});
