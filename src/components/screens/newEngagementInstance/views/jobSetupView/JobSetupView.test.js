import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as newEngagementInstanceSlice from '../../newEngagementInstanceSlice';

import JobSetupView from './JobSetupView';

// **********************************************************************
// * constants

const testIds = {
  viewNavigator: 'view-navigator',
  jobSetupSection: 'job-setup-section',
  jobRolesSection: 'job-roles-section',
  billingScheduleSection: 'billing-schedule-section'
};

const fakeJobSetupView = {
  sections: {
    jobSetup: { id: faker.random.alpha(10), title: faker.random.alpha(10) },
    jobRoles: { id: faker.random.alpha(10), title: faker.random.alpha(10) },
    billingSchedule: { id: faker.random.alpha(10), title: faker.random.alpha(10) }
  }
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <JobSetupView />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => ({
  useSelector: (callback) => callback()
}));

jest.mock('../../newEngagementInstanceSlice', () => ({
  selectCurrentView: jest.fn()
}));

jest.mock('../../components/viewNavigator/ViewNavigator', () => ({
  __esModule: true,
  default: ({ viewSections }) => {
    return <fake-view-navigator viewSections={JSON.stringify(viewSections)} data-testid={testIds.viewNavigator} />;
  }
}));

jest.mock('./components/JobSetupSection', () => ({
  __esModule: true,
  default: ({ id, title }) => {
    const props = { id, title };
    return <fake-job-setup-section {...props} data-testid={testIds.jobSetupSection} />;
  }
}));

jest.mock('./components/JobRolesSection', () => ({
  __esModule: true,
  default: ({ id, title }) => {
    const props = { id, title };
    return <fake-job-roles-section {...props} data-testid={testIds.jobRolesSection} />;
  }
}));

jest.mock('./components/billingSchedule/BillingScheduleSection', () => ({
  __esModule: true,
  default: ({ id, title }) => {
    const props = { id, title };
    return <fake-billing-schedule-section {...props} data-testid={testIds.billingScheduleSection} />;
  }
}));

// **********************************************************************
// * unit tests

describe('JobSetupView', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeJobSetupView);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  describe('ViewNavigator', () => {
    it('is rendered', () => {
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.viewNavigator)).toBeInTheDocument();
    });

    it('has correct viewSections prop', () => {
      const expectedProps = Object.values(fakeJobSetupView.sections);
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.viewNavigator)).toHaveAttribute('viewSections', JSON.stringify(expectedProps));
    });
  });

  describe('JobSetupSection', () => {
    it('is rendered', () => {
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.jobSetupSection)).toBeInTheDocument();
    });

    it('has correct id prop', () => {
      const expected = fakeJobSetupView.sections.jobSetup.id;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.jobSetupSection)).toHaveAttribute('id', expected);
    });

    it('has correct title prop', () => {
      const expected = fakeJobSetupView.sections.jobSetup.title;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.jobSetupSection)).toHaveAttribute('title', expected);
    });
  });

  describe('JobRolesSection', () => {
    it('is rendered', () => {
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.jobRolesSection)).toBeInTheDocument();
    });

    it('has correct id prop', () => {
      const expected = fakeJobSetupView.sections.jobRoles.id;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.jobRolesSection)).toHaveAttribute('id', expected);
    });

    it('has correct title prop', () => {
      const expected = fakeJobSetupView.sections.jobRoles.title;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.jobRolesSection)).toHaveAttribute('title', expected);
    });
  });

  describe('BillingScheduleSection', () => {
    it('is rendered', () => {
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.billingScheduleSection)).toBeInTheDocument();
    });

    it('has correct id prop', () => {
      const expected = fakeJobSetupView.sections.billingSchedule.id;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.billingScheduleSection)).toHaveAttribute('id', expected);
    });

    it('has correct title prop', () => {
      const expected = fakeJobSetupView.sections.billingSchedule.title;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.billingScheduleSection)).toHaveAttribute('title', expected);
    });
  });
});
