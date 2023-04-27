/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import CollapsibleFormSection from './CollapsibleFormSection';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',
  sectionHeader: 'section-header',
  sectionBody: 'section-body'
};

const defaultProps = {
  id: faker.random.alpha(10),
  children: faker.random.alphaNumeric(10),
  title: faker.random.alphaNumeric(10)
};

const getComponentToRender = (props) => {
  return <CollapsibleFormSection {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./components/SectionHeader', () => {
  return {
    __esModule: true,
    default: ({ title, isCollapsed, onClick }) => {
      return (
        <fake-section-header
          data-testid={testIds.sectionHeader}
          data-title={title}
          data-is-collapsed={isCollapsed}
          onClick={onClick}
        />
      );
    }
  };
});

jest.mock('./components/SectionBody', () => {
  return {
    __esModule: true,
    default: ({ isCollapsed, onCollapsedContentClick, children }) => {
      return (
        <fake-section-body
          data-testid={testIds.sectionBody}
          data-is-collapsed={isCollapsed}
          data-children={children}
          onClick={onCollapsedContentClick}
        />
      );
    }
  };
});

// **********************************************************************
// * unit tests

describe('CollapsibleFormSection', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('rendering', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(getComponentToRender(defaultProps), div);
    });

    it('has correct id', () => {
      const props = { ...defaultProps, id: faker.random.alpha(10) };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('id', props.id);
    });

    it('passes the title prop to the section header title prop', () => {
      const props = { ...defaultProps, title: faker.random.alphaNumeric(10) };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.sectionHeader)).toHaveAttribute('data-title', props.title);
    });

    it('passes the default isCollapsed state value the section header isCollapsed prop', () => {
      const expected = false.toString();
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.sectionHeader)).toHaveAttribute('data-is-collapsed', expected);
    });

    it('passes the default isCollapsed state value the section body isCollapsed prop', () => {
      const expected = false.toString();
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.sectionBody)).toHaveAttribute('data-is-collapsed', expected);
    });

    it('passes the children prop to the section body children prop', () => {
      const childrenString = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, children: childrenString };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.sectionBody)).toHaveAttribute('data-children', childrenString);
    });
  });

  describe('functional', () => {
    it('toggles isCollapsed when the section header onClick event is invoked', () => {
      // * ARRANGE
      const expectedBeforeEvent = false.toString();
      const expectedAfterEvent = true.toString();

      // * ACT
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.sectionHeader)).toHaveAttribute('data-is-collapsed', expectedBeforeEvent);
      expect(screen.getByTestId(testIds.sectionBody)).toHaveAttribute('data-is-collapsed', expectedBeforeEvent);
      fireEvent.click(screen.getByTestId(testIds.sectionHeader));

      // * ASSERT
      expect(screen.getByTestId(testIds.sectionHeader)).toHaveAttribute('data-is-collapsed', expectedAfterEvent);
      expect(screen.getByTestId(testIds.sectionBody)).toHaveAttribute('data-is-collapsed', expectedAfterEvent);
    });

    it('toggles isCollapsed when the section body onCollapsedContentClick event is invoked', () => {
      // * ARRANGE
      const expectedBeforeEvent = false.toString();
      const expectedAfterEvent = true.toString();

      // * ACT
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.sectionHeader)).toHaveAttribute('data-is-collapsed', expectedBeforeEvent);
      expect(screen.getByTestId(testIds.sectionBody)).toHaveAttribute('data-is-collapsed', expectedBeforeEvent);
      fireEvent.click(screen.getByTestId(testIds.sectionBody));

      // * ASSERT
      expect(screen.getByTestId(testIds.sectionHeader)).toHaveAttribute('data-is-collapsed', expectedAfterEvent);
      expect(screen.getByTestId(testIds.sectionBody)).toHaveAttribute('data-is-collapsed', expectedAfterEvent);
    });
  });
});
