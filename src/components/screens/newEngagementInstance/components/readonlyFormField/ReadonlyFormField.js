import { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FormGroup from '../../../../common/formGroup/FormGroup';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  value: PropTypes.string,
  isRow: PropTypes.bool,
  icon: PropTypes.shape({
    type: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired,
    title: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
  })
};

let ReadonlyFormField = ({ name, label, value, isRow, icon, ...rest }) => {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  const formGroupProps = { isRow, name, label, ...rest };
  const iconClassName = ((icon?.className || '') + (!!icon?.onClick ? ' icon-clickable' : '')).trim();

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <FormGroup {...formGroupProps}>
      <div className="form-control-plaintext">
        {value}
        {!!icon && (
          <>
            &ensp;
            <FontAwesomeIcon icon={icon.type} title={icon.title} className={iconClassName} onClick={icon.onClick} />
          </>
        )}
      </div>
    </FormGroup>
  );
};

ReadonlyFormField = memo(ReadonlyFormField);
ReadonlyFormField.propTypes = propTypes;

export default ReadonlyFormField;
