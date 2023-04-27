import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import faker from '@faker-js/faker';

import ProgressAlert from './ProgressAlert';

// **********************************************************************
// * constants

const defaultProps = {
  alertType: faker.helpers.arrayElement(['info', 'warning']),
  message: faker.datatype.string()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ProgressAlert {...props} />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('ProgressAlert', () => {
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

  it.each([{ alertType: 'info' }, { alertType: 'warning' }])(
    'sets the alert-, border-, and progress bar bg- classes to $alertType when the alertType is $alertType',
    ({ alertType }) => {
      const message = 'fixed-message';
      const props = { ...defaultProps, alertType, message };
      const tree = renderer.create(getComponentToRender(props)).toJSON();
      expect(tree).toMatchSnapshot();
    }
  );

  it('renders the message properly', () => {
    const props = { ...defaultProps, message: faker.datatype.string() };
    render(getComponentToRender(props));
    expect(screen.getByText(props.message)).toBeInTheDocument();
  });
});
