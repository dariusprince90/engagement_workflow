import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import VIEW_STATUSES from '../../../../../helpers/enums/viewStatuses';

const propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(VIEW_STATUSES))
};

const NavItem = ({ id, label, status = VIEW_STATUSES.normal }) => {
  // **********************************************************************
  // * constants

  const [navIconType, setNavIconType] = useState('fa-solid fa-circle-location-arrow');
  const [navItemStatusClass, setNavItemStatusClass] = useState('');

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  /**
   * scroll to the dom element to which this nav item is linked
   */
  const scrollToElement = async () => {
    // get the view container (the scrollable container)
    const viewContainer = document.getElementsByClassName('view-container')[0];

    // get the element to which we want to scroll
    const element = document.getElementById(id);

    // get the bounding client rectangles
    const viewContainerRect = viewContainer.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    // calculate the offset of the element from the top of the view container
    // subtract a few pixels so that the element doesn't scroll and butt right up to the page header
    const bufferPixels = 12;
    const topOffset = elementRect.top - viewContainerRect.top - bufferPixels;

    // create the scroll options
    const options = { top: topOffset, left: 0, behavior: 'smooth' };

    // scroll the view container
    viewContainer.scrollBy(options);
  };

  // **********************************************************************
  // * side effects

  /**
   * when the status changes, use the status to
   * - set the nav item status class
   * - set the nav icon type
   */
  useEffect(
    function setStatusBasedVars() {
      switch (status) {
        case VIEW_STATUSES.valid:
          setNavItemStatusClass('nav-item-valid');
          setNavIconType('fa-solid fa-circle-check');
          break;

        case VIEW_STATUSES.invalid:
          setNavItemStatusClass('nav-item-invalid');
          setNavIconType('fa-solid fa-circle-xmark');
          break;

        case VIEW_STATUSES.normal:
        default:
          setNavItemStatusClass('');
          setNavIconType('fa-solid fa-circle-location-arrow');
          break;
      }
    },
    [status]
  );

  // **********************************************************************
  // * render

  return (
    <div className={`nav-item ${navItemStatusClass}`.trim()} role="navigation">
      <div className="nav-icon">
        <FontAwesomeIcon icon={navIconType} className="clickable" onClick={scrollToElement} />
      </div>
      <div className="nav-label">{label}</div>
    </div>
  );
};

NavItem.propTypes = propTypes;

export default NavItem;
