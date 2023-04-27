/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import Card from './Card';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon'
};

const defaultProps = {
  clientContactAddress: {
    id: faker.datatype.number(),
    contactInfoResponseId: faker.datatype.number(),
    address1: faker.random.alphaNumeric(10),
    address2: faker.random.alphaNumeric(10),
    city: faker.random.alphaNumeric(10),
    postalCode: faker.random.alphaNumeric(10),
    countryHierarchyId: faker.datatype.number(),
    isPrimary: faker.datatype.boolean()
  },
  onEdit: jest.fn(),
  onDelete: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <Card {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, className, size, title, onClick }) => {
    const props = { icon, className, size, title, onClick };
    return <fake-font-awesome-icon {...props} data-testid={testIds.fontAwesomeIcon} />;
  }
}));

// **********************************************************************
// * unit tests

describe('Card', function () {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('rendering', () => {
    it('should render without crashing', function () {
      const div = document.createElement('div');
      ReactDOM.render(getComponentToRender(defaultProps), div);
    });

    it('has the PRIMARY ADDRESS text when isPrimary is true', () => {
      const isPrimary = true;
      const props = { ...defaultProps, clientContactAddress: { ...defaultProps.clientContactAddress, isPrimary } };
      const expectedText = 'PRIMARY ADDRESS';
      render(getComponentToRender(props));
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });

    it('does not have the PRIMARY ADDRESS text when isPrimary is false', () => {
      const isPrimary = false;
      const props = { ...defaultProps, clientContactAddress: { ...defaultProps.clientContactAddress, isPrimary } };
      const expectedText = 'PRIMARY ADDRESS';
      render(getComponentToRender(props));
      expect(screen.queryByText(expectedText)).not.toBeInTheDocument();
    });

    it('has correct edit icon', () => {
      render(getComponentToRender(defaultProps));
      const expectedTitle = 'Edit Address';
      const expectedIcon = 'fa-solid fa-pen-to-square';
      const icons = screen.getAllByTestId(testIds.fontAwesomeIcon);
      const editIcon = icons.find((fa) => fa.attributes.getNamedItem('title').value === expectedTitle);
      expect(editIcon).not.toBeNull();
      expect(editIcon).toHaveAttribute('icon', expectedIcon);
    });

    it('renders address line 1', () => {
      const address1 = faker.random.alphaNumeric(10);
      const expectedAddress = address1;
      const props = {
        ...defaultProps,
        clientContactAddress: { ...defaultProps.clientContactAddress, address1 }
      };
      render(getComponentToRender(props));
      expect(screen.getByText(expectedAddress)).toBeInTheDocument();
    });

    it('renders address line 2', () => {
      const address2 = faker.random.alphaNumeric(10);
      const expectedAddress = address2;
      const props = {
        ...defaultProps,
        clientContactAddress: { ...defaultProps.clientContactAddress, address1: address2 }
      };
      render(getComponentToRender(props));
      expect(screen.getByText(expectedAddress)).toBeInTheDocument();
    });

    it('renders city, state, and postal code', () => {
      const city = faker.random.alphaNumeric(10);
      const stateName = 'MI';
      const postalCode = faker.random.alphaNumeric(10);
      const expected = `${city}, ${stateName} ${postalCode}`;
      const props = {
        ...defaultProps,
        clientContactAddress: { ...defaultProps.clientContactAddress, city, postalCode }
      };
      render(getComponentToRender(props));
      expect(screen.getByText(expected)).toBeInTheDocument();
    });

    it('renders correct country', () => {
      const expectedCountry = 'United States';
      render(getComponentToRender(defaultProps));
      expect(screen.getByText(expectedCountry)).toBeInTheDocument();
    });
  });

  describe('functional', () => {
    it('invokes onEdit when the edit icon is clicked', () => {
      const iconTitle = 'Edit Address';
      render(getComponentToRender(defaultProps));
      expect(defaultProps.onEdit).not.toHaveBeenCalled();
      const icons = screen.getAllByTestId(testIds.fontAwesomeIcon);
      const editIcon = icons.find((fa) => fa.attributes.getNamedItem('title').value === iconTitle);
      fireEvent.click(editIcon);
      expect(defaultProps.onEdit).toHaveBeenCalledTimes(1);
    });

    it('invokes onDelete when the delete icon is clicked', () => {
      const iconTitle = 'Delete Address';
      render(getComponentToRender(defaultProps));
      expect(defaultProps.onDelete).not.toHaveBeenCalled();
      const icons = screen.getAllByTestId(testIds.fontAwesomeIcon);
      const deleteIcon = icons.find((fa) => fa.attributes.getNamedItem('title').value === iconTitle);
      fireEvent.click(deleteIcon);
      expect(defaultProps.onDelete).toHaveBeenCalledTimes(1);
    });
  });
});
