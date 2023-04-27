import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import COMMENT_TYPES from '../../../../../helpers/enums/commentTypes';
import WorkflowCommentsModal from './WorkflowCommentsModal';

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
  footerOnSubmit: 'footer-on-Submit',
  footerOnCancel: 'footer-on-cancel'
};

const defaultProps = {
  isOpen: faker.datatype.boolean(),
  commentType: faker.helpers.arrayElement(Object.values(COMMENT_TYPES)),
  onCancel: jest.fn(),
  onSubmit: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <WorkflowCommentsModal {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('../../../../common/modals/Modal', () => ({
  __esModule: true,
  default: ({ modalClassName, title, isOpen, body, footer, onClose }) => {
    const props = { title, isOpen };
    return (
      <fake-modal {...props} modalClassName={JSON.stringify(modalClassName)} data-testid={testIds.modal}>
        <button data-testid={testIds.modalOnClose} onClick={onClose} />
        {body}
        {footer}
      </fake-modal>
    );
  }
}));

jest.mock('./ModalBody', () => ({
  __esModule: true,
  default: ({ commentType }) => (
    <fake-modal-body commentType={JSON.stringify(commentType)} data-testid={testIds.modalBody} />
  )
}));

jest.mock('./ModalFooter', () => ({
  __esModule: true,
  default: ({ commentType, onCancel, onSubmit }) => (
    <fake-modal-footer commentType={JSON.stringify(commentType)} data-testid={testIds.modalFooter}>
      <button data-testid={testIds.footerOnSubmit} onClick={onSubmit} />
      <button data-testid={testIds.footerOnCancel} onClick={onCancel} />
    </fake-modal-footer>
  )
}));

// **********************************************************************
// * unit tests

describe('WorkflowCommentsModal', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('modal', () => {
    it('has correct modalClassName prop', () => {
      const expectedModalClassName = { base: 'workflow-comments-modal' };
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.modal)).toHaveAttribute(
        'modalClassName',
        JSON.stringify(expectedModalClassName)
      );
    });

    it('has correct title prop', () => {
      const commentType = faker.helpers.arrayElement(Object.values(COMMENT_TYPES));
      const expectedTitle = commentType.modalTitle;
      const props = { ...defaultProps, commentType };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.modal)).toHaveAttribute('title', expectedTitle);
    });

    it('has correct isOpen prop', () => {
      const isOpen = faker.datatype.boolean();
      const props = { ...defaultProps, isOpen };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.modal)).toHaveAttribute('isOpen', isOpen.toString());
    });
  });

  describe('modal body', () => {
    it('has correct commentType prop', () => {
      const commentType = faker.helpers.arrayElement(Object.values(COMMENT_TYPES));
      const prop = { ...defaultProps, commentType };
      render(getComponentToRender(prop));
      expect(screen.getByTestId(testIds.modalBody)).toHaveAttribute('commentType', JSON.stringify(commentType));
    });
  });

  describe('modal footer', () => {
    it('has correct commentType prop', () => {
      const commentType = faker.helpers.arrayElement(Object.values(COMMENT_TYPES));
      const props = { ...defaultProps, commentType: commentType };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.modalFooter)).toHaveAttribute('commentType', JSON.stringify(commentType));
    });

    it('invokes onCancel when footer onCancel is triggered', () => {
      render(getComponentToRender(defaultProps));
      expect(defaultProps.onCancel).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.footerOnCancel));
      expect(defaultProps.onCancel).toHaveBeenCalledOnce();
    });

    it('invokes onSubmit when footer onSubmit is triggered', () => {
      render(getComponentToRender(defaultProps));
      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.footerOnSubmit));
      expect(defaultProps.onSubmit).toHaveBeenCalledOnce();
    });
  });
});
