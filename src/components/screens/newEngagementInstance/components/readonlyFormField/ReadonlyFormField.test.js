/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import ReadonlyFormField from './ReadonlyFormField';

// **********************************************************************
// * constants

const testIds = {
  formGroup: 'form-group',
  fontAwesomeIcon: 'font-awesome-icon'
};

const defaultProps = {
  name: faker.random.alphaNumeric(10),
  label: faker.random.alphaNumeric(10),
  value: faker.random.alphaNumeric(10),
  isRow: faker.datatype.boolean(),
  icon: null
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ReadonlyFormField {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('../../../../common/formGroup/FormGroup', () => {
  return {
    __esModule: true,
    default: ({ hideLabel, isRow, name, label, children }) => {
      const props = { hideLabel, isRow, name, label, children };
      return <fake-form-group data-testid={testIds.formGroup} {...props} />;
    }
  };
});

jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: ({ icon, title, className, onClick }) => {
      const props = { icon, title, className, onClick };
      return <fake-font-awesome-icon {...props} data-testid={testIds.fontAwesomeIcon} />;
    }
  };
});

// **********************************************************************
// * unit tests

describe('ReadonlyFormField', () => {
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

  describe('FormGroup', () => {
    it('has correct isRow prop', () => {
      const isRow = faker.datatype.boolean();
      const props = { ...defaultProps, isRow };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.formGroup)).toHaveAttribute('isRow', isRow.toString());
    });

    it('has correct name prop', () => {
      const name = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, name };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.formGroup)).toHaveAttribute('name', name);
    });

    it('has correct label prop', () => {
      const label = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, label };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.formGroup)).toHaveAttribute('label', label);
    });
  });

  describe('content', () => {
    it('renders value within the form group', () => {
      const props = { ...defaultProps, value: faker.random.alphaNumeric() };
      const expectedText = props.value;
      render(getComponentToRender(props));
      const formGroup = screen.getByTestId(testIds.formGroup);
      expect(formGroup).toHaveTextContent(expectedText);
    });

    describe('icon', () => {
      it('does not render when the icon prop is null', () => {
        const props = { ...defaultProps, icon: null };
        render(getComponentToRender(props));
        expect(screen.queryByTestId(testIds.fontAwesomeIcon)).not.toBeInTheDocument();
      });

      it('renders when the icon prop is set up', () => {
        const icon = { type: faker.random.alpha(5) };
        const props = { ...defaultProps, icon };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.fontAwesomeIcon)).toBeInTheDocument();
      });

      it('has correct icon prop', () => {
        const icon = { type: faker.random.alpha(5) };
        const expectedIconProp = icon.type;
        const props = { ...defaultProps, icon };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('icon', expectedIconProp);
      });

      it('has correct title prop', () => {
        const icon = { type: faker.random.alpha(5), title: faker.random.alphaNumeric(10) };
        const expectedTitle = icon.title;
        const props = { ...defaultProps, icon };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('title', expectedTitle);
      });

      it('has correct className prop when the icon className prop is set', () => {
        const icon = { type: faker.random.alpha(5), className: faker.random.alphaNumeric(10) };
        const expectedClassName = icon.className;
        const props = { ...defaultProps, icon };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('className', expectedClassName);
      });

      it('has correct className prop when the icon has no className prop and has an onClick handler', () => {
        const icon = { type: faker.random.alpha(5), onClick: jest.fn() };
        const expectedClassName = 'icon-clickable';
        const props = { ...defaultProps, icon };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('className', expectedClassName);
      });

      it('has correct className prop when the icon className prop is set and has an onClick handler', () => {
        const icon = { type: faker.random.alpha(5), className: faker.random.alphaNumeric(10), onClick: jest.fn() };
        const expectedClassName = `${icon.className} icon-clickable`;
        const props = { ...defaultProps, icon };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.fontAwesomeIcon)).toHaveAttribute('className', expectedClassName);
      });

      it('invokes icon.onChange when clicked', () => {
        const icon = { type: faker.random.alpha(5), onClick: jest.fn() };
        const props = { ...defaultProps, icon };
        render(getComponentToRender(props));
        expect(icon.onClick).not.toHaveBeenCalled();
        fireEvent.click(screen.getByTestId(testIds.fontAwesomeIcon));
        expect(icon.onClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
