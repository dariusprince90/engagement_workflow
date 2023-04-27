import ReactDOM from 'react-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import YesNoRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';
import ConclusionSection from './ConclusionSection';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form fields
  willImpairIndependence: 'will-impair-independence',
  projectRequiresMoreThan40Hours: 'project-requires-more-than-40-hours',
  projectInvolvesMoreThanRoutineAdvice: 'project-involves-more-than-routine-advice',
  subjectMatterOfNonAttestIsRelated: 'subject-matter-of-non-attest-is-related',
  basisForConclusion: 'basis-for-conclusion',
  projectRequiresMoreThan40HoursComments: 'project-requires-more-than-40-hours-comments',

  // form text
  formText: 'form-text',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change'
};

const fakeGaoView = {
  formData: {
    willImpairIndependence: faker.datatype.boolean(),
    basisForConclusion: faker.random.alphaNumeric(10),
    projectRequiresMoreThan40Hours: faker.datatype.boolean(),
    projectRequiresMoreThan40HoursComments: faker.random.alphaNumeric(10),
    projectInvolvesMoreThanRoutineAdvice: faker.datatype.boolean(),
    subjectMatterOfNonAttestIsRelated: faker.datatype.boolean()
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};
// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <ConclusionSection {...props} {...hocInjectedProps} />;
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

jest.mock('../../../withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../newEngagementInstanceSlice', () => {
  return {
    selectCurrentView: jest.fn()
  };
});

jest.mock('../../../../components/formText/FormText', () => ({
  __esModule: true,
  default: ({ children, applyEmphasis }) => {
    const props = { children, applyEmphasis };
    return <fake-form-text {...props} data-testid={testIds.formText} />;
  }
}));

jest.mock('../../../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ title, children }) => {
    const props = { title, children };
    return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
  }
}));

jest.mock('../../../../components/radioButtonList/RadioButtonList', () => ({
  __esModule: true,
  default: ({ name, label, options, horizontalItems, selectedValue, onChange }) => {
    const props = { name, label, options, horizontalItems, selectedValue };
    return (
      <fake-radio-button-list {...props} data-testid={testIds[name]} options={JSON.stringify(options)}>
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

describe('ConclusionSection', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeGaoView);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  it('renders CollapsibleFormSection component', () => {
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toBeInTheDocument();
  });

  it('renders CollapsibleFormSection component with correct title prop', () => {
    const expectedTitle = 'Conclusion - Effect of Services on Independence';
    render(getComponentToRender(defaultProps));
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
  });

  describe('willImpairIndependence RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.willImpairIndependence)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'willImpairIndependence';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.willImpairIndependence)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '16. Based on the above analysis, the proposed engagement(s) Will, Will Not  impair our independence.';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.willImpairIndependence)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.willImpairIndependence)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.willImpairIndependence)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.willImpairIndependence;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.willImpairIndependence)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('not invokes onChange function', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(screen.getByTestId(`${testIds.willImpairIndependence}-${testIds.radioButtonListOnChange}`));
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('basisForConclusion TextArea', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.basisForConclusion)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'basisForConclusion';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.basisForConclusion)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Basis for conclusion:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.basisForConclusion)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeGaoView.formData.basisForConclusion;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.basisForConclusion)).toHaveAttribute('value', expectedValue);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.basisForConclusion)).toHaveAttribute('placeholder', expectedPlaceHolder);
    });

    it('has correct rows prop', () => {
      const expectedRows = '6';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.basisForConclusion)).toHaveAttribute('rows', expectedRows);
    });

    describe('functional', () => {
      it('does not yet invoke onChange', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.basisForConclusion}-${testIds.textAreaOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('GAO rules form text', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getAllByTestId(testIds.formText)[0]).toBeInTheDocument();
    });

    it('has correct applyEmphasis prop', () => {
      const expectedApplyEmphasis = true;
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[0]).toHaveAttribute('applyEmphasis', expectedApplyEmphasis.toString());
    });

    it('renders correct text as children', () => {
      const expectedText =
        'GAO rules state that members of the audit team may not work on a non-attest engagement unless the engagement ' +
        "is dominium's in nature, it involves only routine matters, or involves matters that are not significant to the " +
        'audit. The following questions are designed to identify whether audit team participation is permitted.';
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[0]).toHaveTextContent(expectedText);
    });
  });

  describe('projectRequiresMoreThan40Hours RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.projectRequiresMoreThan40Hours)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'projectRequiresMoreThan40Hours';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.projectRequiresMoreThan40Hours)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '17. Will the project require more than 40 hours (in total from all participants) to complete?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.projectRequiresMoreThan40Hours)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.projectRequiresMoreThan40Hours)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.projectRequiresMoreThan40Hours)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.projectRequiresMoreThan40Hours;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.projectRequiresMoreThan40Hours)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('not invokes onChange function', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(
        screen.getByTestId(`${testIds.projectRequiresMoreThan40Hours}-${testIds.radioButtonListOnChange}`)
      );
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('projectRequiresMoreThan40HoursComments TextArea', () => {
    it.each([
      { projectRequiresMoreThan40Hours: false },
      { projectRequiresMoreThan40Hours: null },
      { projectRequiresMoreThan40Hours: faker.datatype.string() }
    ])(
      'should not render projectRequiresMoreThan40HoursComments when projectRequiresMoreThan40Hours is not true',
      ({ projectRequiresMoreThan40Hours }) => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, projectRequiresMoreThan40Hours }
        });
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.projectRequiresMoreThan40HoursComments)).not.toBeInTheDocument();
      }
    );

    describe('when rendered', () => {
      beforeEach(() => {
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue({
          ...fakeGaoView,
          formData: { ...fakeGaoView.formData, projectRequiresMoreThan40Hours: true }
        });
      });

      it('renders inside collapsible form section', () => {
        render(getComponentToRender(defaultProps));
        const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
        expect(
          within(collapsibleFormSection).getByTestId(testIds.projectRequiresMoreThan40HoursComments)
        ).toBeInTheDocument();
      });

      it('should render textarea when projectRequiresMoreThan40Hours is true', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.projectRequiresMoreThan40HoursComments)).toBeInTheDocument();
      });

      it('has correct name prop', () => {
        const expectedName = 'projectRequiresMoreThan40HoursComments';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.projectRequiresMoreThan40HoursComments)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'If yes, Describe:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.projectRequiresMoreThan40HoursComments)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeGaoView.formData.projectRequiresMoreThan40HoursComments;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.projectRequiresMoreThan40HoursComments)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.projectRequiresMoreThan40HoursComments)).toHaveAttribute(
          'placeholder',
          expectedPlaceHolder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = '6';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.projectRequiresMoreThan40HoursComments)).toHaveAttribute(
          'rows',
          expectedRows
        );
      });

      describe('functional', () => {
        it('does not yet invoke onChange', () => {
          render(getComponentToRender(defaultProps));
          fireEvent.click(
            screen.getByTestId(`${testIds.projectRequiresMoreThan40HoursComments}-${testIds.textAreaOnChange}`)
          );
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('projectInvolvesMoreThanRoutineAdvice RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(
        within(collapsibleFormSection).getByTestId(testIds.projectInvolvesMoreThanRoutineAdvice)
      ).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'projectInvolvesMoreThanRoutineAdvice';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.projectInvolvesMoreThanRoutineAdvice)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = (
        '18. Will the project involve something more than providing routine advice regarding accounting, internal ' +
        'control or financial matters or preparation of routine tax filings?'
      ).toString();
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.projectInvolvesMoreThanRoutineAdvice)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.projectInvolvesMoreThanRoutineAdvice)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.projectInvolvesMoreThanRoutineAdvice)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.projectInvolvesMoreThanRoutineAdvice;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.projectInvolvesMoreThanRoutineAdvice)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('not invokes onChange function', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(
        screen.getByTestId(`${testIds.projectInvolvesMoreThanRoutineAdvice}-${testIds.radioButtonListOnChange}`)
      );
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('subjectMatterOfNonAttestIsRelated RadioButtonList', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.subjectMatterOfNonAttestIsRelated)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'subjectMatterOfNonAttestIsRelated';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.subjectMatterOfNonAttestIsRelated)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = (
        '19. Is the subject matter of the non-attest engagement related to or significant to the subject matter ' +
        'of any PM audit or assurance services?'
      ).toString();
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.subjectMatterOfNonAttestIsRelated)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.subjectMatterOfNonAttestIsRelated)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.subjectMatterOfNonAttestIsRelated)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeGaoView.formData.subjectMatterOfNonAttestIsRelated;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.subjectMatterOfNonAttestIsRelated)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    it('not invokes onChange function', () => {
      render(getComponentToRender(defaultProps));
      fireEvent.click(
        screen.getByTestId(`${testIds.subjectMatterOfNonAttestIsRelated}-${testIds.radioButtonListOnChange}`)
      );
      expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
    });
  });

  describe('GAO notes form text', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender(defaultProps));
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getAllByTestId(testIds.formText)[1]).toBeInTheDocument();
    });

    it('has correct applyEmphasis prop', () => {
      const expectedApplyEmphasis = true;
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[1]).toHaveAttribute('applyEmphasis', expectedApplyEmphasis.toString());
    });

    it('renders correct text as children', () => {
      const expectedText =
        'If the answer to #17 above is Yes and the answer to either #18 or #19 is yes, audit team members may not ' +
        'participate in the non-attest engagement';
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[1]).toHaveTextContent(expectedText);
    });
  });
});
