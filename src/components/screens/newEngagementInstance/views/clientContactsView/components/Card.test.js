/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../../newEngagementInstanceSlice';
import Card from './Card';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon',
  phoneNumber: 'phone-number',
  receiveInfoContainer: 'receive-info-container'
};

const defaultProps = {
  clientContact: {
    id: faker.datatype.number(),
    prefixId: faker.datatype.number(),
    firstName: faker.random.alphaNumeric(10),
    lastName: faker.random.alphaNumeric(10),
    suffixId: faker.datatype.number(),
    emailAddress: faker.random.alphaNumeric(10),
    receiveCustomerInvoice: faker.datatype.boolean(),
    receiveCustomerStatement: faker.datatype.boolean(),
    isPrimary: faker.datatype.boolean(),
    clientContactPhoneNumbers: faker.datatype.array()
  },
  onEdit: jest.fn(),
  onDelete: jest.fn()
};

const fakeLookups = {
  prefixes: {
    data: [
      {
        id: faker.datatype.number(),
        referenceId: faker.random.alphaNumeric(10),
        displayName: faker.random.alphaNumeric(10),
        isActive: faker.datatype.boolean()
      }
    ],
    isLoading: faker.datatype.boolean(),
    loadingText: faker.random.alphaNumeric(10),
    error: null
  },
  suffixes: {
    data: [
      {
        id: faker.datatype.number(),
        referenceId: faker.random.alphaNumeric(10),
        displayName: faker.random.alphaNumeric(10),
        isActive: faker.datatype.boolean()
      }
    ],
    isLoading: faker.datatype.boolean(),
    loadingText: faker.random.alphaNumeric(10),
    error: null
  }
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <Card {...props} />;
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

jest.mock('../../../newEngagementInstanceSlice', () => {
  return {
    selectLookups: jest.fn()
  };
});

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, className, size, title, onClick }) => {
    const props = { icon, className, size, title, onClick };
    return <fake-font-awesome-icon {...props} data-testid={testIds.fontAwesomeIcon} />;
  }
}));

jest.mock('./PhoneNumber', () => ({
  __esModule: true,
  default: ({ clientContactPhoneNumber }) => (
    <fake-phone-number
      clientContactPhoneNumber={JSON.stringify(clientContactPhoneNumber)}
      data-testid={testIds.phoneNumber}
    />
  )
}));

jest.mock('./ReceiveInfoContainer', () => ({
  __esModule: true,
  default: ({ receiveCustomerInvoice, receiveCustomerStatement }) => {
    const props = { receiveCustomerInvoice, receiveCustomerStatement };
    return <fake-receive-info-container {...props} data-testid={testIds.receiveInfoContainer} />;
  }
}));

// **********************************************************************
// * unit tests

describe('Card', function () {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectLookups.mockReturnValue(fakeLookups);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('rendering', () => {
    it('should render without crashing', function () {
      const div = document.createElement('div');
      ReactDOM.render(getComponentToRender(defaultProps), div);
    });

    it('has the PRIMARY CONTACT text when isPrimary is true', () => {
      const isPrimary = true;
      const props = { ...defaultProps, clientContact: { ...defaultProps.clientContact, isPrimary } };
      const expectedText = 'PRIMARY CONTACT';
      render(getComponentToRender(props));
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });

    it('does not have the PRIMARY CONTACT text when isPrimary is false', () => {
      const isPrimary = false;
      const props = { ...defaultProps, clientContact: { ...defaultProps.clientContact, isPrimary } };
      const expectedText = 'PRIMARY CONTACT';
      render(getComponentToRender(props));
      expect(screen.queryByText(expectedText)).not.toBeInTheDocument();
    });

    it('has correct edit icon', () => {
      render(getComponentToRender(defaultProps));
      const expectedTitle = 'Edit Contact';
      const expectedIcon = 'fa-solid fa-pen-to-square';
      const icons = screen.getAllByTestId(testIds.fontAwesomeIcon);
      const editIcon = icons.find((fa) => fa.attributes.getNamedItem('title').value === expectedTitle);
      expect(editIcon).not.toBeNull();
      expect(editIcon).toHaveAttribute('icon', expectedIcon);
    });

    it.each([
      { prefixId: null, firstName: faker.random.alpha(10), lastName: faker.random.alpha(10), suffixId: null },
      {
        prefixId: faker.datatype.number(),
        firstName: faker.random.alpha(10),
        lastName: faker.random.alpha(10),
        suffixId: faker.datatype.number()
      },
      {
        prefixId: null,
        firstName: faker.random.alpha(10),
        lastName: faker.random.alpha(10),
        suffixId: faker.datatype.number()
      },
      {
        prefixId: faker.datatype.number(),
        firstName: faker.random.alpha(10),
        lastName: faker.random.alpha(10),
        suffixId: null
      }
    ])('renders the correct contact name', ({ prefixId, firstName, lastName, suffixId }) => {
      // * ARRANGE
      const prefixes = {
        data: [
          {
            id: prefixId,
            referenceId: faker.random.alphaNumeric(10),
            displayName: faker.random.alphaNumeric(10),
            isActive: faker.datatype.boolean()
          }
        ]
      };
      const suffixes = {
        data: [
          {
            id: suffixId,
            referenceId: faker.random.alphaNumeric(10),
            displayName: faker.random.alphaNumeric(10),
            isActive: faker.datatype.boolean()
          }
        ],
        isLoading: faker.datatype.boolean(),
        loadingText: faker.random.alphaNumeric(10),
        error: null
      };

      const prefixName = prefixes.data[0]?.displayName.toString();
      const suffixName = suffixes.data[0]?.displayName.toString();
      const expectedClientName = [prefixName, firstName, lastName, suffixName].join(' ').trim();

      const props = {
        ...defaultProps,
        clientContact: { ...defaultProps.clientContact, prefixId, firstName, lastName, suffixId }
      };
      newEngagementInstanceSlice.selectLookups.mockReturnValue({
        ...fakeLookups,
        prefixes: { ...fakeLookups.prefixes, data: prefixes.data },
        suffixes: { ...fakeLookups.suffixes, data: suffixes.data }
      });

      // * ACT
      render(getComponentToRender(props));

      // * ASSERT
      expect(screen.getByText(expectedClientName)).toBeInTheDocument();
    });

    it('renders correct email address', () => {
      const emailAddress = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, clientContact: { ...defaultProps.clientContact, emailAddress } };
      render(getComponentToRender(props));
      expect(screen.getByText(emailAddress)).toBeInTheDocument();
    });

    describe('PhoneNumber components', () => {
      let itemCount;
      let clientContactPhoneNumbers;

      beforeEach(() => {
        itemCount = faker.datatype.number({ min: 1, max: 20 });
        clientContactPhoneNumbers = [...Array(itemCount).keys()].map(() => ({
          internationalPhoneCode: faker.datatype.number(),
          phoneNumber: faker.random.alphaNumeric(10),
          phoneDeviceTypeName: faker.random.alphaNumeric(10),
          isPrimary: faker.datatype.boolean()
        }));
      });

      it('renders one for each clientContactPhoneNumber', () => {
        const props = { ...defaultProps, clientContact: { ...defaultProps.clientContact, clientContactPhoneNumbers } };
        render(getComponentToRender(props));
        const phoneNumbers = screen.getAllByTestId(testIds.phoneNumber);
        expect(phoneNumbers).toHaveLength(itemCount);
      });

      it('has correct clientContactPhoneNumber prop on each PhoneNumber', () => {
        const props = { ...defaultProps, clientContact: { ...defaultProps.clientContact, clientContactPhoneNumbers } };
        render(getComponentToRender(props));
        const phoneNumbers = screen.getAllByTestId(testIds.phoneNumber);
        for (let i = 0; i < clientContactPhoneNumbers.length; i++) {
          const expected = clientContactPhoneNumbers[i];
          expect(phoneNumbers[i]).toHaveAttribute('clientContactPhoneNumber', JSON.stringify(expected));
        }
      });
    });

    describe('ReceiveInfoContainer', () => {
      it('has correct receiveCustomerInvoice prop', () => {
        const receiveCustomerInvoice = faker.datatype.boolean();
        const props = { ...defaultProps, clientContact: { ...defaultProps.clientContact, receiveCustomerInvoice } };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.receiveInfoContainer)).toHaveAttribute(
          'receiveCustomerInvoice',
          receiveCustomerInvoice.toString()
        );
      });

      it('has correct receiveCustomerStatement prop', () => {
        const receiveCustomerStatement = faker.datatype.boolean();
        const props = { ...defaultProps, clientContact: { ...defaultProps.clientContact, receiveCustomerStatement } };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.receiveInfoContainer)).toHaveAttribute(
          'receiveCustomerStatement',
          receiveCustomerStatement.toString()
        );
      });

      it('has correct delete icon', () => {
        render(getComponentToRender(defaultProps));
        const expectedTitle = 'Delete Contact';
        const expectedIcon = 'fa-solid fa-circle-x';
        const icons = screen.getAllByTestId(testIds.fontAwesomeIcon);
        const editIcon = icons.find((fa) => fa.attributes.getNamedItem('title').value === expectedTitle);
        expect(editIcon).not.toBeNull();
        expect(editIcon).toHaveAttribute('icon', expectedIcon);
      });
    });
  });

  describe('functional', () => {
    it('invokes onEdit when the edit icon is clicked', () => {
      const iconTitle = 'Edit Contact';
      render(getComponentToRender(defaultProps));
      expect(defaultProps.onEdit).not.toHaveBeenCalled();
      const icons = screen.getAllByTestId(testIds.fontAwesomeIcon);
      const editIcon = icons.find((fa) => fa.attributes.getNamedItem('title').value === iconTitle);
      fireEvent.click(editIcon);
      expect(defaultProps.onEdit).toHaveBeenCalledTimes(1);
    });

    it('invokes onDelete when the delete icon is clicked', () => {
      const iconTitle = 'Delete Contact';
      render(getComponentToRender(defaultProps));
      expect(defaultProps.onDelete).not.toHaveBeenCalled();
      const icons = screen.getAllByTestId(testIds.fontAwesomeIcon);
      const deleteIcon = icons.find((fa) => fa.attributes.getNamedItem('title').value === iconTitle);
      fireEvent.click(deleteIcon);
      expect(defaultProps.onDelete).toHaveBeenCalledTimes(1);
    });
  });
});
