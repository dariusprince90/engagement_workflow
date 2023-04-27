import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './TableRowOverlay.scss';

export class OverlayTypes {
  static info = 'info';
  static error = 'error';
}

const propTypes = {
  type: PropTypes.oneOf([OverlayTypes.info, OverlayTypes.error]),
  message: PropTypes.node.isRequired,
  errorDetailsMessage: PropTypes.node
};

const TableRowOverlay = function ({ type, message, errorDetailsMessage }) {
  // **********************************************************************
  // * constants

  // **********************************************************************
  // * component vars

  const [rowErrorDetails, setRowErrorDetails] = useState({ visibilityClass: '', positionX: 0, positionY: 0 });

  // **********************************************************************
  // * functions

  const getErrorDetailsClassName = () => {
    return `table-row-error-details ${rowErrorDetails.visibilityClass}`;
  };

  const getErrorDetailsStyle = () => {
    return { top: rowErrorDetails.positionY, left: rowErrorDetails.positionX };
  };

  const getRowOverlayClassName = () => {
    return `table-row-overlay ${type}`;
  };

  const isErrorOverlayWithDetails = () => {
    return type === OverlayTypes.error && !!errorDetailsMessage;
  };

  const hideRowErrorDetails = () => {
    setRowErrorDetails({ ...rowErrorDetails, visibilityClass: '' });
  };

  const showRowErrorDetails = (event) => {
    const { clientX, clientY } = event.nativeEvent;

    setRowErrorDetails({
      ...rowErrorDetails,
      visibilityClass: 'visible',
      positionX: -9999,
      positionY: -9999,
      clientX,
      clientY
    });
  };

  // **********************************************************************
  // * side effects

  /**
   * position the row error details popup when it becomes visible
   * it will be positioned based on where the mouse click occurred and how close to the edge of the screen it is
   */
  useEffect(
    function setRowErrorDetailsPosition() {
      if (rowErrorDetails.visibilityClass !== 'visible') {
        return;
      }

      /* istanbul ignore next -- justification: cannot currently mock the window or document without affecting test rendering */
      const viewWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      const { offsetWidth: containerWidth } = document.querySelector('.table-row-error-details');
      const containerHalfWidth = Math.ceil(containerWidth / 2);
      const minLeft = containerHalfWidth;
      const maxLeft = viewWidth - containerHalfWidth;
      const clientX = rowErrorDetails.clientX;
      const positionY = rowErrorDetails.clientY;

      /* istanbul ignore next -- justification: cannot currently mock the window or document without affecting test rendering */
      const positionX =
        clientX < minLeft && clientX > maxLeft
          ? clientX - containerHalfWidth
          : clientX > maxLeft
          ? clientX - containerWidth
          : clientX > minLeft
          ? clientX - containerHalfWidth
          : clientX;

      setRowErrorDetails({
        visibilityClass: 'visible',
        positionX,
        positionY,
        clientX,
        clientY: rowErrorDetails.clientY
      });
    },
    [rowErrorDetails.clientX, rowErrorDetails.clientY, rowErrorDetails.visibilityClass]
  );

  // **********************************************************************
  // * render

  return (
    <>
      {/* row overlay */}
      <div className={getRowOverlayClassName()} onClick={showRowErrorDetails} data-testid="row-overlay">
        {/* overlay message*/}
        {message}

        {/* if this is an error overlay with details, show the "click for details" message */}
        {isErrorOverlayWithDetails() && <span className="details-message">(click for details)</span>}
      </div>

      {/* if this is an error overlay with details, create the error details popup */}
      {isErrorOverlayWithDetails() && (
        <div
          className={getErrorDetailsClassName()}
          style={getErrorDetailsStyle()}
          onClick={hideRowErrorDetails}
          data-testid="error-details">
          <FontAwesomeIcon icon={['far', 'times-circle']} className="close-icon" />
          {errorDetailsMessage}
        </div>
      )}
    </>
  );
};

TableRowOverlay.propTypes = propTypes;

export default TableRowOverlay;
