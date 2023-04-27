import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../newEngagementInstanceSlice';
import EngagementInformationView from './EngagementInformationView';

// **********************************************************************
// * constants

const testIds = {
  engagementInformationAttestSection: 'engagement-information-attest-section',
  engagementInformationNonAttestSection: 'engagement-information-non-attest-section'
};

const fakeNewEngagementInstance = {
  isAttest: faker.datatype.boolean()
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <EngagementInformationView />;
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

jest.mock('./components/engagementInformationAttestSection/EngagementInformationAttestSection', () => ({
  __esModule: true,
  default: () => <fake-billing-address-section data-testid={testIds.engagementInformationAttestSection} />
}));

jest.mock('./components/engagementInformationNonAttestSection/EngagementInformationNonAttestSection', () => ({
  __esModule: true,
  default: () => <fake-key-client-personnel-section data-testid={testIds.engagementInformationNonAttestSection} />
}));

// **********************************************************************
// * unit tests

describe('EngagementInformationView', () => {
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

  describe('EngagementInformationAttestSection', () => {
    it('does not render when isAttest false', () => {
      newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
        ...fakeNewEngagementInstance,
        isAttest: false
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.engagementInformationAttestSection)).not.toBeInTheDocument();
    });

    it('renders when isAttest true', () => {
      newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
        ...fakeNewEngagementInstance,
        isAttest: true
      });
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.engagementInformationAttestSection)).toBeInTheDocument();
    });
  });

  describe('EngagementInformationNonAttestSection', () => {
    it('does not render when isAttest equals to true', () => {
      newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
        ...fakeNewEngagementInstance,
        isAttest: true
      });
      render(getComponentToRender());
      expect(screen.queryByTestId(testIds.engagementInformationNonAttestSection)).not.toBeInTheDocument();
    });

    it('renders when isAttest equals to false', () => {
      newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue({
        ...fakeNewEngagementInstance,
        isAttest: false
      });
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.engagementInformationNonAttestSection)).toBeInTheDocument();
    });
  });
});
