import { memo } from 'react';
import PropTypes from 'prop-types';

import COMMENT_TYPES from '../../../../../helpers/enums/commentTypes';
import TextArea from '../textArea/TextArea';

const propTypes = {
  commentType: PropTypes.oneOf(Object.values(COMMENT_TYPES)).isRequired
};

let ModalBody = ({ commentType }) => {
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
    <TextArea
      name="comments"
      label={commentType.commentsFieldLabel}
      value=""
      placeholder="Enter your comments here..."
      rows={6}
      onChange={() => {}}
    />
  );
};

ModalBody.propTypes = propTypes;
ModalBody = memo(ModalBody);

export default ModalBody;
