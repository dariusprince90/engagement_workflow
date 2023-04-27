/* eslint-disable react/prop-types */

import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as sideBarSlice from '../sideBarSlice';
import LinkMenuItem from './LinkMenuItem';

// **********************************************************************
// * constants

const testIds = {
  navLink: 'nav-link',
  menuItemIcon: 'menu-item-icon',
  menuItemLabel: 'menu-item-label'
};

const defaultProps = {
  to: faker.datatype.string(),
  label: faker.datatype.string(),
  title: faker.datatype.string(),
  icon: faker.datatype.string()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <LinkMenuItem {...props} />;
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

jest.mock('react-router-dom', () => {
  return {
    NavLink: ({ end, to, title, className, children }) => {
      return (
        <fake-nav-link end={end} to={to} title={title} className={className} data-testid={testIds.navLink}>
          {children}
        </fake-nav-link>
      );
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

describe('LinkMenuItem', () => {
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

  it('sets `end` prop on NavLink', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.navLink)).toHaveAttribute('end', 'true');
  });

  it('passes `to` prop to NavLink', () => {
    const to = faker.datatype.string();
    const props = { ...defaultProps, to };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.navLink)).toHaveAttribute('to', to);
  });

  it('passes `title` prop to NavLink title when useLabelAsTitle is false', () => {
    const title = faker.datatype.string();
    const useLabelAsTitle = false;
    const props = { ...defaultProps, title, useLabelAsTitle };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.navLink)).toHaveAttribute('title', title);
  });

  it('passes `label` prop to NavLink title when useLabelAsTitle is true', () => {
    const label = faker.datatype.string();
    const useLabelAsTitle = true;
    const props = { ...defaultProps, label, useLabelAsTitle };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.navLink)).toHaveAttribute('title', label);
  });

  it('sets `className` prop to NavLink', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.navLink)).toHaveAttribute('className', 'menu-item');
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
