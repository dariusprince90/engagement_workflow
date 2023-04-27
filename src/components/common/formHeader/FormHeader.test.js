import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import FormHeader from './FormHeader';

// **********************************************************************
// * constants

const defaultProps = {
  text: faker.random.alphaNumeric(10)
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <FormHeader {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('FormHeader', () => {
  it('renders without crashing', () => {
    render(getComponentToRender(defaultProps));
  });

  it('is rendered as a H5 element', () => {
    render(getComponentToRender(defaultProps));
    const header = screen.getByText(defaultProps.text);
    expect(header.tagName).toBe('H5');
  });

  it('has correct class', () => {
    render(getComponentToRender(defaultProps));
    const header = screen.getByText(defaultProps.text);
    expect(header).toHaveClass('form-header');
  });

  it('has correct name prop', () => {
    const name = faker.random.alphaNumeric(10);
    const text = faker.random.alphaNumeric(10);
    const props = { ...defaultProps, text, name };
    render(getComponentToRender(props));
    expect(screen.getByText(text)).toHaveAttribute('name', name);
  });

  it('renders text properly', () => {
    const text = faker.random.alphaNumeric(10);
    const props = { ...defaultProps, text };
    render(getComponentToRender(props));
    expect(screen.getByText(props.text)).toBeInTheDocument();
  });
});
