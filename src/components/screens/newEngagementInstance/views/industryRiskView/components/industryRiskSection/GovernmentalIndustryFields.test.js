import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import GovernmentalIndustryFields from './GovernmentalIndustryFields';
import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';

// **********************************************************************
// * constants

const testIds = {
  // form fields
  industryGovernmental: 'industry-governmental',
  governmentalRecurringSignificant: 'governmental-recurring-significant',
  governmentalRecurringSignificantComments: 'governmental-recurring-significant-comments',
  governmentalDifficultPoliticalEnvironment: 'governmental-difficult-political-environment',
  governmentalDifficultPoliticalEnvironmentComments: 'governmental-difficult-political-environment-comments',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakeIndustryGovernmental = {
  formData: {
    governmentalRecurringSignificant: faker.random.alphaNumeric(10),
    governmentalRecurringSignificantComments: faker.random.alphaNumeric(10),
    governmentalDifficultPoliticalEnvironment: faker.random.alphaNumeric(10),
    governmentalDifficultPoliticalEnvironmentComments: faker.random.alphaNumeric(10)
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (prop) => {
  return <GovernmentalIndustryFields {...prop} {...hocInjectedProps} />;
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

describe('GovernmentalIndustryFields', () => {
  beforeAll(() => {
    jest.spyOn(newEngagementInstanceSlice, 'selectCurrentView');
  });

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeIndustryGovernmental);
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

  describe('industryGovernmental form header', () => {
    it('renders correct text prop', () => {
      const expectedText = 'Industry - "Governmental" / "Higher education" / "Not For Profit Other"';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.industryGovernmental)).toHaveAttribute('text', expectedText);
    });
  });

  describe('governmentalRecurringSignificant', () => {
    it('has correct name prop', () => {
      const expectedName = 'governmentalRecurringSignificant';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalRecurringSignificant)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '1. Has the client had recurring significant findings or questioned costs that have not been corrected?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalRecurringSignificant)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalRecurringSignificant)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalRecurringSignificant)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeIndustryGovernmental.formData.governmentalRecurringSignificant;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalRecurringSignificant)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.governmentalRecurringSignificant}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('governmentalRecurringSignificantComments', () => {
    it('has correct name prop', () => {
      const expectedName = 'governmentalRecurringSignificantComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalRecurringSignificantComments)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'If yes, describe:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalRecurringSignificantComments)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalRecurringSignificantComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeIndustryGovernmental.formData.governmentalRecurringSignificantComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalRecurringSignificantComments)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalRecurringSignificantComments)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.governmentalRecurringSignificantComments}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('governmentalDifficultPoliticalEnvironment', () => {
    it('has correct name prop', () => {
      const expectedName = 'governmentalDifficultPoliticalEnvironment';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalDifficultPoliticalEnvironment)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '2. Does the client have a difficult political environment that could impair our ability to serve them successfully?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalDifficultPoliticalEnvironment)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalDifficultPoliticalEnvironment)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalDifficultPoliticalEnvironment)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeIndustryGovernmental.formData.governmentalDifficultPoliticalEnvironment;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalDifficultPoliticalEnvironment)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.governmentalDifficultPoliticalEnvironment}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('governmentalDifficultPoliticalEnvironmentComments', () => {
    it('has correct name prop', () => {
      const expectedName = 'governmentalDifficultPoliticalEnvironmentComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalDifficultPoliticalEnvironmentComments)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'If yes, describe:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalDifficultPoliticalEnvironmentComments)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalDifficultPoliticalEnvironmentComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeIndustryGovernmental.formData.governmentalDifficultPoliticalEnvironmentComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalDifficultPoliticalEnvironmentComments)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.governmentalDifficultPoliticalEnvironmentComments)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.governmentalDifficultPoliticalEnvironmentComments}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });
});
