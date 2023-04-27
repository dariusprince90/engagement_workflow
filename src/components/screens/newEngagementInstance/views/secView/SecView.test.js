import ReactDOM from 'react-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import YesNoRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import newEngagementInstanceSlice from '../../newEngagementInstanceSlice';
import SecView from './SecView';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form fields
  mattersSubjectToScrutinyOrTestingInOtherServices: 'matters-subject-to-scrutiny-or-testing-in-other-services',
  mattersSubjectToScrutinyOrTestingInOtherServicesComments:
    'matters-subject-to-scrutiny-or-testing-in-other-services-comments',
  roleInDeterminingAmountsInFinancialReporting: 'role-in-determining-amounts-in-financial-reporting',
  roleInDeterminingAmountsInFinancialReportingComments: 'role-in-determining-amounts-in-financial-reporting-comments',
  roleInCustodyOfAssets: 'role-in-custody-of-assets',
  roleInCustodyOfAssetsComments: 'role-in-custody-of-assets-comments',
  abilityToAuthorizeTransactions: 'ability-to-authorize-transactions',
  abilityToAuthorizeTransactionsComments: 'ability-to-authorize-transactions-comments',
  roleInDesignOfFinancialInfoSystems: 'role-in-design-of-financial-info-systems',
  roleInDesignOfFinancialInfoSystemsComments: 'role-in-design-of-financial-info-systems-comments',
  roleInOperatingFinancialSystems: 'role-in-operating-financial-systems',
  roleInOperatingFinancialSystemsComments: 'role-in-operating-financial-systems-comments',
  roleInOperatingDecisions: 'role-in-operating-decisions',
  roleInOperatingDecisionsComments: 'role-in-operating-decisions-comments',
  roleInManagementFunctions: 'role-in-management-functions',
  roleInManagementFunctionsComments: 'role-in-management-functions-comments',
  roleInClientStaffing: 'role-in-client-staffing',
  roleInClientStaffingComments: 'role-in-client-staffing-comments',
  advocateInRegulatoryProceedings: 'advocate-in-regulatory-proceedings',
  advocateInRegulatoryProceedingsComments: 'advocate-in-regulatory-proceedings-comments',
  creationOfMutualInterest: 'creation-of-mutual-interest',
  creationOfMutualInterestComments: 'creation-of-mutual-interest-comments',
  taxServicesToPersonInOversightRole: 'tax-services-to-person-in-oversight-role',
  taxServicesToPersonInOversightRoleComments: 'tax-services-to-person-in-oversight-role-comments',
  involvementComparedToSecLimitations: 'involvement-compared-to-sec-limitations',

  // form headers
  proposedProjectInvolveFormHeader: 'proposed-project-involve-form-header',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakeSecView = {
  formData: {
    mattersSubjectToScrutinyOrTestingInOtherServices: faker.datatype.boolean(),
    mattersSubjectToScrutinyOrTestingInOtherServicesComments: faker.random.alphaNumeric(10),
    roleInDeterminingAmountsInFinancialReporting: faker.datatype.boolean(),
    roleInDeterminingAmountsInFinancialReportingComments: faker.random.alphaNumeric(10),
    roleInCustodyOfAssets: faker.datatype.boolean(),
    roleInCustodyOfAssetsComments: faker.random.alphaNumeric(10),
    abilityToAuthorizeTransactions: faker.datatype.boolean(),
    abilityToAuthorizeTransactionsComments: faker.random.alphaNumeric(10),
    roleInDesignOfFinancialInfoSystems: faker.datatype.boolean(),
    roleInDesignOfFinancialInfoSystemsComments: faker.random.alphaNumeric(10),
    roleInOperatingFinancialSystems: faker.datatype.boolean(),
    roleInOperatingFinancialSystemsComments: faker.random.alphaNumeric(10),
    roleInOperatingDecisions: faker.datatype.boolean(),
    roleInOperatingDecisionsComments: faker.random.alphaNumeric(10),
    roleInManagementFunctions: faker.datatype.boolean(),
    roleInManagementFunctionsComments: faker.random.alphaNumeric(10),
    roleInClientStaffing: faker.datatype.boolean(),
    roleInClientStaffingComments: faker.random.alphaNumeric(10),
    advocateInRegulatoryProceedings: faker.datatype.boolean(),
    advocateInRegulatoryProceedingsComments: faker.random.alphaNumeric(10),
    creationOfMutualInterest: faker.datatype.boolean(),
    creationOfMutualInterestComments: faker.random.alphaNumeric(10),
    taxServicesToPersonInOversightRole: faker.datatype.boolean(),
    taxServicesToPersonInOversightRoleComments: faker.random.alphaNumeric(10),
    involvementComparedToSecLimitations: faker.random.alphaNumeric(10)
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <SecView {...props} {...hocInjectedProps} />;
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

jest.mock('../../newEngagementInstanceSlice', () => {
  return {
    selectCurrentView: jest.fn()
  };
});

jest.mock('../withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ title, children }) => {
    const props = { title, children };
    return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
  }
}));

jest.mock('../../../../common/formHeader/FormHeader', () => {
  return {
    __esModule: true,
    default: ({ text }) => {
      const props = { text };
      return <fake-form-header {...props} data-testid={testIds.proposedProjectInvolveFormHeader} />;
    }
  };
});

jest.mock('../../components/radioButtonList/RadioButtonList', () => ({
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

jest.mock('../../components/textArea/TextArea', () => ({
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

describe('SecView', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeSecView);
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
    const expectedTitle = 'Independence Analysis';
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
  });

  describe('proposedProjectInvolve form header', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.proposedProjectInvolveFormHeader)).toBeInTheDocument();
    });

    it('renders correct text prop', () => {
      const expectedText = 'SEC: Will the proposed project involve:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.proposedProjectInvolveFormHeader)).toHaveAttribute('text', expectedText);
    });
  });

  describe('mattersSubjectToScrutinyOrTestingInOtherServices', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.mattersSubjectToScrutinyOrTestingInOtherServices)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'mattersSubjectToScrutinyOrTestingInOtherServices';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mattersSubjectToScrutinyOrTestingInOtherServices)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '1. Any matters that will be subject to scrutiny or testing in other PM audit or assurance services?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mattersSubjectToScrutinyOrTestingInOtherServices)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mattersSubjectToScrutinyOrTestingInOtherServices)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mattersSubjectToScrutinyOrTestingInOtherServices)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSecView.formData.mattersSubjectToScrutinyOrTestingInOtherServices;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.mattersSubjectToScrutinyOrTestingInOtherServices)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.mattersSubjectToScrutinyOrTestingInOtherServices}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('mattersSubjectToScrutinyOrTestingInOtherServicesComments', () => {
    it.each([
      { mattersSubjectToScrutinyOrTestingInOtherServices: false },
      { mattersSubjectToScrutinyOrTestingInOtherServices: null },
      { mattersSubjectToScrutinyOrTestingInOtherServices: faker.datatype.string() }
    ])(
      'should not render when mattersSubjectToScrutinyOrTestingInOtherServices is not true',
      ({ mattersSubjectToScrutinyOrTestingInOtherServices }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSecView,
          formData: {
            ...fakeSecView.formData,
            mattersSubjectToScrutinyOrTestingInOtherServices
          }
        });
        render(getComponentToRender(defaultProps));
        expect(
          screen.queryByTestId(testIds.mattersSubjectToScrutinyOrTestingInOtherServicesComments)
        ).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSecView,
          formData: {
            ...fakeSecView.formData,
            mattersSubjectToScrutinyOrTestingInOtherServices: true
          }
        });
      });

      it('should render when mattersSubjectToScrutinyOrTestingInOtherServices is true', () => {
        render(getComponentToRender(defaultProps));
        expect(
          screen.getByTestId(testIds.mattersSubjectToScrutinyOrTestingInOtherServicesComments)
        ).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.mattersSubjectToScrutinyOrTestingInOtherServicesComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'mattersSubjectToScrutinyOrTestingInOtherServicesComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mattersSubjectToScrutinyOrTestingInOtherServicesComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mattersSubjectToScrutinyOrTestingInOtherServicesComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeSecView.formData.mattersSubjectToScrutinyOrTestingInOtherServicesComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mattersSubjectToScrutinyOrTestingInOtherServicesComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mattersSubjectToScrutinyOrTestingInOtherServicesComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.mattersSubjectToScrutinyOrTestingInOtherServicesComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(
              `${testIds.mattersSubjectToScrutinyOrTestingInOtherServicesComments}-${testIds.textAreaOnChange}`
            )
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInDeterminingAmountsInFinancialReporting', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.roleInDeterminingAmountsInFinancialReporting)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInDeterminingAmountsInFinancialReporting';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDeterminingAmountsInFinancialReporting)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = '2. Any role in a process for determining amounts used in financial reporting?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDeterminingAmountsInFinancialReporting)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDeterminingAmountsInFinancialReporting)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDeterminingAmountsInFinancialReporting)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSecView.formData.roleInDeterminingAmountsInFinancialReporting;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDeterminingAmountsInFinancialReporting)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.roleInDeterminingAmountsInFinancialReporting}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('roleInDeterminingAmountsInFinancialReportingComments', () => {
    it.each([
      { roleInDeterminingAmountsInFinancialReporting: false },
      { roleInDeterminingAmountsInFinancialReporting: null },
      { roleInDeterminingAmountsInFinancialReporting: faker.datatype.string() }
    ])(
      'should not render when roleInDeterminingAmountsInFinancialReporting is not true',
      ({ roleInDeterminingAmountsInFinancialReporting }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSecView,
          formData: {
            ...fakeSecView.formData,
            roleInDeterminingAmountsInFinancialReporting
          }
        });
        render(getComponentToRender(defaultProps));
        expect(
          screen.queryByTestId(testIds.roleInDeterminingAmountsInFinancialReportingComments)
        ).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSecView,
          formData: {
            ...fakeSecView.formData,
            roleInDeterminingAmountsInFinancialReporting: true
          }
        });
      });

      it('should render when roleInDeterminingAmountsInFinancialReporting is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDeterminingAmountsInFinancialReportingComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInDeterminingAmountsInFinancialReportingComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInDeterminingAmountsInFinancialReportingComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDeterminingAmountsInFinancialReportingComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDeterminingAmountsInFinancialReportingComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeSecView.formData.roleInDeterminingAmountsInFinancialReportingComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDeterminingAmountsInFinancialReportingComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDeterminingAmountsInFinancialReportingComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDeterminingAmountsInFinancialReportingComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(
              `${testIds.roleInDeterminingAmountsInFinancialReportingComments}-${testIds.textAreaOnChange}`
            )
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInCustodyOfAssets', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.roleInCustodyOfAssets)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInCustodyOfAssets';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCustodyOfAssets)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '3. Any role in custody or control of client assets?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCustodyOfAssets)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCustodyOfAssets)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCustodyOfAssets)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSecView.formData.roleInCustodyOfAssets;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInCustodyOfAssets)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.roleInCustodyOfAssets}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('roleInCustodyOfAssetsComments', () => {
    it.each([
      { roleInCustodyOfAssets: false },
      { roleInCustodyOfAssets: null },
      { roleInCustodyOfAssets: faker.datatype.string() }
    ])('should not render when roleInCustodyOfAssets is not true', ({ roleInCustodyOfAssets }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeSecView,
        formData: {
          ...fakeSecView.formData,
          roleInCustodyOfAssets
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.roleInCustodyOfAssetsComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSecView,
          formData: {
            ...fakeSecView.formData,
            roleInCustodyOfAssets: true
          }
        });
      });

      it('should render when roleInCustodyOfAssets is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOfAssetsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.roleInCustodyOfAssetsComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInCustodyOfAssetsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOfAssetsComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOfAssetsComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeSecView.formData.roleInCustodyOfAssetsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOfAssetsComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOfAssetsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInCustodyOfAssetsComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.roleInCustodyOfAssetsComments}-${testIds.textAreaOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('abilityToAuthorizeTransactions', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.abilityToAuthorizeTransactions)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'abilityToAuthorizeTransactions';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.abilityToAuthorizeTransactions)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '4. Any ability to authorize, approve or consummate transactions or ' +
        'exercise any form of authority on behalf of the client?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.abilityToAuthorizeTransactions)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.abilityToAuthorizeTransactions)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.abilityToAuthorizeTransactions)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSecView.formData.abilityToAuthorizeTransactions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.abilityToAuthorizeTransactions)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.abilityToAuthorizeTransactions}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('abilityToAuthorizeTransactionsComments', () => {
    it.each([
      { abilityToAuthorizeTransactions: false },
      { abilityToAuthorizeTransactions: null },
      { abilityToAuthorizeTransactions: faker.datatype.string() }
    ])('should not render when abilityToAuthorizeTransactions is not true', ({ abilityToAuthorizeTransactions }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeSecView,
        formData: {
          ...fakeSecView.formData,
          abilityToAuthorizeTransactions
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.abilityToAuthorizeTransactionsComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSecView,
          formData: {
            ...fakeSecView.formData,
            abilityToAuthorizeTransactions: true
          }
        });
      });

      it('should render when abilityToAuthorizeTransactions is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.abilityToAuthorizeTransactionsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'abilityToAuthorizeTransactionsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeSecView.formData.abilityToAuthorizeTransactionsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.abilityToAuthorizeTransactionsComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.abilityToAuthorizeTransactionsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInDesignOfFinancialInfoSystems', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.roleInDesignOfFinancialInfoSystems)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInDesignOfFinancialInfoSystems';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesignOfFinancialInfoSystems)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '5. Any role in design or implementation of accounting or financial processes, ' +
        'including financial information systems or internal controls?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesignOfFinancialInfoSystems)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesignOfFinancialInfoSystems)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesignOfFinancialInfoSystems)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSecView.formData.roleInDesignOfFinancialInfoSystems;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInDesignOfFinancialInfoSystems)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.roleInDesignOfFinancialInfoSystems}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('roleInDesignOfFinancialInfoSystemsComments', () => {
    it.each([
      { roleInDesignOfFinancialInfoSystems: false },
      { roleInDesignOfFinancialInfoSystems: null },
      { roleInDesignOfFinancialInfoSystems: faker.datatype.string() }
    ])(
      'should not render when roleInDesignOfFinancialInfoSystems is not true',
      ({ roleInDesignOfFinancialInfoSystems }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSecView,
          formData: {
            ...fakeSecView.formData,
            roleInDesignOfFinancialInfoSystems
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.roleInDesignOfFinancialInfoSystemsComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSecView,
          formData: {
            ...fakeSecView.formData,
            roleInDesignOfFinancialInfoSystems: true
          }
        });
      });

      it('should render when roleInDesignOfFinancialInfoSystems is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesignOfFinancialInfoSystemsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInDesignOfFinancialInfoSystemsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInDesignOfFinancialInfoSystemsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesignOfFinancialInfoSystemsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesignOfFinancialInfoSystemsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeSecView.formData.roleInDesignOfFinancialInfoSystemsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesignOfFinancialInfoSystemsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesignOfFinancialInfoSystemsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInDesignOfFinancialInfoSystemsComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.roleInDesignOfFinancialInfoSystemsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInOperatingFinancialSystems', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.roleInOperatingFinancialSystems)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInOperatingFinancialSystems';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOperatingFinancialSystems)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '6. Any role in monitoring, supervising or operating any client functions, ' +
        'systems or processes, including financial information systems or internal controls?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOperatingFinancialSystems)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOperatingFinancialSystems)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOperatingFinancialSystems)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSecView.formData.roleInOperatingFinancialSystems;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOperatingFinancialSystems)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.roleInOperatingFinancialSystems}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('roleInOperatingFinancialSystemsComments', () => {
    it.each([
      { roleInOperatingFinancialSystems: false },
      { roleInOperatingFinancialSystems: null },
      { roleInOperatingFinancialSystems: faker.datatype.string() }
    ])('should not render when roleInOperatingFinancialSystems is not true', ({ roleInOperatingFinancialSystems }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeSecView,
        formData: {
          ...fakeSecView.formData,
          roleInOperatingFinancialSystems
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.roleInOperatingFinancialSystemsComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSecView,
          formData: {
            ...fakeSecView.formData,
            roleInOperatingFinancialSystems: true
          }
        });
      });

      it('should render when roleInOperatingFinancialSystems is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOperatingFinancialSystemsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInOperatingFinancialSystemsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInOperatingFinancialSystemsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOperatingFinancialSystemsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOperatingFinancialSystemsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeSecView.formData.roleInOperatingFinancialSystemsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOperatingFinancialSystemsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOperatingFinancialSystemsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOperatingFinancialSystemsComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.roleInOperatingFinancialSystemsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInOperatingDecisions', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.roleInOperatingDecisions)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInOperatingDecisions';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOperatingDecisions)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '7. Any decision-making role or participation with management in operating decisions?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOperatingDecisions)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOperatingDecisions)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOperatingDecisions)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSecView.formData.roleInOperatingDecisions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInOperatingDecisions)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.roleInOperatingDecisions}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('roleInOperatingDecisionsComments', () => {
    it.each([
      { roleInOperatingDecisions: false },
      { roleInOperatingDecisions: null },
      { roleInOperatingDecisions: faker.datatype.string() }
    ])('should not render when roleInOperatingDecisions is not true', ({ roleInOperatingDecisions }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeSecView,
        formData: {
          ...fakeSecView.formData,
          roleInOperatingDecisions
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.roleInOperatingDecisionsComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSecView,
          formData: {
            ...fakeSecView.formData,
            roleInOperatingDecisions: true
          }
        });
      });

      it('should render when roleInOperatingDecisions is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOperatingDecisionsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInOperatingDecisionsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInOperatingDecisionsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOperatingDecisionsComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOperatingDecisionsComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeSecView.formData.roleInOperatingDecisionsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOperatingDecisionsComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOperatingDecisionsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInOperatingDecisionsComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.roleInOperatingDecisionsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInManagementFunctions', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.roleInManagementFunctions)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInManagementFunctions';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInManagementFunctions)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '8. Any role that could be considered characteristic of a management function, ' +
        'including preparation of financial statements or other information for inclusion in an SEC filing?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInManagementFunctions)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInManagementFunctions)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInManagementFunctions)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSecView.formData.roleInManagementFunctions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInManagementFunctions)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.roleInManagementFunctions}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('roleInManagementFunctionsComments', () => {
    it.each([
      { roleInManagementFunctions: false },
      { roleInManagementFunctions: null },
      { roleInManagementFunctions: faker.datatype.string() }
    ])('should not render when roleInManagementFunctions is not true', ({ roleInManagementFunctions }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeSecView,
        formData: {
          ...fakeSecView.formData,
          roleInManagementFunctions
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.roleInManagementFunctionsComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSecView,
          formData: {
            ...fakeSecView.formData,
            roleInManagementFunctions: true
          }
        });
      });

      it('should render when roleInManagementFunctions is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInManagementFunctionsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.roleInManagementFunctionsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInManagementFunctionsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInManagementFunctionsComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInManagementFunctionsComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeSecView.formData.roleInManagementFunctionsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInManagementFunctionsComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInManagementFunctionsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInManagementFunctionsComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.roleInManagementFunctionsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('roleInClientStaffing', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.roleInClientStaffing)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'roleInClientStaffing';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInClientStaffing)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '9. Any activities related to selection, evaluation or development of client employees?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInClientStaffing)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInClientStaffing)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInClientStaffing)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSecView.formData.roleInClientStaffing;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.roleInClientStaffing)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.roleInClientStaffing}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('roleInClientStaffingComments', () => {
    it.each([
      { roleInClientStaffing: false },
      { roleInClientStaffing: null },
      { roleInClientStaffing: faker.datatype.string() }
    ])('should not render when roleInClientStaffing is not true', ({ roleInClientStaffing }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeSecView,
        formData: {
          ...fakeSecView.formData,
          roleInClientStaffing
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.roleInClientStaffingComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSecView,
          formData: {
            ...fakeSecView.formData,
            roleInClientStaffing: true
          }
        });
      });

      it('should render when roleInClientStaffing is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInClientStaffingComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.roleInClientStaffingComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'roleInClientStaffingComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInClientStaffingComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInClientStaffingComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeSecView.formData.roleInClientStaffingComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInClientStaffingComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInClientStaffingComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.roleInClientStaffingComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.roleInClientStaffingComments}-${testIds.textAreaOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('advocateInRegulatoryProceedings', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.advocateInRegulatoryProceedings)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'advocateInRegulatoryProceedings';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.advocateInRegulatoryProceedings)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '10. Acting in an advocate role on behalf of the client in regulatory proceedings or negotiations or as an expert witness in litigation?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.advocateInRegulatoryProceedings)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.advocateInRegulatoryProceedings)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.advocateInRegulatoryProceedings)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSecView.formData.advocateInRegulatoryProceedings;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.advocateInRegulatoryProceedings)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.advocateInRegulatoryProceedings}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('advocateInRegulatoryProceedingsComments', () => {
    it.each([
      { advocateInRegulatoryProceedings: false },
      { advocateInRegulatoryProceedings: null },
      { advocateInRegulatoryProceedings: faker.datatype.string() }
    ])('should not render when advocateInRegulatoryProceedings is not true', ({ advocateInRegulatoryProceedings }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeSecView,
        formData: {
          ...fakeSecView.formData,
          advocateInRegulatoryProceedings
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.advocateInRegulatoryProceedingsComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSecView,
          formData: {
            ...fakeSecView.formData,
            advocateInRegulatoryProceedings: true
          }
        });
      });

      it('should render when advocateInRegulatoryProceedings is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.advocateInRegulatoryProceedingsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.advocateInRegulatoryProceedingsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'advocateInRegulatoryProceedingsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.advocateInRegulatoryProceedingsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.advocateInRegulatoryProceedingsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeSecView.formData.advocateInRegulatoryProceedingsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.advocateInRegulatoryProceedingsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.advocateInRegulatoryProceedingsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.advocateInRegulatoryProceedingsComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.advocateInRegulatoryProceedingsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('creationOfMutualInterest', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.creationOfMutualInterest)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'creationOfMutualInterest';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creationOfMutualInterest)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '11. Creation of any form of mutual interest with the client?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creationOfMutualInterest)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creationOfMutualInterest)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creationOfMutualInterest)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSecView.formData.creationOfMutualInterest;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.creationOfMutualInterest)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.creationOfMutualInterest}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('creationOfMutualInterestComments', () => {
    it.each([
      { creationOfMutualInterest: false },
      { creationOfMutualInterest: null },
      { creationOfMutualInterest: faker.datatype.string() }
    ])('should not render when creationOfMutualInterest is not true', ({ creationOfMutualInterest }) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeSecView,
        formData: {
          ...fakeSecView.formData,
          creationOfMutualInterest
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.creationOfMutualInterestComments)).not.toBeInTheDocument();
    });

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSecView,
          formData: {
            ...fakeSecView.formData,
            creationOfMutualInterest: true
          }
        });
      });

      it('should render when creationOfMutualInterest is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.creationOfMutualInterestComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'creationOfMutualInterestComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeSecView.formData.creationOfMutualInterestComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.creationOfMutualInterestComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.creationOfMutualInterestComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('taxServicesToPersonInOversightRole', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.taxServicesToPersonInOversightRole)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'taxServicesToPersonInOversightRole';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.taxServicesToPersonInOversightRole)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '12. Tax services to a person in a financial oversight role (applicable only when PCAOB auditing standards are followed)?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.taxServicesToPersonInOversightRole)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.taxServicesToPersonInOversightRole)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.taxServicesToPersonInOversightRole)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSecView.formData.taxServicesToPersonInOversightRole;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.taxServicesToPersonInOversightRole)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.taxServicesToPersonInOversightRole}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('taxServicesToPersonInOversightRoleComments', () => {
    it.each([
      { taxServicesToPersonInOversightRole: false },
      { taxServicesToPersonInOversightRole: null },
      { taxServicesToPersonInOversightRole: faker.datatype.string() }
    ])(
      'should not render when taxServicesToPersonInOversightRole is not true',
      ({ taxServicesToPersonInOversightRole }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSecView,
          formData: {
            ...fakeSecView.formData,
            taxServicesToPersonInOversightRole
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.taxServicesToPersonInOversightRoleComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeSecView,
          formData: {
            ...fakeSecView.formData,
            taxServicesToPersonInOversightRole: true
          }
        });
      });

      it('should render when taxServicesToPersonInOversightRole is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxServicesToPersonInOversightRoleComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.taxServicesToPersonInOversightRoleComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'taxServicesToPersonInOversightRoleComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxServicesToPersonInOversightRoleComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe involvement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxServicesToPersonInOversightRoleComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeSecView.formData.taxServicesToPersonInOversightRoleComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxServicesToPersonInOversightRoleComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxServicesToPersonInOversightRoleComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxServicesToPersonInOversightRoleComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.taxServicesToPersonInOversightRoleComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('involvementComparedToSecLimitations', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.involvementComparedToSecLimitations)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'involvementComparedToSecLimitations';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvementComparedToSecLimitations)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        'For each YES answer above, compare our involvement (as described) to the corresponding SEC ' +
        'Limitations. Based on the nature of the non-attest services we will/did provide, our conclusion is:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvementComparedToSecLimitations)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSecView.formData.involvementComparedToSecLimitations;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvementComparedToSecLimitations)).toHaveAttribute('value', expectedValue);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvementComparedToSecLimitations)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = '6';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.involvementComparedToSecLimitations)).toHaveAttribute('rows', expectedRows);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.involvementComparedToSecLimitations}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });
});
