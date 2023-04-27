import ReactDOM from 'react-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import CONFIRMATION_MODAL_TYPES from '../../../../../helpers/enums/confirmationModalTypes';
import ConfirmationModal from './ConfirmationModal';

// **********************************************************************
// * constants

const testIds = {
  // modal
  modal: 'modal',
  modalOnClose: 'modal-on-close',

  // modalBody
  modalBody: 'modal-body',

  // modalFooter
  modalFooter: 'modal-footer',
  footerOnCancel: 'footer-on-cancel',
  footerOnConfirm: 'footer-on-confirm'
};

const defaultProps = {
  isOpen: faker.datatype.boolean(),
  confirmationType: faker.helpers.arrayElement(Object.values(CONFIRMATION_MODAL_TYPES)),
  title: faker.random.alpha(10),
  message: faker.random.alpha(10),
  confirmButtonText: faker.random.alpha(10),
  onConfirm: jest.fn(),
  onCancel: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ConfirmationModal {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('../../../../common/modals/Modal', () => ({
  __esModule: true,
  default: ({ isOpen, onClose, title, body, footer }) => {
    const props = { isOpen, title };
    return (
      <fake-modal {...props} data-testid={testIds.modal}>
        <button data-testid={testIds.modalOnClose} onClick={onClose} />
        {body}
        {footer}
      </fake-modal>
    );
  }
}));

jest.mock('./ModalBody', () => ({
  __esModule: true,
  default: ({ confirmationType, message }) => {
    const props = { message };
    return (
      <fake-modal-body {...props} confirmationType={JSON.stringify(confirmationType)} data-testid={testIds.modalBody} />
    );
  }
}));

jest.mock('./ModalFooter', () => ({
  __esModule: true,
  default: ({ confirmationType, confirmButtonText, onConfirm, onCancel }) => {
    const props = { confirmButtonText };
    return (
      <fake-modal-footer
        {...props}
        confirmationType={JSON.stringify(confirmationType)}
        data-testid={testIds.modalFooter}>
        <button data-testid={testIds.footerOnCancel} onClick={onCancel} />
        <button data-testid={testIds.footerOnConfirm} onClick={onConfirm} />
      </fake-modal-footer>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('ConfirmationModal', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('modal', () => {
    it('has correct isOpen prop', () => {
      const isOpen = faker.datatype.boolean();
      const props = { ...defaultProps, isOpen };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.modal)).toHaveAttribute('isOpen', isOpen.toString());
    });

    it('has correct title prop', () => {
      const title = faker.random.alpha(10);
      const props = { ...defaultProps, title };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.modal)).toHaveAttribute('title', title);
    });

    it('invokes onCancel when modal onClose event is triggered', () => {
      // * ARRANGE
      const onCancel = jest.fn();
      const props = { ...defaultProps, onCancel };

      // * ACT
      render(getComponentToRender(props));
      expect(onCancel).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.modalOnClose));

      // * ASSERT
      expect(onCancel).toHaveBeenCalledOnce();
    });
  });

  describe('modal body', () => {
    it('renders inside modal', () => {
      render(getComponentToRender(defaultProps));
      const modal = screen.getByTestId(testIds.modal);
      expect(within(modal).getByTestId(testIds.modalBody)).toBeInTheDocument();
    });

    it('has correct confirmationType prop', () => {
      const confirmationType = faker.helpers.arrayElement(Object.values(CONFIRMATION_MODAL_TYPES));
      const props = { ...defaultProps, confirmationType };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.modalBody)).toHaveAttribute(
        'confirmationType',
        JSON.stringify(confirmationType)
      );
    });

    it('has correct message prop', () => {
      const message = faker.random.alpha(10);
      const props = { ...defaultProps, message };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.modalBody)).toHaveAttribute('message', message);
    });
  });

  describe('modal footer', () => {
    it('renders inside modal', () => {
      render(getComponentToRender(defaultProps));
      const modal = screen.getByTestId(testIds.modal);
      expect(within(modal).getByTestId(testIds.modalFooter)).toBeInTheDocument();
    });

    it('has correct confirmationType prop', () => {
      const confirmationType = faker.helpers.arrayElement(Object.values(CONFIRMATION_MODAL_TYPES));
      const props = { ...defaultProps, confirmationType };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.modalFooter)).toHaveAttribute(
        'confirmationType',
        JSON.stringify(confirmationType)
      );
    });

    it('has correct confirmButtonText prop', () => {
      const confirmButtonText = faker.random.alpha(10);
      const props = { ...defaultProps, confirmButtonText };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.modalFooter)).toHaveAttribute('confirmButtonText', confirmButtonText);
    });

    it('invokes onCancel when footer onCancel event is triggered', () => {
      // * ARRANGE
      const onCancel = jest.fn();
      const props = { ...defaultProps, onCancel };

      // * ACT
      render(getComponentToRender(props));
      expect(onCancel).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.footerOnCancel));

      // * ASSERT
      expect(onCancel).toHaveBeenCalledOnce();
    });

    it('invokes onConfirm when footer onConfirm event is triggered', () => {
      // * ARRANGE
      const onConfirm = jest.fn();
      const props = { ...defaultProps, onConfirm };

      // * ACT
      render(getComponentToRender(props));
      expect(onConfirm).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.footerOnConfirm));

      // * ASSERT
      expect(onConfirm).toHaveBeenCalledOnce();
    });
  });
});
