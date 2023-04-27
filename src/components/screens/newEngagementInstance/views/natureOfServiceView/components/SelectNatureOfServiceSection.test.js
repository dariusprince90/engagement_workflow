import ReactDOM from 'react-dom';
import * as reactRedux from 'react-redux';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from '@faker-js/faker';

import SelectNatureOfServiceSection from './SelectNatureOfServiceSection';
import newEngagementInstanceSlice from '../../../newEngagementInstanceSlice';
import * as newEngagementInstanceThunks from '../../../newEngagementInstanceThunks';

// **********************************************************************
// * constants

const testIds = {
  collapsibleFormSection: 'collapsible-form-section',
  jobHierarchyId: 'job-hierarchy-id',
  selectBoxOnChange: 'select-box-on-change'
};

const mockDispatch = jest.fn();

const fakeDisallowedJobHierarchyIds = [];

const fakeLookups = {
  jobHierarchies: {
    data: [],
    isLoading: faker.datatype.boolean()
  },

  natureOfServiceJobHierarchyMaps: { data: [] }
};

const fakeNewEngagementInstance = { newEngagementInstanceId: faker.datatype.number() };

// **********************************************************************
// * functions

const getComponentToRender = (props) => {
  return <SelectNatureOfServiceSection {...props} />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useDispatch: jest.fn(),
    useSelector: (callback) => callback()
  };
});

jest.mock('../../../newEngagementInstanceSlice', () => {
  return {
    selectDisallowedJobHierarchyIds: jest.fn(),
    selectLookups: jest.fn(),
    selectNewEngagementInstance: jest.fn()
  };
});

jest.mock('../../../newEngagementInstanceThunks', () => {
  return {
    createJobInfoResponse: jest.fn()
  };
});

jest.mock('../../../../../common/collapsibleFormSection/CollapsibleFormSection', () => ({
  __esModule: true,
  default: ({ title, children }) => {
    const props = { title, children };
    return <fake-collapsible-form-section {...props} data-testid={testIds.collapsibleFormSection} />;
  }
}));

jest.mock('../../../components/selectBox/SelectBox', () => ({
  __esModule: true,
  default: ({ name, label, value, defaultOption, options, isLoading, loadingText, appendAddOns, onChange }) => {
    const props = { name, label, value, defaultOption, options: JSON.stringify(options), isLoading, loadingText };
    return (
      <fake-select-box {...props} data-testid={testIds[name]}>
        <input type="text" data-testid={`${testIds[name]}-${testIds.selectBoxOnChange}`} onChange={onChange} />
        {!!appendAddOns &&
          appendAddOns.map((addOn, index) => {
            const props = { ...addOn };
            return (
              <fake-add-on key={index} data-add-on {...props}>
                {addOn.text}
              </fake-add-on>
            );
          })}
      </fake-select-box>
    );
  }
}));

// **********************************************************************
// * unit tests

describe('SelectNatureOfServiceSection', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    newEngagementInstanceSlice.selectDisallowedJobHierarchyIds.mockReturnValue(fakeDisallowedJobHierarchyIds);
    newEngagementInstanceSlice.selectLookups.mockReturnValue(fakeLookups);
    newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(fakeNewEngagementInstance);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  describe('on-load', () => {
    describe('job hHierarchy options', () => {
      it('populates with all job hierarchies when disallowedJobHierarchyIds has no items', () => {
        // * ARRANGE
        const itemCount = faker.datatype.number({ min: 20, max: 50 });
        const jobHierarchies = [...Array(itemCount).keys()].map(() => ({
          id: faker.datatype.number(),
          level4Name: faker.random.alphaNumeric()
        }));
        const expectedJobHierarchyIds = jobHierarchies.filter((jh, ix) => ix % 2 === 0).map((jh) => jh.id);
        const natureOfServiceJobHierarchyMaps = expectedJobHierarchyIds.map((id) => ({ jobHierarchyId: id }));

        const disallowedJobHierarchyIds = [];
        const lookups = {
          ...fakeLookups,
          jobHierarchies: { ...fakeLookups.jobHierarchies, data: jobHierarchies },
          natureOfServiceJobHierarchyMaps: {
            ...fakeLookups.natureOfServiceJobHierarchyMaps,
            data: natureOfServiceJobHierarchyMaps
          }
        };
        const expectedOptions = jobHierarchies
          .filter((jh) => expectedJobHierarchyIds.includes(jh.id))
          .map((jh) => ({ value: jh.id, text: jh.level4Name }));

        newEngagementInstanceSlice.selectDisallowedJobHierarchyIds.mockReturnValue(disallowedJobHierarchyIds);
        newEngagementInstanceSlice.selectLookups.mockReturnValue(lookups);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(screen.getByTestId(testIds.jobHierarchyId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });

      it('populates with all job hierarchies excluding disallowed job hierarchies when disallowedJobHierarchyIds has items', () => {
        // * ARRANGE
        const itemCount = faker.datatype.number({ min: 20, max: 50 });
        const jobHierarchies = [...Array(itemCount).keys()].map(() => ({
          id: faker.datatype.number(),
          level4Name: faker.random.alphaNumeric()
        }));
        const expectedJobHierarchyIds = jobHierarchies.filter((jh, ix) => ix % 2 === 0).map((jh) => jh.id);
        const natureOfServiceJobHierarchyMaps = expectedJobHierarchyIds.map((id) => ({ jobHierarchyId: id }));

        const disallowedJobHierarchyIds = [jobHierarchies[2].id, jobHierarchies[4].id, jobHierarchies[6].id];
        const lookups = {
          ...fakeLookups,
          jobHierarchies: { ...fakeLookups.jobHierarchies, data: jobHierarchies },
          natureOfServiceJobHierarchyMaps: {
            ...fakeLookups.natureOfServiceJobHierarchyMaps,
            data: natureOfServiceJobHierarchyMaps
          }
        };
        const expectedOptions = jobHierarchies
          .filter((jh) => expectedJobHierarchyIds.includes(jh.id))
          .filter((jh) => !disallowedJobHierarchyIds.includes(jh.id))
          .map((jh) => ({ value: jh.id, text: jh.level4Name }));

        newEngagementInstanceSlice.selectDisallowedJobHierarchyIds.mockReturnValue(disallowedJobHierarchyIds);
        newEngagementInstanceSlice.selectLookups.mockReturnValue(lookups);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(screen.getByTestId(testIds.jobHierarchyId)).toHaveAttribute('options', JSON.stringify(expectedOptions));
      });
    });
  });

  describe('rendering', () => {
    describe('CollapsibleFormSection', () => {
      it('has correct title', () => {
        const expectedTitle = 'Nature Of Service(s)';
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.collapsibleFormSection)).toHaveAttribute('title', expectedTitle);
      });
    });

    describe('jobHierarchyId', () => {
      describe('rendering', () => {
        it('renders inside collapsible form section', () => {
          render(getComponentToRender());
          const collapsibleFormSection = screen.getByTestId(testIds.collapsibleFormSection);
          expect(within(collapsibleFormSection).getByTestId(testIds.jobHierarchyId)).toBeInTheDocument();
        });

        it('has correct name prop', () => {
          const expectedName = 'jobHierarchyId';
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.jobHierarchyId)).toHaveAttribute('name', expectedName);
        });

        it('has correct label prop', () => {
          const expectedLabel = 'Job Types';
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.jobHierarchyId)).toHaveAttribute('label', expectedLabel);
        });

        it('has correct value prop', () => {
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.jobHierarchyId)).toHaveAttribute('value', '');
        });

        it('has correct defaultOption prop', () => {
          const expectedDefaultOption = 'Select a job type...';
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.jobHierarchyId)).toHaveAttribute('defaultOption', expectedDefaultOption);
        });

        it('has correct options prop', () => {
          const expectedOptions = [];
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.jobHierarchyId)).toHaveAttribute(
            'options',
            JSON.stringify(expectedOptions)
          );
        });

        it('has correct isLoading prop', () => {
          const expectedIsLoading = fakeLookups.jobHierarchies.isLoading;
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.jobHierarchyId)).toHaveAttribute('isLoading', expectedIsLoading.toString());
        });

        it('has correct loadingText prop', () => {
          const loadingText = 'Loading job types...';
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.jobHierarchyId)).toHaveAttribute('loadingText', loadingText);
        });

        describe('add button add-on', () => {
          it('is rendered', () => {
            const addOnText = 'Add';
            render(getComponentToRender());
            const control = screen.getByTestId(testIds.jobHierarchyId);
            expect(within(control).getByText(addOnText)).toBeInTheDocument();
            expect(within(control).getByText(addOnText)).toHaveAttribute('data-add-on');
          });

          it('is disabled when jobHierarchyId has no value', () => {
            const addOnText = 'Add';
            const expected = true;
            render(getComponentToRender());
            const control = screen.getByTestId(testIds.jobHierarchyId);
            expect(within(control).getByText(addOnText)).toHaveAttribute('disabled', expected.toString());
          });

          it('is not disabled when jobHierarchyId has a value', () => {
            // * ARRANGE
            const addOnText = 'Add';
            const expected = false;
            const selectChangeTestId = `${testIds.jobHierarchyId}-${testIds.selectBoxOnChange}`;
            const selectedJobHierarchyId = faker.datatype.number();

            // * ACT
            render(getComponentToRender());
            fireEvent.change(screen.getByTestId(selectChangeTestId), { target: { value: selectedJobHierarchyId } });

            // * ASSERT
            const control = screen.getByTestId(testIds.jobHierarchyId);
            expect(within(control).getByText(addOnText)).toHaveAttribute('disabled', expected.toString());
          });

          it('dispatches createJobInfoResponse when clicked', async () => {
            // * ARRANGE
            const user = userEvent.setup();
            const addOnText = 'Add';
            const jobHierarchyId = faker.datatype.number();
            const natureOfServiceId = faker.datatype.number();
            const nosJhMap = { jobHierarchyId, natureOfServiceId };
            const newEngagementInstanceId = fakeNewEngagementInstance.newEngagementInstanceId;

            const itemCount = faker.datatype.number({ min: 10, max: 20 });
            const natureOfServiceJobHierarchyMaps = [...Array(itemCount).keys()].map(() => ({
              jobHierarchyId: faker.datatype.number(),
              natureOfServiceId: faker.datatype.number()
            }));
            natureOfServiceJobHierarchyMaps.push(nosJhMap);

            const lookups = {
              ...fakeLookups,
              natureOfServiceJobHierarchyMaps: {
                ...fakeLookups.natureOfServiceJobHierarchyMaps,
                data: natureOfServiceJobHierarchyMaps
              }
            };

            const thunkResults = faker.random.alphaNumeric(10);
            const expectedArgs = { newEngagementInstanceId, jobHierarchyId, natureOfServiceId };
            const selectChangeTestId = `${testIds.jobHierarchyId}-${testIds.selectBoxOnChange}`;

            newEngagementInstanceSlice.selectLookups.mockReturnValue(lookups);
            newEngagementInstanceThunks.createJobInfoResponse.mockReturnValue(thunkResults);

            // * ACT
            render(getComponentToRender());
            const control = screen.getByTestId(testIds.jobHierarchyId);
            fireEvent.change(screen.getByTestId(selectChangeTestId), { target: { value: jobHierarchyId } });
            await user.click(within(control).getByText(addOnText));

            // * ASSERT
            expect(newEngagementInstanceThunks.createJobInfoResponse).toHaveBeenCalledTimes(1);
            expect(newEngagementInstanceThunks.createJobInfoResponse).toHaveBeenCalledWith(expectedArgs);
            expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
          });

          it('disables add button when clicked', async () => {
            // * ARRANGE
            const user = userEvent.setup();
            const addOnText = 'Add';
            const jobHierarchyId = faker.datatype.number();
            const natureOfServiceId = faker.datatype.number();
            const nosJhMap = { jobHierarchyId, natureOfServiceId };

            const itemCount = faker.datatype.number({ min: 10, max: 20 });
            const natureOfServiceJobHierarchyMaps = [...Array(itemCount).keys()].map(() => ({
              jobHierarchyId: faker.datatype.number(),
              natureOfServiceId: faker.datatype.number()
            }));
            natureOfServiceJobHierarchyMaps.push(nosJhMap);

            const lookups = {
              ...fakeLookups,
              natureOfServiceJobHierarchyMaps: {
                ...fakeLookups.natureOfServiceJobHierarchyMaps,
                data: natureOfServiceJobHierarchyMaps
              }
            };

            const selectChangeTestId = `${testIds.jobHierarchyId}-${testIds.selectBoxOnChange}`;

            newEngagementInstanceSlice.selectLookups.mockReturnValue(lookups);

            // * ACT
            render(getComponentToRender());
            const control = screen.getByTestId(testIds.jobHierarchyId);
            expect(within(control).getByText(addOnText)).toHaveAttribute('disabled', true.toString());
            fireEvent.change(screen.getByTestId(selectChangeTestId), { target: { value: jobHierarchyId } });
            expect(within(control).getByText(addOnText)).toHaveAttribute('disabled', false.toString());
            await user.click(within(control).getByText(addOnText));

            // * ASSERT
            await waitFor(() => {
              expect(within(control).getByText(addOnText)).toHaveAttribute('disabled', true.toString());
            });
          });
        });
      });

      describe('functional', () => {
        it('sets selected job hierarchy id when changed', () => {
          // * ARRANGE
          const expectedValue = faker.datatype.number();

          // * ACT
          render(getComponentToRender());
          fireEvent.change(screen.getByTestId(`${testIds.jobHierarchyId}-${testIds.selectBoxOnChange}`), {
            target: { value: expectedValue }
          });

          // * ASSERT
          expect(screen.getByTestId(testIds.jobHierarchyId)).toHaveAttribute('value', expectedValue.toString());
        });
      });
    });
  });
});
