/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import CONFIRMATION_MODAL_TYPES from '../../../../../helpers/enums/confirmationModalTypes';
import ModalBody from './ModalBody';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon'
};

const defaultProps = {
  confirmationType: faker.helpers.arrayElement(Object.values(CONFIRMATION_MODAL_TYPES)),
  message: faker.random.alphaNumeric(10)
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ModalBody {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: ({ icon, size, className }) => {
      const props = { icon, size, className };
      return <fake-font-awesome-icon {...props} data-testid={testIds.fontAwesomeIcon} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('ModalBody', () => {
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

  describe('FontAwesomeIcon', () => {
    it('is rendered', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toBeInTheDocument();
    });

    it('has the correct icon', () => {
      const confirmationType = faker.helpers.arrayElement(Object.values(CONFIRMATION_MODAL_TYPES));
      const expectedIcon = confirmationType.icon;
      const props = { ...defaultProps, confirmationType };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', expectedIcon);
    });

    it('has the correct size', () => {
      const expectedSize = '2x';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('size', expectedSize);
    });

    it('has the correct className', () => {
      const confirmationType = faker.helpers.arrayElement(Object.values(CONFIRMATION_MODAL_TYPES));
      const expectedClassName = `text-${confirmationType.contextClass}`;
      const props = { ...defaultProps, confirmationType };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('className', expectedClassName);
    });
  });

  describe('confirmation message', () => {
    it('is rendered', () => {
      const message = faker.random.alpha(10);
      const props = { ...defaultProps, message };
      render(getComponentToRender(props));
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });
});
