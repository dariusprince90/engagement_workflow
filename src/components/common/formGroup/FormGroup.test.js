import ReactDOM from 'react-dom';
import { render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import DYNAMIC_ALERT_TYPES from '../../../helpers/enums/dynamicAlertTypes';
import FormGroup from './FormGroup';

// **********************************************************************
// * constants

const testIds = {
  formGroup: 'form-group',
  label: 'label',
  childrenContainer: 'children-container',
  dynamicAlert: 'dynamic-alert'
};

const defaultProps = {
  name: faker.random.alphaNumeric(10),
  label: faker.random.alphaNumeric(10),
  isRow: faker.datatype.boolean(),
  hideLabel: faker.datatype.boolean(),
  children: faker.random.alphaNumeric(10),
  dynamicAlert: null
};

const getComponentToRender = (props) => {
  return <FormGroup {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./DynamicAlert', () => ({
  __esModule: true,
  default: () => <fake-dynamic-alert data-testid={testIds.dynamicAlert} />
}));

// **********************************************************************
// * unit tests

describe('FormGroup', function () {
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

  describe('form-group', () => {
    it('has correct className when isRow is false', () => {
      const isRow = false;
      const props = { ...defaultProps, isRow };
      const expected = 'form-group';
      render(getComponentToRender(props));
      expect(screen.queryByTestId(testIds.formGroup).className).toBe(expected);
    });

    it('has correct className when isRow is true', () => {
      const isRow = true;
      const props = { ...defaultProps, isRow };
      const expected = 'form-group row';
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.formGroup).className).toBe(expected);
    });
  });

  describe('label', () => {
    it('does not render when hideLabel is true', () => {
      const hideLabel = true;
      const props = { ...defaultProps, hideLabel };
      render(getComponentToRender(props));
      expect(screen.queryByTestId(testIds.label)).not.toBeInTheDocument();
    });

    it('renders when hideLabel is false', () => {
      const hideLabel = false;
      const props = { ...defaultProps, hideLabel };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.label)).toBeInTheDocument();
    });

    it('has correct className when isRow is false', () => {
      const hideLabel = false;
      const isRow = false;
      const props = { ...defaultProps, isRow, hideLabel };
      const expected = 'col-form-label';
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.label).className).toBe(expected);
    });

    it('has correct className when isRow is true', () => {
      const hideLabel = false;
      const isRow = true;
      const props = { ...defaultProps, isRow, hideLabel };
      const expected = 'col-form-label col-lg-5 text-lg-right';
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.label).className).toBe(expected);
    });

    it('has the `for` attribute value set with the name prop', () => {
      const hideLabel = false;
      const name = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, name, hideLabel };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.label)).toHaveAttribute('for', name);
    });

    it('sets the children property of the label with the label prop', () => {
      // * ARRANGE
      const hideLabel = false;
      const label = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, label, hideLabel };

      // * ACT
      render(getComponentToRender(props));

      // * ASSERT
      const renderedLabel = screen.getByTestId(testIds.label);
      expect(within(renderedLabel).getByText(label)).toBeInTheDocument();
    });
  });

  describe('children', () => {
    describe('children-container', () => {
      it('renders when isRow is true', () => {
        const isRow = true;
        const props = { ...defaultProps, isRow };
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.childrenContainer)).toBeInTheDocument();
      });

      it('does not render when isRow is false', () => {
        const isRow = false;
        const props = { ...defaultProps, isRow };
        render(getComponentToRender(props));
        expect(screen.queryByTestId(testIds.childrenContainer)).not.toBeInTheDocument();
      });

      it('has correct className when hideLabel is false', () => {
        const isRow = true;
        const hideLabel = false;
        const props = { ...defaultProps, isRow, hideLabel };
        const expected = 'col-lg-7';
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.childrenContainer).className).toBe(expected);
      });

      it('has correct className when hideLabel is true', () => {
        const isRow = true;
        const hideLabel = true;
        const props = { ...defaultProps, isRow, hideLabel };
        const expected = 'col-lg-7 offset-lg-5';
        render(getComponentToRender(props));
        expect(screen.getByTestId(testIds.childrenContainer).className).toBe(expected);
      });

      it('sets the children property of the children container with the children prop', () => {
        // * ARRANGE
        const isRow = true;
        const children = faker.random.alphaNumeric(10);
        const props = { ...defaultProps, children, isRow };

        // * ACT
        render(getComponentToRender(props));

        // * ASSERT
        const renderedChildrenContainer = screen.getByTestId(testIds.childrenContainer);
        expect(within(renderedChildrenContainer).getByText(children)).toBeInTheDocument();
      });
    });

    it('renders the children when isRow is false', () => {
      // * ARRANGE
      const isRow = false;
      const children = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, children, isRow };

      // * ACT
      render(getComponentToRender(props));

      // * ASSERT
      const renderedFormGroup = screen.getByTestId(testIds.formGroup);
      expect(within(renderedFormGroup).getByText(children)).toBeInTheDocument();
    });
  });

  describe('DynamicAlert', () => {
    it('renders when dynamicAlert has a value and isRow is false', () => {
      const dynamicAlert = {
        type: Object.values(DYNAMIC_ALERT_TYPES)[0],
        message: faker.random.alphaNumeric(10)
      };
      const isRow = false;
      const props = { ...defaultProps, isRow, dynamicAlert };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.dynamicAlert)).toBeInTheDocument();
    });

    it('renders in the children-container when dynamicAlert has a value and isRow is true', () => {
      const dynamicAlert = {
        type: Object.values(DYNAMIC_ALERT_TYPES)[0],
        message: faker.random.alphaNumeric(10)
      };
      const isRow = true;
      const props = { ...defaultProps, isRow, dynamicAlert };
      render(getComponentToRender(props));
      const renderedChildrenContainer = screen.getByTestId(testIds.childrenContainer);
      expect(within(renderedChildrenContainer).getByTestId(testIds.dynamicAlert)).toBeInTheDocument();
    });

    it('does not render when dynamicAlert has no value', () => {
      const dynamicAlert = null;
      const props = { ...defaultProps, dynamicAlert };
      render(getComponentToRender(props));
      expect(screen.queryByTestId(testIds.dynamicAlert)).not.toBeInTheDocument();
    });
  });
});
