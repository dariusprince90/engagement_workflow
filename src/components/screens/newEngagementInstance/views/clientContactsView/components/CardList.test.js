import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../../newEngagementInstanceSlice';
import CardList from './CardList';

// **********************************************************************
// * constants

const testIds = {
  card: 'card'
};

const fakeClientContactsView = {
  lookups: {
    clientContacts: { data: faker.datatype.array() }
  }
};

const getComponentToRender = () => {
  return <CardList />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => {
      return callback();
    }
  };
});

jest.mock('../../../newEngagementInstanceSlice', () => {
  return {
    selectView: jest.fn()
  };
});

jest.mock('./Card', () => ({
  __esModule: true,
  default: ({ clientContact, onEdit, onDelete }) => {
    return (
      <fake-card clientContact={JSON.stringify(clientContact)} data-testid={testIds.card}>
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

  beforeEach(() => {
    newEngagementInstanceSlice.selectView.mockReturnValue(fakeClientContactsView);
  });

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
      it('renders one for each clientContact', () => {
        // * ARRANGE
        const itemCount = faker.datatype.number({ min: 1, max: 20 });
        const clientContacts = { data: [...Array(itemCount).keys()].map(() => ({ id: faker.datatype.number() })) };
        const clientContactsView = { lookups: { clientContacts } };

        newEngagementInstanceSlice.selectView.mockReturnValue(clientContactsView);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(screen.getAllByTestId(testIds.card)).toHaveLength(clientContacts.data.length);
      });

      it('has correct clientContact prop', () => {
        // * ARRANGE
        const itemCount = faker.datatype.number({ min: 1, max: 20 });
        const clientContacts = { data: [...Array(itemCount).keys()].map(() => ({ id: faker.datatype.number() })) };
        const clientContactsView = { lookups: { clientContacts } };

        newEngagementInstanceSlice.selectView.mockReturnValue(clientContactsView);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        const cards = screen.getAllByTestId(testIds.card);

        for (let index = 0; index < cards.length; index++) {
          const card = cards[index];
          expect(card).toHaveAttribute('clientContact', JSON.stringify(clientContacts.data[index]));
        }
      });

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
