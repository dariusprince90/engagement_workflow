/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import * as staffSlice from '../../../../../../app/staffSlice';
import * as newEngagementInstanceSlice from '../../../newEngagementInstanceSlice';

import JobRolesTableRow from './JobRolesTableRow';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon'
};

const defaultProps = {
  jobRole: {
    id: faker.datatype.number(),
    etag: faker.random.alpha(10),
    roleId: faker.datatype.number(),
    staffNumber: faker.datatype.number()
  },
  onDelete: jest.fn()
};

const fakeStaff = { preferredFullName: faker.random.alpha(10) };
const fakeJobRoles = { data: [{ id: defaultProps.jobRole.roleId, displayName: faker.random.alpha(10) }] };

const table = document.createElement('table');
const tableBody = document.createElement('tbody');

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <JobRolesTableRow {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => ({
  useSelector: (callback) => callback()
}));

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ className, icon, size, onClick }) => {
    const props = { className, icon, size };
    return <fake-font-awesome-icon {...props} onClick={onClick} data-testid={testIds.fontAwesomeIcon} />;
  }
}));

jest.mock('../../../../../../app/staffSlice', () => ({
  selectStaff: jest.fn()
}));

jest.mock('../../../newEngagementInstanceSlice', () => ({
  selectLookup: jest.fn()
}));

// **********************************************************************
// * unit tests

describe('JobRolesTableRow', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    table.appendChild(tableBody);
    document.body.appendChild(table);
  });

  beforeEach(() => {
    newEngagementInstanceSlice.selectLookup.mockReturnValue(fakeJobRoles);
    staffSlice.selectStaff.mockReturnValue(fakeStaff);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    ReactDOM.render(getComponentToRender(defaultProps), tableBody);
  });

  it('renders the role display name', () => {
    const expectedText = fakeJobRoles.data[0].displayName;
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('renders the staff name', () => {
    const expectedText = fakeStaff.preferredFullName;
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  describe('delete icon', () => {
    it('is rendered', () => {
      render(getComponentToRender(defaultProps), { container: tableBody });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toBeInTheDocument();
    });

    it('has correct className prop', () => {
      const expected = 'delete-icon';
      render(getComponentToRender(defaultProps), { container: tableBody });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('className', expected);
    });

    it('has correct icon prop', () => {
      const expected = 'fa-solid fa-circle-x';
      render(getComponentToRender(defaultProps), { container: tableBody });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', expected);
    });

    it('has correct size prop', () => {
      const expected = 'lg';
      render(getComponentToRender(defaultProps), { container: tableBody });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('size', expected);
    });

    describe('functional', () => {
      it('invokes onDelete when clicked', () => {
        render(getComponentToRender(defaultProps), { container: tableBody });
        fireEvent.click(screen.getByTestId(testIds.fontAwesomeIcon));
        expect(defaultProps.onDelete).toHaveBeenCalledOnce();
        expect(defaultProps.onDelete).toHaveBeenCalledWith(
          defaultProps.jobRole.id,
          fakeJobRoles.data[0].displayName,
          fakeStaff.preferredFullName
        );
      });
    });
  });
});
