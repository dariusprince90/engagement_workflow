import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import RealEstateIndustryFields from './RealEstateIndustryFields';
import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';

// **********************************************************************
// * constants

const testIds = {
  // form fields
  industryRealEstate: 'industry-real-estate',
  realEstateImpairmentInMarketValue: 'real-estate-impairment-in-market-value',
  realEstateImpairmentInMarketValueComments: 'real-estate-impairment-in-market-value-comments',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakeRealEstate = {
  formData: {
    realEstateImpairmentInMarketValue: faker.random.alphaNumeric(10),
    realEstateImpairmentInMarketValueComments: faker.random.alphaNumeric(10)
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
  return <RealEstateIndustryFields {...prop} {...hocInjectedProps} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => {
      return callback();
    },
    useDispatch: () => jest.fn()
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

describe('RealEstateIndustryFields', () => {
  beforeAll(() => {
    jest.spyOn(newEngagementInstanceSlice, 'selectCurrentView');
  });

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeRealEstate);
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

  describe('industryRealEstate form header', () => {
    it('renders correct text prop', () => {
      const expectedText = 'Industry - Real Estate';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.industryRealEstate)).toHaveAttribute('text', expectedText);
    });
  });

  describe('realEstateImpairmentInMarketValue', () => {
    it('has correct name prop', () => {
      const expectedName = 'realEstateImpairmentInMarketValue';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.realEstateImpairmentInMarketValue)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = "Has there been a significant impairment in the market value of Client's property?";
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.realEstateImpairmentInMarketValue)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.realEstateImpairmentInMarketValue)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.realEstateImpairmentInMarketValue)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeRealEstate.formData.realEstateImpairmentInMarketValue;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.realEstateImpairmentInMarketValue)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.realEstateImpairmentInMarketValue}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('realEstateImpairmentInMarketValueComments', () => {
    it('has correct name prop', () => {
      const expectedName = 'realEstateImpairmentInMarketValueComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.realEstateImpairmentInMarketValueComments)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'If yes, describe:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.realEstateImpairmentInMarketValueComments)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.realEstateImpairmentInMarketValueComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeRealEstate.formData.realEstateImpairmentInMarketValueComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.realEstateImpairmentInMarketValueComments)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.realEstateImpairmentInMarketValueComments)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.realEstateImpairmentInMarketValueComments}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });
});
