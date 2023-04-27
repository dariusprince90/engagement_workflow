import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import * as reactRedux from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import faker from '@faker-js/faker';

import * as headerSlice from '../../common/header/headerSlice';
import PageNotFound404 from './404';

// **********************************************************************
// * constants

const mockDispatch = jest.fn();

const componentToRender = (
  <MemoryRouter>
    <PageNotFound404 />
  </MemoryRouter>
);

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useDispatch: jest.fn()
  };
});

jest.mock('../../common/header/headerSlice');

// **********************************************************************
// * unit tests

describe('PageNotFound404', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    jest.spyOn(headerSlice, 'pageTitleChanged');
  });

  beforeEach(() => {
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
  });

  // **********************************************************************
  // * tear-down

  afterAll(() => {
    headerSlice.pageTitleChanged.mockClear();
  });

  // **********************************************************************
  // * execution

  describe('rendering', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(componentToRender, div);
    });

    it('renders correct layout', () => {
      const tree = renderer.create(componentToRender).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('functional', () => {
    it('dispatches pageTitleChanged when mounting', () => {
      // * ARRANGE
      const expectedPageTitle = 'Page Not Found';
      const results = faker.lorem.words();
      headerSlice.pageTitleChanged.mockReturnValue(results);

      // * ACT
      render(componentToRender);

      // * ASSERT
      expect(headerSlice.pageTitleChanged).toHaveBeenCalledWith(expectedPageTitle);
      expect(mockDispatch).toHaveBeenCalledWith(results);
    });
  });
});
