import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';

import * as appLayoutSlice from '../appLayout/appLayoutSlice';
import PageOverlay from './PageOverlay';

// **********************************************************************
// * constants

const testIds = {
  applicationFault: 'application-fault',
  appLoader: 'app-loader',
  pageOverlay: 'page-overlay'
};

const getComponentToRender = (updatedProps) => {
  const defaultProps = {
    isTransparent: false,
    isAppLoader: false
  };

  const props = { ...defaultProps, ...updatedProps };

  return <PageOverlay {...props} />;
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

jest.mock('../appLayout/appLayoutSlice');

jest.mock('../appLoader/AppLoader', () => {
  return {
    __esModule: true,
    default: () => {
      return <fake-app-loader data-testid={testIds.appLoader} />;
    }
  };
});

jest.mock('../applicationFault/ApplicationFault', () => {
  return {
    __esModule: true,
    default: () => {
      return <fake-application-fault data-testid={testIds.applicationFault} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('PageOverlay', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    appLayoutSlice.selectApplicationFaultInfo.mockReturnValue({ hasFault: false });
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  it('renders without transparent css class when isTransparent is false', () => {
    render(getComponentToRender({ isTransparent: false }));
    expect(screen.queryByTestId(testIds.pageOverlay).classList.contains('transparent')).toBeFalsy();
  });

  it('renders with transparent css class when isTransparent is true', () => {
    render(getComponentToRender({ isTransparent: true }));
    expect(screen.getByTestId(testIds.pageOverlay).classList.contains('transparent')).toBeTruthy();
  });

  it('renders AppLoader when hasApplicationFault is false & isAppLoader is true', () => {
    render(getComponentToRender({ isAppLoader: true }));
    expect(screen.getByTestId(testIds.appLoader)).toBeInTheDocument();
  });

  it('does not render AppLoader when hasApplicationFault is false & isAppLoader is false', () => {
    render(getComponentToRender({ isAppLoader: false }));
    expect(screen.queryByTestId(testIds.appLoader)).not.toBeInTheDocument();
  });

  it('does not render AppLoader when hasApplicationFault is true && isAppLoader is true', () => {
    appLayoutSlice.selectApplicationFaultInfo.mockReturnValue({ hasFault: true });
    render(getComponentToRender({ isAppLoader: true }));
    expect(screen.queryByTestId(testIds.appLoader)).not.toBeInTheDocument();
  });

  it('does not render AppLoader when hasApplicationFault is true && isAppLoader is false', () => {
    appLayoutSlice.selectApplicationFaultInfo.mockReturnValue({ hasFault: true });
    render(getComponentToRender({ isAppLoader: false }));
    expect(screen.queryByTestId(testIds.appLoader)).not.toBeInTheDocument();
  });

  it('renders ApplicationFault when hasApplicationFault is true', () => {
    appLayoutSlice.selectApplicationFaultInfo.mockReturnValue({ hasFault: true });
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.applicationFault)).toBeInTheDocument();
  });

  it('does not render ApplicationFault when hasApplicationFault is false', () => {
    render(getComponentToRender());
    expect(screen.queryByTestId(testIds.applicationFault)).not.toBeInTheDocument();
  });
});
