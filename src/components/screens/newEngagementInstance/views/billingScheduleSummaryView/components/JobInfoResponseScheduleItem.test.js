import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import JobInfoResponseScheduleItem from './JobInfoResponseScheduleItem';

// **********************************************************************
// * constants

const defaultProps = {
  jobInfoResponse: {
    id: faker.datatype.number(),
    jobName: faker.random.alpha(10),
    clientDisplayName: faker.random.alpha(10)
  }
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <JobInfoResponseScheduleItem {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('JobInfoResponseScheduleItem', () => {
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
    expect(screen.getByText(defaultProps.jobInfoResponse.jobName)).toBeInTheDocument();
  });

  it('renders the client display name in parens', () => {
    const expectedText = `(${defaultProps.jobInfoResponse.clientDisplayName})`;
    render(getComponentToRender(defaultProps));
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
