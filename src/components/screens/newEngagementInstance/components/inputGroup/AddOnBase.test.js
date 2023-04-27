import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import INPUT_GROUP_ADD_ON_LOCATIONS from '../../../../../helpers/enums/inputGroupAddOnLocations';
import AddOnBase from './AddOnBase';

// **********************************************************************
// * constants

const defaultProps = {
  locationType: Object.values(INPUT_GROUP_ADD_ON_LOCATIONS)[0],
  children: faker.random.alphaNumeric(10)
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <AddOnBase {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('AddOnBase', () => {
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

  it('renders children', () => {
    const expectedChildren = defaultProps['children'];
    render(getComponentToRender(defaultProps));
    expect(screen.getByText(expectedChildren)).toBeInTheDocument();
  });

  it('has correct class', () => {
    const addOnLocations = Object.values(INPUT_GROUP_ADD_ON_LOCATIONS);
    const index = faker.datatype.number({ min: 0, max: addOnLocations.length - 1 });
    const props = { ...defaultProps, locationType: addOnLocations[index] };
    const expectedClass = `input-group-${addOnLocations[index].classSuffix}`;
    render(getComponentToRender(props));
    expect(screen.getByText(defaultProps['children'])).toHaveClass(expectedClass);
  });
});
