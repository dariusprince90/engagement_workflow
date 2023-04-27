/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as appLayoutSlice from '../../common/appLayout/appLayoutSlice';
import ApplicationFault from './ApplicationFault';

// **********************************************************************
// * constants

const fakeApplicationFaultInfo = {
  faultMessage: faker.lorem.sentence(),
  faultError: {
    message: faker.lorem.sentence(),
    traceId: faker.datatype.uuid()
  }
};

const testIds = {
  applicationFaultMessage: 'application-fault-message',
  fontAwesomeIcon: 'font-awesome-icon'
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

jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: ({ icon, className }) => {
      return <fake-font-awesome-icon icon={icon} className={className} data-testid={testIds.fontAwesomeIcon} />;
    }
  };
});

jest.mock('../../common/appLayout/appLayoutSlice');

// **********************************************************************
// * unit tests

describe('ApplicationFault', () => {
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
    ReactDOM.render(<ApplicationFault showPmLogo={true} />, div);
  });

  it('renders logo when showPmLogo is true', () => {
    render(<ApplicationFault showPmLogo={true} />);
    expect(screen.getByAltText('Company logo')).toBeInTheDocument();
  });

  it('does not render logo when showPmLogo is false', () => {
    render(<ApplicationFault showPmLogo={false} />);
    expect(screen.queryByAltText('Company logo')).not.toBeInTheDocument();
  });

  it('uses the regular frown icon for the spinner', () => {
    render(<ApplicationFault showPmLogo={false} />);
    expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', 'far,frown');
  });

  it('renders applicationFaultMessage when it has a value', () => {
    render(<ApplicationFault showPmLogo={true} />);
    expect(screen.getByTestId(testIds.applicationFaultMessage)).toBeInTheDocument();
    expect(screen.getByText(fakeApplicationFaultInfo.faultMessage)).toBeInTheDocument();
  });

  it('does not render applicationFaultMessage when it has no value', () => {
    const applicationFaultInfo = { ...fakeApplicationFaultInfo, faultMessage: null };
    appLayoutSlice.selectApplicationFaultInfo.mockReturnValue(applicationFaultInfo);
    render(<ApplicationFault showPmLogo={true} />);
    expect(screen.queryByTestId(testIds.applicationFaultMessage)).not.toBeInTheDocument();
  });
});
