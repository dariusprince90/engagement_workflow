import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import JobScheduleItem from './JobScheduleItem';

// **********************************************************************
// * constants

const defaultProps = { job: { id: faker.datatype.number(), name: faker.random.alpha(10) } };

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <JobScheduleItem {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('JobScheduleItem', () => {
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

  it('renders the job name', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByText(defaultProps.job.name)).toBeInTheDocument();
  });
});
