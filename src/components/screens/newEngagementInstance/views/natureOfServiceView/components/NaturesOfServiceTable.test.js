import ReactDOM from 'react-dom';
import * as reactRedux from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import CONFIRMATION_MODAL_TYPES from '../../../../../../helpers/enums/confirmationModalTypes';
import * as newEngagementInstanceSlice from '../../../newEngagementInstanceSlice';
import * as newEngagementInstanceThunks from '../../../newEngagementInstanceThunks';

import NaturesOfServiceTable from './NaturesOfServiceTable';

// **********************************************************************
// * constants

const testIds = {
  tableHeader: 'table-header',
  tableInfoMessage: 'table-info-message',
  naturesOfServiceTableRow: 'natures-of-service-table-row',
  confirmationModal: 'confirmation-modal'
};

const fakeJobInfoResponses = [];

const mockDispatch = jest.fn();

const mockOnDeleteArgs = {
  jobInfoResponseId: faker.datatype.number(),
  etag: faker.random.alpha(10),
  jobName: faker.random.alpha(10)
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <NaturesOfServiceTable {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: (callback) => callback()
}));

jest.mock('../../../newEngagementInstanceSlice', () => {
  return {
    selectNatureOfServiceJobInfoResponses: jest.fn()
  };
});

jest.mock('../../../newEngagementInstanceThunks', () => ({
  deleteJobInfoResponse: jest.fn()
}));

jest.mock('../../../../../common/tables/TableHeader', () => {
  return {
    __esModule: true,
    default: ({ columnHeaders }) => {
      return <thead data-testid={testIds.tableHeader} data-column-headers={JSON.stringify(columnHeaders)} />;
    }
  };
});

jest.mock('../../../../../common/tables/TableInfoMessage', () => {
  return {
    __esModule: true,
    default: ({ colSpan, displayMessage }) => {
      const props = { colSpan, displayMessage };
      return (
        <tr>
          <td>
            <fake-table-info-message data-testid={testIds.tableInfoMessage} {...props} />
          </td>
        </tr>
      );
    }
  };
});

jest.mock('./NaturesOfServiceTableRow', () => {
  return {
    __esModule: true,
    default: ({ jobInfoResponse, onDelete }) => {
      return (
        <tr data-testid={testIds.naturesOfServiceTableRow} data-job-info-response={JSON.stringify(jobInfoResponse)}>
          <td>
            <button
              onClick={() =>
                onDelete(mockOnDeleteArgs.jobInfoResponseId, mockOnDeleteArgs.etag, mockOnDeleteArgs.jobName)
              }>
              on-delete-trigger
            </button>
          </td>
        </tr>
      );
    }
  };
});

jest.mock('../../../components/confirmationModal/ConfirmationModal', () => ({
  __esModule: true,
  default: ({ isOpen, confirmationType, title, message, confirmButtonText, onCancel, onConfirm }) => {
    const props = {
      isOpen,
      confirmationType: JSON.stringify(confirmationType),
      title,
      message,
      confirmButtonText
    };
    return (
      <fake-confirmation-modal {...props} data-testid={testIds.confirmationModal}>
        <button onClick={onCancel}>on-cancel-trigger</button>
        <button onClick={onConfirm}>on-confirm-trigger</button>
      </fake-confirmation-modal>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('NaturesOfServiceTable', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    newEngagementInstanceSlice.selectNatureOfServiceJobInfoResponses.mockReturnValue(fakeJobInfoResponses);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  describe('TableHeader', () => {
    it('has correct columnHeaders prop', () => {
      const expectedColumnHeaders = ['Nature of Service', 'Job Name', 'Job Type', ''];
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.tableHeader)).toHaveAttribute(
        'data-column-headers',
        JSON.stringify(expectedColumnHeaders)
      );
    });
  });

  describe('TableInfoMessage', () => {
    it('does not render when jobInfoResponses has items', () => {
      const jobInfoResponses = [{ id: faker.datatype.number() }];
      newEngagementInstanceSlice.selectNatureOfServiceJobInfoResponses.mockReturnValue(jobInfoResponses);
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.tableInfoMessage)).not.toBeInTheDocument();
    });

    it('is rendered when jobInfoResponses has no items', () => {
      const jobInfoResponses = [];
      newEngagementInstanceSlice.selectNatureOfServiceJobInfoResponses.mockReturnValue(jobInfoResponses);
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.tableInfoMessage)).toBeInTheDocument();
    });

    it('has correct colSpan prop', () => {
      const jobInfoResponses = [];
      newEngagementInstanceSlice.selectNatureOfServiceJobInfoResponses.mockReturnValue(jobInfoResponses);
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.tableInfoMessage)).toHaveAttribute('colSpan', '4');
    });

    it('has correct displayMessage prop', () => {
      const jobInfoResponses = [];
      newEngagementInstanceSlice.selectNatureOfServiceJobInfoResponses.mockReturnValue(jobInfoResponses);
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.tableInfoMessage)).toHaveAttribute(
        'displayMessage',
        'No natures of service have been selected.'
      );
    });
  });

  describe('NaturesOfServiceTableRow', () => {
    describe('rendering', () => {
      it('renders when jobInfoResponses has items', () => {
        const jobInfoResponses = [{ id: faker.datatype.number() }];
        newEngagementInstanceSlice.selectNatureOfServiceJobInfoResponses.mockReturnValue(jobInfoResponses);
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.naturesOfServiceTableRow)).toBeInTheDocument();
      });

      it('does not render when jobInfoResponses has no items', () => {
        const jobInfoResponses = [];
        newEngagementInstanceSlice.selectNatureOfServiceJobInfoResponses.mockReturnValue(jobInfoResponses);
        render(getComponentToRender());
        expect(screen.queryByTestId(testIds.naturesOfServiceTableRow)).not.toBeInTheDocument();
      });

      it('renders once for each jobInfoResponse in the collection', () => {
        const itemCount = faker.datatype.number({ min: 1, max: 20 });
        const jobInfoResponses = [...Array(itemCount).keys()].map(() => ({ id: faker.datatype.number() }));
        newEngagementInstanceSlice.selectNatureOfServiceJobInfoResponses.mockReturnValue(jobInfoResponses);
        render(getComponentToRender());
        expect(screen.getAllByTestId(testIds.naturesOfServiceTableRow)).toHaveLength(jobInfoResponses.length);
      });

      it('has correct jobInfoResponse prop', () => {
        const expected = { id: faker.datatype.number() };
        const jobInfoResponses = [expected];
        newEngagementInstanceSlice.selectNatureOfServiceJobInfoResponses.mockReturnValue(jobInfoResponses);
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.naturesOfServiceTableRow)).toHaveAttribute(
          'data-job-info-response',
          JSON.stringify(expected)
        );
      });
    });

    describe('functional', () => {
      const jobInfoResponses = [{ id: faker.datatype.number() }];

      beforeEach(() => {
        newEngagementInstanceSlice.selectNatureOfServiceJobInfoResponses.mockReturnValue(jobInfoResponses);
      });

      describe('when clicked and job name has a value', () => {
        beforeEach(() => {
          mockOnDeleteArgs.jobName = faker.random.alphaNumeric(10);
        });

        it('shows the confirmation modal with proper message', () => {
          // * ARRANGE
          const expectedIsOpen = true;
          const expectedMessage = `Are you sure you want to delete the "${mockOnDeleteArgs.jobName}" job?`;

          // * ACT
          render(getComponentToRender());
          fireEvent.click(screen.getByText('on-delete-trigger'));

          // * ASSERT
          expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('isOpen', expectedIsOpen.toString());
          expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('message', expectedMessage);
        });
      });

      describe('when clicked and job name has no value', () => {
        beforeEach(() => {
          mockOnDeleteArgs.jobName = '';
        });

        it('shows the confirmation modal with proper message', () => {
          // * ARRANGE
          const expectedIsOpen = true;
          const expectedMessage = `Are you sure you want to delete this job?`;

          // * ACT
          render(getComponentToRender());
          fireEvent.click(screen.getByText('on-delete-trigger'));

          // * ASSERT
          expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('isOpen', expectedIsOpen.toString());
          expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('message', expectedMessage);
        });
      });
    });
  });

  describe('ConfirmationModal', () => {
    it('is rendered', () => {
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.confirmationModal)).toBeInTheDocument();
    });

    it('is not open by default', () => {
      const expected = false;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('isOpen', expected.toString());
    });

    it('has correct confirmation type', () => {
      const expected = CONFIRMATION_MODAL_TYPES.danger;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute(
        'confirmationType',
        JSON.stringify(expected)
      );
    });

    it('has correct title', () => {
      const expected = 'Delete Job?';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('title', expected);
    });

    it('has empty message by default', () => {
      const expected = '';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('message', expected);
    });

    it('has correct confirm button text', () => {
      const expected = 'Delete Job';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('confirmButtonText', expected);
    });

    describe('functional', () => {
      const jobInfoResponses = [{ id: faker.datatype.number(), etag: faker.random.alpha(10) }];

      beforeEach(() => {
        newEngagementInstanceSlice.selectNatureOfServiceJobInfoResponses.mockReturnValue(jobInfoResponses);
      });

      it('closes the confirmation modal when the onCancel event is triggered', () => {
        // * ARRANGE

        // * ACT
        render(getComponentToRender());
        fireEvent.click(screen.getByText('on-delete-trigger'));

        // ensure it is open before triggering onCancel
        expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('isOpen', true.toString());

        // trigger onCancel
        fireEvent.click(screen.getByText('on-cancel-trigger'));

        // * ASSERT
        expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('isOpen', false.toString());
      });

      it('dispatches deleteJobInfoResponse when the onConfirm event is triggered', () => {
        // * ARRANGE
        const { jobInfoResponseId, etag } = mockOnDeleteArgs;
        const viewId = `${newEngagementInstanceSlice.JOB_SETUP_VIEW_PREFIX}${jobInfoResponseId}`;
        const thunkResults = faker.random.alphaNumeric(10);
        const expectedArgs = { viewId, jobInfoResponseId, etag };

        newEngagementInstanceThunks.deleteJobInfoResponse.mockReturnValue(thunkResults);

        // * ACT
        render(getComponentToRender());
        fireEvent.click(screen.getByText('on-delete-trigger'));

        // ensure it is open before triggering onConfirm
        expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('isOpen', true.toString());

        // trigger onConfirm
        fireEvent.click(screen.getByText('on-confirm-trigger'));

        // * ASSERT
        expect(newEngagementInstanceThunks.deleteJobInfoResponse).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceThunks.deleteJobInfoResponse).toHaveBeenCalledWith(expectedArgs);
        expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
      });

      it('closes the confirmation modal when the onConfirm event is triggered', () => {
        // * ARRANGE

        // * ACT
        render(getComponentToRender());
        fireEvent.click(screen.getByText('on-delete-trigger'));

        // ensure it is open before triggering onConfirm
        expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('isOpen', true.toString());

        // trigger onConfirm
        fireEvent.click(screen.getByText('on-confirm-trigger'));

        // * ASSERT
        expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('isOpen', false.toString());
      });
    });
  });
});
