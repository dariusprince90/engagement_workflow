import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import JOB_ROLES from '../../../../../../../helpers/enums/jobRoles';
import TableInfoMessage from '../../../../../../common/tables/TableInfoMessage';
import TableLoadingMessage from '../../../../../../common/tables/TableLoadingMessage';

import {
  selectCurrentView,
  selectCurrentViewId,
  selectBillingSchedulesForJir
} from '../../../../newEngagementInstanceSlice';
import { fetchBillingSchedulesForJir } from '../../../../newEngagementInstanceThunks';

import BillingScheduleTableRow from './BillingScheduleTableRow';
import NewBillingScheduleTableRow from './NewBillingScheduleTableRow';
import CreateNewBillingScheduleTableRow from './CreateNewBillingScheduleTableRow';

let BillingScheduleTable = () => {
  // **********************************************************************
  // * constants

  const dispatch = useDispatch();
  const viewId = useSelector(selectCurrentViewId);
  const { formData, lookups, metadata } = useSelector(selectCurrentView);
  const { id: jobInfoResponseId, billToClientNumber } = formData;
  const { jobRoles } = lookups;
  const { billingSchedules: billingSchedulesMetadata } = metadata;

  const { billingSchedules, newBillingSchedules } = useSelector((state) =>
    selectBillingSchedulesForJir(state, jobInfoResponseId)
  );

  // **********************************************************************
  // * component vars

  const [showBillingSchedules, setShowBillingSchedules] = useState(false);
  const [billingSchedulesMessage, setBillingSchedulesMessage] = useState('');

  const jobHasBiller = useMemo(
    () => jobRoles.data.find((jr) => jr.roleId === JOB_ROLES.biller.id) !== undefined,
    [jobRoles.data]
  );

  const jobHasBillToClient = useMemo(() => !!billToClientNumber, [billToClientNumber]);

  // **********************************************************************
  // * functions

  /**
   * Handler for when the CreateNewBillingScheduleTableRow is clicked.
   */
  const handleCreateNewBillingScheduleClick = useCallback(() => {
    // todo: implement me
  }, []);

  /**
   * Handler for when a BillingScheduleTableRow is clicked.
   */
  const handleBillingScheduleTableRowClick = useCallback((billingScheduleId) => {
    // todo: implement me
  }, []);

  /**
   * Handler for when a NewBillingScheduleTableRow is clicked.
   */
  const handleNewBillingScheduleTableRowClick = useCallback((newBillingScheduleId) => {
    // todo: implement me
  }, []);

  // **********************************************************************
  // * side effects

  /**
   * load the billing schedules if they are not already loaded
   */
  useEffect(
    function loadBillingSchedules() {
      // if showBillingSchedules is false OR billingSchedulesMetadata.haveBeenLoaded is true
      // - then do nothing, just return
      if (!showBillingSchedules || billingSchedulesMetadata.haveBeenLoaded) {
        return;
      }

      dispatch(fetchBillingSchedulesForJir({ viewId, jobInfoResponseId }));
    },
    [billingSchedulesMetadata.haveBeenLoaded, dispatch, jobInfoResponseId, showBillingSchedules, viewId]
  );

  /**
   * when we have a biller (job role) and a bill-to client
   * - show the billing schedules
   * - otherwise, do not show them
   */
  useEffect(
    function toggleBillingSchedulesTableData() {
      const shouldShow = jobHasBillToClient && jobHasBiller;
      setShowBillingSchedules(shouldShow);
    },
    [jobHasBillToClient, jobHasBiller]
  );

  /**
   * set the billing schedules table message based on whether we have a biller or bill-to client
   */
  useEffect(
    function updateBillingSchedulesTableMessage() {
      let message = '';

      if (!jobHasBiller && !jobHasBillToClient) {
        message = 'Add a biller (job role) and select a bill-to client to enable the billing schedules.';
      } else if (!jobHasBiller) {
        message = 'Add a biller (job role) to enable the billing schedules.';
      } else if (!jobHasBillToClient) {
        message = 'Select a bill-to client to enable the billing schedules.';
      }

      setBillingSchedulesMessage(message);
    },
    [jobHasBillToClient, jobHasBiller]
  );

  // **********************************************************************
  // * render

  return (
    <div className="table-responsive">
      <table className="table billing-schedule-table">
        {/* table header */}
        <thead>
          <tr>
            <th>Schedule</th>
            <th>Jobs</th>
          </tr>
        </thead>

        {/* table body */}
        <tbody>
          {billingSchedulesMetadata.isLoading && (
            <TableLoadingMessage colSpan={2} displayMessage="Loading billing schedules..." />
          )}

          {!showBillingSchedules && <TableInfoMessage colSpan={2} displayMessage={billingSchedulesMessage} />}

          {showBillingSchedules && !billingSchedulesMetadata.isLoading && (
            <>
              {/* rows for existing billing schedules */}
              {billingSchedules.map((billingSchedule) => (
                <BillingScheduleTableRow
                  key={billingSchedule.id}
                  currentJobInfoResponseId={jobInfoResponseId}
                  billingSchedule={billingSchedule}
                  onClick={handleBillingScheduleTableRowClick}
                />
              ))}

              {/* rows for new billing schedules */}
              {newBillingSchedules.map((newBillingSchedule) => (
                <NewBillingScheduleTableRow
                  key={newBillingSchedule.id}
                  currentJobInfoResponseId={jobInfoResponseId}
                  newBillingSchedule={newBillingSchedule}
                  onClick={handleNewBillingScheduleTableRowClick}
                />
              ))}

              {/* row to create a new billing schedule */}
              <CreateNewBillingScheduleTableRow onClick={handleCreateNewBillingScheduleClick} />
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

BillingScheduleTable = memo(BillingScheduleTable);
BillingScheduleTable.displayName = 'BillingScheduleTable';

export default BillingScheduleTable;
