import { memo } from 'react';
import PropTypes from 'prop-types';

import CollapsibleFormSection from '../../../../../common/collapsibleFormSection/CollapsibleFormSection';
import AddJobRoleFields from './AddJobRoleFields';
import JobRolesTable from './JobRolesTable';

const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

let JobRolesSection = ({ id, title }) => {
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
        <AddJobRoleFields />
        <JobRolesTable />
      </div>
    </CollapsibleFormSection>
  );
};

JobRolesSection = memo(JobRolesSection);
JobRolesSection.propTypes = propTypes;
JobRolesSection.displayName = 'JobRolesSection';

export default JobRolesSection;
