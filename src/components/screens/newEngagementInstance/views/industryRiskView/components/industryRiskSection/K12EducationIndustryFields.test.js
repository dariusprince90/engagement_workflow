import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import K12EducationIndustryFields from './K12EducationIndustryFields';
import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';

// **********************************************************************
// * constants

const testIds = {
  // form fields
  industryK12Education: 'industry-k12-education',
  k12RecurringSignificantFindingsNotCorrected: 'k12-recurring-significant-findings-not-corrected',
  k12RecurringSignificantFindingsNotCorrectedComments: 'k12-recurring-significant-findings-not-corrected-comments',
  k12DifficultPoliticalEnvironment: 'k12-difficult-political-environment',
  k12DifficultPoliticalEnvironmentComments: 'k12-difficult-political-environment-comments',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakeK12Education = {
  formData: {
    k12RecurringSignificantFindingsNotCorrected: faker.random.alphaNumeric(10),
    k12RecurringSignificantFindingsNotCorrectedComments: faker.random.alphaNumeric(10),
    k12DifficultPoliticalEnvironment: faker.random.alphaNumeric(10),
    k12DifficultPoliticalEnvironmentComments: faker.random.alphaNumeric(10)
  },
  metadata: {
    isLoading: false,
    hasError: false,
    error: null
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (prop) => {
  return <K12EducationIndustryFields {...prop} {...hocInjectedProps} />;
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

jest.mock('../../../../views/withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../../newEngagementInstanceSlice', () => {
  return {
    selectCurrentView: jest.fn()
  };
});

jest.mock('../../../../../../common/formHeader/FormHeader', () => {
  return {
    __esModule: true,
    default: ({ name, text }) => {
      const prop = { name, text };
      return <fake-form-header {...prop} data-testid={testIds[name]} />;
    }
  };
});

jest.mock('../../../../components/radioButtonList/RadioButtonList', () => ({
  __esModule: true,
  default: ({ name, label, options, horizontalItems, onChange, selectedValue }) => {
    const prop = { name, label, horizontalItems, selectedValue };
    return (
      <fake-radio-button-list {...prop} options={JSON.stringify(options)} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.radioButtonListOnChange}`} onClick={onChange} />
      </fake-radio-button-list>
    );
  }
}));

jest.mock('../../../../components/textArea/TextArea', () => ({
  __esModule: true,
  default: ({ name, label, placeholder, value, rows, onChange }) => {
    const prop = { name, label, placeholder, value, rows };
    return (
      <fake-text-area {...prop} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.textAreaOnChange}`} onClick={onChange} />
      </fake-text-area>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('K12EducationIndustryFields', () => {
  beforeAll(() => {
    jest.spyOn(newEngagementInstanceSlice, 'selectCurrentView');
  });

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeK12Education);
  });

  // **********************************************************************
  // * tear-down

  afterAll(() => {
    newEngagementInstanceSlice.selectCurrentView.mockClear();
  });

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('industryK12Education form header', () => {
    it('renders correct text prop', () => {
      const expectedText = 'Industry - K12 Education';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.industryK12Education)).toHaveAttribute('text', expectedText);
    });
  });

  describe('k12RecurringSignificantFindingsNotCorrected', () => {
    it('has correct name prop', () => {
      const expectedName = 'k12RecurringSignificantFindingsNotCorrected';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12RecurringSignificantFindingsNotCorrected)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '1. Has the client had recurring significant findings or questioned costs that have not been corrected?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12RecurringSignificantFindingsNotCorrected)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12RecurringSignificantFindingsNotCorrected)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12RecurringSignificantFindingsNotCorrected)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeK12Education.formData.k12RecurringSignificantFindingsNotCorrected;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12RecurringSignificantFindingsNotCorrected)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.k12RecurringSignificantFindingsNotCorrected}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('k12RecurringSignificantFindingsNotCorrectedComments', () => {
    it('has correct name prop', () => {
      const expectedName = 'k12RecurringSignificantFindingsNotCorrectedComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12RecurringSignificantFindingsNotCorrectedComments)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'If yes, describe:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12RecurringSignificantFindingsNotCorrectedComments)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12RecurringSignificantFindingsNotCorrectedComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeK12Education.formData.k12RecurringSignificantFindingsNotCorrectedComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12RecurringSignificantFindingsNotCorrectedComments)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12RecurringSignificantFindingsNotCorrectedComments)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.k12RecurringSignificantFindingsNotCorrectedComments}-${testIds.textAreaOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('k12DifficultPoliticalEnvironment', () => {
    it('has correct name prop', () => {
      const expectedName = 'k12DifficultPoliticalEnvironment';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12DifficultPoliticalEnvironment)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '2. Does the client have a difficult political environment that could impair our ability to serve the successfully?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12DifficultPoliticalEnvironment)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12DifficultPoliticalEnvironment)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12DifficultPoliticalEnvironment)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeK12Education.formData.k12DifficultPoliticalEnvironment;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12DifficultPoliticalEnvironment)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.k12DifficultPoliticalEnvironment}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('k12DifficultPoliticalEnvironmentComments', () => {
    it('has correct name prop', () => {
      const expectedName = 'k12DifficultPoliticalEnvironmentComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12DifficultPoliticalEnvironmentComments)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'If yes, describe:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12DifficultPoliticalEnvironmentComments)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12DifficultPoliticalEnvironmentComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeK12Education.formData.k12DifficultPoliticalEnvironmentComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12DifficultPoliticalEnvironmentComments)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.k12DifficultPoliticalEnvironmentComments)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.k12DifficultPoliticalEnvironmentComments}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });
});
