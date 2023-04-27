import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import './Pagination.scss';
import PaginationItem from './PaginationItem';
import PageSizeSelector from './PageSizeSelector';

/*
  =================================================================================================
  PAGINATION STRUCTURE
  =================================================================================================
                         [<<] [<] [1] [...] [22] [23] [*24*] [25] [26] [...] [100] [>] [>>]
                          |    |   |    |    |                      |    |     |    |    |
  jump to first page -----|    |   |    |    |                      |    |     |    |    |
                               |   |    |    |                      |    |     |    |    |
  prev page -------------------|   |    |    |                      |    |     |    |    |
                                   |    |    |                      |    |     |    |    |
  first page item -----------------|    |    |----------+-----------|    |     |    |    |
                                        |               |                |     |    |    |
  low-end separator --------------------|               |                |     |    |    |
                                                        |                |     |    |    |
  sliding block items ----------------------------------|                |     |    |    |
                                                                         |     |    |    |
  high-end separator ----------------------------------------------------|     |    |    |
                                                                               |    |    |
  last page item 00 -----------------------------------------------------------|    |    |
                                                                                    |    |
  next page ------------------------------------------------------------------------|    |
                                                                                         |
  jump to last page ---------------------------------------------------------------------|

  =================================================================================================
  PAGINATION EXAMPLES
  =================================================================================================
  * active page:                          [*1*]
  * small page count:                     [*1*] [2] [3] [4] [5] [6]
  * large page count (low active page):   [<] [*1*] [2] [3] [4] [...] [100] [>]
  * large page count (mid active page):   [<] [1] [...] [22] [23] [*24*] [25] [26] [...] [100] [>]
  * large page count (high active page):  [<] [1] [...] [97] [98] [*99*] [100] [>]
  * large page count (small display):     [<<] [<] [*24*] [>] [>>]
*/

const propTypes = {
  // the number of items per page
  pageSize: PropTypes.number.isRequired,

  // the number of the current page
  currentPage: PropTypes.number.isRequired,

  // the total number of pages
  totalPageCount: PropTypes.number.isRequired,

  // function to invoke when a page item is clicked
  onPageItemClick: PropTypes.func.isRequired,

  // function to invoke when a page size item is clicked
  onPageSizeItemClick: PropTypes.func.isRequired,

  // how many page items to show before/after the current page item
  // this controls the sliding block item count
  prePostItemCount: PropTypes.number.isRequired
};

const Pagination = ({
  pageSize,
  currentPage,
  totalPageCount,
  onPageItemClick,
  onPageSizeItemClick,
  prePostItemCount
}) => {
  // **********************************************************************
  // * constants

  // current/active page item plus the pre/post items
  const SLIDING_BLOCK_ITEM_COUNT = 1 + prePostItemCount * 2;

  // sliding block items plus first/last page items plus the (2) "..." (separator) items
  const MAX_PAGE_ITEM_COUNT = SLIDING_BLOCK_ITEM_COUNT + 4;

  // **********************************************************************
  // * component vars

  const [paginationItems, setPaginationItems] = useState([]);

  const pageIndexes = useMemo(() => {
    const indexSet = new Set();

    // if our page count is <= our max page item count
    // then, always include ALL page numbers
    // else, always include the first and last page numbers
    const alwaysIncludePageIndexes =
      totalPageCount <= MAX_PAGE_ITEM_COUNT
        ? [...Array(totalPageCount).keys()].map((ix) => ix + 1)
        : [1, totalPageCount];

    // if the current page is on the very low end (of total page count)
    // then, include all the low end numbers; we don't want a paginator like this [1] [...] [3]
    // else, don't include anything here
    const lowPageIndexes =
      currentPage <= prePostItemCount + 3
        ? [...Array(SLIDING_BLOCK_ITEM_COUNT + 2).keys()].map((ix) => Math.max(1, Math.min(totalPageCount, ix + 1)))
        : [];

    // always include the sliding block items (based on the current page)
    // e.g. pre/post count: 3, total pages: 25, current page: 1  >> [*1*][2][3][4]
    // e.g. pre/post count: 3, total pages: 25, current page: 10 >> [7][8][9][*10*][11][12][13]
    // e.g. pre/post count: 3, total pages: 25, current page: 24 >> [21][22][23][*24*][25]
    const midPageIndexes = [...Array(SLIDING_BLOCK_ITEM_COUNT).keys()].map((ix) =>
      Math.max(1, Math.min(totalPageCount, ix + (currentPage - prePostItemCount)))
    );

    // if the current page is on the very high end (of total page count)
    // then, include all the high end numbers; we don't want a paginator like this [23] [...] [25]
    // else, don't include anything here
    const highPageIndexes =
      currentPage >= totalPageCount - (prePostItemCount + 2)
        ? [...Array(SLIDING_BLOCK_ITEM_COUNT + 2).keys()].map((ix) =>
            Math.max(1, Math.min(totalPageCount, ix + (totalPageCount - (SLIDING_BLOCK_ITEM_COUNT + 1))))
          )
        : [];

    // add each of the page index arrays to the set
    alwaysIncludePageIndexes.forEach(indexSet.add, indexSet);
    lowPageIndexes.forEach(indexSet.add, indexSet);
    midPageIndexes.forEach(indexSet.add, indexSet);
    highPageIndexes.forEach(indexSet.add, indexSet);

    // convert the set to and array and sort it ascending
    return Array.from(indexSet).sort((a, b) => a - b);
  }, [MAX_PAGE_ITEM_COUNT, SLIDING_BLOCK_ITEM_COUNT, currentPage, prePostItemCount, totalPageCount]);

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  /**
   * generate the page items
   */
  useEffect(() => {
    const pageItems = [];

    const createPaginationItem = (options) => {
      return <PaginationItem {...options} />;
    };

    // create and add the "jump to first" page item to the collection
    pageItems.push(
      createPaginationItem({
        key: 'first',
        icon: ['fas', 'angle-double-left'],
        title: 'first page',
        disabled: currentPage === 1,
        className: 'd-block d-lg-none',
        onClick: () => onPageItemClick(1)
      })
    );

    // create and add the "previous" page item to the collection
    pageItems.push(
      createPaginationItem({
        key: 'prev',
        icon: ['fas', 'angle-left'],
        title: 'previous page',
        disabled: currentPage === 1,
        onClick: () => onPageItemClick(currentPage - 1)
      })
    );

    // create the individual page number items (based on the contents of the pageIndexes array)
    pageIndexes.forEach((pageIndex) => {
      // if we have more pages than we can show
      // AND we're about to render the last page number item (page index === total page count)
      // AND our current page number is NOT on the very high end
      // then, create and add the "..." separator item that comes just before the last page number item
      if (
        totalPageCount > MAX_PAGE_ITEM_COUNT &&
        pageIndex === totalPageCount &&
        currentPage < totalPageCount - (prePostItemCount + 2)
      ) {
        pageItems.push(
          createPaginationItem({
            key: `high-separator`,
            label: '...',
            disabled: true,
            className: 'd-none d-lg-block high-separator',
            onClick: null
          })
        );
      }

      // create and add the page number item to the collection
      pageItems.push(
        createPaginationItem({
          key: pageIndex,
          label: pageIndex,
          title: `page ${pageIndex}`,
          isActivePage: pageIndex === currentPage,
          className: pageIndex === currentPage ? '' : 'd-none d-lg-block',
          onClick: pageIndex === currentPage ? null : () => onPageItemClick(pageIndex)
        })
      );

      // if we have more pages than we can show
      // AND we just created the first page number item (page index === 1)
      // AND our current page number is NOT on the very low end
      // then, create and add the "..." separator item that comes just after the first page number item
      if (totalPageCount > MAX_PAGE_ITEM_COUNT && pageIndex === 1 && currentPage > prePostItemCount + 3) {
        pageItems.push(
          createPaginationItem({
            key: `low-separator`,
            label: '...',
            disabled: true,
            className: 'd-none d-lg-block low-separator',
            onClick: null
          })
        );
      }
    });

    // create and add the "next" page item to the collection
    pageItems.push(
      createPaginationItem({
        key: 'next',
        icon: ['fas', 'angle-right'],
        title: 'next page',
        disabled: currentPage === totalPageCount,
        onClick: () => onPageItemClick(currentPage + 1)
      })
    );

    // create and add the "jump to last" page item to the collection
    pageItems.push(
      createPaginationItem({
        key: 'last',
        icon: ['fas', 'angle-double-right'],
        title: 'last page',
        disabled: currentPage === totalPageCount,
        className: 'd-block d-lg-none',
        onClick: () => onPageItemClick(totalPageCount)
      })
    );

    // update the pagination items collection
    setPaginationItems(pageItems);
  }, [
    MAX_PAGE_ITEM_COUNT,
    SLIDING_BLOCK_ITEM_COUNT,
    currentPage,
    onPageItemClick,
    pageIndexes,
    prePostItemCount,
    totalPageCount
  ]);

  // **********************************************************************
  // * render

  return (
    <div className="pagination-container">
      <div className="pagination-control">
        <nav>
          <ul className="pagination">{paginationItems}</ul>
        </nav>
      </div>
      <div className="pagination-control">
        <PageSizeSelector selectedPageSize={pageSize} onPageSizeItemClick={onPageSizeItemClick} />
      </div>
    </div>
  );
};

Pagination.propTypes = propTypes;

export default Pagination;
