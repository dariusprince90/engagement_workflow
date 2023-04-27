import { memo } from 'react';

import CollapsibleFormSection from '../../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import ConstructionIndustryFields from './ConstructionIndustryFields';
import FormHeader from '../../../../../../common/formHeader/FormHeader';
import RealEstateIndustryFields from './RealEstateIndustryFields';
import K12EducationIndustryFields from './K12EducationIndustryFields';
import GovernmentalIndustryFields from './GovernmentalIndustryFields';

let IndustryRiskSection = () => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <CollapsibleFormSection title="Industry Risk">
      <div className="container-fluid">
        <FormHeader
          name="finalApprovalStepFormHeader"
          text="Any question marked as TBD must be replaced with YES/NO at Relationship Partner Final Approval step."
        />
        <GovernmentalIndustryFields />
        <ConstructionIndustryFields />
        <RealEstateIndustryFields />
        <K12EducationIndustryFields />
      </div>
    </CollapsibleFormSection>
  );
};

IndustryRiskSection = memo(IndustryRiskSection);
IndustryRiskSection.displayName = 'IndustryRiskSection';

export default IndustryRiskSection;
