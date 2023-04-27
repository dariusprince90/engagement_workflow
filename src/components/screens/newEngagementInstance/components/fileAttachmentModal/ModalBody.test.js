import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as reactRedux from 'react-redux';
import fileAttachmentModalSlice from './fileAttachmentModalSlice';
import newEngagementInstanceSlice from '../../newEngagementInstanceSlice';
import ModalBody from './ModalBody';

// **********************************************************************
// * constants

const testIds = {
  attachmentFile: 'attachment-file',
  errorAlert: 'error-alert',
  progressAlert: 'progress-alert',
  selectInput: 'select-input',
  selectInputOnChange: 'select-input-on-change',
  successAlert: 'success-alert'
};

const defaultProps = {
  uploadFileRef: { current: { files: [{ name: faker.random.alphaNumeric(10) }] } }
};

const fakeModalStates = {
  fileSelection: 1,
  savingAttachment: 2,
  success: 3,
  error: 4
};

const fakeUploadStates = {
  preparing: 1,
  uploading: 2,
  creatingAttachment: 3
};

const fakeAttachment = {
  attachmentTypeId: faker.datatype.number()
};

const fakeLookups = {
  attachmentTypes: {
    data: [],
    isLoading: faker.datatype.boolean(),
    error: null
  }
};

const fakeMetaData = {
  modalState: faker.datatype.number(),
  error: faker.datatype.string()
};

const fakeUploadDetails = {
  uploadState: null,
  percentComplete: faker.datatype.number()
};

const mockDispatch = jest.fn();

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ModalBody {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useDispatch: jest.fn(),
    useSelector: (callback) => callback()
  };
});

jest.mock('./fileAttachmentModalSlice', () => {
  return {
    attachmentTypeChanged: jest.fn(),
    fileNameChanged: jest.fn(),
    selectAttachment: jest.fn(),
    selectLookups: jest.fn(),
    selectMetadata: jest.fn(),
    selectModalStates: jest.fn(),
    selectUploadDetails: jest.fn(),
    selectUploadStates: jest.fn()
  };
});

jest.mock('../../newEngagementInstanceSlice', () => {
  return {
    selectLookups: jest.fn()
  };
});

jest.mock('../../../../common/inputControls/selectInput/SelectInput', () => ({
  __esModule: true,
  default: ({ name, value, defaultOption, options, onChange, isLoading, loadingText }) => {
    const props = { name, value, defaultOption, isLoading, loadingText };
    return (
      <fake-select-input
        {...props}
        onClick={onChange}
        data-testid={testIds.selectInput}
        options={JSON.stringify(options)}>
        <input type="text" data-testid={testIds.selectInputOnChange} onChange={onChange} />
      </fake-select-input>
    );
  }
}));

jest.mock('../../../../common/alerts/ProgressAlert', () => ({
  __esModule: true,
  default: ({ alertType, message, percentComplete }) => {
    const props = { alertType, message, percentComplete };
    return <fake-progress-alert {...props} data-testid={testIds.progressAlert} />;
  }
}));

jest.mock('./SuccessAlert', () => ({
  __esModule: true,
  default: () => {
    return <fake-success-alert data-testid={testIds.successAlert} />;
  }
}));

jest.mock('../../../../common/alerts/ErrorAlert', () => ({
  __esModule: true,
  default: ({ displayMessage, error }) => {
    const props = { displayMessage, error };
    return <fake-error-alert {...props} data-testid={testIds.errorAlert} />;
  }
}));

// **********************************************************************
// * unit tests

describe('ModalBody', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    fileAttachmentModalSlice.selectModalStates.mockReturnValue(fakeModalStates);
    fileAttachmentModalSlice.selectUploadStates.mockReturnValue(fakeUploadStates);
    fileAttachmentModalSlice.selectAttachment.mockReturnValue(fakeAttachment);
    fileAttachmentModalSlice.selectMetadata.mockReturnValue(fakeMetaData);
    fileAttachmentModalSlice.selectUploadDetails.mockReturnValue(fakeUploadDetails);
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

  describe('attachmentFile file input', () => {
    it('renders when modalState is fileSelection', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: fakeModalStates.fileSelection
      });

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.attachmentFile)).toBeInTheDocument();
    });

    it('does not render when modalState is not fileSelection', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: faker.datatype.number({ min: 2 })
      });

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.queryByTestId(testIds.attachmentFile)).not.toBeInTheDocument();
    });

    it('has correct type prop', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: fakeModalStates.fileSelection
      });
      const expected = 'file';

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.attachmentFile)).toHaveAttribute('type', expected);
    });

    it('has correct accept prop', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: fakeModalStates.fileSelection
      });
      const expected = '.pdf,.docx,.doc,.xlsx';

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.attachmentFile)).toHaveAttribute('accept', expected);
    });

    describe('functional', () => {
      it('dispatches fileNameChanged when onChange is triggered with a file', () => {
        // * ARRANGE
        const dispatchedResults = faker.random.alphaNumeric(10);
        const mockFiles = [{ name: faker.random.alphaNumeric(10) }];
        const expectedFileName = mockFiles[0].name;

        fileAttachmentModalSlice.fileNameChanged.mockReturnValue(dispatchedResults);
        fileAttachmentModalSlice.selectMetadata.mockReturnValue({
          ...fakeMetaData,
          modalState: fakeModalStates.fileSelection
        });

        // * ACT
        render(getComponentToRender(defaultProps));
        expect(fileAttachmentModalSlice.fileNameChanged).not.toHaveBeenCalled();
        fireEvent.change(screen.getByTestId(testIds.attachmentFile), { target: { files: mockFiles } });

        // * ASSERT
        expect(fileAttachmentModalSlice.fileNameChanged).toHaveBeenCalledTimes(1);
        expect(fileAttachmentModalSlice.fileNameChanged).toHaveBeenCalledWith({ fileName: expectedFileName });
        expect(mockDispatch).toHaveBeenCalledWith(dispatchedResults);
      });

      it('dispatches fileNameChanged when onChange is triggered with no file', () => {
        // * ARRANGE
        const dispatchedResults = faker.random.alphaNumeric(10);

        fileAttachmentModalSlice.fileNameChanged.mockReturnValue(dispatchedResults);
        fileAttachmentModalSlice.selectMetadata.mockReturnValue({
          ...fakeMetaData,
          modalState: fakeModalStates.fileSelection
        });

        // * ACT
        render(getComponentToRender(defaultProps));
        expect(fileAttachmentModalSlice.fileNameChanged).not.toHaveBeenCalled();
        fireEvent.change(screen.getByTestId(testIds.attachmentFile), { target: { files: [] } });

        // * ASSERT
        expect(fileAttachmentModalSlice.fileNameChanged).toHaveBeenCalledTimes(1);
        expect(fileAttachmentModalSlice.fileNameChanged).toHaveBeenCalledWith({ fileName: '' });
        expect(mockDispatch).toHaveBeenCalledWith(dispatchedResults);
      });
    });
  });

  describe('attachmentTypeId select input', () => {
    it('renders when modalState is fileSelection', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: fakeModalStates.fileSelection
      });

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.selectInput)).toBeInTheDocument();
    });

    it('does not render when modalState is not fileSelection', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: faker.datatype.number({ min: 2 })
      });

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.queryByTestId(testIds.selectInput)).not.toBeInTheDocument();
    });

    it('has correct value prop', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: fakeModalStates.fileSelection
      });
      const expected = fakeAttachment.attachmentTypeId;

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('value', expected.toString());
    });

    it('has correct defaultOption prop', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: fakeModalStates.fileSelection
      });
      const expected = 'Select an attachment type...';

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('defaultOption', expected);
    });

    it('has correct options prop when attachmentTypes.data is empty', () => {
      // * ARRANGE
      const expectedOptions = [];
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: fakeModalStates.fileSelection
      });
      newEngagementInstanceSlice.selectLookups.mockReturnValue({
        ...fakeLookups,
        attachmentTypes: { ...fakeLookups.attachmentTypes, data: [] }
      });

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('options', JSON.stringify(expectedOptions));
    });

    it('has correct options prop when attachmentTypes.data is not empty', () => {
      // * ARRANGE
      const itemCount = faker.datatype.number({ min: 1, max: 20 });
      const attachmentTypes = [...Array(itemCount).keys()].map(() => ({
        id: faker.datatype.number(),
        displayName: faker.random.alphaNumeric(10)
      }));
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: fakeModalStates.fileSelection
      });
      newEngagementInstanceSlice.selectLookups.mockReturnValue({
        ...fakeLookups,
        attachmentTypes: { ...fakeLookups.attachmentTypes, data: attachmentTypes }
      });
      const expectedOptions = attachmentTypes.map((attachmentType) => ({
        value: attachmentType.id,
        text: attachmentType.displayName
      }));

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('options', JSON.stringify(expectedOptions));
    });

    it('has correct isLoading prop', () => {
      // * ARRANGE
      const expectedIsLoading = faker.datatype.boolean();
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: fakeModalStates.fileSelection
      });
      newEngagementInstanceSlice.selectLookups.mockReturnValue({
        ...fakeLookups,
        attachmentTypes: { ...fakeLookups.attachmentTypes, isLoading: expectedIsLoading }
      });

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('isLoading', expectedIsLoading.toString());
    });

    it('has correct loadingText prop', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: fakeModalStates.fileSelection
      });
      const expectedLoadingText = 'Loading attachment types...';

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('loadingText', expectedLoadingText);
    });

    describe('functional', () => {
      it('dispatches attachmentTypeChanged type when onChange is triggered', () => {
        // * ARRANGE
        const fakeAttachmentTypeId = faker.datatype.number();
        const dispatchedResults = faker.random.alphaNumeric(10);

        fileAttachmentModalSlice.attachmentTypeChanged.mockReturnValue(dispatchedResults);
        fileAttachmentModalSlice.selectMetadata.mockReturnValue({
          ...fakeMetaData,
          modalState: fakeModalStates.fileSelection
        });

        // * ACT
        render(getComponentToRender(defaultProps));
        expect(fileAttachmentModalSlice.attachmentTypeChanged).not.toHaveBeenCalled();
        fireEvent.change(screen.getByTestId(`${testIds.selectInputOnChange}`), {
          target: { value: fakeAttachmentTypeId }
        });

        // * ASSERT
        expect(fileAttachmentModalSlice.attachmentTypeChanged).toHaveBeenCalledTimes(1);
        expect(fileAttachmentModalSlice.attachmentTypeChanged).toHaveBeenCalledWith({
          attachmentTypeId: fakeAttachmentTypeId.toString()
        });
        expect(mockDispatch).toHaveBeenCalledWith(dispatchedResults);
      });
    });
  });

  describe('ProgressAlert', () => {
    describe('when modal state is savingAttachment and uploadState is preparing', () => {
      // **********************************************************************
      // * setup

      beforeEach(() => {
        fileAttachmentModalSlice.selectMetadata.mockReturnValue({
          ...fakeMetaData,
          modalState: fakeModalStates.savingAttachment
        });

        fileAttachmentModalSlice.selectUploadDetails.mockReturnValue({
          ...fakeUploadDetails,
          uploadState: fakeUploadStates.preparing
        });
      });

      // **********************************************************************
      // * tear-down

      // **********************************************************************
      // * execution

      it('renders', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.progressAlert)).toBeInTheDocument();
      });

      it('has correct alertType prop', () => {
        const expected = 'warning';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.progressAlert)).toHaveAttribute('alertType', expected);
      });

      it('has correct message prop', () => {
        const expected = 'Preparing upload...';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.progressAlert)).toHaveAttribute('message', expected);
      });

      it('has no percentComplete prop', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.progressAlert)).not.toHaveAttribute('percentComplete');
      });
    });

    describe('when modal state is savingAttachment and uploadState is uploading', () => {
      // **********************************************************************
      // * setup

      beforeEach(() => {
        fileAttachmentModalSlice.selectMetadata.mockReturnValue({
          ...fakeMetaData,
          modalState: fakeModalStates.savingAttachment
        });

        fileAttachmentModalSlice.selectUploadDetails.mockReturnValue({
          ...fakeUploadDetails,
          uploadState: fakeUploadStates.uploading
        });
      });

      // **********************************************************************
      // * tear-down

      // **********************************************************************
      // * execution

      it('renders', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.progressAlert)).toBeInTheDocument();
      });

      it('has correct alertType prop', () => {
        const expected = 'info';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.progressAlert)).toHaveAttribute('alertType', expected);
      });

      it('has correct message prop', () => {
        const expected = 'Uploading attachment...';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.progressAlert)).toHaveAttribute('message', expected);
      });

      it('has correct percentComplete prop', () => {
        const expected = fakeUploadDetails.percentComplete;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.progressAlert)).toHaveAttribute('percentComplete', expected.toString());
      });
    });

    describe('when modal state is savingAttachment and uploadState is creatingAttachment', () => {
      // **********************************************************************
      // * setup

      beforeEach(() => {
        fileAttachmentModalSlice.selectMetadata.mockReturnValue({
          ...fakeMetaData,
          modalState: fakeModalStates.savingAttachment
        });

        fileAttachmentModalSlice.selectUploadDetails.mockReturnValue({
          ...fakeUploadDetails,
          uploadState: fakeUploadStates.creatingAttachment
        });
      });

      // **********************************************************************
      // * tear-down

      // **********************************************************************
      // * execution

      it('renders', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.progressAlert)).toBeInTheDocument();
      });

      it('has correct alertType prop', () => {
        const expected = 'info';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.progressAlert)).toHaveAttribute('alertType', expected);
      });

      it('has correct message prop when uploadState is creatingAttachment', () => {
        const expected = 'Attaching file to your workflow...';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.progressAlert)).toHaveAttribute('message', expected);
      });

      it('has no percentComplete prop', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.progressAlert)).not.toHaveAttribute('percentComplete');
      });
    });

    it('does not render when modalState is not savingAttachment', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: faker.datatype.number({ min: 3 })
      });
      fileAttachmentModalSlice.selectUploadDetails.mockReturnValue({
        ...fakeUploadDetails,
        uploadState: fakeUploadStates.preparing
      });

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.queryByTestId(testIds.progressAlert)).not.toBeInTheDocument();
    });

    it('does not render when uploadState is neither preparing, uploading, nor creatingAttachment', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: fakeModalStates.savingAttachment
      });
      fileAttachmentModalSlice.selectUploadDetails.mockReturnValue({
        ...fakeUploadDetails,
        uploadState: faker.datatype.number({ min: 4 })
      });

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.queryByTestId(testIds.progressAlert)).not.toBeInTheDocument();
    });
  });

  describe('SuccessAlert', () => {
    it('renders when modalState is success', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: fakeModalStates.success
      });

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.successAlert)).toBeInTheDocument();
    });

    it('does not render when modalState is not success', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: faker.datatype.number({ min: 4 })
      });

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.queryByTestId(testIds.successAlert)).not.toBeInTheDocument();
    });
  });

  describe('ErrorAlert', () => {
    it('renders when modalState is error', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: fakeModalStates.error
      });

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.errorAlert)).toBeInTheDocument();
    });

    it('does not render when modalState is not error', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: faker.datatype.number({ min: 5 })
      });

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.queryByTestId(testIds.errorAlert)).not.toBeInTheDocument();
    });

    it('has correct displayMessage prop', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: fakeModalStates.error
      });
      const expected = 'An error occurred adding the attachment.';

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.errorAlert)).toHaveAttribute('displayMessage', expected);
    });

    it('has correct error prop', () => {
      // * ARRANGE
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({
        ...fakeMetaData,
        modalState: fakeModalStates.error
      });
      const expected = fakeMetaData.error;

      // * ACT
      render(getComponentToRender(defaultProps));

      // * ASSERT
      expect(screen.getByTestId(testIds.errorAlert)).toHaveAttribute('error', expected);
    });
  });
});
