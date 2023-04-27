import ReactDOM from 'react-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import EngagementInformationNonAttestSection from './EngagementInformationNonAttestSection';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form fields
  doSituationsApply: 'do-situations-apply',
  pmCurrentlyProvidesAttest: 'pm-currently-provides-attest',
  relatedEntityComments: 'related-entity-comments',
  subjectToSecOrGaoRuleId: 'subject-to-sec-or-gao-rule-id',
  mustComplyWithSecDueToRegulation: 'must-comply-with-sec-due-to-regulation',
  relatedAttestPartnerStaffNumber: 'related-attest-partner-staff-number',
  relevantComments: 'relevant-comments',
  preparedFederalTaxReturnLastYear: 'prepared-federal-tax-return-last-year',
  taxColleagueStaffNumber: 'tax-colleague-staff-number',
  taxYearEndMonth: 'tax-year-end-month',

  // selectBox events
  selectBoxOnChange: 'select-box-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textBox events
  textBoxOnChange: 'text-box-on-change'
};

const fakeEngagementInfoView = {
  formData: {
    id: faker.datatype.number(),
    doSituationsApply: faker.datatype.boolean(),
    pmCurrentlyProvidesAttest: faker.datatype.boolean(),
    relatedEntityComments: faker.random.alphaNumeric(10),
    subjectToSecOrGaoRuleId: faker.datatype.number(),
    mustComplyWithSecDueToRegulation: faker.datatype.boolean(),
    relatedAttestPartnerStaffNumber: faker.datatype.number(),
    relevantComments: faker.random.alphaNumeric(10),
    preparedFederalTaxReturnLastYear: faker.datatype.boolean(),
    taxColleagueStaffNumber: faker.datatype.number(),
    taxYearEndMonth: faker.datatype.number()
  }
};

const fakeNewEngagementInstance = {
  isNewClient: faker.datatype.boolean()
};

const fakeLookups = {
  months: {
    data: [],
    isLoading: faker.datatype.boolean(),
    loadingText: faker.random.alphaNumeric(10),
    error: null
  },
  subjectToSecOrGaoRules: {
    data: [],
    isLoading: faker.datatype.boolean(),
    loadingText: faker.random.alphaNumeric(10),
    hasError: faker.datatype.boolean(),
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
  return <EngagementInformationNonAttestSection {...props} {...hocInjectedProps} />;
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
    selectLookups: jest.fn(),
    selectNewEngagementInstance: jest.fn()
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

// **********************************************************************
// * unit tests

describe('EngagementInformationNonAttestSection', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeEngagementInfoView);
    newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(fakeNewEngagementInstance);
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

  it('renders CollapsibleFormSection component with correct title prop', () => {
    const expectedTitle = 'Engagement Information';
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
  });

  describe('doSituationsApply', () => {
    it('does not render when new client  true', () => {
      newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
        ...fakeNewEngagementInstance,
        isNewClient: true
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.doSituationsApply)).not.toBeInTheDocument();
    });

    describe('rendering', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isNewClient: false
        });
      });

      it('renders when existing client  true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.doSituationsApply)).toBeInTheDocument();
      });

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
        expect(screen.getByTestId(testIds.doSituationsApply)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct options prop', () => {
        const expectedOptions = YesNoRadioButtonListOptions;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.doSituationsApply)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
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
  });

  describe('pmCurrentlyProvidesAttest', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.pmCurrentlyProvidesAttest)).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pmCurrentlyProvidesAttest)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'pmCurrentlyProvidesAttest';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pmCurrentlyProvidesAttest)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        'Does Company currently provide attest services for this client or for a related entity? This includes personal financial statements.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pmCurrentlyProvidesAttest)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pmCurrentlyProvidesAttest)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeEngagementInfoView.formData.pmCurrentlyProvidesAttest;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pmCurrentlyProvidesAttest)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.pmCurrentlyProvidesAttest}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('relatedEntityComments', () => {
    it('does not render when pmCurrentlyProvidesAttest false', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeEngagementInfoView,
        formData: {
          ...fakeEngagementInfoView.formData,
          pmCurrentlyProvidesAttest: false
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.relatedEntityComments)).not.toBeInTheDocument();
    });

    describe('rendering', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeEngagementInfoView,
          formData: {
            ...fakeEngagementInfoView.formData,
            pmCurrentlyProvidesAttest: true
          }
        });
      });

      it('renders when pmCurrentlyProvidesAttest equals Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.relatedEntityComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.relatedEntityComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'relatedEntityComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.relatedEntityComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If a related entity, identify the related entity or individuals';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.relatedEntityComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.relatedEntityComments)).toHaveAttribute('placeholder', expectedPlaceHolder);
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.relatedEntityComments)).toHaveAttribute('rows', expectedRows.toString());
      });

      it('has correct value prop', () => {
        const expectedValue = fakeEngagementInfoView.formData.relatedEntityComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.relatedEntityComments)).toHaveAttribute('value', expectedValue);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.relatedEntityComments}-${testIds.textAreaOnChange}`));
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
      const expectedLabel = 'Will this client be subject to SEC GAO or other independence rules?';
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

  describe('mustComplyWithSecDueToRegulation', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.mustComplyWithSecDueToRegulation)).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mustComplyWithSecDueToRegulation)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'mustComplyWithSecDueToRegulation';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mustComplyWithSecDueToRegulation)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        'Will this client be a Non SEC registrant that must comply with SEC independence rules due to regulation?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mustComplyWithSecDueToRegulation)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mustComplyWithSecDueToRegulation)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeEngagementInfoView.formData.mustComplyWithSecDueToRegulation;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mustComplyWithSecDueToRegulation)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.mustComplyWithSecDueToRegulation}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('relatedAttestPartnerStaffNumber', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.relatedAttestPartnerStaffNumber)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'relatedAttestPartnerStaffNumber';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.relatedAttestPartnerStaffNumber)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Related Attest Partner:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.relatedAttestPartnerStaffNumber)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.relatedAttestPartnerStaffNumber)).toHaveAttribute(
        'placeholder',
        'Start typing to select attest partner.'
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeEngagementInfoView.formData.relatedAttestPartnerStaffNumber;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.relatedAttestPartnerStaffNumber)).toHaveAttribute(
        'value',
        expectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.relatedAttestPartnerStaffNumber}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('relevantComments', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.relevantComments)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'relevantComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.relevantComments)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        'Please provide any additional explanations/commentary that will assist approvers in understanding the expected fees or the nature of the engagement:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.relevantComments)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = '';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.relevantComments)).toHaveAttribute('placeholder', expectedPlaceHolder);
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.relevantComments)).toHaveAttribute('rows', expectedRows.toString());
    });

    it('has correct value prop', () => {
      const expectedValue = fakeEngagementInfoView.formData.relevantComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.relevantComments)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.relevantComments}-${testIds.textAreaOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('preparedFederalTaxReturnLastYear', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.preparedFederalTaxReturnLastYear)).toBeInTheDocument();
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.preparedFederalTaxReturnLastYear)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'preparedFederalTaxReturnLastYear';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.preparedFederalTaxReturnLastYear)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Have we prepared the federal tax return for this client in the last year?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.preparedFederalTaxReturnLastYear)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.preparedFederalTaxReturnLastYear)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeEngagementInfoView.formData.preparedFederalTaxReturnLastYear;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.preparedFederalTaxReturnLastYear)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.preparedFederalTaxReturnLastYear}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('taxColleagueStaffNumber', () => {
    it('does not render when existing client  true', () => {
      newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
        ...fakeNewEngagementInstance,
        isNewClient: false
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.taxColleagueStaffNumber)).not.toBeInTheDocument();
    });

    describe('rendering', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isNewClient: true
        });
      });

      it('renders when new client  true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxColleagueStaffNumber)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.taxColleagueStaffNumber)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'taxColleagueStaffNumber';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxColleagueStaffNumber)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Please select the Tax Colleague you’re working with:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxColleagueStaffNumber)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Start typing to select a tax colleague';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxColleagueStaffNumber)).toHaveAttribute('placeholder', expectedPlaceHolder);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeEngagementInfoView.formData.taxColleagueStaffNumber;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxColleagueStaffNumber)).toHaveAttribute('value', expectedValue.toString());
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.taxColleagueStaffNumber}-${testIds.textBoxOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
        });
      });
    });
  });

  describe('taxYearEndMonth', () => {
    it('does not render when existing client  true', () => {
      newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
        ...fakeNewEngagementInstance,
        isNewClient: false
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.taxYearEndMonth)).not.toBeInTheDocument();
    });

    describe('rendering', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
          ...fakeNewEngagementInstance,
          isNewClient: true
        });
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Tax Return Year End:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxYearEndMonth)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct defaultOption prop', () => {
        const expectedDefaultOption = 'Select Tax Return Year End';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxYearEndMonth)).toHaveAttribute('defaultOption', expectedDefaultOption);
      });

      it('has correct isLoading prop', () => {
        const expectedIsLoading = faker.datatype.boolean();
        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          months: { ...fakeLookups.months, isLoading: expectedIsLoading }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxYearEndMonth)).toHaveAttribute('isLoading', expectedIsLoading.toString());
      });

      it('has correct loadingText prop', () => {
        const expectedLoadingText = 'Loading verticals...';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxYearEndMonth)).toHaveAttribute('loadingText', expectedLoadingText);
      });

      it('has correct options prop when months.data is empty', () => {
        // * ARRANGE
        const expectedOptions = [];
        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          months: { ...fakeLookups.months, data: [] }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.taxYearEndMonth)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });

      it('has correct options prop when months.data is not empty', () => {
        // * ARRANGE
        const itemCount = faker.datatype.number({ min: 1, max: 20 });
        const months = [...Array(itemCount).keys()].map(() => ({
          displayName: faker.random.alphaNumeric(10),
          id: faker.datatype.number()
        }));
        const expectedOptions = months.map((month) => ({
          value: month.id,
          text: month.displayName
        }));
        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          months: { ...fakeLookups.months, data: months }
        });

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(screen.getByTestId(testIds.taxYearEndMonth)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });

      it('has correct value prop', () => {
        // * ARRANGE
        const taxYearEndMonth = faker.datatype.number();
        const EngagementInfoView = {
          ...fakeEngagementInfoView,
          formData: { ...fakeEngagementInfoView.formData, taxYearEndMonth }
        };
        const expectedValue = taxYearEndMonth;
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(EngagementInfoView);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(screen.getByTestId(testIds.taxYearEndMonth)).toHaveAttribute('value', expectedValue.toString());
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.taxYearEndMonth}-${testIds.selectBoxOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
        });
      });
    });
  });
});
