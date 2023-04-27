/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import INPUT_GROUP_ADD_ON_LOCATIONS from '../../../../../helpers/enums/inputGroupAddOnLocations';
import IconAddOn from './IconAddOn';

// **********************************************************************
// * constants

const testIds = {
  addOnBase: 'add-on-base',
  fontAwesomeIcon: 'font-awesome-icon'
};

const defaultProps = {
  locationType: Object.values(INPUT_GROUP_ADD_ON_LOCATIONS)[0],
  icon: faker.random.alphaNumeric(10)
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <IconAddOn {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./AddOnBase', () => ({
  __esModule: true,
  default: ({ locationType, children }) => {
    const props = { children };
    return <fake-add-on-base {...props} data-testid={testIds.addOnBase} locationType={JSON.stringify(locationType)} />;
  }
}));

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }) => {
    const props = { icon };
    return <fake-font-awesome-icon {...props} data-testid={testIds.fontAwesomeIcon} />;
  }
}));

// **********************************************************************
// * unit tests

describe('IconAddOn', () => {
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

  describe('AddOnBase', () => {
    it('is rendered', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.addOnBase)).toBeInTheDocument();
    });

    it('has correct locationType', () => {
      const locationTypes = Object.values(INPUT_GROUP_ADD_ON_LOCATIONS);
      const index = faker.datatype.number({ min: 0, max: locationTypes.length - 1 });
      const locationType = locationTypes[index];
      const props = { ...defaultProps, locationType };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.addOnBase)).toHaveAttribute('locationType', JSON.stringify(locationType));
    });
  });

  describe('FontAwesomeIcon', () => {
    it('is rendered within the AddOnBase', () => {
      render(getComponentToRender(defaultProps));
      const addOnBase = screen.getByTestId(testIds.addOnBase);
      expect(within(addOnBase).getByTestId(testIds.fontAwesomeIcon)).toBeInTheDocument();
    });

    it('has correct icon', () => {
      const icon = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, icon };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', icon);
    });
  });
});
