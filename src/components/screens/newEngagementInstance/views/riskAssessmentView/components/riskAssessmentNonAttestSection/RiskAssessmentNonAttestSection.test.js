import ReactDOM from 'react-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import RiskAssessmentNonAttestSection from './RiskAssessmentNonAttestSection';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form headers
  formHeader: 'form-header',

  // form fields
  anyQuestionAboutCollectibility: 'any-question-about-collectibility',
  anyQuestionAboutCollectibilityComments: 'any-question-about-collectibility-comments',
  potentialForAdversarialPosition: 'potential-for-adversarial-position',
  potentialForAdversarialPositionComments: 'potential-for-adversarial-position-comments',
  concernAboutIntegrityOfManagement: 'concern-about-integrity-of-management',
  concernAboutIntegrityOfManagementComments: 'concern-about-integrity-of-management-comments',
  inconsistentWithFirmsFocus: 'inconsistent-with-firms-focus',
  inconsistentWithFirmsFocusComments: 'inconsistent-with-firms-focus-comments',
  mustAcquireSpecialKnowledge: 'must-acquire-special-knowledge',
  mustAcquireSpecialKnowledgeComments: 'must-acquire-special-knowledge-comments',
  expectationsAppearUnreasonable: 'expectations-appear-unreasonable',
  expectationsAppearUnreasonableComments: 'expectations-appear-unreasonable-comments',
  partneringWithOutsideConsultant: 'partnering-with-outside-consultant',
  partneringWithOutsideConsultantComments: 'partnering-with-outside-consultant-comments',
  mayCreateAdversarialPosition: 'may-create-adversarial-position',
  mayCreateAdversarialPositionComments: 'may-create-adversarial-position-comments',
  consultantAppearsToNeedStaff: 'consultant-appears-to-need-staff',
  consultantAppearsToNeedStaffComments: 'consultant-appears-to-need-staff-comments',
  firmWillHaveInsufficientControl: 'firm-will-have-insufficient-control',
  firmWillHaveInsufficientControlComments: 'firm-will-have-insufficient-control-comments',
  isEntityInternationallyActive: 'is-entity-internationally-active',
  isEntityInternationallyActiveComments: 'is-entity-internationally-active-comments',
  understandingOfRiskImpactComments: 'understanding-of-risk-impact-comments',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakeRiskAssessmentView = {
  formData: {
    anyQuestionAboutCollectibility: faker.random.alphaNumeric(10),
    potentialForAdversarialPosition: faker.random.alphaNumeric(10),
    potentialForAdversarialPositionComments: faker.random.alphaNumeric(10),
    concernAboutIntegrityOfManagement: faker.random.alphaNumeric(10),
    concernAboutIntegrityOfManagementComments: faker.random.alphaNumeric(10),
    inconsistentWithFirmsFocus: faker.random.alphaNumeric(10),
    inconsistentWithFirmsFocusComments: faker.random.alphaNumeric(10),
    mustAcquireSpecialKnowledge: faker.random.alphaNumeric(10),
    mustAcquireSpecialKnowledgeComments: faker.random.alphaNumeric(10),
    expectationsAppearUnreasonable: faker.random.alphaNumeric(10),
    expectationsAppearUnreasonableComments: faker.random.alphaNumeric(10),
    partneringWithOutsideConsultant: faker.random.alphaNumeric(10),
    partneringWithOutsideConsultantComments: faker.random.alphaNumeric(10),
    mayCreateAdversarialPosition: faker.random.alphaNumeric(10),
    mayCreateAdversarialPositionComments: faker.random.alphaNumeric(10),
    consultantAppearsToNeedStaff: faker.random.alphaNumeric(10),
    consultantAppearsToNeedStaffComments: faker.random.alphaNumeric(10),
    firmWillHaveInsufficientControl: faker.random.alphaNumeric(10),
    firmWillHaveInsufficientControlComments: faker.random.alphaNumeric(10),
    understandingOfRiskImpactComments: faker.random.alphaNumeric(10),
    isEntityInternationallyActive: faker.random.alphaNumeric(10),
    isEntityInternationallyActiveComments: faker.random.alphaNumeric(10)
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (prop) => {
  return <RiskAssessmentNonAttestSection {...prop} {...hocInjectedProps} />;
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
  default: ({ title, children }) => (
    <fake-collapsible-form-section title={title} data-testid={testIds.collapsibleFormSection}>
      {children}
    </fake-collapsible-form-section>
  )
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

describe('RiskAssessmentNonAttestSection', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeRiskAssessmentView);
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
      expect(within(collapsibleFormSection).getByTestId(testIds.formHeader)).toBeInTheDocument();
    });

    it('renders correct text prop', () => {
      const expectedText =
        'Any question marked as TBD must be replaced with YES/NO at Relationship Partner Final Approval step.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.formHeader)).toHaveAttribute('text', expectedText);
    });
  });

  describe('anyQuestionAboutCollectibility', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.anyQuestionAboutCollectibility)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'anyQuestionAboutCollectibility';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.anyQuestionAboutCollectibility)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '1. Given our knowledge of the financial strength of the client, is there any question about collectibility ' +
        'of our fees? Note : Consider conducting a formal credit check, collecting a retainer or setting credit ' +
        'limits if financial strength is questionable';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.anyQuestionAboutCollectibility)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.anyQuestionAboutCollectibility)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.anyQuestionAboutCollectibility;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.anyQuestionAboutCollectibility)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.anyQuestionAboutCollectibility)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.anyQuestionAboutCollectibility}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('potentialForAdversarialPosition', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.potentialForAdversarialPosition)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'potentialForAdversarialPosition';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.potentialForAdversarialPosition)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '2. Do we believe involvement with this client will create a potential for an adversarial position with ' +
        'another client or with another practice area in the firm?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.potentialForAdversarialPosition)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.potentialForAdversarialPosition)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.potentialForAdversarialPosition;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.potentialForAdversarialPosition)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.potentialForAdversarialPosition)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.potentialForAdversarialPosition}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('potentialForAdversarialPositionComments', () => {
    it.each([
      { potentialForAdversarialPosition: faker.random.alphaNumeric(10) },
      { potentialForAdversarialPosition: null }
    ])('should not render when potentialForAdversarialPosition is not Yes', ({ potentialForAdversarialPosition }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeRiskAssessmentView,
        formData: {
          ...fakeRiskAssessmentView.formData,
          potentialForAdversarialPosition
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.potentialForAdversarialPositionComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            potentialForAdversarialPosition: 'Yes'
          }
        });
      });

      it('should render when potentialForAdversarialPosition is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialForAdversarialPositionComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.potentialForAdversarialPositionComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'potentialForAdversarialPositionComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialForAdversarialPositionComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialForAdversarialPositionComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.potentialForAdversarialPositionComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialForAdversarialPositionComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialForAdversarialPositionComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialForAdversarialPositionComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.potentialForAdversarialPositionComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('concernAboutIntegrityOfManagement', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.concernAboutIntegrityOfManagement)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'concernAboutIntegrityOfManagement';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.concernAboutIntegrityOfManagement)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '3. Do we believe there is reason for concern about the integrity of management or other client ' +
        'personnel involved in the engagement(s)?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.concernAboutIntegrityOfManagement)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.concernAboutIntegrityOfManagement)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.concernAboutIntegrityOfManagement;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.concernAboutIntegrityOfManagement)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.concernAboutIntegrityOfManagement)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.concernAboutIntegrityOfManagement}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('concernAboutIntegrityOfManagementComments', () => {
    it.each([
      { concernAboutIntegrityOfManagement: faker.random.alphaNumeric(10) },
      { concernAboutIntegrityOfManagement: null }
    ])(
      'should not render when concernAboutIntegrityOfManagement is not Yes',
      ({ concernAboutIntegrityOfManagement }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            concernAboutIntegrityOfManagement
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.concernAboutIntegrityOfManagementComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            concernAboutIntegrityOfManagement: 'Yes'
          }
        });
      });

      it('should render when concernAboutIntegrityOfManagement is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.concernAboutIntegrityOfManagementComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.concernAboutIntegrityOfManagementComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'concernAboutIntegrityOfManagementComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.concernAboutIntegrityOfManagementComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.concernAboutIntegrityOfManagementComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.concernAboutIntegrityOfManagementComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.concernAboutIntegrityOfManagementComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.concernAboutIntegrityOfManagementComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.concernAboutIntegrityOfManagementComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.concernAboutIntegrityOfManagementComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('inconsistentWithFirmsFocus', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.inconsistentWithFirmsFocus)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'inconsistentWithFirmsFocus';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.inconsistentWithFirmsFocus)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        "4. Will acceptance of the engagement(s) be inconsistent with the firm's Focus & Choices strategic " +
        'planning goal?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.inconsistentWithFirmsFocus)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.inconsistentWithFirmsFocus)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.inconsistentWithFirmsFocus;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.inconsistentWithFirmsFocus)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.inconsistentWithFirmsFocus)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.inconsistentWithFirmsFocus}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('inconsistentWithFirmsFocusComments', () => {
    it.each([{ inconsistentWithFirmsFocus: faker.random.alphaNumeric(10) }, { inconsistentWithFirmsFocus: null }])(
      'should not render when inconsistentWithFirmsFocus is not Yes',
      ({ inconsistentWithFirmsFocus }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            inconsistentWithFirmsFocus
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.inconsistentWithFirmsFocusComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            inconsistentWithFirmsFocus: 'Yes'
          }
        });
      });

      it('should render when inconsistentWithFirmsFocus is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.inconsistentWithFirmsFocusComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.inconsistentWithFirmsFocusComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'inconsistentWithFirmsFocusComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.inconsistentWithFirmsFocusComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.inconsistentWithFirmsFocusComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.inconsistentWithFirmsFocusComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.inconsistentWithFirmsFocusComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.inconsistentWithFirmsFocusComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.inconsistentWithFirmsFocusComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.inconsistentWithFirmsFocusComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('mustAcquireSpecialKnowledge', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.mustAcquireSpecialKnowledge)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'mustAcquireSpecialKnowledge';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mustAcquireSpecialKnowledge)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '5. Does the Firm, the proposed engagement partner and engagement team currently need to acquire ' +
        'specialized knowledge and expertise necessary to complete the project(s)?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mustAcquireSpecialKnowledge)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mustAcquireSpecialKnowledge)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.mustAcquireSpecialKnowledge;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mustAcquireSpecialKnowledge)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mustAcquireSpecialKnowledge)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.mustAcquireSpecialKnowledge}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('mustAcquireSpecialKnowledgeComments', () => {
    it.each([{ mustAcquireSpecialKnowledge: faker.random.alphaNumeric(10) }, { mustAcquireSpecialKnowledge: null }])(
      'should not render when mustAcquireSpecialKnowledge is not Yes',
      ({ mustAcquireSpecialKnowledge }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            mustAcquireSpecialKnowledge
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.mustAcquireSpecialKnowledgeComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            mustAcquireSpecialKnowledge: 'Yes'
          }
        });
      });

      it('should render when mustAcquireSpecialKnowledge is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mustAcquireSpecialKnowledgeComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.mustAcquireSpecialKnowledgeComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'mustAcquireSpecialKnowledgeComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mustAcquireSpecialKnowledgeComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mustAcquireSpecialKnowledgeComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.mustAcquireSpecialKnowledgeComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mustAcquireSpecialKnowledgeComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mustAcquireSpecialKnowledgeComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mustAcquireSpecialKnowledgeComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.mustAcquireSpecialKnowledgeComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('expectationsAppearUnreasonable', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.expectationsAppearUnreasonable)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'expectationsAppearUnreasonable';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.expectationsAppearUnreasonable)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        "6. Do the client's expectations of the outcomes of the project(s) appear unreasonable and unachievable? " +
        "In responding, consider: top management's commitment of resources and implementation ability in " +
        'terms of client staff acceptance, levels, and knowledge and skills.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.expectationsAppearUnreasonable)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.expectationsAppearUnreasonable)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.expectationsAppearUnreasonable;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.expectationsAppearUnreasonable)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.expectationsAppearUnreasonable)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.expectationsAppearUnreasonable}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('expectationsAppearUnreasonableComments', () => {
    it.each([
      { expectationsAppearUnreasonable: faker.random.alphaNumeric(10) },
      { expectationsAppearUnreasonable: null }
    ])('should not render when expectationsAppearUnreasonable is not Yes', ({ expectationsAppearUnreasonable }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeRiskAssessmentView,
        formData: {
          ...fakeRiskAssessmentView.formData,
          expectationsAppearUnreasonable
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.expectationsAppearUnreasonableComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            expectationsAppearUnreasonable: 'Yes'
          }
        });
      });

      it('should render when expectationsAppearUnreasonable is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.expectationsAppearUnreasonableComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.expectationsAppearUnreasonableComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'expectationsAppearUnreasonableComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.expectationsAppearUnreasonableComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.expectationsAppearUnreasonableComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.expectationsAppearUnreasonableComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.expectationsAppearUnreasonableComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.expectationsAppearUnreasonableComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.expectationsAppearUnreasonableComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.expectationsAppearUnreasonableComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('partneringWithOutsideConsultant', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.partneringWithOutsideConsultant)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'partneringWithOutsideConsultant';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.partneringWithOutsideConsultant)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '7. Are we partnering with or subcontracting to an outside consultant? NOTE: Consult with engagement ' +
        'partner about the Process for Approval of Strategic Business Alliances or Affiliation Agreements ' +
        'approved by Policy Committee and related implementation guidance.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.partneringWithOutsideConsultant)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.partneringWithOutsideConsultant)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.partneringWithOutsideConsultant;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.partneringWithOutsideConsultant)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.partneringWithOutsideConsultant)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.partneringWithOutsideConsultant}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('partneringWithOutsideConsultantComments', () => {
    it.each([
      { partneringWithOutsideConsultant: faker.random.alphaNumeric(10) },
      { partneringWithOutsideConsultant: null }
    ])('should not render when partneringWithOutsideConsultant is not Yes', ({ partneringWithOutsideConsultant }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeRiskAssessmentView,
        formData: {
          ...fakeRiskAssessmentView.formData,
          partneringWithOutsideConsultant
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.partneringWithOutsideConsultantComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            partneringWithOutsideConsultant: 'Yes'
          }
        });
      });

      it('should render when partneringWithOutsideConsultant is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.partneringWithOutsideConsultantComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.partneringWithOutsideConsultantComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'partneringWithOutsideConsultantComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.partneringWithOutsideConsultantComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.partneringWithOutsideConsultantComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.partneringWithOutsideConsultantComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.partneringWithOutsideConsultantComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.partneringWithOutsideConsultantComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.partneringWithOutsideConsultantComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.partneringWithOutsideConsultantComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('mayCreateAdversarialPosition', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.mayCreateAdversarialPosition)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'mayCreateAdversarialPosition';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mayCreateAdversarialPosition)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        'a. Do we believe this arrangement will create a potential for an adversarial position between the ' +
        'outside consultant and the client?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mayCreateAdversarialPosition)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mayCreateAdversarialPosition)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.mayCreateAdversarialPosition;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mayCreateAdversarialPosition)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mayCreateAdversarialPosition)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.mayCreateAdversarialPosition}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('mayCreateAdversarialPositionComments', () => {
    it.each([{ mayCreateAdversarialPosition: faker.random.alphaNumeric(10) }, { mayCreateAdversarialPosition: null }])(
      'should not render when mayCreateAdversarialPosition is not Yes',
      ({ mayCreateAdversarialPosition }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            mayCreateAdversarialPosition
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.mayCreateAdversarialPositionComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            mayCreateAdversarialPosition: 'Yes'
          }
        });
      });

      it('should render when mayCreateAdversarialPosition is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mayCreateAdversarialPositionComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.mayCreateAdversarialPositionComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'mayCreateAdversarialPositionComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mayCreateAdversarialPositionComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mayCreateAdversarialPositionComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.mayCreateAdversarialPositionComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mayCreateAdversarialPositionComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mayCreateAdversarialPositionComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mayCreateAdversarialPositionComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.mayCreateAdversarialPositionComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('consultantAppearsToNeedStaff', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.consultantAppearsToNeedStaff)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'consultantAppearsToNeedStaff';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.consultantAppearsToNeedStaff)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        'b. Does the outside consultant appear to need the necessary staff, knowledge, and specific ' +
        'expertise to complete the engagement?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.consultantAppearsToNeedStaff)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.consultantAppearsToNeedStaff)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.consultantAppearsToNeedStaff;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.consultantAppearsToNeedStaff)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.consultantAppearsToNeedStaff)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.consultantAppearsToNeedStaff}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('consultantAppearsToNeedStaffComments', () => {
    it.each([{ consultantAppearsToNeedStaff: faker.random.alphaNumeric(10) }, { consultantAppearsToNeedStaff: null }])(
      'should not render when consultantAppearsToNeedStaff is not Yes',
      ({ consultantAppearsToNeedStaff }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            consultantAppearsToNeedStaff
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.consultantAppearsToNeedStaffComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            consultantAppearsToNeedStaff: 'Yes'
          }
        });
      });

      it('should render when consultantAppearsToNeedStaff is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.consultantAppearsToNeedStaffComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.consultantAppearsToNeedStaffComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'consultantAppearsToNeedStaffComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.consultantAppearsToNeedStaffComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.consultantAppearsToNeedStaffComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.consultantAppearsToNeedStaffComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.consultantAppearsToNeedStaffComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.consultantAppearsToNeedStaffComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.consultantAppearsToNeedStaffComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.consultantAppearsToNeedStaffComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('firmWillHaveInsufficientControl', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.firmWillHaveInsufficientControl)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'firmWillHaveInsufficientControl';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.firmWillHaveInsufficientControl)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'c. Will the Firm have sufficient control of the project to ensure successful completion?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.firmWillHaveInsufficientControl)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.firmWillHaveInsufficientControl)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRiskAssessmentView.formData.firmWillHaveInsufficientControl;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.firmWillHaveInsufficientControl)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.firmWillHaveInsufficientControl)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.firmWillHaveInsufficientControl}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('firmWillHaveInsufficientControlComments', () => {
    it.each([
      { firmWillHaveInsufficientControl: faker.random.alphaNumeric(10) },
      { firmWillHaveInsufficientControl: null }
    ])('should not render when firmWillHaveInsufficientControl is not Yes', ({ firmWillHaveInsufficientControl }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeRiskAssessmentView,
        formData: {
          ...fakeRiskAssessmentView.formData,
          firmWillHaveInsufficientControl
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.firmWillHaveInsufficientControlComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            firmWillHaveInsufficientControl: 'Yes'
          }
        });
      });

      it('should render when firmWillHaveInsufficientControl is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.firmWillHaveInsufficientControlComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.firmWillHaveInsufficientControlComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'firmWillHaveInsufficientControlComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.firmWillHaveInsufficientControlComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.firmWillHaveInsufficientControlComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.firmWillHaveInsufficientControlComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.firmWillHaveInsufficientControlComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.firmWillHaveInsufficientControlComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.firmWillHaveInsufficientControlComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.firmWillHaveInsufficientControlComments}-${testIds.textAreaOnChange}`)
          );
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
      const expectedLabel = '8. Is the entity internationally active?';
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

  describe('isEntityInternationallyActiveComments', () => {
    it.each([
      { isEntityInternationallyActive: faker.random.alphaNumeric(10) },
      { isEntityInternationallyActive: null }
    ])('should not render when isEntityInternationallyActive is not Yes', ({ isEntityInternationallyActive }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeRiskAssessmentView,
        formData: {
          ...fakeRiskAssessmentView.formData,
          isEntityInternationallyActive
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.isEntityInternationallyActiveComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeRiskAssessmentView,
          formData: {
            ...fakeRiskAssessmentView.formData,
            isEntityInternationallyActive: 'Yes'
          }
        });
      });

      it('should render when isEntityInternationallyActive is Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.isEntityInternationallyActiveComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.isEntityInternationallyActiveComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'isEntityInternationallyActiveComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.isEntityInternationallyActiveComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel =
          "If yes, describe how our work will involve client's international activity and how we expect to " +
          "handle client's international needs";
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.isEntityInternationallyActiveComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeRiskAssessmentView.formData.isEntityInternationallyActiveComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.isEntityInternationallyActiveComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.isEntityInternationallyActiveComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.isEntityInternationallyActiveComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.isEntityInternationallyActiveComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('understandingOfRiskImpactComments', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.understandingOfRiskImpactComments)).toBeInTheDocument();
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

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.understandingOfRiskImpactComments}-${testIds.textAreaOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });
});
