import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import PageSizeSelector from './PageSizeSelector';

// **********************************************************************
// * constants

const defaultProps = {
  selectedPageSize: 15,
  onPageSizeItemClick: jest.fn()
};

const getComponentToRender = (props) => {
  return <PageSizeSelector {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('App', () => {
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

  it('renders the "Page Size" label item as disabled', () => {
    const expectedText = 'Page Size';
    render(getComponentToRender(defaultProps));
    const element = screen.getByText(expectedText);
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('disabled');
  });

  it('renders a page size element for each of the page size options', () => {
    const expectedPageSizeOptions = [15, 25, 50, 75];
    render(getComponentToRender(defaultProps));
    expectedPageSizeOptions.forEach((pageSizeOption) => {
      expect(screen.getByText(pageSizeOption)).toBeInTheDocument();
    });
  });

  it('adds the active class to the element of the selected page size', () => {
    const selectedPageSize = 25;
    const props = { ...defaultProps, selectedPageSize };
    render(getComponentToRender(props));
    expect(screen.getByText(selectedPageSize)).toHaveClass('active');
  });

  it('adds the disabled class to the element of the selected page size', () => {
    const selectedPageSize = 25;
    const props = { ...defaultProps, selectedPageSize };
    render(getComponentToRender(props));
    expect(screen.getByText(selectedPageSize)).toHaveClass('disabled');
  });

  it('invokes onPageSizeItemClick when the page size element button is clicked and it is not the active element', () => {
    const onPageSizeItemClick = jest.fn();
    const selectedPageSize = 15;
    const props = { ...defaultProps, onPageSizeItemClick, selectedPageSize };
    render(getComponentToRender(props));
    fireEvent.click(screen.getByText('25'));
    expect(onPageSizeItemClick).toHaveBeenCalled();
  });

  it('does not invoke onPageSizeItemClick when the page size element button is clicked and it is the active element', () => {
    const onPageSizeItemClick = jest.fn();
    const selectedPageSize = 15;
    const pageSizeToClick = 25;
    const props = { ...defaultProps, onPageSizeItemClick, selectedPageSize };
    render(getComponentToRender(props));
    fireEvent.click(screen.getByText(pageSizeToClick));
    expect(onPageSizeItemClick).toHaveBeenCalled();
  });
});
