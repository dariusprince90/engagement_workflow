import { memo } from 'react';
import PropTypes from 'prop-types';

import './FormText.scss';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  applyEmphasis: PropTypes.bool,
  isLabel: PropTypes.bool,
  name: PropTypes.string
};

let FormText = ({ children, applyEmphasis, isLabel, name }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  let className = 'form-text';

  if (applyEmphasis) className += ' emphasis';

  if (isLabel) className += ' label';

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className={className} name={name}>
      {children}
    </div>
  );
};

FormText = memo(FormText);
FormText.propTypes = propTypes;
FormText.displayName = 'FormText';

export default FormText;
