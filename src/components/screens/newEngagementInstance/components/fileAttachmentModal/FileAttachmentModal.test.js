import ReactDOM from 'react-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as reactRedux from 'react-redux';
import { useRef } from 'react';
import bsCustomFileInput from 'bs-custom-file-input';

import fileAttachmentModalSlice from './fileAttachmentModalSlice';
import FileAttachmentModal from './FileAttachmentModal';

// **********************************************************************
// * constants

const testIds = {
  // modal
  modal: 'modal',
  modalOnCancel: 'modal-on-cancel',
  modalOnAfterOpen: 'modal-on-after-open',

  // modalBody
  modalBody: 'modal-body',

  // modalFooter
  modalFooter: 'modal-footer',
  footerOnCancel: 'footer-on-cancel',
  footerOnSave: 'footer-on-save'
};

const defaultProps = {
  onSaveCompleted: jest.fn()
};

const fakeMetaData = {
  isOpen: faker.datatype.boolean()
};

const fakeUploadFileRef = { current: { files: [] } };

const mockDispatch = jest.fn();

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <FileAttachmentModal {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useRef: jest.fn()
  };
});

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => callback(),
    useDispatch: jest.fn()
  };
});

jest.mock('bs-custom-file-input', () => {
  return {
    init: jest.fn()
  };
});

jest.mock('./fileAttachmentModalSlice', () => {
  return {
    createAttachment: jest.fn(),
    modalClosed: jest.fn(),
    selectMetadata: jest.fn()
  };
});

jest.mock('../../../../common/modals/Modal', () => ({
  __esModule: true,
  default: ({ title, isOpen, onClose, onAfterOpen, body, footer }) => {
    const props = { title, isOpen };
    return (
      <>
        <fake-modal {...props} data-testid={testIds.modal}>
          <button data-testid={testIds.modalOnCancel} onClick={onClose} />
          <button data-testid={testIds.modalOnAfterOpen} onClick={onAfterOpen} />
          {body}
          {footer}
        </fake-modal>
      </>
    );
  }
}));

jest.mock('./ModalBody', () => ({
  __esModule: true,
  default: ({ uploadFileRef }) => (
    <fake-modal-body uploadFileRef={JSON.stringify(uploadFileRef)} data-testid={testIds.modalBody} />
  )
}));

jest.mock('./ModalFooter', () => ({
  __esModule: true,
  default: ({ onCancel, onSave }) => {
    return (
      <fake-modal-footer data-testid={testIds.modalFooter}>
        <button data-testid={testIds.footerOnCancel} onClick={onCancel} />
        <button data-testid={testIds.footerOnSave} onClick={onSave} />
      </fake-modal-footer>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('FileAttachmentModal', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    jest.spyOn(bsCustomFileInput, 'init');
  });

  beforeEach(() => {
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    useRef.mockReturnValue(fakeUploadFileRef);
    fileAttachmentModalSlice.selectMetadata.mockReturnValue(fakeMetaData);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('Modal', () => {
    it('has correct title prop', () => {
      const expectedTitle = 'Add Attachment';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.modal)).toHaveAttribute('title', expectedTitle);
    });

    it('has correct isOpen prop', () => {
      const expectedIsOpen = fakeMetaData.isOpen;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.modal)).toHaveAttribute('isOpen', expectedIsOpen.toString());
    });

    it('dispatches modalClosed when onClose event is triggered', () => {
      // * ARRANGE
      const results = faker.random.alphaNumeric(10);
      fileAttachmentModalSlice.modalClosed.mockReturnValue(results);

      // * ACT
      render(getComponentToRender(defaultProps));
      expect(fileAttachmentModalSlice.modalClosed).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.modalOnCancel));

      // * ASSERT
      expect(fileAttachmentModalSlice.modalClosed).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(results);
    });

    it('initializes bsCustomFileInput when onAfterOpen event is triggered', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(screen.getByTestId(testIds.modalOnAfterOpen));
      expect(bsCustomFileInput.init).toHaveBeenCalledTimes(1);
    });
  });

  describe('modal body', () => {
    it('has correct uploadFileRef prop', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.modalBody)).toHaveAttribute('uploadFileRef', JSON.stringify(fakeUploadFileRef));
    });
  });

  describe('modal footer', () => {
    it('dispatches modalClosed when onCancel is triggered', () => {
      // * ARRANGE
      const results = faker.random.alphaNumeric(10);
      fileAttachmentModalSlice.modalClosed.mockReturnValue(results);

      // * ACT
      render(getComponentToRender(defaultProps));
      expect(fileAttachmentModalSlice.modalClosed).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.footerOnCancel));

      // * ASSERT
      expect(fileAttachmentModalSlice.modalClosed).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(results);
    });

    it('dispatches createAttachment when save button is clicked', () => {
      // * ARRANGE
      const results = faker.random.alphaNumeric(10);
      const uploadFileRef = { current: { files: [faker.random.alphaNumeric(10)] } };
      fileAttachmentModalSlice.createAttachment.mockReturnValue(results);
      useRef.mockReturnValue(uploadFileRef);

      // * ACT
      render(getComponentToRender(defaultProps));
      expect(fileAttachmentModalSlice.createAttachment).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.footerOnSave));

      // * ASSERT
      expect(fileAttachmentModalSlice.createAttachment).toHaveBeenCalledTimes(1);
      expect(fileAttachmentModalSlice.createAttachment).toHaveBeenCalledWith({ file: uploadFileRef.current.files[0] });
      expect(mockDispatch).toHaveBeenCalledWith(results);
    });

    it('invokes onSaveCompleted when save button is clicked when onSaveCompleted is defined', async () => {
      // * ARRANGE
      const uploadFileRef = { current: { files: [faker.random.alphaNumeric(10)] } };
      useRef.mockReturnValue(uploadFileRef);

      // * ACT
      render(getComponentToRender(defaultProps));
      fireEvent.click(screen.getByTestId(testIds.footerOnSave));

      // * ASSERT
      await waitFor(() => {
        expect(defaultProps.onSaveCompleted).toHaveBeenCalled();
      });
    });

    it('does not invoke onSaveCompleted when save button is clicked when onSaveCompleted is not defined', async () => {
      // * ARRANGE
      const uploadFileRef = { current: { files: [faker.random.alphaNumeric(10)] } };
      useRef.mockReturnValue(uploadFileRef);

      // * ACT
      render(getComponentToRender({ ...defaultProps, onSaveCompleted: null }));
      fireEvent.click(screen.getByTestId(testIds.footerOnSave));

      // * ASSERT
      await waitFor(() => {
        expect(defaultProps.onSaveCompleted).not.toHaveBeenCalled();
      });
    });
  });
});
