import ReactDOM from 'react-dom';
import { render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import INPUT_GROUP_ADD_ON_LOCATIONS from '../../../../../helpers/enums/inputGroupAddOnLocations';
import TextAddOn from './TextAddOn';

// **********************************************************************
// * constants

const testIds = {
  addOnBase: 'add-on-base'
};

const defaultProps = {
  locationType: Object.values(INPUT_GROUP_ADD_ON_LOCATIONS)[0],
  text: faker.random.alphaNumeric(10)
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <TextAddOn {...props} />;
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

// **********************************************************************
// * unit tests

describe('TextAddOn', () => {
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

  describe('text', () => {
    it('is rendered within the AddOnBase', () => {
      render(getComponentToRender(defaultProps));
      const addOnBase = screen.getByTestId(testIds.addOnBase);
      expect(within(addOnBase).getByText(defaultProps.text)).toBeInTheDocument();
    });

    it('has correct class', () => {
      const expectedClass = 'input-group-text';
      render(getComponentToRender(defaultProps));
      expect(screen.getByText(defaultProps.text)).toHaveClass(expectedClass);
    });
  });
});
