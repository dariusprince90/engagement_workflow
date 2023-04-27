/* eslint-disable react/prop-types */

import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as sideBarSlice from '../sideBarSlice';
import MenuItem from './MenuItem';

// **********************************************************************
// * constants

const testIds = {
  menuItem: 'menu-item',
  menuItemIcon: 'menu-item-icon',
  menuItemLabel: 'menu-item-label'
};

const defaultProps = {
  to: faker.datatype.string(),
  label: faker.datatype.string(),
  icon: faker.datatype.string()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <MenuItem {...props} />;
};

// **********************************************************************
// * mocking external dependencies

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => {
      return callback();
    }
  };
});

jest.mock('../sideBarSlice', () => {
  return {
    selectSideBarState: jest.fn()
  };
});

jest.mock('./MenuItemIcon', () => {
  return {
    __esModule: true,
    default: ({ icon }) => {
      return <fake-menu-item-icon data-testid={testIds.menuItemIcon} icon={icon} />;
    }
  };
});

jest.mock('./MenuItemLabel', () => {
  return {
    __esModule: true,
    default: ({ label }) => {
      return <fake-menu-item-label data-testid={testIds.menuItemLabel} label={label} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('MenuItem', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    sideBarSlice.selectSideBarState.mockReturnValue({ isExpanded: true });
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  it('adds menu-item class to the menu item className prop', () => {
    render(getComponentToRender(defaultProps));
    const className = screen.getByTestId(testIds.menuItem).attributes['class'];
    expect(className).toHaveTextContent('menu-item');
  });

  it('adds active class to the menu item className prop when isActive is true', () => {
    const isActive = true;
    const props = { ...defaultProps, isActive };
    render(getComponentToRender(props));
    const className = screen.getByTestId(testIds.menuItem).attributes['class'];
    expect(className).toHaveTextContent('active');
  });

  it('does not add active class to the menu item className prop when isActive is false', () => {
    const isActive = false;
    const props = { ...defaultProps, isActive };
    render(getComponentToRender(props));
    const className = screen.getByTestId(testIds.menuItem).attributes['class'];
    expect(className).not.toHaveTextContent('active');
  });

  it('adds menuItemClass to the menu item className prop when menuItemClass has a value', () => {
    const menuItemClass = faker.datatype.string();
    const props = { ...defaultProps, menuItemClass };
    render(getComponentToRender(props));
    const className = screen.getByTestId(testIds.menuItem).attributes['class'];
    expect(className).toHaveTextContent(menuItemClass);
  });

  it('sets the title prop on the menu item with the title prop when useLabelAsTitle is false', () => {
    const title = faker.datatype.string();
    const useLabelAsTitle = false;
    const props = { ...defaultProps, title, useLabelAsTitle };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.menuItem)).toHaveAttribute('title', title);
  });

  it('sets the title prop on the menu item with the label prop when useLabelAsTitle is true', () => {
    const label = faker.datatype.string();
    const useLabelAsTitle = true;
    const props = { ...defaultProps, label, useLabelAsTitle };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.menuItem)).toHaveAttribute('title', label);
  });

  it('fires onClick when the menu item is clicked', () => {
    const onClick = jest.fn();
    const props = { ...defaultProps, onClick };
    render(getComponentToRender(props));
    expect(onClick).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId(testIds.menuItem));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders the MenuItemIcon when the icon prop has a value', () => {
    const icon = faker.datatype.string();
    const props = { ...defaultProps, icon };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.menuItemIcon)).toBeInTheDocument();
  });

  it('does not render the MenuItemIcon when the icon prop does not have a value', () => {
    const icon = null;
    const props = { ...defaultProps, icon };
    render(getComponentToRender(props));
    expect(screen.queryByTestId(testIds.menuItemIcon)).not.toBeInTheDocument();
  });

  it('passes the icon prop to the MenuItemIcon icon prop', () => {
    const icon = faker.datatype.string();
    const props = { ...defaultProps, icon };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.menuItemIcon)).toHaveAttribute('icon', icon);
  });

  it('renders the MenuItemLabel when isExpanded is true and the label prop has a value', () => {
    const isExpanded = true;
    const label = faker.datatype.string();
    const props = { ...defaultProps, label };
    sideBarSlice.selectSideBarState.mockReturnValue({ isExpanded });
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.menuItemLabel)).toBeInTheDocument();
  });

  it('does not render the MenuItemLabel when isExpanded is false and the label prop has a value', () => {
    const isExpanded = false;
    const label = faker.datatype.string();
    const props = { ...defaultProps, label };
    sideBarSlice.selectSideBarState.mockReturnValue({ isExpanded });
    render(getComponentToRender(props));
    expect(screen.queryByTestId(testIds.menuItemLabel)).not.toBeInTheDocument();
  });

  it('does not render the MenuItemLabel when isExpanded is true and the label prop does not have a value', () => {
    const isExpanded = true;
    const label = null;
    const props = { ...defaultProps, label };
    sideBarSlice.selectSideBarState.mockReturnValue({ isExpanded });
    render(getComponentToRender(props));
    expect(screen.queryByTestId(testIds.menuItemLabel)).not.toBeInTheDocument();
  });

  it('passes the label prop to the MenuItemLabel label prop', () => {
    const isExpanded = true;
    const label = faker.datatype.string();
    const props = { ...defaultProps, label };
    sideBarSlice.selectSideBarState.mockReturnValue({ isExpanded });
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.menuItemLabel)).toHaveAttribute('label', label);
  });
});
