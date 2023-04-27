import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NEW_ENGAGEMENT_INSTANCE_VIEWS from '../../../../../../../helpers/enums/newEngagementInstanceViews';

import { ensureClientExistsInCache, selectClient } from '../../../../../../../app/lookupsSlice';
import { selectView } from '../../../../newEngagementInstanceSlice';

const propTypes = {
  currentJobInfoResponseId: PropTypes.number.isRequired,
  jobInfoResponse: PropTypes.shape({
    id: PropTypes.number.isRequired,
    jobName: PropTypes.string,
    jobTypeDisplayName: PropTypes.string
  })
};

let JobInfoResponseScheduleItem = ({ currentJobInfoResponseId, jobInfoResponse }) => {
  // **********************************************************************
  // * constants

  const dispatch = useDispatch();
  const { formData: selectClientFormData } = useSelector((state) =>
    selectView(state, NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId)
  );
  const { clientName, clientNumber } = selectClientFormData;
  const client = useSelector((state) => selectClient(state, clientNumber));

  // **********************************************************************
  // * component vars

  const [displayText, setDisplayText] = useState('');

  const isCurrentJobInfoResponse = currentJobInfoResponseId === jobInfoResponse.id;
  const itemClassName = isCurrentJobInfoResponse ? 'current-job' : null;

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  /**
   * Load the client if it has not already been loaded.
   */
  useEffect(
    function loadClient() {
      // if we already have a client, do nothing
      if (!!client) {
        return;
      }

      dispatch(ensureClientExistsInCache(clientNumber));
    },
    [client, clientNumber, dispatch]
  );

  /**
   * Update the display text.
   * - text should be [jir.job-name] ([client-name])
   * - for the client name text
   *   - if we have a clientName (from the workflow / new client), use it
   *   - else if the client is loaded, use the displayName
   *   - otherwise, use a loading message
   * - for the job name text
   *   - if we have a job name, use it
   *   - otherwise, use the job type display name
   */
  useEffect(
    function updateDisplayText() {
      const clientNameText = `${!!clientName ? clientName : !!client ? client.displayName : 'loading client...'}`;
      const jobNameText = jobInfoResponse.jobName || jobInfoResponse.jobTypeDisplayName;
      const text = `${jobNameText} (${clientNameText})`;

      setDisplayText(text);
    },
    [client, clientName, jobInfoResponse.jobName, jobInfoResponse.jobTypeDisplayName]
  );

  // **********************************************************************
  // * render

  return (
    <div className={itemClassName}>
      {isCurrentJobInfoResponse && <FontAwesomeIcon icon="fa-solid fa-check" fixedWidth size="lg" />}
      {displayText}
    </div>
  );
};

JobInfoResponseScheduleItem = memo(JobInfoResponseScheduleItem);
JobInfoResponseScheduleItem.propTypes = propTypes;
JobInfoResponseScheduleItem.displayName = 'JobInfoResponseScheduleItem';

export default JobInfoResponseScheduleItem;
