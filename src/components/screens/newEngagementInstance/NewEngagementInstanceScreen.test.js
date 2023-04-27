import React from 'react';
import ReactDOM from 'react-dom';
import * as reactRouterDom from 'react-router-dom';
import * as reactRedux from 'react-redux';
import * as reactToastify from 'react-toastify';
import { render, screen, waitFor } from '@testing-library/react';
import faker from '@faker-js/faker';

import headerSlice from '../../common/header/headerSlice';
import appLayoutSlice from '../../common/appLayout/appLayoutSlice';
import staffSlice from '../../../app/staffSlice';
import * as newEngagementInstanceSlice from './newEngagementInstanceSlice';
import * as newEngagementInstanceThunks from './newEngagementInstanceThunks';
import NewEngagementInstanceScreen from './NewEngagementInstanceScreen';

// **********************************************************************
// * constants

const testIds = {
  viewController: 'view-controller',
  formButtons: 'form-buttons',
  progressOverlay: 'progress-overlay',
  errorOverlay: 'error-overlay'
};

const mockDispatch = jest.fn();
const fakeParams = {};
const fakeUserAuthInfo = { userObjectId: faker.random.alphaNumeric(10) };
const fakeMetadata = {
  hasError: faker.datatype.boolean(),
  isLoading: faker.datatype.boolean(),
  isSaving: faker.datatype.boolean(),
  loadingTasksCompleted: faker.datatype.number(),
  loadingTasksTotal: faker.datatype.number(),
  savingMessage: faker.random.alphaNumeric(10),
  toastInfo: {}
};
const fakeLookupsMetadata = { lookupsAreLoaded: faker.datatype.boolean() };
const fakeNewEngagementInstance = { newEngagementInstanceId: faker.datatype.number() };
const fakeSelectClientView = {
  formData: { clientName: faker.random.alpha(10), clientDisplayName: faker.random.alpha(10) }
};

// **********************************************************************
// * functions

const getComponentToRender = () => {
  return <NewEngagementInstanceScreen />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useDispatch: jest.fn(),
    useSelector: (callback) => callback()
  };
});

jest.mock('react-router-dom', () => ({
  useParams: jest.fn()
}));

jest.mock('react-toastify', () => ({
  toast: jest.fn()
}));

jest.mock('../../common/header/headerSlice', () => {
  return {
    pageSubtitleChanged: jest.fn(),
    pageTitleChanged: jest.fn()
  };
});

jest.mock('../../common/appLayout/appLayoutSlice', () => {
  return {
    showSideBar: jest.fn()
  };
});

jest.mock('../../../app/staffSlice', () => {
  return {
    ensureStaffExistsInCache: jest.fn(),
    selectUserAuthInfo: jest.fn()
  };
});

jest.mock('./newEngagementInstanceSlice', () => {
  return {
    incrementLoadingTasksTotal: jest.fn(),
    loadScreenLookupsCompleted: jest.fn(),
    loadExistingNewEngagementInstanceCompleted: jest.fn(),
    loadExistingNewEngagementInstanceStarted: jest.fn(),
    newEngagementInstanceIdSet: jest.fn(),
    selectLookupsMetadata: jest.fn(),
    selectMetadata: jest.fn(),
    selectNewEngagementInstance: jest.fn(),
    selectView: jest.fn()
  };
});

jest.mock('./newEngagementInstanceThunks', () => {
  return {
    fetchAttachmentInfoResponsesForNei: jest.fn(),
    fetchAttachmentTypes: jest.fn(),
    fetchClientEntities: jest.fn(),
    fetchClientSearchTypes: jest.fn(),
    fetchClientTaxTypes: jest.fn(),
    fetchCountries: jest.fn(),
    fetchIncompatibleNaturesOfServices: jest.fn(),
    fetchIndustryHierarchies: jest.fn(),
    fetchInitialSetupResponseForNei: jest.fn(),
    fetchInternationalHeadquarterCountries: jest.fn(),
    fetchJobCategoryRoles: jest.fn(),
    fetchJobHierarchies: jest.fn(),
    fetchJobInfoResponsesForNei: jest.fn(),
    fetchJobRoles: jest.fn(),
    fetchMarketSectors: jest.fn(),
    fetchMonths: jest.fn(),
    fetchNatureOfServiceJobHierarchyMaps: jest.fn(),
    fetchNaturesOfServices: jest.fn(),
    fetchNewEngagementInstance: jest.fn(),
    fetchOwnershipTypes: jest.fn(),
    fetchRegionHierarchies: jest.fn(),
    fetchSubjectToSecOrGaoRules: jest.fn(),
    fetchSuffixes: jest.fn(),
    fetchTaxRiskResponseForNei: jest.fn(),
    fetchTaxTypes: jest.fn(),
    fetchUserTasks: jest.fn(),
    fetchWorkflowStepRunLogs: jest.fn(),
    fetchWorkflowSteps: jest.fn()
  };
});

jest.mock('./views/ViewController', () => {
  return {
    __esModule: true,
    default: () => <fake-view-controller data-testid={testIds.viewController} />
  };
});

jest.mock('./components/formButtons/FormButtons', () => {
  return {
    __esModule: true,
    default: () => <fake-form-buttons data-testid={testIds.formButtons} />
  };
});

jest.mock('./components/overlays/progressOverlay/ProgressOverlay', () => {
  return {
    __esModule: true,
    default: ({ alertType, message, percentComplete }) => {
      const props = { alertType, message, percentComplete };
      return <fake-progress-overlay {...props} data-testid={testIds.progressOverlay} />;
    }
  };
});

jest.mock('./components/overlays/errorOverlay/ErrorOverlay', () => {
  return {
    __esModule: true,
    default: () => <fake-error-overlay data-testid={testIds.errorOverlay} />
  };
});

// **********************************************************************
// * unit tests

describe('NewEngagementInstanceScreen', () => {
  // **********************************************************************
  // * setup

  beforeEach(() => {
    reactRouterDom.useParams.mockReturnValue(fakeParams);
    reactRedux.useDispatch.mockReturnValue(mockDispatch);
    staffSlice.selectUserAuthInfo.mockReturnValue(fakeUserAuthInfo);
    newEngagementInstanceSlice.selectMetadata.mockReturnValue(fakeMetadata);
    newEngagementInstanceSlice.selectLookupsMetadata.mockReturnValue(fakeLookupsMetadata);
    newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(fakeNewEngagementInstance);
    newEngagementInstanceSlice.selectView.mockReturnValue(fakeSelectClientView);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  describe('rendering', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(getComponentToRender(), div);
    });

    it('renders the ViewController component', () => {
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.viewController)).toBeInTheDocument();
    });

    it('renders the FromButtons component', () => {
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.formButtons)).toBeInTheDocument();
    });

    describe('ProgressOverlay', () => {
      describe('loading workflow progress overlay', () => {
        it('renders when isLoading is true and hasError is false', () => {
          const isLoading = true;
          const hasError = false;
          const isSaving = false;
          const metadata = { ...fakeMetadata, isLoading, isSaving, hasError };
          newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.progressOverlay)).toBeInTheDocument();
        });

        it('does not render when isLoading is true and hasError is true', () => {
          const isLoading = true;
          const hasError = true;
          const isSaving = false;
          const metadata = { ...fakeMetadata, isLoading, isSaving, hasError };
          newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
          render(getComponentToRender());
          expect(screen.queryByTestId(testIds.progressOverlay)).not.toBeInTheDocument();
        });

        it('does not render when isLoading is false and hasError is false', () => {
          const isLoading = false;
          const hasError = false;
          const isSaving = false;
          const metadata = { ...fakeMetadata, isLoading, isSaving, hasError };
          newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
          render(getComponentToRender());
          expect(screen.queryByTestId(testIds.progressOverlay)).not.toBeInTheDocument();
        });

        describe('when rendered', () => {
          const isLoading = true;
          const hasError = false;
          const isSaving = false;
          const metadata = { ...fakeMetadata, isLoading, isSaving, hasError };

          beforeEach(() => {
            newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
          });

          it('has correct alertType', () => {
            const expectedAlertType = 'info';
            render(getComponentToRender());
            expect(screen.getByTestId(testIds.progressOverlay)).toHaveAttribute('alertType', expectedAlertType);
          });

          it('has correct message', () => {
            const expectedMessage = 'Loading your workflow...';
            render(getComponentToRender());
            expect(screen.getByTestId(testIds.progressOverlay)).toHaveAttribute('message', expectedMessage);
          });

          it('has correct percentComplete', () => {
            const loadingTasksTotal = faker.datatype.number({ min: 10, max: 20 });
            const loadingTasksCompleted = faker.datatype.number({ min: 1, max: loadingTasksTotal });
            const metadata = {
              ...fakeMetadata,
              isLoading,
              isSaving,
              hasError,
              loadingTasksTotal,
              loadingTasksCompleted
            };
            const expectedPercentComplete = Math.ceil((loadingTasksCompleted / loadingTasksTotal) * 100);
            newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
            render(getComponentToRender());
            expect(screen.getByTestId(testIds.progressOverlay)).toHaveAttribute(
              'percentComplete',
              expectedPercentComplete.toString()
            );
          });
        });
      });

      describe('saving progress overlay', () => {
        it('renders when isSaving is true and hasError is false', () => {
          const isLoading = false;
          const isSaving = true;
          const hasError = false;
          const metadata = { ...fakeMetadata, isLoading, isSaving, hasError };
          newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
          render(getComponentToRender());
          expect(screen.getByTestId(testIds.progressOverlay)).toBeInTheDocument();
        });

        it('does not render when isSaving is true and hasError is true', () => {
          const isSaving = true;
          const hasError = true;
          const metadata = { ...fakeMetadata, isSaving, hasError };
          newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
          render(getComponentToRender());
          expect(screen.queryByTestId(testIds.progressOverlay)).not.toBeInTheDocument();
        });

        it('does not render when isSaving is false and hasError is false', () => {
          const isLoading = false;
          const isSaving = false;
          const hasError = false;
          const metadata = { ...fakeMetadata, isLoading, isSaving, hasError };
          newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
          render(getComponentToRender());
          expect(screen.queryByTestId(testIds.progressOverlay)).not.toBeInTheDocument();
        });

        describe('when rendered', () => {
          const isLoading = false;
          const isSaving = true;
          const hasError = false;
          const metadata = { ...fakeMetadata, isLoading, isSaving, hasError };

          beforeEach(() => {
            newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
          });

          it('has correct alertType', () => {
            const expectedAlertType = 'info';
            render(getComponentToRender());
            expect(screen.getByTestId(testIds.progressOverlay)).toHaveAttribute('alertType', expectedAlertType);
          });

          it('has correct message when savingMessage has no value', () => {
            metadata.savingMessage = null;
            newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
            const expectedMessage = 'Saving, please wait...';
            render(getComponentToRender());
            expect(screen.getByTestId(testIds.progressOverlay)).toHaveAttribute('message', expectedMessage);
          });

          it('has correct message when savingMessage has a value', () => {
            metadata.savingMessage = faker.random.alphaNumeric(10);
            newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
            const expectedMessage = metadata.savingMessage;
            render(getComponentToRender());
            expect(screen.getByTestId(testIds.progressOverlay)).toHaveAttribute('message', expectedMessage);
          });
        });
      });
    });

    describe('ErrorOverlay', () => {
      it('renders when hasError is true', () => {
        const hasError = true;
        const metadata = { ...fakeMetadata, hasError };
        newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
        render(getComponentToRender());
        expect(screen.getByTestId(testIds.errorOverlay)).toBeInTheDocument();
      });

      it('does not render  when hasError is false', () => {
        const hasError = false;
        const metadata = { ...fakeMetadata, hasError };
        newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
        render(getComponentToRender());
        expect(screen.queryByTestId(testIds.errorOverlay)).not.toBeInTheDocument();
      });
    });
  });

  describe('functional', () => {
    describe('screen setup', () => {
      it('dispatches pageTitleChanged when the screen loads', () => {
        // * ARRANGE
        const sliceMethodResults = faker.random.alphaNumeric(10);
        const expectedTitle = 'Engagement Workflow';
        headerSlice.pageTitleChanged.mockReturnValue(sliceMethodResults);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(headerSlice.pageTitleChanged).toHaveBeenCalledTimes(1);
        expect(headerSlice.pageTitleChanged).toHaveBeenCalledWith(expectedTitle);
        expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
      });

      it('dispatches pageSubtitleChanged when the screen loads and there is no nei id', () => {
        // * ARRANGE
        const newEngagementInstance = { ...fakeNewEngagementInstance, newEngagementInstanceId: null };
        const sliceMethodResults = faker.random.alphaNumeric(10);
        const expectedSubtitle = '';
        headerSlice.pageSubtitleChanged.mockReturnValue(sliceMethodResults);
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(newEngagementInstance);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(headerSlice.pageSubtitleChanged).toHaveBeenCalledTimes(1);
        expect(headerSlice.pageSubtitleChanged).toHaveBeenCalledWith(expectedSubtitle);
        expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
      });

      it('dispatches pageSubtitleChanged with the clientName when there is a nei id and a clientName', () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const clientName = faker.random.alpha(10);
        const newEngagementInstance = { ...fakeNewEngagementInstance, newEngagementInstanceId };
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientName }
        };
        const sliceMethodResults = faker.random.alphaNumeric(10);
        const expectedSubtitle = `${clientName} - Workflow #${newEngagementInstanceId}`;
        headerSlice.pageSubtitleChanged.mockReturnValue(sliceMethodResults);
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(newEngagementInstance);
        newEngagementInstanceSlice.selectView.mockReturnValue(selectClientView);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(headerSlice.pageSubtitleChanged).toHaveBeenCalledWith(expectedSubtitle);
        expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
      });

      it('dispatches pageSubtitleChanged with the clientDisplayName when there is a nei id and no clientName', () => {
        // * ARRANGE
        const newEngagementInstanceId = faker.datatype.number();
        const clientName = null;
        const clientDisplayName = faker.random.alpha(10);
        const newEngagementInstance = { ...fakeNewEngagementInstance, newEngagementInstanceId };
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientName, clientDisplayName }
        };
        const sliceMethodResults = faker.random.alphaNumeric(10);
        const expectedSubtitle = `${clientDisplayName} - Workflow #${newEngagementInstanceId}`;
        headerSlice.pageSubtitleChanged.mockReturnValue(sliceMethodResults);
        newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(newEngagementInstance);
        newEngagementInstanceSlice.selectView.mockReturnValue(selectClientView);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(headerSlice.pageSubtitleChanged).toHaveBeenCalledWith(expectedSubtitle);
        expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
      });

      it('dispatches showSideBar when the screen loads', () => {
        // * ARRANGE
        const sliceMethodResults = faker.random.alphaNumeric(10);
        appLayoutSlice.showSideBar.mockReturnValue(sliceMethodResults);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(appLayoutSlice.showSideBar).toHaveBeenCalledTimes(1);
        expect(appLayoutSlice.showSideBar).toHaveBeenCalledWith();
        expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
      });
    });

    describe('load lookups', () => {
      describe('when lookupsAreLoaded is false', () => {
        // **********************************************************************
        // * setup

        beforeEach(() => {
          const lookupsMetadata = { ...fakeLookupsMetadata, lookupsAreLoaded: false };
          newEngagementInstanceSlice.selectLookupsMetadata.mockReturnValue(lookupsMetadata);
        });

        // **********************************************************************
        // * tear-down

        // **********************************************************************
        // * execution

        it('dispatches incrementLoadingTasksTotal when the screen loads', () => {
          // * ARRANGE
          const sliceResults = faker.random.alphaNumeric(10);
          newEngagementInstanceSlice.incrementLoadingTasksTotal.mockReturnValue(sliceResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceSlice.incrementLoadingTasksTotal).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceSlice.incrementLoadingTasksTotal).toHaveBeenCalledWith(20);
          expect(mockDispatch).toHaveBeenCalledWith(sliceResults);
        });

        it('dispatches fetchAttachmentTypes when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchAttachmentTypes.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchAttachmentTypes).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchAttachmentTypes).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchClientSearchTypes when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchClientSearchTypes.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchClientSearchTypes).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchClientSearchTypes).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchClientTaxTypes when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchClientTaxTypes.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchClientTaxTypes).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchClientTaxTypes).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchCountries when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchCountries.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchCountries).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchCountries).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchIncompatibleNaturesOfServices when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchIncompatibleNaturesOfServices.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchIncompatibleNaturesOfServices).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchIncompatibleNaturesOfServices).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchIndustryHierarchies when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchIndustryHierarchies.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchIndustryHierarchies).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchIndustryHierarchies).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchInternationalHeadquarterCountries when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchInternationalHeadquarterCountries.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchInternationalHeadquarterCountries).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchInternationalHeadquarterCountries).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchJobCategoryRoles when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchJobCategoryRoles.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchJobCategoryRoles).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchJobCategoryRoles).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchJobHierarchies when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchJobHierarchies.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchJobHierarchies).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchJobHierarchies).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchJobRoles when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchJobRoles.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchJobRoles).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchJobRoles).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchMarketSectors when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchMarketSectors.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchMarketSectors).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchMarketSectors).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchMonths when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchMonths.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchMonths).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchMonths).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchNatureOfServiceJobHierarchyMaps when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchNatureOfServiceJobHierarchyMaps.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchNatureOfServiceJobHierarchyMaps).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchNatureOfServiceJobHierarchyMaps).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchNaturesOfServices when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchNaturesOfServices.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchNaturesOfServices).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchNaturesOfServices).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchOwnershipTypes when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchOwnershipTypes.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchOwnershipTypes).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchOwnershipTypes).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchRegionHierarchies when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchRegionHierarchies.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchRegionHierarchies).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchRegionHierarchies).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchSubjectToSecOrGaoRules when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchSubjectToSecOrGaoRules.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchSubjectToSecOrGaoRules).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchSubjectToSecOrGaoRules).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchSuffixes when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchSuffixes.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchSuffixes).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchSuffixes).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchTaxTypes when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchTaxTypes.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchTaxTypes).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchTaxTypes).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches fetchWorkflowSteps when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchWorkflowSteps.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchWorkflowSteps).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceThunks.fetchWorkflowSteps).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches loadScreenLookupsCompleted when the screen loads', async () => {
          // * ARRANGE
          const sliceResults = faker.random.alphaNumeric(10);
          newEngagementInstanceSlice.loadScreenLookupsCompleted.mockReturnValue(sliceResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          await waitFor(() => {
            expect(newEngagementInstanceSlice.loadScreenLookupsCompleted).toHaveBeenCalled();
          });

          expect(newEngagementInstanceSlice.loadScreenLookupsCompleted).toHaveBeenCalledTimes(1);
          expect(newEngagementInstanceSlice.loadScreenLookupsCompleted).toHaveBeenCalledWith();
          expect(mockDispatch).toHaveBeenCalledWith(sliceResults);
        });

        it('executes lookup methods in the proper order when the screen loads', async () => {
          // * ARRANGE
          const {
            fetchClientSearchTypes,
            fetchClientTaxTypes,
            fetchCountries,
            fetchIndustryHierarchies,
            fetchInternationalHeadquarterCountries,
            fetchJobCategoryRoles,
            fetchJobHierarchies,
            fetchJobRoles,
            fetchMarketSectors,
            fetchMonths,
            fetchOwnershipTypes,
            fetchSubjectToSecOrGaoRules,
            fetchSuffixes,
            fetchTaxTypes,
            fetchWorkflowSteps
          } = newEngagementInstanceThunks;

          const lookupMethods = [
            fetchClientSearchTypes,
            fetchClientTaxTypes,
            fetchCountries,
            fetchIndustryHierarchies,
            fetchInternationalHeadquarterCountries,
            fetchJobCategoryRoles,
            fetchJobHierarchies,
            fetchJobRoles,
            fetchMarketSectors,
            fetchMonths,
            fetchOwnershipTypes,
            fetchSubjectToSecOrGaoRules,
            fetchSuffixes,
            fetchTaxTypes,
            fetchWorkflowSteps
          ];

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          // wait for the final method to have been called
          await waitFor(() => {
            expect(newEngagementInstanceSlice.loadScreenLookupsCompleted).toHaveBeenCalled();
          });

          // ensure all of the lookup methods are called
          // - AFTER newEngagementInstanceSlice.incrementLoadingTasksTotal
          // - BEFORE newEngagementInstanceSlice.loadScreenLookupsCompleted
          // * NOTE: this ensures the following:
          // * - incrementLoadingTasksTotal is called first
          // * - all of the lookup methods are called next
          // * - loadScreenLookupsCompleted is called last
          for (const lookupMethod of lookupMethods) {
            expect(lookupMethod).toHaveBeenCalledAfter(newEngagementInstanceSlice.incrementLoadingTasksTotal);
            expect(lookupMethod).toHaveBeenCalledBefore(newEngagementInstanceSlice.loadScreenLookupsCompleted);
          }
        });
      });

      describe('when lookupsAreLoaded is true', () => {
        // **********************************************************************
        // * setup

        beforeEach(() => {
          const lookupsMetadata = { ...fakeLookupsMetadata, lookupsAreLoaded: true };
          newEngagementInstanceSlice.selectLookupsMetadata.mockReturnValue(lookupsMetadata);
        });

        // **********************************************************************
        // * tear-down

        // **********************************************************************
        // * execution

        it('does not dispatch fetchAttachmentTypes when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchAttachmentTypes.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchAttachmentTypes).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchClientSearchTypes when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchClientSearchTypes.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchClientSearchTypes).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchClientTaxTypes when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchClientTaxTypes.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchClientTaxTypes).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchCountries when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchCountries.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchCountries).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchIncompatibleNaturesOfServices when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchIncompatibleNaturesOfServices.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchIncompatibleNaturesOfServices).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchIndustryHierarchies when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchIndustryHierarchies.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchIndustryHierarchies).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchInternationalHeadquarterCountries when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchInternationalHeadquarterCountries.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchInternationalHeadquarterCountries).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchJobCategoryRoles when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchJobCategoryRoles.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchJobCategoryRoles).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchJobHierarchies when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchJobHierarchies.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchJobHierarchies).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchJobRoles when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchJobRoles.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchJobRoles).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchMarketSectors when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchMarketSectors.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchMarketSectors).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchMonths when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchMonths.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchMonths).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchNatureOfServiceJobHierarchyMaps when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchNatureOfServiceJobHierarchyMaps.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchNatureOfServiceJobHierarchyMaps).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchNaturesOfServices when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchNaturesOfServices.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchNaturesOfServices).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchOwnershipTypes when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchOwnershipTypes.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchOwnershipTypes).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchRegionHierarchies when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchRegionHierarchies.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchRegionHierarchies).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchSubjectToSecOrGaoRules when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchSubjectToSecOrGaoRules.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchSubjectToSecOrGaoRules).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchSuffixes when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchSuffixes.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchSuffixes).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchTaxTypes when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchTaxTypes.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchTaxTypes).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('does not dispatch fetchWorkflowSteps when the screen loads', () => {
          // * ARRANGE
          const thunkResults = faker.random.alphaNumeric(10);
          newEngagementInstanceThunks.fetchWorkflowSteps.mockReturnValue(thunkResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          expect(newEngagementInstanceThunks.fetchWorkflowSteps).not.toHaveBeenCalled();
          expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
        });

        it('dispatches loadScreenLookupsCompleted when the screen loads', async () => {
          // * ARRANGE
          const sliceResults = faker.random.alphaNumeric(10);
          newEngagementInstanceSlice.loadScreenLookupsCompleted.mockReturnValue(sliceResults);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          await waitFor(() => {
            expect(newEngagementInstanceSlice.loadScreenLookupsCompleted).not.toHaveBeenCalled();
          });

          expect(mockDispatch).not.toHaveBeenCalledWith(sliceResults);
        });
      });
    });

    describe('ensure current user in staff cache', () => {
      it('dispatches ensureStaffExistsInCache when userAuthInfo.userObjectId has a value', () => {
        // * ARRANGE
        const sliceMethodResults = faker.random.alphaNumeric(10);
        const userAuthInfo = { userObjectId: faker.random.alphaNumeric(10) };
        const expectedPayload = { azureAdObjectId: userAuthInfo.userObjectId };
        staffSlice.selectUserAuthInfo.mockReturnValue(userAuthInfo);
        staffSlice.ensureStaffExistsInCache.mockReturnValue(sliceMethodResults);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(staffSlice.ensureStaffExistsInCache).toHaveBeenCalledTimes(1);
        expect(staffSlice.ensureStaffExistsInCache).toHaveBeenCalledWith(expectedPayload);
        expect(mockDispatch).toHaveBeenCalledWith(sliceMethodResults);
      });

      it('does not dispatch ensureStaffExistsInCache when userAuthInfo.userObjectId has no value', () => {
        // * ARRANGE
        const sliceMethodResults = faker.random.alphaNumeric(10);
        const userAuthInfo = { userObjectId: null };
        staffSlice.selectUserAuthInfo.mockReturnValue(userAuthInfo);
        staffSlice.ensureStaffExistsInCache.mockReturnValue(sliceMethodResults);

        // * ACT
        render(getComponentToRender());

        // * ASSERT
        expect(staffSlice.ensureStaffExistsInCache).not.toHaveBeenCalled();
        expect(mockDispatch).not.toHaveBeenCalledWith(sliceMethodResults);
      });
    });

    describe('start nei loading process', () => {
      it('dispatches proper actions to start the nei loading process when the page loads with a proper newEngagementInstanceIdParam', () => {
        const newEngagementInstanceId = faker.datatype.number();
        const params = { newEngagementInstanceId: newEngagementInstanceId.toString() };
        reactRouterDom.useParams.mockReturnValue(params);
        render(getComponentToRender());

        // ensure each method called with proper args
        expect(newEngagementInstanceSlice.loadExistingNewEngagementInstanceStarted).toHaveBeenCalledOnceWith();
        expect(newEngagementInstanceSlice.newEngagementInstanceIdSet).toHaveBeenCalledOnceWith(newEngagementInstanceId);

        // ensure methods called in proper order
        expect(newEngagementInstanceSlice.newEngagementInstanceIdSet).toHaveBeenCalledAfter(
          newEngagementInstanceSlice.loadExistingNewEngagementInstanceStarted
        );
      });

      it.each([{ newEngagementInstanceId: null }, { newEngagementInstanceId: faker.random.alphaNumeric(10) }])(
        'does not dispatch actions to start the nei loading process when the page loads with an improper newEngagementInstanceIdParam ($newEngagementInstanceId)',
        ({ newEngagementInstanceId }) => {
          const params = { newEngagementInstanceId: newEngagementInstanceId };
          reactRouterDom.useParams.mockReturnValue(params);
          render(getComponentToRender());
          expect(newEngagementInstanceSlice.loadExistingNewEngagementInstanceStarted).not.toHaveBeenCalled();
          expect(newEngagementInstanceSlice.newEngagementInstanceIdSet).not.toHaveBeenCalled();
        }
      );

      it('does not dispatch actions to start the nei loading process when the page loads without a newEngagementInstanceIdParam', () => {
        const params = {};
        reactRouterDom.useParams.mockReturnValue(params);
        render(getComponentToRender());
        expect(newEngagementInstanceSlice.loadExistingNewEngagementInstanceStarted).not.toHaveBeenCalled();
        expect(newEngagementInstanceSlice.newEngagementInstanceIdSet).not.toHaveBeenCalled();
      });
    });

    describe('load new engagement instance data', () => {
      it.each([
        {
          newEngagementInstanceIdParam: null,
          newEngagementInstanceIdParamText: 'has no value',
          newEngagementInstanceId: faker.datatype.number(),
          newEngagementInstanceIdText: 'has a value',
          lookupsAreLoaded: true
        },
        {
          newEngagementInstanceIdParam: faker.datatype.number().toString(),
          newEngagementInstanceIdParamText: 'has value',
          newEngagementInstanceId: null,
          newEngagementInstanceIdText: 'has no value',
          lookupsAreLoaded: true
        },
        {
          newEngagementInstanceIdParam: faker.datatype.number().toString(),
          newEngagementInstanceIdParamText: 'has value',
          newEngagementInstanceId: faker.datatype.number(),
          newEngagementInstanceIdText: 'has a value',
          lookupsAreLoaded: false
        }
      ])(
        'does not dispatch the actions to load the nei data when ' +
          'newEngagementInstanceIdParam $newEngagementInstanceIdParamText, ' +
          'newEngagementInstanceId $newEngagementInstanceIdText, ' +
          'and lookupsAreLoaded is $lookupsAreLoaded',
        ({ newEngagementInstanceIdParam, newEngagementInstanceId, lookupsAreLoaded }) => {
          // * ARRANGE
          const params = { newEngagementInstanceId: newEngagementInstanceIdParam };
          const newEngagementInstance = { newEngagementInstanceId };
          const lookupsMetadata = { lookupsAreLoaded };

          reactRouterDom.useParams.mockReturnValue(params);
          newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(newEngagementInstance);
          newEngagementInstanceSlice.selectLookupsMetadata.mockReturnValue(lookupsMetadata);

          // * ACT
          render(getComponentToRender());

          // * ASSERT

          // nei data loading methods
          expect(newEngagementInstanceThunks.fetchNewEngagementInstance).not.toHaveBeenCalled();
          expect(newEngagementInstanceThunks.fetchInitialSetupResponseForNei).not.toHaveBeenCalled();
          expect(newEngagementInstanceThunks.fetchJobInfoResponsesForNei).not.toHaveBeenCalled();
          expect(newEngagementInstanceThunks.fetchAttachmentInfoResponsesForNei).not.toHaveBeenCalled();
          expect(newEngagementInstanceThunks.fetchTaxRiskResponseForNei).not.toHaveBeenCalled();

          // nei workflow data loading methods
          expect(newEngagementInstanceThunks.fetchUserTasks).not.toHaveBeenCalled();
          expect(newEngagementInstanceThunks.fetchWorkflowStepRunLogs).not.toHaveBeenCalled();

          // cleanup methods
          expect(newEngagementInstanceSlice.loadExistingNewEngagementInstanceCompleted).not.toHaveBeenCalled();
        }
      );

      describe('when there is a nei param, we have a proper nei id, and the lookups are loaded', () => {
        it('dispatches proper actions to load the new engagement instance data', async () => {
          // * ARRANGE
          const newEngagementInstanceId = faker.datatype.number();
          const params = { newEngagementInstanceId: faker.datatype.number().toString() };
          const newEngagementInstance = { newEngagementInstanceId };
          const lookupsMetadata = { lookupsAreLoaded: true };
          const {
            fetchNewEngagementInstance,
            fetchInitialSetupResponseForNei,
            fetchJobInfoResponsesForNei,
            fetchAttachmentInfoResponsesForNei,
            fetchTaxRiskResponseForNei
          } = newEngagementInstanceThunks;
          const { incrementLoadingTasksTotal, loadExistingNewEngagementInstanceCompleted } = newEngagementInstanceSlice;

          reactRouterDom.useParams.mockReturnValue(params);
          newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(newEngagementInstance);
          newEngagementInstanceSlice.selectLookupsMetadata.mockReturnValue(lookupsMetadata);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          // wait for the final method to have been called
          await waitFor(() => {
            expect(loadExistingNewEngagementInstanceCompleted).toHaveBeenCalled();
          });

          // ensure methods called with proper args
          expect(incrementLoadingTasksTotal).toHaveBeenCalledOnceWith(7);
          expect(fetchNewEngagementInstance).toHaveBeenCalledOnceWith(newEngagementInstanceId);
          expect(fetchInitialSetupResponseForNei).toHaveBeenCalledOnceWith(newEngagementInstanceId);
          expect(fetchJobInfoResponsesForNei).toHaveBeenCalledOnceWith(newEngagementInstanceId);
          expect(fetchAttachmentInfoResponsesForNei).toHaveBeenCalledOnceWith(newEngagementInstanceId);
          expect(fetchTaxRiskResponseForNei).toHaveBeenCalledOnceWith(newEngagementInstanceId);
          expect(loadExistingNewEngagementInstanceCompleted).toHaveBeenCalledOnceWith();
        });

        it('dispatches proper actions to load the new engagement instance workflow data', async () => {
          // * ARRANGE
          const newEngagementInstanceId = faker.datatype.number();
          const params = { newEngagementInstanceId: faker.datatype.number().toString() };
          const newEngagementInstance = { newEngagementInstanceId };
          const lookupsMetadata = { lookupsAreLoaded: true };
          const { fetchUserTasks, fetchWorkflowStepRunLogs } = newEngagementInstanceThunks;
          const { incrementLoadingTasksTotal, loadExistingNewEngagementInstanceCompleted } = newEngagementInstanceSlice;

          reactRouterDom.useParams.mockReturnValue(params);
          newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(newEngagementInstance);
          newEngagementInstanceSlice.selectLookupsMetadata.mockReturnValue(lookupsMetadata);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          // wait for the final method to have been called
          await waitFor(() => {
            expect(loadExistingNewEngagementInstanceCompleted).toHaveBeenCalled();
          });

          // ensure methods called with proper args
          expect(incrementLoadingTasksTotal).toHaveBeenCalledOnceWith(7);
          expect(fetchUserTasks).toHaveBeenCalledOnceWith(newEngagementInstanceId);
          expect(fetchWorkflowStepRunLogs).toHaveBeenCalledOnceWith(newEngagementInstanceId);
          expect(loadExistingNewEngagementInstanceCompleted).toHaveBeenCalledOnceWith();
        });

        it('executes data loading methods in the proper order', async () => {
          // * ARRANGE
          const newEngagementInstanceId = faker.datatype.number();
          const params = { newEngagementInstanceId: faker.datatype.number().toString() };
          const newEngagementInstance = { newEngagementInstanceId };
          const lookupsMetadata = { lookupsAreLoaded: true };
          const { incrementLoadingTasksTotal, loadExistingNewEngagementInstanceCompleted } = newEngagementInstanceSlice;
          const {
            fetchAttachmentInfoResponsesForNei,
            fetchInitialSetupResponseForNei,
            fetchJobInfoResponsesForNei,
            fetchNewEngagementInstance,
            fetchTaxRiskResponseForNei,
            fetchUserTasks,
            fetchWorkflowStepRunLogs
          } = newEngagementInstanceThunks;

          const neiDataLoadingMethods = [
            fetchNewEngagementInstance,
            fetchInitialSetupResponseForNei,
            fetchJobInfoResponsesForNei,
            fetchAttachmentInfoResponsesForNei,
            fetchTaxRiskResponseForNei
          ];

          const workflowDataLoadingMethods = [fetchUserTasks, fetchWorkflowStepRunLogs];

          reactRouterDom.useParams.mockReturnValue(params);
          newEngagementInstanceSlice.selectNewEngagementInstance.mockReturnValue(newEngagementInstance);
          newEngagementInstanceSlice.selectLookupsMetadata.mockReturnValue(lookupsMetadata);

          // * ACT
          render(getComponentToRender());

          // * ASSERT
          // wait for the final method to have been called
          await waitFor(() => {
            expect(loadExistingNewEngagementInstanceCompleted).toHaveBeenCalled();
          });

          // ensure all of the nei data loading methods are called
          // - AFTER newEngagementInstanceSlice.incrementLoadingTasksTotal
          // - BEFORE all of the workflowDataLoadingMethods
          // * NOTE: this ensures the following:
          // * - incrementLoadingTasksTotal is called first
          // * - all of the data loading methods are called next (before any of the workflowDataLoadingMethods )
          for (const neiDataLoadingMethod of neiDataLoadingMethods) {
            expect(neiDataLoadingMethod).toHaveBeenCalledAfter(incrementLoadingTasksTotal);

            for (const workflowDataLoadingMethod of workflowDataLoadingMethods) {
              expect(neiDataLoadingMethod).toHaveBeenCalledBefore(workflowDataLoadingMethod);
            }
          }

          // ensure all of the nei workflow data loading methods are called
          // - AFTER all of the neiDataLoadingMethods
          // - BEFORE newEngagementInstanceSlice.loadExistingNewEngagementInstanceCompleted
          // * NOTE: this ensures the following:
          // * - all of the nei workflow data loading methods are called after all of the neiDataLoadingMethods
          // * - loadScreenLookupsCompleted is called last
          for (const workflowDataLoadingMethod of workflowDataLoadingMethods) {
            for (const neiDataLoadingMethod of neiDataLoadingMethods) {
              expect(workflowDataLoadingMethod).toHaveBeenCalledAfter(neiDataLoadingMethod);
            }

            expect(workflowDataLoadingMethod).toHaveBeenCalledBefore(loadExistingNewEngagementInstanceCompleted);
          }
        });
      });
    });

    describe('load client entities', () => {
      it('dispatches fetchClientEntities when clientNumber has a value', () => {
        const clientNumber = faker.datatype.number();
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientNumber }
        };
        const thunkResults = faker.random.alphaNumeric(10);

        newEngagementInstanceSlice.selectView.mockReturnValue(selectClientView);
        newEngagementInstanceThunks.fetchClientEntities.mockReturnValue(thunkResults);
        render(getComponentToRender());

        expect(newEngagementInstanceThunks.fetchClientEntities).toHaveBeenCalledOnce();
        expect(newEngagementInstanceThunks.fetchClientEntities).toHaveBeenCalledWith(clientNumber);
        expect(mockDispatch).toHaveBeenCalledWith(thunkResults);
      });

      it('does not dispatch fetchClientEntities when clientNumber has no value', () => {
        const clientNumber = null;
        const selectClientView = {
          ...fakeSelectClientView,
          formData: { ...fakeSelectClientView.formData, clientNumber }
        };
        const thunkResults = faker.random.alphaNumeric(10);

        newEngagementInstanceSlice.selectView.mockReturnValue(selectClientView);
        newEngagementInstanceThunks.fetchClientEntities.mockReturnValue(thunkResults);
        render(getComponentToRender());

        expect(newEngagementInstanceThunks.fetchClientEntities).not.toHaveBeenCalled();
        expect(mockDispatch).not.toHaveBeenCalledWith(thunkResults);
      });
    });

    describe('show toast', () => {
      it('does not show a toast when there is no toast message', () => {
        const toastInfo = {};
        const metadata = { ...fakeMetadata, toastInfo };
        newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
        render(getComponentToRender());
        expect(reactToastify.toast).not.toHaveBeenCalled();
      });

      it('shows a toast when there is a toast message', () => {
        const toastInfo = { message: faker.random.alpha(10), type: faker.random.alpha(10) };
        const metadata = { ...fakeMetadata, toastInfo };
        const expectedOptions = { type: toastInfo.type };
        newEngagementInstanceSlice.selectMetadata.mockReturnValue(metadata);
        render(getComponentToRender());
        expect(reactToastify.toast).toHaveBeenCalledOnce();
        expect(reactToastify.toast).toHaveBeenCalledWith(toastInfo.message, expectedOptions);
      });
    });
  });
});
