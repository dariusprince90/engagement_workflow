import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import INPUT_GROUP_ADD_ON_TYPES from '../../../../../helpers/enums/inputGroupAddOnTypes';
import INPUT_GROUP_ADD_ON_LOCATIONS from '../../../../../helpers/enums/inputGroupAddOnLocations';
import InputGroup from './InputGroup';

// **********************************************************************
// * constants

const testIds = {
  addOns: 'add-ons'
};

const defaultProps = {
  prependAddOns: null,
  appendAddOns: null,
  disabled: faker.datatype.boolean(),
  children: faker.random.alphaNumeric(10)
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <InputGroup {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./AddOns', () => {
  return {
    __esModule: true,
    default: ({ locationType, addOns }) => {
      return (
        <fake-add-ons
          data-testid={testIds.addOns}
          locationType={JSON.stringify(locationType)}
          addOns={JSON.stringify(addOns)}
        />
      );
    }
  };
});

// **********************************************************************
// * unit tests

describe('InputGroup', () => {
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

  describe('AddOns', () => {
    it('does not render when neither prependAddOns nor appendAddOns has a value', () => {
      const props = { ...defaultProps, prependAddOns: null, appendAddOns: null };
      render(getComponentToRender(props));
      expect(screen.queryByTestId(testIds.addOns)).not.toBeInTheDocument();
    });

    it('renders once when prependAddOns has a value and appendAddOns has no value', () => {
      const addOnTypes = Object.values(INPUT_GROUP_ADD_ON_TYPES);
      const index = faker.datatype.number({ min: 0, max: addOnTypes.length - 1 });
      const prependAddOns = [{ addOnType: addOnTypes[index] }];
      const props = { ...defaultProps, prependAddOns, appendAddOns: null };
      render(getComponentToRender(props));
      expect(screen.getAllByTestId(testIds.addOns)).toHaveLength(1);
    });

    it('has correct locationType for prependAddOns', () => {
      const addOnTypes = Object.values(INPUT_GROUP_ADD_ON_TYPES);
      const index = faker.datatype.number({ min: 0, max: addOnTypes.length - 1 });
      const prependAddOns = [{ addOnType: addOnTypes[index] }];
      const props = { ...defaultProps, prependAddOns, appendAddOns: null };
      const expectedLocationType = INPUT_GROUP_ADD_ON_LOCATIONS.front;
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.addOns)).toHaveAttribute('locationType', JSON.stringify(expectedLocationType));
    });

    it('renders once when prependAddOns has no value and appendAddOns has a value', () => {
      const addOnTypes = Object.values(INPUT_GROUP_ADD_ON_TYPES);
      const index = faker.datatype.number({ min: 0, max: addOnTypes.length - 1 });
      const appendAddOns = [{ addOnType: addOnTypes[index] }];
      const props = { ...defaultProps, prependAddOns: null, appendAddOns };
      render(getComponentToRender(props));
      expect(screen.getAllByTestId(testIds.addOns)).toHaveLength(1);
    });

    it('has correct locationType for appendAddOns', () => {
      const addOnTypes = Object.values(INPUT_GROUP_ADD_ON_TYPES);
      const index = faker.datatype.number({ min: 0, max: addOnTypes.length - 1 });
      const appendAddOns = [{ addOnType: addOnTypes[index] }];
      const props = { ...defaultProps, prependAddOns: null, appendAddOns };
      const expectedLocationType = INPUT_GROUP_ADD_ON_LOCATIONS.back;
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.addOns)).toHaveAttribute('locationType', JSON.stringify(expectedLocationType));
    });

    it('renders twice when prependAddOns and appendAddOns both have a value', () => {
      const addOnTypes = Object.values(INPUT_GROUP_ADD_ON_TYPES);
      const index = faker.datatype.number({ min: 0, max: addOnTypes.length - 1 });
      const prependAddOns = [{ addOnType: addOnTypes[index] }];
      const appendAddOns = [{ addOnType: addOnTypes[index] }];
      const props = { ...defaultProps, prependAddOns, appendAddOns };
      render(getComponentToRender(props));
      expect(screen.getAllByTestId(testIds.addOns)).toHaveLength(2);
    });
  });
});
