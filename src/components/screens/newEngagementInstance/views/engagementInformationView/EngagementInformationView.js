import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { selectNewEngagementInstance } from '../../newEngagementInstanceSlice';
import EngagementInformationAttestSection from './components/engagementInformationAttestSection/EngagementInformationAttestSection';
import EngagementInformationNonAttestSection from './components/engagementInformationNonAttestSection/EngagementInformationNonAttestSection';

const EngagementInformationView = () => {
  // **********************************************************************
  // * constants

  const { isAttest } = useSelector(selectNewEngagementInstance);

  // **********************************************************************
  // * component vars

  /**
   * sections which have conditional visibility and whether they are shown
   */
  const showSections = useMemo(
    () => ({
      attest: isAttest === true,
      nonAttest: isAttest === false
    }),
    [isAttest]
  );

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <>
      {showSections.attest && <EngagementInformationAttestSection />}
      {showSections.nonAttest && <EngagementInformationNonAttestSection />}
    </>
  );
};

export default EngagementInformationView;
