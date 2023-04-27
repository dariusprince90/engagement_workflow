import { memo, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS from '../../../../../helpers/enums/newEngagementApprovalWorkflowSteps';
import { selectCurrentWorkflowStepId } from '../../newEngagementInstanceSlice';
import StartWorkflowButton from './components/StartWorkflowButton';

let FormButtons = () => {
  // **********************************************************************
  // * constants

  const currentWorkflowStepId = useSelector(selectCurrentWorkflowStepId);

  // **********************************************************************
  // * component vars

  const [showGoToTopButton, setShowGoToTopButton] = useState(false);
  const workflowStepIds = Object.values(NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS).map((step) => step.id);

  const deleteButtonWorkflowStepIds = workflowStepIds.filter(
    (step) =>
      step === NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.draft.id ||
      step === NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.initiatorRework.id
  );

  const returnButtonWorkflowStepIds = workflowStepIds.filter(
    (step) =>
      step !== null &&
      step !== NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.draft.id &&
      step !== NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.initiatorRework.id &&
      step !== NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.internalAccountingForeignDataEntry.id
  );

  const saveButtonWorkflowStepIds = workflowStepIds.filter(
    (step) => step !== NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.internalAccountingForeignDataEntry.id
  );

  const terminateButtonWorkflowStepIds = workflowStepIds.filter(
    (step) =>
      step !== NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.draft.id &&
      step !== NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS.internalAccountingForeignDataEntry.id
  );

  /**
   * buttons which have conditional visibility and whether they are shown
   */
  const showButtons = useMemo(
    () => ({
      delete: deleteButtonWorkflowStepIds.includes(currentWorkflowStepId),
      moveTheWorkflow: workflowStepIds.includes(currentWorkflowStepId),
      return: returnButtonWorkflowStepIds.includes(currentWorkflowStepId),
      save: saveButtonWorkflowStepIds.includes(currentWorkflowStepId),
      terminate: terminateButtonWorkflowStepIds.includes(currentWorkflowStepId)
    }),
    [
      currentWorkflowStepId,
      deleteButtonWorkflowStepIds,
      returnButtonWorkflowStepIds,
      saveButtonWorkflowStepIds,
      terminateButtonWorkflowStepIds,
      workflowStepIds
    ]
  );

  // **********************************************************************
  // * functions

  /**
   * click handler for the go-to-top button
   */
  const handleGoToTopButtonClick = () => {
    // get the view container (the scrollable container)
    const viewContainer = document.getElementsByClassName('view-container')[0];

    // create the scroll options
    const options = { top: 0, left: 0, behavior: 'smooth' };

    // scroll the view container
    viewContainer.scrollTo(options);
  };

  // **********************************************************************
  // * side effects

  /**
   * when the component loads, setup a scroll event listener on the view container
   * upon scroll, set the visibility of the go-to-top button as appropriate
   */
  useEffect(function toggleGoToTopButton() {
    const visibleThreshold = 75;
    const viewContainer = document.getElementsByClassName('view-container')[0];
    const onScroll = () => setShowGoToTopButton(viewContainer.scrollTop >= visibleThreshold);

    viewContainer.removeEventListener('scroll', onScroll);
    viewContainer.addEventListener('scroll', onScroll, { passive: true });

    return () => viewContainer.removeEventListener('scroll', onScroll);
  }, []);

  // **********************************************************************
  // * render

  return (
    <div className="buttons-container">
      {showGoToTopButton && (
        <button
          type="button"
          id="go-to-top-button"
          title="go to top"
          className="btn btn-primary"
          onClick={handleGoToTopButtonClick}
          data-testid="go-to-top-button">
          <FontAwesomeIcon icon="fa-solid fa-up-to-line" />
        </button>
      )}

      <StartWorkflowButton />

      {showButtons.save && (
        <button type="button" className="btn btn-primary" onClick={() => {}}>
          Save
        </button>
      )}

      {showButtons.moveTheWorkflow && (
        <button type="button" className="btn btn-primary" onClick={() => {}}>
          Move The Workflow
        </button>
      )}

      {showButtons.terminate && (
        <button type="button" className="btn btn-primary" onClick={() => {}}>
          Terminate
        </button>
      )}

      {showButtons.delete && (
        <button type="button" className="btn btn-primary" onClick={() => {}}>
          Delete
        </button>
      )}

      {showButtons.return && (
        <button type="button" className="btn btn-primary" onClick={() => {}}>
          Return
        </button>
      )}
    </div>
  );
};

FormButtons = memo(FormButtons);

export default FormButtons;
