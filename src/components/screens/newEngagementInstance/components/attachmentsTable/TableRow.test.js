/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import ATTACHMENT_TYPES from '../../../../../helpers/enums/attachmentTypes';
import TableRow from './TableRow';

// **********************************************************************
// * constants

const defaultProps = {
  attachment: {
    id: faker.datatype.number(),
    fileName: faker.random.alphaNumeric(10),
    attachmentTypeId: faker.helpers.arrayElement(Object.values(ATTACHMENT_TYPES)).id
  },
  onDelete: jest.fn()
};

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon'
};

const table = document.createElement('table');
const tableBody = document.createElement('tbody');

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <TableRow {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: ({ icon, className, size, title, onClick }) => {
      const props = { icon, className, size, title };
      return <fake-font-awesome-icon {...props} data-testid={testIds.fontAwesomeIcon} onClick={() => onClick()} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('TableRow', () => {
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

  it('renders element with correct fileName', () => {
    const expectedName = faker.datatype.string();
    const props = { ...defaultProps, attachment: { ...defaultProps.attachment, fileName: expectedName } };
    render(getComponentToRender(props), { container: tableBody });
    expect(screen.getByText(expectedName)).toBeInTheDocument();
  });

  it('renders element with correct attachmentTypeName', () => {
    const expectedName = Object.values(ATTACHMENT_TYPES).find(
      (o) => o.id === defaultProps.attachment.attachmentTypeId
    ).displayName;
    render(getComponentToRender(defaultProps), { container: tableBody });
    expect(screen.getByText(expectedName)).toBeInTheDocument();
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

    it('has correct size', () => {
      const expectedSize = 'lg';
      render(getComponentToRender(defaultProps), { container: tableBody });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('size', expectedSize);
    });

    it('has correct title', () => {
      const expectedTitle = 'Delete this attachment';
      render(getComponentToRender(defaultProps), { container: tableBody });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('title', expectedTitle);
    });

    describe('functional', () => {
      it('does yet invoke onClick function', () => {
        const handleDeleteIconClick = jest.fn();
        const props = { ...defaultProps, onDelete: handleDeleteIconClick };
        render(getComponentToRender(props), { container: tableBody });
        fireEvent.click(screen.getByTestId(testIds.fontAwesomeIcon));
        expect(handleDeleteIconClick).toHaveBeenCalled();
      });
    });
  });
});
