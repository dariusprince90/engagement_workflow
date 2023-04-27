import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import UploadProgressAlert from './UploadProgressAlert';

// **********************************************************************
// * constants

const defaultProps = {
  percentComplete: faker.datatype.number()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <UploadProgressAlert {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('UploadProgressAlert', () => {
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

  it('renders the display message properly', () => {
    const expectedDisplayText = 'Uploading attachment...';
    render(getComponentToRender(defaultProps));
    expect(screen.getByText(expectedDisplayText)).toBeInTheDocument();
  });

  it('renders the percentComplete properly', () => {
    const props = { ...defaultProps, percentComplete: faker.datatype.number({ min: 0, max: 100 }) };
    const expectedPercentCompleteText = `${props.percentComplete}%`;
    render(getComponentToRender(props));
    expect(screen.getByText(expectedPercentCompleteText)).toBeInTheDocument();
  });

  it('renders the progress bar with correct width', () => {
    const props = { ...defaultProps, percentComplete: faker.datatype.number({ min: 0, max: 100 }) };
    const expectedPercentCompleteText = `${props.percentComplete}%`;
    const expectedStyle = `width: ${props.percentComplete}%;`;
    render(getComponentToRender(props));
    expect(screen.getByText(expectedPercentCompleteText)).toHaveAttribute('style', expectedStyle);
  });
});
