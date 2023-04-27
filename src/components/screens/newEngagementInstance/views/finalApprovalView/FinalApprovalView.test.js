import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../newEngagementInstanceSlice';
import FinalApprovalView from './FinalApprovalView';

// **********************************************************************
// * constants

const testIds = {
  finalApprovalSection: 'final-approval-section',
  predecessorInformationSection: 'predecessor-information-section'
};

const fakeNewEngagementInstance = {
  isNewClient: faker.datatype.boolean()
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <FinalApprovalView />;
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

jest.mock('../../newEngagementInstanceSlice', () => {
  return {
    selectNewEngagementInstance: jest.fn()
  };
});

jest.mock('./components/finalApprovalSection/FinalApprovalSection', () => ({
  __esModule: true,
  default: () => <fake-final-approval-section data-testid={testIds.finalApprovalSection} />
}));

jest.mock('./components/predecessorInformationSection/PredecessorInformationSection', () => ({
  __esModule: true,
  default: () => <fake-predecessor-information-section data-testid={testIds.predecessorInformationSection} />
}));

// **********************************************************************
// * unit tests

describe('FinalApprovalView', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(fakeNewEngagementInstance);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  it('renders Final Approval Section component', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.finalApprovalSection)).toBeInTheDocument();
  });

  it('renders Predecessor Information Section component when isNewClient is false', () => {
    newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
      ...fakeNewEngagementInstance,
      isNewClient: false
    });
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.predecessorInformationSection)).toBeInTheDocument();
  });

  it.each([{ isNewClient: true }, { isNewClient: null }])(
    'should not render Predecessor Information Section component when isNewClient is not false',
    ({ isNewClient }) => {
      newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
        ...fakeNewEngagementInstance,
        isNewClient
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.predecessorInformationSection)).not.toBeInTheDocument();
    }
  );
});
