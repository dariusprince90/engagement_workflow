import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';
import { MemoryRouter } from 'react-router-dom';

import AppContent from './AppContent';

// **********************************************************************
// * constants

const testIds = {
  newEngagementInstanceScreen: 'new-engagement-instance-screen',
  pageNotFound: 'page-not-found'
};

const getComponentToRender = (route = '/') => {
  return (
    <MemoryRouter initialEntries={[route]}>
      <AppContent />
    </MemoryRouter>
  );
};

// **********************************************************************
// * mock external dependencies

jest.mock('../404/404', () => {
  return {
    __esModule: true,
    default: () => {
      return <fake-404-component data-testid={testIds.pageNotFound} />;
    }
  };
});

jest.mock('../../screens/newEngagementInstance/NewEngagementInstanceScreen', () => {
  return {
    __esModule: true,
    default: () => {
      return <fake-new-engagement-instance-screen data-testid={testIds.newEngagementInstanceScreen} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('AppContent', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  it('renders NewEngagementInstanceScreen component for the root route', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.newEngagementInstanceScreen)).toBeInTheDocument();
  });

  it('renders NewEngagementInstanceScreen component for the root route with the newEngagementInstanceId param', () => {
    const newEngagementInstanceId = faker.datatype.number();
    const route = `/${newEngagementInstanceId}`;
    render(getComponentToRender(route));
    expect(screen.getByTestId(testIds.newEngagementInstanceScreen)).toBeInTheDocument();
  });

  it('renders 404 component for any non-matching route', () => {
    const route = `/${faker.lorem.slug()}/${faker.lorem.slug()}`;
    render(getComponentToRender(route));
    expect(screen.getByTestId(testIds.pageNotFound)).toBeInTheDocument();
  });
});
