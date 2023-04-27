import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import MessageTableRow from './MessageTableRow';

// **********************************************************************
// * constants

const testIds = {
  tableRow: 'table-row',
  tableCol: 'table-col'
};

const defaultProps = {
  rowClassName: faker.lorem.word(),
  colSpan: faker.datatype.number(),
  childrenProp: faker.lorem.sentence()
};

const table = document.createElement('table');
const tableBody = document.createElement('tbody');

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('MessageTableRow', () => {
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
    const props = { ...defaultProps, children: defaultProps.childrenProp };
    ReactDOM.render(<MessageTableRow {...props} />, tableBody);
  });

  it('has data-message-row attribute', () => {
    const props = { ...defaultProps, children: defaultProps.childrenProp };
    const expected = 'data-message-row';
    render(<MessageTableRow {...props} />, { container: tableBody });
    expect(screen.getByTestId(testIds.tableRow)).toHaveAttribute(expected);
  });

  it('passes correct className prop to tr element', () => {
    const props = { ...defaultProps, children: defaultProps.childrenProp };
    render(<MessageTableRow {...props} />, { container: tableBody });
    expect(screen.getByTestId(testIds.tableRow)).toHaveClass(defaultProps.rowClassName);
  });

  it('passes correct colSpan prop to td element', () => {
    const props = { ...defaultProps, children: defaultProps.childrenProp };
    render(<MessageTableRow {...props} />, { container: tableBody });
    expect(screen.getByTestId(testIds.tableCol)).toHaveAttribute('colSpan', defaultProps.colSpan.toString());
  });

  it('renders correct message prop', () => {
    const props = { ...defaultProps, children: defaultProps.childrenProp };
    render(<MessageTableRow {...props} />, { container: tableBody });
    expect(screen.getByText(defaultProps.childrenProp)).toBeInTheDocument();
  });
});
