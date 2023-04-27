import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import CLIENT_SEARCH_TYPES from '../../../../../../helpers/enums/clientSearchTypes';
import newEngagementInstanceSlice from '../../../newEngagementInstanceSlice';
import * as newEngagementInstanceThunks from '../../../newEngagementInstanceThunks';

import ClientSearch from './ClientSearch';

// **********************************************************************
// * constants

const testIds = {
  // form fields
  clientNumber: 'client-number',
  clientOrgCrmGuid: 'client-org-crm-guid',
  clientContactCrmGuid: 'client-contact-crm-guid',

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

const fakeSelectClientView = {
  formData: { id: faker.datatype.number() },
  lookups: {
    clients: { data: [], isLoading: false, hasError: false, error: null },
    staff: { data: [], isLoading: false, hasError: false, error: null }
  }
};

const fakeSelectedItem = { displayName: '', id: '' };
const fakeMatches = { data: [], isLoading: false, error: null };

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ClientSearch {...props} {...hocInjectedProps} />;
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
    selectCurrentView: jest.fn()
  };
});

jest.mock('../../../newEngagementInstanceThunks', () => {
  return {
    searchExistingClients: jest.fn()
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
    onClearData,
    onResetItem,
    onSearch,
    onSelect
  }) => {
    const props = { name, label, placeholder };

    // this is needed as we need a fake event passed to onSearch
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

describe('ClientSearch', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeSelectClientView);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('clientNumber', () => {
    it.each(Object.values(CLIENT_SEARCH_TYPES).filter((cst) => cst.id !== CLIENT_SEARCH_TYPES.existing.id))(
      'does not render when clientSearchTypeId is $id ($type)',
      (clientSearchType) => {
        const clientSearchTypeId = clientSearchType.id;
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientSearchTypeId }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        render(getComponentToRender());
        expect(screen.queryByTestId(testIds.clientNumber)).not.toBeInTheDocument();
      }
    );

    describe.each([CLIENT_SEARCH_TYPES.existing])('when clientSearchTypeId is $id ($type)', (clientSearchType) => {
      const clientSearchTypeId = clientSearchType.id;
      const selectClientView = {
        ...fakeSelectClientView,
        formData: {
          ...fakeSelectClientView.formData,
          clientSearchTypeId,
          clientNumber: faker.datatype.number(),
          clientDisplayName: faker.random.alphaNumeric(10)
        },
        lookups: {
          ...fakeSelectClientView.lookups,
          clients: { data: faker.datatype.array(), isLoading: false, hasError: false, error: null }
        }
      };

      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
      });

      it('is rendered', () => {
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientNumber)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'clientNumber';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientNumber)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Select an existing client';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientNumber)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Start typing to select a client';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientNumber)).toHaveAttribute('placeholder', expectedPlaceHolder);
      });

      it('has correct selectedItem prop', () => {
        const expectedSelectedItem = {
          id: selectClientView.formData.clientNumber,
          displayName: selectClientView.formData.clientDisplayName
        };
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientNumber)).toHaveAttribute(
          'selectedItem',
          JSON.stringify(expectedSelectedItem)
        );
      });

      it('has correct matches prop', () => {
        const expectedMatches = selectClientView.lookups.clients;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientNumber)).toHaveAttribute('matches', JSON.stringify(expectedMatches));
      });

      it('has correct sourcePropertyNames prop', () => {
        const expectedSourcePropertyNames = {
          matches: 'clients',
          value: 'clientNumber',
          displayName: 'clientDisplayName'
        };
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientNumber)).toHaveAttribute(
          'sourcePropertyNames',
          JSON.stringify(expectedSourcePropertyNames)
        );
      });

      describe('functional', () => {
        it('invokes handleAutoCompleteDataCleared when the autocomplete onClearData event is fired', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleAutoCompleteDataCleared).not.toHaveBeenCalled();
          fireEvent.click(screen.getByTestId(`${testIds.clientNumber}-${testIds.autoCompleteOnClearData}`));
          expect(hocInjectedProps.handleAutoCompleteDataCleared).toHaveBeenCalledTimes(1);
        });

        it('invokes handleAutoCompleteItemReset when the autocomplete onResetItem event is fired', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleAutoCompleteItemReset).not.toHaveBeenCalled();
          fireEvent.click(screen.getByTestId(`${testIds.clientNumber}-${testIds.autoCompleteOnResetItem}`));
          expect(hocInjectedProps.handleAutoCompleteItemReset).toHaveBeenCalledTimes(1);
        });

        it('invokes handleAutoCompleteItemSelected when the autocomplete onSelect event is fired', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleAutoCompleteItemSelected).not.toHaveBeenCalled();
          fireEvent.click(screen.getByTestId(`${testIds.clientNumber}-${testIds.autoCompleteOnSelect}`));
          expect(hocInjectedProps.handleAutoCompleteItemSelected).toHaveBeenCalledTimes(1);
        });

        it('invokes handleAutoCompleteSearch when the autocomplete onSearch event is fired', () => {
          const expectedSourcePropertyNames = {
            matches: 'clients',
            value: 'clientNumber',
            displayName: 'clientDisplayName'
          };
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.clientNumber}-${testIds.autoCompleteOnSearch}`));
          expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalledTimes(1);
          expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalledWith(
            'fake-event',
            expectedSourcePropertyNames,
            newEngagementInstanceThunks.searchExistingClients
          );
        });
      });
    });
  });

  describe('clientOrgCrmGuid', () => {
    it.each(Object.values(CLIENT_SEARCH_TYPES).filter((cst) => cst.id !== CLIENT_SEARCH_TYPES.newFromCrmOrg.id))(
      'does not render when clientSearchTypeId is $id ($type)',
      (clientSearchType) => {
        const clientSearchTypeId = clientSearchType.id;
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientSearchTypeId }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        render(getComponentToRender());
        expect(screen.queryByTestId(testIds.clientOrgCrmGuid)).not.toBeInTheDocument();
      }
    );

    describe.each([CLIENT_SEARCH_TYPES.newFromCrmOrg])('when clientSearchTypeId is $id ($type)', (clientSearchType) => {
      const clientSearchTypeId = clientSearchType.id;
      const selectClientView = {
        ...fakeSelectClientView,
        formData: { ...fakeSelectClientView.formData, clientSearchTypeId },
        lookups: { ...fakeSelectClientView.lookups }
      };

      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
      });

      it('is rendered', () => {
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientOrgCrmGuid)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'clientOrgCrmGuid';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientOrgCrmGuid)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Select a CRM Organization';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientOrgCrmGuid)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Start typing to select a client';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientOrgCrmGuid)).toHaveAttribute('placeholder', expectedPlaceHolder);
      });

      it('has correct selectedItem prop', () => {
        const expectedSelectedItem = fakeSelectedItem;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientOrgCrmGuid)).toHaveAttribute(
          'selectedItem',
          JSON.stringify(expectedSelectedItem)
        );
      });

      it('has correct matches prop', () => {
        const expectedMatches = fakeMatches;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.clientOrgCrmGuid)).toHaveAttribute(
          'matches',
          JSON.stringify(expectedMatches)
        );
      });

      describe('functional', () => {
        it('does not yet invoke handleAutoCompleteDataCleared when the autocomplete onClearData event is fired', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleAutoCompleteDataCleared).not.toHaveBeenCalled();
          fireEvent.click(screen.getByTestId(`${testIds.clientOrgCrmGuid}-${testIds.autoCompleteOnClearData}`));
          expect(hocInjectedProps.handleAutoCompleteDataCleared).not.toHaveBeenCalled();
        });

        it('does not yet invoke handleAutoCompleteItemReset when the autocomplete onResetItem event is fired', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleAutoCompleteItemReset).not.toHaveBeenCalled();
          fireEvent.click(screen.getByTestId(`${testIds.clientOrgCrmGuid}-${testIds.autoCompleteOnResetItem}`));
          expect(hocInjectedProps.handleAutoCompleteItemReset).not.toHaveBeenCalled();
        });

        it('does not yet invoke handleAutoCompleteItemSelected when the autocomplete onSelect event is fired', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleAutoCompleteItemSelected).not.toHaveBeenCalled();
          fireEvent.click(screen.getByTestId(`${testIds.clientOrgCrmGuid}-${testIds.autoCompleteOnSelect}`));
          expect(hocInjectedProps.handleAutoCompleteItemSelected).not.toHaveBeenCalled();
        });

        it('does not yet invoke handleAutoCompleteSearch when the autocomplete onSearch event is fired', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleAutoCompleteSearch).not.toHaveBeenCalled();
          fireEvent.click(screen.getByTestId(`${testIds.clientOrgCrmGuid}-${testIds.autoCompleteOnSearch}`));
          expect(hocInjectedProps.handleAutoCompleteSearch).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('clientContactCrmGuid', () => {
    it.each(Object.values(CLIENT_SEARCH_TYPES).filter((cst) => cst.id !== CLIENT_SEARCH_TYPES.newFromCrmContact.id))(
      'does not render when clientSearchTypeId is $id ($type)',
      (clientSearchType) => {
        const clientSearchTypeId = clientSearchType.id;
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientSearchTypeId }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        render(getComponentToRender());
        expect(screen.queryByTestId(testIds.clientContactCrmGuid)).not.toBeInTheDocument();
      }
    );

    describe.each([CLIENT_SEARCH_TYPES.newFromCrmContact])(
      'when clientSearchTypeId is $id ($type)',
      (clientSearchType) => {
        const clientSearchTypeId = clientSearchType.id;
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientSearchTypeId },
          lookups: { ...fakeSelectClientView.lookups }
        };

        beforeEach(() => {
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        });

        it('is rendered', () => {
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.clientContactCrmGuid)).toBeInTheDocument();
        });

        it('has correct name prop', () => {
          const expectedName = 'clientContactCrmGuid';
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.clientContactCrmGuid)).toHaveAttribute('name', expectedName);
        });

        it('has correct label prop', () => {
          const expectedLabel = 'Select a CRM Contact';
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.clientContactCrmGuid)).toHaveAttribute('label', expectedLabel);
        });

        it('has correct placeholder prop', () => {
          const expectedPlaceHolder = 'Start typing to select a client';
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.clientContactCrmGuid)).toHaveAttribute('placeholder', expectedPlaceHolder);
        });

        it('has correct selectedItem prop', () => {
          const expectedSelectedItem = fakeSelectedItem;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.clientContactCrmGuid)).toHaveAttribute(
            'selectedItem',
            JSON.stringify(expectedSelectedItem)
          );
        });

        it('has correct matches prop', () => {
          const expectedMatches = fakeMatches;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.clientContactCrmGuid)).toHaveAttribute(
            'matches',
            JSON.stringify(expectedMatches)
          );
        });

        describe('functional', () => {
          it('does not yet invoke handleAutoCompleteDataCleared when the autocomplete onClearData event is fired', () => {
            render(getComponentToRender(defaultProps));
            expect(hocInjectedProps.handleAutoCompleteDataCleared).not.toHaveBeenCalled();
            fireEvent.click(screen.getByTestId(`${testIds.clientContactCrmGuid}-${testIds.autoCompleteOnClearData}`));
            expect(hocInjectedProps.handleAutoCompleteDataCleared).not.toHaveBeenCalled();
          });

          it('does not yet invoke handleAutoCompleteItemReset when the autocomplete onResetItem event is fired', () => {
            render(getComponentToRender(defaultProps));
            expect(hocInjectedProps.handleAutoCompleteItemReset).not.toHaveBeenCalled();
            fireEvent.click(screen.getByTestId(`${testIds.clientContactCrmGuid}-${testIds.autoCompleteOnResetItem}`));
            expect(hocInjectedProps.handleAutoCompleteItemReset).not.toHaveBeenCalled();
          });

          it('does not yet invoke handleAutoCompleteItemSelected when the autocomplete onSelect event is fired', () => {
            render(getComponentToRender(defaultProps));
            expect(hocInjectedProps.handleAutoCompleteItemSelected).not.toHaveBeenCalled();
            fireEvent.click(screen.getByTestId(`${testIds.clientContactCrmGuid}-${testIds.autoCompleteOnSelect}`));
            expect(hocInjectedProps.handleAutoCompleteItemSelected).not.toHaveBeenCalled();
          });

          it('does not yet invoke handleAutoCompleteSearch when the autocomplete onSearch event is fired', () => {
            render(getComponentToRender(defaultProps));
            expect(hocInjectedProps.handleAutoCompleteSearch).not.toHaveBeenCalled();
            fireEvent.click(screen.getByTestId(`${testIds.clientContactCrmGuid}-${testIds.autoCompleteOnSearch}`));
            expect(hocInjectedProps.handleAutoCompleteSearch).not.toHaveBeenCalled();
          });
        });
      }
    );
  });
});
