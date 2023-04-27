import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import NewBillingScheduleTableRow from './NewBillingScheduleTableRow';

// **********************************************************************
// * constants

const testIds = {};

const defaultProps = {};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <NewBillingScheduleTableRow {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('NewBillingScheduleTableRow', () => {
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
});
