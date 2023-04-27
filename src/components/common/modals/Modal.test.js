import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import faker from '@faker-js/faker';

import * as testHelper from '../../../testing/testHelper';

import Modal, { defaultClassName } from './Modal';

// **********************************************************************
// * constants

const testIds = {
  isOpenProp: 'is-open-prop',
  onRequestCloseProp: 'on-request-close-prop',
  classNameProp: 'class-name-prop',
  title: 'modal-title',
  body: 'modal-body',
  footer: 'modal-footer',
  closeButton: 'modal-close-button'
};

const getComponentToRender = (updatedProps) => {
  const defaultProps = {
    isOpen: faker.datatype.boolean(),
    onClose: jest.fn(),
    title: faker.datatype.string(),
    body: faker.datatype.string(),
    footer: faker.datatype.string(),
    modalClassName: null
  };

  const props = { ...defaultProps, ...updatedProps };

  return <Modal {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-modal', () => {
  return {
    __esModule: true,
    default: ({ isOpen, onRequestClose, className, children }) => {
      return (
        <>
          <div data-testid={testIds.isOpenProp}>{isOpen.toString()}</div>
          <div data-testid={testIds.onRequestCloseProp} onClick={onRequestClose}></div>
          <div data-testid={testIds.classNameProp}>
            <div>{className.base}</div>
            <div>{className.afterOpen}</div>
            <div>{className.beforeClose}</div>
          </div>
          {children}
        </>
      );
    }
  };
});

// **********************************************************************
// * unit tests

describe('Modal', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  it('passes isOpen prop to isOpen of ReactModal', () => {
    const isOpen = faker.datatype.number(1) ? true : false;
    render(getComponentToRender({ isOpen }));
    expect(screen.getByTestId(testIds.isOpenProp)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.isOpenProp)).toHaveTextContent(isOpen);
  });

  it('passes onClose prop to onRequestClose of ReactModal', () => {
    // * ARRANGE
    const onClose = jest.fn();

    // * ACT
    render(getComponentToRender({ onClose }));

    // * ASSERT
    expect(screen.getByTestId(testIds.onRequestCloseProp)).toBeInTheDocument();
    fireEvent.click(screen.queryByTestId(testIds.onRequestCloseProp));
    expect(onClose).toHaveBeenCalled();
  });

  it('merges modalClassName with defaultClassName when the modalClassName prop has a value', () => {
    // * ARRANGE
    const modalClassName = {
      base: faker.datatype.string(),
      afterOpen: faker.datatype.string(),
      beforeClose: faker.datatype.string()
    };
    const expectedBase = `${defaultClassName.base} ${modalClassName.base}`;
    const expectedAfterOpen = `${defaultClassName.afterOpen} ${modalClassName.afterOpen}`;
    const expectedBeforeClose = `${defaultClassName.beforeClose} ${modalClassName.beforeClose}`;

    // * ACT
    testHelper.mockConsoleError();
    render(getComponentToRender({ modalClassName }));
    testHelper.restoreConsoleError();

    // * ASSERT
    expect(screen.getByTestId(testIds.classNameProp)).toBeInTheDocument();
    expect(screen.getByText(expectedBase)).toBeInTheDocument();
    expect(screen.getByText(expectedAfterOpen)).toBeInTheDocument();
    expect(screen.getByText(expectedBeforeClose)).toBeInTheDocument();
  });

  it('uses the default className when the modalClassName prop does not have a value', () => {
    // * ARRANGE

    // * ACT
    testHelper.mockConsoleError();
    render(getComponentToRender());
    testHelper.restoreConsoleError();

    // * ASSERT
    expect(screen.getByTestId(testIds.classNameProp)).toBeInTheDocument();
    expect(screen.getByText(defaultClassName.base)).toBeInTheDocument();
    expect(screen.getByText(defaultClassName.afterOpen)).toBeInTheDocument();
    expect(screen.getByText(defaultClassName.beforeClose)).toBeInTheDocument();
  });

  it('renders the modal title block when the title prop has a value', () => {
    const title = faker.random.words();
    render(getComponentToRender({ title }));
    expect(screen.getByTestId(testIds.title)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.title)).toHaveTextContent(title);
  });

  it('does not render the modal title block when the title prop does not have a value', () => {
    const title = null;
    render(getComponentToRender({ title }));
    expect(screen.queryByTestId(testIds.title)).not.toBeInTheDocument();
  });

  it('renders correct modal body', () => {
    const body = faker.random.words();
    render(getComponentToRender({ body }));
    expect(screen.getByTestId(testIds.body)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.body)).toHaveTextContent(body);
  });

  it('renders the modal footer block when the footer prop has a value', () => {
    const footer = faker.random.words();
    render(getComponentToRender({ footer }));
    expect(screen.getByTestId(testIds.footer)).toBeInTheDocument();
    expect(screen.getByTestId(testIds.footer)).toHaveTextContent(footer);
  });

  it('does not render the modal footer block when the footer prop does not have a value', () => {
    const footer = null;
    render(getComponentToRender({ footer }));
    expect(screen.queryByTestId(testIds.footer)).not.toBeInTheDocument();
  });

  it('invokes onClose when the close button is clicked', () => {
    // * ARRANGE
    const onClose = jest.fn();

    // * ACT
    render(getComponentToRender({ onClose }));
    fireEvent.click(screen.queryByTestId(testIds.closeButton));

    // * ASSERT
    expect(onClose).toHaveBeenCalled();
  });
});
