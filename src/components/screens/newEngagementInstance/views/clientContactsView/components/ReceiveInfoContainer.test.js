/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import faker from '@faker-js/faker';

import ReceiveInfoContainer from './ReceiveInfoContainer';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon'
};

const defaultProps = {
  receiveCustomerInvoice: faker.datatype.boolean(),
  receiveCustomerStatement: faker.datatype.boolean()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ReceiveInfoContainer {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, className, size, fixedWidth }) => {
    const props = { icon, className, size, fixedWidth };
    return <fake-font-awesome-icon {...props} data-testid={testIds.fontAwesomeIcon} />;
  }
}));

// **********************************************************************
// * unit tests

describe('ReceiveInfoContainer', () => {
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

  it.each([
    {
      receiveCustomerInvoice: true,
      icon: 'fa-solid fa-check',
      iconClass: 'text-success',
      receiveCustomerStatement: false
    },
    {
      receiveCustomerInvoice: false,
      icon: 'fa-solid fa-xmark',
      iconClass: 'text-danger',
      receiveCustomerStatement: false
    }
  ])(
    'renders the "Receive Customer Invoice" icon with the "$icon" icon and "$iconClass" className when receiveCustomerInvoice is $receiveCustomerInvoice',
    ({ receiveCustomerInvoice, receiveCustomerStatement }) => {
      const props = { ...defaultProps, receiveCustomerInvoice, receiveCustomerStatement };
      const tree = renderer.create(getComponentToRender(props)).toJSON();
      expect(tree).toMatchSnapshot();
    }
  );

  it.each([
    {
      receiveCustomerStatement: true,
      icon: 'fa-solid fa-check',
      iconClass: 'text-success',
      receiveCustomerInvoice: false
    },
    {
      receiveCustomerStatement: false,
      icon: 'fa-solid fa-xmark',
      iconClass: 'text-danger',
      receiveCustomerInvoice: false
    }
  ])(
    'renders the "Receive Customer Statement" icon with the "$icon" icon and "$iconClass" className when receiveCustomerStatement is $receiveCustomerStatement',
    ({ receiveCustomerStatement, receiveCustomerInvoice }) => {
      const props = { ...defaultProps, receiveCustomerStatement, receiveCustomerInvoice };
      const tree = renderer.create(getComponentToRender(props)).toJSON();
      expect(tree).toMatchSnapshot();
    }
  );
});
