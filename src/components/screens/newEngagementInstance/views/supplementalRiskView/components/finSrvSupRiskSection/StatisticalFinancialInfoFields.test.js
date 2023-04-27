import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import StatisticalFinancialInfoFields from './StatisticalFinancialInfoFields';

// **********************************************************************
// * constants

const testIds = {
  // form text
  formText: 'form-text',

  // form fields
  fsStatsTotalAssets: 'fs-stats-total-assets',
  fsStatsLoans: 'fs-stats-loans',
  fsStatsInvestments: 'fs-stats-investments',
  fsStatsTotalEquity: 'fs-stats-total-equity',
  fsStatsCamelRating: 'fs-stats-camel-rating',
  fsStatsCapitalRatio: 'fs-stats-capital-ratio',
  fsStatsRoa: 'fs-stats-roa',
  fsStatsRoe: 'fs-stats-roe',
  fsStatsNumberOfShareholders: 'fs-stats-number-of-shareholders',
  fsStatsPercentageOfStockOwned: 'fs-stats-percentage-of-stockOwned',

  // textArea events
  textAreaOnChange: 'text-area-on-change',

  // textBox events
  textBoxOnChange: 'text-box-on-change'
};

const fakeSupplementalRiskView = {
  formData: {
    fsStatsTotalAssets: faker.datatype.number(),
    fsStatsLoans: faker.datatype.number(),
    fsStatsInvestments: faker.datatype.number(),
    fsStatsTotalEquity: faker.datatype.number(),
    fsStatsCamelRating: faker.datatype.number(),
    fsStatsCapitalRatio: faker.datatype.number(),
    fsStatsRoa: faker.datatype.number(),
    fsStatsRoe: faker.datatype.number(),
    fsStatsNumberOfShareholders: faker.datatype.number(),
    fsStatsPercentageOfStockOwned: faker.datatype.number()
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <StatisticalFinancialInfoFields {...props} {...hocInjectedProps} />;
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

jest.mock('../../../../components/textBox/TextBox', () => ({
  __esModule: true,
  default: ({ name, label, placeholder, value, onChange }) => {
    const props = { name, label, placeholder, value };
    return (
      <fake-text-box {...props} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.textBoxOnChange}`} onClick={onChange} />
      </fake-text-box>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('StatisticalFinancialInfoFields', () => {
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

  describe('statisticalFinancialInformation form text', () => {
    it('has correct text', () => {
      const expectedText = 'Statistical/Financial Information';
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

  describe('fsStatsTotalAssets', () => {
    it('has correct name prop', () => {
      const expectedName = 'fsStatsTotalAssets';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsTotalAssets)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Total Assets';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsTotalAssets)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a numeric value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsTotalAssets)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.fsStatsTotalAssets;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsTotalAssets)).toHaveAttribute('value', expectedValue.toString());
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.fsStatsTotalAssets}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('fsStatsLoans', () => {
    it('has correct name prop', () => {
      const expectedName = 'fsStatsLoans';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsLoans)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Loans';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsLoans)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a numeric value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsLoans)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.fsStatsLoans;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsLoans)).toHaveAttribute('value', expectedValue.toString());
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.fsStatsLoans}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('fsStatsInvestments', () => {
    it('has correct name prop', () => {
      const expectedName = 'fsStatsInvestments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsInvestments)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Investments';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsInvestments)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a numeric value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsInvestments)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.fsStatsInvestments;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsInvestments)).toHaveAttribute('value', expectedValue.toString());
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.fsStatsInvestments}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('fsStatsTotalEquity', () => {
    it('has correct name prop', () => {
      const expectedName = 'fsStatsTotalEquity';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsTotalEquity)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Total Equity';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsTotalEquity)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a numeric value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsTotalEquity)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.fsStatsTotalEquity;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsTotalEquity)).toHaveAttribute('value', expectedValue.toString());
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.fsStatsTotalEquity}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('fsStatsCamelRating', () => {
    it('has correct name prop', () => {
      const expectedName = 'fsStatsCamelRating';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsCamelRating)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'CAMEL Rating';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsCamelRating)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a numeric value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsCamelRating)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.fsStatsCamelRating;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsCamelRating)).toHaveAttribute('value', expectedValue.toString());
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.fsStatsCamelRating}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('fsStatsCapitalRatio', () => {
    it('has correct name prop', () => {
      const expectedName = 'fsStatsCapitalRatio';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsCapitalRatio)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Capital Ratio';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsCapitalRatio)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a numeric value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsCapitalRatio)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.fsStatsCapitalRatio;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsCapitalRatio)).toHaveAttribute('value', expectedValue.toString());
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.fsStatsCapitalRatio}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('fsStatsRoa', () => {
    it('has correct name prop', () => {
      const expectedName = 'fsStatsRoa';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsRoa)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'ROA';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsRoa)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a numeric value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsRoa)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.fsStatsRoa;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsRoa)).toHaveAttribute('value', expectedValue.toString());
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.fsStatsRoa}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('fsStatsRoe', () => {
    it('has correct name prop', () => {
      const expectedName = 'fsStatsRoe';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsRoe)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'ROE';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsRoe)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a numeric value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsRoe)).toHaveAttribute('placeholder', expectedPlaceholder);
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.fsStatsRoe;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsRoe)).toHaveAttribute('value', expectedValue.toString());
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.fsStatsRoe}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('fsStatsNumberOfShareholders', () => {
    it('has correct name prop', () => {
      const expectedName = 'fsStatsNumberOfShareholders';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsNumberOfShareholders)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Number Of Shareholders:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsNumberOfShareholders)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a numeric value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsNumberOfShareholders)).toHaveAttribute(
        'placeholder',
        expectedPlaceholder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.fsStatsNumberOfShareholders;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsNumberOfShareholders)).toHaveAttribute(
        'value',
        expectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.fsStatsNumberOfShareholders}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('fsStatsPercentageOfStockOwned', () => {
    it('has correct name prop', () => {
      const expectedName = 'fsStatsPercentageOfStockOwned';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsPercentageOfStockOwned)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Percentage of stock owned by insiders:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsPercentageOfStockOwned)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceholder = 'Type a numeric value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsPercentageOfStockOwned)).toHaveAttribute(
        'placeholder',
        expectedPlaceholder
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.fsStatsPercentageOfStockOwned;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.fsStatsPercentageOfStockOwned)).toHaveAttribute(
        'value',
        expectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByTestId(`${testIds.fsStatsPercentageOfStockOwned}-${testIds.textBoxOnChange}`));
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });
});
