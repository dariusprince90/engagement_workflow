import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Header.scss';
import { selectPageTitle, selectPageSubtitle } from './headerSlice';

const Header = () => {
  // **********************************************************************
  // * constants

  const pageTitle = useSelector(selectPageTitle);
  const pageSubtitle = useSelector(selectPageSubtitle);

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <header className="common-page-header">
      {/* pm logo */}
      <Link to="/" reloadDocument>
        <img src="/images/pm-logos/pm-logo-white-small.png" alt="Company logo" className="pm-logo" />
      </Link>

      <span className="titles-container">
        {/* page title and subtitle */}
        <h3 className="page-title">{pageTitle}</h3>
        <h5 className="page-subtitle">{pageSubtitle}</h5>
      </span>

      <div className="page-help-container">
        <a
          href={
            'https://Company.sharepoint.com/sites/kshare-Internal-Accounting/Shared%20Documents/Forms/AllItems.aspx' +
            '?id=%2Fsites%2Fkshare%2DInternal%2DAccounting%2FShared%20Documents%2FNEW%20Best%20Practices%20and' +
            '%20Frequently%20Asked%20Questions%2Epdf&parent=%2Fsites%2Fkshare%2DInternal%2DAccounting%2FShared%20Documents'
          }
          target="_blank"
          rel="noopener noreferrer">
          <FontAwesomeIcon icon={['fas', 'question-circle']} className="help-logo" />
          <span className="page-help-text">Best Practices and FAQs</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
