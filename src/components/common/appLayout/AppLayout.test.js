/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

import * as appLayoutSlice from './appLayoutSlice';
import AppLayout from './AppLayout';

// **********************************************************************
// * constants

const testIds = {
  header: 'header',
  appContent: 'app-content',
  sideBar: 'sideBar'
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

jest.mock('./appLayoutSlice');

jest.mock('../header/Header', () => {
  return {
    __esModule: true,
    default: () => {
      return <fake-header data-testid={testIds.header} />;
    }
  };
});

jest.mock('../appContent/AppContent', () => {
  return {
    __esModule: true,
    default: () => {
      return <fake-app-content data-testid={testIds.appContent} />;
    }
  };
});

jest.mock('../sideBar/SideBar', () => {
  return {
    __esModule: true,
    default: () => {
      return <fake-SideBar data-testid={testIds.sideBar} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('AppLayout', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppLayout />, div);
  });

  it('renders the correct layout', () => {
    const tree = renderer.create(<AppLayout />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the header', () => {
    render(<AppLayout />);
    expect(screen.getByTestId(testIds.header)).toBeInTheDocument();
  });

  it('renders the side bar when showSideBar is true', () => {
    appLayoutSlice.selectShowSideBar.mockReturnValue(true);
    render(<AppLayout />);
    expect(screen.getByTestId(testIds.sideBar)).toBeInTheDocument();
  });

  it('does not render the side bar when showSideBar is false', () => {
    appLayoutSlice.selectShowSideBar.mockReturnValue(false);
    render(<AppLayout />);
    expect(screen.queryByTestId(testIds.sideBar)).not.toBeInTheDocument();
  });

  it('renders the app content', () => {
    render(<AppLayout />);
    expect(screen.getByTestId(testIds.appContent)).toBeInTheDocument();
  });
});
