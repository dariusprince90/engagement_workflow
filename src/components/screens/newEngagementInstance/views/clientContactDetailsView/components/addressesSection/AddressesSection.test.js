import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import AddressesSection from './AddressesSection';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',
  buttonContainer: 'button-container',
  cardList: 'card-list'
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <AddressesSection />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('../../../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ title, children }) => {
    const props = { title, children };
    return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
  }
}));

jest.mock('./ButtonContainer', () => ({
  __esModule: true,
  default: () => <fake-button-container data-testIds={testIds.buttonContainer} />
}));

jest.mock('./CardList', () => ({
  __esModule: true,
  default: () => <fake-card-list data-testid={testIds.cardList} />
}));

// **********************************************************************
// * unit tests

describe('AddressesSection', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  it('renders the ButtonContainer above the CardList within the collapsible form section', () => {
    const tree = renderer.create(getComponentToRender()).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
