import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';

import BillingScheduleFields from './BillingScheduleFields';

// **********************************************************************
// * constants

const testIds = {
  formText: 'form-text',

  // form fields
  billToClientNumber: 'bill-to-client-number',

  // auto-complete events
  autoCompleteOnClearData: 'auto-complete-on-clear-data',
  autoCompleteOnResetItem: 'auto-complete-on-reset-item',
  autoCompleteOnSearch: 'auto-complete-on-search',
  autoCompleteOnSelect: 'auto-complete-on-select'
};

const defaultProps = {};

const hocInjectedProps = {
  handleAutoCompleteDataCleared: jest.fn(),
  handleAutoCompleteItemReset: jest.fn(),
  handleAutoCompleteItemSelected: jest.fn(),
  handleAutoCompleteSearch: jest.fn()
};

const fakeJobSetupView = {
  formData: {
    billToClientNumber: faker.datatype.number(),
    billToClientDisplayName: faker.random.alpha(10)
  },
  lookups: {
    clients: { data: [], isLoading: false, error: null }
  }
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <BillingScheduleFields {...props} {...hocInjectedProps} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => ({
  useSelector: (callback) => callback()
}));

jest.mock('../../../../newEngagementInstanceSlice', () => ({
  selectCurrentView: jest.fn()
}));

jest.mock('../../../../newEngagementInstanceThunks', () => ({
  searchClients: jest.fn()
}));

jest.mock('../../../withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../components/formText/FormText', () => ({
  __esModule: true,
  default: ({ children, isLabel }) => {
    const props = { children, isLabel };
    return <fake-form-text {...props} data-testid={testIds.formText} />;
  }
}));

jest.mock('../../../../components/autoComplete/AutoComplete', () => ({
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
    onSelect,
    onSearch
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

// **********************************************************************
// * unit tests

describe('BillingScheduleFields', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeJobSetupView);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('billToClientNumber', () => {
    it('has correct name prop', () => {
      const expectedName = 'billToClientNumber';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.billToClientNumber)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Bill To:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.billToClientNumber)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Start typing to select a client';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.billToClientNumber)).toHaveAttribute('placeholder', expectedPlaceHolder);
    });

    it('has correct selectedItem prop', () => {
      // * ARRANGE
      const formData = { ...fakeJobSetupView.formData };
      const expectedSelectedItem = { id: formData.billToClientNumber, displayName: formData.billToClientDisplayName };

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.billToClientNumber)).toHaveAttribute(
        'selectedItem',
        JSON.stringify(expectedSelectedItem)
      );
    });

    it('has correct matches prop', () => {
      const expectedMatches = { data: [], isLoading: false, error: null };
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.billToClientNumber)).toHaveAttribute(
        'matches',
        JSON.stringify(expectedMatches)
      );
    });

    it('has correct sourcePropertyNames prop', () => {
      const expectedSourcePropertyNames = {
        matches: 'clients',
        value: 'billToClientNumber',
        displayName: 'billToClientDisplayName'
      };
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.billToClientNumber)).toHaveAttribute(
        'sourcePropertyNames',
        JSON.stringify(expectedSourcePropertyNames)
      );
    });

    describe('functional', () => {
      it('invokes handleAutoCompleteDataCleared when the autocomplete onClearData event is fired', () => {
        render(getComponentToRender(defaultProps));
        expect(hocInjectedProps.handleAutoCompleteDataCleared).not.toHaveBeenCalled();
        fireEvent.click(screen.getByTestId(`${testIds.billToClientNumber}-${testIds.autoCompleteOnClearData}`));
        expect(hocInjectedProps.handleAutoCompleteDataCleared).toHaveBeenCalled();
      });

      it('invokes handleAutoCompleteItemReset when the autocomplete onResetItem event is fired', () => {
        render(getComponentToRender(defaultProps));
        expect(hocInjectedProps.handleAutoCompleteItemReset).not.toHaveBeenCalled();
        fireEvent.click(screen.getByTestId(`${testIds.billToClientNumber}-${testIds.autoCompleteOnResetItem}`));
        expect(hocInjectedProps.handleAutoCompleteItemReset).toHaveBeenCalled();
      });

      it('invokes handleAutoCompleteItemSelected when the autocomplete onSelect event is fired', () => {
        render(getComponentToRender(defaultProps));
        expect(hocInjectedProps.handleAutoCompleteItemSelected).not.toHaveBeenCalled();
        fireEvent.click(screen.getByTestId(`${testIds.billToClientNumber}-${testIds.autoCompleteOnSelect}`));
        expect(hocInjectedProps.handleAutoCompleteItemSelected).toHaveBeenCalled();
      });

      it('invokes handleAutoCompleteSearch when the autocomplete onSearch event is fired', () => {
        render(getComponentToRender(defaultProps));
        expect(hocInjectedProps.handleAutoCompleteSearch).not.toHaveBeenCalled();
        fireEvent.click(screen.getByTestId(`${testIds.billToClientNumber}-${testIds.autoCompleteOnSearch}`));
        expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalled();
      });
    });
  });

  describe('billing schedule FormText', () => {
    const formText =
      'Either select an existing billing schedule to add this job to or choose to create a new billing schedule';

    it('has correct text', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByText(formText)).toBeInTheDocument();
    });

    it('has isLabel prop', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByText(formText)).toHaveAttribute('isLabel');
    });
  });
});
