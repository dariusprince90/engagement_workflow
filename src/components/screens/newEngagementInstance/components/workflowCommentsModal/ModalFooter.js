import { memo } from 'react';
import PropTypes from 'prop-types';

import COMMENT_TYPES from '../../../../../helpers/enums/commentTypes';

const propTypes = {
  commentType: PropTypes.oneOf(Object.values(COMMENT_TYPES)).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

let ModalFooter = ({ commentType, onCancel, onSubmit }) => {
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
    <div>
      <button type="button" className="btn btn-primary" onClick={onSubmit}>
        {commentType.submitButtonText}
      </button>
      <button type="button" className="btn btn-primary" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

ModalFooter.propTypes = propTypes;
ModalFooter = memo(ModalFooter);

export default ModalFooter;
