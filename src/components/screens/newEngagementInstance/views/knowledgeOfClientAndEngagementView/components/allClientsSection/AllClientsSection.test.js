import ReactDOM from 'react-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import AllClientsSection from './AllClientsSection';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form fields
  creditLimit: 'credit-limit',
  inBankruptcyOrConsideringFiling: 'in-bankruptcy-or-considering-filing',
  engagementInvolvesLitigationSupport: 'engagement-involves-litigation-support',
  completedConflictCheck: 'completed-conflict-check',
  involvePerformingServicesOutsideOfArea: 'involve-performing-services-outside-of-area',
  statesInvolved: 'states-involved',
  knowledgeOfClientComments: 'knowledge-of-client-comments',
  isClientInternationallyActive: 'is-client-internationally-active',
  internationallyActiveClientCountryName: 'internationally-active-client-country-name',

  // form header fields
  finalApprovalStepFormHeader: 'final-approval-step-form-header',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change',

  //textBox events
  textBoxOnChange: 'text-box-on-change'
};

const fakeKnowledgeOfClientView = {
  formData: {
    creditLimit: faker.random.alphaNumeric(10),
    inBankruptcyOrConsideringFiling: faker.datatype.boolean(),
    engagementInvolvesLitigationSupport: faker.datatype.boolean(),
    completedConflictCheck: faker.datatype.boolean(),
    involvePerformingServicesOutsideOfArea: faker.datatype.boolean(),
    statesInvolved: faker.random.alphaNumeric(10),
    knowledgeOfClientComments: faker.random.alphaNumeric(10),
    isClientInternationallyActive: faker.datatype.boolean(),
    internationallyActiveClientCountryName: faker.random.alphaNumeric(10)
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <AllClientsSection {...props} {...hocInjectedProps} />;
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

jest.mock('../../../../components/textBox/TextBox', () => ({
  __esModule: true,
  default: ({ name, label, value, placeholder, onChange }) => {
    const props = { name, label, value, placeholder };
    return (
      <fake-text-box {...props} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.textBoxOnChange}`} onClick={onChange} />
      </fake-text-box>
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

describe('AllClientsSection', () => {
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
    const expectedTitle = 'All Clients';
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
      const expectedText = 'Any TBDs must be replaced with Yes or No by the Final Approval step.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.finalApprovalStepFormHeader)).toHaveAttribute('text', expectedText);
    });
  });

  describe('creditLimit', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.creditLimit)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'creditLimit';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creditLimit)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Credit Limit (A/R + WIP):';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creditLimit)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeKnowledgeOfClientView.formData.creditLimit;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creditLimit)).toHaveAttribute('value', expectedValue);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creditLimit)).toHaveAttribute('placeholder', expectedPlaceHolder);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.creditLimit}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('inBankruptcyOrConsideringFiling', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.inBankruptcyOrConsideringFiling)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'inBankruptcyOrConsideringFiling';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.inBankruptcyOrConsideringFiling)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Is the potential new or existing client in bankruptcy or contemplating bankruptcy filing?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.inBankruptcyOrConsideringFiling)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.inBankruptcyOrConsideringFiling)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.inBankruptcyOrConsideringFiling)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeKnowledgeOfClientView.formData.inBankruptcyOrConsideringFiling;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.inBankruptcyOrConsideringFiling)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.inBankruptcyOrConsideringFiling}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('engagementInvolvesLitigationSupport', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.engagementInvolvesLitigationSupport)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'engagementInvolvesLitigationSupport';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementInvolvesLitigationSupport)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Does this engagement involve litigation support?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementInvolvesLitigationSupport)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementInvolvesLitigationSupport)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementInvolvesLitigationSupport)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeKnowledgeOfClientView.formData.engagementInvolvesLitigationSupport;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.engagementInvolvesLitigationSupport)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.engagementInvolvesLitigationSupport}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('completedConflictCheck', () => {
    it.each([
      { engagementInvolvesLitigationSupport: false },
      { engagementInvolvesLitigationSupport: null },
      { engagementInvolvesLitigationSupport: faker.datatype.string() }
    ])(
      'should not render when engagementInvolvesLitigationSupport is not true',
      ({ engagementInvolvesLitigationSupport }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeKnowledgeOfClientView,
          formData: {
            ...fakeKnowledgeOfClientView.formData,
            engagementInvolvesLitigationSupport
          }
        });

        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.completedConflictCheck)).not.toBeInTheDocument();
      }
    );

    describe('rendering', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeKnowledgeOfClientView,
          formData: {
            ...fakeKnowledgeOfClientView.formData,
            engagementInvolvesLitigationSupport: true
          }
        });
      });

      it('should render when engagementInvolvesLitigationSupport equals true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.completedConflictCheck)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.completedConflictCheck)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'completedConflictCheck';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.completedConflictCheck)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, has a completed conflict check form been submitted to FVS?';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.completedConflictCheck)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct options prop', () => {
        const expectedOptions = YesNoRadioButtonListOptions;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.completedConflictCheck)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('has correct horizontalItems prop', () => {
        const expectedHorizontalItems = true;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.completedConflictCheck)).toHaveAttribute(
          'horizontalItems',
          expectedHorizontalItems.toString()
        );
      });

      it('has correct selectedValue prop', () => {
        const expectedSelectedValue = fakeKnowledgeOfClientView.formData.completedConflictCheck;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.completedConflictCheck)).toHaveAttribute(
          'selectedValue',
          expectedSelectedValue.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.completedConflictCheck}-${testIds.radioButtonListOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
        });
      });
    });
  });

  describe('involvePerformingServicesOutsideOfArea', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.involvePerformingServicesOutsideOfArea)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'involvePerformingServicesOutsideOfArea';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvePerformingServicesOutsideOfArea)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        'Will the engagement involve performing services in any state other than Colorado, Illinois, Michigan, or ' +
        'Ohio or in any other country? (If yes, the Licensing Coordinator will be notified to resolve Licensing issues.)';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvePerformingServicesOutsideOfArea)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvePerformingServicesOutsideOfArea)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvePerformingServicesOutsideOfArea)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeKnowledgeOfClientView.formData.involvePerformingServicesOutsideOfArea;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvePerformingServicesOutsideOfArea)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.involvePerformingServicesOutsideOfArea}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('statesInvolved', () => {
    it.each([
      { involvePerformingServicesOutsideOfArea: 'No' },
      { involvePerformingServicesOutsideOfArea: null },
      { involvePerformingServicesOutsideOfArea: faker.datatype.string() }
    ])(
      'should not render when involvePerformingServicesOutsideOfArea not Yes',
      ({ involvePerformingServicesOutsideOfArea }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeKnowledgeOfClientView,
          formData: {
            ...fakeKnowledgeOfClientView.formData,
            involvePerformingServicesOutsideOfArea
          }
        });

        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.statesInvolved)).not.toBeInTheDocument();
      }
    );

    describe('rendering', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeKnowledgeOfClientView,
          formData: {
            ...fakeKnowledgeOfClientView.formData,
            involvePerformingServicesOutsideOfArea: 'Yes'
          }
        });
      });

      it('should render when involvePerformingServicesOutsideOfArea equals Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.statesInvolved)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.statesInvolved)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'statesInvolved';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.statesInvolved)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, which states/countries?';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.statesInvolved)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeKnowledgeOfClientView.formData.statesInvolved;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.statesInvolved)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.statesInvolved)).toHaveAttribute('placeholder', expectedPlaceHolder);
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.statesInvolved)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.statesInvolved}-${testIds.textAreaOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
        });
      });
    });
  });

  describe('knowledgeOfClientComments', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.knowledgeOfClientComments)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'knowledgeOfClientComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.knowledgeOfClientComments)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Explanations/Commentary to assist approvers in understanding knowledge of client:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.knowledgeOfClientComments)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeKnowledgeOfClientView.formData.knowledgeOfClientComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.knowledgeOfClientComments)).toHaveAttribute('value', expectedValue);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.knowledgeOfClientComments)).toHaveAttribute('placeholder', expectedPlaceHolder);
    });

    it('has correct rows prop', () => {
      const expectedRows = '6';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.knowledgeOfClientComments)).toHaveAttribute('rows', expectedRows);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.knowledgeOfClientComments}-${testIds.textAreaOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('isClientInternationallyActive', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.isClientInternationallyActive)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'isClientInternationallyActive';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isClientInternationallyActive)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Is the client internationally active?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isClientInternationallyActive)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isClientInternationallyActive)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isClientInternationallyActive)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeKnowledgeOfClientView.formData.isClientInternationallyActive;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isClientInternationallyActive)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.isClientInternationallyActive}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('internationallyActiveClientCountryName', () => {
    it.each([
      { isClientInternationallyActive: false },
      { isClientInternationallyActive: null },
      { isClientInternationallyActive: faker.datatype.string() }
    ])('should not render when isClientInternationallyActive is not true', ({ isClientInternationallyActive }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeKnowledgeOfClientView,
        formData: {
          ...fakeKnowledgeOfClientView.formData,
          isClientInternationallyActive
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.internationallyActiveClientCountryName)).not.toBeInTheDocument();
    });

    describe('rendering', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeKnowledgeOfClientView,
          formData: {
            ...fakeKnowledgeOfClientView.formData,
            isClientInternationallyActive: true
          }
        });
      });

      it('should render when isClientInternationallyActive equals true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.internationallyActiveClientCountryName)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.internationallyActiveClientCountryName)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'internationallyActiveClientCountryName';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.internationallyActiveClientCountryName)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, indicate which country:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.internationallyActiveClientCountryName)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeKnowledgeOfClientView.formData.internationallyActiveClientCountryName;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.internationallyActiveClientCountryName)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.internationallyActiveClientCountryName)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.internationallyActiveClientCountryName}-${testIds.textBoxOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
        });
      });
    });
  });
});
