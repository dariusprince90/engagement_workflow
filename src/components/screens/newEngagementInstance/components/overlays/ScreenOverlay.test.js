import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import ScreenOverlay from './ScreenOverlay';

// **********************************************************************
// * constants

const defaultProps = {
  children: faker.random.alphaNumeric(10)
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ScreenOverlay {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('ScreenOverlay', () => {
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

  it('renders the children', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByText(defaultProps['children'])).toBeInTheDocument();
  });
});
