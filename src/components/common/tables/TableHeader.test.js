import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import TableHeader from './TableHeader';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'fontAwesome-icon',
  headerColumn: 'header-column'
};

const defaultProps = {
  columnHeaders: [],
  onAddIconClick: jest.fn()
};

const table = document.createElement('table');

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <TableHeader {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    // eslint-disable-next-line react/prop-types
    FontAwesomeIcon: ({ icon, className, size, title, fixedWidth, onClick }) => {
      const props = { icon, className, size, title, fixedWidth };
      return <fake-font-awesome-icon {...props} data-testid={testIds.fontAwesomeIcon} onClick={() => onClick()} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('TableHeader', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    document.body.appendChild(table);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    ReactDOM.render(getComponentToRender(defaultProps), table);
  });

  it('renders each item in the columnHeaders collection in a header column', () => {
    // * ARRANGE

    const itemCount = faker.datatype.number({ min: 1, max: 20 });
    const columnHeaders = faker.helpers.uniqueArray(() => faker.random.alphaNumeric(10), itemCount);
    const props = { ...defaultProps, columnHeaders };

    // * ACT

    render(getComponentToRender(props), { container: table });

    // * ASSERT

    for (let i = 0; i < columnHeaders.length; i++) {
      expect(screen.queryAllByTestId(testIds.headerColumn)[i]).toHaveTextContent(columnHeaders[i]);
    }
  });

  describe('showAddIcon', () => {
    it('is rendered', () => {
      render(getComponentToRender(defaultProps), { container: table });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toBeInTheDocument();
    });

    it('has correct icon', () => {
      const expectedIcon = 'fa-solid fa-circle-plus';
      render(getComponentToRender(defaultProps), { container: table });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', expectedIcon);
    });

    it('has correct className', () => {
      const expectedClassName = 'add-icon';
      render(getComponentToRender(defaultProps), { container: table });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('className', expectedClassName);
    });

    it('has correct size', () => {
      const expectedSize = 'lg';
      render(getComponentToRender(defaultProps), { container: table });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('size', expectedSize);
    });

    it('has fixedWidth size', () => {
      const expectedFixedWidth = true;
      render(getComponentToRender(defaultProps), { container: table });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('fixedWidth', expectedFixedWidth.toString());
    });

    it('has correct title', () => {
      const expectedTitle = 'Add an attachment';
      render(getComponentToRender(defaultProps), { container: table });
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('title', expectedTitle);
    });

    describe('functional', () => {
      it('does yet invoke onClick function', () => {
        const onAddIconClick = jest.fn();
        render(getComponentToRender({ ...defaultProps, onAddIconClick }), { container: table });
        fireEvent.click(screen.getByTestId(testIds.fontAwesomeIcon));
        expect(onAddIconClick).toHaveBeenCalled();
      });
    });
  });
});
