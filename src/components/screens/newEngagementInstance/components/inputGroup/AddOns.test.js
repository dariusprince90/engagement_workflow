import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';
import * as testHelper from '../../../../../testing/testHelper';

import INPUT_GROUP_ADD_ON_LOCATIONS from '../../../../../helpers/enums/inputGroupAddOnLocations';
import INPUT_GROUP_ADD_ON_TYPES from '../../../../../helpers/enums/inputGroupAddOnTypes';

import AddOns from './AddOns';

// **********************************************************************
// * constants

const testIds = {
  buttonAddOn: 'button-add-on',
  iconAddOn: 'icon-add-on',
  textAddOn: 'text-add-on'
};

const defaultProps = {
  locationType: Object.values(INPUT_GROUP_ADD_ON_LOCATIONS)[0],
  addOns: [],
  disabled: faker.datatype.boolean()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <AddOns {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./ButtonAddOn', () => ({
  __esModule: true,
  default: ({ locationType, disabled }) => {
    const props = { locationType: JSON.stringify(locationType), disabled };
    return <fake-button-add-on data-testid={testIds.buttonAddOn} {...props} />;
  }
}));

jest.mock('./IconAddOn', () => ({
  __esModule: true,
  default: ({ locationType, disabled }) => {
    const props = { locationType: JSON.stringify(locationType), disabled };
    return <fake-icon-add-on data-testid={testIds.iconAddOn} {...props} />;
  }
}));

jest.mock('./TextAddOn', () => ({
  __esModule: true,
  default: ({ locationType, disabled }) => {
    const props = { locationType: JSON.stringify(locationType), disabled };
    return <fake-text-add-on data-testid={testIds.textAddOn} {...props} />;
  }
}));

// **********************************************************************
// * unit tests

describe('AddOns', () => {
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

  it.each([
    { addOnType: 'button', addOnName: 'ButtonAddOn', testId: testIds.buttonAddOn },
    { addOnType: 'icon', addOnName: 'IconAddOn', testId: testIds.iconAddOn },
    { addOnType: 'text', addOnName: 'TextAddOn', testId: testIds.textAddOn }
  ])(
    'renders a $addOnName for each item in the addOns array with an addOnType of $addOnType',
    ({ addOnType, testId }) => {
      // * ARRANGE
      const itemCount = faker.datatype.number({ min: 5, max: 20 });
      const addOnTypes = Object.values(INPUT_GROUP_ADD_ON_TYPES);
      const addOns = [...Array(itemCount).keys()].map((_, index) => ({
        addOnType: addOnTypes[index % addOnTypes.length]
      }));
      const props = { ...defaultProps, addOns };
      const expectedCount = addOns.filter((o) => o.addOnType === INPUT_GROUP_ADD_ON_TYPES[addOnType]).length;

      // * ACT
      render(getComponentToRender(props));

      // * ASSERT
      expect(screen.getAllByTestId(testId)).toHaveLength(expectedCount);
    }
  );

  it('does not render an add-on when the addOnType is invalid', () => {
    // * ARRANGE
    const itemCount = faker.datatype.number({ min: 5, max: 20 });
    const addOns = [...Array(itemCount).keys()].map((_, index) => ({
      addOnType: 0
    }));
    const props = { ...defaultProps, addOns };

    // * ACT
    testHelper.mockConsoleError();
    render(getComponentToRender(props));
    testHelper.restoreConsoleError();

    // * ASSERT
    expect(screen.queryByTestId(testIds.buttonAddOn)).not.toBeInTheDocument();
    expect(screen.queryByTestId(testIds.iconAddOn)).not.toBeInTheDocument();
    expect(screen.queryByTestId(testIds.textAddOn)).not.toBeInTheDocument();
  });

  it('has disabled prop as true when props.disabled is true and addOn.disabled is false', () => {
    // * ARRANGE
    const addOns = [{ addOnType: INPUT_GROUP_ADD_ON_TYPES.button, disabled: false }];
    const props = { ...defaultProps, disabled: true, addOns };
    const expected = true;

    // * ACT
    render(getComponentToRender(props));

    // * ASSERT
    expect(screen.queryByTestId(testIds.buttonAddOn)).toHaveAttribute('disabled', expected.toString());
  });

  it('has disabled prop as true when props.disabled is false and addOn.disabled is true', () => {
    // * ARRANGE
    const addOns = [{ addOnType: INPUT_GROUP_ADD_ON_TYPES.button, disabled: true }];
    const props = { ...defaultProps, disabled: false, addOns };
    const expected = true;

    // * ACT
    render(getComponentToRender(props));

    // * ASSERT
    expect(screen.queryByTestId(testIds.buttonAddOn)).toHaveAttribute('disabled', expected.toString());
  });

  it('has disabled prop as false when props.disabled is false and addOn.disabled is false', () => {
    // * ARRANGE
    const addOns = [{ addOnType: INPUT_GROUP_ADD_ON_TYPES.button, disabled: false }];
    const props = { ...defaultProps, disabled: false, addOns };
    const expected = false;

    // * ACT
    render(getComponentToRender(props));

    // * ASSERT
    expect(screen.queryByTestId(testIds.buttonAddOn)).toHaveAttribute('disabled', expected.toString());
  });
});
