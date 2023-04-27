/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import JobInfoResponseScheduleItem from './JobInfoResponseScheduleItem';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon'
};

const defaultProps = {
  currentJobInfoResponseId: faker.datatype.number(),
  jobInfoResponse: { id: faker.datatype.number(), jobName: faker.random.alpha(10) }
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <JobInfoResponseScheduleItem {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, fixedWidth, size }) => {
    const props = { icon, fixedWidth, size };
    return <fake-font-awesome-icon {...props} data-testid={testIds.fontAwesomeIcon} />;
  }
}));

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

  it('has current-job class when the currentJobInfoResponseId equals the jobInfoResponse.id', () => {
    const jobInfoResponseId = faker.datatype.number();
    const props = {
      currentJobInfoResponseId: jobInfoResponseId,
      jobInfoResponse: { id: jobInfoResponseId, jobName: faker.random.alpha(10) }
    };
    render(getComponentToRender(props));
    expect(screen.getByText(props.jobInfoResponse.jobName)).toHaveClass('current-job');
  });

  it('does not have current-job class when the currentJobInfoResponseId does not equal the jobInfoResponse.id', () => {
    const jobInfoResponseId = faker.datatype.number();
    const props = {
      currentJobInfoResponseId: jobInfoResponseId,
      jobInfoResponse: { id: jobInfoResponseId + 1, jobName: faker.random.alpha(10) }
    };
    render(getComponentToRender(props));
    expect(screen.getByText(props.jobInfoResponse.jobName)).not.toHaveClass('current-job');
  });

  it('renders the check icon when the currentJobInfoResponseId equals the jobInfoResponse.id', () => {
    const jobInfoResponseId = faker.datatype.number();
    const props = {
      currentJobInfoResponseId: jobInfoResponseId,
      jobInfoResponse: { id: jobInfoResponseId, jobName: faker.random.alpha(10) }
    };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.fontAwesomeIcon)).toBeInTheDocument();
  });

  it('does not render the check icon when the currentJobInfoResponseId does not equal the jobInfoResponse.id', () => {
    const jobInfoResponseId = faker.datatype.number();
    const props = {
      currentJobInfoResponseId: jobInfoResponseId,
      jobInfoResponse: { id: jobInfoResponseId + 1, jobName: faker.random.alpha(10) }
    };
    render(getComponentToRender(props));
    expect(screen.queryByTestId(testIds.fontAwesomeIcon)).not.toBeInTheDocument();
  });

  it('renders the job name', () => {
    const props = {
      ...defaultProps,
      jobInfoResponse: { id: faker.datatype.number(), jobName: faker.random.alpha(10) }
    };
    render(getComponentToRender(props));
    expect(screen.getByText(props.jobInfoResponse.jobName)).toBeInTheDocument();
  });
});
