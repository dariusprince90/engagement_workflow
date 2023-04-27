import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';
import { format } from 'date-fns';

import WorkflowHistoryTableRow from './WorkflowHistoryTableRow';

// **********************************************************************
// * constants

const defaultProps = {
  workflowStepRunLog: {
    workflowStepDisplayName: faker.random.alphaNumeric(10),
    stepStartDateTime: faker.date.future().toISOString(),
    stepEndDateTime: faker.date.future().toISOString(),
    actionedByUserFullName: faker.random.alphaNumeric(10),
    actionTaken: faker.random.alphaNumeric(10)
  }
};

const table = document.createElement('table');
const tableBody = document.createElement('tbody');

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <WorkflowHistoryTableRow {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('WorkflowHistoryTableRow', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    table.appendChild(tableBody);
    document.body.appendChild(table);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    ReactDOM.render(getComponentToRender(defaultProps), tableBody);
  });

  it('renders element with correct workflowStepDisplayName', () => {
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(defaultProps.workflowStepRunLog.workflowStepDisplayName)).toBeInTheDocument();
  });

  it('renders element with correct stepStartDateTime', () => {
    const expectedDateString = format(new Date(defaultProps.workflowStepRunLog.stepStartDateTime), 'MM/dd/yyyy h:mm a');
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(expectedDateString)).toBeInTheDocument();
  });

  it('renders element with correct stepEndDateTime', () => {
    const expectedDateString = format(new Date(defaultProps.workflowStepRunLog.stepEndDateTime), 'MM/dd/yyyy h:mm a');
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(expectedDateString)).toBeInTheDocument();
  });

  it('renders element with correct actionedByUserFullName', () => {
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(defaultProps.workflowStepRunLog.actionedByUserFullName)).toBeInTheDocument();
  });

  it('renders element with correct actionTaken', () => {
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(defaultProps.workflowStepRunLog.actionTaken)).toBeInTheDocument();
  });
});
