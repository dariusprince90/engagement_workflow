/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import * as reactRedux from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import CONFIRMATION_MODAL_TYPES from '../../../../../../helpers/enums/confirmationModalTypes';
import * as newEngagementInstanceSlice from '../../../newEngagementInstanceSlice';
import * as newEngagementInstanceThunks from '../../../newEngagementInstanceThunks';

import JobRolesTable from './JobRolesTable';

// **********************************************************************
// * constants

const testIds = {
  tableErrorMessage: 'table-error-message',
  tableInfoMessage: 'table-info-message',
  tableLoadingMessage: 'table-loading-message',
  tableHeader: 'table-header',
  jobRolesTableRow: 'job-roles-table-row',
  confirmationModal: 'confirmation-modal'
};

const defaultProps = {};

const fakeJobSetupView = {
  lookups: {
    jobRoles: {
      isLoading: false,
      hasError: false,
      error: null,
      data: []
    }
  }
};

const fakeCurrentViewID = faker.random.alpha(10);

const mockDispatch = jest.fn();

const mockOnDeleteArgs = {
  jobRoleId: faker.datatype.number(),
  roleName: faker.random.alpha(10),
  staffName: faker.random.alpha(10)
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <JobRolesTable {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: (callback) => callback()
}));

jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: ({ icon, title, className, onClick }) => {
      const props = { icon, title, className, onClick };
      return <fake-font-awesome-icon {...props} data-testid={testIds.fontAwesomeIcon} />;
    }
  };
});

jest.mock('../../../newEngagementInstanceSlice', () => ({
  selectCurrentView: jest.fn(),
  selectCurrentViewId: jest.fn()
}));

jest.mock('../../../newEngagementInstanceThunks', () => ({
  deleteJobRole: jest.fn()
}));

jest.mock('../../../../../common/tables/TableLoadingMessage', () => {
  return {
    __esModule: true,
    default: ({ colSpan, displayMessage }) => {
      const props = { colSpan, displayMessage };
      return (
        <tr>
          <td>
            <fake-table-loading-message data-testid={testIds.tableLoadingMessage} {...props} />
          </td>
        </tr>
      );
    }
  };
});

jest.mock('../../../../../common/tables/TableErrorMessage', () => {
  return {
    __esModule: true,
    default: ({ colSpan, displayMessage, error }) => {
      const props = { colSpan, displayMessage, error: JSON.stringify(error) };
      return (
        <tr>
          <td>
            <fake-table-error-message data-testid={testIds.tableErrorMessage} {...props} />
          </td>
        </tr>
      );
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

jest.mock('../../../../../common/tables/TableHeader', () => {
  return {
    __esModule: true,
    default: ({ columnHeaders }) => {
      return <thead data-testid={testIds.tableHeader} data-column-headers={JSON.stringify(columnHeaders)} />;
    }
  };
});

jest.mock('./JobRolesTableRow', () => {
  return {
    __esModule: true,
    default: ({ jobRole, onDelete }) => {
      return (
        <tr data-testid={testIds.jobRolesTableRow} data-job-role={JSON.stringify(jobRole)}>
          <td>
            <button
              onClick={() =>
                onDelete(mockOnDeleteArgs.jobRoleId, mockOnDeleteArgs.roleName, mockOnDeleteArgs.staffName)
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

describe('JobRolesTable', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeJobSetupView);
    newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(fakeCurrentViewID);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('TableHeader', () => {
    it('has correct columnHeaders prop', () => {
      const expectedColumnHeaders = ['Role', 'Staff', ''];
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.tableHeader)).toHaveAttribute(
        'data-column-headers',
        JSON.stringify(expectedColumnHeaders)
      );
    });
  });

  describe('TableLoadingMessage', () => {
    it('does not render when isLoading is false', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeJobSetupView,
        lookups: {
          ...fakeJobSetupView.lookups,
          jobRoles: {
            ...fakeJobSetupView.lookups.jobRoles,
            isLoading: false
          }
        }
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.tableLoadingMessage)).not.toBeInTheDocument();
    });

    it('renders when isLoading is true', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeJobSetupView,
        lookups: {
          ...fakeJobSetupView.lookups,
          jobRoles: {
            ...fakeJobSetupView.lookups.jobRoles,
            isLoading: true
          }
        }
      });
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.tableLoadingMessage)).toHaveAttribute('displayMessage', 'Loading job roles...');
    });

    it('has correct colSpan prop when isLoading is true', () => {
      const expected = 3;
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeJobSetupView,
        lookups: {
          ...fakeJobSetupView.lookups,
          jobRoles: {
            ...fakeJobSetupView.lookups.jobRoles,
            isLoading: true
          }
        }
      });
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.tableLoadingMessage)).toHaveAttribute('colSpan', expected.toString());
    });
  });

  describe('TableErrorMessage', () => {
    it('is not rendered when isLoading is true', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeJobSetupView,
        lookups: {
          ...fakeJobSetupView.lookups,
          jobRoles: {
            ...fakeJobSetupView.lookups.jobRoles,
            isLoading: true
          }
        }
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.tableErrorMessage)).not.toBeInTheDocument();
    });

    describe('when hasError is true and isLoading is false', () => {
      const error = { friendlyMessage: faker.random.alphaNumeric(10) };

      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeJobSetupView,
          lookups: {
            ...fakeJobSetupView.lookups,
            jobRoles: {
              ...fakeJobSetupView.lookups.jobRoles,
              isLoading: false,
              hasError: true,
              error
            }
          }
        });
      });

      it('is rendered', () => {
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.tableErrorMessage)).toBeInTheDocument();
      });

      it('has correct displayMessage prop', () => {
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.tableErrorMessage)).toHaveAttribute('displayMessage', error.friendlyMessage);
      });

      it('has correct error prop', () => {
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.tableErrorMessage)).toHaveAttribute('error', JSON.stringify(error));
      });

      it('has correct colSpan prop', () => {
        const expected = 3;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.tableErrorMessage)).toHaveAttribute('colSpan', expected.toString());
      });
    });
  });

  describe('TableInfoMessage', () => {
    it('does not render when isLoading is true', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeJobSetupView,
        lookups: {
          ...fakeJobSetupView.lookups,
          jobRoles: {
            ...fakeJobSetupView.lookups.jobRoles,
            isLoading: true
          }
        }
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.tableInfoMessage)).not.toBeInTheDocument();
    });

    it('does not render when isLoading is false and hasError is true', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeJobSetupView,
        lookups: {
          ...fakeJobSetupView.lookups,
          jobRoles: {
            ...fakeJobSetupView.lookups.jobRoles,
            isLoading: false,
            hasError: true,
            error: {}
          }
        }
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.tableInfoMessage)).not.toBeInTheDocument();
    });

    it('does not render when isLoading is false, hasError is false, and data has items', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeJobSetupView,
        lookups: {
          ...fakeJobSetupView.lookups,
          jobRoles: {
            ...fakeJobSetupView.lookups.jobRoles,
            isLoading: false,
            hasError: false,
            data: [{ id: faker.datatype.number() }]
          }
        }
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.tableInfoMessage)).not.toBeInTheDocument();
    });

    it('is rendered when isLoading is false, hasError is false, and data has no items', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeJobSetupView,
        lookups: {
          ...fakeJobSetupView.lookups,
          jobRoles: {
            ...fakeJobSetupView.lookups.jobRoles,
            isLoading: false,
            hasError: false,
            data: []
          }
        }
      });
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.tableInfoMessage)).toBeInTheDocument();
    });

    it('has correct colSpan prop', () => {
      const expected = 3;
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeJobSetupView,
        lookups: {
          ...fakeJobSetupView.lookups,
          jobRoles: {
            ...fakeJobSetupView.lookups.jobRoles,
            isLoading: false,
            hasError: false,
            data: []
          }
        }
      });
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.tableInfoMessage)).toHaveAttribute('colSpan', expected.toString());
    });

    it('has correct displayMessage prop', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeJobSetupView,
        lookups: {
          ...fakeJobSetupView.lookups,
          jobRoles: {
            ...fakeJobSetupView.lookups.jobRoles,
            isLoading: false,
            hasError: false,
            data: []
          }
        }
      });
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.tableInfoMessage)).toHaveAttribute(
        'displayMessage',
        'No job roles have been added.'
      );
    });
  });

  describe('JobRolesTableRow', () => {
    it('does not render when isLoading is true', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeJobSetupView,
        lookups: {
          ...fakeJobSetupView.lookups,
          jobRoles: {
            ...fakeJobSetupView.lookups.jobRoles,
            isLoading: true
          }
        }
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.jobRolesTableRow)).not.toBeInTheDocument();
    });

    it('does not render when isLoading is false and hasError is true', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeJobSetupView,
        lookups: {
          ...fakeJobSetupView.lookups,
          jobRoles: {
            ...fakeJobSetupView.lookups.jobRoles,
            isLoading: false,
            hasError: true,
            error: {}
          }
        }
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.jobRolesTableRow)).not.toBeInTheDocument();
    });

    it('does not render when isLoading is false, hasError is false, and data has no items', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeJobSetupView,
        lookups: {
          ...fakeJobSetupView.lookups,
          jobRoles: {
            ...fakeJobSetupView.lookups.jobRoles,
            isLoading: false,
            hasError: false,
            data: []
          }
        }
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.jobRolesTableRow)).not.toBeInTheDocument();
    });

    it('renders when isLoading is false, hasError is false, and data has items', () => {
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeJobSetupView,
        lookups: {
          ...fakeJobSetupView.lookups,
          jobRoles: {
            ...fakeJobSetupView.lookups.jobRoles,
            isLoading: false,
            hasError: false,
            data: [{ id: faker.datatype.number() }]
          }
        }
      });
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.jobRolesTableRow)).toBeInTheDocument();
    });

    it('renders once for each item in the collection', () => {
      const itemCount = faker.datatype.number({ min: 1, max: 20 });
      const jobRoles = [...Array(itemCount).keys()].map(() => ({ id: faker.datatype.number() }));
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeJobSetupView,
        lookups: {
          ...fakeJobSetupView.lookups,
          jobRoles: {
            ...fakeJobSetupView.lookups.jobRoles,
            isLoading: false,
            hasError: false,
            data: jobRoles
          }
        }
      });
      render(getComponentToRender());
      expect(screen.getAllByTestId(testIds.jobRolesTableRow)).toHaveLength(jobRoles.length);
    });

    it('has correct jobRole prop', () => {
      const expectedJobRole = { id: faker.datatype.number() };
      const jobRoles = [expectedJobRole];
      newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
        ...fakeJobSetupView,
        lookups: {
          ...fakeJobSetupView.lookups,
          jobRoles: {
            ...fakeJobSetupView.lookups.jobRoles,
            isLoading: false,
            hasError: false,
            data: jobRoles
          }
        }
      });
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.jobRolesTableRow)).toHaveAttribute(
        'data-job-role',
        JSON.stringify(expectedJobRole)
      );
    });

    describe('functional', () => {
      it('shows the confirmation modal with proper message when clicked', () => {
        // * ARRANGE
        const jobRoles = [{ id: faker.datatype.number() }];
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeJobSetupView,
          lookups: {
            ...fakeJobSetupView.lookups,
            jobRoles: {
              ...fakeJobSetupView.lookups.jobRoles,
              isLoading: false,
              hasError: false,
              data: jobRoles
            }
          }
        });

        const expectedIsOpen = true;
        const expectedMessage =
          `Are you sure you want to delete the "${mockOnDeleteArgs.roleName}" job role ` +
          `for ${mockOnDeleteArgs.staffName}?`;

        // * ACT
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByText('on-delete-trigger'));

        // * ASSERT
        expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('isOpen', expectedIsOpen.toString());
        expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('message', expectedMessage);
      });
    });
  });

  describe('ConfirmationModal', () => {
    it('is rendered', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.confirmationModal)).toBeInTheDocument();
    });

    it('is not open by default', () => {
      const expected = false;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('isOpen', expected.toString());
    });

    it('has correct confirmation type', () => {
      const expected = CONFIRMATION_MODAL_TYPES.danger;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute(
        'confirmationType',
        JSON.stringify(expected)
      );
    });

    it('has correct title', () => {
      const expected = 'Delete Job Role?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('title', expected);
    });

    it('has empty message by default', () => {
      const expected = '';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('message', expected);
    });

    it('has correct confirm button text', () => {
      const expected = 'Delete Job Role';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('confirmButtonText', expected);
    });

    describe('functional', () => {
      it('closes the confirmation modal when the onCancel event is triggered', () => {
        // * ARRANGE
        const jobRoles = [{ id: faker.datatype.number() }];
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeJobSetupView,
          lookups: {
            ...fakeJobSetupView.lookups,
            jobRoles: {
              ...fakeJobSetupView.lookups.jobRoles,
              isLoading: false,
              hasError: false,
              data: jobRoles
            }
          }
        });

        // * ACT
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByText('on-delete-trigger'));

        // ensure it is open before triggering onCancel
        expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('isOpen', true.toString());

        // trigger onCancel
        fireEvent.click(screen.getByText('on-cancel-trigger'));

        // * ASSERT
        expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('isOpen', false.toString());
      });

      it('dispatches deleteJobRole when the onConfirm event is triggered', () => {
        // * ARRANGE
        const jobRoles = [{ id: mockOnDeleteArgs.jobRoleId, etag: faker.random.alpha(10) }];
        const thunkResults = faker.random.alphaNumeric(10);

        newEngagementInstanceThunks.deleteJobRole.mockReturnValue(thunkResults);
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeJobSetupView,
          lookups: {
            ...fakeJobSetupView.lookups,
            jobRoles: {
              ...fakeJobSetupView.lookups.jobRoles,
              isLoading: false,
              hasError: false,
              data: jobRoles
            }
          }
        });

        const expectedArgs = { viewId: fakeCurrentViewID, jobRoleId: jobRoles[0].id, etag: jobRoles[0].etag };

        // * ACT
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByText('on-delete-trigger'));

        // ensure it is open before triggering onConfirm
        expect(screen.getByTestId(testIds.confirmationModal)).toHaveAttribute('isOpen', true.toString());

        // trigger onConfirm
        fireEvent.click(screen.getByText('on-confirm-trigger'));

        // * ASSERT
        expect(newEngagementInstanceThunks.deleteJobRole).toHaveBeenCalledTimes(1);
        expect(newEngagementInstanceThunks.deleteJobRole).toHaveBeenCalledWith(expectedArgs);
        expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
      });

      it('closes the confirmation modal when the onConfirm event is triggered', () => {
        // * ARRANGE
        const jobRoles = [{ id: mockOnDeleteArgs.jobRoleId }];
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeJobSetupView,
          lookups: {
            ...fakeJobSetupView.lookups,
            jobRoles: {
              ...fakeJobSetupView.lookups.jobRoles,
              isLoading: false,
              hasError: false,
              data: jobRoles
            }
          }
        });

        // * ACT
        render(getComponentToRender(defaultProps));
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
