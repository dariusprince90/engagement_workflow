import ReactDOM from 'react-dom';
import * as reactRedux from 'react-redux';
import { fireEvent, render, screen, within } from '@testing-library/react';
import faker from '@faker-js/faker';

import PmArray from '../../../../../../helpers/customTypes/PmArray';
import COMPLIANCE_JOB_TYPES from '../../../../../../helpers/enums/complianceJobTypes';
import DYNAMIC_ALERT_TYPES from '../../../../../../helpers/enums/dynamicAlertTypes';
import SORT_DIRECTION from '../../../../../../helpers/enums/sortDirection';
import YesNoRadioButtonListOptions from '../../../../../../helpers/radioButtonListOptions/YesNoRadioButtonListOptions';

import * as newEngagementInstanceSlice from '../../../newEngagementInstanceSlice';
import * as jobSetupFields from './JobSetupFields';

import JobSetupFields from './JobSetupFields';

// **********************************************************************
// * constants

const testIds = {
  formText: 'form-text',
  dynamicAlert: 'dynamic-alert',

  // form fields
  clientEntityId: 'client-entity-id',
  entityLegalName: 'entity-legal-name;',
  additionalCustomCharacters: 'additional-custom-characters',
  forPeriodEndedDate: 'for-period-ended-date',
  jobNameYear: 'job-name-year',
  jobName: 'job-name',
  expectedFees: 'expected-fees',
  expectedRealization: 'expected- realization',
  expectedJobBudgetHours: 'expected-job-budget-hours',
  descriptionOfOtherAttestationEngagement: 'description-of-other-attestation-engagement',
  descriptionOfNonAttestServices: 'description-of-non-attest-services',
  isBusinessCoveringTheCost: 'is-business-covering-the-cost',
  areAnySpecialReturnsNeeded: 'are-any-special-returns-needed',
  hasMoreThanThreeForms5472: 'has-more-than-3-5472s',
  hasMoreThanFiveBankAccountsForFinCen114: 'has-more-than-5-bank-accts-for-114',
  willReturnsBePreparedForFivePlusStateLocal: 'will-returns-be-prepared-for-5-state-local',
  isApprovingEngagementPartner: 'is-approving-engagement-partner',

  // selectBox events
  selectBoxOnChange: 'select-box-on-change'
};

const defaultProps = {};

const hocInjectedProps = {
  handleDatePickerValueChanged: jest.fn(),
  handleInputFieldValueChanged: jest.fn()
};

const fakeViewId = faker.random.alpha(10);

const fakeJobSetupView = {
  formData: {
    clientEntityId: faker.datatype.number(),
    entityLegalName: faker.random.alpha(10),
    additionalCustomCharacters: faker.random.alpha(10),
    forPeriodEndedDate: faker.random.alpha(10),
    jobNameYear: faker.random.alpha(10),
    jobName: faker.random.alpha(10),
    expectedFees: faker.random.alpha(10),
    expectedRealization: faker.random.alpha(10),
    expectedJobBudgetHours: faker.random.alpha(10),
    descriptionOfOtherAttestationEngagement: faker.random.alpha(10),
    descriptionOfNonAttestServices: faker.random.alpha(10),
    isBusinessCoveringTheCost: faker.datatype.boolean(),
    areAnySpecialReturnsNeeded: faker.datatype.boolean(),
    hasMoreThanThreeForms5472: faker.datatype.boolean(),
    hasMoreThanFiveBankAccountsForFinCen114: faker.datatype.boolean(),
    willReturnsBePreparedForFivePlusStateLocal: faker.datatype.boolean(),
    isApprovingEngagementPartner: faker.datatype.boolean(),
    jobTypeDisplayName: faker.random.alpha(10)
  }
};

const fakeLookups = {
  clientEntities: {
    data: [],
    isLoading: faker.datatype.boolean(),
    loadingText: faker.random.alphaNumeric(10),
    error: null
  }
};

const fakeJobHierarchy = {
  complianceJobTypeId: faker.datatype.number(),
  allowsAdditionalCharactersInJobName: faker.datatype.boolean(),
  allowsExpectedFees: faker.datatype.boolean(),
  allowsExpectedRealization: faker.datatype.boolean(),
  allowsBudgetHours: faker.datatype.boolean(),
  jobNameFormat: faker.random.alpha(10)
};

const fakeClientEntity = {
  shortEntityName: faker.random.alphaNumeric(10)
};

const mockDispatch = jest.fn();

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <JobSetupFields {...props} {...hocInjectedProps} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: (callback) => callback()
}));

jest.mock('../../../newEngagementInstanceSlice', () => ({
  selectClientEntity: jest.fn(),
  selectCurrentView: jest.fn(),
  selectCurrentViewId: jest.fn(),
  selectJobHierarchy: jest.fn(),
  selectLookups: jest.fn(),
  viewFormDataChanged: jest.fn()
}));

jest.mock('../../withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../components/formText/FormText', () => ({
  __esModule: true,
  default: ({ children, isLabel, applyEmphasis }) => {
    const props = { children, isLabel, applyEmphasis };
    return <fake-form-text {...props} data-testid={testIds.formText} />;
  }
}));

jest.mock('../../../components/datePicker/DatePicker', () => ({
  __esModule: true,
  default: ({ name, label, placeholder, value, disabled, onChange }) => {
    const props = { name, label, placeholder, value, disabled };
    return <fake-date-picker {...props} data-testid={testIds[name]} onClick={onChange} />;
  }
}));

jest.mock('../../../components/radioButtonList/RadioButtonList', () => ({
  __esModule: true,
  default: ({ name, label, horizontalItems, options, selectedValue, dynamicAlert, onChange }) => {
    const props = { name, label, horizontalItems, selectedValue };
    return (
      <fake-radio-button-list
        {...props}
        options={JSON.stringify(options)}
        onClick={onChange}
        data-testid={testIds[name]}>
        {!!dynamicAlert && (
          <fake-dynamic-alert
            data-testid={`${testIds[name]}-${testIds.dynamicAlert}`}
            type={JSON.stringify(dynamicAlert.type)}>
            {dynamicAlert.message}
          </fake-dynamic-alert>
        )}
      </fake-radio-button-list>
    );
  }
}));

jest.mock('../../../components/readonlyFormField/ReadonlyFormField', () => ({
  __esModule: true,
  default: ({ name, label, value }) => {
    const props = { name, label, value };
    return <fake-readonly-form-field {...props} data-testid={testIds[name]} />;
  }
}));

jest.mock('../../../components/selectBox/SelectBox', () => ({
  __esModule: true,
  default: ({ name, label, value, defaultOption, options, isLoading, loadingText, appendAddOns, onChange }) => {
    const props = { name, label, value, defaultOption, options, isLoading, loadingText };
    return (
      <fake-select-box {...props} options={JSON.stringify(options)} onClick={onChange} data-testid={testIds[name]}>
        {!!appendAddOns &&
          appendAddOns.map((addOn, index) => (
            <fake-add-on key={index} data-add-on onClick={addOn.onClick}>
              {addOn.text}
            </fake-add-on>
          ))}
      </fake-select-box>
    );
  }
}));

jest.mock('../../../components/textArea/TextArea', () => ({
  __esModule: true,
  default: ({ name, label, placeholder, value, rows, onChange }) => {
    const props = { name, label, placeholder, value, rows };
    return <fake-text-area {...props} onClick={onChange} data-testid={testIds[name]} />;
  }
}));

jest.mock('../../../components/textBox/TextBox', () => ({
  __esModule: true,
  default: ({ name, label, placeholder, value, disabled, readOnly, appendAddOns, onChange }) => {
    const props = { name, label, placeholder, value, disabled, readOnly };
    return (
      <fake-text-box {...props} onClick={onChange} data-testid={testIds[name]}>
        {!!appendAddOns &&
          appendAddOns.map((addOn, index) => (
            <fake-add-on key={index} data-add-on onClick={addOn.onClick}>
              {addOn.text}
            </fake-add-on>
          ))}
      </fake-text-box>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('JobSetupFields', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    newEngagementInstanceSlice.selectClientEntity.mockReturnValue(fakeClientEntity);
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeJobSetupView);
    newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(fakeViewId);
    newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(fakeJobHierarchy);
    newEngagementInstanceSlice.selectLookups.mockReturnValue(fakeLookups);
    jest.spyOn(jobSetupFields, 'getJobNameYears').mockReturnValue([]);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(defaultProps), div);
  });

  describe('on-load', () => {
    describe('client entity options', () => {
      it('sets the client entity options to an empty array when clientEntities.data has no items', () => {
        // * Arrange
        const clientEntities = [];
        const expectedOptions = [];

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          clientEntities: { ...fakeLookups.clientEntities, data: clientEntities }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.clientEntityId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });

      it('sets the client entity options when clientEntities.data has items', () => {
        // * Arrange
        const itemCount = faker.datatype.number({ min: 30, max: 50 });
        const clientEntities = [...Array(itemCount).keys()].map(() => ({
          id: faker.datatype.number(),
          legalEntityName: faker.random.alphaNumeric(10),
          isActive: faker.datatype.boolean()
        }));

        // we expect a sorted array of active client entities
        const expectedClientEntities = new PmArray(...clientEntities)
          .filter((ms) => ms.isActive)
          .sortObjects('legalEntityName', SORT_DIRECTION.ascending.abbreviation);

        const expectedOptions = expectedClientEntities.map((clientEntity) => ({
          value: clientEntity.id,
          text: clientEntity.legalEntityName
        }));

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          clientEntities: { ...fakeLookups.clientEntities, data: clientEntities }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.clientEntityId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });
    });

    describe('jobNameYearOptions', () => {
      it('calls getJobNameYears with NaN when formData.jobNameYear has no value', () => {
        // * ARRANGE
        const jobSetupView = { ...fakeJobSetupView, formData: { ...fakeJobSetupView.formData, jobNameYear: null } };
        const years = [...Array(5).keys()];

        const getYearsSpy = jest.spyOn(jobSetupFields, 'getJobNameYears');
        getYearsSpy.mockReturnValue(years);

        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(jobSetupFields.getJobNameYears).toHaveBeenCalledWith(NaN);
      });

      it('calls getJobNameYears with formData.jobNameYear when formData.jobNameYear has a value', () => {
        // * ARRANGE
        const jobNameYear = faker.datatype.number();
        const jobSetupView = { ...fakeJobSetupView, formData: { ...fakeJobSetupView.formData, jobNameYear } };
        const years = [...Array(5).keys()];

        const getYearsSpy = jest.spyOn(jobSetupFields, 'getJobNameYears');
        getYearsSpy.mockReturnValue(years);

        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(jobSetupFields.getJobNameYears).toHaveBeenCalledWith(jobNameYear);
      });

      it('sets the jobNameYearOptions with the results of getJobNameYears when the screen loads', () => {
        // * ARRANGE
        const years = [...Array(5).keys()];
        const expectedOptions = years.map((year) => ({ value: year, text: year.toString() }));
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId: COMPLIANCE_JOB_TYPES.Tax.id };

        const getYearsSpy = jest.spyOn(jobSetupFields, 'getJobNameYears');
        getYearsSpy.mockReturnValue(years);

        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.jobNameYear)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });
    });
  });

  describe('side effects', () => {
    describe('calculateJobName', () => {
      it('does not dispatch viewFormDataChanged when jobHierarchy.complianceJobTypeId is null', () => {
        // * ARRANGE
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId: null };
        const sliceResults = faker.random.alphaNumeric(10);
        newEngagementInstanceSlice.viewFormDataChanged.mockReturnValue(sliceResults);
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(newEngagementInstanceSlice.viewFormDataChanged).not.toHaveBeenCalled();
        expect(mockDispatch).not.toHaveBeenCalledWith(sliceResults);
      });

      it.each([
        {
          additionalCustomCharacters: null,
          clientEntity: null,
          entityShortName: null,
          forPeriodEndedDate: null,
          jobNameYear: null,
          expectedNewJobName: '------'
        },
        {
          additionalCustomCharacters: 'additional-chars',
          clientEntity: null,
          entityShortName: 'entity-short-name',
          forPeriodEndedDate: new Date(2000, 1, 1),
          jobNameYear: 1234,
          expectedNewJobName: 'additional-chars--entity-short-name--2000--1234'
        },
        {
          additionalCustomCharacters: 'additional-chars',
          clientEntity: { shortEntityName: fakeClientEntity.shortEntityName },
          entityShortName: 'entity-short-name',
          forPeriodEndedDate: new Date(2000, 1, 1),
          jobNameYear: 1234,
          expectedNewJobName: `additional-chars--${fakeClientEntity.shortEntityName}--2000--1234`
        }
      ])(
        'dispatches viewFormDataChanged with correct job name when ' +
          'additionalCustomCharacters is $additionalCustomCharacters, clientEntity is $clientEntity, ' +
          'entityShortName is $entityShortName, forPeriodEndedDate is $forPeriodEndedDate, and ' +
          'jobNameYear is $jobNameYear',
        ({
          additionalCustomCharacters,
          clientEntity,
          entityShortName,
          forPeriodEndedDate,
          jobNameYear,
          expectedNewJobName
        }) => {
          // * ARRANGE
          // setup format with all possible placeholders
          const jobNameFormat = '{{suffix}}--{{entity-short-name}}--{{period-end-date-year}}--{form-year}}';

          const complianceJobTypeId = faker.datatype.number();
          const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId, jobNameFormat };

          const jobSetupView = {
            ...fakeJobSetupView,
            formData: {
              ...fakeJobSetupView.formData,
              additionalCustomCharacters,
              entityShortName,
              forPeriodEndedDate,
              jobNameYear
            }
          };

          const sliceResults = faker.random.alphaNumeric(10);
          const updatedFormData = { jobName: expectedNewJobName };
          const expectedPayload = { viewId: fakeViewId, formData: updatedFormData };

          newEngagementInstanceSlice.selectClientEntity.mockReturnValue(clientEntity);
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
          newEngagementInstanceSlice.viewFormDataChanged.mockReturnValue(sliceResults);

          // * ACT
          render(getComponentToRender(defaultProps));

          // * ASSERT
          expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledOnce();
          expect(newEngagementInstanceSlice.viewFormDataChanged).toHaveBeenCalledWith(expectedPayload);
          expect(mockDispatch).toHaveBeenCalledWith(sliceResults);
        }
      );
    });
  });

  describe('rendering', () => {
    describe('job type form text', () => {
      const expectedText = `Job Type: ${fakeJobSetupView.formData.jobTypeDisplayName}`;

      it('is rendered', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByText(expectedText)).toBeInTheDocument();
      });

      it('has isLabel prop', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByText(expectedText)).toHaveAttribute('isLabel');
      });
    });

    describe('this job will be linked... form text', () => {
      const text =
        'This job will be linked to the client selected at the start of this workflow. ' +
        'If the job needs to be tied to an entity that is not the client, please select or add in the drop-down below.';

      it('is rendered', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByText(text)).toBeInTheDocument();
      });

      it('has applyEmphasis prop', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByText(text)).toHaveAttribute('applyEmphasis');
      });
    });

    describe('clientEntityId', () => {
      it('does not render when jobHierarchy.complianceJobTypeId is null', () => {
        const complianceJobTypeId = null;
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.clientEntityId)).not.toBeInTheDocument();
      });

      it('renders when jobHierarchy.complianceJobTypeId is not null', () => {
        const complianceJobTypeId = faker.datatype.number();
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.clientEntityId)).toBeInTheDocument();
      });

      describe('when rendered', () => {
        const complianceJobTypeId = faker.datatype.number();
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };

        beforeEach(() => {
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        });

        it('has correct name prop', () => {
          const expectedName = 'clientEntityId';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.clientEntityId)).toHaveAttribute('name', expectedName);
        });

        it('has correct label prop', () => {
          const expectedLabel = 'Entity Name:';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.clientEntityId)).toHaveAttribute('label', expectedLabel);
        });

        it('has correct value prop', () => {
          const expectedValue = fakeJobSetupView.formData.clientEntityId;
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.clientEntityId)).toHaveAttribute('value', expectedValue.toString());
        });

        it('has correct defaultOption prop', () => {
          const expectedDefaultOption = 'Select a value';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.clientEntityId)).toHaveAttribute('defaultOption', expectedDefaultOption);
        });

        it('has correct options prop (default)', () => {
          const expectedOptions = JSON.stringify([]);
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.clientEntityId)).toHaveAttribute('options', expectedOptions);
        });

        it('has correct isLoading prop', () => {
          const isLoading = faker.datatype.boolean();
          newEngagementInstanceSlice.selectLookups.mockReturnValue({
            ...fakeLookups,
            clientEntities: { ...fakeLookups.clientEntities, isLoading }
          });
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.clientEntityId)).toHaveAttribute('isLoading', isLoading.toString());
        });

        it('has correct loadingText prop', () => {
          const loadingText = 'Loading entities...';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.clientEntityId)).toHaveAttribute('loadingText', loadingText);
        });

        describe('new entity button add-on', () => {
          it('is rendered', () => {
            const addOnText = 'New Entity';
            render(getComponentToRender(defaultProps));
            const control = screen.getByTestId(testIds.clientEntityId);
            expect(within(control).getByText(addOnText)).toBeInTheDocument();
            expect(within(control).getByText(addOnText)).toHaveAttribute('data-add-on');
          });

          it.todo('does something when clicked');

          it('does nothing when clicked', () => {
            const addOnText = 'New Entity';
            render(getComponentToRender(defaultProps));
            fireEvent.click(screen.getByText(addOnText));
            expect(true).toBeTruthy();
          });
        });

        describe('functional', () => {
          it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
            render(getComponentToRender(defaultProps));
            expect(hocInjectedProps.handleInputFieldValueChanged).not.toHaveBeenCalled();
            fireEvent.click(screen.getByTestId(testIds.clientEntityId));
            expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
          });
        });
      });
    });

    describe('entityLegalName', () => {
      it('does not render when formData.entityLegalName has no value', () => {
        const entityLegalName = null;
        const jobSetupView = { ...fakeJobSetupView, formData: { ...fakeJobSetupView.formData, entityLegalName } };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.entityLegalName)).not.toBeInTheDocument();
      });

      it('renders when formData.entityLegalName has a value', () => {
        const entityLegalName = faker.random.alphaNumeric(10);
        const jobSetupView = { ...fakeJobSetupView, formData: { ...fakeJobSetupView.formData, entityLegalName } };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.entityLegalName)).toBeInTheDocument();
      });

      describe('when rendered', () => {
        const entityLegalName = faker.random.alphaNumeric(10);
        const jobSetupView = { ...fakeJobSetupView, formData: { ...fakeJobSetupView.formData, entityLegalName } };

        beforeEach(() => {
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
        });

        it('has correct name prop', () => {
          const expectedName = 'entityLegalName';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.entityLegalName)).toHaveAttribute('name', expectedName);
        });

        it('has correct label prop', () => {
          const expectedLabel = 'Entity Legal Name will be:';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.entityLegalName)).toHaveAttribute('label', expectedLabel);
        });

        it('has correct value prop', () => {
          const expectedValue = jobSetupView.formData.entityLegalName;
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.entityLegalName)).toHaveAttribute('value', expectedValue);
        });

        it('is readOnly', () => {
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.entityLegalName)).toHaveAttribute('readOnly');
        });

        describe('edit button add-on', () => {
          it('is rendered', () => {
            const addOnText = 'Edit';
            render(getComponentToRender(defaultProps));
            const control = screen.getByTestId(testIds.entityLegalName);
            expect(within(control).getByText(addOnText)).toBeInTheDocument();
            expect(within(control).getByText(addOnText)).toHaveAttribute('data-add-on');
          });

          it.todo('does something when clicked');

          it('does nothing when clicked', () => {
            const addOnText = 'Edit';
            render(getComponentToRender(defaultProps));
            fireEvent.click(screen.getByText(addOnText));
            expect(true).toBeTruthy();
          });
        });

        describe('use existing entity button add-on', () => {
          it('is rendered', () => {
            const addOnText = 'Use Existing Entity';
            render(getComponentToRender(defaultProps));
            const control = screen.getByTestId(testIds.entityLegalName);
            expect(within(control).getByText(addOnText)).toBeInTheDocument();
            expect(within(control).getByText(addOnText)).toHaveAttribute('data-add-on');
          });

          it.todo('does something when clicked');

          it('does nothing when clicked', () => {
            const addOnText = 'Use Existing Entity';
            render(getComponentToRender(defaultProps));
            fireEvent.click(screen.getByText(addOnText));
            expect(true).toBeTruthy();
          });
        });
      });
    });

    describe('additionalCustomCharacters', () => {
      it.each([{ allowsAdditionalCharactersInJobName: false }, { allowsAdditionalCharactersInJobName: null }])(
        'does not render when jobHierarchy.allowsAdditionalCharactersInJobName is $allowsAdditionalCharactersInJobName (not true)',
        ({ allowsAdditionalCharactersInJobName }) => {
          const jobHierarchy = { ...fakeJobHierarchy, allowsAdditionalCharactersInJobName };
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
          render(getComponentToRender(defaultProps));
          expect(screen.queryByTestId(testIds.additionalCustomCharacters)).not.toBeInTheDocument();
        }
      );

      it('renders when jobHierarchy.allowsAdditionalCharactersInJobName is true', () => {
        const allowsAdditionalCharactersInJobName = true;
        const jobHierarchy = { ...fakeJobHierarchy, allowsAdditionalCharactersInJobName };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.additionalCustomCharacters)).toBeInTheDocument();
      });

      describe('when rendered', () => {
        const allowsAdditionalCharactersInJobName = true;
        const jobHierarchy = { ...fakeJobHierarchy, allowsAdditionalCharactersInJobName };

        beforeEach(() => {
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        });

        it('has correct name prop', () => {
          const expectedName = 'additionalCustomCharacters';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.additionalCustomCharacters)).toHaveAttribute('name', expectedName);
        });

        it('has correct label prop', () => {
          const expectedLabel = 'Additional Custom Characters:';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.additionalCustomCharacters)).toHaveAttribute('label', expectedLabel);
        });

        it('has correct value prop', () => {
          const expectedValue = fakeJobSetupView.formData.additionalCustomCharacters;
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.additionalCustomCharacters)).toHaveAttribute('value', expectedValue);
        });

        it('has correct placeholder prop', () => {
          const expectedPlaceholder = 'Type a value';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.additionalCustomCharacters)).toHaveAttribute(
            'placeholder',
            expectedPlaceholder
          );
        });

        describe('functional', () => {
          it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
            render(getComponentToRender(defaultProps));
            expect(hocInjectedProps.handleInputFieldValueChanged).not.toHaveBeenCalled();
            fireEvent.click(screen.getByTestId(testIds.additionalCustomCharacters));
            expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
          });
        });
      });
    });

    describe('forPeriodEndedDate', () => {
      it('has correct name prop', () => {
        const expectedName = 'forPeriodEndedDate';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.forPeriodEndedDate)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'For Period Ended Date:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.forPeriodEndedDate)).toHaveAttribute('label', expectedLabel);
      });

      it('has no value prop when formData.forPeriodEndedDate has no value', () => {
        const formData = { ...fakeJobSetupView.formData, forPeriodEndedDate: null };
        const jobSetupView = { ...fakeJobSetupView, formData };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.forPeriodEndedDate)).not.toHaveAttribute('value');
      });

      it('has correct value when formData.forPeriodEndedDate has a value', () => {
        const date = faker.date.recent();
        const formData = { ...fakeJobSetupView.formData, forPeriodEndedDate: date.toISOString() };
        const jobSetupView = { ...fakeJobSetupView, formData };
        const expectedValue = date.toString();
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.forPeriodEndedDate)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceholder = 'Select a date';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.forPeriodEndedDate)).toHaveAttribute('placeholder', expectedPlaceholder);
      });

      describe('functional', () => {
        it('invokes handleDatePickerValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleDatePickerValueChanged).not.toHaveBeenCalled();
          fireEvent.click(screen.getByTestId(testIds.forPeriodEndedDate));
          expect(hocInjectedProps.handleDatePickerValueChanged).toHaveBeenCalled();
        });
      });
    });

    describe('jobNameYear', () => {
      it('does not render when jobHierarchy.complianceJobTypeId is not Tax', () => {
        const complianceJobTypeId = faker.datatype.number({ min: 100 });
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.jobNameYear)).not.toBeInTheDocument();
      });

      it('renders when jobHierarchy.complianceJobTypeId is Tax', () => {
        const complianceJobTypeId = COMPLIANCE_JOB_TYPES.Tax.id;
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.jobNameYear)).toBeInTheDocument();
      });

      describe('when rendered', () => {
        const complianceJobTypeId = COMPLIANCE_JOB_TYPES.Tax.id;
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };

        beforeEach(() => {
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        });

        it('has correct name prop', () => {
          const expectedName = 'jobNameYear';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.jobNameYear)).toHaveAttribute('name', expectedName);
        });

        it('has correct label prop', () => {
          const expectedLabel = 'Form Year:';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.jobNameYear)).toHaveAttribute('label', expectedLabel);
        });

        it('has correct value prop', () => {
          const expectedValue = fakeJobSetupView.formData.jobNameYear;
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.jobNameYear)).toHaveAttribute('value', expectedValue.toString());
        });

        it('has correct defaultOption prop', () => {
          const expectedDefaultOption = 'Select a value';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.jobNameYear)).toHaveAttribute('defaultOption', expectedDefaultOption);
        });

        it('has correct options prop (default)', () => {
          const expectedOptions = JSON.stringify([]);
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.jobNameYear)).toHaveAttribute('options', expectedOptions);
        });

        it('has correct isLoading prop', () => {
          const expectedIsLoading = false;
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.jobNameYear)).toHaveAttribute('isLoading', expectedIsLoading.toString());
        });

        it('has correct loadingText prop', () => {
          const loadingText = 'Loading form years...';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.jobNameYear)).toHaveAttribute('loadingText', loadingText);
        });

        describe('functional', () => {
          it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
            render(getComponentToRender(defaultProps));
            expect(hocInjectedProps.handleInputFieldValueChanged).not.toHaveBeenCalled();
            fireEvent.click(screen.getByTestId(testIds.jobNameYear));
            expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
          });
        });
      });
    });

    describe('jobName TextBox', () => {
      const elementLabel = 'Job Name:';

      it('does not render when jobHierarchy.complianceJobTypeId is not null', () => {
        const complianceJobTypeId = faker.datatype.number();
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        const element = screen
          .queryAllByTestId(testIds.jobName)
          .find((o) => o.attributes.getNamedItem('label').value === elementLabel);
        expect(element).toBeUndefined();
      });

      it('renders when jobHierarchy.complianceJobTypeId is null', () => {
        const complianceJobTypeId = null;
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        const element = screen
          .getAllByTestId(testIds.jobName)
          .find((o) => o.attributes.getNamedItem('label').value === elementLabel);
        expect(element).toBeDefined();
      });

      describe('when rendered', () => {
        const complianceJobTypeId = null;
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };

        beforeEach(() => {
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        });

        it('has correct name prop', () => {
          const expectedName = 'jobName';
          render(getComponentToRender(defaultProps));
          const element = screen
            .getAllByTestId(testIds.jobName)
            .find((o) => o.attributes.getNamedItem('label').value === elementLabel);
          expect(element).toHaveAttribute('name', expectedName);
        });

        it('has correct label prop', () => {
          const expectedLabel = elementLabel;
          render(getComponentToRender(defaultProps));
          const element = screen
            .getAllByTestId(testIds.jobName)
            .find((o) => o.attributes.getNamedItem('label').value === expectedLabel);
          expect(element).toHaveAttribute('label', expectedLabel);
        });

        it('has correct value prop', () => {
          const expectedValue = fakeJobSetupView.formData.jobName;
          render(getComponentToRender(defaultProps));
          const element = screen
            .getAllByTestId(testIds.jobName)
            .find((o) => o.attributes.getNamedItem('label').value === elementLabel);
          expect(element).toHaveAttribute('value', expectedValue);
        });

        it('has correct placeholder prop', () => {
          const expectedPlaceholder = 'Type a value';
          render(getComponentToRender(defaultProps));
          const element = screen
            .getAllByTestId(testIds.jobName)
            .find((o) => o.attributes.getNamedItem('label').value === elementLabel);
          expect(element).toHaveAttribute('placeholder', expectedPlaceholder);
        });

        describe('functional', () => {
          it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
            render(getComponentToRender(defaultProps));
            expect(hocInjectedProps.handleInputFieldValueChanged).not.toHaveBeenCalled();
            const element = screen
              .getAllByTestId(testIds.jobName)
              .find((o) => o.attributes.getNamedItem('label').value === elementLabel);
            fireEvent.click(element);
            expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
          });
        });
      });
    });

    describe('jobName ReadonlyFormField', () => {
      const elementLabel = 'Job Name will be:';

      it('does not render when jobHierarchy.complianceJobTypeId is null', () => {
        const complianceJobTypeId = null;
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        const element = screen
          .queryAllByTestId(testIds.jobName)
          .find((o) => o.attributes.getNamedItem('label').value === elementLabel);
        expect(element).toBeUndefined();
      });

      it('renders when jobHierarchy.complianceJobTypeId is not null', () => {
        const complianceJobTypeId = faker.datatype.number();
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        const element = screen
          .getAllByTestId(testIds.jobName)
          .find((o) => o.attributes.getNamedItem('label').value === elementLabel);
        expect(element).toBeDefined();
      });

      describe('when rendered', () => {
        const complianceJobTypeId = faker.datatype.number();
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };

        beforeEach(() => {
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        });

        it('has correct name prop', () => {
          const expectedName = 'jobName';
          render(getComponentToRender(defaultProps));
          const element = screen
            .getAllByTestId(testIds.jobName)
            .find((o) => o.attributes.getNamedItem('label').value === elementLabel);
          expect(element).toHaveAttribute('name', expectedName);
        });

        it('has correct label prop', () => {
          const expectedLabel = elementLabel;
          render(getComponentToRender(defaultProps));
          const element = screen
            .getAllByTestId(testIds.jobName)
            .find((o) => o.attributes.getNamedItem('label').value === expectedLabel);
          expect(element).toHaveAttribute('label', expectedLabel);
        });

        it('has correct value prop', () => {
          const expectedValue = fakeJobSetupView.formData.jobName;
          render(getComponentToRender(defaultProps));
          const element = screen
            .getAllByTestId(testIds.jobName)
            .find((o) => o.attributes.getNamedItem('label').value === elementLabel);
          expect(element).toHaveAttribute('value', expectedValue);
        });
      });
    });

    describe('expectedFees', () => {
      it.each([{ allowsExpectedFees: false }, { allowsExpectedFees: null }])(
        'does not render when jobHierarchy.allowsExpectedFees is $allowsExpectedFees (not true)',
        ({ allowsExpectedFees }) => {
          const jobHierarchy = { ...fakeJobHierarchy, allowsExpectedFees };
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
          render(getComponentToRender(defaultProps));
          expect(screen.queryByTestId(testIds.expectedFees)).not.toBeInTheDocument();
        }
      );

      it('renders when jobHierarchy.allowsExpectedFees is true', () => {
        const allowsExpectedFees = true;
        const jobHierarchy = { ...fakeJobHierarchy, allowsExpectedFees };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.expectedFees)).toBeInTheDocument();
      });

      describe('when rendered', () => {
        const allowsExpectedFees = true;
        const jobHierarchy = { ...fakeJobHierarchy, allowsExpectedFees };

        beforeEach(() => {
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        });

        it('has correct name prop', () => {
          const expectedName = 'expectedFees';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.expectedFees)).toHaveAttribute('name', expectedName);
        });

        it('has correct label prop', () => {
          const expectedLabel = 'Expected Fees (for this job):';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.expectedFees)).toHaveAttribute('label', expectedLabel);
        });

        it('has correct value prop', () => {
          const expectedValue = fakeJobSetupView.formData.expectedFees;
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.expectedFees)).toHaveAttribute('value', expectedValue);
        });

        it('has correct placeholder prop', () => {
          const expectedPlaceholder = 'Type a value';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.expectedFees)).toHaveAttribute('placeholder', expectedPlaceholder);
        });

        describe('functional', () => {
          it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
            render(getComponentToRender(defaultProps));
            expect(hocInjectedProps.handleInputFieldValueChanged).not.toHaveBeenCalled();
            fireEvent.click(screen.getByTestId(testIds.expectedFees));
            expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
          });
        });
      });
    });

    describe('expectedRealization', () => {
      it.each([{ allowsExpectedRealization: false }, { allowsExpectedRealization: null }])(
        'does not render when jobHierarchy.allowsExpectedRealization is $allowsExpectedRealization (not true)',
        ({ allowsExpectedRealization }) => {
          const jobHierarchy = { ...fakeJobHierarchy, allowsExpectedRealization };
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
          render(getComponentToRender(defaultProps));
          expect(screen.queryByTestId(testIds.expectedRealization)).not.toBeInTheDocument();
        }
      );

      it('renders when jobHierarchy.allowsExpectedRealization is true', () => {
        const allowsExpectedRealization = true;
        const jobHierarchy = { ...fakeJobHierarchy, allowsExpectedRealization };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.expectedRealization)).toBeInTheDocument();
      });

      describe('when rendered', () => {
        const allowsExpectedRealization = true;
        const jobHierarchy = { ...fakeJobHierarchy, allowsExpectedRealization };

        beforeEach(() => {
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        });

        it('has correct name prop', () => {
          const expectedName = 'expectedRealization';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.expectedRealization)).toHaveAttribute('name', expectedName);
        });

        it('has correct label prop', () => {
          const expectedLabel = 'Expected Realization (for this job):';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.expectedRealization)).toHaveAttribute('label', expectedLabel);
        });

        it('has correct value prop', () => {
          const expectedValue = fakeJobSetupView.formData.expectedRealization;
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.expectedRealization)).toHaveAttribute('value', expectedValue);
        });

        it('has correct placeholder prop', () => {
          const expectedPlaceholder = 'Type a value';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.expectedRealization)).toHaveAttribute('placeholder', expectedPlaceholder);
        });

        describe('functional', () => {
          it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
            render(getComponentToRender(defaultProps));
            expect(hocInjectedProps.handleInputFieldValueChanged).not.toHaveBeenCalled();
            fireEvent.click(screen.getByTestId(testIds.expectedRealization));
            expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
          });
        });
      });
    });

    describe('expectedJobBudgetHours', () => {
      it.each([{ allowsBudgetHours: false }, { allowsBudgetHours: null }])(
        'does not render when jobHierarchy.allowsBudgetHours is $allowsBudgetHours (not true)',
        ({ allowsBudgetHours }) => {
          const jobHierarchy = { ...fakeJobHierarchy, allowsBudgetHours };
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
          render(getComponentToRender(defaultProps));
          expect(screen.queryByTestId(testIds.expectedJobBudgetHours)).not.toBeInTheDocument();
        }
      );

      it('renders when jobHierarchy.allowsBudgetHours is true', () => {
        const allowsBudgetHours = true;
        const jobHierarchy = { ...fakeJobHierarchy, allowsBudgetHours };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.expectedJobBudgetHours)).toBeInTheDocument();
      });

      describe('when rendered', () => {
        const allowsBudgetHours = true;
        const jobHierarchy = { ...fakeJobHierarchy, allowsBudgetHours };

        beforeEach(() => {
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        });

        it('has correct name prop', () => {
          const expectedName = 'expectedJobBudgetHours';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.expectedJobBudgetHours)).toHaveAttribute('name', expectedName);
        });

        it('has correct label prop', () => {
          const expectedLabel = 'Expected Job Budget Hours:';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.expectedJobBudgetHours)).toHaveAttribute('label', expectedLabel);
        });

        it('has correct value prop', () => {
          const expectedValue = fakeJobSetupView.formData.expectedJobBudgetHours;
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.expectedJobBudgetHours)).toHaveAttribute('value', expectedValue);
        });

        it('has correct placeholder prop', () => {
          const expectedPlaceholder = 'Type a value';
          render(getComponentToRender(defaultProps));
          expect(screen.getByTestId(testIds.expectedJobBudgetHours)).toHaveAttribute(
            'placeholder',
            expectedPlaceholder
          );
        });

        describe('functional', () => {
          it('does not yet invoke handleInputFieldValueChanged when the onChange event is triggered', () => {
            render(getComponentToRender(defaultProps));
            expect(hocInjectedProps.handleInputFieldValueChanged).not.toHaveBeenCalled();
            fireEvent.click(screen.getByTestId(testIds.expectedJobBudgetHours));
            expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
          });
        });
      });
    });

    describe('descriptionOfOtherAttestationEngagement', () => {
      it('has correct name prop', () => {
        const expectedName = 'descriptionOfOtherAttestationEngagement';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.descriptionOfOtherAttestationEngagement)).toHaveAttribute(
          'name',
          expectedName
        );
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Attest Other - Describe for Other Attestation Engagements:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.descriptionOfOtherAttestationEngagement)).toHaveAttribute(
          'label',
          expectedLabel
        );
      });

      it('has correct value prop', () => {
        const expectedValue = fakeJobSetupView.formData.descriptionOfOtherAttestationEngagement;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.descriptionOfOtherAttestationEngagement)).toHaveAttribute(
          'value',
          expectedValue
        );
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceholder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.descriptionOfOtherAttestationEngagement)).toHaveAttribute(
          'placeholder',
          expectedPlaceholder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.descriptionOfOtherAttestationEngagement)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleInputFieldValueChanged).not.toHaveBeenCalled();
          fireEvent.click(screen.getByTestId(testIds.descriptionOfOtherAttestationEngagement));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
        });
      });
    });

    describe('descriptionOfNonAttestServices', () => {
      it('has correct name prop', () => {
        const expectedName = 'descriptionOfNonAttestServices';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.descriptionOfNonAttestServices)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel =
          'Non Attest Engagements - Please provide complete description of the services proposed for this ' +
          'engagement so that approvers will understand the nature of the engagement:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.descriptionOfNonAttestServices)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeJobSetupView.formData.descriptionOfNonAttestServices;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.descriptionOfNonAttestServices)).toHaveAttribute('value', expectedValue);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceholder = 'Type a value';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.descriptionOfNonAttestServices)).toHaveAttribute(
          'placeholder',
          expectedPlaceholder
        );
      });

      it('has correct rows prop', () => {
        const expectedRows = 6;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.descriptionOfNonAttestServices)).toHaveAttribute(
          'rows',
          expectedRows.toString()
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleInputFieldValueChanged).not.toHaveBeenCalled();
          fireEvent.click(screen.getByTestId(testIds.descriptionOfNonAttestServices));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
        });
      });
    });

    describe('isBusinessCoveringTheCost', () => {
      it('does not render when jobHierarchy.complianceJobTypeId is not Tax', () => {
        const complianceJobTypeId = faker.datatype.number({ min: 100 });
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.isBusinessCoveringTheCost)).not.toBeInTheDocument();
      });

      it('renders when jobHierarchy.complianceJobTypeId is Tax', () => {
        const complianceJobTypeId = COMPLIANCE_JOB_TYPES.Tax.id;
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.isBusinessCoveringTheCost)).toBeInTheDocument();
      });

      describe('when rendered', () => {
        const complianceJobTypeId = COMPLIANCE_JOB_TYPES.Tax.id;
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };

        beforeEach(() => {
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        });

        it('has correct name prop', () => {
          const expectedName = 'isBusinessCoveringTheCost';
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.isBusinessCoveringTheCost)).toHaveAttribute('name', expectedName);
        });

        it('has correct label prop', () => {
          const expectedLabel =
            'Is this business client covering the cost of expat return preparation on behalf of its expat or ' +
            'inpat employees?';
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.isBusinessCoveringTheCost)).toHaveAttribute('label', expectedLabel);
        });

        it('has horizontalItems prop', () => {
          const expectedHorizontalItems = true;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.isBusinessCoveringTheCost)).toHaveAttribute(
            'horizontalItems',
            expectedHorizontalItems.toString()
          );
        });

        it('has correct selectedValue prop', () => {
          const expectedSelectedValue = fakeJobSetupView.formData.isBusinessCoveringTheCost;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.isBusinessCoveringTheCost)).toHaveAttribute(
            'selectedValue',
            expectedSelectedValue.toString()
          );
        });

        it('has correct options prop', () => {
          const expectedOptions = YesNoRadioButtonListOptions;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.isBusinessCoveringTheCost)).toHaveAttribute(
            'options',
            JSON.stringify(expectedOptions)
          );
        });

        it('has dynamicAlert when value is true', () => {
          // * ARRANGE
          const formData = { ...fakeJobSetupView.formData, isBusinessCoveringTheCost: true };
          const jobSetupView = { ...fakeJobSetupView, formData };
          const expectedText = new RegExp(
            /Because you answered YES to this question, an International Individual Compliance /.source +
              /job code needs to be created\./.source +
              /This job will not be automatically created\. /.source +
              /You must navigate to the Nature of Service tab and create the job\./.source
          );
          const expectedType = DYNAMIC_ALERT_TYPES.warning;
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          const control = screen.getByTestId(testIds.isBusinessCoveringTheCost);
          const dynamicAlert = within(control).getByTestId(
            `${testIds.isBusinessCoveringTheCost}-${testIds.dynamicAlert}`
          );
          expect(dynamicAlert).toBeInTheDocument();
          expect(dynamicAlert).toHaveTextContent(expectedText);
          expect(dynamicAlert).toHaveAttribute('type', JSON.stringify(expectedType));
        });

        it('does not have dynamicAlert when value is not true', () => {
          // * ARRANGE
          const formData = { ...fakeJobSetupView.formData, isBusinessCoveringTheCost: faker.random.alpha(10) };
          const jobSetupView = { ...fakeJobSetupView, formData };
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          const control = screen.getByTestId(testIds.isBusinessCoveringTheCost);
          const dynamicAlert = within(control).queryByTestId(
            `${testIds.isBusinessCoveringTheCost}-${testIds.dynamicAlert}`
          );
          expect(dynamicAlert).not.toBeInTheDocument();
        });

        describe('functional', () => {
          it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
            render(getComponentToRender());
            expect(hocInjectedProps.handleInputFieldValueChanged).not.toHaveBeenCalled();
            fireEvent.click(screen.getByTestId(testIds.isBusinessCoveringTheCost));
            expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
          });
        });
      });
    });

    describe('areAnySpecialReturnsNeeded', () => {
      it('does not render when jobHierarchy.complianceJobTypeId is not Tax', () => {
        const complianceJobTypeId = faker.datatype.number({ min: 100 });
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.areAnySpecialReturnsNeeded)).not.toBeInTheDocument();
      });

      it('renders when jobHierarchy.complianceJobTypeId is Tax', () => {
        const complianceJobTypeId = COMPLIANCE_JOB_TYPES.Tax.id;
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.areAnySpecialReturnsNeeded)).toBeInTheDocument();
      });

      describe('when rendered', () => {
        const complianceJobTypeId = COMPLIANCE_JOB_TYPES.Tax.id;
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };

        beforeEach(() => {
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        });

        it('has correct name prop', () => {
          const expectedName = 'areAnySpecialReturnsNeeded';
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.areAnySpecialReturnsNeeded)).toHaveAttribute('name', expectedName);
        });

        it('has correct label prop', () => {
          const expectedLabel = 'Will returns for 1120-F, 8858, 8865, 5471 or 1118 be needed?';
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.areAnySpecialReturnsNeeded)).toHaveAttribute('label', expectedLabel);
        });

        it('has horizontalItems prop', () => {
          const expectedHorizontalItems = true;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.areAnySpecialReturnsNeeded)).toHaveAttribute(
            'horizontalItems',
            expectedHorizontalItems.toString()
          );
        });

        it('has correct selectedValue prop', () => {
          const expectedSelectedValue = fakeJobSetupView.formData.areAnySpecialReturnsNeeded;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.areAnySpecialReturnsNeeded)).toHaveAttribute(
            'selectedValue',
            expectedSelectedValue.toString()
          );
        });

        it('has correct options prop', () => {
          const expectedOptions = YesNoRadioButtonListOptions;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.areAnySpecialReturnsNeeded)).toHaveAttribute(
            'options',
            JSON.stringify(expectedOptions)
          );
        });

        it('has dynamicAlert when value is true', () => {
          // * ARRANGE
          const formData = { ...fakeJobSetupView.formData, areAnySpecialReturnsNeeded: true };
          const jobSetupView = { ...fakeJobSetupView, formData };
          const expectedText = new RegExp(
            /Because you answered YES to this question, an International Business Compliance /.source +
              /job code needs to be created\./.source +
              /This job will not be automatically created\. /.source +
              /You must navigate to the Nature of Service tab and create the job\./.source
          );
          const expectedType = DYNAMIC_ALERT_TYPES.warning;
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          const control = screen.getByTestId(testIds.areAnySpecialReturnsNeeded);
          const dynamicAlert = within(control).getByTestId(
            `${testIds.areAnySpecialReturnsNeeded}-${testIds.dynamicAlert}`
          );
          expect(dynamicAlert).toBeInTheDocument();
          expect(dynamicAlert).toHaveTextContent(expectedText);
          expect(dynamicAlert).toHaveAttribute('type', JSON.stringify(expectedType));
        });

        it('does not have dynamicAlert when value is not true', () => {
          // * ARRANGE
          const formData = { ...fakeJobSetupView.formData, areAnySpecialReturnsNeeded: faker.random.alpha(10) };
          const jobSetupView = { ...fakeJobSetupView, formData };
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          const control = screen.getByTestId(testIds.areAnySpecialReturnsNeeded);
          const dynamicAlert = within(control).queryByTestId(
            `${testIds.areAnySpecialReturnsNeeded}-${testIds.dynamicAlert}`
          );
          expect(dynamicAlert).not.toBeInTheDocument();
        });

        describe('functional', () => {
          it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
            render(getComponentToRender());
            expect(hocInjectedProps.handleInputFieldValueChanged).not.toHaveBeenCalled();
            fireEvent.click(screen.getByTestId(testIds.areAnySpecialReturnsNeeded));
            expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
          });
        });
      });
    });

    describe('hasMoreThanThreeForms5472', () => {
      it('does not render when jobHierarchy.complianceJobTypeId is not Tax', () => {
        const complianceJobTypeId = faker.datatype.number({ min: 100 });
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.hasMoreThanThreeForms5472)).not.toBeInTheDocument();
      });

      it('renders when jobHierarchy.complianceJobTypeId is Tax', () => {
        const complianceJobTypeId = COMPLIANCE_JOB_TYPES.Tax.id;
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.hasMoreThanThreeForms5472)).toBeInTheDocument();
      });

      describe('when rendered', () => {
        const complianceJobTypeId = COMPLIANCE_JOB_TYPES.Tax.id;
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };

        beforeEach(() => {
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        });

        it('has correct name prop', () => {
          const expectedName = 'hasMoreThanThreeForms5472';
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.hasMoreThanThreeForms5472)).toHaveAttribute('name', expectedName);
        });

        it('has correct label prop', () => {
          const expectedLabel = "Are there more than three form 5472's?";
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.hasMoreThanThreeForms5472)).toHaveAttribute('label', expectedLabel);
        });

        it('has horizontalItems prop', () => {
          const expectedHorizontalItems = true;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.hasMoreThanThreeForms5472)).toHaveAttribute(
            'horizontalItems',
            expectedHorizontalItems.toString()
          );
        });

        it('has correct selectedValue prop', () => {
          const expectedSelectedValue = fakeJobSetupView.formData.hasMoreThanThreeForms5472;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.hasMoreThanThreeForms5472)).toHaveAttribute(
            'selectedValue',
            expectedSelectedValue.toString()
          );
        });

        it('has correct options prop', () => {
          const expectedOptions = YesNoRadioButtonListOptions;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.hasMoreThanThreeForms5472)).toHaveAttribute(
            'options',
            JSON.stringify(expectedOptions)
          );
        });

        it('has dynamicAlert when value is true', () => {
          // * ARRANGE
          const formData = { ...fakeJobSetupView.formData, hasMoreThanThreeForms5472: true };
          const jobSetupView = { ...fakeJobSetupView, formData };
          const expectedText = new RegExp(
            /Because you answered YES to this question, an International Business Compliance /.source +
              /job code needs to be created\./.source +
              /This job will not be automatically created\. /.source +
              /You must navigate to the Nature of Service tab and create the job\./.source
          );
          const expectedType = DYNAMIC_ALERT_TYPES.warning;
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          const control = screen.getByTestId(testIds.hasMoreThanThreeForms5472);
          const dynamicAlert = within(control).getByTestId(
            `${testIds.hasMoreThanThreeForms5472}-${testIds.dynamicAlert}`
          );
          expect(dynamicAlert).toBeInTheDocument();
          expect(dynamicAlert).toHaveTextContent(expectedText);
          expect(dynamicAlert).toHaveAttribute('type', JSON.stringify(expectedType));
        });

        it('does not have dynamicAlert when value is not true', () => {
          // * ARRANGE
          const formData = { ...fakeJobSetupView.formData, hasMoreThanThreeForms5472: faker.random.alpha(10) };
          const jobSetupView = { ...fakeJobSetupView, formData };
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          const control = screen.getByTestId(testIds.hasMoreThanThreeForms5472);
          const dynamicAlert = within(control).queryByTestId(
            `${testIds.hasMoreThanThreeForms5472}-${testIds.dynamicAlert}`
          );
          expect(dynamicAlert).not.toBeInTheDocument();
        });

        describe('functional', () => {
          it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
            render(getComponentToRender());
            expect(hocInjectedProps.handleInputFieldValueChanged).not.toHaveBeenCalled();
            fireEvent.click(screen.getByTestId(testIds.hasMoreThanThreeForms5472));
            expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
          });
        });
      });
    });

    describe('hasMoreThanFiveBankAccountsForFinCen114', () => {
      it('does not render when jobHierarchy.complianceJobTypeId is not Tax', () => {
        const complianceJobTypeId = faker.datatype.number({ min: 100 });
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.hasMoreThanFiveBankAccountsForFinCen114)).not.toBeInTheDocument();
      });

      it('renders when jobHierarchy.complianceJobTypeId is Tax', () => {
        const complianceJobTypeId = COMPLIANCE_JOB_TYPES.Tax.id;
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.hasMoreThanFiveBankAccountsForFinCen114)).toBeInTheDocument();
      });

      describe('when rendered', () => {
        const complianceJobTypeId = COMPLIANCE_JOB_TYPES.Tax.id;
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };

        beforeEach(() => {
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        });

        it('has correct name prop', () => {
          const expectedName = 'hasMoreThanFiveBankAccountsForFinCen114';
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.hasMoreThanFiveBankAccountsForFinCen114)).toHaveAttribute(
            'name',
            expectedName
          );
        });

        it('has correct label prop', () => {
          const expectedLabel = 'Are there more than five bank accounts for Fin CEN 114?';
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.hasMoreThanFiveBankAccountsForFinCen114)).toHaveAttribute(
            'label',
            expectedLabel
          );
        });

        it('has horizontalItems prop', () => {
          const expectedHorizontalItems = true;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.hasMoreThanFiveBankAccountsForFinCen114)).toHaveAttribute(
            'horizontalItems',
            expectedHorizontalItems.toString()
          );
        });

        it('has correct selectedValue prop', () => {
          const expectedSelectedValue = fakeJobSetupView.formData.hasMoreThanFiveBankAccountsForFinCen114;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.hasMoreThanFiveBankAccountsForFinCen114)).toHaveAttribute(
            'selectedValue',
            expectedSelectedValue.toString()
          );
        });

        it('has correct options prop', () => {
          const expectedOptions = YesNoRadioButtonListOptions;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.hasMoreThanFiveBankAccountsForFinCen114)).toHaveAttribute(
            'options',
            JSON.stringify(expectedOptions)
          );
        });

        it('has dynamicAlert when value is true', () => {
          // * ARRANGE
          const formData = { ...fakeJobSetupView.formData, hasMoreThanFiveBankAccountsForFinCen114: true };
          const jobSetupView = { ...fakeJobSetupView, formData };
          const expectedText = new RegExp(
            /Because you answered YES to this question, an International Business Compliance /.source +
              /job code needs to be created\./.source +
              /This job will not be automatically created\. /.source +
              /You must navigate to the Nature of Service tab and create the job\./.source
          );
          const expectedType = DYNAMIC_ALERT_TYPES.warning;
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          const control = screen.getByTestId(testIds.hasMoreThanFiveBankAccountsForFinCen114);
          const dynamicAlert = within(control).getByTestId(
            `${testIds.hasMoreThanFiveBankAccountsForFinCen114}-${testIds.dynamicAlert}`
          );
          expect(dynamicAlert).toBeInTheDocument();
          expect(dynamicAlert).toHaveTextContent(expectedText);
          expect(dynamicAlert).toHaveAttribute('type', JSON.stringify(expectedType));
        });

        it('does not have dynamicAlert when value is not true', () => {
          // * ARRANGE
          const formData = {
            ...fakeJobSetupView.formData,
            hasMoreThanFiveBankAccountsForFinCen114: faker.random.alpha(10)
          };
          const jobSetupView = { ...fakeJobSetupView, formData };
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          const control = screen.getByTestId(testIds.hasMoreThanFiveBankAccountsForFinCen114);
          const dynamicAlert = within(control).queryByTestId(
            `${testIds.hasMoreThanFiveBankAccountsForFinCen114}-${testIds.dynamicAlert}`
          );
          expect(dynamicAlert).not.toBeInTheDocument();
        });

        describe('functional', () => {
          it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
            render(getComponentToRender());
            expect(hocInjectedProps.handleInputFieldValueChanged).not.toHaveBeenCalled();
            fireEvent.click(screen.getByTestId(testIds.hasMoreThanFiveBankAccountsForFinCen114));
            expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
          });
        });
      });
    });

    describe('willReturnsBePreparedForFivePlusStateLocal', () => {
      it('does not render when jobHierarchy.complianceJobTypeId is not Tax', () => {
        const complianceJobTypeId = faker.datatype.number({ min: 100 });
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.queryByTestId(testIds.willReturnsBePreparedForFivePlusStateLocal)).not.toBeInTheDocument();
      });

      it('renders when jobHierarchy.complianceJobTypeId is Tax', () => {
        const complianceJobTypeId = COMPLIANCE_JOB_TYPES.Tax.id;
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.willReturnsBePreparedForFivePlusStateLocal)).toBeInTheDocument();
      });

      describe('when rendered', () => {
        const complianceJobTypeId = COMPLIANCE_JOB_TYPES.Tax.id;
        const jobHierarchy = { ...fakeJobHierarchy, complianceJobTypeId };

        beforeEach(() => {
          newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);
        });

        it('has correct name prop', () => {
          const expectedName = 'willReturnsBePreparedForFivePlusStateLocal';
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.willReturnsBePreparedForFivePlusStateLocal)).toHaveAttribute(
            'name',
            expectedName
          );
        });

        it('has correct label prop', () => {
          const expectedLabel = 'Will returns be prepared for five or more state and local jurisdictions?';
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.willReturnsBePreparedForFivePlusStateLocal)).toHaveAttribute(
            'label',
            expectedLabel
          );
        });

        it('has horizontalItems prop', () => {
          const expectedHorizontalItems = true;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.willReturnsBePreparedForFivePlusStateLocal)).toHaveAttribute(
            'horizontalItems',
            expectedHorizontalItems.toString()
          );
        });

        it('has correct selectedValue prop', () => {
          const expectedSelectedValue = fakeJobSetupView.formData.willReturnsBePreparedForFivePlusStateLocal;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.willReturnsBePreparedForFivePlusStateLocal)).toHaveAttribute(
            'selectedValue',
            expectedSelectedValue.toString()
          );
        });

        it('has correct options prop', () => {
          const expectedOptions = YesNoRadioButtonListOptions;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.willReturnsBePreparedForFivePlusStateLocal)).toHaveAttribute(
            'options',
            JSON.stringify(expectedOptions)
          );
        });

        it('has dynamicAlert when value is true', () => {
          // * ARRANGE
          const formData = { ...fakeJobSetupView.formData, willReturnsBePreparedForFivePlusStateLocal: true };
          const jobSetupView = { ...fakeJobSetupView, formData };
          const expectedText = new RegExp(
            /Because you answered YES to this question, a SALT Compliance job code /.source +
              /needs to be created\./.source +
              /This job will not be automatically created\. /.source +
              /You must navigate to the Nature of Service tab and create the job\./.source
          );
          const expectedType = DYNAMIC_ALERT_TYPES.warning;
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          const control = screen.getByTestId(testIds.willReturnsBePreparedForFivePlusStateLocal);
          const dynamicAlert = within(control).getByTestId(
            `${testIds.willReturnsBePreparedForFivePlusStateLocal}-${testIds.dynamicAlert}`
          );
          expect(dynamicAlert).toBeInTheDocument();
          expect(dynamicAlert).toHaveTextContent(expectedText);
          expect(dynamicAlert).toHaveAttribute('type', JSON.stringify(expectedType));
        });

        it('does not have dynamicAlert when value is not true', () => {
          // * ARRANGE
          const formData = {
            ...fakeJobSetupView.formData,
            willReturnsBePreparedForFivePlusStateLocal: faker.random.alpha(10)
          };
          const jobSetupView = { ...fakeJobSetupView, formData };
          newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          const control = screen.getByTestId(testIds.willReturnsBePreparedForFivePlusStateLocal);
          const dynamicAlert = within(control).queryByTestId(
            `${testIds.willReturnsBePreparedForFivePlusStateLocal}-${testIds.dynamicAlert}`
          );
          expect(dynamicAlert).not.toBeInTheDocument();
        });

        describe('functional', () => {
          it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
            render(getComponentToRender());
            expect(hocInjectedProps.handleInputFieldValueChanged).not.toHaveBeenCalled();
            fireEvent.click(screen.getByTestId(testIds.willReturnsBePreparedForFivePlusStateLocal));
            expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
          });
        });
      });
    });

    describe('isApprovingEngagementPartner', () => {
      it('has correct name prop', () => {
        const expectedName = 'isApprovingEngagementPartner';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.isApprovingEngagementPartner)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Is this the approving Responsible Engagement Partner for the entire workflow?';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.isApprovingEngagementPartner)).toHaveAttribute('label', expectedLabel);
      });

      it('has horizontalItems prop', () => {
        const expectedHorizontalItems = true;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.isApprovingEngagementPartner)).toHaveAttribute(
          'horizontalItems',
          expectedHorizontalItems.toString()
        );
      });

      it('has correct selectedValue prop', () => {
        const expectedSelectedValue = fakeJobSetupView.formData.isApprovingEngagementPartner;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.isApprovingEngagementPartner)).toHaveAttribute(
          'selectedValue',
          expectedSelectedValue.toString()
        );
      });

      it('has correct options prop', () => {
        const expectedOptions = YesNoRadioButtonListOptions;
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.isApprovingEngagementPartner)).toHaveAttribute(
          'options',
          JSON.stringify(expectedOptions)
        );
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender());
          expect(hocInjectedProps.handleInputFieldValueChanged).not.toHaveBeenCalled();
          fireEvent.click(screen.getByTestId(testIds.isApprovingEngagementPartner));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
        });
      });
    });
  });

  describe('exported functions', () => {
    describe('getJobNameYears', () => {
      // **********************************************************************
      // * setup

      beforeEach(() => {
        // restore functionality to getJobNameYears so that we can call and test it
        jobSetupFields.getJobNameYears.mockRestore();
      });

      // **********************************************************************
      // * tear-down

      // **********************************************************************
      // * execution

      it('returns correct results when includeYear has no value', () => {
        const includeYear = null;
        const currentYear = new Date().getFullYear();
        const expectedMinYear = currentYear - 8;
        const expectedMaxYear = currentYear + 2;
        const expectedLength = expectedMaxYear - expectedMinYear + 1;
        const actual = jobSetupFields.getJobNameYears(includeYear);

        expect(actual).toHaveLength(expectedLength);

        for (let ix = 0; ix < actual.length; ix++) {
          expect(actual[ix]).toBe(expectedMinYear + ix);
        }
      });

      it('returns correct results when includeYear has a value and is less than min year', () => {
        const currentYear = new Date().getFullYear();
        const expectedMinYear = currentYear - 8;
        const expectedMaxYear = currentYear + 2;
        const includeYear = expectedMinYear - faker.datatype.number();
        const expectedLength = expectedMaxYear - expectedMinYear + 2;
        const actual = jobSetupFields.getJobNameYears(includeYear);

        expect(actual).toHaveLength(expectedLength);

        // ensure all original years are there
        for (let ix = 0; ix < actual.length - 1; ix++) {
          expect(actual[ix]).toBe(expectedMinYear + ix);
        }

        // ensure the includeYear is there
        expect(actual[actual.length - 1]).toBe(includeYear);
      });

      it('returns correct results when includeYear has a value and is greater than max year', () => {
        const currentYear = new Date().getFullYear();
        const expectedMinYear = currentYear - 8;
        const expectedMaxYear = currentYear + 2;
        const includeYear = expectedMaxYear + faker.datatype.number();
        const expectedLength = expectedMaxYear - expectedMinYear + 2;
        const actual = jobSetupFields.getJobNameYears(includeYear);

        expect(actual).toHaveLength(expectedLength);

        // ensure all original years are there
        for (let ix = 0; ix < actual.length - 1; ix++) {
          expect(actual[ix]).toBe(expectedMinYear + ix);
        }

        // ensure the includeYear is there
        expect(actual[actual.length - 1]).toBe(includeYear);
      });
    });
  });
});
