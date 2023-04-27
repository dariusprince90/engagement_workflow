import { memo, useMemo } from 'react';

import FinalApprovalSection from './components/finalApprovalSection/FinalApprovalSection';
import PredecessorInformationSection from './components/predecessorInformationSection/PredecessorInformationSection';
import { selectNewEngagementInstance } from '../../newEngagementInstanceSlice';
import { useSelector } from 'react-redux';

let FinalApprovalView = () => {
  // **********************************************************************
  // * constants
  const { isNewClient } = useSelector(selectNewEngagementInstance);

  // **********************************************************************
  // * component vars

  /**
   * fields which have conditional visibility and whether they are shown
   */
  const showFields = useMemo(
    () => ({
      predecessorInformationSection: isNewClient === false
    }),
    [isNewClient]
  );

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <>
      <FinalApprovalSection />
      {showFields.predecessorInformationSection && <PredecessorInformationSection />}
    </>
  );
};

FinalApprovalView = memo(FinalApprovalView);

export default FinalApprovalView;
