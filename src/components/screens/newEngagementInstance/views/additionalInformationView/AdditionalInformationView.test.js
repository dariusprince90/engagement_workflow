import ReactDOM from 'react-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import YesNoNaRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/YesNoNaRadioButtonListOptions';
import YesNoTbdRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import newEngagementInstanceSlice from '../../newEngagementInstanceSlice';
import * as newEngagementInstanceThunks from '../../newEngagementInstanceThunks';
import AdditionalInformationView from './AdditionalInformationView';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form headers
  formHeader: 'form-header',

  // form fields
  relatedToExistingClient: 'related-to-existing-client',
  parentClientNumber: 'parent-client-number',
  opportunityComments: 'opportunity-comments',
  externalReferralSourceDiscussedEthics: 'external-referral-source-discussed-ethics',
  externalReferralSourceDiscussedEthicsComments: 'external-referral-source-discussed-ethics-comments',
  awareOfPotentialConcerns: 'aware-of-potential-concerns',
  awareOfPotentialConcernsComments: 'aware-of-potential-concerns-comments',

  // auto-complete events
  autoCompleteOnClearData: 'auto-complete-on-clear-data',
  autoCompleteOnResetItem: 'auto-complete-on-reset-item',
  autoCompleteOnSearch: 'auto-complete-on-search',
  autoCompleteOnSelect: 'auto-complete-on-select',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakeAdditionalInfoView = {
  formData: {
    id: faker.datatype.number(),
    relatedToExistingClient: faker.random.alphaNumeric(10),
    parentClientNumber: faker.datatype.number(),
    opportunityComments: faker.random.alphaNumeric(10),
    externalReferralSourceDiscussedEthics: faker.random.alphaNumeric(10),
    externalReferralSourceDiscussedEthicsComments: faker.random.alphaNumeric(10),
    awareOfPotentialConcerns: faker.random.alphaNumeric(10),
    awareOfPotentialConcernsComments: faker.random.alphaNumeric(10),
    parentClientDisplayName: faker.random.alphaNumeric(10)
  },
  lookups: {
    clients: {
      data: [],
      isLoading: false,
      hasError: false,
      error: null
    }
  },
  metadata: {
    isLoading: false,
    hasError: false,
    error: null
  }
};

const defaultProps = {};

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
  return <AdditionalInformationView {...props} {...hocInjectedProps} />;
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

jest.mock('../../newEngagementInstanceThunks', () => {
  return {
    searchClients: jest.fn()
  };
});

jest.mock('../withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../../components/common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ title, children }) => {
    const props = { title, children };
    return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
  }
}));

jest.mock('../../components/autoComplete/AutoComplete', () => ({
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
        data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.autoCompleteOnClearData}`} onClick={onClearData} />
        <button data-testid={`${testIds[name]}-${testIds.autoCompleteOnResetItem}`} onClick={onResetItem} />
        <button
          data-testid={`${testIds[name]}-${testIds.autoCompleteOnSearch}`}
          onClick={() => onSearch(event, sourcePropertyNames)}
        />
        <button data-testid={`${testIds[name]}-${testIds.autoCompleteOnSelect}`} onClick={onSelect} />
      </fake-auto-complete>
    );
  }
}));

jest.mock('../../components/radioButtonList/RadioButtonList', () => ({
  __esModule: true,
  default: ({ name, label, options, selectedValue, horizontalItems, onChange }) => {
    const props = { name, label, selectedValue, horizontalItems };
    return (
      <fake-radio-button-list {...props} data-testid={testIds[name]} options={JSON.stringify(options)}>
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

jest.mock('../../../../../components/common/formHeader/FormHeader', () => {
  return {
    __esModule: true,
    default: ({ text }) => {
      const props = { text };
      return <fake-form-header {...props} data-testid={testIds.formHeader} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('AdditionalInformation', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    jest.spyOn(newEngagementInstanceSlice, 'selectCurrentView');
  });

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeAdditionalInfoView);
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
    const expectedTitle = 'Additional Information';
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
  });

  describe('additionalInformation form header', () => {
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

  describe('relatedToExistingClient RadioButtonList', () => {
    describe('rendering', () => {
      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.relatedToExistingClient)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'relatedToExistingClient';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.relatedToExistingClient)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Is this client related to an existing client?';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.relatedToExistingClient)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct options prop', () => {
        const expectedOptions = YesNoTbdRadioButtonListOptions;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.relatedToExistingClient)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('has correct horizontalItems prop', () => {
        const expectedHorizontalItems = true;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.relatedToExistingClient)).toHaveAttribute(
          'horizontalItems',
          expectedHorizontalItems.toString()
        );
      });

      it('has correct selectedValue prop', () => {
        const expectedSelectedValue = fakeAdditionalInfoView.formData.relatedToExistingClient;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.relatedToExistingClient)).toHaveAttribute(
          'selectedValue',
          expectedSelectedValue
        );
      });
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.relatedToExistingClient}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('parentClientNumber AutoComplete', () => {
    it.each([
      { relatedToExistingClient: 'No' },
      { relatedToExistingClient: 'TBD' },
      { relatedToExistingClient: null },
      { relatedToExistingClient: faker.datatype.string() }
    ])('should not render when relatedToExistingClient not Yes', (relatedToExistingClient) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeAdditionalInfoView,
        formData: {
          ...fakeAdditionalInfoView.formData,
          relatedToExistingClient
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.parentClientNumber)).not.toBeInTheDocument();
    });

    describe('rendering', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAdditionalInfoView,
          formData: {
            ...fakeAdditionalInfoView.formData,
            relatedToExistingClient: 'Yes'
          }
        });
      });

      it('renders when relatedToExistingClient equals Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.parentClientNumber)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.parentClientNumber)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'parentClientNumber';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.parentClientNumber)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, choose its parent client number:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.parentClientNumber)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Start typing to select a parent client';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.parentClientNumber)).toHaveAttribute('placeholder', expectedPlaceHolder);
      });

      it('has correct selectedItem prop', () => {
        const expectedSelectedItem = {
          id: fakeAdditionalInfoView.formData.parentClientNumber,
          displayName: fakeAdditionalInfoView.formData.parentClientDisplayName
        };
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.parentClientNumber)).toHaveAttribute(
          'selectedItem',
          JSON.stringify(expectedSelectedItem)
        );
      });

      it('has correct matches prop', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.parentClientNumber)).toHaveAttribute(
          'matches',
          JSON.stringify(fakeAdditionalInfoView.formData.clients)
        );
      });

      describe('functional', () => {
        it('invokes handleAutoCompleteItemSelected when the onSelect event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.parentClientNumber}-${testIds.autoCompleteOnSelect}`));
          expect(hocInjectedProps.handleAutoCompleteItemSelected).toHaveBeenCalledTimes(1);
        });

        it('invokes handleAutoCompleteDataCleared when the onClearData event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.parentClientNumber}-${testIds.autoCompleteOnClearData}`));
          expect(hocInjectedProps.handleAutoCompleteDataCleared).toHaveBeenCalledTimes(1);
        });

        it('invokes handleAutoCompleteItemReset when the onResetItem event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.parentClientNumber}-${testIds.autoCompleteOnResetItem}`));
          expect(hocInjectedProps.handleAutoCompleteItemReset).toHaveBeenCalledTimes(1);
        });

        it('invokes handleAutoCompleteSearch when the onSearch event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.parentClientNumber}-${testIds.autoCompleteOnSearch}`));
          expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalledTimes(1);
          expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalledWith(
            'event',
            'source-property-names',
            newEngagementInstanceThunks.searchClients
          );
        });
      });
    });
  });

  describe('opportunityComments TextArea', () => {
    describe('rendering', () => {
      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.opportunityComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'opportunityComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.opportunityComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Describe how we got this opportunity.';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.opportunityComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeAdditionalInfoView.formData.opportunityComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.opportunityComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.opportunityComments)).toHaveAttribute('placeholder', expectedPlaceHolder);
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.opportunityComments)).toHaveAttribute('rows', expectedRows);
      });
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.opportunityComments}-${testIds.textAreaOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('externalReferralSourceDiscussedEthics RadioButtonList', () => {
    describe('rendering', () => {
      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.externalReferralSourceDiscussedEthics)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'externalReferralSourceDiscussedEthics';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.externalReferralSourceDiscussedEthics)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel =
          'If the opportunity came from an external referral source, did our discussions with the referral source ' +
          "regarding the prospective new client's ethics and integrity in financial reporting and business conduct " +
          'indicate any areas of potential concerns?';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.externalReferralSourceDiscussedEthics)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct options prop', () => {
        const expectedOptions = YesNoNaRadioButtonListOptions;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.externalReferralSourceDiscussedEthics)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('has correct horizontalItems prop', () => {
        const expectedHorizontalItems = true;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.externalReferralSourceDiscussedEthics)).toHaveAttribute(
          'horizontalItems',
          expectedHorizontalItems.toString()
        );
      });

      it('has correct selectedValue prop', () => {
        const expectedSelectedValue = fakeAdditionalInfoView.formData.externalReferralSourceDiscussedEthics;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.externalReferralSourceDiscussedEthics)).toHaveAttribute(
          'selectedValue',
          expectedSelectedValue
        );
      });
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.externalReferralSourceDiscussedEthics}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('externalReferralSourceDiscussedEthicsComments TextArea', () => {
    it.each([
      { externalReferralSourceDiscussedEthics: 'No' },
      { externalReferralSourceDiscussedEthics: 'N/A' },
      { externalReferralSourceDiscussedEthics: null },
      { externalReferralSourceDiscussedEthics: faker.datatype.string() }
    ])(
      'should not render when externalReferralSourceDiscussedEthics not Yes',
      (externalReferralSourceDiscussedEthics) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAdditionalInfoView,
          formData: {
            ...fakeAdditionalInfoView.formData,
            externalReferralSourceDiscussedEthics
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.externalReferralSourceDiscussedEthicsComments)).not.toBeInTheDocument();
      }
    );

    describe('rendering', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAdditionalInfoView,
          formData: {
            ...fakeAdditionalInfoView.formData,
            externalReferralSourceDiscussedEthics: 'Yes'
          }
        });
      });

      it('should render when externalReferralSourceDiscussedEthics equals Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.externalReferralSourceDiscussedEthicsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.externalReferralSourceDiscussedEthicsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'externalReferralSourceDiscussedEthicsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.externalReferralSourceDiscussedEthicsComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.externalReferralSourceDiscussedEthicsComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeAdditionalInfoView.formData.externalReferralSourceDiscussedEthicsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.externalReferralSourceDiscussedEthicsComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.externalReferralSourceDiscussedEthicsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.externalReferralSourceDiscussedEthicsComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.externalReferralSourceDiscussedEthicsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('awareOfPotentialConcerns RadioButtonList', () => {
    describe('rendering', () => {
      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.awareOfPotentialConcerns)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'awareOfPotentialConcerns';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.awareOfPotentialConcerns)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Are we aware of any areas of potential concern regarding the prospective client?';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.awareOfPotentialConcerns)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct options prop', () => {
        const expectedOptions = YesNoTbdRadioButtonListOptions;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.awareOfPotentialConcerns)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('has correct horizontalItems prop', () => {
        const expectedHorizontalItems = true;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.awareOfPotentialConcerns)).toHaveAttribute(
          'horizontalItems',
          expectedHorizontalItems.toString()
        );
      });

      it('has correct selectedValue prop', () => {
        const expectedSelectedValue = fakeAdditionalInfoView.formData.awareOfPotentialConcerns;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.awareOfPotentialConcerns)).toHaveAttribute(
          'selectedValue',
          expectedSelectedValue
        );
      });
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.awareOfPotentialConcerns}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('awareOfPotentialConcernsComments TextArea', () => {
    it.each([
      { awareOfPotentialConcerns: 'No' },
      { awareOfPotentialConcerns: 'TBD' },
      { awareOfPotentialConcerns: null },
      { awareOfPotentialConcerns: faker.datatype.string() }
    ])('should not render when awareOfPotentialConcerns not Yes', (awareOfPotentialConcerns) => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeAdditionalInfoView,
        formData: {
          ...fakeAdditionalInfoView.formData,
          awareOfPotentialConcerns
        }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.awareOfPotentialConcernsComments)).not.toBeInTheDocument();
    });

    describe('rendering', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeAdditionalInfoView,
          formData: {
            ...fakeAdditionalInfoView.formData,
            awareOfPotentialConcerns: 'Yes'
          }
        });
      });

      it('should render when awareOfPotentialConcerns equals Yes', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.awareOfPotentialConcernsComments)).toBeInTheDocument();
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.awareOfPotentialConcernsComments)
        ).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'awareOfPotentialConcernsComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.awareOfPotentialConcernsComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.awareOfPotentialConcernsComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeAdditionalInfoView.formData.awareOfPotentialConcernsComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.awareOfPotentialConcernsComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.awareOfPotentialConcernsComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.awareOfPotentialConcernsComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.awareOfPotentialConcernsComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
