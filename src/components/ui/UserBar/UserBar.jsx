import React from 'react';
import s from './UserBar.module.css';
import { useDispatch } from 'react-redux';

import { authActions } from '../../../redux/auth/slice';
import Logout from '../../../assets/icons/logout.svg?react';

function UserBar({ isLoggedIn, user }) {
  const dispatch = useDispatch();

  // JSX
  return (
    <div className={s.userBar}>
      {isLoggedIn && (
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
            onClick={() => dispatch(authActions.logout())}
          >
            <Logout />
          </button>
        </>
      )}
    </div>
  );
}

export default UserBar;
