import ReactDOM from 'react-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import INPUT_GROUP_ADD_ON_LOCATIONS from '../../../../../helpers/enums/inputGroupAddOnLocations';
import ButtonAddOn from './ButtonAddOn';

// **********************************************************************
// * constants

const testIds = {
  addOnBase: 'add-on-base'
};

const defaultProps = {
  locationType: Object.values(INPUT_GROUP_ADD_ON_LOCATIONS)[0],
  text: faker.random.alphaNumeric(10),
  buttonClass: faker.random.alphaNumeric(10),
  disabled: faker.datatype.boolean(),
  onClick: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ButtonAddOn {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./AddOnBase', () => ({
  __esModule: true,
  default: ({ locationType, children }) => {
    const props = { children };
    return <fake-add-on-base {...props} data-testid={testIds.addOnBase} locationType={JSON.stringify(locationType)} />;
  }
}));

// **********************************************************************
// * unit tests

describe('ButtonAddOn', () => {
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

  describe('AddOnBase', () => {
    it('is rendered', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.addOnBase)).toBeInTheDocument();
    });

    it('has correct locationType', () => {
      const locationTypes = Object.values(INPUT_GROUP_ADD_ON_LOCATIONS);
      const index = faker.datatype.number({ min: 0, max: locationTypes.length - 1 });
      const locationType = locationTypes[index];
      const props = { ...defaultProps, locationType };
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.addOnBase)).toHaveAttribute('locationType', JSON.stringify(locationType));
    });
  });

  describe('button', () => {
    it('is rendered within the AddOnBase', () => {
      render(getComponentToRender(defaultProps));
      const addOnBase = screen.getByTestId(testIds.addOnBase);
      expect(within(addOnBase).getByText(defaultProps.text)).toBeInTheDocument();
    });

    it('has correct type', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByText(defaultProps.text)).toHaveAttribute('type', 'button');
    });

    it('has correct class', () => {
      const buttonClass = faker.random.alphaNumeric(10);
      const props = { ...defaultProps, buttonClass };
      render(getComponentToRender(props));
      expect(screen.getByText(defaultProps.text)).toHaveAttribute('class', buttonClass);
    });

    it('has disabled prop when disabled is true', () => {
      const disabled = true;
      const props = { ...defaultProps, disabled };
      render(getComponentToRender(props));
      expect(screen.getByText(defaultProps.text)).toHaveAttribute('disabled');
    });

    it('does not have disabled prop when disabled is false', () => {
      const disabled = false;
      const props = { ...defaultProps, disabled };
      render(getComponentToRender(props));
      expect(screen.getByText(defaultProps.text)).not.toHaveAttribute('disabled');
    });

    it('invokes onClick when the button is clicked and it is not disabled', () => {
      const onClick = jest.fn();
      const disabled = false;
      const props = { ...defaultProps, onClick, disabled };
      render(getComponentToRender(props));
      expect(onClick).not.toHaveBeenCalled();
      fireEvent.click(screen.getByText(defaultProps.text));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not invoke onClick when the button is clicked and it is disabled', () => {
      const onClick = jest.fn();
      const disabled = true;
      const props = { ...defaultProps, onClick, disabled };
      render(getComponentToRender(props));
      expect(onClick).not.toHaveBeenCalled();
      fireEvent.click(screen.getByText(defaultProps.text));
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
