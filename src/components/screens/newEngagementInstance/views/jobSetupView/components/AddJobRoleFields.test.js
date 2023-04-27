import ReactDOM from 'react-dom';
import * as reactRedux from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import PmArray from '../../../../../../helpers/customTypes/PmArray';
import JOB_ROLES from '../../../../../../helpers/enums/jobRoles';
import SORT_DIRECTION from '../../../../../../helpers/enums/sortDirection';
import * as newEngagementInstanceSlice from '../../../newEngagementInstanceSlice';
import * as newEngagementInstanceThunks from '../../../newEngagementInstanceThunks';

import AddJobRoleFields from './AddJobRoleFields';

// **********************************************************************
// * constants

const testIds = {
  // form fields
  jobRoleId: 'job-role-id',
  jobRoleStaffId: 'job-role-staff-id',

  // auto-complete events
  autoCompleteOnClearData: 'auto-complete-on-clear-data',
  autoCompleteOnResetItem: 'auto-complete-on-reset-item',
  autoCompleteOnSearch: 'auto-complete-on-search',
  autoCompleteOnSelect: 'auto-complete-on-select'
};

const defaultProps = {};

const hocInjectedProps = {
  handleAutoCompleteDataCleared: jest.fn(),
  handleAutoCompleteItemReset: jest.fn(),
  handleAutoCompleteItemSelected: jest.fn(),
  handleAutoCompleteSearch: jest.fn(),
  handleInputFieldValueChanged: jest.fn()
};

const fakeViewId = faker.random.alpha(10);

const fakeJobSetupView = {
  formData: {
    jobRoleStaffId: faker.datatype.number(),
    jobRoleAllowablePartnerRoleAssignmentId: faker.datatype.number(),
    jobRoleStaffDisplayName: faker.random.alpha(10),
    jobRoleId: faker.datatype.number()
  },

  lookups: {
    jobRoleStaff: { data: [], isLoading: false, error: null },
    allowablePartnerRoleAssignments: []
  }
};

const fakeJobHierarchy = {
  id: faker.datatype.number(),
  jobCategoryId: faker.datatype.number()
};

const fakeLookups = {
  jobCategoryRoles: { data: [] },
  jobRoles: { data: [] },
  regionHierarchies: { data: [] }
};

const mockSuggestion = {
  id: faker.datatype.number(),
  staffId: faker.datatype.number(),
  preferredFullName: faker.random.alpha(10),
  staffPreferredFullName: faker.random.alpha(10),
  regionHierarchyId: faker.datatype.number()
};

const mockDispatch = jest.fn();

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <AddJobRoleFields {...props} {...hocInjectedProps} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: (callback) => callback()
}));

jest.mock('../../../newEngagementInstanceSlice', () => ({
  selectCurrentView: jest.fn(),
  selectCurrentViewId: jest.fn(),
  selectJobHierarchy: jest.fn(),
  selectLookups: jest.fn(),
  viewFormDataChanged: jest.fn()
}));

jest.mock('../../../newEngagementInstanceThunks', () => ({
  createJobRole: jest.fn(),
  searchJobRoleStaff: jest.fn(),
  searchJobRoleStaffWhichHaveRoleAssignments: jest.fn(),
  searchJobRoleAllowablePartnerRoleAssignments: jest.fn()
}));

jest.mock('../../withNewEngagementInstanceViewData', () => (component) => component);

jest.mock('../../../components/autoComplete/AutoComplete', () => ({
  __esModule: true,
  default: ({
    name,
    label,
    placeholder,
    renderSuggestionOverride,
    selectedItem,
    matches,
    sourcePropertyNames,
    disabled,
    onClearData,
    onResetItem,
    onSearch,
    onSelect
  }) => {
    const props = { name, label, placeholder, disabled };

    // this is needed as we need a fake event passed to onSearch
    const event = 'fake-event';

    return (
      <fake-auto-complete
        {...props}
        selectedItem={JSON.stringify(selectedItem)}
        matches={JSON.stringify(matches)}
        sourcePropertyNames={JSON.stringify(sourcePropertyNames)}
        data-testid={testIds[name]}>
        {renderSuggestionOverride(mockSuggestion)}
        <button data-testid={`${testIds[name]}-${testIds.autoCompleteOnClearData}`} onClick={onClearData} />
        <button data-testid={`${testIds[name]}-${testIds.autoCompleteOnResetItem}`} onClick={onResetItem} />
        <button data-testid={`${testIds[name]}-${testIds.autoCompleteOnSelect}`} onClick={onSelect} />
        <button
          data-testid={`${testIds[name]}-${testIds.autoCompleteOnSearch}`}
          onClick={() => onSearch(event, sourcePropertyNames)}
        />
      </fake-auto-complete>
    );
  }
}));

jest.mock('../../../components/selectBox/SelectBox', () => ({
  __esModule: true,
  default: ({ name, label, defaultOption, options, onChange, isLoading, loadingText, value, disabled }) => {
    const props = { name, label, defaultOption, isLoading, loadingText, value, disabled };
    return (
      <fake-select-box {...props} options={JSON.stringify(options)} data-testid={testIds[name]} onClick={onChange} />
    );
  }
}));

// **********************************************************************
// * unit tests

describe('AddJobRoleFields', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    newEngagementInstanceSlice.selectCurrentViewId.mockReturnValue(fakeViewId);
    newEngagementInstanceSlice.selectCurrentView.mockReturnValue(fakeJobSetupView);
    newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(fakeJobHierarchy);
    newEngagementInstanceSlice.selectLookups.mockReturnValue(fakeLookups);
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
    describe('job role options', () => {
      it('sets the job role options correctly', () => {
        // * Arrange
        const jobHierarchy = { jobCategoryId: faker.datatype.number() };
        const itemCount = faker.datatype.number({ min: 10, max: 20 });

        const jobCategoryRoles = [...Array(itemCount).keys()].map((_, ix) => ({
          jobCategoryId: ix % 2 === 0 ? faker.datatype.number() : jobHierarchy.jobCategoryId,
          jobRoleId: faker.datatype.number()
        }));

        const jobRoles = [...Array(itemCount).keys()].map((_, ix) => ({
          isActive: faker.datatype.boolean(),
          id: jobCategoryRoles[ix].jobRoleId,
          displayName: faker.random.alpha(10)
        }));

        // we expect only job roles that match the jobHierarchy.jobCategoryId
        const expectedJobRoleIds = jobCategoryRoles
          .filter((jcr) => jcr.jobCategoryId === jobHierarchy.jobCategoryId)
          .map((jcr) => jcr.jobRoleId);

        // we expect a sorted array of active job roles for the correct job category id
        const expectedJobRoles = new PmArray(...jobRoles)
          .filter((jr) => jr.isActive && expectedJobRoleIds.includes(jr.id))
          .sortObjects('displayName', SORT_DIRECTION.ascending.abbreviation);

        const expectedOptions = expectedJobRoles.map((jobRole) => ({ value: jobRole.id, text: jobRole.displayName }));

        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          jobCategoryRoles: { ...fakeLookups.jobCategoryRoles, data: jobCategoryRoles },
          jobRoles: { ...fakeLookups.jobRoles, data: jobRoles }
        });
        newEngagementInstanceSlice.selectJobHierarchy.mockReturnValue(jobHierarchy);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.jobRoleId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });
    });
  });

  describe('rendering', () => {
    describe('jobRoleId', () => {
      it('has correct name prop', () => {
        const expectedName = 'jobRoleId';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.jobRoleId)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Job Role:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.jobRoleId)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct value prop', () => {
        const expectedValue = fakeJobSetupView.formData.jobRoleId;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.jobRoleId)).toHaveAttribute('value', expectedValue.toString());
      });

      it('has correct defaultOption prop', () => {
        const expectedDefaultOption = 'Select a job role';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.jobRoleId)).toHaveAttribute('defaultOption', expectedDefaultOption);
      });

      it('has correct options prop (default)', () => {
        const expectedOptions = JSON.stringify([]);
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.jobRoleId)).toHaveAttribute('options', expectedOptions);
      });

      it('has correct isLoading prop', () => {
        const expectedIsLoading = false;
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.jobRoleId)).toHaveAttribute('isLoading', expectedIsLoading.toString());
      });

      describe('functional', () => {
        it('invokes handleInputFieldValueChanged when the onChange event is triggered', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleInputFieldValueChanged).not.toHaveBeenCalled();
          fireEvent.click(screen.getByTestId(testIds.jobRoleId));
          expect(hocInjectedProps.handleInputFieldValueChanged).toHaveBeenCalled();
        });
      });
    });

    describe('jobRoleStaffId', () => {
      it('has correct name prop', () => {
        const expectedName = 'jobRoleStaffId';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.jobRoleStaffId)).toHaveAttribute('name', expectedName);
      });

      it('has correct label prop', () => {
        const expectedLabel = 'Name:';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.jobRoleStaffId)).toHaveAttribute('label', expectedLabel);
      });

      it('has correct placeholder prop', () => {
        const expectedPlaceHolder = 'Start typing to select a staff';
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.jobRoleStaffId)).toHaveAttribute('placeholder', expectedPlaceHolder);
      });

      it('has correct selectedItem prop', () => {
        // * ARRANGE
        const expectedSelectedItem = { id: '', displayName: '', forceReset: true };

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByTestId(testIds.jobRoleStaffId)).toHaveAttribute(
          'selectedItem',
          JSON.stringify(expectedSelectedItem)
        );
      });

      it('has correct matches prop', () => {
        const expectedMatches = { data: [], isLoading: false, error: null };
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.jobRoleStaffId)).toHaveAttribute('matches', JSON.stringify(expectedMatches));
      });

      it('has correct sourcePropertyNames prop', () => {
        const expectedSourcePropertyNames = {
          matches: 'jobRoleStaff',
          value: 'jobRoleStaffId',
          displayName: 'jobRoleStaffDisplayName'
        };
        render(getComponentToRender(defaultProps));
        expect(screen.getByTestId(testIds.jobRoleStaffId)).toHaveAttribute(
          'sourcePropertyNames',
          JSON.stringify(expectedSourcePropertyNames)
        );
      });

      it('has correct renderSuggestionOverride props when the selected job role is biller', () => {
        // * ARRANGE
        const jobSetupView = {
          ...fakeJobSetupView,
          formData: { ...fakeJobSetupView.formData, jobRoleId: JOB_ROLES.biller.id }
        };

        const itemCount = faker.datatype.number({ min: 10, max: 20 });
        const hierarchyData = [...Array(itemCount).keys()].map((_) => ({
          id: faker.datatype.number(),
          regionalImpactGroupName: faker.random.alpha(10)
        }));

        const expectedHierarchy = {
          id: mockSuggestion.regionHierarchyId,
          regionalImpactGroupName: faker.random.alpha(10)
        };

        hierarchyData.push(expectedHierarchy);

        const expectedValue =
          `${mockSuggestion.staffPreferredFullName} - ` +
          `${expectedHierarchy.regionalImpactGroupName} (${mockSuggestion.staffId})`;

        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          regionHierarchies: { data: [expectedHierarchy] }
        });

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByText(expectedValue)).toBeInTheDocument();
      });

      it('has correct renderSuggestionOverride props when the selected job role is not biller', () => {
        // * ARRANGE
        const jobSetupView = {
          ...fakeJobSetupView,
          formData: { ...fakeJobSetupView.formData, jobRoleId: faker.datatype.number({ min: 2 }) }
        };

        const expectedValue = `${mockSuggestion.preferredFullName} (${mockSuggestion.id})`;

        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);

        // * ACT
        render(getComponentToRender(defaultProps));

        // * ASSERT
        expect(screen.getByText(expectedValue)).toBeInTheDocument();
      });

      describe('functional', () => {
        it('invokes handleAutoCompleteDataCleared when the autocomplete onClearData event is fired', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleAutoCompleteDataCleared).not.toHaveBeenCalled();
          fireEvent.click(screen.getByTestId(`${testIds.jobRoleStaffId}-${testIds.autoCompleteOnClearData}`));
          expect(hocInjectedProps.handleAutoCompleteDataCleared).toHaveBeenCalled();
        });

        it('invokes handleAutoCompleteItemReset when the autocomplete onResetItem event is fired', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleAutoCompleteItemReset).not.toHaveBeenCalled();
          fireEvent.click(screen.getByTestId(`${testIds.jobRoleStaffId}-${testIds.autoCompleteOnResetItem}`));
          expect(hocInjectedProps.handleAutoCompleteItemReset).toHaveBeenCalled();
        });

        it('invokes handleAutoCompleteItemSelected when the autocomplete onSelect event is fired', () => {
          render(getComponentToRender(defaultProps));
          expect(hocInjectedProps.handleAutoCompleteItemSelected).not.toHaveBeenCalled();
          fireEvent.click(screen.getByTestId(`${testIds.jobRoleStaffId}-${testIds.autoCompleteOnSelect}`));
          expect(hocInjectedProps.handleAutoCompleteItemSelected).toHaveBeenCalled();
        });

        describe('when autocomplete onSearch event is fired', () => {
          it('invokes newEngagementInstanceThunks with correct args when the selected job role is biller', () => {
            // * ARRANGE
            const itemCount = faker.datatype.number({ min: 10, max: 20 });

            // create the job category role that we expect to be used for the selected job role id
            const expectedJobCategoryRole = {
              jobCategoryId: fakeJobHierarchy.jobCategoryId,
              jobRoleId: fakeJobSetupView.formData.jobRoleId,
              requiresEffectiveDate: true
            };

            // create a collection of job category roles
            const jobCategoryRoles = [...Array(itemCount).keys()].map((_, ix) => ({
              jobCategoryId: faker.datatype.number(),
              jobRoleId: faker.datatype.number()
            }));

            // add our expected job category role
            jobCategoryRoles.push(expectedJobCategoryRole);

            const jobSetupView = {
              ...fakeJobSetupView,
              formData: { ...fakeJobSetupView.formData, jobRoleId: JOB_ROLES.biller.id }
            };

            // setup our lookups object
            const hierarchyData = [...Array(itemCount).keys()].map((_) => ({
              id: faker.datatype.number(),
              regionalImpactGroupName: faker.random.alpha(10)
            }));

            const expectedHierarchy = {
              id: mockSuggestion.regionHierarchyId,
              regionalImpactGroupName: faker.random.alpha(10)
            };

            hierarchyData.push(expectedHierarchy);

            const lookups = {
              ...fakeLookups,
              jobCategoryRoles: { ...fakeLookups.jobCategoryRoles, data: jobCategoryRoles },
              regionHierarchies: { data: [expectedHierarchy] }
            };

            // define our expected args
            const expectedEvent = 'fake-event';
            const expectedSourcePropertyNames = {
              displayName: 'jobRoleStaffDisplayName',
              matches: 'jobRoleStaff',
              value: 'jobRoleAllowablePartnerRoleAssignmentId'
            };
            const expectedThunkMethod = newEngagementInstanceThunks.searchJobRoleAllowablePartnerRoleAssignments;

            newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
            newEngagementInstanceSlice.selectLookups.mockReturnValue(lookups);

            // * ACT
            render(getComponentToRender(defaultProps));
            expect(hocInjectedProps.handleAutoCompleteSearch).not.toHaveBeenCalled();
            fireEvent.click(screen.getByTestId(`${testIds.jobRoleStaffId}-${testIds.autoCompleteOnSearch}`));

            // * ASSERT
            expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalled();
            expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalledWith(
              expectedEvent,
              expectedSourcePropertyNames,
              expectedThunkMethod
            );
          });

          it(
            'invokes newEngagementInstanceThunks with correct args when selected job role is not biller ' +
              'and jobCategoryRole.requiresEffectiveDate is true and the selected job role is not biller',
            () => {
              // * ARRANGE
              const itemCount = faker.datatype.number({ min: 10, max: 20 });

              // create the job category role that we expect to be used for the selected job role id
              const expectedJobCategoryRole = {
                jobCategoryId: fakeJobHierarchy.jobCategoryId,
                jobRoleId: fakeJobSetupView.formData.jobRoleId,
                requiresEffectiveDate: true
              };

              // create a collection of job category roles
              const jobCategoryRoles = [...Array(itemCount).keys()].map((_, ix) => ({
                jobCategoryId: faker.datatype.number(),
                jobRoleId: faker.datatype.number()
              }));

              // add our expected job category role
              jobCategoryRoles.push(expectedJobCategoryRole);

              // setup our lookups object
              const lookups = {
                ...fakeLookups,
                jobCategoryRoles: { ...fakeLookups.jobCategoryRoles, data: jobCategoryRoles }
              };

              // define our expected args
              const expectedEvent = 'fake-event';
              const expectedSourcePropertyNames = {
                displayName: 'jobRoleStaffDisplayName',
                matches: 'jobRoleStaff',
                value: 'jobRoleStaffId'
              };
              const expectedThunkMethod = newEngagementInstanceThunks.searchJobRoleStaffWhichHaveRoleAssignments;

              newEngagementInstanceSlice.selectLookups.mockReturnValue(lookups);

              // * ACT
              render(getComponentToRender(defaultProps));
              expect(hocInjectedProps.handleAutoCompleteSearch).not.toHaveBeenCalled();
              fireEvent.click(screen.getByTestId(`${testIds.jobRoleStaffId}-${testIds.autoCompleteOnSearch}`));

              // * ASSERT
              expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalled();
              expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalledWith(
                expectedEvent,
                expectedSourcePropertyNames,
                expectedThunkMethod
              );
            }
          );

          it(
            'invokes handleAutoCompleteSearch with correct args when selected job role is not biller and ' +
              ' jobCategoryRole.requiresEffectiveDate is false',
            () => {
              // * ARRANGE
              const itemCount = faker.datatype.number({ min: 10, max: 20 });

              // create the job category role that we expect to be used for the selected job role id
              const expectedJobCategoryRole = {
                jobCategoryId: fakeJobHierarchy.jobCategoryId,
                jobRoleId: fakeJobSetupView.formData.jobRoleId,
                requiresEffectiveDate: false
              };

              // create a collection of job category roles
              const jobCategoryRoles = [...Array(itemCount).keys()].map((_, ix) => ({
                jobCategoryId: faker.datatype.number(),
                jobRoleId: faker.datatype.number()
              }));

              // add our expected job category role
              jobCategoryRoles.push(expectedJobCategoryRole);

              // setup our lookups object
              const lookups = {
                ...fakeLookups,
                jobCategoryRoles: { ...fakeLookups.jobCategoryRoles, data: jobCategoryRoles }
              };

              // define our expected args
              const expectedEvent = 'fake-event';
              const expectedSourcePropertyNames = {
                displayName: 'jobRoleStaffDisplayName',
                matches: 'jobRoleStaff',
                value: 'jobRoleStaffId'
              };
              const expectedThunkMethod = newEngagementInstanceThunks.searchJobRoleStaff;

              newEngagementInstanceSlice.selectLookups.mockReturnValue(lookups);

              // * ACT
              render(getComponentToRender(defaultProps));
              expect(hocInjectedProps.handleAutoCompleteSearch).not.toHaveBeenCalled();
              fireEvent.click(screen.getByTestId(`${testIds.jobRoleStaffId}-${testIds.autoCompleteOnSearch}`));

              // * ASSERT
              expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalled();
              expect(hocInjectedProps.handleAutoCompleteSearch).toHaveBeenCalledWith(
                expectedEvent,
                expectedSourcePropertyNames,
                expectedThunkMethod
              );
            }
          );
        });
      });
    });

    describe('Add Role button', () => {
      it('is rendered', () => {
        render(getComponentToRender(defaultProps));
        expect(screen.getByText('Add Role')).toBeInTheDocument();
      });

      it('is disabled when jobRoleId has no value', () => {
        const jobSetupView = {
          ...fakeJobSetupView,
          formData: { ...fakeJobSetupView.formData, jobRoleId: null }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
        render(getComponentToRender(defaultProps));
        expect(screen.getByText('Add Role')).toHaveAttribute('disabled');
      });

      it('is disabled when jobRoleStaffId and jobRoleAllowablePartnerRoleAssignmentId has no value', () => {
        const jobSetupView = {
          ...fakeJobSetupView,
          formData: {
            ...fakeJobSetupView.formData,
            jobRoleStaffId: null,
            jobRoleAllowablePartnerRoleAssignmentId: null
          }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
        render(getComponentToRender(defaultProps));
        expect(screen.getByText('Add Role')).toHaveAttribute('disabled');
      });

      it('is not disabled when jobRoleId and jobRoleStaffId both have values', () => {
        const jobSetupView = {
          ...fakeJobSetupView,
          formData: {
            ...fakeJobSetupView.formData,
            jobRoleId: faker.datatype.number(),
            jobRoleStaffId: faker.datatype.number()
          }
        };
        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
        render(getComponentToRender(defaultProps));
        expect(screen.getByText('Add Role')).not.toHaveAttribute('disabled');
      });

      it('dispatches createJobRole when clicked and the selected job role is biller', () => {
        // * ARRANGE
        const jobRoleId = JOB_ROLES.biller.id;

        const itemCount = faker.datatype.number({ min: 10, max: 20 });
        const allowablePartnerRoleAssignments = [...Array(itemCount).keys()].map(() => ({
          id: faker.datatype.number(),
          staffId: faker.datatype.number()
        }));

        // add our expected allowable partner role assignment
        const expectedAllowablePartnerRoleAssignment = {
          id: fakeJobSetupView.formData.jobRoleAllowablePartnerRoleAssignmentId,
          staffId: faker.datatype.number()
        };
        allowablePartnerRoleAssignments.push(expectedAllowablePartnerRoleAssignment);

        const jobSetupView = {
          ...fakeJobSetupView,
          formData: {
            ...fakeJobSetupView.formData,
            jobRoleId
          },
          lookups: {
            ...fakeJobSetupView.lookups,
            allowablePartnerRoleAssignments
          }
        };

        const expectedHierarchy = {
          id: mockSuggestion.regionHierarchyId,
          regionalImpactGroupName: faker.random.alpha(10)
        };

        const expectedData = {
          roleId: jobRoleId,
          staffNumber: expectedAllowablePartnerRoleAssignment.staffId,
          jobInfoResponseId: fakeJobSetupView.formData.id,
          allowablePartnerRoleAssignmentId: expectedAllowablePartnerRoleAssignment.id
        };
        const expectedArgs = { viewId: fakeViewId, data: expectedData };

        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);
        newEngagementInstanceSlice.selectLookups.mockReturnValue({
          ...fakeLookups,
          regionHierarchies: { data: [expectedHierarchy] }
        });

        // * ACT
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByText('Add Role'));

        // * ASSERT
        expect(newEngagementInstanceThunks.createJobRole).toHaveBeenCalled();
        expect(newEngagementInstanceThunks.createJobRole).toHaveBeenCalledWith(expectedArgs);
      });

      it('dispatches createJobRole when clicked and the selected job role is not biller', () => {
        // * ARRANGE
        const jobRoleId = faker.datatype.number({ min: 2 });
        const jobSetupView = {
          ...fakeJobSetupView,
          formData: {
            ...fakeJobSetupView.formData,
            jobRoleId
          }
        };

        const expectedData = {
          roleId: jobRoleId,
          staffNumber: fakeJobSetupView.formData.jobRoleStaffId,
          jobInfoResponseId: fakeJobSetupView.formData.id,
          allowablePartnerRoleAssignmentId: null
        };
        const expectedArgs = { viewId: fakeViewId, data: expectedData };

        newEngagementInstanceSlice.selectCurrentView.mockReturnValue(jobSetupView);

        // * ACT
        render(getComponentToRender(defaultProps));
        fireEvent.click(screen.getByText('Add Role'));

        // * ASSERT
        expect(newEngagementInstanceThunks.createJobRole).toHaveBeenCalled();
        expect(newEngagementInstanceThunks.createJobRole).toHaveBeenCalledWith(expectedArgs);
      });
    });
  });
});
