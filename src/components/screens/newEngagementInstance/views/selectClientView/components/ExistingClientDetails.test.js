import ReactDOM from 'react-dom';
import * as reactRedux from 'react-redux';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import TIN_FIELD_TYPES from '../../../../../../helpers/enums/tinFieldTypes';
import newEngagementInstanceSlice from '../../../newEngagementInstanceSlice';
import * as newEngagementInstanceThunks from '../../../newEngagementInstanceThunks';
import ExistingClientDetails from './ExistingClientDetails';

// **********************************************************************
// * constants

const testIds = {
  clientDetailsFields: 'client-details-fields'
};

const fakeSelectClientView = {
  formData: { id: faker.datatype.number() }
};

const fakeNewEngagementInstance = { newEngagementInstanceId: faker.datatype.number() };

const mockDispatch = jest.fn();

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <ExistingClientDetails />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useDispatch: jest.fn(),
    useSelector: (callback) => callback()
  };
});

jest.mock('../../../newEngagementInstanceSlice', () => {
  return {
    existingClientDetailsCleared: jest.fn(),
    selectCurrentView: jest.fn(),
    selectNewEngagementInstance: jest.fn()
  };
});

jest.mock('../../../newEngagementInstanceThunks', () => {
  return {
    fetchExistingClient: jest.fn()
  };
});

jest.mock('./ClientDetailsFields', () => ({
  __esModule: true,
  default: ({ disabled, tinFieldOptions }) => {
    const props = { disabled };
    return (
      <fake-client-details-fields
        {...props}
        tinFieldOptions={JSON.stringify(tinFieldOptions)}
        data-testid={testIds.clientDetailsFields}
      />
    );
  }
}));

// **********************************************************************
// * unit tests

describe('ExistingClientDetails', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeSelectClientView);
    newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(fakeNewEngagementInstance);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('rendering', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(getComponentToRender(), div);
    });

    describe('ClientDetailsFields', () => {
      it('is not rendered when formData.clientNumber has no value', () => {
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientNumber: null }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        render(getComponentToRender());
        expect(screen.queryByTestId(testIds.clientDetailsFields)).not.toBeInTheDocument();
      });

      describe('when formData.clientNumber has a value', () => {
        beforeEach(() => {
          const selectClientView = {
            ...fakeSelectClientView,
            formData: { ...fakeSelectClientView.formData, clientNumber: faker.datatype.number() }
          };
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        });

        it('is rendered', () => {
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.clientDetailsFields)).toBeInTheDocument();
        });

        it('has disabled prop', () => {
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.clientDetailsFields)).toHaveAttribute('disabled');
        });

        it('has correct tinFieldOptions prop', () => {
          const expectedTinFieldOptions = { show: true, type: TIN_FIELD_TYPES.masked, allowMaskedEdit: false };
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.clientDetailsFields)).toHaveAttribute(
            'tinFieldOptions',
            JSON.stringify(expectedTinFieldOptions)
          );
        });
      });
    });
  });

  describe('functional', () => {
    describe('when newEngagementInstanceId has a value', () => {
      beforeEach(() => {
        const newEngagementInstance = { ...fakeNewEngagementInstance, newEngagementInstanceId: null };
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(newEngagementInstance);
      });

      it('dispatches fetchExistingClient when formData.clientNumber has a value', () => {
        // * ARRANGE
        const clientNumber = faker.datatype.number();
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientNumber }
        };

        const expectedThunkArg = { clientId: clientNumber };
        const thunkResults = faker.random.alphaNumeric(10);
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        newEngagementInstanceThunks.fetchExistingClient.mockReturnValue(thunkResults);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(newEngagementInstanceThunks.fetchExistingClient).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceThunks.fetchExistingClient).toHaveBeenCalledWith(expectedThunkArg);
        expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
      });

      it('does not dispatch fetchExistingClient when formData.clientNumber has no value', () => {
        // * ARRANGE
        const clientNumber = null;
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientNumber }
        };
        const thunkResults = faker.random.alphaNumeric(10);
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        newEngagementInstanceThunks.fetchExistingClient.mockReturnValue(thunkResults);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(newEngagementInstanceThunks.fetchExistingClient).not.toHaveBeenCalled();
        expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
      });

      it('dispatches existingClientDetailsCleared when formData.clientNumber has no value', () => {
        // * ARRANGE
        const clientNumber = null;
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientNumber }
        };
        const sliceMethodResults = faker.random.alphaNumeric(10);
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        newEngagementInstanceSlice.existingClientDetailsCleared.mockReturnValue(sliceMethodResults);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(newEngagementInstanceSlice.existingClientDetailsCleared).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.existingClientDetailsCleared).toHaveBeenCalledWith();
        expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
      });

      it('does not dispatch existingClientDetailsCleared when formData.clientNumber has a value', () => {
        // * ARRANGE
        const clientNumber = faker.datatype.number();
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientNumber }
        };
        const sliceMethodResults = faker.random.alphaNumeric(10);
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);
        newEngagementInstanceSlice.existingClientDetailsCleared.mockReturnValue(sliceMethodResults);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(newEngagementInstanceSlice.existingClientDetailsCleared).not.toHaveBeenCalled();
        expect(mockDispatch).not.toHaveBeenCalledWith(sliceMethodResults);
      });
    });

    describe('when newEngagementInstanceId has no value', () => {
      it('does not dispatch fetchExistingClient when formData.clientNumber has a value', () => {
        // * ARRANGE
        const clientNumber = faker.datatype.number();
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientNumber }
        };

        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(newEngagementInstanceThunks.fetchExistingClient).not.toHaveBeenCalled();
      });

      it('does not dispatch existingClientDetailsCleared when formData.clientNumber has no value', () => {
        // * ARRANGE
        const clientNumber = null;
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientNumber }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(selectClientView);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(newEngagementInstanceSlice.existingClientDetailsCleared).not.toHaveBeenCalled();
      });
    });
  });
});
