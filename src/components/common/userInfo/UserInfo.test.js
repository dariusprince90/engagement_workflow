import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as staffSlice from '../../../app/staffSlice';
import UserInfo from './UserInfo';

// **********************************************************************
// * constants

const userAuthInfo = {
  userName: faker.internet.userName(),
  displayName: `${faker.name.firstName()} ${faker.name.lastName()}`
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

jest.mock('../../../app/staffSlice', () => {
  return {
    selectUserAuthInfo: jest.fn()
  };
});

// **********************************************************************
// * unit tests

describe('UserInfo', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    staffSlice.selectUserAuthInfo.mockReturnValue(userAuthInfo);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('rendering', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<UserInfo />, div);
    });

    it('renders the userName when userName has a value', () => {
      render(<UserInfo />);
      expect(screen.getByText(userAuthInfo.userName)).toBeInTheDocument();
    });

    it('does not render the userName when userName does not have a value', () => {
      const localUserAuthInfo = { ...userAuthInfo, userName: null };
      staffSlice.selectUserAuthInfo.mockReturnValue(localUserAuthInfo);
      render(<UserInfo />);
      expect(screen.queryByText(userAuthInfo.userName)).not.toBeInTheDocument();
    });

    it('renders the displayName when displayName has a value', () => {
      render(<UserInfo />);
      expect(screen.getByText(userAuthInfo.displayName)).toBeInTheDocument();
    });

    it('does not render the displayName when displayName does not have a value', () => {
      const localUserAuthInfo = { ...userAuthInfo, displayName: null };
      staffSlice.selectUserAuthInfo.mockReturnValue(localUserAuthInfo);
      render(<UserInfo />);
      expect(screen.queryByText(userAuthInfo.displayName)).not.toBeInTheDocument();
    });
  });
});
