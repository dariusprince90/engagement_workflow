import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import AttachmentsTable from './AttachmentsTable';
import ATTACHMENT_REFERENCE_TYPES from '../../../../../helpers/enums/attachmentReferenceTypes';
import newEngagementInstanceSlice from '../../newEngagementInstanceSlice';

// **********************************************************************
// * constants

const testIds = {
  tableErrorMessage: 'table-error-message',
  tableHeader: 'table-header',
  tableInfoMessage: 'table-info-message',
  tableLoadingMessage: 'table-loading-message',
  tableRow: 'table-row'
};

const defaultProps = {
  attachmentReferenceType: faker.helpers.arrayElement(Object.values(ATTACHMENT_REFERENCE_TYPES))
};

const fakeLookups = {
  data: [],
  isLoading: faker.datatype.boolean(),
  hasError: faker.datatype.boolean(),
  error: null
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <AttachmentsTable {...props} />;
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
    selectCurrentView: jest.fn(),
    selectLookup: jest.fn()
  };
});

jest.mock('../../../../common/tables/TableHeader', () => {
  return {
    __esModule: true,
    default: ({ columnHeaders, onAddIconClick }) => {
      return (
        <thead
          data-testid={testIds.tableHeader}
          data-column-headers={JSON.stringify(columnHeaders)}
          onClick={onAddIconClick}
        />
      );
    }
  };
});

jest.mock('../../../../common/tables/TableLoadingMessage', () => {
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

jest.mock('../../../../common/tables/TableErrorMessage', () => {
  return {
    __esModule: true,
    default: ({ colSpan, displayMessage, error }) => {
      const props = { colSpan, displayMessage, error };
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

jest.mock('../../../../common/tables/TableInfoMessage', () => {
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

jest.mock('./TableRow', () => {
  return {
    __esModule: true,
    default: ({ attachment, onDelete }) => {
      return (
        <tr data-testid={testIds.tableRow} data-job-info-response={JSON.stringify(attachment)} onClick={onDelete} />
      );
    }
  };
});

describe('AttachmentsTable', () => {
  // **********************************************************************
  // * setup
  beforeAll(() => {
    jest.spyOn(newEngagementInstanceSlice, 'selectCurrentView');
  });

  beforeEach(() => {
    newEngagementInstanceSlice.selectLookup.mockReturnValue(fakeLookups);
  });

  // **********************************************************************
  // * tear-down

  afterAll(() => {
    newEngagementInstanceSlice.selectLookup.mockClear();
  });

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('TableHeader', () => {
    it('renders tableHeader component', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.tableHeader)).toBeInTheDocument();
    });

    it('has correct columnHeaders prop', () => {
      const expectedColumnHeaders = ['File Name', 'File Type'];
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.tableHeader)).toHaveAttribute(
        'data-column-headers',
        JSON.stringify(expectedColumnHeaders)
      );
    });

    describe('functional', () => {
      it('does yet invoke onClick function', () => {
        const handleAttAttachmentIconClick = jest.fn();
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(testIds.tableHeader));
        expect(handleAttAttachmentIconClick).not.toHaveBeenCalled();
      });
    });
  });

  describe('TableLoadingMessage', () => {
    it('does not render when isLoading is false', () => {
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: false
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.tableLoadingMessage)).not.toBeInTheDocument();
    });

    it('renders when isLoading is true', () => {
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: true
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.tableLoadingMessage)).toHaveAttribute(
        'displayMessage',
        'Loading attachments...'
      );
    });

    it('has correct colSpan prop when isLoading is true', () => {
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: true
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.tableLoadingMessage)).toHaveAttribute('colSpan', '3');
    });
  });

  describe('TableErrorMessage', () => {
    it('renders when isLoading is true', () => {
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: true
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.tableErrorMessage)).not.toBeInTheDocument();
    });

    it('does not render when hasError is true and isLoading is false', () => {
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: false,
        hasError: true
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.tableErrorMessage)).toBeInTheDocument();
    });

    it('has correct error prop', () => {
      const error = faker.random.alphaNumeric(10);
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: false,
        hasError: true,
        error
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.tableErrorMessage)).toHaveAttribute('error', error);
    });

    it('has correct colSpan prop', () => {
      const error = faker.random.alphaNumeric(10);
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: false,
        hasError: true,
        error
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.tableErrorMessage)).toHaveAttribute('colSpan', '3');
    });

    it('has correct displayMessage prop', () => {
      const error = faker.random.alphaNumeric(10);
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: false,
        hasError: true,
        error
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.tableErrorMessage)).toHaveAttribute(
        'displayMessage',
        'There was an error loading the attachments.'
      );
    });
  });

  describe('TableInfoMessage', () => {
    it('does not render when isLoading is false, hasError is false, and attachmentTableData has items', () => {
      const data = [{ id: faker.datatype.number(), attachmentReferenceId: defaultProps.attachmentReferenceType.id }];
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: false,
        hasError: false,
        data
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.tableInfoMessage)).not.toBeInTheDocument();
    });

    it('does not render when isLoading is false and hasError is true', () => {
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: false,
        hasError: true
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.tableInfoMessage)).not.toBeInTheDocument();
    });

    it('does not render when isLoading is true', () => {
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: true
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.tableInfoMessage)).not.toBeInTheDocument();
    });

    it('is rendered when isLoading is false, hasError is false, and attachmentTableData has no items', () => {
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: false,
        hasError: false,
        data: []
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.tableInfoMessage)).toBeInTheDocument();
    });

    it('has correct colSpan prop', () => {
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: false,
        hasError: false,
        data: []
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.tableInfoMessage)).toHaveAttribute('colSpan', '3');
    });

    it('has correct displayMessage prop', () => {
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: false,
        hasError: false,
        data: []
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.tableInfoMessage)).toHaveAttribute(
        'displayMessage',
        'No attachments have been added.'
      );
    });
  });

  describe('tableRow', () => {
    it('renders when isLoading is false, hasError is false, and filesName has items', () => {
      const data = [{ id: faker.datatype.number(), attachmentReferenceId: defaultProps.attachmentReferenceType.id }];
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: false,
        hasError: false,
        data
      });
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.tableRow)).toBeInTheDocument();
    });

    it('does not render when isLoading is true', () => {
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: true
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.tableRow)).not.toBeInTheDocument();
    });

    it('does not render when isLoading is false and hasError is true', () => {
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: false,
        hasError: true
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.tableRow)).not.toBeInTheDocument();
    });

    it('does not render when isLoading is false, hasError is false, and fileName has no items', () => {
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: false,
        hasError: false,
        data: []
      });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByTestId(testIds.tableRow)).not.toBeInTheDocument();
    });
  });

  describe('functional', () => {
    it('does yet invoke onClick function', () => {
      const data = [{ id: faker.datatype.number(), attachmentReferenceId: defaultProps.attachmentReferenceType.id }];
      newEngagementInstanceSlice.selectLookup.mockReturnValue({
        ...fakeLookups,
        isLoading: false,
        hasError: false,
        data
      });
      const handleDeleteIconClick = jest.fn();
      render(getComponentToRender(defaultProps));
      fireEvent.click(screen.getByTestId(testIds.tableRow));
      expect(handleDeleteIconClick).not.toHaveBeenCalled();
    });
  });
});
