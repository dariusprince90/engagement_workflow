import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import Pagination from './Pagination';

// **********************************************************************
// * constants

const testIds = {
  paginationItem: 'pagination-item',
  pageSizeSelector: 'page-size-selector'
};

const defaultProps = {
  pageSize: faker.datatype.number({ min: 5, max: 10 }),
  currentPage: faker.datatype.number({ min: 1, max: 20 }),
  totalPageCount: faker.datatype.number({ min: 10, max: 20 }),
  onPageItemClick: jest.fn(),
  onPageSizeItemClick: jest.fn(),
  prePostItemCount: faker.datatype.number({ min: 1, max: 5 })
};

const getComponentToRender = (props) => {
  return <Pagination {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./PaginationItem', () => {
  return {
    __esModule: true,
    default: ({ label, icon, title, isActivePage, disabled, className, onClick }) => {
      return (
        <fake-pagination-item
          data-testid={testIds.paginationItem}
          label={label}
          icon={icon}
          title={title}
          isActivePage={isActivePage}
          disabled={disabled}
          className={className}
          onClick={onClick}>
          {label}
        </fake-pagination-item>
      );
    }
  };
});

jest.mock('./PageSizeSelector', () => {
  return {
    __esModule: true,
    default: ({ selectedPageSize, onPageSizeItemClick }) => {
      return (
        <fake-page-size-selector data-testid={testIds.pageSizeSelector} onClick={onPageSizeItemClick}>
          <div>{selectedPageSize}</div>
        </fake-page-size-selector>
      );
    }
  };
});

// **********************************************************************
// * unit tests

describe('Pagination', () => {
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

  it('adds a page item for every page when total page count <= max page item count', () => {
    // * ARRANGE
    const prePostItemCount = faker.datatype.number({ min: 1, max: 5 });
    const totalPageCount = faker.datatype.number({ min: 1, max: prePostItemCount * 2 + 4 });
    const props = { ...defaultProps, prePostItemCount, totalPageCount };

    // * ACT
    render(getComponentToRender(props));

    // * ASSERT
    for (let index = 1; index <= totalPageCount; index++) {
      expect(screen.getByTitle(`page ${index}`)).toBeInTheDocument();
    }
  });

  it('adds a page item for the first and last page when total page count > max page item count', () => {
    // * ARRANGE
    const prePostItemCount = faker.datatype.number({ min: 1, max: 5 });
    const totalPageCount = faker.datatype.number({ min: prePostItemCount * 2 + 5, max: 20 });
    const props = { ...defaultProps, prePostItemCount, totalPageCount };

    // * ACT
    render(getComponentToRender(props));

    // * ASSERT
    expect(screen.getByTitle(`page 1`)).toBeInTheDocument();
    expect(screen.getByTitle(`page ${totalPageCount}`)).toBeInTheDocument();
  });

  it('adds the low page indexes when the current page is on the very low end of total page count', () => {
    // * ARRANGE
    const prePostItemCount = faker.datatype.number({ min: 1, max: 5 });
    const currentPage = faker.datatype.number({ min: 1, max: prePostItemCount + 3 });
    const props = { ...defaultProps, prePostItemCount, currentPage };
    const expectedIndexes = [...Array(prePostItemCount * 2 + 3).keys()].map((ix) =>
      Math.max(1, Math.min(props.totalPageCount, ix + 1))
    );

    // * ACT
    render(getComponentToRender(props));

    // * ASSERT
    for (let index = 0; index < expectedIndexes.length; index++) {
      expect(screen.getByTitle(`page ${expectedIndexes[index]}`)).toBeInTheDocument();
    }
  });

  it('adds the mid page indexes for the sliding block)', () => {
    // * ARRANGE
    const props = { ...defaultProps };
    const expectedIndexes = [...Array(props.prePostItemCount * 2 + 1).keys()].map((ix) =>
      Math.max(1, Math.min(props.totalPageCount, ix + (props.currentPage - props.prePostItemCount)))
    );

    // * ACT
    render(getComponentToRender(props));

    // * ASSERT
    for (let index = 0; index < expectedIndexes.length; index++) {
      expect(screen.getByTitle(`page ${expectedIndexes[index]}`)).toBeInTheDocument();
    }
  });

  it('adds the high page indexes when the current page is on the very high end of total page count', () => {
    // * ARRANGE
    const prePostItemCount = faker.datatype.number({ min: 1, max: 5 });
    const totalPageCount = defaultProps.totalPageCount;
    const currentPage = faker.datatype.number({ min: totalPageCount - (prePostItemCount + 2), max: totalPageCount });
    const props = { ...defaultProps, prePostItemCount, currentPage };
    const expectedIndexes = [...Array(prePostItemCount * 2 + 3).keys()].map((ix) =>
      Math.max(1, Math.min(totalPageCount, ix + (totalPageCount - (prePostItemCount * 2 + 2))))
    );

    // * ACT
    render(getComponentToRender(props));

    // * ASSERT
    for (let index = 0; index < expectedIndexes.length; index++) {
      expect(screen.getByTitle(`page ${expectedIndexes[index]}`)).toBeInTheDocument();
    }
  });

  it('invokes onPageItemClick for the first page when the "first page" page item is clicked', () => {
    // * ARRANGE
    const onPageItemClick = jest.fn();
    const props = { ...defaultProps, onPageItemClick };

    // * ACT
    render(getComponentToRender(props));
    fireEvent.click(screen.getByTitle('first page'));

    // * ASSERT
    expect(onPageItemClick).toHaveBeenCalledTimes(1);
    expect(onPageItemClick).toHaveBeenCalledWith(1);
  });

  it('invokes onPageItemClick for the previous page when the "previous page" page item is clicked', () => {
    // * ARRANGE
    const onPageItemClick = jest.fn();
    const props = { ...defaultProps, onPageItemClick };

    // * ACT
    render(getComponentToRender(props));
    fireEvent.click(screen.getByTitle('previous page'));

    // * ASSERT
    expect(onPageItemClick).toHaveBeenCalledTimes(1);
    expect(onPageItemClick).toHaveBeenCalledWith(props.currentPage - 1);
  });

  it('invokes onPageItemClick for the next page when the "next page" page item is clicked', () => {
    // * ARRANGE
    const onPageItemClick = jest.fn();
    const props = { ...defaultProps, onPageItemClick };

    // * ACT
    render(getComponentToRender(props));
    fireEvent.click(screen.getByTitle('next page'));

    // * ASSERT
    expect(onPageItemClick).toHaveBeenCalledTimes(1);
    expect(onPageItemClick).toHaveBeenCalledWith(props.currentPage + 1);
  });

  it('invokes onPageItemClick for the last page when the "last page" page item is clicked', () => {
    // * ARRANGE
    const onPageItemClick = jest.fn();
    const props = { ...defaultProps, onPageItemClick };

    // * ACT
    render(getComponentToRender(props));
    fireEvent.click(screen.getByTitle('last page'));

    // * ASSERT
    expect(onPageItemClick).toHaveBeenCalledTimes(1);
    expect(onPageItemClick).toHaveBeenCalledWith(props.totalPageCount);
  });

  it('invokes onPageItemClick when a numbered page item is clicked and it is not the current page', () => {
    // * ARRANGE
    const onPageItemClick = jest.fn();
    const props = { ...defaultProps, onPageItemClick, currentPage: 2 };

    // * ACT
    render(getComponentToRender(props));
    fireEvent.click(screen.getByTitle('page 1'));

    // * ASSERT
    expect(onPageItemClick).toHaveBeenCalledTimes(1);
    expect(onPageItemClick).toHaveBeenCalledWith(1);
  });

  it('does not invoke onPageItemClick when a numbered page item is clicked and it is the current page', () => {
    // * ARRANGE
    const onPageItemClick = jest.fn();
    const props = { ...defaultProps, onPageItemClick, currentPage: 1 };

    // * ACT
    render(getComponentToRender(props));
    fireEvent.click(screen.getByTitle('page 1'));

    // * ASSERT
    expect(onPageItemClick).not.toHaveBeenCalled();
  });

  it('adds the high-end separator ("...") item  when total page count > max page item count and the current page number is not on the very high end', () => {
    const prePostItemCount = defaultProps.prePostItemCount;
    const totalPageCount = faker.datatype.number({ min: prePostItemCount * 2 + 6, max: 20 });
    const currentPage = faker.datatype.number({ min: 1, max: totalPageCount - (prePostItemCount + 3) });
    const props = { ...defaultProps, totalPageCount, currentPage };
    render(getComponentToRender(props));
    const separators = screen.getAllByText('...');
    expect(separators.filter((sep) => sep.attributes['classname'].value.includes('high-separator')).length).toBe(1);
  });

  it('adds the low-end separator ("...") item  when total page count > max page item count and the current page number is not on the very low end', () => {
    const prePostItemCount = defaultProps.prePostItemCount;
    const totalPageCount = faker.datatype.number({ min: prePostItemCount * 2 + 6, max: 20 });
    const currentPage = faker.datatype.number({ min: prePostItemCount + 4, max: totalPageCount });
    const props = { ...defaultProps, totalPageCount, currentPage };
    render(getComponentToRender(props));
    const separators = screen.getAllByText('...');
    expect(separators.filter((sep) => sep.attributes['classname'].value.includes('low-separator')).length).toBe(1);
  });
});
