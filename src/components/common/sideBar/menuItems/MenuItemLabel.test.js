import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import MenuItemLabel from './MenuItemLabel';

// **********************************************************************
// * constants

const defaultProps = {
  label: faker.datatype.string()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <MenuItemLabel {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('MenuItemLabel', () => {
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

  it('sets the label correctly', () => {
    const label = faker.datatype.string();
    const props = { ...defaultProps, label };
    render(getComponentToRender(props));
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
