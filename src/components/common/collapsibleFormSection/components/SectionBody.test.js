/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import SectionBody from './SectionBody';

// **********************************************************************
// * constants

const testIds = {
  collapsedContent: 'collapsed-content',
  fontAwesomeIcon: 'font-awesome-icon',
  sectionBody: 'section-body'
};

const defaultProps = {
  isCollapsed: faker.datatype.boolean(),
  onCollapsedContentClick: jest.fn(),
  children: faker.random.alphaNumeric(10)
};

const getComponentToRender = (props) => {
  return <SectionBody {...props} />;
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

describe('SectionBody', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(getComponentToRender(defaultProps), div);
    });

    it('adds `collapsed` class to the section body className prop when isCollapsed is true', () => {
      const isCollapsed = true;
      const expectedClass = 'collapsed';
      const props = { ...defaultProps, isCollapsed };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.sectionBody)).toHaveClass(expectedClass);
    });

    it('removes `collapsed` class from the section body className prop when isCollapsed is false', () => {
      const isCollapsed = false;
      const expectedClass = 'collapsed';
      const props = { ...defaultProps, isCollapsed };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.sectionBody)).not.toHaveClass(expectedClass);
    });

    it('renders the children when isCollapsed is false', () => {
      const isCollapsed = false;
      const children = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, isCollapsed, children };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.sectionBody)).toHaveTextContent(children);
    });

    it('does not render the children when isCollapsed is true', () => {
      const isCollapsed = true;
      const children = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, isCollapsed, children };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.sectionBody)).not.toHaveTextContent(children);
    });

    it('renders the collapsed content when isCollapsed is true', () => {
      const isCollapsed = true;
      const props = { ...defaultProps, isCollapsed };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.collapsedContent)).toBeInTheDocument();
    });

    it('renders the correct collapsed content icon when isCollapsed is true', () => {
      const isCollapsed = true;
      const props = { ...defaultProps, isCollapsed };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', 'fas,ellipsis-h');
    });
  });

  describe('functional', () => {
    it('calls onCollapsedContentClick when the collapsed content onClick event is invoked', () => {
      // * ARRANGE
      const isCollapsed = true;
      const onCollapsedContentClick = jest.fn();
      const props = { ...defaultProps, isCollapsed, onCollapsedContentClick };

      // * ACT
      render(getComponentToRender(props));
      expect(onCollapsedContentClick).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(testIds.collapsedContent));

      // * ASSERT
      expect(onCollapsedContentClick).toHaveBeenCalledTimes(1);
    });
  });
});
