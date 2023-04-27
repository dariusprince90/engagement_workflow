/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import NATURE_OF_SERVICE_TYPES from '../../../../../../helpers/enums/natureOfServiceTypes';
import * as newEngagementInstanceSlice from '../../../newEngagementInstanceSlice';
import NaturesOfServiceTableRow from './NaturesOfServiceTableRow';

// **********************************************************************
// * constants

const natureOfServiceTypeIds = Object.values(NATURE_OF_SERVICE_TYPES).map((nosType) => nosType.id);

const defaultProps = {
  jobInfoResponse: {
    id: faker.datatype.number(),
    etag: faker.random.alpha(10),
    jobName: faker.random.alpha(10),
    jobTypeDisplayName: faker.random.alpha(10),
    natureOfServiceId: faker.datatype.number()
  },
  onDelete: jest.fn()
};

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon'
};

const fakeLookups = {
  naturesOfServices: {
    data: [
      {
        id: faker.datatype.number(),
        natureOfService: faker.random.alpha(10),
        natureOfServiceTypeId: faker.helpers.arrayElement(natureOfServiceTypeIds)
      },
      {
        id: defaultProps.jobInfoResponse.natureOfServiceId,
        natureOfService: faker.random.alpha(10),
        natureOfServiceTypeId: faker.helpers.arrayElement(natureOfServiceTypeIds)
      },
      {
        id: faker.datatype.number(),
        natureOfService: faker.random.alpha(10),
        natureOfServiceTypeId: faker.helpers.arrayElement(natureOfServiceTypeIds)
      }
    ]
  }
};

const table = document.createElement('table');
const tableBody = document.createElement('tbody');

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <NaturesOfServiceTableRow {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => callback()
  };
});

jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: ({ icon, className, size, onClick }) => {
      const props = { icon, className, size, onClick };
      return <fake-font-awesome-icon {...props} data-testid={testIds.fontAwesomeIcon} />;
    }
  };
});

jest.mock('../../../newEngagementInstanceSlice', () => ({
  selectLookups: jest.fn()
}));

// **********************************************************************
// * unit tests

describe('NaturesOfServiceTableRow', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    table.appendChild(tableBody);
    document.body.appendChild(table);
  });

  beforeEach(() => {
    newEngagementInstanceSlice.selectLookups.mockReturnValue(fakeLookups);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    ReactDOM.render(getComponentToRender(defaultProps), tableBody);
  });

  it('renders element with correct nos display name and nos type display name', () => {
    const nosId = defaultProps.jobInfoResponse.natureOfServiceId;
    const nos = fakeLookups.naturesOfServices.data.find((n) => n.id === nosId);
    const nosTypeId = nos.natureOfServiceTypeId;
    const nosDisplayName = nos.natureOfService;
    const nosTypeDisplayName = Object.values(NATURE_OF_SERVICE_TYPES).find((t) => t.id === nosTypeId).displayName;

    const expectedDisplayName = `${nosDisplayName} (${nosTypeDisplayName})`;
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(expectedDisplayName)).toBeInTheDocument();
  });

  it('renders element with correct job name', () => {
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(defaultProps.jobInfoResponse.jobName)).toBeInTheDocument();
  });

  it('renders element with correct job type display name', () => {
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(defaultProps.jobInfoResponse.jobTypeDisplayName)).toBeInTheDocument();
  });

  describe('delete icon', () => {
    it('is rendered', () => {
      render(getComponentToRender(defaultProps), { container: tableBody });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toBeInTheDocument();
    });

    it('has correct icon', () => {
      const expectedIcon = 'fa-solid fa-circle-x';
      render(getComponentToRender(defaultProps), { container: tableBody });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', expectedIcon);
    });

    it('has correct className', () => {
      const expectedClassName = 'delete-icon';
      render(getComponentToRender(defaultProps), { container: tableBody });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('className', expectedClassName);
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
          defaultProps.jobInfoResponse.id,
          defaultProps.jobInfoResponse.etag,
          defaultProps.jobInfoResponse.jobName
        );
      });
    });
  });
});
