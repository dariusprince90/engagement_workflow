/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import DYNAMIC_ALERT_TYPES from '../../../helpers/enums/dynamicAlertTypes';
import DynamicAlert from './DynamicAlert';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon'
};

const defaultProps = {
  type: Object.values(DYNAMIC_ALERT_TYPES)[0],
  message: faker.random.alphaNumeric(10)
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <DynamicAlert {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }) => {
    const props = { icon };
    return <fake-font-awesome-icon {...props} data-testid={testIds.fontAwesomeIcon} />;
  }
}));

// **********************************************************************
// * unit tests

describe('DynamicAlert', () => {
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

  it('renders the correct message', () => {
    const alertTypes = Object.values(DYNAMIC_ALERT_TYPES);
    const index = faker.datatype.number({ min: 0, max: alertTypes.length - 1 });
    const dynamicAlert = { type: alertTypes[index], message: faker.random.alphaNumeric(10) };
    const props = { ...dynamicAlert };
    render(getComponentToRender(props));
    expect(screen.getByText(dynamicAlert.message)).toBeInTheDocument();
  });

  describe('alert div', () => {
    it('has the correct class', () => {
      const alertTypes = Object.values(DYNAMIC_ALERT_TYPES);
      const index = faker.datatype.number({ min: 0, max: alertTypes.length - 1 });
      const dynamicAlert = { type: alertTypes[index], message: faker.random.alphaNumeric(10) };
      const expectedClass =
        `dynamic-alert alert alert-${dynamicAlert.type.bsClassSuffix} ` +
        `border border-${dynamicAlert.type.bsClassSuffix}`;
      const props = { ...dynamicAlert };
      render(getComponentToRender(props));
      expect(screen.getByText(dynamicAlert.message)).toHaveClass(expectedClass);
    });
  });

  describe('FontAwesomeIcon', () => {
    it('has the correct icon', () => {
      const alertTypes = Object.values(DYNAMIC_ALERT_TYPES);
      const index = faker.datatype.number({ min: 0, max: alertTypes.length - 1 });
      const dynamicAlert = { type: alertTypes[index], message: faker.random.alphaNumeric(10) };
      const expectedIcon = dynamicAlert.type.defaultIcon;
      const props = { ...dynamicAlert };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', expectedIcon);
    });
  });
});
