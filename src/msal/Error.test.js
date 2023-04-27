import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import faker from '@faker-js/faker';

import Error from './Error';

// **********************************************************************
// * constants

const error = {
  property1: faker.random.alphaNumeric(),
  property2: faker.random.words()
};

const errorForSnapshot = {
  property1: 12345,
  property2: 'This is a mock message for the snapshot tests.'
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('AppLoader', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Error error={error} />, div);
  });

  it('renders correct layout', () => {
    const tree = renderer.create(<Error error={errorForSnapshot} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
