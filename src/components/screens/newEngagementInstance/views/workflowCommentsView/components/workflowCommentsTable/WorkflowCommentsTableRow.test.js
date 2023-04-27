import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';
import { format } from 'date-fns';

import WorkflowCommentsTableRow from './WorkflowCommentsTableRow';

// **********************************************************************
// * constants

const defaultProps = {
  workflowComments: {
    createdOn: faker.date.future().toISOString(),
    createdByStaffNumber: faker.random.alphaNumeric(10),
    commentTypeId: faker.random.alphaNumeric(10),
    comments: faker.random.alphaNumeric(10)
  }
};

const table = document.createElement('table');
const tableBody = document.createElement('tbody');

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <WorkflowCommentsTableRow {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('WorkflowCommentsTableRow', () => {
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

  it('renders element with correct createdOn', () => {
    const expectedDateString = format(new Date(defaultProps.workflowComments.createdOn), 'MM/dd/yyyy h:mm a');
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(expectedDateString)).toBeInTheDocument();
  });

  it('renders element with correct createdByStaffNumber', () => {
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(defaultProps.workflowComments.createdByStaffNumber)).toBeInTheDocument();
  });

  it('renders element with correct commentTypeId', () => {
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(defaultProps.workflowComments.commentTypeId)).toBeInTheDocument();
  });

  it('renders element with correct comments', () => {
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(defaultProps.workflowComments.comments)).toBeInTheDocument();
  });
});
