import React from 'react';
import ReactDOM from 'react-dom';
import * as reactRedux from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as sideBarSlice from '../sideBarSlice';
import ExpanderMenuItem from './ExpanderMenuItem';

// **********************************************************************
// * constants

const testIds = {
  menuItem: 'menu-item'
};

const defaultProps = {};
const mockDispatch = jest.fn();
const mockSideBarState = { isExpanded: true, lockExpanded: true };

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ExpanderMenuItem {...props} />;
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

jest.mock('../sideBarSlice', () => {
  return {
    selectSideBarState: jest.fn(),
    forceToggle: jest.fn()
  };
});

jest.mock('./MenuItem', () => {
  return {
    __esModule: true,
    default: ({ icon, title, menuItemClass, onClick }) => {
      return (
        <fake-menu-item
          data-testid={testIds.menuItem}
          icon={icon}
          title={title}
          menuItemClass={menuItemClass}
          onClick={onClick}
        />
      );
    }
  };
});

// **********************************************************************
// * unit tests

describe('SideBarExpander', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    jest.spyOn(sideBarSlice, 'forceToggle');
  });

  beforeEach(() => {
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    sideBarSlice.selectSideBarState.mockReturnValue(mockSideBarState);
  });

  // **********************************************************************
  // * tear-down

  afterAll(() => {
    sideBarSlice.forceToggle.mockClear();
  });

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  it('sets the icon prop correctly when isExpanded is true', () => {
    const isExpanded = true;
    sideBarSlice.selectSideBarState.mockReturnValue({ isExpanded });
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.menuItem)).toHaveAttribute('icon', 'fas,angle-double-left');
  });

  it('sets the icon prop correctly when isExpanded is false', () => {
    const isExpanded = false;
    sideBarSlice.selectSideBarState.mockReturnValue({ isExpanded });
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.menuItem)).toHaveAttribute('icon', 'fas,angle-double-right');
  });

  it('sets the title prop correctly when lockExpanded is true', () => {
    const lockExpanded = true;
    sideBarSlice.selectSideBarState.mockReturnValue({ lockExpanded });
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.menuItem)).toHaveAttribute('title', 'click to minimize the side bar');
  });

  it('sets the title prop correctly when lockExpanded is false', () => {
    const lockExpanded = false;
    sideBarSlice.selectSideBarState.mockReturnValue({ lockExpanded });
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.menuItem)).toHaveAttribute('title', 'click to keep the side bar open');
  });

  it('sets the menuItemClass prop correctly', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.menuItem)).toHaveAttribute('menuItemClass', 'expander');
  });

  it('dispatches forceToggle when the MenuItem is clicked', () => {
    // * ARRANGE
    const results = faker.datatype.string();
    sideBarSlice.forceToggle.mockReturnValue(results);

    // * ACT
    render(getComponentToRender(defaultProps));
    expect(sideBarSlice.forceToggle).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId(testIds.menuItem));

    // * ASSERT
    expect(sideBarSlice.forceToggle).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(results);
  });
});
