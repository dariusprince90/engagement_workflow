import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import YesNoTbdRadioButtonListOptions from '../../../../../../../helpers/radioButtonListOptions/YesNoTbdRadioButtonListOptions';
import FeesAndRealizationFields from './FeesAndRealizationFields';

// **********************************************************************
// * constants

const testIds = {
  // form text
  formText: 'form-text',

  // form fields
  pfsFeesEvaluationOfResponsibleForPaying: 'pfs-fees-evaluation-of-responsible-for-paying',
  pfsFeesCollectabilityIsQuestionable: 'pfs-fees-collectability-is-questionable',
  pfsFeesObtainingRetainerWasConsidered: 'pfs-fees-obtaining-retainer-was-considered',

  // radioButtonList events
  radioButtonListOnChange: 'radio-button-list-on-change',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakeSupplementalRiskView = {
  formData: {
    pfsFeesEvaluationOfResponsibleForPaying: faker.random.alphaNumeric(10),
    pfsFeesCollectabilityIsQuestionable: faker.random.alphaNumeric(10),
    pfsFeesObtainingRetainerWasConsidered: faker.random.alphaNumeric(10)
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <FeesAndRealizationFields {...props} {...hocInjectedProps} />;
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

jest.mock('../../../../components/radioButtonList/RadioButtonList', () => ({
  __esModule: true,
  default: ({ horizontalItems, name, label, options, selectedValue, onChange }) => {
    const props = { horizontalItems, name, label, selectedValue };
    return (
      <fake-radio-button-list {...props} options={JSON.stringify(options)} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.radioButtonListOnChange}`} onClick={onChange} />
      </fake-radio-button-list>
    );
  }
}));

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

describe('FeesAndRealizationFields', () => {
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

  describe('feesAndRealization form text', () => {
    it('has correct text', () => {
      const expectedText = 'Fees and Realization';
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

  describe('feesRealizationApprovalStep form text', () => {
    it('has correct text', () => {
      const expectedText = 'Any TBDs must be replaced with Yes or No by the Final Approval step.';
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[1]).toHaveTextContent(expectedText);
    });

    it('has correct applyEmphasis prop', () => {
      const expectedApplyEmphasis = true;
      render(getComponentToRender(defaultProps));
      const formTextFields = screen.getAllByTestId(testIds.formText);
      expect(formTextFields[1]).toHaveAttribute('applyEmphasis', expectedApplyEmphasis.toString());
    });
  });

  describe('pfsFeesEvaluationOfResponsibleForPaying', () => {
    it('has correct name prop', () => {
      const expectedName = 'pfsFeesEvaluationOfResponsibleForPaying';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFeesEvaluationOfResponsibleForPaying)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '1. Who is responsible for paying our fees?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFeesEvaluationOfResponsibleForPaying)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFeesEvaluationOfResponsibleForPaying)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFeesEvaluationOfResponsibleForPaying)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.pfsFeesEvaluationOfResponsibleForPaying;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFeesEvaluationOfResponsibleForPaying)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsFeesEvaluationOfResponsibleForPaying}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('pfsFeesCollectabilityIsQuestionable', () => {
    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFeesCollectabilityIsQuestionable)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'pfsFeesCollectabilityIsQuestionable';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFeesCollectabilityIsQuestionable)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel =
        '2. Given our knowledge of the financial strength of the principal parties, is there any question ' +
        'about collectability of our fees if proposed capital-raising transactions are not completed?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFeesCollectabilityIsQuestionable)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFeesCollectabilityIsQuestionable)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSupplementalRiskView.formData.pfsFeesCollectabilityIsQuestionable;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFeesCollectabilityIsQuestionable)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsFeesCollectabilityIsQuestionable}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('pfsFeesObtainingRetainerWasConsidered', () => {
    it('has correct horizontalItems prop', () => {
      const expectedHorizontalItems = true;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFeesObtainingRetainerWasConsidered)).toHaveAttribute(
        'horizontalItems',
        expectedHorizontalItems.toString()
      );
    });

    it('has correct name prop', () => {
      const expectedName = 'pfsFeesObtainingRetainerWasConsidered';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFeesObtainingRetainerWasConsidered)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = '3. Have we considered obtaining a retainer?';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFeesObtainingRetainerWasConsidered)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct options prop', () => {
      const expectedOptions = YesNoTbdRadioButtonListOptions;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFeesObtainingRetainerWasConsidered)).toHaveAttribute(
        'options',
        JSON.stringify(expectedOptions)
      );
    });

    it('has correct selectedValue prop', () => {
      const expectedSelectedValue = fakeSupplementalRiskView.formData.pfsFeesObtainingRetainerWasConsidered;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFeesObtainingRetainerWasConsidered)).toHaveAttribute(
        'selectedValue',
        expectedSelectedValue.toString()
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsFeesObtainingRetainerWasConsidered}-${testIds.radioButtonListOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });
});
