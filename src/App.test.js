import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import * as appLayoutSlice from './components/common/appLayout/appLayoutSlice';
import App from './App';

// **********************************************************************
// * constants

const fakeApplicationFaultInfo = { hasFault: false };

const testIds = {
  appLayout: 'app-layout',
  appVersionController: 'app-version-controller',
  pageNotFound: 'page-not-found',
  pageOverlay: 'page-overlay',
  toastContainer: 'toast-container',
  userInfo: 'user-info'
};

const getComponentToRender = (route = '/') => {
  return (
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
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

jest.mock('react-toastify', () => {
  return {
    __esModule: true,
    ToastContainer: () => {
      return <fake-toast-container data-testid={testIds.toastContainer} />;
    }
  };
});

jest.mock('./components/common/appLayout/appLayoutSlice');

jest.mock('./configs/toastConfig', () => {
  return {
    toastConfig: {}
  };
});

jest.mock('./components/common/appVersionController/AppVersionController', () => {
  return {
    __esModule: true,
    default: () => {
      return <fake-app-version-controller data-testid={testIds.appVersionController} />;
    }
  };
});

jest.mock('./components/common/404/404', () => {
  return {
    __esModule: true,
    default: () => {
      return <fake-404-component data-testid={testIds.pageNotFound} />;
    }
  };
});

jest.mock('./components/common/appLayout/AppLayout', () => {
  return {
    __esModule: true,
    default: () => {
      return <fake-app-layout-component data-testid={testIds.appLayout} />;
    }
  };
});

jest.mock('./components/common/userInfo/UserInfo', () => {
  return {
    __esModule: true,
    default: () => {
      return <fake-user-info-component data-testid={testIds.userInfo} />;
    }
  };
});

jest.mock('./components/common/pageOverlay/PageOverlay', () => {
  return {
    __esModule: true,
    default: () => {
      return <fake-page-overlay-component data-testid={testIds.pageOverlay} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('App', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    appLayoutSlice.selectApplicationFaultInfo.mockReturnValue(fakeApplicationFaultInfo);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  it('renders app version controller', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.appVersionController)).toBeInTheDocument();
  });

  it('renders app layout component when the route is not /404', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.appLayout)).toBeInTheDocument();
  });

  it('does not render 404 component when the route is not /404', () => {
    render(getComponentToRender());
    expect(screen.queryByTestId(testIds.pageNotFound)).not.toBeInTheDocument();
  });

  it('renders 404 component when the route is /404', () => {
    const route = '/404';
    render(getComponentToRender(route));
    expect(screen.getByTestId(testIds.pageNotFound)).toBeInTheDocument();
  });

  it('does not render app layout component when the route is  /404', () => {
    const route = '/404';
    render(getComponentToRender(route));
    expect(screen.queryByTestId(testIds.appLayout)).not.toBeInTheDocument();
  });

  it('does not render page overlay component when hasApplicationFault is false', () => {
    const applicationFaultInfo = { hasFault: false };
    appLayoutSlice.selectApplicationFaultInfo.mockReturnValue(applicationFaultInfo);
    render(getComponentToRender());
    expect(screen.queryByTestId(testIds.pageOverlay)).not.toBeInTheDocument();
  });

  it('renders page overlay component when hasApplicationFault is true', () => {
    const applicationFaultInfo = { hasFault: true };
    appLayoutSlice.selectApplicationFaultInfo.mockReturnValue(applicationFaultInfo);
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.pageOverlay)).toBeInTheDocument();
  });
});
