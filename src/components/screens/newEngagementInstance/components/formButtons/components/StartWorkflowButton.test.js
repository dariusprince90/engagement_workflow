import ReactDOM from 'react-dom';
import * as reactRouterDom from 'react-router-dom';
import * as reactRedux from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import faker from '@faker-js/faker';

import CLIENT_SEARCH_TYPES from '../../../../../../helpers/enums/clientSearchTypes';
import ApiGeneralException from '../../../../../../api/ApiGeneralException';
import newEngagementInstanceSlice from '../../../newEngagementInstanceSlice';
import startWorkflowHelper from './startWorkflowHelper';

import StartWorkflowButton from './StartWorkflowButton';

// **********************************************************************
// * constants

const BUTTON_TEXT = 'Save';

const defaultProps = {};
const mockDispatch = jest.fn();

const fakeNewEngagementInstance = { newEngagementInstanceId: faker.datatype.number() };

const fakeSelectClientView = {
  formData: {
    clientNumber: faker.datatype.number(),
    clientSearchTypeId: faker.datatype.number(),
    taxTypeId: faker.datatype.number(),
    taxPayerIdentificationNumber: faker.random.alphaNumeric(10),
    industryHierarchyId: faker.datatype.number(),
    marketSectorId: faker.datatype.number(),
    relationshipPartnerStaffNumber: faker.datatype.number()
  }
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <StartWorkflowButton {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useDispatch: jest.fn(),
    useSelector: (callback) => callback()
  };
});

jest.mock('react-router-dom', () => {
  return {
    useNavigate: jest.fn()
  };
});

jest.mock('../../../newEngagementInstanceSlice', () => ({
  saveNewEngagementInstanceCompleted: jest.fn(),
  saveNewEngagementInstanceFailed: jest.fn(),
  saveNewEngagementInstanceStarted: jest.fn(),
  selectNewEngagementInstance: jest.fn(),
  selectView: jest.fn()
}));

jest.mock('./startWorkflowHelper', () => ({
  saveNewEngagementInstanceAndStartWorkflow: jest.fn()
}));

// **********************************************************************
// * unit tests

describe('StartWorkflowButton', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(fakeNewEngagementInstance);
    newEngagementInstanceSlice.selectView.mockReturnValue(fakeSelectClientView);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  it('does not render the button when newEngagementInstanceId is not null', () => {
    const newEngagementInstance = { newEngagementInstanceId: faker.datatype.number() };
    newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(newEngagementInstance);
    render(getComponentToRender(defaultProps));
    expect(screen.queryByText(BUTTON_TEXT)).not.toBeInTheDocument();
  });

  it('renders the button when newEngagementInstanceId is null', () => {
    const newEngagementInstance = { newEngagementInstanceId: null };
    newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(newEngagementInstance);
    render(getComponentToRender(defaultProps));
    expect(screen.getByText(BUTTON_TEXT)).toBeInTheDocument();
  });

  describe('when rendered', () => {
    beforeEach(() => {
      const newEngagementInstance = { newEngagementInstanceId: null };
      newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(newEngagementInstance);
    });

    it.each([
      { clientSearchTypeId: null, clientNumber: faker.datatype.number() },
      { clientSearchTypeId: CLIENT_SEARCH_TYPES.newFromCrmContact.id, clientNumber: faker.datatype.number() },
      { clientSearchTypeId: CLIENT_SEARCH_TYPES.newFromCrmOrg.id, clientNumber: faker.datatype.number() },
      { clientSearchTypeId: CLIENT_SEARCH_TYPES.existing.id, clientNumber: null }
    ])(
      'has disabled attribute when clientSearchTypeId is $clientSearchTypeId and clientNumber is $clientNumber',
      ({ clientSearchTypeId, clientNumber }) => {
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientSearchTypeId, clientNumber }
        };
        newEngagementInstanceSlice.selectView.mockReturnValue(selectClientView);
        render(getComponentToRender(defaultProps));
        expect(screen.getByText(BUTTON_TEXT)).toHaveAttribute('disabled');
      }
    );

    it.each([{ clientSearchTypeId: CLIENT_SEARCH_TYPES.existing.id, clientNumber: faker.datatype.number() }])(
      'does not have disabled attribute when clientSearchTypeId is $clientSearchTypeId and clientNumber is $clientNumber',
      ({ clientSearchTypeId, clientNumber }) => {
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientSearchTypeId, clientNumber }
        };
        newEngagementInstanceSlice.selectView.mockReturnValue(selectClientView);
        render(getComponentToRender(defaultProps));
        expect(screen.getByText(BUTTON_TEXT)).not.toHaveAttribute('disabled');
      }
    );

    describe('functional', () => {
      beforeEach(() => {
        // set values to ensure the button is not disabled
        const selectClientView = {
          ...fakeSelectClientView,
          formData: {
            ...fakeSelectClientView.formData,
            clientSearchTypeId: CLIENT_SEARCH_TYPES.existing.id,
            clientNumber: faker.datatype.number()
          }
        };
        newEngagementInstanceSlice.selectView.mockReturnValue(selectClientView);
      });

      it('dispatches saveNewEngagementInstanceStarted when clicked', () => {
        // * ARRANGE
        const actionResults = faker.random.alphaNumeric(10);
        newEngagementInstanceSlice.saveNewEngagementInstanceStarted.mockReturnValue(actionResults);

        // * ACT
        render(getComponentToRender(defaultProps));
        expect(newEngagementInstanceSlice.saveNewEngagementInstanceStarted).not.toHaveBeenCalled();
        fireEvent.click(screen.getByText(BUTTON_TEXT));

        // * ASSERT
        expect(newEngagementInstanceSlice.saveNewEngagementInstanceStarted).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.saveNewEngagementInstanceStarted).toHaveBeenCalledWith();
        expect(mockDispatch).toHaveBeenCalledWith(actionResults);
      });

      it('invokes saveNewEngagementInstanceAndStartWorkflow when clicked', () => {
        // * ARRANGE

        // * ACT
        render(getComponentToRender(defaultProps));
        expect(startWorkflowHelper.saveNewEngagementInstanceAndStartWorkflow).not.toHaveBeenCalled();
        fireEvent.click(screen.getByText(BUTTON_TEXT));

        // * ASSERT
        expect(startWorkflowHelper.saveNewEngagementInstanceAndStartWorkflow).toHaveBeenCalledTimes(1);
        expect(startWorkflowHelper.saveNewEngagementInstanceAndStartWorkflow).toHaveBeenCalledWith();
      });

      it('dispatches saveNewEngagementInstanceCompleted when clicked', async () => {
        // * ARRANGE
        const actionResults = faker.random.alphaNumeric(10);
        newEngagementInstanceSlice.saveNewEngagementInstanceCompleted.mockReturnValue(actionResults);

        // * ACT
        render(getComponentToRender(defaultProps));
        expect(newEngagementInstanceSlice.saveNewEngagementInstanceCompleted).not.toHaveBeenCalled();
        fireEvent.click(screen.getByText(BUTTON_TEXT));

        // * ASSERT
        await waitFor(() => {
          expect(newEngagementInstanceSlice.saveNewEngagementInstanceCompleted).toHaveBeenCalledTimes(1);
        });
        expect(newEngagementInstanceSlice.saveNewEngagementInstanceCompleted).toHaveBeenCalledWith();
        expect(mockDispatch).toHaveBeenCalledWith(actionResults);
      });

      it('invokes/dispatches methods in proper order', async () => {
        // * ARRANGE
        const method01 = newEngagementInstanceSlice.saveNewEngagementInstanceStarted;
        const method02 = startWorkflowHelper.saveNewEngagementInstanceAndStartWorkflow;
        const method03 = newEngagementInstanceSlice.saveNewEngagementInstanceCompleted;

        // * ACT
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByText(BUTTON_TEXT));

        // * ASSERT
        // wait for the final method to have been called
        await waitFor(() => {
          expect(newEngagementInstanceSlice.saveNewEngagementInstanceCompleted).toHaveBeenCalled();
        });

        // ensure all methods were called in correct order (order matters here)
        expect(method02).toHaveBeenCalledAfter(method01);
        expect(method03).toHaveBeenCalledAfter(method02);
      });

      it('redirects to the new engagement instance when clicked', async () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const mockNavigate = jest.fn();
        const expectedRoute = `/${newEngagementInstanceId}`;

        startWorkflowHelper.saveNewEngagementInstanceAndStartWorkflow.mockReturnValue(newEngagementInstanceId);
        reactRouterDom.useNavigate.mockReturnValue(mockNavigate);

        // * ACT
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByText(BUTTON_TEXT));

        // * ASSERT
        await waitFor(() => {
          expect(mockNavigate).toHaveBeenCalled();
        });

        expect(mockNavigate).toHaveBeenCalledOnce();
        expect(mockNavigate).toHaveBeenCalledWith(expectedRoute);
      });

      it('dispatches saveNewEngagementInstanceFailed when clicked and an ApiGeneralException occurs', async () => {
        // * ARRANGE
        const actionResults = faker.random.alphaNumeric(10);
        const exceptionData = {
          message: faker.random.alphaNumeric(10),
          response: {
            status: faker.random.alphaNumeric(10),
            data: { title: faker.random.alphaNumeric(10), traceId: faker.random.alphaNumeric(10) }
          }
        };
        const exception = new ApiGeneralException(exceptionData);
        const expectedPayload = {
          error: {
            ...exception.getExceptionData(),
            friendlyMessage: 'An error occurred saving your data and starting the workflow!'
          }
        };
        startWorkflowHelper.saveNewEngagementInstanceAndStartWorkflow.mockImplementation(() => {
          throw exception;
        });
        newEngagementInstanceSlice.saveNewEngagementInstanceFailed.mockReturnValue(actionResults);

        // * ACT
        render(getComponentToRender(defaultProps));
        expect(newEngagementInstanceSlice.saveNewEngagementInstanceFailed).not.toHaveBeenCalled();
        fireEvent.click(screen.getByText(BUTTON_TEXT));

        // * ASSERT
        expect(newEngagementInstanceSlice.saveNewEngagementInstanceFailed).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.saveNewEngagementInstanceFailed).toHaveBeenCalledWith(expectedPayload);
        expect(mockDispatch).toHaveBeenCalledWith(actionResults);
      });

      it('dispatches saveNewEngagementInstanceFailed when clicked and a general error occurs', async () => {
        // * ARRANGE
        const actionResults = faker.random.alphaNumeric(10);
        const errorMessage = faker.random.alphaNumeric(10);
        const exception = new Error(errorMessage);
        const expectedPayload = {
          error: {
            message: errorMessage,
            friendlyMessage: 'An error occurred saving your data and starting the workflow!'
          }
        };
        startWorkflowHelper.saveNewEngagementInstanceAndStartWorkflow.mockImplementation(() => {
          throw exception;
        });
        newEngagementInstanceSlice.saveNewEngagementInstanceFailed.mockReturnValue(actionResults);

        // * ACT
        render(getComponentToRender(defaultProps));
        expect(newEngagementInstanceSlice.saveNewEngagementInstanceFailed).not.toHaveBeenCalled();
        fireEvent.click(screen.getByText(BUTTON_TEXT));

        // * ASSERT
        expect(newEngagementInstanceSlice.saveNewEngagementInstanceFailed).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceSlice.saveNewEngagementInstanceFailed).toHaveBeenCalledWith(expectedPayload);
        expect(mockDispatch).toHaveBeenCalledWith(actionResults);
      });
    });
  });
});
