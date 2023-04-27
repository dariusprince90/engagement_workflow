import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import COMMENT_TYPES from '../../../../../helpers/enums/commentTypes';
import ModalFooter from './ModalFooter';

// **********************************************************************
// * constants

const defaultProps = {
  commentType: faker.helpers.arrayElement(Object.values(COMMENT_TYPES)),
  onCancel: jest.fn(),
  onSubmit: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ModalFooter {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('ModalFooter', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('submit button', () => {
    it('has correct text', () => {
      const commentType = faker.helpers.arrayElement(Object.values(COMMENT_TYPES));
      const props = { ...defaultProps, commentType };
      const expectedButtonText = commentType.submitButtonText;
      render(getComponentToRender(props));
      expect(screen.getByText(expectedButtonText)).toBeInTheDocument();
    });

    describe('functional', () => {
      it('invokes onSubmit when clicked', () => {
        const commentType = faker.helpers.arrayElement(Object.values(COMMENT_TYPES));
        const props = { ...defaultProps, commentType };
        const buttonText = commentType.submitButtonText;
        render(getComponentToRender(props));
        expect(defaultProps.onSubmit).not.toHaveBeenCalled();
        fireEvent.click(screen.getByRole('button', { name: buttonText }));
        expect(defaultProps.onSubmit).toHaveBeenCalledOnce();
      });
    });
  });

  describe('cancel button', () => {
    it('has correct text', () => {
      const expectedButtonText = 'Cancel';
      render(getComponentToRender(defaultProps));
      expect(screen.getByText(expectedButtonText)).toBeInTheDocument();
    });

    describe('functional', () => {
      it('invokes onSubmit when clicked', () => {
        render(getComponentToRender(defaultProps));
        expect(defaultProps.onCancel).not.toHaveBeenCalled();
        fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
        expect(defaultProps.onCancel).toHaveBeenCalledOnce();
      });
    });
  });
});
