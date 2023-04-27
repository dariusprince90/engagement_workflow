import ReactDOM from 'react-dom';
import { render, screen, fireEvent, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import FinalApprovalSection from './FinalApprovalSection';
import newEngagementInstanceSlice from '../../../../../newEngagementInstance/newEngagementInstanceSlice';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form fields
  potentialConflictsIdentified: 'potential-conflicts-identified',
  potentialConflictsIdentifiedComments: 'potential-conflicts-identified-comments',
  conclusionOnWhetherConflictExists: 'conclusion-on-whether-conflict-exists',
  noConflictComments: 'no-conflict-comments',
  conflictResolutionComments: 'conflict-resolution-comments',
  finalApprovalComments: 'final-approval-comments',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakeFinalApprovalSection = {
  formData: {
    potentialConflictsIdentified: faker.datatype.boolean(),
    potentialConflictsIdentifiedComments: faker.random.alphaNumeric(10),
    conclusionOnWhetherConflictExists: faker.datatype.boolean(),
    noConflictComments: faker.random.alphaNumeric(10),
    conflictResolutionComments: faker.random.alphaNumeric(10),
    finalApprovalComments: faker.random.alphaNumeric(10)
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <FinalApprovalSection {...props} {...hocInjectedProps} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => callback(),
    useDispatch: () => jest.fn()
  };
});

jest.mock('../../../withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../newEngagementInstanceSlice', () => {
  return {
    selectCurrentView: jest.fn()
  };
});

jest.mock('../../../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ title, children }) => (
    <fake-collapsible-form-section title={title} children={children} data-testid={testIds.collapsibleFormSection} />
  )
}));

jest.mock('../../../../components/radioButtonList/RadioButtonList', () => ({
  __esModule: true,
  default: ({ name, label, options, horizontalItems, selectedValue, onChange }) => {
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
  default: ({ name, label, placeholder, value, rows, onChange }) => {
    const props = { name, label, placeholder, value, rows };
    return (
      <fake-text-area {...props} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.textAreaOnChange}`} onClick={onChange} />
      </fake-text-area>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('FinalApprovalSection', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeFinalApprovalSection);
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
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toBeInTheDocument();
  });

  it('passes correct title prop to CollapsibleFormSection component', () => {
    const expectedTitle = 'Final Approval';
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
  });

  describe('potentialConflictsIdentified', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.potentialConflictsIdentified)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'potentialConflictsIdentified';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.potentialConflictsIdentified)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Have any potential conflicts been identified during the acceptance process?';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.potentialConflictsIdentified)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options props', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.potentialConflictsIdentified)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems props', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.potentialConflictsIdentified)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue props', () => {
      const expectedSelectedValue = fakeFinalApprovalSection.formData.potentialConflictsIdentified;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.potentialConflictsIdentified)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.potentialConflictsIdentified}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('potentialConflictsIdentifiedComments', () => {
    it.each([
      { potentialConflictsIdentified: false },
      { potentialConflictsIdentified: null },
      { potentialConflictsIdentified: faker.datatype.string() }
    ])(
      'should not render textarea when potentialConflictsIdentified is not true',
      ({ potentialConflictsIdentified }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeFinalApprovalSection,
          formData: { ...fakeFinalApprovalSection.formData, potentialConflictsIdentified }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.potentialConflictsIdentifiedComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeFinalApprovalSection,
          formData: {
            ...fakeFinalApprovalSection.formData,
            potentialConflictsIdentified: true
          }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender());
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.potentialConflictsIdentifiedComments)
        ).toBeInTheDocument();
      });

      it('should render textarea when potentialConflictsIdentified is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialConflictsIdentifiedComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'potentialConflictsIdentifiedComments';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.potentialConflictsIdentifiedComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Describe the potential conflicts in detail';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.potentialConflictsIdentifiedComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.potentialConflictsIdentifiedComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeFinalApprovalSection.formData.potentialConflictsIdentifiedComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialConflictsIdentifiedComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.potentialConflictsIdentifiedComments)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.potentialConflictsIdentifiedComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('conclusionOnWhetherConflictExists', () => {
    it.each([
      { potentialConflictsIdentified: false },
      { potentialConflictsIdentified: null },
      { potentialConflictsIdentified: faker.datatype.string() }
    ])(
      'should not render radio button when potentialConflictsIdentified is not true',
      ({ potentialConflictsIdentified }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeFinalApprovalSection,
          formData: { ...fakeFinalApprovalSection.formData, potentialConflictsIdentified }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.conclusionOnWhetherConflictExists)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeFinalApprovalSection,
          formData: {
            ...fakeFinalApprovalSection.formData,
            potentialConflictsIdentified: true
          }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender());
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.conclusionOnWhetherConflictExists)
        ).toBeInTheDocument();
      });

      it('should render radio button when potentialConflictsIdentified is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.conclusionOnWhetherConflictExists)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'conclusionOnWhetherConflictExists';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.conclusionOnWhetherConflictExists)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel =
          'Conclusions and basis for conclusions as to whether a conflict(s) exists. ' +
          'No conflict of interest exists / The described situation does ' +
          'create a conflict of interest ';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.conclusionOnWhetherConflictExists)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct options props', () => {
        const expectedOptions = YesNoRadioButtonListOptions;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.conclusionOnWhetherConflictExists)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      it('has correct horizontalItems props', () => {
        const expectedHorizontalItems = true;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.conclusionOnWhetherConflictExists)).toHaveAttribute(
          'horizontalItems',
          expectedHorizontalItems.toString()
        );
      });

      it('has correct selectedValue props', () => {
        const expectedSelectedValue = fakeFinalApprovalSection.formData.conclusionOnWhetherConflictExists;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.conclusionOnWhetherConflictExists)).toHaveAttribute(
          'selectedValue',
          expectedSelectedValue.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.conclusionOnWhetherConflictExists}-${testIds.radioButtonListOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('noConflictComments', () => {
    it.each([
      { potentialConflictsIdentified: false, conclusionOnWhetherConflictExists: false },
      { potentialConflictsIdentified: true, conclusionOnWhetherConflictExists: true },
      { potentialConflictsIdentified: true, conclusionOnWhetherConflictExists: null },
      { potentialConflictsIdentified: null, conclusionOnWhetherConflictExists: null }
    ])(
      'should not render when potentialConflictsIdentified is $potentialConflictsIdentified and ' +
        'conclusionOnWhetherConflictExists is $conclusionOnWhetherConflictExists',
      ({ potentialConflictsIdentified, conclusionOnWhetherConflictExists }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeFinalApprovalSection,
          formData: {
            ...fakeFinalApprovalSection.formData,
            potentialConflictsIdentified,
            conclusionOnWhetherConflictExists
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.noConflictComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeFinalApprovalSection,
          formData: {
            ...fakeFinalApprovalSection.formData,
            potentialConflictsIdentified: true,
            conclusionOnWhetherConflictExists: false
          }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender());
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.noConflictComments)).toBeInTheDocument();
      });

      it('should render when potentialConflictsIdentified is true & conclusionOnWhetherConflictExists is false', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialConflictsIdentifiedComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'noConflictComments';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.noConflictComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If No conflict Basis for "No Conflict" conclusion';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.noConflictComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.noConflictComments)).toHaveAttribute('placeholder', expectedPlaceHolder);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeFinalApprovalSection.formData.noConflictComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.noConflictComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.noConflictComments)).toHaveAttribute('rows', expectedRows.toString());
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.noConflictComments}-${testIds.textAreaOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('conflictResolutionComments', () => {
    it.each([
      { potentialConflictsIdentified: false, conclusionOnWhetherConflictExists: false },
      { potentialConflictsIdentified: true, conclusionOnWhetherConflictExists: false },
      { potentialConflictsIdentified: false, conclusionOnWhetherConflictExists: true },
      { potentialConflictsIdentified: false, conclusionOnWhetherConflictExists: null },
      { potentialConflictsIdentified: null, conclusionOnWhetherConflictExists: null }
    ])(
      'should not render when potentialConflictsIdentified is $potentialConflictsIdentified and ' +
        'conclusionOnWhetherConflictExists is $conclusionOnWhetherConflictExists',
      ({ potentialConflictsIdentified, conclusionOnWhetherConflictExists }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeFinalApprovalSection,
          formData: {
            ...fakeFinalApprovalSection.formData,
            potentialConflictsIdentified,
            conclusionOnWhetherConflictExists
          }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.conflictResolutionComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeFinalApprovalSection,
          formData: {
            ...fakeFinalApprovalSection.formData,
            potentialConflictsIdentified: true,
            conclusionOnWhetherConflictExists: true
          }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender());
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(within(collapsibleFormSection).getByTestId(testIds.conflictResolutionComments)).toBeInTheDocument();
      });

      it('should render textarea when potentialConflictsIdentified is true & conclusionOnWhetherConflictExists is false', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.potentialConflictsIdentifiedComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'conflictResolutionComments';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.conflictResolutionComments)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If Conflict Describe if and how the Conflict can be resolved';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.conflictResolutionComments)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.conflictResolutionComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeFinalApprovalSection.formData.conflictResolutionComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.conflictResolutionComments)).toHaveAttribute('value', expectedValue);
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.conflictResolutionComments)).toHaveAttribute('rows', expectedRows.toString());
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(screen.getByTestId(`${testIds.conflictResolutionComments}-${testIds.textAreaOnChange}`));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('finalApprovalComments', () => {
    it('renders finalApprovalComments inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.finalApprovalComments)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'finalApprovalComments';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.finalApprovalComments)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Explanations / Commentary relevant to Final Approval/Rejection';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.finalApprovalComments)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.finalApprovalComments)).toHaveAttribute('placeholder', expectedPlaceHolder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeFinalApprovalSection.formData.finalApprovalComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.finalApprovalComments)).toHaveAttribute('value', expectedValue);
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.finalApprovalComments)).toHaveAttribute('rows', expectedRows.toString());
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.finalApprovalComments}-${testIds.textAreaOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });
});
