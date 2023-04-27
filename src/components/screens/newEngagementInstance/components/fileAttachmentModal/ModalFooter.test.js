import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import fileAttachmentModalSlice from './fileAttachmentModalSlice';
import ModalFooter from './ModalFooter';

// **********************************************************************
// * constants

const defaultProps = {
  onCancel: jest.fn(),
  onSave: jest.fn()
};

const fakeMetaData = {
  modalState: faker.datatype.string()
};

const fakeModalStates = {
  fileSelection: 1,
  savingAttachment: 2,
  success: 3,
  error: 4
};

const fakeIsReadyToUpload = faker.datatype.boolean();

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ModalFooter {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => callback()
  };
});

jest.mock('./fileAttachmentModalSlice', () => {
  return {
    selectIsReadyToUpload: jest.fn(),
    selectMetadata: jest.fn(),
    selectModalStates: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('ModalFooter', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    fileAttachmentModalSlice.selectMetadata.mockReturnValue(fakeMetaData);
    fileAttachmentModalSlice.selectModalStates.mockReturnValue(fakeModalStates);
    fileAttachmentModalSlice.selectIsReadyToUpload.mockReturnValue(fakeIsReadyToUpload);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('Cancel Button', () => {
    it('renders when modalState is fileSelection', () => {
      const modalState = fakeModalStates.fileSelection;
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({ modalState });
      render(getComponentToRender(defaultProps));
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('does not render when modalState is not fileSelection', () => {
      const modalState = faker.random.alphaNumeric(10);
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({ modalState });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    });

    it('has correct text', () => {
      const modalState = fakeModalStates.fileSelection;
      const expectedText = 'Cancel';
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({ modalState });
      render(getComponentToRender(defaultProps));
      expect(screen.getByText('Cancel')).toHaveTextContent(expectedText);
    });

    describe('functional', () => {
      it('invokes onCancel when onClick is triggered', () => {
        const modalState = fakeModalStates.fileSelection;
        fileAttachmentModalSlice.selectMetadata.mockReturnValue({ modalState });
        render(getComponentToRender(defaultProps));
        expect(defaultProps.onCancel).not.toHaveBeenCalled();
        fireEvent.click(screen.getByText('Cancel'));
        expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Save Button', () => {
    it('renders when modalState is fileSelection', () => {
      const modalState = fakeModalStates.fileSelection;
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({ modalState });
      render(getComponentToRender(defaultProps));
      expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('does not render when modalState is not fileSelection', () => {
      const modalState = faker.random.alphaNumeric(10);
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({ modalState });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByText('Save')).not.toBeInTheDocument();
    });

    it('has correct text', () => {
      const modalState = fakeModalStates.fileSelection;
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({ modalState });
      const expectedText = 'Save';
      render(getComponentToRender(defaultProps));
      expect(screen.getByText('Save')).toHaveTextContent(expectedText);
    });

    it('is disabled when isReadyToUpload is false', () => {
      const modalState = fakeModalStates.fileSelection;
      const isReadyToUpload = false;
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({ modalState });
      fileAttachmentModalSlice.selectIsReadyToUpload.mockReturnValue(isReadyToUpload);
      render(getComponentToRender(defaultProps));
      expect(screen.getByText('Save')).toHaveAttribute('disabled');
    });

    it('is not disabled when isReadyToUpload is true', () => {
      const modalState = fakeModalStates.fileSelection;
      const isReadyToUpload = true;
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({ modalState });
      fileAttachmentModalSlice.selectIsReadyToUpload.mockReturnValue(isReadyToUpload);
      render(getComponentToRender(defaultProps));
      expect(screen.getByText('Save')).not.toHaveAttribute('disabled');
    });

    describe('functional', () => {
      it('invokes onSave when onClick triggered', () => {
        const modalState = fakeModalStates.fileSelection;
        fileAttachmentModalSlice.selectMetadata.mockReturnValue({ modalState });
        fileAttachmentModalSlice.selectIsReadyToUpload.mockReturnValue(true);
        render(getComponentToRender(defaultProps));
        expect(defaultProps.onSave).not.toHaveBeenCalled();
        fireEvent.click(screen.getByText('Save'));
        expect(defaultProps.onSave).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Close Button', () => {
    it('renders when modalState not fileSelection', () => {
      const modalState = faker.random.alphaNumeric(10);
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({ modalState });
      render(getComponentToRender(defaultProps));
      expect(screen.getByText('Close')).toBeInTheDocument();
    });

    it('does not render when modalState is fileSelection', () => {
      const modalState = fakeModalStates.fileSelection;
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({ modalState });
      render(getComponentToRender(defaultProps));
      expect(screen.queryByText('Close')).not.toBeInTheDocument();
    });

    it('has correct text', () => {
      const modalState = faker.random.alphaNumeric(10);
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({ modalState });
      const expectedText = 'Close';
      render(getComponentToRender(defaultProps));
      expect(screen.getByText('Close')).toHaveTextContent(expectedText);
    });

    it('is disabled when modalState is savingAttachment', () => {
      const modalState = fakeModalStates.savingAttachment;
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({ modalState });
      render(getComponentToRender(defaultProps));
      expect(screen.getByText('Close')).toHaveAttribute('disabled');
    });

    it('is not disabled when modalState is not savingAttachment', () => {
      const modalState = faker.random.alphaNumeric(10);
      fileAttachmentModalSlice.selectMetadata.mockReturnValue({ modalState });
      render(getComponentToRender(defaultProps));
      expect(screen.getByText('Close')).not.toHaveAttribute('disabled');
    });

    describe('functional', () => {
      it('invokes onCancel when onClick triggered', () => {
        const modalState = faker.random.alphaNumeric(10);
        fileAttachmentModalSlice.selectMetadata.mockReturnValue({ modalState });
        render(getComponentToRender(defaultProps));
        expect(defaultProps.onCancel).not.toHaveBeenCalled();
        fireEvent.click(screen.getByText('Close'));
        expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
      });
    });
  });
});
