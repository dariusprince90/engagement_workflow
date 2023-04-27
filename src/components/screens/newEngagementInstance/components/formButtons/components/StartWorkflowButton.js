import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NEW_ENGAGEMENT_INSTANCE_VIEWS from '../../../../../../helpers/enums/newEngagementInstanceViews';
import CLIENT_SEARCH_TYPES from '../../../../../../helpers/enums/clientSearchTypes';

import ApiGeneralException from '../../../../../../api/ApiGeneralException';
import { saveNewEngagementInstanceAndStartWorkflow } from './startWorkflowHelper';

import {
  saveNewEngagementInstanceCompleted,
  saveNewEngagementInstanceFailed,
  saveNewEngagementInstanceStarted,
  selectNewEngagementInstance,
  selectView
} from '../../../newEngagementInstanceSlice';

let StartWorkflowButton = () => {
  // **********************************************************************
  // * constants

  const SELECT_CLIENT_VIEW_ID = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { newEngagementInstanceId } = useSelector(selectNewEngagementInstance);
  const { formData } = useSelector((state) => selectView(state, SELECT_CLIENT_VIEW_ID));
  const { clientNumber, clientSearchTypeId } = formData;

  // **********************************************************************
  // * component vars

  // we will only show the button when we have no new engagement instance id
  const showButton = newEngagementInstanceId === null;

  // the start workflow button only enabled when
  // - existing client: clientSearchTypeId and clientNumber both have values
  // - new client (org): TBD
  // - new client (contact): TBD
  const [isEnabled, setIsEnabled] = useState(false);

  // **********************************************************************
  // * functions

  /**
   * Click handler for the button.
   */
  const handleButtonClick = async () => {
    try {
      // save the nei and start the workflow
      dispatch(saveNewEngagementInstanceStarted());
      const neiId = await saveNewEngagementInstanceAndStartWorkflow();
      dispatch(saveNewEngagementInstanceCompleted());

      // navigate to the new engagement instance
      // this will load the full nei into state
      navigate(`/${neiId}`);
    } catch (error) {
      const friendlyMessage = 'An error occurred saving your data and starting the workflow!';
      let err;

      if (error instanceof ApiGeneralException) {
        err = { ...error.getExceptionData(), friendlyMessage };
      } else {
        err = { message: error.message, friendlyMessage };
      }

      dispatch(saveNewEngagementInstanceFailed({ error: err }));
    }
  };

  // **********************************************************************
  // * side effects

  /**
   * When clientNumber and/or clientSearchTypeId changes, toggle the state of the button.
   * - button is disabled by default
   * - button is enabled when
   *    - clientSearchTypeId is for an existing client AND client number has a value
   */
  useEffect(
    function toggleStartWorkflowButtonState() {
      const hasClientSearchType = !!clientSearchTypeId;
      const searchTypeIsExistingClient = parseInt(clientSearchTypeId) === CLIENT_SEARCH_TYPES.existing.id;
      const hasClientNumber = !!clientNumber;
      const isEnabled = hasClientSearchType && searchTypeIsExistingClient && hasClientNumber;
      setIsEnabled(isEnabled);
    },
    [clientNumber, clientSearchTypeId]
  );

  // **********************************************************************
  // * render

  return (
    <>
      {showButton && (
        <button
          id="start-workflow-button"
          type="button"
          className="btn btn-primary"
          disabled={!isEnabled}
          onClick={handleButtonClick}>
          Save
        </button>
      )}
    </>
  );
};

StartWorkflowButton = memo(StartWorkflowButton);
StartWorkflowButton.displayName = 'StartWorkflowButton';

export default StartWorkflowButton;
