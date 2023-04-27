import ReactDOM from 'react-dom';
import { render, screen, fireEvent, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import SORT_DIRECTION from '../../../../../helpers/enums/sortDirection';
import PmArray from '../../../../../helpers/customTypes/PmArray';
import newEngagementInstanceSlice from '../../newEngagementInstanceSlice';
import PhoneNumber from './PhoneNumber';

// **********************************************************************
// * constants

const testIds = {
  // form fields
  formGroup: 'form-group',
  countryHierarchyReferenceId: 'country-hierarchy-reference-id',
  phoneNumber: 'phone-number',
  isPrimary: 'is-primary',

  // selectBox events
  selectInputOnChange: 'select-input-on-change',

  // textBox events
  textInputOnChange: 'text-input-on-change',

  // radioButtonList events
  radioButtonInputOnChange: 'radio-button-input-on-change'
};

const defaultProps = {
  name: faker.random.alphaNumeric(10),
  label: faker.random.alphaNumeric(10),
  countryHierarchyReferenceId: faker.random.alphaNumeric(10),
  phoneNumber: faker.random.alphaNumeric(10),
  isPrimary: faker.datatype.boolean(),
  isRow: faker.datatype.boolean(),
  disabled: faker.datatype.boolean(),
  onChange: jest.fn()
};

const fakeLookups = {
  countries: {
    data: [],
    isLoading: faker.datatype.boolean(),
    loadingText: faker.random.alphaNumeric(10),
    error: null
  }
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <PhoneNumber {...props} />;
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
    selectLookups: jest.fn()
  };
});

jest.mock('../../../../common/formGroup/FormGroup', () => {
  return {
    __esModule: true,
    default: ({ name, label, isRow, children }) => {
      const props = { name, label, isRow, children };
      return <fake-form-group data-testid={testIds.formGroup} {...props} />;
    }
  };
});

jest.mock('../../../../common/inputControls/selectInput/SelectInput', () => ({
  __esModule: true,
  default: ({ name, value, defaultOption, options, onChange, isLoading, loadingText, disabled }) => {
    const props = { name, value, defaultOption, isLoading, loadingText, disabled };
    return (
      <fake-select-box {...props} options={JSON.stringify(options)} data-testid={testIds.countryHierarchyReferenceId}>
        <input
          type="test"
          data-testid={`${testIds.countryHierarchyReferenceId}-${testIds.selectInputOnChange}`}
          onChange={onChange}
        />
      </fake-select-box>
    );
  }
}));

jest.mock('../../../../common/inputControls/textInput/TextInput', () => ({
  __esModule: true,
  default: ({ name, value, placeholder, onChange, disabled }) => {
    const props = { name, value, placeholder, disabled };
    return (
      <fake-text-box {...props} data-testid={testIds.phoneNumber}>
        <input type="test" data-testid={`${testIds.phoneNumber}-${testIds.textInputOnChange}`} onChange={onChange} />
      </fake-text-box>
    );
  }
}));

jest.mock('../../../../common/inputControls/radioButtonInput/RadioButtonInput', () => ({
  __esModule: true,
  default: ({ name, id, label, value, isInline, isSelected, onChange, disabled }) => {
    const props = { name, id, label, value, isInline, isSelected, disabled };
    return (
      <fake-radio-button-input {...props} data-testid={testIds.isPrimary}>
        <input
          type="test"
          data-testid={`${testIds.isPrimary}-${testIds.radioButtonInputOnChange}`}
          onChange={onChange}
        />
      </fake-radio-button-input>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('PhoneNumber', () => {
  // **********************************************************************
  // * setup
  beforeEach(() => {
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
        expect(screen.getByTestId(testIds.countryHierarchyReferenceId)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
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
        expect(screen.getByTestId(testIds.countryHierarchyReferenceId)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });
    });
  });

  describe('FormGroup', () => {
    it('has correct name prop', () => {
      const name = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, name };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.formGroup)).toHaveAttribute('name', name);
    });

    it('has correct label prop', () => {
      const label = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, label };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.formGroup)).toHaveAttribute('label', label);
    });

    it('has correct isRow prop', () => {
      const isRow = faker.datatype.boolean();
      const props = { ...defaultProps, isRow };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.formGroup)).toHaveAttribute('isRow', isRow.toString());
    });
  });

  describe('countryHierarchyReferenceId', () => {
    it('renders inside the FormGroup', () => {
      render(getComponentToRender(defaultProps));
      const formGroup = screen.getByTestId(testIds.formGroup);
      expect(within(formGroup).getByTestId(testIds.countryHierarchyReferenceId)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const name = `${defaultProps.name}_countryHierarchyReferenceId`;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.countryHierarchyReferenceId)).toHaveAttribute('name', name);
    });

    it('has correct value prop', () => {
      const countryHierarchyReferenceId = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, countryHierarchyReferenceId };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.countryHierarchyReferenceId)).toHaveAttribute(
        'value',
        countryHierarchyReferenceId
      );
    });

    it('has correct defaultOption prop', () => {
      const defaultOption = 'Select a country';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.countryHierarchyReferenceId)).toHaveAttribute('defaultOption', defaultOption);
    });

    it('has correct options prop', () => {
      const expectedOptions = JSON.stringify([]);
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.countryHierarchyReferenceId)).toHaveAttribute('options', expectedOptions);
    });

    it('has correct isLoading prop', () => {
      const isLoading = faker.datatype.boolean();
      newEngagementInstanceSlice.selectLookups.mockReturnValue({
        ...fakeLookups,
        countries: { ...fakeLookups.countries, isLoading }
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.countryHierarchyReferenceId)).toHaveAttribute(
        'isLoading',
        isLoading.toString()
      );
    });

    it('has correct loadingText prop', () => {
      const loadingText = 'Loading countries...';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.countryHierarchyReferenceId)).toHaveAttribute('loadingText', loadingText);
    });

    it('has correct disabled prop', () => {
      const disabled = faker.datatype.boolean();
      const props = { ...defaultProps, disabled };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.countryHierarchyReferenceId)).toHaveAttribute('disabled', disabled.toString());
    });

    describe('functional', () => {
      it('invokes onChange when the SelectInput change event is triggered', () => {
        render(getComponentToRender(defaultProps));
        const propertyName = faker.random.alphaNumeric(10);
        const event = {
          target: { name: `${defaultProps.name}_${propertyName}`, value: faker.datatype.boolean().toString() }
        };
        fireEvent.change(
          screen.getByTestId(`${testIds.countryHierarchyReferenceId}-${testIds.selectInputOnChange}`),
          event
        );
        expect(defaultProps.onChange).toHaveBeenCalledWith({
          name: defaultProps.name,
          countryHierarchyReferenceId: defaultProps.countryHierarchyReferenceId,
          phoneNumber: defaultProps.phoneNumber,
          isPrimary: defaultProps.isPrimary,
          [propertyName]: event.target.value === 'true' ? true : event.target.value
        });
      });
    });
  });

  describe('phoneNumber', () => {
    it('renders inside the FormGroup', () => {
      render(getComponentToRender(defaultProps));
      const formGroup = screen.getByTestId(testIds.formGroup);
      expect(within(formGroup).getByTestId(testIds.phoneNumber)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const name = `${defaultProps.name}_phoneNumber`;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.phoneNumber)).toHaveAttribute('name', name);
    });

    it('has correct value prop', () => {
      const phoneNumber = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, phoneNumber };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.phoneNumber)).toHaveAttribute('value', phoneNumber);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.phoneNumber)).toHaveAttribute('placeholder', expectedPlaceHolder);
    });

    it('has correct disabled prop', () => {
      const disabled = faker.datatype.boolean();
      const props = { ...defaultProps, disabled };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.phoneNumber)).toHaveAttribute('disabled', disabled.toString());
    });

    describe('functional', () => {
      it('invokes onChange when the TextInput change event is triggered', () => {
        render(getComponentToRender(defaultProps));
        const propertyName = faker.random.alphaNumeric(10);
        const event = {
          target: { name: `${defaultProps.name}_${propertyName}`, value: faker.random.alpha(10) }
        };
        fireEvent.change(screen.getByTestId(`${testIds.phoneNumber}-${testIds.textInputOnChange}`), event);
        expect(defaultProps.onChange).toHaveBeenCalledWith({
          name: defaultProps.name,
          countryHierarchyReferenceId: defaultProps.countryHierarchyReferenceId,
          phoneNumber: defaultProps.phoneNumber,
          isPrimary: defaultProps.isPrimary,
          [propertyName]: event.target.value === 'true' ? true : event.target.value
        });
      });
    });
  });

  describe('isPrimary', () => {
    it('renders inside the FormGroup', () => {
      render(getComponentToRender(defaultProps));
      const formGroup = screen.getByTestId(testIds.formGroup);
      expect(within(formGroup).getByTestId(testIds.isPrimary)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const name = `${defaultProps.name}_isPrimary`;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isPrimary)).toHaveAttribute('name', name);
    });

    it('has correct id prop', () => {
      const id = `${defaultProps.name}_isPrimary`;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.isPrimary)).toHaveAttribute('id', id);
    });

    it('has correct value prop', () => {
      const value = true;
      const props = { ...defaultProps, value };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.isPrimary)).toHaveAttribute('value', value.toString());
    });

    it('has correct label prop', () => {
      const label = 'Primary';
      const props = { ...defaultProps, label };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.isPrimary)).toHaveAttribute('label', label);
    });

    it('has correct isSelected attribute', () => {
      const isPrimary = faker.datatype.boolean();
      const props = { ...defaultProps, isPrimary };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.isPrimary)).toHaveAttribute('isSelected', isPrimary.toString());
    });

    it('has correct isInline props', () => {
      const isInline = true;
      const props = { ...defaultProps, isInline };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.isPrimary)).toHaveAttribute('isInline', isInline.toString());
    });

    it('has correct disabled prop', () => {
      const disabled = faker.datatype.boolean();
      const props = { ...defaultProps, disabled };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.isPrimary)).toHaveAttribute('disabled', disabled.toString());
    });

    describe('functional', () => {
      it('invokes onChange when the RadioButtonInput change event is triggered', () => {
        render(getComponentToRender(defaultProps));
        const propertyName = faker.random.alphaNumeric(10);
        const event = { target: { name: `${defaultProps.name}_${propertyName}`, value: 'true' } };
        fireEvent.change(screen.getByTestId(`${testIds.isPrimary}-${testIds.radioButtonInputOnChange}`), event);
        expect(defaultProps.onChange).toHaveBeenCalledWith({
          name: defaultProps.name,
          countryHierarchyReferenceId: defaultProps.countryHierarchyReferenceId,
          phoneNumber: defaultProps.phoneNumber,
          isPrimary: defaultProps.isPrimary,
          [propertyName]: event.target.value === 'true' ? true : event.target.value
        });
      });
    });
  });
});
