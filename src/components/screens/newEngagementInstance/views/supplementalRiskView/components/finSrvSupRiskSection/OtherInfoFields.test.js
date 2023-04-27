import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import OtherInfoFields from './OtherInfoFields';

// **********************************************************************
// * constants

const testIds = {
  // form text
  formText: 'form-text',

  // form fields
  fsOtherEvaluationOfExperienceWithBoard: 'fs-other-evaluation-of-experience-with-board',
  fsOtherEvaluationOfExperienceWithManagement: 'fs-other-evaluation-of-experience-with-management',
  fsOtherEvaluationOfRegulatoryIssues: 'fs-other-evaluation-of-regulatory-issues',
  fsOtherEvaluationOfImpactConsiderations: 'fs-other-evaluation-of-impact-considerations',
  fsOtherEvaluationOfOtherSignificantMatters: 'fs-other-evaluation-of-other-significant-matters',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakeSupplementalRiskView = {
  formData: {
    fsOtherEvaluationOfExperienceWithBoard: faker.random.alphaNumeric(10),
    fsOtherEvaluationOfExperienceWithManagement: faker.random.alphaNumeric(10),
    fsOtherEvaluationOfRegulatoryIssues: faker.random.alphaNumeric(10),
    fsOtherEvaluationOfImpactConsiderations: faker.random.alphaNumeric(10),
    fsOtherEvaluationOfOtherSignificantMatters: faker.random.alphaNumeric(10)
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <OtherInfoFields {...props} {...hocInjectedProps} />;
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

jest.mock('../../../../views/withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../components/formText/FormText', () => {
  return {
    __esModule: true,
    default: ({ children, applyEmphasis, isLabel }) => {
      const props = { children, applyEmphasis, isLabel };
      return <fake-form-text {...props} data-testid={testIds.formText} />;
    }
  };
});

jest.mock('../../../../components/textArea/TextArea', () => ({
  __esModule: true,
  default: ({ name, label, placeholder, rows, value, onChange }) => {
    const props = { name, label, placeholder, rows, value };
    return (
      <fake-text-area {...props} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.textAreaOnChange}`} onClick={onChange} />
      </fake-text-area>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('OtherInfoFields', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeSupplementalRiskView);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('otherInformation form text', () => {
    it('has correct text', () => {
      const expectedText = 'Other Information';
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[0]).toHaveTextContent(expectedText);
    });

    it('has correct isLabel prop', () => {
      const expectedIsLabel = true;
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[0]).toHaveAttribute('isLabel', expectedIsLabel.toString());
    });
  });

  describe('fsOtherEvaluationOfExperienceWithBoard', () => {
    it('has correct name prop', () => {
      const expectedName = 'fsOtherEvaluationOfExperienceWithBoard';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfExperienceWithBoard)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '1. If we know or we have had experience with members of the Board, comment on the experience, ' +
        'including an assessment of the capability of the Board members (especially members of the audit ' +
        'committee). Describe or Indicate N/A:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfExperienceWithBoard)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfExperienceWithBoard)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfExperienceWithBoard)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.fsOtherEvaluationOfExperienceWithBoard;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfExperienceWithBoard)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.fsOtherEvaluationOfExperienceWithBoard}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('fsOtherEvaluationOfExperienceWithManagement', () => {
    it('has correct name prop', () => {
      const expectedName = 'fsOtherEvaluationOfExperienceWithManagement';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfExperienceWithManagement)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '2. If we know or we have had experience with members of the management, comment on the ' +
        'experience, including an assessment of the capability of management. Describe or Indicate N/A:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfExperienceWithManagement)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfExperienceWithManagement)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfExperienceWithManagement)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.fsOtherEvaluationOfExperienceWithManagement;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfExperienceWithManagement)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.fsOtherEvaluationOfExperienceWithManagement}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('fsOtherEvaluationOfRegulatoryIssues', () => {
    it('has correct name prop', () => {
      const expectedName = 'fsOtherEvaluationOfRegulatoryIssues';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfRegulatoryIssues)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '3. Are we aware of any regulatory issues facing the potential client that should be considered? Describe or Indicate N/A:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfRegulatoryIssues)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfRegulatoryIssues)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfRegulatoryIssues)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.fsOtherEvaluationOfRegulatoryIssues;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfRegulatoryIssues)).toHaveAttribute('value', expectedValue);
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.fsOtherEvaluationOfRegulatoryIssues}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('fsOtherEvaluationOfImpactConsiderations', () => {
    it('has correct name prop', () => {
      const expectedName = 'fsOtherEvaluationOfImpactConsiderations';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfImpactConsiderations)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '4. Based on the financial and other information made available to us, consider whether any of the ' +
        'following items may impact our acceptance decision. Describe or Indicate N/A:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfImpactConsiderations)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfImpactConsiderations)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfImpactConsiderations)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.fsOtherEvaluationOfImpactConsiderations;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfImpactConsiderations)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.fsOtherEvaluationOfImpactConsiderations}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('growthOrDecline form text', () => {
    it('renders correct children', () => {
      const expectedChildren = (
        <ul>
          <li>Unusual growth or decline in size</li>
          <li>Loan losses</li>
          <li>Significant stock or other compensation plans</li>
          <li>Significant internal control weaknesses</li>
        </ul>
      );
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[1]).toBeInTheDocument(expectedChildren.toString());
    });

    it('has correct applyEmphasis prop', () => {
      const expectedApplyEmphasis = true;
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[1]).toHaveAttribute('applyEmphasis', expectedApplyEmphasis.toString());
    });
  });

  describe('fsOtherEvaluationOfOtherSignificantMatters', () => {
    it('has correct name prop', () => {
      const expectedName = 'fsOtherEvaluationOfOtherSignificantMatters';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfOtherSignificantMatters)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '5. Are there any other significant matters that should be considered? Describe or Indicate N/A:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfOtherSignificantMatters)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfOtherSignificantMatters)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfOtherSignificantMatters)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.fsOtherEvaluationOfOtherSignificantMatters;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsOtherEvaluationOfOtherSignificantMatters)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.fsOtherEvaluationOfOtherSignificantMatters}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });
});
