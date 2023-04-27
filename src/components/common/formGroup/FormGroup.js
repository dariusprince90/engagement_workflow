import { memo } from 'react';
import PropTypes from 'prop-types';

import DYNAMIC_ALERT_TYPES from '../../../helpers/enums/dynamicAlertTypes';
import DynamicAlert from './DynamicAlert';

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isRow: PropTypes.bool,
  hideLabel: PropTypes.bool,
  children: PropTypes.node.isRequired,
  dynamicAlert: PropTypes.shape({
    type: PropTypes.oneOf(Object.values(DYNAMIC_ALERT_TYPES)).isRequired,
    message: PropTypes.node.isRequired
  })
};

let FormGroup = ({ label, name, children, isRow, hideLabel, dynamicAlert }) => {
  // **********************************************************************
  // * constants

  const formGroupClassName = isRow ? 'form-group row' : 'form-group';
  const labelClassName = isRow ? 'col-form-label col-lg-5 text-lg-right' : 'col-form-label';
  const childrenContainerClassName = isRow ? `col-lg-7${hideLabel ? ' offset-lg-5' : ''}` : '';
  const showLabel = !hideLabel;

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className={formGroupClassName} data-testid="form-group">
      {showLabel && (
        <label htmlFor={name} className={labelClassName} data-testid="label">
          {label}
        </label>
      )}

      {/* only use the div container for form group rows */}
      {isRow && (
        <div className={childrenContainerClassName} data-testid="children-container">
          {children}
          {!!dynamicAlert && <DynamicAlert {...dynamicAlert} />}
        </div>
      )}

      {/* if not a form group row, then render children straight up */}
      {!isRow && (
        <>
          {children}
          {!!dynamicAlert && <DynamicAlert {...dynamicAlert} />}
        </>
      )}
    </div>
  );
};

FormGroup = memo(FormGroup);
FormGroup.propTypes = propTypes;

export default FormGroup;
