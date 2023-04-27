import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import CardList from './CardList';

// **********************************************************************
// * constants

const testIds = {
  card: 'card'
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <CardList />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('./Card', () => ({
  __esModule: true,
  default: ({ clientContactAddress, onEdit, onDelete }) => {
    const props = { clientContactAddress };
    return (
      <fake-card {...props} data-testid={testIds.card}>
        <button onClick={onEdit}>edit button</button>
        <button onClick={onDelete}>delete button</button>
      </fake-card>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('CardList', () => {
  // **********************************************************************
  // * setup

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('rendering', () => {
    it('renders without crashing', function () {
      const div = document.createElement('div');
      ReactDOM.render(getComponentToRender(), div);
    });

    describe('Cards', () => {
      it('renders one for each clientContactAddress', () => {
        // ! current list is hard-coded in the component
        const expectedCount = 4;
        render(getComponentToRender());
        expect(screen.getAllByTestId(testIds.card)).toHaveLength(expectedCount);
      });

      it.todo('has correct clientContactAddress prop');

      it.todo('does something when onEdit is invoked');

      it('does nothing when onEdit is invoked', () => {
        render(getComponentToRender());
        const firstEditButton = screen.getAllByText('edit button')[0];
        fireEvent.click(firstEditButton);
        expect(true).toBeTruthy();
      });

      it.todo('does something when onDelete is invoked');

      it('does nothing when onDelete is invoked', () => {
        render(getComponentToRender());
        const firstDeleteButton = screen.getAllByText('delete button')[0];
        fireEvent.click(firstDeleteButton);
        expect(true).toBeTruthy();
      });
    });
  });
});
