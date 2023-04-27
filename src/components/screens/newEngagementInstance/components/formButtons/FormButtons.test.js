/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from '@faker-js/faker';

import newEngagementInstanceSlice from '../../newEngagementInstanceSlice';
import NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS from '../../../../../helpers/enums/newEngagementApprovalWorkflowSteps';
import FormButtons from './FormButtons';

// **********************************************************************
// * constants

const testIds = {
  fontAwesomeIcon: 'font-awesome-icon',
  goToTopButton: 'go-to-top-button',
  startWorkflowButton: 'start-workflow-button'
};

const fakeCurrentWorkflowStepId = faker.datatype.number();
const fakeViewContainer = createViewContainer();

// **********************************************************************
// * functions

function createViewContainer() {
  const viewContainer = document.createElement('div');

  viewContainer.setAttribute('class', 'view-container');
  viewContainer.scrollTo = jest.fn();
  viewContainer.scrollTop = faker.datatype.number();

  return viewContainer;
}

const getComponentToRender = () => {
  return <FormButtons />;
};

// **********************************************************************
// * mock external dependencies

jest.mock('react-redux', () => {
  return {
    useSelector: (callback) => callback()
  };
});

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }) => <fake-font-awesome-icon icon={icon} data-testid={testIds.fontAwesomeIcon} />
}));

jest.mock('../../newEngagementInstanceSlice', () => {
  return {
    selectCurrentWorkflowStepId: jest.fn()
  };
});

jest.mock('./components/StartWorkflowButton', () => ({
  __esModule: true,
  default: () => <fake-button data-testid={testIds.startWorkflowButton} />
}));

// **********************************************************************

// * unit tests

describe('FormButtons', () => {
  // **********************************************************************
  // * setup

  beforeAll(() => {
    document.body.appendChild(fakeViewContainer);
  });

  beforeEach(() => {
    newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(fakeCurrentWorkflowStepId);
  });

  // **********************************************************************
  // * tear-down

  // **********************************************************************
  // * execution

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getComponentToRender(), div);
  });

  describe('Go To Top button', () => {
    const VISIBLE_THRESHOLD = 75;

    describe('rendering', () => {
      it('does not render when viewContainer.scrollTop is less than the visible threshold', () => {
        // * ARRANGE
        fakeViewContainer.scrollTop = faker.datatype.number({ max: VISIBLE_THRESHOLD - 1 });

        // * ACT
        render(getComponentToRender());
        fireEvent.scroll(fakeViewContainer);

        // * ASSERT
        expect(screen.queryByTestId(testIds.goToTopButton)).not.toBeInTheDocument();
      });

      it('renders when viewContainer.scrollTop is greater than or equal to the visible threshold', () => {
        // * ARRANGE
        fakeViewContainer.scrollTop = faker.datatype.number({ min: VISIBLE_THRESHOLD });

        // * ACT
        render(getComponentToRender());
        fireEvent.scroll(fakeViewContainer);

        // * ASSERT
        expect(screen.getByTestId(testIds.goToTopButton)).toBeInTheDocument();
      });

      describe('when rendered', () => {
        it('has correct icon', () => {
          // * ARRANGE
          fakeViewContainer.scrollTop = faker.datatype.number({ min: VISIBLE_THRESHOLD });

          // * ACT
          render(getComponentToRender());
          fireEvent.scroll(fakeViewContainer);

          // * ASSERT
          const icon = screen.getByTestId(testIds.fontAwesomeIcon);
          expect(icon).toBeInTheDocument();
          expect(icon).toHaveAttribute('icon', 'fa-solid fa-up-to-line');
        });
      });
    });

    describe('functional', () => {
      it('invokes viewContainer.scrollTo when clicked', () => {
        // * ARRANGE
        const expectedOptions = { top: 0, left: 0, behavior: 'smooth' };
        fakeViewContainer.scrollTop = faker.datatype.number({ min: VISIBLE_THRESHOLD });

        // * ACT
        render(getComponentToRender());
        fireEvent.scroll(fakeViewContainer);
        expect(fakeViewContainer.scrollTo).not.toHaveBeenCalled();
        fireEvent.click(screen.getByTestId(testIds.goToTopButton));

        // * ASSERT
        expect(fakeViewContainer.scrollTo).toHaveBeenCalledWith(expectedOptions);
      });
    });
  });

  describe('Save button', () => {
    it('renders when currentWorkflowStepId is not equal to internalAccountingForeignDataEntry.id', () => {
      const validWorkflowStepIds = Object.values(NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS).map((step) => step.id);
      const ids = validWorkflowStepIds.filter(
        (step) => step !== NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.internalAccountingForeignDataEntry.id
      );
      const currentWorkflowStepId = faker.helpers.arrayElement(ids);
      newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);

      render(getComponentToRender());
      expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('does not render when currentWorkflowStepId is equal to internalAccountingForeignDataEntry.id', () => {
      const currentWorkflowStepId = NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.internalAccountingForeignDataEntry.id;
      newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);

      render(getComponentToRender());
      expect(screen.queryByText('Save')).not.toBeInTheDocument();
    });

    /* as the functions are yet to be implemented, add the test case with
    temporary assert to pass the code coverage  */
    describe('functional', () => {
      it('does not yet invoke onClick function', () => {
        const currentWorkflowStepId = NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.ebpaApproval.id;
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
        const onClick = jest.fn();
        render(getComponentToRender());
        fireEvent.click(screen.getByText('Save'));
        expect(onClick).not.toHaveBeenCalled();
      });
    });
  });

  describe('StartWorkflowButton', () => {
    it('is rendered', () => {
      render(getComponentToRender());
      expect(screen.getByTestId(testIds.startWorkflowButton)).toBeInTheDocument();
    });
  });

  describe('Move Workflow button', () => {
    it.each([{ currentWorkflowStepId: null }, { currentWorkflowStepId: faker.datatype.number() }])(
      'does not render when currentWorkflowStepId is $currentWorkflowStepId',
      ({ currentWorkflowStepId }) => {
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
        render(getComponentToRender());
        expect(screen.queryByText('Move The Workflow')).not.toBeInTheDocument();
      }
    );

    it('renders in the document when currentWorkflowStepId is valid', () => {
      const validWorkflowStepIds = Object.values(NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS).map((step) => step.id);
      const currentWorkflowStepId = faker.helpers.arrayElement(validWorkflowStepIds);
      newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
      render(getComponentToRender());
      expect(screen.getByText('Move The Workflow')).toBeInTheDocument();
    });

    /* as the functions are yet to be implemented, add the test case with
    temporary assert to pass the code coverage  */
    describe('functional', () => {
      it('does not yet invoke onClick function', () => {
        const currentWorkflowStepId = NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.dopsApproval.id;
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
        const onClick = jest.fn();
        render(getComponentToRender());
        fireEvent.click(screen.getByText('Move The Workflow'));
        expect(onClick).not.toHaveBeenCalled();
      });
    });
  });

  describe('Terminate button', () => {
    it.each([
      { currentWorkflowStepId: null },
      { currentWorkflowStepId: faker.datatype.number() },
      { currentWorkflowStepId: NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.draft.id },
      { currentWorkflowStepId: NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.internalAccountingForeignDataEntry.id }
    ])('does not render when currentWorkflowStepId  equal to $currentWorkflowStepId', ({ currentWorkflowStepId }) => {
      newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
      render(getComponentToRender());
      expect(screen.queryByText('Terminate')).not.toBeInTheDocument();
    });

    it('renders when currentWorkflowStepId is not equal draft or internalAccountingForeignDataEntry', () => {
      const validWorkflowStepIds = Object.values(NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS).map((step) => step.id);
      const id = validWorkflowStepIds.filter(
        (step) =>
          step !== NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.draft.id &&
          step !== NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.internalAccountingForeignDataEntry.id
      );
      const currentWorkflowStepId = faker.helpers.arrayElement(id);
      newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
      render(getComponentToRender());
      expect(screen.getByText('Terminate')).toBeInTheDocument();
    });

    /* as the functions are yet to be implemented, add the test case with
    temporary assert to pass the code coverage  */
    describe('functional', () => {
      it('does not yet invoke onClick function', () => {
        const currentWorkflowStepId = NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.engagementPartnerApproval.id;
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
        const onClick = jest.fn();
        render(getComponentToRender());
        fireEvent.click(screen.getByText('Terminate'));
        expect(onClick).not.toHaveBeenCalled();
      });
    });
  });

  describe('Delete button', () => {
    it.each([{ currentWorkflowStepId: null }, { currentWorkflowStepId: faker.datatype.number() }])(
      'does not render in the document when currentWorkflowStepId is equal to $currentWorkflowStepId',
      ({ currentWorkflowStepId }) => {
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
        render(getComponentToRender());
        expect(screen.queryByText('Delete')).not.toBeInTheDocument();
      }
    );

    it.each([
      { currentWorkflowStepId: NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.initiatorRework.id },
      { currentWorkflowStepId: NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.draft.id }
    ])(
      'renders in the document when currentWorkflowStepId is equal to $currentWorkflowStepId',
      ({ currentWorkflowStepId }) => {
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
        render(getComponentToRender());
        expect(screen.getByText('Delete')).toBeInTheDocument();
      }
    );

    /* as the functions are yet to be implemented, add the test case with
    temporary assert to pass the code coverage  */
    describe('functional', () => {
      it.each([
        { currentWorkflowStepId: NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.initiatorRework.id },
        { currentWorkflowStepId: NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.draft.id }
      ])('does not yet invoke onClick function $currentWorkflowStepId', ({ currentWorkflowStepId }) => {
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
        const onClick = jest.fn();
        render(getComponentToRender());
        fireEvent.click(screen.getByText('Delete'));
        expect(onClick).not.toHaveBeenCalled();
      });
    });
  });

  describe('Return button', () => {
    it.each([
      { currentWorkflowStepId: null },
      { currentWorkflowStepId: faker.datatype.number() },
      { currentWorkflowStepId: NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.initiatorRework.id },
      { currentWorkflowStepId: NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.draft.id },
      { currentWorkflowStepId: NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.internalAccountingForeignDataEntry.id }
    ])('does not render when currentWorkflowStepId is equal to $currentWorkflowStepId', ({ currentWorkflowStepId }) => {
      newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
      render(getComponentToRender());
      expect(screen.queryByText('Return')).not.toBeInTheDocument();
    });

    it('renders when currentWorkflowStepId is not draft or initiator rework, internalAccountingForeignDataEntry', () => {
      const validWorkflowStepIds = Object.values(NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS).map((step) => step.id);
      const id = validWorkflowStepIds.filter(
        (step) =>
          step !== NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.draft.id &&
          step !== NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.initiatorRework.id &&
          step !== NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.internalAccountingForeignDataEntry.id
      );
      const currentWorkflowStepId = faker.helpers.arrayElement(id);
      newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
      render(getComponentToRender());
      expect(screen.getByText('Return')).toBeInTheDocument();
    });

    /* as the functions are yet to be implemented, add the test case with
    temporary assert to pass the code coverage  */
    describe('functional', () => {
      it('does not yet invoke onClick function', () => {
        const currentWorkflowStepId = NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.dopsApproval.id;
        newEngagementInstanceSlice.selectCurrentWorkflowStepId.mockReturnValue(currentWorkflowStepId);
        const onClick = jest.fn();
        render(getComponentToRender());
        fireEvent.click(screen.getByText('Return'));
        expect(onClick).not.toHaveBeenCalled();
      });
    });
  });
});
