import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  ensureClientExistsInCache,
  ensureJobExistsInCache,
  selectClient,
  selectJob
} from '../../../../../../../app/lookupsSlice';

const propTypes = {
  jobId: PropTypes.number.isRequired
};

let JobScheduleItem = ({ jobId }) => {
  // **********************************************************************
  // * constants

  const dispatch = useDispatch();
  const job = useSelector((state) => selectJob(state, jobId));
  const client = useSelector((state) => selectClient(state, job?.clientId));

  // **********************************************************************
  // * component vars

  const [displayText, setDisplayText] = useState('');

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  /**
   * Load the job if it has not already been loaded.
   */
  useEffect(
    function loadJob() {
      // if we already have a job, do nothing
      if (!!job) {
        return;
      }

      dispatch(ensureJobExistsInCache(jobId));
    },
    [dispatch, job, jobId]
  );

  /**
   * Load the client if it has not already been loaded.
   */
  useEffect(
    function loadClient() {
      // if we already have a client or we don't have a job, do nothing
      if (!!client || !job) {
        return;
      }

      dispatch(ensureClientExistsInCache(job.clientId));
    },
    [client, dispatch, job]
  );

  /**
   * Update the display text.
   * - text should be [job-name] ([client-name])
   * - for the job name
   *   - if the job is loaded, use the externalProjectReference
   *   - otherwise, use the job id w/ a loading message
   * - for the client name
   *   - if the client is loaded, use the displayName
   *   - otherwise, use a loading message
   */
  useEffect(
    function updateDisplayText() {
      const clientNameText = `${!!client ? client.displayName : 'loading client...'}`;
      const jobNameText = !!job ? `${job.externalProjectReference}` : `Job #${jobId} (loading job...)`;
      const text = `${jobNameText} (${clientNameText})`;

      setDisplayText(text);
    },
    [client, job, jobId]
  );

  // **********************************************************************
  // * render

  return <div>{displayText}</div>;
};

JobScheduleItem = memo(JobScheduleItem);
JobScheduleItem.propTypes = propTypes;
JobScheduleItem.displayName = 'JobScheduleItem';

export default JobScheduleItem;
