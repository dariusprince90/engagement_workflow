import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import VIEW_STATUSES from '../../../../../helpers/enums/viewStatuses';
import ViewNavigator from './ViewNavigator';

// **********************************************************************
// * constants

const testIds = {
  navItem: 'nav-item'
};

const viewStatusValues = Object.values(VIEW_STATUSES);

const defaultProps = {
  viewSections: [...Array(faker.datatype.number({ min: 5, max: 10 })).keys()].map((val) => ({
    id: faker.random.alphaNumeric(10),
    label: faker.random.alphaNumeric(10),
    status: viewStatusValues[val % viewStatusValues.length]
  }))
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ViewNavigator {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./NavItem', () => ({
  __esModule: true,
  default: ({ id, label, status }) => {
    const props = { id, label, status };
    return <fake-nav-item {...props} data-testid={testIds.navItem} />;
  }
}));

// **********************************************************************
// * unit tests

describe('ViewNavigator', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  it('renders one NavItem for each item in the viewSections array', () => {
    // * ARRANGE

    // * ACT
    render(getComponentToRender(defaultProps));

    // * ASSERT
    const navItems = screen.getAllByTestId(testIds.navItem);
    expect(navItems).toHaveLength(defaultProps.viewSections.length);
  });

  it('sets correct props on each NavItem', () => {
    // * ARRANGE

    // * ACT
    render(getComponentToRender(defaultProps));

    // * ASSERT
    const navItems = screen.getAllByTestId(testIds.navItem);

    for (let index = 0; index < defaultProps.viewSections.length; index++) {
      const expectedProps = { ...defaultProps.viewSections[index] };
      const navItem = navItems[index];
      expect(navItem).toHaveAttribute('id', expectedProps.id);
      expect(navItem).toHaveAttribute('label', expectedProps.label);
      expect(navItem).toHaveAttribute('status', expectedProps.status.toString());
    }
  });
});
