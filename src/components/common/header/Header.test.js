/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import faker from '@faker-js/faker';
import { MemoryRouter } from 'react-router-dom';

import * as headerSlice from './headerSlice';
import Header from './Header';

// **********************************************************************
// * constants

const pageTitle = faker.datatype.string();
const pageSubtitle = faker.datatype.string();
const pageTitleForSnapshot = 'page title for snapshot tests';
const pageSubtitleForSnapshot = 'page subtitle for snapshot tests';
const testIds = {
  fontAwesomeIcon: 'font-awesome-icon'
};

const componentToRender = (
  <MemoryRouter>
    <Header />
  </MemoryRouter>
);

// **********************************************************************
// * mock external dependencies

jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: ({ icon, className }) => {
      return <fake-font-awesome-icon icon={icon} className={className} data-testid={testIds.fontAwesomeIcon} />;
    }
  };
});

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => {
      return callback();
    }
  };
});

jest.mock('./headerSlice');

// **********************************************************************
// * unit tests

describe('Header', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    headerSlice.selectPageTitle.mockReturnValue(pageTitle);
    headerSlice.selectPageSubtitle.mockReturnValue(pageSubtitle);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(componentToRender, div);
  });

  it('renders correctly and matches snapshot', () => {
    headerSlice.selectPageTitle.mockReturnValue(pageTitleForSnapshot);
    headerSlice.selectPageSubtitle.mockReturnValue(pageSubtitleForSnapshot);
    const tree = renderer.create(componentToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the pm logo', () => {
    render(componentToRender);
    expect(screen.getByAltText('Company logo')).toBeInTheDocument();
  });

  it('renders the help icon', () => {
    render(componentToRender);
    expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', 'fas,question-circle');
  });

  it('renders correct Help text', () => {
    const helpText = 'Best Practices and FAQs';
    render(componentToRender);
    expect(screen.getByText(helpText)).toBeInTheDocument();
  });

  it('renders correct Help link', () => {
    const helpText = 'Best Practices and FAQs';
    render(componentToRender);
    expect(screen.getByRole('link', { name: helpText })).toHaveAttribute(
      'href',
      'https://Company.sharepoint.com/sites/kshare-Internal-Accounting/Shared%20Documents/Forms/AllItems.aspx' +
        '?id=%2Fsites%2Fkshare%2DInternal%2DAccounting%2FShared%20Documents%2FNEW%20Best%20Practices%20and' +
        '%20Frequently%20Asked%20Questions%2Epdf&parent=%2Fsites%2Fkshare%2DInternal%2DAccounting%2FShared%20Documents'
    );
  });
});
