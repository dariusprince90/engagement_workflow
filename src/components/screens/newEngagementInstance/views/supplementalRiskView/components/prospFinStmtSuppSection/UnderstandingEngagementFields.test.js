import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import UnderstandingEngagementFields from './UnderstandingEngagementFields';

// **********************************************************************
// * constants

const testIds = {
  // form text
  formText: 'form-text',

  // form fields
  pfsEngagementEvaluationOfIntendedUse: 'pfs-engagement-evaluation-of-intended-use',
  pfsEngagementEvaluationOfCapitalRaisingActivities: 'pfs-engagement-evaluation-of-capital-raising-activities',
  pfsEngagementHasPlannedPublicOffering: 'pfs-engagement-has-planned-public-offering',
  pfsEngagementHasPlannedPrivateOffering: 'pfs-engagement-has-planned-private-offering',
  pfsEngagementPrivateOfferingIsLimited: 'pfs-engagement-private-offering-is-limited',
  pfsEngagementEvaluationOfOtherProfessionalsInvolved: 'pfs-engagement-evaluation-of-other-professionals-involved',
  pfsEngagementHasInsufficientAssets: 'pfs-engagement-has-insufficient-assets',
  pfsEngagementEvaluationOfEconomicSubstance: 'pfs-engagement-evaluation-of-economic-substance',
  pfsEngagementIsLimitedToInternalUse: 'pfs-engagement-is-limited-to-internal-use',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakeSupplementalRiskView = {
  formData: {
    pfsEngagementEvaluationOfIntendedUse: faker.random.alphaNumeric(10),
    pfsEngagementEvaluationOfCapitalRaisingActivities: faker.random.alphaNumeric(10),
    pfsEngagementHasPlannedPublicOffering: faker.random.alphaNumeric(10),
    pfsEngagementHasPlannedPrivateOffering: faker.random.alphaNumeric(10),
    pfsEngagementPrivateOfferingIsLimited: faker.random.alphaNumeric(10),
    pfsEngagementEvaluationOfOtherProfessionalsInvolved: faker.random.alphaNumeric(10),
    pfsEngagementHasInsufficientAssets: faker.random.alphaNumeric(10),
    pfsEngagementEvaluationOfEconomicSubstance: faker.random.alphaNumeric(10),
    pfsEngagementIsLimitedToInternalUse: faker.random.alphaNumeric(10)
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <UnderstandingEngagementFields {...props} {...hocInjectedProps} />;
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

describe('UnderstandingEngagementFields', () => {
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

  describe('understandingEngagement form text', () => {
    it('has correct text', () => {
      const expectedText = 'Understanding of the Engagement';
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

  describe('finalApprovalStep form text', () => {
    it('has correct text', () => {
      const expectedText =
        'Any question marked as TBD must be replaced with YES/NO at Relationship Partner Final Approval step.';
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

  describe('pfsEngagementEvaluationOfIntendedUse', () => {
    it('has correct name prop', () => {
      const expectedName = 'pfsEngagementEvaluationOfIntendedUse';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfIntendedUse)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '1. What is the intended use for the prospective financial statements?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfIntendedUse)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfIntendedUse)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfIntendedUse)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.pfsEngagementEvaluationOfIntendedUse;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfIntendedUse)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsEngagementEvaluationOfIntendedUse}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('pfsEngagementEvaluationOfCapitalRaisingActivities', () => {
    it('has correct name prop', () => {
      const expectedName = 'pfsEngagementEvaluationOfCapitalRaisingActivities';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfCapitalRaisingActivities)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '2. If the prospective financial statements are being prepared for use in capital-raising activities ' +
        '(debt or equity), describe in detail the nature, size and timing of the capital raise.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfCapitalRaisingActivities)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfCapitalRaisingActivities)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfCapitalRaisingActivities)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.pfsEngagementEvaluationOfCapitalRaisingActivities;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfCapitalRaisingActivities)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsEngagementEvaluationOfCapitalRaisingActivities}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('pfsEngagementHasPlannedPublicOffering', () => {
    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementHasPlannedPublicOffering)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'pfsEngagementHasPlannedPublicOffering';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementHasPlannedPublicOffering)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '3. Is there a planned public offering?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementHasPlannedPublicOffering)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementHasPlannedPublicOffering)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSupplementalRiskView.formData.pfsEngagementHasPlannedPublicOffering;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementHasPlannedPublicOffering)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsEngagementHasPlannedPublicOffering}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('pfsEngagementHasPlannedPrivateOffering', () => {
    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementHasPlannedPrivateOffering)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'pfsEngagementHasPlannedPrivateOffering';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementHasPlannedPrivateOffering)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '4. Is there a planned private offering?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementHasPlannedPrivateOffering)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementHasPlannedPrivateOffering)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSupplementalRiskView.formData.pfsEngagementHasPlannedPrivateOffering;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementHasPlannedPrivateOffering)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsEngagementHasPlannedPrivateOffering}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('pfsEngagementPrivateOfferingIsLimited', () => {
    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementPrivateOfferingIsLimited)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'pfsEngagementPrivateOfferingIsLimited';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementPrivateOfferingIsLimited)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '5. Will any private offering be limited to "sophisticated investors" or financially "qualified investors"?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementPrivateOfferingIsLimited)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementPrivateOfferingIsLimited)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSupplementalRiskView.formData.pfsEngagementPrivateOfferingIsLimited;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementPrivateOfferingIsLimited)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsEngagementPrivateOfferingIsLimited}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('pfsEngagementEvaluationOfOtherProfessionalsInvolved', () => {
    it('has correct name prop', () => {
      const expectedName = 'pfsEngagementEvaluationOfOtherProfessionalsInvolved';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfOtherProfessionalsInvolved)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '6. Identify the other professionals that will be involved in the capital raise (lawyers, underwriters, etc..):';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfOtherProfessionalsInvolved)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfOtherProfessionalsInvolved)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfOtherProfessionalsInvolved)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.pfsEngagementEvaluationOfOtherProfessionalsInvolved;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfOtherProfessionalsInvolved)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.pfsEngagementEvaluationOfOtherProfessionalsInvolved}-${testIds.textAreaOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('pfsEngagementHasInsufficientAssets', () => {
    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementHasInsufficientAssets)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'pfsEngagementHasInsufficientAssets';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementHasInsufficientAssets)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '7. Compare the proposed capital raise with the value of existing or potential collateral. If the deal ' +
        'goes bad, will there be insufficient assets or collateral to fully satisfy investors, thereby increasing our risk?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementHasInsufficientAssets)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementHasInsufficientAssets)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSupplementalRiskView.formData.pfsEngagementHasInsufficientAssets;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementHasInsufficientAssets)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsEngagementHasInsufficientAssets}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('pfsEngagementEvaluationOfEconomicSubstance', () => {
    it('has correct name prop', () => {
      const expectedName = 'pfsEngagementEvaluationOfEconomicSubstance';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfEconomicSubstance)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = '8. Provide an evaluation of the overall economic substance of the project or transaction.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfEconomicSubstance)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfEconomicSubstance)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfEconomicSubstance)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.pfsEngagementEvaluationOfEconomicSubstance;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementEvaluationOfEconomicSubstance)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsEngagementEvaluationOfEconomicSubstance}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('pfsEngagementIsLimitedToInternalUse', () => {
    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementIsLimitedToInternalUse)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'pfsEngagementIsLimitedToInternalUse';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementIsLimitedToInternalUse)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '9. Will the prospective financial statements be limited exclusively to internal use only ' +
        'and is that expectation reasonable in the circumstances?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementIsLimitedToInternalUse)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementIsLimitedToInternalUse)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSupplementalRiskView.formData.pfsEngagementIsLimitedToInternalUse;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsEngagementIsLimitedToInternalUse)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsEngagementIsLimitedToInternalUse}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });
});
