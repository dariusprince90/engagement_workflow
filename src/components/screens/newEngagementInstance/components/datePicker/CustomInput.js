import { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
  onClick: PropTypes.func
};

// - we're using the whole props object here instead of destructuring into separate vars
// - these props are passed from the react-datepicker
// - we want to ensure we have all the props and thus, shouldn't destructure
let CustomInput = forwardRef((props, ref) => {
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
    <div className="input-group">
      <input {...props} ref={ref} />
      <div className="input-group-append">
        <span className="input-group-text icon-clickable" onClick={props.onClick}>
          <FontAwesomeIcon icon="fa-solid fa-calendar-days" />
        </span>
      </div>
    </div>
  );
});

CustomInput = memo(CustomInput);
CustomInput.propTypes = propTypes;
CustomInput.displayName = 'CustomInput';

export default CustomInput;
