import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import FormText from './FormText';

// **********************************************************************
// * constants

const defaultProps = {
  children: faker.random.alphaNumeric(10),
  applyEmphasis: faker.datatype.boolean(),
  isLabel: faker.datatype.boolean(),
  name: faker.datatype.string()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <FormText {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('FormText', () => {
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

  it('is rendered as a div element', () => {
    const text = faker.random.alphaNumeric(10);
    const props = { ...defaultProps, children: text };
    render(getComponentToRender(props));
    const formText = screen.getByText(text);
    expect(formText.tagName).toBe('DIV');
  });

  it.each([
    { applyEmphasis: false, isLabel: false, expectedClass: 'form-text' },
    { applyEmphasis: true, isLabel: false, expectedClass: 'form-text emphasis' },
    { applyEmphasis: false, isLabel: true, expectedClass: 'form-text label' },
    { applyEmphasis: true, isLabel: true, expectedClass: 'form-text emphasis label' }
  ])(
    'has correct class name when applyEmphasis is $applyEmphasis and isLabel is $isLabel',
    ({ applyEmphasis, isLabel, expectedClass }) => {
      const text = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, applyEmphasis, isLabel, children: text };
      render(getComponentToRender(props));
      expect(screen.getByText(text).className).toBe(expectedClass);
    }
  );

  it('has correct name prop', () => {
    const name = faker.random.alphaNumeric(10);
    const text = faker.random.alphaNumeric(10);
    render(getComponentToRender({ ...defaultProps, children: text, name }));
    expect(screen.getByText(text)).toHaveAttribute('name', name);
  });

  it('renders children properly', () => {
    const text = faker.random.alphaNumeric(10);
    const props = { ...defaultProps, children: text };
    render(getComponentToRender(props));
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
