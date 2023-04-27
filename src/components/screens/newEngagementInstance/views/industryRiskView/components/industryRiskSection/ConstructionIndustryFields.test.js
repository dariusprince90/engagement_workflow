import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import ConstructionIndustryFields from './ConstructionIndustryFields';
import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';

// **********************************************************************
// * constants

const testIds = {
  // form fields
  industryConstruction: 'industry-construction',
  constructionCashFlowInsufficient: 'construction-cash-flow-insufficient',
  constructionCashFlowInsufficientComments: 'construction-cash-flow-insufficient-comments',
  constructionBacklogSufficient: 'construction-backlog-sufficient',
  constructionBacklogSufficientComments: 'construction-backlog-sufficient-comments',
  constructionInadequateCostSystemOrLargeChangeOrders: 'construction-inadequate-cost-system-or-large-change-orders',
  constructionInadequateCostSystemOrLargeChangeOrdersComments:
    'construction-inadequate-cost-system-or-large-change-orders-comments',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakeConstructionFields = {
  formData: {
    constructionCashFlowInsufficient: faker.random.alphaNumeric(10),
    constructionCashFlowInsufficientComments: faker.random.alphaNumeric(10),
    constructionBacklogSufficient: faker.random.alphaNumeric(10),
    constructionBacklogSufficientComments: faker.random.alphaNumeric(10),
    constructionInadequateCostSystemOrLargeChangeOrders: faker.random.alphaNumeric(10),
    constructionInadequateCostSystemOrLargeChangeOrdersComments: faker.random.alphaNumeric(10)
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
  return <ConstructionIndustryFields {...prop} {...hocInjectedProps} />;
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

describe('ConstructionIndustryFields', () => {
  beforeAll(() => {
    jest.spyOn(newEngagementInstanceSlice, 'selectCurrentView');
  });

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeConstructionFields);
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

  describe('industryConstruction form header', () => {
    it('renders correct text prop', () => {
      const expectedText = 'Industry - Construction';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.industryConstruction)).toHaveAttribute('text', expectedText);
    });
  });

  describe('constructionCashFlowInsufficient', () => {
    it('has correct name prop', () => {
      const expectedName = 'constructionCashFlowInsufficient';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionCashFlowInsufficient)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Is the client cashflow inadequate to support current and expected needs?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionCashFlowInsufficient)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionCashFlowInsufficient)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionCashFlowInsufficient)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeConstructionFields.formData.constructionCashFlowInsufficient;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionCashFlowInsufficient)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.constructionCashFlowInsufficient}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('constructionCashFlowInsufficientComments', () => {
    it('has correct name prop', () => {
      const expectedName = 'constructionCashFlowInsufficientComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionCashFlowInsufficientComments)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'If yes, describe:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionCashFlowInsufficientComments)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionCashFlowInsufficientComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeConstructionFields.formData.constructionCashFlowInsufficientComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionCashFlowInsufficientComments)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionCashFlowInsufficientComments)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.constructionCashFlowInsufficientComments}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('constructionBacklogSufficient', () => {
    it('has correct name prop', () => {
      const expectedName = 'constructionBacklogSufficient';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionBacklogSufficient)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Is the client backlog insufficient or significantly reduced?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionBacklogSufficient)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionBacklogSufficient)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionBacklogSufficient)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeConstructionFields.formData.constructionBacklogSufficient;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionBacklogSufficient)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    describe('functional', () => {
      it('not invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.constructionBacklogSufficient}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('constructionBacklogSufficientComments', () => {
    it('has correct name prop', () => {
      const expectedName = 'constructionBacklogSufficientComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionBacklogSufficientComments)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'If yes, describe:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionBacklogSufficientComments)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionBacklogSufficientComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeConstructionFields.formData.constructionBacklogSufficientComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionBacklogSufficientComments)).toHaveAttribute('value', expectedValue);
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionBacklogSufficientComments)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.constructionBacklogSufficientComments}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('constructionInadequateCostSystemOrLargeChangeOrders', () => {
    it('has correct name prop', () => {
      const expectedName = 'constructionInadequateCostSystemOrLargeChangeOrders';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionInadequateCostSystemOrLargeChangeOrders)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        'Does the client have an inadequate cost system or recurring large unapproved change order?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionInadequateCostSystemOrLargeChangeOrders)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionInadequateCostSystemOrLargeChangeOrders)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionInadequateCostSystemOrLargeChangeOrders)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeConstructionFields.formData.constructionInadequateCostSystemOrLargeChangeOrders;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionInadequateCostSystemOrLargeChangeOrders)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue
      );
    });

    describe('functional', () => {
      it('not invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.constructionInadequateCostSystemOrLargeChangeOrders}-${testIds.radioButtonListOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('constructionInadequateCostSystemOrLargeChangeOrdersComments', () => {
    it('has correct name prop', () => {
      const expectedName = 'constructionInadequateCostSystemOrLargeChangeOrdersComments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionInadequateCostSystemOrLargeChangeOrdersComments)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel = 'If yes, describe:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionInadequateCostSystemOrLargeChangeOrdersComments)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionInadequateCostSystemOrLargeChangeOrdersComments)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeConstructionFields.formData.constructionInadequateCostSystemOrLargeChangeOrdersComments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionInadequateCostSystemOrLargeChangeOrdersComments)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.constructionInadequateCostSystemOrLargeChangeOrdersComments)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(
            `${testIds.constructionInadequateCostSystemOrLargeChangeOrdersComments}-${testIds.textAreaOnChange}`
          )
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });
});
