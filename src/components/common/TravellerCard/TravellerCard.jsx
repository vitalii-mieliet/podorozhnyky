import React from 'react';
import css from './TravellerCard.module.css';
import avatarPlaceholder from '../../../assets/icons/AvatarImage.svg';
import AppButton from '../../ui/AppButton/AppButton';

function TravellerCard({ userData = {} }) {
  const { avatar, fullName, description } = userData;
  const userAvatar = avatar || avatarPlaceholder;

  return (
    <article className={css.travelerInfoCard}>
      <img
        src={userAvatar}
        width={112}
        height={112}
        alt={fullName || 'Avatar'}
        className={css.imgPlaceholder}
      />
      <div className={css.infoBlock}>
        <h2 className={css.name}>{fullName || 'Full name'}</h2>
        <p className={css.description}>
          {description ||
            'adipisicing elit. Id, impedit error. Libero aspernatur quo a.'}
        </p>

        <AppButton href="#" variant="grey" fullWidth={true}>
          Переглянути профіль
        </AppButton>
      </div>
    </article>
  );
}

export default TravellerCard;
