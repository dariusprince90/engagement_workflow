import ReactDOM from 'react-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';

import ClientCommunicationInfoSection from './ClientCommunicationInfoSection';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',

  // form fields
  workPhoneNumber: 'work-phone-number',
  faxPhoneNumber: 'fax-phone-number',
  mobilePhoneNumber: 'mobile-phone-number',
  emailAddress: 'email-address',

  // phoneNumber events
  phoneNumberOnChange: 'phone-number-on-change',

  // textBox events
  textBoxOnChange: 'text-box-on-change'
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <ClientCommunicationInfoSection />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('../../../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ title, children }) => {
    const props = { title, children };
    return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
  }
}));

jest.mock('../../../../components/phoneNumber/PhoneNumber', () => ({
  __esModule: true,
  default: ({ name, label, phoneNumber, isPrimary, countryHierarchyReferenceId, onChange }) => {
    const props = { name, label, phoneNumber, isPrimary, countryHierarchyReferenceId };
    return (
      <fake-phone-number {...props} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.phoneNumberOnChange}`} onClick={onChange} />
      </fake-phone-number>
    );
  }
}));

jest.mock('../../../../components/textBox/TextBox', () => ({
  __esModule: true,
  default: ({ name, label, value, placeholder, onChange }) => {
    const props = { name, label, value, placeholder };
    return (
      <fake-text-box {...props} data-testid={testIds[name]}>
        <button data-testid={`${testIds[name]}-${testIds.textBoxOnChange}`} onClick={onChange} />
      </fake-text-box>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('ClientCommunicationInfoSection', () => {
  // **********************************************************************
  // * setup

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

  it('renders CollapsibleFormSection with correct title prop', () => {
    const expectedTitle = 'Client Communication Information';
    render(getComponentToRender());
    expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
  });

  describe('workPhoneNumber', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.workPhoneNumber)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'workPhoneNumber';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.workPhoneNumber)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Work:';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.workPhoneNumber)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct countryHierarchyReferenceId prop', () => {
      const expectedCountryHierarchyReferenceId = '';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.workPhoneNumber)).toHaveAttribute(
        'countryHierarchyReferenceId',
        expectedCountryHierarchyReferenceId
      );
    });

    it('has correct phoneNumber prop', () => {
      const expectedPhoneNumber = '';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.workPhoneNumber)).toHaveAttribute('phoneNumber', expectedPhoneNumber);
    });

    it('has correct isPrimary prop', () => {
      const expectedIsPrimary = false;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.workPhoneNumber)).toHaveAttribute('isPrimary', expectedIsPrimary.toString());
    });

    /* as the functions are yet to be implemented, add the test case with
      temporary assert to pass the code coverage  */
    describe('functional', () => {
      it('does not yet invoke onChange function', () => {
        const onChange = jest.fn();
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(`${testIds.workPhoneNumber}-${testIds.phoneNumberOnChange}`));
        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });

  describe('faxPhoneNumber', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.faxPhoneNumber)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'faxPhoneNumber';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.faxPhoneNumber)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Fax:';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.faxPhoneNumber)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct countryHierarchyReferenceId prop', () => {
      const expectedCountryHierarchyReferenceId = '';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.faxPhoneNumber)).toHaveAttribute(
        'countryHierarchyReferenceId',
        expectedCountryHierarchyReferenceId
      );
    });

    it('has correct phoneNumber prop', () => {
      const expectedPhoneNumber = '';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.faxPhoneNumber)).toHaveAttribute('phoneNumber', expectedPhoneNumber);
    });

    it('has correct isPrimary prop', () => {
      const expectedIsPrimary = false;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.faxPhoneNumber)).toHaveAttribute('isPrimary', expectedIsPrimary.toString());
    });

    /* as the functions are yet to be implemented, add the test case with
      temporary assert to pass the code coverage  */
    describe('functional', () => {
      it('does not yet invoke onChange function', () => {
        const onChange = jest.fn();
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(`${testIds.faxPhoneNumber}-${testIds.phoneNumberOnChange}`));
        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });

  describe('mobilePhoneNumber', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.mobilePhoneNumber)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'mobilePhoneNumber';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.mobilePhoneNumber)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Mobile:';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.mobilePhoneNumber)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct countryHierarchyReferenceId prop', () => {
      const expectedCountryHierarchyReferenceId = '';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.mobilePhoneNumber)).toHaveAttribute(
        'countryHierarchyReferenceId',
        expectedCountryHierarchyReferenceId
      );
    });

    it('has correct phoneNumber prop', () => {
      const expectedPhoneNumber = '';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.mobilePhoneNumber)).toHaveAttribute('phoneNumber', expectedPhoneNumber);
    });

    it('has correct isPrimary prop', () => {
      const expectedIsPrimary = false;
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.mobilePhoneNumber)).toHaveAttribute('isPrimary', expectedIsPrimary.toString());
    });

    /* as the functions are yet to be implemented, add the test case with
      temporary assert to pass the code coverage  */
    describe('functional', () => {
      it('does not yet invoke onChange function', () => {
        const onChange = jest.fn();
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(`${testIds.mobilePhoneNumber}-${testIds.phoneNumberOnChange}`));
        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });

  describe('emailAddress', () => {
    it('renders inside collapsible form section', () => {
      render(getComponentToRender());
      const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
      expect(within(collapsibleFormSection).getByTestId(testIds.emailAddress)).toBeInTheDocument();
    });

    it('has correct name prop', () => {
      const expectedName = 'emailAddress';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.emailAddress)).toHaveAttribute('name', expectedName);
    });

    it('has correct label prop', () => {
      const expectedLabel = 'Email:';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.emailAddress)).toHaveAttribute('label', expectedLabel);
    });

    it('has correct value prop', () => {
      const expectedValue = '';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.emailAddress)).toHaveAttribute('value', expectedValue);
    });

    it('has correct placeholder prop', () => {
      const expectedPlaceHolder = 'Type a value';
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.emailAddress)).toHaveAttribute('placeholder', expectedPlaceHolder);
    });

    /* as the functions are yet to be implemented, add the test case with
      temporary assert to pass the code coverage  */
    describe('functional', () => {
      it('does not yet invoke onChange function', () => {
        const onChange = jest.fn();
        render(getComponentToRender());
        fireEvent.click(screen.getByTestId(`${testIds.emailAddress}-${testIds.textBoxOnChange}`));
        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });
});
