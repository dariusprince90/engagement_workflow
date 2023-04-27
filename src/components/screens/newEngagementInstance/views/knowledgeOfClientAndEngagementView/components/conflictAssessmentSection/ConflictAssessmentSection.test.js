import ReactDOM from 'react-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import ConflictAssessmentSection from './ConflictAssessmentSection';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form fields
  potentialConflictsExist: 'potential-conflicts-exist',
  potentialConflictComments: 'potential-conflict-comments',
  requestDopsReview: 'request-dops-review',

  // form header fields
  formHeader: 'form-header',

  // form text fields
  formText: 'form-text',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakeKnowledgeOfClientView = {
  formData: {
    potentialConflictsExist: faker.datatype.boolean(),
    potentialConflictComments: faker.random.alphaNumeric(10),
    requestDopsReview: faker.datatype.boolean()
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ConflictAssessmentSection {...props} {...hocInjectedProps} />;
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

jest.mock('../../../../newEngagementInstanceSlice', () => {
  return {
    selectCurrentView: jest.fn()
  };
});

jest.mock('../../../withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ title, children }) => {
    const props = { title, children };
    return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
  }
}));

jest.mock('../../../../../../common/formHeader/FormHeader', () => {
  return {
    __esModule: true,
    default: ({ text }) => {
      const props = { text };
      return <fake-form-header {...props} data-testid={testIds.formHeader} />;
    }
  };
});

jest.mock('../../../../components/formText/FormText', () => ({
  __esModule: true,
  default: ({ children, applyEmphasis }) => {
    const props = { children, applyEmphasis };
    return <fake-form-text {...props} data-testid={testIds.formText} />;
  }
}));

jest.mock('../../../../components/radioButtonList/RadioButtonList', () => ({
  __esModule: true,
  default: ({ name, label, options, horizontalItems, onChange, selectedValue }) => {
    const props = { name, label, horizontalItems, selectedValue };
    return (
      <fake-radio-button-list {...props} options={JSON.stringify(options)} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.radioButtonListOnChange}`} onClick={onChange} />
      </fake-radio-button-list>
    );
  }
}));

jest.mock('../../../../components/textArea/TextArea', () => ({
  __esModule: true,
  default: ({ name, label, value, placeholder, rows, onChange }) => {
    const props = { name, label, value, placeholder, rows };
    return (
      <fake-text-area {...props} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.textAreaOnChange}`} onClick={onChange} />
      </fake-text-area>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('ConflictAssessmentSection', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeKnowledgeOfClientView);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  it('renders CollapsibleFormSection component', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toBeInTheDocument();
  });

  it('renders CollapsibleFormSection with correct title prop', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', 'Conflict Assessment');
  });

  describe('initialConflicts form header', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.formHeader)).toBeInTheDocument();
    });

    it('has correct text prop', () => {
      const expectedText = 'Initial Conflicts';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.formHeader)).toHaveAttribute('text', expectedText);
    });
  });

  describe('potentialConflictsExist', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.potentialConflictsExist)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'potentialConflictsExist';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.potentialConflictsExist)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        'Are there any potential conflicts of interest in conjunction with this proposed engagement?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.potentialConflictsExist)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.potentialConflictsExist)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.potentialConflictsExist)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeKnowledgeOfClientView.formData.potentialConflictsExist;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.potentialConflictsExist)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.potentialConflictsExist}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });

  describe('potentialConflictComments', () => {
    it.each([
      { potentialConflictsExist: false },
      { potentialConflictsExist: faker.random.alphaNumeric(10) },
      { potentialConflictsExist: null }
    ])(
      'should not render when potentialConflictsExist is $potentialConflictsExist (not true)',
      ({ potentialConflictsExist }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeKnowledgeOfClientView,
          formData: {
            ...fakeKnowledgeOfClientView.formData,
            potentialConflictsExist
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.potentialConflictComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeKnowledgeOfClientView,
          formData: {
            ...fakeKnowledgeOfClientView.formData,
            potentialConflictsExist: true
          }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.potentialConflictComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'potentialConflictComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialConflictComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, describe potential conflict in detail:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialConflictComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeKnowledgeOfClientView.formData.potentialConflictComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialConflictComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialConflictComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialConflictComments)).toHaveAttribute('rows', expectedRows);
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.potentialConflictComments}-${testIds.textAreaOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
        });
      });
    });
  });

  describe('finalConflictCheckAreaDocument form text', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.formText)).toBeInTheDocument();
    });

    it('has correct applyEmphasis prop', () => {
      const expectedApplyEmphasis = 'true';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.formText)).toHaveAttribute('applyEmphasis', expectedApplyEmphasis);
    });

    it('renders correct text as children', () => {
      const expectedText =
        'Note: If conflicts arise during the approval process, use Final Conflict Check area to document them.';
      render(getComponentToRender(defaultProps));
      const formText = screen.getByTestId(testIds.formText);
      expect(within(formText).getByText(expectedText)).toBeInTheDocument();
    });
  });

  describe('requestDopsReview', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.requestDopsReview)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'requestDopsReview';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.requestDopsReview)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Do you want to request a Director of Professional Standards review?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.requestDopsReview)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.requestDopsReview)).toHaveAttribute('options', JSON.stringify(expectedOptions));
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.requestDopsReview)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeKnowledgeOfClientView.formData.requestDopsReview;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.requestDopsReview)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.requestDopsReview}-${testIds.radioButtonListOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
      });
    });
  });
});
