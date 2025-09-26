import React from 'react';
import s from './UserBar.module.css';
import { useDispatch } from 'react-redux';

import Logout from '../../../assets/icons/logout.svg?react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../redux/auth/operations';

function UserBar({ isLoggedIn, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  // JSX
  return (
    <div className={s.userBar}>
      {isLoggedIn && user && (
        <>
          <div className={s.avatar}>
            {user.avatar ? (
              <img src={user.avatar} alt="аватар" />
            ) : (
              user.name.charAt(0)
            )}
          </div>
          <span>{user.name}</span>
          <button
            className={s.logoutBtn}
            aria-label="Вихід"
            onClick={handleLogout}
          >
            <Logout />
          </button>
        </>
      )}
    </div>
  );
}

export default UserBar;
