import React from 'react';
import css from './TravalerInfoCart.module.css';
import avatarPlaceholder from '../../../assets/icons/AvatarImage.svg';

function TravalerInfoCart({ userData = {} }) {
  const { avatar, fullName, job, description } = userData;

  const userAvatar = avatar || avatarPlaceholder;

  return (
    <div className={css.travalerInfoCart}>
      <img
        src={userAvatar}
        width={112}
        height={112}
        alt={fullName || 'Avatar'}
        className={css.imgPlaceholder}
      />
      <div className={css.infoBlock}>
        <div className={css.name}>{fullName || 'Full name'}</div>
        <div className={css.job}>{job || 'Job title'}</div>
        <div className={css.description}>
          {description ||
            'adipisicing elit. Id, impedit error. Libero aspernatur quo a. Illum dignissimos quasi pariatur'}
        </div>
        <button className={css.btn}>Переглянути профіль</button>
      </div>
    </div>
  );
}

export default TravalerInfoCart;
