import { memo } from 'react';
import PropTypes from 'prop-types';

import CollapsibleFormSection from '../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import JobSetupFields from './JobSetupFields';

const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

let JobSetupSection = ({ id, title }) => {
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
    <CollapsibleFormSection id={id} title={title}>
      <div className="container-fluid">
        <JobSetupFields />
      </div>
    </CollapsibleFormSection>
  );
};

JobSetupSection = memo(JobSetupSection);
JobSetupSection.propTypes = propTypes;
JobSetupSection.displayName = 'JobSetupSection';

export default JobSetupSection;
