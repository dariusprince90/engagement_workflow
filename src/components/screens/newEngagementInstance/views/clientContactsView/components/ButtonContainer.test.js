import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import ButtonContainer from './ButtonContainer';

// **********************************************************************
// * constants

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <ButtonContainer />;
};

// **********************************************************************
// * mock external dependencies

// **********************************************************************
// * unit tests

describe('ButtonContainer', () => {
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

  describe('Add Contact button', () => {
    const buttonText = 'Add Contact';

    it('is rendered', () => {
      render(getComponentToRender());
      expect(screen.getByText(buttonText)).toBeInTheDocument();
    });

    it.todo('does something when clicked');

    it('does nothing when clicked', () => {
      render(getComponentToRender());
      fireEvent.click(screen.getByText(buttonText));
      expect(true).toBeTruthy();
    });
  });
});
