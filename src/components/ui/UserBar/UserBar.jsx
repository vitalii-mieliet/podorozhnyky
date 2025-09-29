import React, { useState } from 'react';
import s from './UserBar.module.css';
import { useDispatch } from 'react-redux';

import Logout from '../../../assets/icons/logout.svg?react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../redux/auth/operations';
import clsx from 'clsx';
import InfoModal from '../../common/InfoModal/InfoModal';

function UserBar({ isLoggedIn, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Confirm modal state

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  // JSX
  return (
    <div
      className={clsx(s.userBar, location.pathname === '/' ? s.white : s.black)}
    >
      {isLoggedIn && (
        <>
          <div className={s.avatar}>
            {user?.avatar ? (
              <img src={user?.avatar} alt="аватар" />
            ) : (
              user?.name.charAt(0)
            )}
          </div>
          <span>{user?.name}</span>
          <button
            className={s.logoutBtn}
            aria-label="Вихід"
            onClick={() => setIsOpen(true)}
          >
            <Logout />
          </button>
          <InfoModal
            isOpen={isOpen}
            title="Ви точно хочете вийти?"
            text="Ми будемо сумувати за вами!"
            onCancel={() => setIsOpen(false)}
            onConfirm={handleLogout}
          />
        </>
      )}
    </div>
  );
}

export default UserBar;
