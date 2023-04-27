/* eslint-disable react/prop-types */

import React from 'react';
import * as reactRedux from 'react-redux';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as sideBarSlice from './sideBarSlice';
import SideBar from './SideBar';

// **********************************************************************
// * constants

const testIds = {
  expanderMenuItem: 'expander-menu-item',
  menuItem: 'menu-item',
  newEngagementInstanceScreenMenuItems: 'new-engagement-instance-screen-menu-items',
  sideBarNav: 'side-bar-nav'
};

const mockDispatch = jest.fn();
const mockSideBarState = { isExpanded: true };

// **********************************************************************
// * functions

const getComponentToRender = (route = '/') => {
  return (
    <MemoryRouter initialEntries={[route]}>
      <SideBar />
    </MemoryRouter>
  );
};

// **********************************************************************
// * mocking external dependencies

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => {
      return callback();
    },
    useDispatch: jest.fn()
  };
});

jest.mock('./sideBarSlice', () => {
  return {
    selectSideBarState: jest.fn(),
    expand: jest.fn(),
    collapse: jest.fn()
  };
});

jest.mock('./menuItems/ExpanderMenuItem', () => {
  return {
    __esModule: true,
    default: () => {
      return <fake-expander-menu-item data-testid={testIds.expanderMenuItem} />;
    }
  };
});

jest.mock('./menuItems/MenuItem', () => {
  return {
    __esModule: true,
    default: ({ label, menuItemClass }) => {
      const props = { label, menuItemClass };
      return <fake-menu-item data-testid={testIds.menuItem} {...props} />;
    }
  };
});

jest.mock('../../screens/newEngagementInstance/components/sideBarMenuItems/SideBarMenuItems', () => {
  return {
    __esModule: true,
    default: () => {
      return (
        <fake-new-engagement-instance-screen-menu-items data-testid={testIds.newEngagementInstanceScreenMenuItems} />
      );
    }
  };
});

// **********************************************************************
// * unit tests

describe('SideBar', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    jest.spyOn(sideBarSlice, 'expand');
    jest.spyOn(sideBarSlice, 'collapse');
  });

  beforeEach(() => {
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    sideBarSlice.selectSideBarState.mockReturnValue(mockSideBarState);
  });

  // **********************************************************************
  // * tear-down

  afterAll(() => {
    sideBarSlice.expand.mockClear();
    sideBarSlice.collapse.mockClear();
  });

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  describe('side bar nav', () => {
    it('adds `side-bar` class to side bar nav', () => {
      // * ARRANGE
      const expectedClass = 'side-bar';

      // * ACT
      render(getComponentToRender());

      // * ASSERT
      const classList = screen.getByTestId(testIds.sideBarNav).classList;
      expect(classList.contains(expectedClass)).toBeTruthy();
    });

    it('adds `expanded` class to side bar nav when isExpanded is true', () => {
      // * ARRANGE
      const isExpanded = true;
      const expectedClass = 'expanded';
      sideBarSlice.selectSideBarState.mockReturnValue({ ...mockSideBarState, isExpanded });

      // * ACT
      render(getComponentToRender());

      // * ASSERT
      const classList = screen.getByTestId(testIds.sideBarNav).classList;
      expect(classList.contains(expectedClass)).toBeTruthy();
    });

    it('does not add `expanded` class to side bar nav when isExpanded is false', () => {
      // * ARRANGE
      const isExpanded = false;
      const expectedClass = 'expanded';
      sideBarSlice.selectSideBarState.mockReturnValue({ ...mockSideBarState, isExpanded });

      // * ACT
      render(getComponentToRender());

      // * ASSERT
      const classList = screen.getByTestId(testIds.sideBarNav).classList;
      expect(classList.contains(expectedClass)).toBeFalsy();
    });

    it('adds `collapsed` class to side bar nav when isExpanded is false', () => {
      // * ARRANGE
      const isExpanded = false;
      const expectedClass = 'collapsed';
      sideBarSlice.selectSideBarState.mockReturnValue({ ...mockSideBarState, isExpanded });

      // * ACT
      render(getComponentToRender());

      // * ASSERT
      const classList = screen.getByTestId(testIds.sideBarNav).classList;
      expect(classList.contains(expectedClass)).toBeTruthy();
    });

    it('does not add `collapsed` class to side bar nav when isExpanded is true', () => {
      // * ARRANGE
      const isExpanded = true;
      const expectedClass = 'collapsed';
      sideBarSlice.selectSideBarState.mockReturnValue({ ...mockSideBarState, isExpanded });

      // * ACT
      render(getComponentToRender());

      // * ASSERT
      const classList = screen.getByTestId(testIds.sideBarNav).classList;
      expect(classList.contains(expectedClass)).toBeFalsy();
    });

    it('dispatches expand when onMouseEnter is triggered', () => {
      // * ARRANGE
      const results = faker.datatype.string();
      sideBarSlice.expand.mockReturnValue(results);

      // * ACT
      render(getComponentToRender());
      expect(sideBarSlice.expand).not.toHaveBeenCalled();
      fireEvent.mouseEnter(screen.queryByTestId(testIds.sideBarNav));

      // * ASSERT
      expect(sideBarSlice.expand).toHaveBeenCalledTimes(1);
      expect(sideBarSlice.expand).toHaveBeenCalledWith(false);
      expect(mockDispatch).toHaveBeenCalledWith(results);
    });

    it('dispatches collapse when onMouseLeave is triggered', () => {
      // * ARRANGE
      const results = faker.datatype.string();
      sideBarSlice.collapse.mockReturnValue(results);

      // * ACT
      render(getComponentToRender());
      expect(sideBarSlice.collapse).not.toHaveBeenCalled();
      fireEvent.mouseLeave(screen.queryByTestId(testIds.sideBarNav));

      // * ASSERT
      expect(sideBarSlice.collapse).toHaveBeenCalledTimes(1);
      expect(sideBarSlice.collapse).toHaveBeenCalledWith(false);
      expect(mockDispatch).toHaveBeenCalledWith(results);
    });
  });

  describe('MenuItems', () => {
    it('has filler menu item', () => {
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.menuItem)).toHaveAttribute('menuItemClass', 'filler');
    });
  });

  describe('routes', () => {
    it('renders NewEngagementInstanceScreenMenuItems for the root route', () => {
      const route = '/';
      render(getComponentToRender(route));
      expect(screen.getByTestId(testIds.newEngagementInstanceScreenMenuItems)).toBeInTheDocument();
    });
  });
});
