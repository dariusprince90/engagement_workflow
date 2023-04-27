import ReactDOM from 'react-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import OWNERSHIP_TYPES from '../../../../../helpers/enums/ownershipTypes';
import SORT_DIRECTION from '../../../../../helpers/enums/sortDirection';
import PmArray from '../../../../../helpers/customTypes/PmArray';

import YesNoRadioButtonListOptions from '../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import ClientInformationView from './ClientInformationView';
import newEngagementInstanceSlice from '../../newEngagementInstanceSlice';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form fields
  clientTaxTypeId: 'client-tax-type-id',
  firstName: 'first-name',
  middleName: 'middle-name',
  lastName: 'last-name',
  suffixId: 'suffix-id',
  clientName: 'client-name',
  ownershipTypeId: 'ownership-type-id',
  schedulingBillerStaffNumber: 'scheduling-biller-staff-number',
  internationalHeadquarterCountryReferenceId: 'international-headquarter-country-reference-id',
  isCommunityTaxPractice: 'is-community-tax-practice',
  isGovernmentContractor: 'is-government-contractor',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textBox events
  textBoxOnChange: 'text-box-on-change',

  // selectBox events
  selectBoxOnChange: 'select-box-on-change',

  // auto-complete events
  autoCompleteOnClearData: 'auto-complete-on-clear-data',
  autoCompleteOnResetItem: 'auto-complete-on-reset-item',
  autoCompleteOnSearch: 'auto-complete-on-search',
  autoCompleteOnSelect: 'auto-complete-on-select'
};

const fakeClientInformationView = {
  formData: {
    clientTaxTypeId: faker.random.alphaNumeric(10),
    firstName: faker.random.alphaNumeric(10),
    middleName: faker.random.alphaNumeric(10),
    lastName: faker.random.alphaNumeric(10),
    suffixId: faker.random.alphaNumeric(10),
    clientName: faker.random.alphaNumeric(10),
    ownershipTypeId: faker.random.alphaNumeric(10),
    schedulingBillerStaffNumber: faker.random.alphaNumeric(10),
    internationalHeadquarterCountryReferenceId: faker.random.alphaNumeric(10),
    isCommunityTaxPractice: faker.datatype.boolean(),
    isGovernmentContractor: faker.datatype.boolean()
  },

  lookups: {
    schedulingBillers: { data: [], isLoading: false, hasError: false, error: null }
  }
};

const fakeLookups = {
  clientTaxTypes: {
    data: [],
    isLoading: faker.datatype.boolean(),
    loadingText: faker.random.alphaNumeric(10),
    error: null
  },

  suffixes: {
    data: [],
    isLoading: faker.datatype.boolean(),
    loadingText: faker.random.alphaNumeric(10),
    error: null
  },

  ownershipTypes: {
    data: [],
    isLoading: faker.datatype.boolean(),
    loadingText: faker.random.alphaNumeric(10),
    error: null
  },

  internationalHeadquarterCountries: {
    data: [],
    isLoading: faker.datatype.boolean(),
    loadingText: faker.random.alphaNumeric(10),
    error: null
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleAutoCompleteDataCleared: jest.fn(),
  handleAutoCompleteItemReset: jest.fn(),
  handleAutoCompleteItemSelected: jest.fn(),
  handleAutoCompleteSearch: jest.fn(),
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ClientInformationView {...props} {...hocInjectedProps} />;
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

jest.mock('../../../newEngagementInstance/newEngagementInstanceSlice', () => {
  return {
    selectCurrentView: jest.fn(),
    selectLookups: jest.fn()
  };
});

jest.mock('../../../newEngagementInstance/newEngagementInstanceThunks', () => {
  return {
    tempThunk: jest.fn()
  };
});

jest.mock('../../views/withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../common/collapsibleFormSection/CollapsibleFormSection', () => {
  return {
    __esModule: true,
    default: ({ title, children }) => {
      const props = { title, children };
      return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
    }
  };
});

jest.mock('../../components/radioButtonList/RadioButtonList', () => ({
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

jest.mock('../../components/textBox/TextBox', () => ({
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

jest.mock('../../components/selectBox/SelectBox', () => ({
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

jest.mock('../../components/autoComplete/AutoComplete', () => ({
  __esModule: true,
  default: ({
    name,
    label,
    placeholder,
    selectedItem,
    matches,
    sourcePropertyNames,
    onClearData,
    onResetItem,
    onSearch,
    onSelect
  }) => {
    const props = { name, label, placeholder };

    // these are needed as they are passed to onSearch
    const event = 'fake-event';

    return (
      <fake-auto-complete
        {...props}
        selectedItem={JSON.stringify(selectedItem)}
        matches={JSON.stringify(matches)}
        sourcePropertyNames={JSON.stringify(sourcePropertyNames)}
        data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.autoCompleteOnClearData}`} onClick={() => onClearData()} />
        <button data-testid={`${testIds[name]}-${testIds.autoCompleteOnResetItem}`} onClick={() => onResetItem()} />
        <button
          data-testid={`${testIds[name]}-${testIds.autoCompleteOnSearch}`}
          onClick={() => onSearch(event, sourcePropertyNames)}
        />
        <button data-testid={`${testIds[name]}-${testIds.autoCompleteOnSelect}`} onClick={() => onSelect()} />
      </fake-auto-complete>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('ClientInformationView', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeClientInformationView);
    newEngagementInstanceSlice.selectLookups.mockReturnValue(fakeLookups);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('on-load', () => {
    describe('client tax type options', () => {
      it('sets the client tax type options to an empty array when clientTaxTypeId.data has no items', () => {
        // * Arrange
        const clientTaxTypesOptions = [];
        const expectedOptions = [];

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          clientTaxTypes: { ...fakeLookups.clientTaxTypes, data: clientTaxTypesOptions }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.clientTaxTypeId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });

      it('sets the client tax types options when clientTaxTypeId.data has items', () => {
        // * Arrange
        const itemCount = faker.datatype.number({ min: 30, max: 50 });
        const clientTaxTypesOptions = [...Array(itemCount).keys()].map(() => ({
          // using short lorem words since we are quite likely to get dupes every time
          // this will allow the filtering of dupes out to be tested as well
          id: faker.lorem.word(3),
          displayName: faker.lorem.word(3),
          isActive: faker.datatype.boolean()
        }));

        // we expect a sorted, unique list of displayName for active client tax types
        const expectedClientTaxTypes = new PmArray(...clientTaxTypesOptions)
          .filter((ch) => ch.isActive)
          .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

        const expectedOptions = expectedClientTaxTypes.map((taxType) => ({
          value: taxType.id,
          text: taxType.displayName
        }));

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          clientTaxTypes: { ...fakeLookups.clientTaxTypes, data: clientTaxTypesOptions }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.clientTaxTypeId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });
    });

    describe('suffix options', () => {
      it('sets the suffix options to an empty array when suffixId.data has no items', () => {
        // * Arrange
        const suffixesOptions = [];
        const expectedOptions = [];

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          suffixes: { ...fakeLookups.suffixes, data: suffixesOptions }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.suffixId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });

      it('sets the suffixes options when suffixId.data has items', () => {
        // * Arrange
        const itemCount = faker.datatype.number({ min: 30, max: 50 });
        const suffixesOptions = [...Array(itemCount).keys()].map(() => ({
          // using short lorem words since we are quite likely to get dupes every time
          // this will allow the filtering of dupes out to be tested as well
          id: faker.lorem.word(3),
          displayName: faker.lorem.word(3),
          isActive: faker.datatype.boolean()
        }));

        // we expect a sorted, unique list of displayName for active suffixes
        const expectedSuffixes = new PmArray(...suffixesOptions)
          .filter((ch) => ch.isActive)
          .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

        const expectedOptions = expectedSuffixes.map((suffix) => ({
          value: suffix.id,
          text: suffix.displayName
        }));

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          suffixes: { ...fakeLookups.suffixes, data: suffixesOptions }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.suffixId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });
    });

    describe('ownership type options', () => {
      it('sets the ownership type options to an empty array when ownershipTypeId.data has no items', () => {
        // * Arrange
        const ownershipTypesOptions = [];
        const expectedOptions = [];

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          ownershipTypes: { ...fakeLookups.ownershipTypes, data: ownershipTypesOptions }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.ownershipTypeId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });

      it('sets the ownership type options when ownershipTypeId.data has items', () => {
        // * Arrange
        const itemCount = faker.datatype.number({ min: 30, max: 50 });
        const ownershipTypesOptions = [...Array(itemCount).keys()].map(() => ({
          // using short lorem words since we are quite likely to get dupes every time
          // this will allow the filtering of dupes out to be tested as well
          id: faker.lorem.word(3),
          displayName: faker.lorem.word(3),
          isActive: faker.datatype.boolean()
        }));

        // we expect a sorted, unique list of displayName for active ownership types
        const expectedOwnershipTypes = new PmArray(...ownershipTypesOptions)
          .filter((ch) => ch.isActive)
          .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

        const expectedOptions = expectedOwnershipTypes.map((ownershipType) => ({
          value: ownershipType.id,
          text: ownershipType.displayName
        }));

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          ownershipTypes: { ...fakeLookups.ownershipTypes, data: ownershipTypesOptions }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.ownershipTypeId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });
    });

    describe('international headquarter country options', () => {
      it('sets the international headquarters country options to an empty array when internationalHeadquarterCountries.data has no items', () => {
        // * Arrange
        const internationalHeadquarterCountryOptions = [];
        const expectedOptions = [];

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          internationalHeadquarterCountries: {
            ...fakeLookups.internationalHeadquarterCountries,
            data: internationalHeadquarterCountryOptions
          }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.internationalHeadquarterCountryReferenceId)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('sets the international headquarters country options when internationalHeadquarterCountries.data has items', () => {
        // * Arrange
        const itemCount = faker.datatype.number({ min: 30, max: 50 });
        const internationalHeadquarterCountryOptions = [...Array(itemCount).keys()].map(() => ({
          // using short lorem words since we are quite likely to get dupes every time
          // this will allow the filtering of dupes out to be tested as well
          id: faker.lorem.word(3),
          displayName: faker.lorem.word(3),
          isActive: faker.datatype.boolean()
        }));

        // we expect a sorted, unique list of displayName for active international headquarters country
        const expectedInternationalHeadquarterCountryOptionTypes = new PmArray(
          ...internationalHeadquarterCountryOptions
        )
          .filter((ch) => ch.isActive)
          .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

        const expectedOptions = expectedInternationalHeadquarterCountryOptionTypes.map((country) => ({
          value: country.id,
          text: country.displayName
        }));

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          internationalHeadquarterCountries: {
            ...fakeLookups.internationalHeadquarterCountries,
            data: internationalHeadquarterCountryOptions
          }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.internationalHeadquarterCountryReferenceId)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });
    });
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  it('renders CollapsibleFormSection component', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toBeInTheDocument();
  });

  it('renders CollapsibleFormSection with correct title prop', () => {
    const expectedTitle = 'Client Information';
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
  });

  describe('clientTaxTypeId', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.clientTaxTypeId)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'clientTaxTypeId';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.clientTaxTypeId)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Client Tax Type';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.clientTaxTypeId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct defaultOption prop', () => {
      const expectedDefaultOption = 'Select Client Type';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.clientTaxTypeId)).toHaveAttribute('defaultOption', expectedDefaultOption);
    });

    it('has correct isLoading prop', () => {
      const isLoading = faker.datatype.boolean();
      newEngagementInstanceSlice.selectLookups.mockReturnValue({
        ...fakeLookups,
        clientTaxTypes: { ...fakeLookups.clientTaxTypes, isLoading }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.clientTaxTypeId)).toHaveAttribute('isLoading', isLoading.toString());
    });

    it('has correct loadingText prop', () => {
      const expectedLoadingText = 'Loading client tax types..';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.clientTaxTypeId)).toHaveAttribute('loadingText', expectedLoadingText);
    });

    it('has correct options prop', () => {
      const expectedOptions = [];
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.clientTaxTypeId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
    });

    it('has correct value prop', () => {
      const clientTaxTypeId = faker.random.alphaNumeric(10);
      const expectedValue = clientTaxTypeId;
      const selectClientInformationView = {
        ...fakeClientInformationView,
        formData: { ...fakeClientInformationView.formData, clientTaxTypeId }
      };
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientInformationView);
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.clientTaxTypeId)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.clientTaxTypeId}-${testIds.selectBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('firstName', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.firstName)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'firstName';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.firstName)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'First Name';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.firstName)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.firstName)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeClientInformationView.formData.firstName;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.firstName)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.firstName}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('middleName', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.middleName)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'middleName';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.middleName)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Middle Name';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.middleName)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.middleName)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeClientInformationView.formData.middleName;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.middleName)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.middleName}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('lastName', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.lastName)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'lastName';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.lastName)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Last Name';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.lastName)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.lastName)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeClientInformationView.formData.lastName;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.lastName)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.lastName}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('suffixId', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.suffixId)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'suffixId';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.suffixId)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Suffix';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.suffixId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct defaultOption prop', () => {
      const expectedDefaultOption = 'Select Suffix';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.suffixId)).toHaveAttribute('defaultOption', expectedDefaultOption);
    });

    it('has correct isLoading prop', () => {
      const isLoading = faker.datatype.boolean();
      newEngagementInstanceSlice.selectLookups.mockReturnValue({
        ...fakeLookups,
        suffixes: { ...fakeLookups.suffixes, isLoading }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.suffixId)).toHaveAttribute('isLoading', isLoading.toString());
    });

    it('has correct loadingText prop', () => {
      const expectedLoadingText = 'Loading suffixes..';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.suffixId)).toHaveAttribute('loadingText', expectedLoadingText);
    });

    it('has correct options prop', () => {
      const expectedOptions = [];
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.suffixId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
    });

    it('has correct value prop', () => {
      const suffixId = faker.random.alphaNumeric(10);
      const expectedValue = suffixId;
      const selectClientInformationView = {
        ...fakeClientInformationView,
        formData: { ...fakeClientInformationView.formData, suffixId }
      };
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientInformationView);
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.suffixId)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.suffixId}-${testIds.selectBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('clientName', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.clientName)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'clientName';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.clientName)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Client Name';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.clientName)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.clientName)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeClientInformationView.formData.clientName;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.clientName)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.clientName}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('ownershipTypeId', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.ownershipTypeId)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'ownershipTypeId';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ownershipTypeId)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Majority Ownership Type';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ownershipTypeId)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct defaultOption prop', () => {
      const expectedDefaultOption = 'Select Ownership Type';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ownershipTypeId)).toHaveAttribute('defaultOption', expectedDefaultOption);
    });

    it('has correct isLoading prop', () => {
      const isLoading = faker.datatype.boolean();
      newEngagementInstanceSlice.selectLookups.mockReturnValue({
        ...fakeLookups,
        ownershipTypes: { ...fakeLookups.ownershipTypes, isLoading }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ownershipTypeId)).toHaveAttribute('isLoading', isLoading.toString());
    });

    it('has correct loadingText prop', () => {
      const expectedLoadingText = 'Loading Ownership Types..';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ownershipTypeId)).toHaveAttribute('loadingText', expectedLoadingText);
    });

    it('has correct options prop', () => {
      const expectedOptions = [];
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ownershipTypeId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
    });

    it('has correct value prop', () => {
      const ownershipTypeId = faker.random.alphaNumeric(10);
      const expectedValue = ownershipTypeId;
      const selectClientInformationView = {
        ...fakeClientInformationView,
        formData: { ...fakeClientInformationView.formData, ownershipTypeId }
      };
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientInformationView);
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.ownershipTypeId)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.ownershipTypeId}-${testIds.selectBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('schedulingBillerStaffNumber', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.schedulingBillerStaffNumber)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'schedulingBillerStaffNumber';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.schedulingBillerStaffNumber)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Scheduling Biller';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.schedulingBillerStaffNumber)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Start typing to select a scheduling biller';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.schedulingBillerStaffNumber)).toHaveAttribute(
        'placeholder',
        expectedPlaceholder
      );
    });

    it('has correct selectedItem prop', () => {
      // * ARRANGE
      const selectClientInformationView = {
        ...fakeClientInformationView,
        formData: {
          ...fakeClientInformationView.formData,
          schedulingBillerStaffNumber: faker.random.alphaNumeric(10),
          schedulingBillerDisplayName: faker.random.alphaNumeric(10)
        }
      };
      const expectedSelectedItem = {
        id: selectClientInformationView.formData.schedulingBillerStaffNumber,
        displayName: selectClientInformationView.formData.schedulingBillerDisplayName
      };
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientInformationView);

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.schedulingBillerStaffNumber)).toHaveAttribute(
        'selectedItem',
        JSON.stringify(expectedSelectedItem)
      );
    });

    it('has correct matches prop', () => {
      const selectClientInformationView = {
        ...fakeClientInformationView,
        lookup: {
          ...fakeClientInformationView.lookups,
          staff: { data: faker.datatype.array(), isLoading: false, hasError: false, error: null }
        }
      };
      const expectedMatches = selectClientInformationView.lookups.schedulingBillers;
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientInformationView);
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.schedulingBillerStaffNumber)).toHaveAttribute(
        'matches',
        JSON.stringify(expectedMatches)
      );
    });

    it('has correct sourcePropertyNames prop', () => {
      const expectedSourcePropertyNames = {
        matches: 'schedulingBillers',
        value: 'schedulingBillerStaffNumber',
        displayName: 'schedulingBillerDisplayName'
      };
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.schedulingBillerStaffNumber)).toHaveAttribute(
        'sourcePropertyNames',
        JSON.stringify(expectedSourcePropertyNames)
      );
    });

    describe('functional', () => {
      it('invokes handleAutoCompleteDataCleared when the onClearData event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.schedulingBillerStaffNumber}-${testIds.autoCompleteOnClearData}`)
        );
        expect(hocInjectedProps.handleAutoCompleteDataCleared).toHaveBeenCalledTimes(1);
      });

      it('invokes handleAutoCompleteItemReset when the onResetItem event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.schedulingBillerStaffNumber}-${testIds.autoCompleteOnResetItem}`)
        );
        expect(hocInjectedProps.handleAutoCompleteItemReset).toHaveBeenCalledTimes(1);
      });

      it('invokes handleAutoCompleteItemSelected when the onSelect event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.schedulingBillerStaffNumber}-${testIds.autoCompleteOnSelect}`));
        expect(hocInjectedProps.handleAutoCompleteItemSelected).toHaveBeenCalledTimes(1);
      });

      it('invokes handleAutoCompleteSearch when the onSearch event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.schedulingBillerStaffNumber}-${testIds.autoCompleteOnSearch}`));
        expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('internationalHeadquarterCountryReferenceId', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.internationalHeadquarterCountryReferenceId)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'internationalHeadquarterCountryReferenceId';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.internationalHeadquarterCountryReferenceId)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Primary Headquarters Location';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.internationalHeadquarterCountryReferenceId)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct defaultOption prop', () => {
      const expectedDefaultOption = 'Select Primary Headquarters Location';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.internationalHeadquarterCountryReferenceId)).toHaveAttribute(
        'defaultOption',
        expectedDefaultOption
      );
    });

    it('has correct isLoading prop', () => {
      const isLoading = faker.datatype.boolean();
      newEngagementInstanceSlice.selectLookups.mockReturnValue({
        ...fakeLookups,
        internationalHeadquarterCountries: { ...fakeLookups.internationalHeadquarterCountries, isLoading }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.internationalHeadquarterCountryReferenceId)).toHaveAttribute(
        'isLoading',
        isLoading.toString()
      );
    });

    it('has correct loadingText prop', () => {
      const expectedLoadingText = 'Loading headquarter locations..';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.internationalHeadquarterCountryReferenceId)).toHaveAttribute(
        'loadingText',
        expectedLoadingText
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = [];
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.internationalHeadquarterCountryReferenceId)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct value prop', () => {
      const internationalHeadquarterCountryReferenceId = faker.random.alphaNumeric(10);
      const expectedValue = internationalHeadquarterCountryReferenceId;
      const selectClientInformationView = {
        ...fakeClientInformationView,
        formData: { ...fakeClientInformationView.formData, internationalHeadquarterCountryReferenceId }
      };
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientInformationView);
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.internationalHeadquarterCountryReferenceId)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.internationalHeadquarterCountryReferenceId}-${testIds.selectBoxOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('isCommunityTaxPractice', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.isCommunityTaxPractice)).toBeInTheDocument();
    });

    it('has correct horizontalItems props', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isCommunityTaxPractice)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'isCommunityTaxPractice';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isCommunityTaxPractice)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Community Tax Practice';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isCommunityTaxPractice)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options props', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isCommunityTaxPractice)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeClientInformationView.formData.isCommunityTaxPractice;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isCommunityTaxPractice)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.isCommunityTaxPractice}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('isGovernmentContractor', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.isGovernmentContractor)).toBeInTheDocument();
    });

    it('has correct horizontalItems props', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isGovernmentContractor)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'isGovernmentContractor';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isGovernmentContractor)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Government Contractor';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isGovernmentContractor)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options props', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isGovernmentContractor)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeClientInformationView.formData.isGovernmentContractor;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isGovernmentContractor)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.isGovernmentContractor}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('privateEquityGroup', () => {
    it.each([
      { ownershipTypeId: OWNERSHIP_TYPES.privateEquity.id },
      { ownershipTypeId: OWNERSHIP_TYPES.ventureCapital.id }
    ])(
      'renders privateEquityGroup component when ownershipTypeId is equal to $ownershipTypeId',
      ({ ownershipTypeId }) => {
        // * ARRANGE
        const expectedText = '[Private Equity Groups]';
        const selectClientInformationView = {
          ...fakeClientInformationView,
          formData: { ...fakeClientInformationView.formData, ownershipTypeId }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientInformationView);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByText(expectedText)).toBeInTheDocument();
      }
    );

    it.each([{ ownershipTypeId: null }, { ownershipTypeId: faker.datatype.number() }])(
      'does not render privateEquityGroup component when ownershipTypeId is equal to $ownershipTypeId',
      ({ ownershipTypeId }) => {
        // * ARRANGE
        const expectedText = '[Private Equity Groups]';
        const selectClientInformationView = {
          ...fakeClientInformationView,
          formData: { ...fakeClientInformationView.formData, ownershipTypeId }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientInformationView);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.queryByText(expectedText)).not.toBeInTheDocument();
      }
    );
  });
});
