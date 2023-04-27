import { useSelector } from 'react-redux';

import './UserInfo.scss';
import { selectUserAuthInfo } from '../../../app/staffSlice';

const UserInfo = () => {
  // **********************************************************************
  // * constants

  const { userName, displayName } = useSelector(selectUserAuthInfo);

  // **********************************************************************
  // * component vars

  // **********************************************************************
  // * functions

  // **********************************************************************
  // * side effects

  // **********************************************************************
  // * render

  return (
    <div className="user-info-container">
      {!!userName && <div className="user-info--user-principal-name">{userName}</div>}
      {!!displayName && <div className="user-info--user-display-name">{displayName}</div>}
    </div>
  );
};

export default UserInfo;
