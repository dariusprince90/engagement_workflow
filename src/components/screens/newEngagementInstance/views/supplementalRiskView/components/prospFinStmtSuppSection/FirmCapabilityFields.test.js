import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../../../newEngagementInstanceSlice';
import FirmCapabilityFields from './FirmCapabilityFields';

// **********************************************************************
// * constants

const testIds = {
  // form text
  formText: 'form-text',

  // form fields
  pfsFirmEvaluationOfAbilityToProvideService: 'pfs-firm-evaluation-of-ability-to-provide-service',

  // textArea events
  textAreaOnChange: 'text-area-on-change'
};

const fakeSupplementalRiskView = {
  formData: {
    pfsFirmEvaluationOfAbilityToProvideService: faker.random.alphaNumeric(10)
  }
};

const defaultProps = {};

const hocInjectedProps = {
  handleInputFieldValueChanged: jest.fn()
};

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <FirmCapabilityFields {...props} {...hocInjectedProps} />;
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

describe('FirmCapabilityFields', () => {
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

  describe('firmCapability form text', () => {
    it('has correct text', () => {
      const expectedText = 'Firm Capability';
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

  describe('pfsFirmEvaluationOfAbilityToProvideService', () => {
    it('has correct name prop', () => {
      const expectedName = 'pfsFirmEvaluationOfAbilityToProvideService';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFirmEvaluationOfAbilityToProvideService)).toHaveAttribute(
        'name',
        expectedName
      );
    });

    it('has correct label prop', () => {
      const expectedLabel =
        'Given the nature of the client, its industry and its operating peculiarities, and our ability to staff ' +
        'this engagement, including the relative urgency of the project, provide an evaluation of our ' +
        'ability to adequately service this engagement:';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFirmEvaluationOfAbilityToProvideService)).toHaveAttribute(
        'label',
        expectedLabel
      );
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFirmEvaluationOfAbilityToProvideService)).toHaveAttribute(
        'placeholder',
        expectedPlaceHolder
      );
    });

    it('has correct rows prop', () => {
      const expectedRows = 6;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFirmEvaluationOfAbilityToProvideService)).toHaveAttribute(
        'rows',
        expectedRows.toString()
      );
    });

    it('has correct value prop', () => {
      const expectedValue = fakeSupplementalRiskView.formData.pfsFirmEvaluationOfAbilityToProvideService;
      render(getComponentToRender(defaultProps));
      expect(screen.getByTestId(testIds.pfsFirmEvaluationOfAbilityToProvideService)).toHaveAttribute(
        'value',
        expectedValue
      );
    });

    describe('functional', () => {
      it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
        render(getComponentToRender(defaultProps));
        fireEvent.click(
          screen.getByTestId(`${testIds.pfsFirmEvaluationOfAbilityToProvideService}-${testIds.textAreaOnChange}`)
        );
        expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalledTimes(1);
      });
    });
  });
});
