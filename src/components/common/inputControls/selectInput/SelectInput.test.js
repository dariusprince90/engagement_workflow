import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import SelectInput from './SelectInput';

// **********************************************************************
// * constants

const testIds = {
  selectInput: 'select-input',
  defaultOption: 'default-option'
};

const defaultProps = {
  name: faker.datatype.string(),
  value: faker.datatype.string(),
  defaultOption: faker.datatype.string(),
  options: [...Array(faker.datatype.number({ min: 5, max: 10 })).keys()].map(() => ({
    value: faker.datatype.string(),
    text: faker.datatype.string()
  })),
  onChange: jest.fn(),
  isLoading: false,
  loadingText: faker.datatype.string(),
  disabled: false
};

const getComponentToRender = (props) => {
  return <SelectInput {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('SelectInput', () => {
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

  it('renders with correct name attribute', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('name', defaultProps.name);
  });

  it('renders with correct id attribute', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('id', defaultProps.name);
  });

  it('selects the correct option when value has a value', () => {
    const optionIndex = faker.datatype.number({ min: 1, max: defaultProps.options.length - 1 });
    const value = defaultProps.options[optionIndex].value;
    const props = { ...defaultProps, value };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.selectInput).value).toBe(value);
  });

  it('selects the first option when value does not have a value', () => {
    const value = '';
    const props = { ...defaultProps, value };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.selectInput).selectedIndex).toBe(0);
  });

  it('invokes onChange (prop) when the onChange event is triggered', () => {
    expect(defaultProps.onChange).not.toHaveBeenCalled();
    render(getComponentToRender(defaultProps));
    fireEvent.change(screen.getByTestId(testIds.selectInput));
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('invokes onChange (prop) when the onChange event is triggered 2', () => {
    expect(defaultProps.onChange).not.toHaveBeenCalled();
    render(getComponentToRender(defaultProps));
    fireEvent.change(screen.getByTestId(testIds.selectInput));
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('has the disabled attribute when disabled is true and isLoading is false', () => {
    const props = { ...defaultProps, disabled: true, isLoading: false };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('disabled');
  });

  it('has the disabled attribute when disabled is false and isLoading is true', () => {
    const props = { ...defaultProps, disabled: false, isLoading: true };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.selectInput)).toHaveAttribute('disabled');
  });

  it('does not have the disabled attribute when both disabled is false and isLoading is false', () => {
    const props = { ...defaultProps, disabled: false, isLoading: false };
    render(getComponentToRender(props));
    expect(screen.getByTestId(testIds.selectInput)).not.toHaveAttribute('disabled');
  });

  it('renders the loading option with loadingText when isLoading is true and loadingText has a value', () => {
    const props = { ...defaultProps, isLoading: true, loadingText: faker.datatype.string() };
    const expectedValue = '[loading]';
    render(getComponentToRender(props));
    const element = screen.getByText(props.loadingText);
    expect(element).toBeInTheDocument();
    expect(element.value).toBe(expectedValue);
  });

  it('renders the loading option with with default text when isLoading is true and loadingText does not have a value', () => {
    const props = { ...defaultProps, isLoading: true, loadingText: null };
    const defaultText = 'Loading...';
    const expectedValue = '[loading]';
    render(getComponentToRender(props));
    const element = screen.getByText(defaultText);
    expect(element).toBeInTheDocument();
    expect(element.value).toBe(expectedValue);
  });

  it('does not render the loading option when isLoading is false', () => {
    const props = { ...defaultProps, isLoading: false, loadingText: faker.datatype.string() };
    const defaultText = 'Loading...';
    render(getComponentToRender(props));
    expect(screen.queryByText(defaultText)).not.toBeInTheDocument();
    expect(screen.queryByText(props.loadingText)).not.toBeInTheDocument();
  });

  it('renders the default option when defaultOption has a value and isLoading is false', () => {
    const props = { ...defaultProps, isLoading: false, defaultOption: faker.datatype.string() };
    render(getComponentToRender(props));
    const element = screen.getByTestId(testIds.defaultOption);
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(props.defaultOption);
    expect(element).toHaveAttribute('value', '');
  });

  it('does not render the default option when defaultOption has a value and isLoading is true', () => {
    const props = { ...defaultProps, isLoading: true, defaultOption: faker.datatype.string() };
    render(getComponentToRender(props));
    const element = screen.queryByTestId(testIds.defaultOption);
    expect(element).not.toBeInTheDocument();
  });

  it('does not render the default option when defaultOption does not have a value', () => {
    const props = { ...defaultProps, isLoading: false, defaultOption: null };
    render(getComponentToRender(props));
    const element = screen.queryByTestId(testIds.defaultOption);
    expect(element).not.toBeInTheDocument();
  });

  it('renders an option for each item in the options array', () => {
    render(getComponentToRender(defaultProps));

    defaultProps.options.forEach((item) => {
      expect(screen.getByText(item.text)).toBeInTheDocument();
    });
  });
});
