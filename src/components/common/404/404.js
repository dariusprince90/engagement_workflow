import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './404.scss';
import { pageTitleChanged } from '../../common/header/headerSlice';

const PageNotFound404 = () => {
  // **********************************************************************
  // * constants

  const PAGE_TITLE = 'Page Not Found';
  const dispatch = useDispatch();

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  /**
   * when the page loads, set the page title
   */
  useEffect(() => {
    dispatch(pageTitleChanged(PAGE_TITLE));
  }, [dispatch]);

  // **********************************************************************
  // * render

  return (
    <div className="page-not-found-404-container">
      {/* pm logo */}
      <img src="/images/pm-logos/pm-logo-wide-color-small.png" alt="logo" className="pm-logo" />

      {/* messages */}
      <h1 className="display-1 mb-2">404</h1>
      <h2 className="mb-4">Oops! You can&rsquo;t make your mark here.</h2>
      <p>We cannot find the page that you&rsquo;re looking for.</p>
      <p>
        Try the <Link to="/">home page</Link> instead. That is a good place to start.
      </p>
    </div>
  );
};

export default PageNotFound404;
