import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import CONFIRMATION_MODAL_TYPES from '../../../../../helpers/enums/confirmationModalTypes';
import ModalFooter from './ModalFooter';

// **********************************************************************
// * constants

const defaultProps = {
  confirmationType: faker.helpers.arrayElement(Object.values(CONFIRMATION_MODAL_TYPES)),
  confirmButtonText: faker.random.alphaNumeric(10),
  onCancel: jest.fn(),
  onConfirm: jest.fn()
};

const getComponentToRender = (props) => {
  return <ModalFooter {...props} />;
};

// **********************************************************************
// * functions

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('ModalFooter', () => {
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

  describe('cancel button', () => {
    const buttonText = 'Cancel';

    it('is rendered', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByText(buttonText)).toBeInTheDocument();
    });

    it('invokes onCancel when clicked', () => {
      const onCancel = jest.fn();
      const props = { ...defaultProps, onCancel };
      render(getComponentToRender(props));
      expect(onCancel).not.toHaveBeenCalled();
      fireEvent.click(screen.getByText(buttonText));
      expect(onCancel).toHaveBeenCalledOnce();
    });
  });

  describe('confirm button', () => {
    const confirmButtonText = faker.random.alpha(10);
    let props = { ...defaultProps, confirmButtonText };

    it('is rendered', () => {
      render(getComponentToRender(props));
      expect(screen.getByText(confirmButtonText)).toBeInTheDocument();
    });

    it('invokes onConfirm when clicked', () => {
      const onConfirm = jest.fn();
      props = { ...props, onConfirm };
      render(getComponentToRender(props));
      expect(onConfirm).not.toHaveBeenCalled();
      fireEvent.click(screen.getByText(confirmButtonText));
      expect(onConfirm).toHaveBeenCalledOnce();
    });
  });
});
