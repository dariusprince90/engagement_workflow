import PropTypes from 'prop-types';

import './FormHeader.scss';

const propTypes = {
  name: PropTypes.string,
  text: PropTypes.string.isRequired
};

const FormHeader = (props) => {
  // **********************************************************************
  // * constants

  const { text, name } = props;

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <h5 className="form-header" name={name}>
      {text}
    </h5>
  );
};

FormHeader.propTypes = propTypes;

export default FormHeader;
