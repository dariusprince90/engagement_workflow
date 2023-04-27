import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import SORT_DIRECTION from '../../../../../../helpers/enums/sortDirection';
import TIN_FIELD_TYPES from '../../../../../../helpers/enums/tinFieldTypes';
import PmArray from '../../../../../../helpers/customTypes/PmArray';
import newEngagementInstanceSlice from '../../../newEngagementInstanceSlice';
import * as newEngagementInstanceThunks from '../../../newEngagementInstanceThunks';
import ClientDetailsFields from './ClientDetailsFields';

// **********************************************************************
// * constants

const testIds = {
  // form fields
  tinCountry: 'tin-country',
  taxTypeId: 'tax-type-id',
  taxPayerIdentificationNumber: 'tax-payer-identification-number',
  taxPayerIdentificationNumberMasked: 'tax-payer-identification-number-masked',
  industryName: 'industry-name',
  verticalName: 'vertical-name',
  industryHierarchyId: 'industry-hierarchy-id',
  marketSectorId: 'market-sector-id',
  relationshipPartnerStaffNumber: 'relationship-partner-staff-number',

  // auto-complete events
  autoCompleteOnClearData: 'auto-complete-on-clear-data',
  autoCompleteOnResetItem: 'auto-complete-on-reset-item',
  autoCompleteOnSearch: 'auto-complete-on-search',
  autoCompleteOnSelect: 'auto-complete-on-select'
};

const defaultProps = {
  disabled: faker.datatype.boolean(),
  tinFieldOptions: {
    show: faker.datatype.boolean(),
    type: faker.datatype.number({ min: TIN_FIELD_TYPES.full, max: TIN_FIELD_TYPES.masked }),
    allowMaskedEdit: faker.datatype.boolean()
  }
};

const hocInjectedProps = {
  handleAutoCompleteDataCleared: jest.fn(),
  handleAutoCompleteItemReset: jest.fn(),
  handleAutoCompleteItemSelected: jest.fn(),
  handleAutoCompleteSearch: jest.fn(),
  handleInputFieldValueChanged: jest.fn()
};

const fakeSelectClientView = {
  formData: { id: faker.datatype.number() },
  lookups: {
    staff: { data: [], isLoading: false, hasError: false, error: null }
  }
};

const fakeLookups = {
  countries: {
    data: [],
    isLoading: faker.datatype.boolean(),
    loadingText: faker.random.alphaNumeric(10),
    error: null
  },

  industryHierarchies: {
    data: [],
    isLoading: faker.datatype.boolean(),
    loadingText: faker.random.alphaNumeric(10),
    error: null
  },

  marketSectors: {
    data: [],
    isLoading: faker.datatype.boolean(),
    loadingText: faker.random.alphaNumeric(10),
    error: null
  },

  taxTypes: {
    data: [],
    isLoading: faker.datatype.boolean(),
    loadingText: faker.random.alphaNumeric(10),
    error: null
  }
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ClientDetailsFields {...props} {...hocInjectedProps} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => callback()
  };
});

jest.mock('../../../newEngagementInstanceSlice', () => {
  return {
    selectCurrentView: jest.fn(),
    selectLookups: jest.fn()
  };
});

jest.mock('../../../newEngagementInstanceThunks', () => {
  return {
    tempThunk: jest.fn()
  };
});

jest.mock('../../withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../components/autoComplete/AutoComplete', () => ({
  __esModule: true,
  default: ({
    name,
    label,
    placeholder,
    selectedItem,
    matches,
    sourcePropertyNames,
    disabled,
    onClearData,
    onResetItem,
    onSearch,
    onSelect
  }) => {
    const props = { name, label, placeholder, disabled };

    // this is needed as we need a fake event passed to onSearch
    const event = 'fake-event';

    return (
      <fake-auto-complete
        {...props}
        selectedItem={JSON.stringify(selectedItem)}
        matches={JSON.stringify(matches)}
        sourcePropertyNames={JSON.stringify(sourcePropertyNames)}
        data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.autoCompleteOnClearData}`} onClick={onClearData} />
        <button data-testid={`${testIds[name]}-${testIds.autoCompleteOnResetItem}`} onClick={onResetItem} />
        <button data-testid={`${testIds[name]}-${testIds.autoCompleteOnSelect}`} onClick={onSelect} />
        <button
          data-testid={`${testIds[name]}-${testIds.autoCompleteOnSearch}`}
          onClick={() => onSearch(event, sourcePropertyNames)}
        />
      </fake-auto-complete>
    );
  }
}));

jest.mock('../../../components/readonlyFormField/ReadonlyFormField', () => ({
  __esModule: true,
  default: ({ name, label, value, isRow, icon }) => {
    const props = { name, label, value, isRow };
    return (
      <fake-readonly-form-field
        {...props}
        icon={JSON.stringify(icon)}
        data-testid={testIds[name]}
        onClick={icon?.onClick}
      />
    );
  }
}));

jest.mock('../../../components/selectBox/SelectBox', () => ({
  __esModule: true,
  default: ({ name, label, defaultOption, options, onChange, isLoading, loadingText, value, disabled }) => {
    const props = { name, label, defaultOption, isLoading, loadingText, value, disabled };
    return (
      <fake-select-box {...props} options={JSON.stringify(options)} data-testid={testIds[name]} onClick={onChange} />
    );
  }
}));

jest.mock('../../../components/textBox/TextBox', () => ({
  __esModule: true,
  default: ({ name, label, placeholder, onChange, value, disabled }) => {
    const props = { name, label, placeholder, value, disabled };
    return <fake-text-box {...props} data-testid={testIds[name]} onClick={onChange} />;
  }
}));

// **********************************************************************
// * unit tests

describe('ClientDetailsFields', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeSelectClientView);
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

  describe('on-load', () => {
    describe('country name options', () => {
      it('sets the country name options to an empty array when countries.data has no items', () => {
        // * Arrange
        const countries = [];
        const expectedOptions = [];

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          countries: { ...fakeLookups.countries, data: countries }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.tinCountry)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });

      it('sets the country name options when countries.data has items', () => {
        // * Arrange
        const itemCount = faker.datatype.number({ min: 30, max: 50 });
        const countries = [...Array(itemCount).keys()].map(() => ({
          countryHierarchyReferenceId: faker.lorem.word(3),
          displayName: faker.random.alphaNumeric(10),
          isActive: faker.datatype.boolean()
        }));

        // we expect a sorted list of active countries
        const expectedCountries = new PmArray(...countries)
          .filter((ch) => ch.isActive)
          .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

        const expectedOptions = expectedCountries.map((country) => ({
          value: country.countryHierarchyReferenceId,
          text: country.displayName
        }));

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          countries: { ...fakeLookups.countries, data: countries }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.tinCountry)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });
    });

    describe('tax type options', () => {
      it('sets the tax type options to an empty array when taxTypes.data has no items and formData.tinCountry has a value', () => {
        // * Arrange
        const taxTypes = [];
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, tinCountry: faker.datatype.number() }
        };

        const expectedOptions = [];

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          taxTypes: { ...fakeLookups.taxTypes, data: taxTypes }
        });
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.taxTypeId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });

      it('sets the tax type options to an empty array when taxTypes.data has items and formData.tinCountry has no value', () => {
        // * Arrange
        const taxTypes = faker.datatype.array();
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, tinCountry: null }
        };

        const expectedOptions = [];

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          taxTypes: { ...fakeLookups.taxTypes, data: taxTypes }
        });
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.taxTypeId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });

      it('sets the tax type options when taxTypes.data has items and formData.tinCountry has a value', () => {
        // * Arrange
        const tinCountry = faker.random.alphaNumeric(10);
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, tinCountry }
        };
        const itemCount = faker.datatype.number({ min: 20, max: 30 });
        const taxTypes = [...Array(itemCount).keys()].map((_, index) => ({
          countryHierarchyReferenceId: index % 2 === 0 ? tinCountry : faker.random.alphaNumeric(10),
          displayName: faker.random.alphaNumeric(10),
          isActive: faker.datatype.boolean()
        }));

        // we expect a sorted list of active tax types for the tinCountry
        const expectedTaxTypes = new PmArray(...taxTypes)
          .filter((tt) => tt.isActive && tt.countryHierarchyReferenceId === tinCountry)
          .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

        const expectedOptions = expectedTaxTypes.map((tt) => ({ value: tt.id, text: tt.displayName }));

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          taxTypes: { ...fakeLookups.taxTypes, data: taxTypes }
        });
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.taxTypeId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });
    });

    describe('industry name options', () => {
      it('sets the industry name options to an empty array when industryHierarchies.data has no items', () => {
        // * Arrange
        const industryHierarchies = [];
        const expectedOptions = [];

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          industryHierarchies: { ...fakeLookups.industryHierarchies, data: industryHierarchies }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.industryName)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });

      it('sets the industry name options when industryHierarchies.data has items', () => {
        // * Arrange
        const itemCount = faker.datatype.number({ min: 30, max: 50 });
        const industryHierarchies = [...Array(itemCount).keys()].map(() => ({
          // using short lorem words since we are quite likely to get dupes every time
          // this will allow the filtering of dupes out to be tested as well
          displayName: faker.lorem.word(4),
          isActive: faker.datatype.boolean()
        }));

        // we expect a sorted, unique list of display names for active industry hierarchies
        const expectedDisplayNames = [
          ...new Set(
            industryHierarchies
              .filter((ih) => ih.isActive)
              .map((ih) => ih.displayName)
              .sort()
          )
        ];

        const expectedOptions = expectedDisplayNames.map((displayName) => ({ value: displayName, text: displayName }));

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          industryHierarchies: { ...fakeLookups.industryHierarchies, data: industryHierarchies }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.industryName)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });
    });

    describe('vertical name options', () => {
      it('sets the vertical name options to an empty array when industryHierarchies.data has no items and formData.industryName has a value', () => {
        // * Arrange
        const industryHierarchies = [];
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, industryName: faker.random.alphaNumeric(10) }
        };

        const expectedOptions = [];

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          industryHierarchies: { ...fakeLookups.industryHierarchies, data: industryHierarchies }
        });
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.taxTypeId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });

      it('sets the vertical name options to an empty array when industryHierarchies.data has items and formData.industryName has no value', () => {
        // * Arrange
        const industryHierarchies = faker.datatype.array();
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, industryName: null }
        };

        const expectedOptions = [];

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          industryHierarchies: { ...fakeLookups.industryHierarchies, data: industryHierarchies }
        });
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.verticalName)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });

      it('sets the vertical name options when industryHierarchies.data has items and formData.industryName has a value', () => {
        // * Arrange
        const industryName = faker.random.alphaNumeric(10);
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, industryName }
        };
        const itemCount = faker.datatype.number({ min: 20, max: 30 });
        const industryHierarchies = [...Array(itemCount).keys()].map((_, index) => ({
          verticalName: faker.lorem.word(4),
          displayName: index % 2 === 0 ? industryName : faker.random.alphaNumeric(10),
          isActive: faker.datatype.boolean()
        }));

        // we expect a sorted list of vertical names for active industry hierarchies with the given industry name
        const expectedVerticalNames = [
          ...new Set(
            industryHierarchies
              .filter((ih) => ih.isActive && ih.displayName === industryName)
              .map((ih) => ih.verticalName)
              .sort()
          )
        ];

        const expectedOptions = expectedVerticalNames.map((verticalName) => ({
          value: verticalName,
          text: verticalName
        }));

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          industryHierarchies: { ...fakeLookups.industryHierarchies, data: industryHierarchies }
        });
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.verticalName)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });
    });

    describe('industry hierarchy id options', () => {
      it('sets the industry hierarchy id options to an empty array when industryHierarchies.data has no items and formData.industryName and formData.verticalName have values', () => {
        // * Arrange
        const industryHierarchies = [];
        const industryName = faker.random.alphaNumeric(10);
        const verticalName = faker.random.alphaNumeric(10);
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, industryName, verticalName }
        };

        const expectedOptions = [];

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          industryHierarchies: { ...fakeLookups.industryHierarchies, data: industryHierarchies }
        });
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.industryHierarchyId)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('sets the industry hierarchy id options to an empty array when industryHierarchies.data has items and formData.industryName has a value and formData.verticalName has no value', () => {
        // * Arrange
        const industryHierarchies = faker.datatype.array();
        const industryName = faker.random.alphaNumeric(10);
        const verticalName = null;
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, industryName, verticalName }
        };

        const expectedOptions = [];

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          industryHierarchies: { ...fakeLookups.industryHierarchies, data: industryHierarchies }
        });
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.industryHierarchyId)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('sets the industry hierarchy id options to an empty array when industryHierarchies.data has items and formData.industryName has no value and formData.verticalName has a value', () => {
        // * Arrange
        const industryHierarchies = faker.datatype.array();
        const industryName = null;
        const verticalName = faker.random.alphaNumeric(10);
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, industryName, verticalName }
        };

        const expectedOptions = [];

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          industryHierarchies: { ...fakeLookups.industryHierarchies, data: industryHierarchies }
        });
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.industryHierarchyId)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('sets the industry hierarchy id options when industryHierarchies.data has items and formData.industryName and formData.verticalName have values', () => {
        // * Arrange
        const industryName = faker.random.alphaNumeric(10);
        const verticalName = faker.random.alphaNumeric(10);
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, industryName, verticalName }
        };
        const itemCount = faker.datatype.number({ min: 20, max: 30 });
        const industryHierarchies = [...Array(itemCount).keys()].map((_, index) => ({
          id: faker.datatype.number(),
          subVerticalName: faker.random.alphaNumeric(10),
          verticalName: index % 2 === 0 ? verticalName : faker.random.alphaNumeric(10),
          displayName: index % 2 === 0 ? industryName : faker.random.alphaNumeric(10),
          isActive: faker.datatype.boolean()
        }));

        // we expect a sorted array of active industry hierarchies for the given industry name and vertical name
        const expectedIndustryHierarchies = new PmArray(...industryHierarchies)
          .filter((ih) => ih.isActive && ih.displayName === industryName && ih.verticalName === verticalName)
          .sortObjects('subVerticalName', SORT_DIRECTION.ascending.abbreviation);

        const expectedOptions = expectedIndustryHierarchies.map((ih) => ({ value: ih.id, text: ih.subVerticalName }));

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          industryHierarchies: { ...fakeLookups.industryHierarchies, data: industryHierarchies }
        });
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.industryHierarchyId)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });
    });

    describe('market sector options', () => {
      it('sets the market sector options to an empty array when marketSectors.data has no items', () => {
        // * Arrange
        const marketSectors = [];
        const expectedOptions = [];

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          marketSectors: { ...fakeLookups.marketSectors, data: marketSectors }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.marketSectorId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });

      it('sets the market sector options when marketSectors.data has items', () => {
        // * Arrange
        const itemCount = faker.datatype.number({ min: 30, max: 50 });
        const marketSectors = [...Array(itemCount).keys()].map(() => ({
          id: faker.datatype.number(),
          displayName: faker.random.alphaNumeric(10),
          isActive: faker.datatype.boolean()
        }));

        // we expect a sorted array of active market sectors
        const expectedMarketSectors = new PmArray(...marketSectors)
          .filter((ms) => ms.isActive)
          .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

        const expectedOptions = expectedMarketSectors.map((marketSectors) => ({
          value: marketSectors.id,
          text: marketSectors.displayName
        }));

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          marketSectors: { ...fakeLookups.marketSectors, data: marketSectors }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.marketSectorId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });
    });
  });

  describe('rendering', () => {
    describe('tinCountry', () => {
      it('has correct name prop', () => {
        const expectedName = 'tinCountry';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.tinCountry)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Taxpayer Identification Number Country';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.tinCountry)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const tinCountry = faker.random.alphaNumeric(10);
        const expectedValue = tinCountry;
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, tinCountry }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.tinCountry)).toHaveAttribute('value', expectedValue);
      });

      it('has correct defaultOption prop', () => {
        const expectedDefaultOption = 'Select a TIN country';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.tinCountry)).toHaveAttribute('defaultOption', expectedDefaultOption);
      });

      it('has correct options prop (default)', () => {
        const expectedOptions = JSON.stringify([]);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.tinCountry)).toHaveAttribute('options', expectedOptions);
      });

      it('has correct isLoading prop', () => {
        const isLoading = faker.datatype.boolean();
        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          countries: { ...fakeLookups.countries, isLoading }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.tinCountry)).toHaveAttribute('isLoading', isLoading.toString());
      });

      it('has correct loadingText prop', () => {
        const loadingText = 'Loading TIN countries...';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.tinCountry)).toHaveAttribute('loadingText', loadingText);
      });

      it('has correct disabled prop', () => {
        const disabled = faker.datatype.boolean();
        const props = { ...defaultProps, disabled };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.tinCountry)).toHaveAttribute('disabled', disabled.toString());
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(testIds.tinCountry));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('taxTypeId', () => {
      it('has correct name prop', () => {
        const expectedName = 'taxTypeId';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxTypeId)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Taxpayer Identification Number Type';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxTypeId)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const taxTypeId = faker.datatype.number();
        const expectedValue = taxTypeId;
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, taxTypeId }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxTypeId)).toHaveAttribute('value', expectedValue.toString());
      });

      it('has correct defaultOption prop', () => {
        const expectedDefaultOption = 'Select a TIN type';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxTypeId)).toHaveAttribute('defaultOption', expectedDefaultOption);
      });

      it('has correct options prop (default)', () => {
        const expectedOptions = JSON.stringify([]);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxTypeId)).toHaveAttribute('options', expectedOptions);
      });

      it('has correct isLoading prop', () => {
        const isLoading = faker.datatype.boolean();
        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          taxTypes: { ...fakeLookups.taxTypes, isLoading }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxTypeId)).toHaveAttribute('isLoading', isLoading.toString());
      });

      it('has correct loadingText prop', () => {
        const loadingText = 'Loading TIN types...';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.taxTypeId)).toHaveAttribute('loadingText', loadingText);
      });

      it('has correct disabled prop', () => {
        const disabled = faker.datatype.boolean();
        const props = { ...defaultProps, disabled };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.taxTypeId)).toHaveAttribute('disabled', disabled.toString());
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(testIds.taxTypeId));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('taxPayerIdentificationNumber', () => {
      it.each([
        { show: false, type: TIN_FIELD_TYPES.full },
        { show: true, type: TIN_FIELD_TYPES.masked }
      ])('does not render when tinFieldOptions.show is $show and tinFieldOptions.type is $type', ({ show, type }) => {
        const tinFieldOptions = { show, type, allowMaskedEdit: faker.datatype.boolean() };
        const props = { ...defaultProps, tinFieldOptions };
        render(getComponentToRender(props));
        expect(screen.queryByTestId(testIds.taxPayerIdentificationNumber)).not.toBeInTheDocument();
      });

      describe('when tinFieldOptions.show is true and tinFieldOptions.type is full', () => {
        const tinFieldOptions = { show: true, type: TIN_FIELD_TYPES.full, allowMaskedEdit: faker.datatype.boolean() };
        const defaultLocalProps = { ...defaultProps, tinFieldOptions };

        it('has correct name prop', () => {
          const expectedName = 'taxPayerIdentificationNumber';
          render(getComponentToRender(defaultLocalProps));
          expect(screen.getByTestId(testIds.taxPayerIdentificationNumber)).toHaveAttribute('name', expectedName);
        });

        it('has correct label prop', () => {
          const expectedLabel = 'Taxpayer Identification Number';
          render(getComponentToRender(defaultLocalProps));
          expect(screen.getByTestId(testIds.taxPayerIdentificationNumber)).toHaveAttribute('label', expectedLabel);
        });

        it('has correct placeholder prop', () => {
          const expectedPlaceholder = 'Enter a tin';
          render(getComponentToRender(defaultLocalProps));
          expect(screen.getByTestId(testIds.taxPayerIdentificationNumber)).toHaveAttribute(
            'placeholder',
            expectedPlaceholder
          );
        });

        it('has correct value prop', () => {
          const taxPayerIdentificationNumber = faker.random.alphaNumeric(10);
          const expectedValue = taxPayerIdentificationNumber;
          const selectClientView = {
            ...fakeSelectClientView,
            formData: { ...fakeSelectClientView.formData, taxPayerIdentificationNumber }
          };
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
          render(getComponentToRender(defaultLocalProps));
          expect(screen.getByTestId(testIds.taxPayerIdentificationNumber)).toHaveAttribute('value', expectedValue);
        });

        it('has correct disabled prop', () => {
          const disabled = faker.datatype.boolean();
          const props = { ...defaultLocalProps, disabled };
          render(getComponentToRender(props));
          expect(screen.getByTestId(testIds.taxPayerIdentificationNumber)).toHaveAttribute(
            'disabled',
            disabled.toString()
          );
        });

        describe('functional', () => {
          it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
            render(getComponentToRender(defaultLocalProps));
            fireEvent.click(screen.getByTestId(testIds.taxPayerIdentificationNumber));
            expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
          });
        });
      });
    });

    describe('taxPayerIdentificationNumberMasked', () => {
      it.each([
        { show: false, type: TIN_FIELD_TYPES.masked },
        { show: true, type: TIN_FIELD_TYPES.full }
      ])('does not render when tinFieldOptions.show is $show and tinFieldOptions.type is $type', ({ show, type }) => {
        const tinFieldOptions = { show, type, allowMaskedEdit: faker.datatype.boolean() };
        const props = { ...defaultProps, tinFieldOptions };
        render(getComponentToRender(props));
        expect(screen.queryByTestId(testIds.taxPayerIdentificationNumberMasked)).not.toBeInTheDocument();
      });

      describe('when tinFieldOptions.show is true and tinFieldOptions.type is full', () => {
        const tinFieldOptions = { show: true, type: TIN_FIELD_TYPES.masked, allowMaskedEdit: faker.datatype.boolean() };
        const defaultLocalProps = { ...defaultProps, tinFieldOptions };

        it('has correct name prop', () => {
          const expectedName = 'taxPayerIdentificationNumberMasked';
          render(getComponentToRender(defaultLocalProps));
          expect(screen.getByTestId(testIds.taxPayerIdentificationNumberMasked)).toHaveAttribute('name', expectedName);
        });

        it('has correct label prop', () => {
          const expectedLabel = 'Taxpayer Identification Number';
          render(getComponentToRender(defaultLocalProps));
          expect(screen.getByTestId(testIds.taxPayerIdentificationNumberMasked)).toHaveAttribute(
            'label',
            expectedLabel
          );
        });

        it('has correct value prop', () => {
          const taxPayerIdentificationNumberMasked = faker.random.alphaNumeric(10);
          const expectedValue = taxPayerIdentificationNumberMasked;
          const selectClientView = {
            ...fakeSelectClientView,
            formData: { ...fakeSelectClientView.formData, taxPayerIdentificationNumberMasked }
          };
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
          render(getComponentToRender(defaultLocalProps));
          expect(screen.getByTestId(testIds.taxPayerIdentificationNumberMasked)).toHaveAttribute(
            'value',
            expectedValue
          );
        });

        it('has correct icon prop when tinFieldOptions.allowMaskedEdit is true', () => {
          const tinFieldOptions = { ...defaultLocalProps.tinFieldOptions, allowMaskedEdit: true };
          const props = { ...defaultLocalProps, tinFieldOptions };
          const expectedIcon = {
            type: 'fa-solid fa-pen-to-square',
            title: 'Edit taxpayer identification number',
            className: 'text-info'
          };
          render(getComponentToRender(props));
          expect(screen.getByTestId(testIds.taxPayerIdentificationNumberMasked)).toHaveAttribute(
            'icon',
            JSON.stringify(expectedIcon)
          );
        });

        it('has correct icon prop when tinFieldOptions.allowMaskedEdit is false', () => {
          const tinFieldOptions = { ...defaultLocalProps.tinFieldOptions, allowMaskedEdit: false };
          const props = { ...defaultLocalProps, tinFieldOptions };
          const expectedIcon = 'null';
          render(getComponentToRender(props));
          expect(screen.getByTestId(testIds.taxPayerIdentificationNumberMasked)).toHaveAttribute('icon', expectedIcon);
        });

        describe('functional', () => {
          // todo: update test once the functionality is implemented
          it('does nothing when the icon is clicked', () => {
            const tinFieldOptions = { ...defaultLocalProps.tinFieldOptions, allowMaskedEdit: true };
            const props = { ...defaultLocalProps, tinFieldOptions };
            render(getComponentToRender(props));
            fireEvent.click(screen.getByTestId(testIds.taxPayerIdentificationNumberMasked));
          });
        });
      });
    });

    describe('industryName', () => {
      it('has correct name prop', () => {
        const expectedName = 'industryName';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.industryName)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Industry';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.industryName)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const industryName = faker.random.alphaNumeric(10);
        const expectedValue = industryName;
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, industryName }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.industryName)).toHaveAttribute('value', expectedValue);
      });

      it('has correct defaultOption prop', () => {
        const expectedDefaultOption = 'Select an industry';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.industryName)).toHaveAttribute('defaultOption', expectedDefaultOption);
      });

      it('has correct options prop (default)', () => {
        const expectedOptions = JSON.stringify([]);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.industryName)).toHaveAttribute('options', expectedOptions);
      });

      it('has correct isLoading prop', () => {
        const isLoading = faker.datatype.boolean();
        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          industryHierarchies: { ...fakeLookups.industryHierarchies, isLoading }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.industryName)).toHaveAttribute('isLoading', isLoading.toString());
      });

      it('has correct loadingText prop', () => {
        const loadingText = 'Loading industries...';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.industryName)).toHaveAttribute('loadingText', loadingText);
      });

      it('has correct disabled prop', () => {
        const disabled = faker.datatype.boolean();
        const props = { ...defaultProps, disabled };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.industryName)).toHaveAttribute('disabled', disabled.toString());
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(testIds.industryName));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('verticalName', () => {
      it('has correct name prop', () => {
        const expectedName = 'verticalName';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.verticalName)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Industry Vertical';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.verticalName)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const verticalName = faker.random.alphaNumeric(10);
        const expectedValue = verticalName;
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, verticalName }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.verticalName)).toHaveAttribute('value', expectedValue);
      });

      it('has correct defaultOption prop', () => {
        const expectedDefaultOption = 'Select a vertical';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.verticalName)).toHaveAttribute('defaultOption', expectedDefaultOption);
      });

      it('has correct options prop (default)', () => {
        const expectedOptions = JSON.stringify([]);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.verticalName)).toHaveAttribute('options', expectedOptions);
      });

      it('has correct isLoading prop', () => {
        const isLoading = faker.datatype.boolean();
        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          industryHierarchies: { ...fakeLookups.industryHierarchies, isLoading }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.verticalName)).toHaveAttribute('isLoading', isLoading.toString());
      });

      it('has correct loadingText prop', () => {
        const loadingText = 'Loading industry verticals...';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.verticalName)).toHaveAttribute('loadingText', loadingText);
      });

      it('has correct disabled prop', () => {
        const disabled = faker.datatype.boolean();
        const props = { ...defaultProps, disabled };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.verticalName)).toHaveAttribute('disabled', disabled.toString());
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(testIds.verticalName));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('industryHierarchyId', () => {
      it('has correct name prop', () => {
        const expectedName = 'industryHierarchyId';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.industryHierarchyId)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Industry Sub-Vertical';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.industryHierarchyId)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const industryHierarchyId = faker.datatype.number();
        const expectedValue = industryHierarchyId;
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, industryHierarchyId }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.industryHierarchyId)).toHaveAttribute('value', expectedValue.toString());
      });

      it('has correct defaultOption prop', () => {
        const expectedDefaultOption = 'Select a sub-vertical';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.industryHierarchyId)).toHaveAttribute('defaultOption', expectedDefaultOption);
      });

      it('has correct options prop (default)', () => {
        const expectedOptions = JSON.stringify([]);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.industryHierarchyId)).toHaveAttribute('options', expectedOptions);
      });

      it('has correct isLoading prop', () => {
        const isLoading = faker.datatype.boolean();
        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          industryHierarchies: { ...fakeLookups.industryHierarchies, isLoading }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.industryHierarchyId)).toHaveAttribute('isLoading', isLoading.toString());
      });

      it('has correct loadingText prop', () => {
        const loadingText = 'Loading industry sub-verticals...';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.industryHierarchyId)).toHaveAttribute('loadingText', loadingText);
      });

      it('has correct disabled prop', () => {
        const disabled = faker.datatype.boolean();
        const props = { ...defaultProps, disabled };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.industryHierarchyId)).toHaveAttribute('disabled', disabled.toString());
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(testIds.industryHierarchyId));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('marketSectorId', () => {
      it('has correct name prop', () => {
        const expectedName = 'marketSectorId';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.marketSectorId)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Market Sector';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.marketSectorId)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const marketSectorId = faker.datatype.number();
        const expectedValue = marketSectorId;
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, marketSectorId }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.marketSectorId)).toHaveAttribute('value', expectedValue.toString());
      });

      it('has correct defaultOption prop', () => {
        const expectedDefaultOption = 'Select a market sector';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.marketSectorId)).toHaveAttribute('defaultOption', expectedDefaultOption);
      });

      it('has correct options prop (default)', () => {
        const expectedOptions = JSON.stringify([]);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.marketSectorId)).toHaveAttribute('options', expectedOptions);
      });

      it('has correct isLoading prop', () => {
        const isLoading = faker.datatype.boolean();
        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          marketSectors: { ...fakeLookups.marketSectors, isLoading }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.marketSectorId)).toHaveAttribute('isLoading', isLoading.toString());
      });

      it('has correct loadingText prop', () => {
        const loadingText = 'Loading market sectors...';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.marketSectorId)).toHaveAttribute('loadingText', loadingText);
      });

      it('has correct disabled prop', () => {
        const disabled = faker.datatype.boolean();
        const props = { ...defaultProps, disabled };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.marketSectorId)).toHaveAttribute('disabled', disabled.toString());
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(testIds.marketSectorId));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('relationshipPartnerStaffNumber', () => {
      it('has correct name prop', () => {
        const expectedName = 'relationshipPartnerStaffNumber';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.relationshipPartnerStaffNumber)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Relationship Partner';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.relationshipPartnerStaffNumber)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Start typing to select a relationship partner';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.relationshipPartnerStaffNumber)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct selectedItem prop', () => {
        // * ARRANGE
        const selectClientView = {
          ...fakeSelectClientView,
          formData: {
            ...fakeSelectClientView.formData,
            relationshipPartnerStaffNumber: faker.random.alphaNumeric(10),
            relationshipPartnerDisplayName: faker.random.alphaNumeric(10)
          }
        };
        const expectedSelectedItem = {
          id: selectClientView.formData.relationshipPartnerStaffNumber,
          displayName: selectClientView.formData.relationshipPartnerDisplayName
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.relationshipPartnerStaffNumber)).toHaveAttribute(
          'selectedItem',
          JSON.stringify(expectedSelectedItem)
        );
      });

      it('has correct matches prop', () => {
        const selectClientView = {
          ...fakeSelectClientView,
          lookup: {
            ...fakeSelectClientView.lookups,
            staff: { data: faker.datatype.array(), isLoading: false, hasError: false, error: null }
          }
        };
        const expectedMatches = selectClientView.lookups.staff;
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.relationshipPartnerStaffNumber)).toHaveAttribute(
          'matches',
          JSON.stringify(expectedMatches)
        );
      });

      it('has correct sourcePropertyNames prop', () => {
        const expectedSourcePropertyNames = {
          matches: 'staff',
          value: 'relationshipPartnerStaffNumber',
          displayName: 'relationshipPartnerDisplayName'
        };
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.relationshipPartnerStaffNumber)).toHaveAttribute(
          'sourcePropertyNames',
          JSON.stringify(expectedSourcePropertyNames)
        );
      });

      it('has correct disabled prop', () => {
        const disabled = faker.datatype.boolean();
        const props = { ...defaultProps, disabled };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.relationshipPartnerStaffNumber)).toHaveAttribute(
          'disabled',
          disabled.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleAutoCompleteDataCleared when the autocomplete onClearData event is fired', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleAutoCompleteDataCleared).not.toHaveBeenCalled();
          fireEvent.click(
            screen.getByTestId(`${testIds.relationshipPartnerStaffNumber}-${testIds.autoCompleteOnClearData}`)
          );
          expect(hocInjectedProps.handleAutoCompleteDataCleared).toHaveBeenCalledTimes(1);
        });

        it('invokes handleAutoCompleteItemReset when the autocomplete onResetItem event is fired', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleAutoCompleteItemReset).not.toHaveBeenCalled();
          fireEvent.click(
            screen.getByTestId(`${testIds.relationshipPartnerStaffNumber}-${testIds.autoCompleteOnResetItem}`)
          );
          expect(hocInjectedProps.handleAutoCompleteItemReset).toHaveBeenCalledTimes(1);
        });

        it('invokes handleAutoCompleteItemSelected when the autocomplete onSelect event is fired', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleAutoCompleteItemSelected).not.toHaveBeenCalled();
          fireEvent.click(
            screen.getByTestId(`${testIds.relationshipPartnerStaffNumber}-${testIds.autoCompleteOnSelect}`)
          );
          expect(hocInjectedProps.handleAutoCompleteItemSelected).toHaveBeenCalledTimes(1);
        });

        it('invokes handleAutoCompleteSearch when the autocomplete onSearch event is fired', () => {
          const expectedSourcePropertyNames = {
            matches: 'staff',
            value: 'relationshipPartnerStaffNumber',
            displayName: 'relationshipPartnerDisplayName'
          };
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.relationshipPartnerStaffNumber}-${testIds.autoCompleteOnSearch}`)
          );
          expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalledTimes(1);
          expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalledWith(
            'fake-event',
            expectedSourcePropertyNames,
            newEngagementInstanceThunks.tempThunk
          );
        });
      });
    });
  });
});
