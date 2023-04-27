import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';

import NatureOfServiceView from './NatureOfServiceView';

// **********************************************************************
// * constants

const testIds = {
  selectNatureOfServiceSection: 'select-nos-section',
  naturesOfServiceTable: 'nos-table'
};

const defaultProps = {};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <NatureOfServiceView {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./components/SelectNatureOfServiceSection', () => ({
  __esModule: true,
  default: () => <fake-select-nos-section data-testid={testIds.selectNatureOfServiceSection} />
}));

jest.mock('./components/NaturesOfServiceTable', () => ({
  __esModule: true,
  default: () => <fake-nos-table-section data-testid={testIds.naturesOfServiceTable} />
}));

// **********************************************************************
// * unit tests

describe('NatureOfServiceView', () => {
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

  it('renders SelectNatureOfServiceSection', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.selectNatureOfServiceSection)).toBeInTheDocument();
  });

  it('renders NaturesOfServiceTable', () => {
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.naturesOfServiceTable)).toBeInTheDocument();
  });
});
