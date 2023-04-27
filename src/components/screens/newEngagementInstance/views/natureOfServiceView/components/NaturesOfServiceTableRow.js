import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NATURE_OF_SERVICE_TYPES from '../../../../../../helpers/enums/natureOfServiceTypes';
import { selectLookups } from '../../../newEngagementInstanceSlice';

const propTypes = {
  jobInfoResponse: PropTypes.shape({
    id: PropTypes.number.isRequired,
    etag: PropTypes.string.isRequired,
    jobName: PropTypes.string.isRequired,
    jobTypeDisplayName: PropTypes.string.isRequired,
    natureOfServiceId: PropTypes.number.isRequired
  }),
  onDelete: PropTypes.func.isRequired
};

let NaturesOfServiceTableRow = ({ jobInfoResponse, onDelete }) => {
  // **********************************************************************
  // * constants

  const { id, etag, jobName, jobTypeDisplayName, natureOfServiceId } = jobInfoResponse;
  const { naturesOfServices } = useSelector(selectLookups);

  // **********************************************************************
  // * component vars

  const natureOfService = naturesOfServices.data.find((nos) => nos.id === natureOfServiceId);
  const nosTypes = Object.values(NATURE_OF_SERVICE_TYPES);
  const nosType = nosTypes.find((nosType) => nosType.id === natureOfService.natureOfServiceTypeId);
  const nosDisplayName = natureOfService.natureOfService;
  const nosTypeDisplayName = nosType.displayName;

  // **********************************************************************
  // * functions

  const handleDeleteIconClick = useCallback(() => {
    onDelete(id, etag, jobName);
  }, [etag, id, jobName, onDelete]);

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <tr>
      <td>
        {nosDisplayName} ({nosTypeDisplayName})
      </td>
      <td>{jobName}</td>
      <td>{jobTypeDisplayName}</td>
      <td>
        <FontAwesomeIcon
          className="delete-icon"
          icon="fa-solid fa-circle-x"
          size="lg"
          onClick={handleDeleteIconClick}
        />
      </td>
    </tr>
  );
};

NaturesOfServiceTableRow = memo(NaturesOfServiceTableRow);
NaturesOfServiceTableRow.propTypes = propTypes;

export default NaturesOfServiceTableRow;
