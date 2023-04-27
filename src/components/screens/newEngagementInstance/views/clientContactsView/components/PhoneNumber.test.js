import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import PhoneNumber from './PhoneNumber';

// **********************************************************************
// * constants

const defaultProps = {
  clientContactPhoneNumber: {
    internationalPhoneCode: faker.datatype.number(),
    phoneNumber: faker.random.alphaNumeric(10),
    phoneDeviceTypeName: faker.random.alphaNumeric(10),
    isPrimary: faker.datatype.boolean()
  }
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <PhoneNumber {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('PhoneNumber', () => {
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

  it('renders correct phone number', () => {
    const clientContactPhoneNumber = { ...defaultProps.clientContactPhoneNumber };
    const props = { clientContactPhoneNumber };
    const { phoneDeviceTypeName, internationalPhoneCode, phoneNumber } = clientContactPhoneNumber;
    const expected = `${phoneDeviceTypeName}: +${internationalPhoneCode} ${phoneNumber}`;
    render(getComponentToRender(props));
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('renders the primary marker when isPrimary is true', () => {
    const isPrimary = true;
    const clientContactPhoneNumber = { ...defaultProps.clientContactPhoneNumber, isPrimary };
    const props = { clientContactPhoneNumber };
    const expected = '(primary)';
    render(getComponentToRender(props));
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('does not render the primary marker when isPrimary is false', () => {
    const isPrimary = false;
    const clientContactPhoneNumber = { ...defaultProps.clientContactPhoneNumber, isPrimary };
    const props = { clientContactPhoneNumber };
    const expected = '(primary)';
    render(getComponentToRender(props));
    expect(screen.queryByText(expected)).not.toBeInTheDocument();
  });
});
