import ReactDOM from 'react-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../newEngagementInstanceSlice';
import SelectClientView from './SelectClientView';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',
  clientSearch: 'client-search',
  existingClientDetails: 'existing-client-details',

  // form fields
  clientSearchTypeId: 'client-search-type-id',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change'
};

const fakeSelectClientView = { formData: { id: faker.datatype.number() } };

const fakeClientSearchTypes = {
  data: [],
  isLoading: faker.datatype.boolean(),
  loadingText: faker.random.alphaNumeric(10),
  error: null
};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <SelectClientView {...hocInjectedProps} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => callback()
  };
});

jest.mock('../../newEngagementInstanceSlice', () => {
  return {
    selectCurrentView: jest.fn(),
    selectLookup: jest.fn()
  };
});

jest.mock('../withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ title, children }) => (
    <fake-collapsible-form-section title={title} children={children} data-testid={testIds.collapsibleFormSection} />
  )
}));

jest.mock('../../components/radioButtonList/RadioButtonList', () => ({
  __esModule: true,
  default: ({ name, label, options, onChange, selectedValue, isLoading, loadingText }) => {
    const props = { name, label, selectedValue, isLoading, loadingText };
    return (
      <fake-radio-button-list {...props} options={JSON.stringify(options)} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.radioButtonListOnChange}`} onClick={onChange} />
      </fake-radio-button-list>
    );
  }
}));

jest.mock('./components/ClientSearch', () => ({
  __esModule: true,
  default: () => {
    return <fake-clients-search data-testid={testIds.clientSearch} />;
  }
}));

jest.mock('./components/ExistingClientDetails', () => ({
  __esModule: true,
  default: () => {
    return <fake-existing-client-details data-testid={testIds.existingClientDetails} />;
  }
}));

// **********************************************************************
// * unit tests

describe('SelectClientView', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeSelectClientView);
    newEngagementInstanceSlice.selectLookup.mockReturnValue(fakeClientSearchTypes);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  describe('on-load', () => {
    it('sets the client search type options to an empty array when clientSearchTypes.data has no items', () => {
      // * Arrange
      const clientSearchTypesData = [];
      const expectedOptions = [];
      const clientSearchTypes = { ...fakeClientSearchTypes, data: clientSearchTypesData };
      newEngagementInstanceSlice.selectLookup.mockReturnValue(clientSearchTypes);

      // * ACT
      render(getComponentToRender());

      // * ASSERT
      expect(screen.getByTestId(testIds.clientSearchTypeId)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('sets the client search type options when clientSearchTypes.data has items', () => {
      // * Arrange
      const itemCount = faker.datatype.number({ min: 1, max: 20 });
      const clientSearchTypesData = [...Array(itemCount).keys()].map(() => ({
        description: faker.random.alphaNumeric(10),
        id: faker.datatype.number()
      }));
      const expectedOptions = clientSearchTypesData.map((clientSearchType) => ({
        value: clientSearchType.id,
        label: clientSearchType.description
      }));
      const clientSearchTypes = { ...fakeClientSearchTypes, data: clientSearchTypesData };
      newEngagementInstanceSlice.selectLookup.mockReturnValue(clientSearchTypes);

      // * ACT
      render(getComponentToRender());

      // * ASSERT
      expect(screen.getByTestId(testIds.clientSearchTypeId)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });
  });

  describe('rendering', () => {
    it('passes correct title prop to CollapsibleFormSection component', () => {
      const expectedTitle = 'Select a Client';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
    });

    describe('clientSearchTypeId', () => {
      it('renders inside collapsible form section', () => {
        render(getComponentToRender());
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.clientSearchTypeId)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'clientSearchTypeId';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientSearchTypeId)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'To start Engagement Workflow, please select an existing client or an org/contact in CRM';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientSearchTypeId)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct selectedValue prop', () => {
        // * ARRANGE
        const clientSearchTypeId = faker.datatype.number();
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientSearchTypeId }
        };
        const expectedSelectedValue = clientSearchTypeId;
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(screen.getByTestId(testIds.clientSearchTypeId)).toHaveAttribute(
          'selectedValue',
          expectedSelectedValue.toString()
        );
      });

      it('has correct options prop (default)', () => {
        const expectedOptions = [];
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientSearchTypeId)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('has correct isLoading prop', () => {
        const isLoading = faker.datatype.boolean();
        newEngagementInstanceSlice.selectLookup.mockReturnValue({ ...fakeClientSearchTypes, isLoading });
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientSearchTypeId)).toHaveAttribute('isLoading', isLoading.toString());
      });

      it('has correct loadingText prop', () => {
        const expectedLoadingText = 'Loading options...';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientSearchTypeId)).toHaveAttribute('loadingText', expectedLoadingText);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender());
          fireEvent.click(screen.getByTestId(`${testIds.clientSearchTypeId}-${testIds.radioButtonListOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('ClientSearch', () => {
      it('renders inside collapsible form section', () => {
        render(getComponentToRender());
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.clientSearch)).toBeInTheDocument();
      });
    });

    describe('ExistingClientDetails', () => {
      it('renders inside collapsible form section', () => {
        render(getComponentToRender());
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.existingClientDetails)).toBeInTheDocument();
      });
    });
  });
});
