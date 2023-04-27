import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TIN_FIELD_TYPES from '../../../../../../helpers/enums/tinFieldTypes';

import {
  existingClientDetailsCleared,
  selectCurrentView,
  selectNewEngagementInstance
} from '../../../newEngagementInstanceSlice';
import { fetchExistingClient } from '../../../newEngagementInstanceThunks';
import ClientDetailsFields from './ClientDetailsFields';

let ExistingClientDetails = () => {
  // **********************************************************************
  // * constants

  const dispatch = useDispatch();
  const { formData } = useSelector(selectCurrentView);
  const { newEngagementInstanceId } = useSelector(selectNewEngagementInstance);
  const isNewRequest = !newEngagementInstanceId;

  // **********************************************************************
  // * component vars

  const [showClientDetailsFields, setShowClientDetailsFields] = useState(false);
  const tinFieldOptions = useMemo(() => ({ show: true, type: TIN_FIELD_TYPES.masked, allowMaskedEdit: false }), []);

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  /**
   * when clientNumber changes
   *  - set whether to show the client details fields
   *    - true when clientNumber has a value, false otherwise
   */
  useEffect(
    function toggleClientDetailsFields() {
      const showFields = !!formData.clientNumber;
      setShowClientDetailsFields(showFields);
    },
    [formData.clientNumber]
  );

  /**
   * if this is a new request and clientNumber changes
   *  - if client number has a value, fetch the existing client
   *  - otherwise, clear out the existing client details
   */
  useEffect(
    function setupExistingClient() {
      if (!isNewRequest) {
        return;
      }

      if (!!formData.clientNumber) {
        dispatch(fetchExistingClient({ clientId: formData.clientNumber }));
      } else {
        dispatch(existingClientDetailsCleared());
      }
    },
    [dispatch, formData.clientNumber, isNewRequest]
  );

  // **********************************************************************
  // * render

  return <>{showClientDetailsFields && <ClientDetailsFields disabled tinFieldOptions={tinFieldOptions} />}</>;
};

ExistingClientDetails = memo(ExistingClientDetails);
ExistingClientDetails.displayName = 'ExistingClientDetails';

export default ExistingClientDetails;
