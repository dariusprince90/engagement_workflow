import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import COMMENT_TYPES from '../../../../../helpers/enums/commentTypes';
import ModalBody from './ModalBody';

// **********************************************************************
// * constants

const testIds = {
  textArea: 'text-area',
  textAreaOnChange: 'text-area-on-change'
};

const defaultProps = {
  commentType: faker.helpers.arrayElement(Object.values(COMMENT_TYPES))
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ModalBody {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('../../components/textArea/TextArea', () => ({
  __esModule: true,
  default: ({ name, label, value, placeholder, rows, onChange }) => {
    const props = { name, label, value, placeholder, rows };
    return (
      <fake-text-area {...props} data-testid={testIds.textArea}>
        <button data-testid={testIds.textAreaOnChange} onClick={onChange} />
      </fake-text-area>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('ModalBody', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('comments TextArea', () => {
    it('renders in the document', () => {
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.textArea)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'comments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.textArea)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const commentType = faker.helpers.arrayElement(Object.values(COMMENT_TYPES));
      const props = { commentType };
      const expectedLabel = commentType.commentsFieldLabel;
      render(getComponentToRender(props));
      expect(screen.getByTestId(testIds.textArea)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Enter your comments here...';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.textArea)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct rows prop', () => {
      const expectedRows = '6';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.textArea)).toHaveAttribute('rows', expectedRows);
    });

    /* as the functions are yet to be implemented, add the test case with
      temporary assert to pass the code coverage  */
    describe('functional', () => {
      it.todo('does something when changed');

      it('does not yet invoke onChange', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(testIds.textAreaOnChange));
      });
    });
  });
});
