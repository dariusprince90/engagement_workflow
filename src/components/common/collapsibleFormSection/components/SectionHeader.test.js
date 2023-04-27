/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import SectionHeader from './SectionHeader';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon',
  sectionHeader: 'section-header'
};

const defaultProps = {
  title: faker.random.alphaNumeric(10),
  onClick: jest.fn(),
  isCollapsed: faker.datatype.boolean()
};

const getComponentToRender = (props) => {
  return <SectionHeader {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: ({ icon }) => {
      return <fake-font-awesome-icon icon={icon} data-testid={testIds.fontAwesomeIcon} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('SectionHeader', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(getComponentToRender(defaultProps), div);
    });

    it('renders title text in the title container', () => {
      // * ARRANGE
      const title = faker.random.alphaNumeric(10);
      const expectedClass = 'title';
      const props = { ...defaultProps, title };

      // * ACT
      render(getComponentToRender(props));

      // * ASSERT
      const titleElement = screen.getByText(props.title);
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveClass(expectedClass);
    });

    it('renders the caret-up icon when isCollapsed is true', () => {
      const isCollapsed = true;
      const props = { ...defaultProps, isCollapsed };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', 'fas,caret-up');
    });

    it('renders the caret-down icon when isCollapsed is false', () => {
      const isCollapsed = false;
      const props = { ...defaultProps, isCollapsed };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', 'fas,caret-down');
    });
  });

  describe('functional', () => {
    it('calls the onClick prop when the section header onClick event is invoked', () => {
      // * ARRANGE
      const onClick = jest.fn();
      const props = { ...defaultProps, onClick };

      // * ACT
      render(getComponentToRender(props));
      expect(props.onClick).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.sectionHeader));

      // * ASSERT
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
