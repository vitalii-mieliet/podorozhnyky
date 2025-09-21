import React, { useState } from 'react';
import css from './TravelerCard.module.css';
import placeholder from '../../../assets/images/placeholder.png';
import avatarPlaceholder from '../../../assets/icons/AvatarImage.svg';
import bookmark from '../../../assets/icons/Bookmark.svg';
import editIcon from '../../../assets/icons/edit.svg';
import { AppButton } from '../../ui/AppButton';

function TravelerCard({ userData = {}, isOwner = false }) {
  const { photo, category, title, description, fullName, date, views, avatar } =
    userData;
  const [isActive, setIsActive] = useState(false);

  const img = photo || placeholder;
  const userAvatar = avatar || avatarPlaceholder;

  const toggleActive = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <article className={css.travelerCard}>
      <img
        src={img}
        alt={title || 'Traveler blog image'}
        className={css.travelerImg}
      />

      <div className={css.travelerInfo}>
        <header className={css.blogInfoWrapper}>
          <span className={css.category}>{category || 'Category'}</span>
          <h3 className={css.blogTitle}>
            {title || 'Blog title heading will go here'}
          </h3>
          <p className={css.blogInfo}>
            {description ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.'}
          </p>
        </header>

        <footer className={css.travelerDetails}>
          <img
            src={userAvatar}
            alt={`${fullName || 'Traveler'} avatar`}
            className={css.travelerDetailsImg}
          />
          <div>
            <strong>{fullName || 'Full name'}</strong>
            <div className={css.dateViews}>
              <time>{date || '11 Jan 2022'}</time>
              <span className={css.spanViews}>•</span>
              <div className={css.views}>
                {views || 0}
                <img
                  src={bookmark}
                  alt=""
                  aria-hidden="true"
                  width="16"
                  height="17"
                />
              </div>
            </div>
          </div>
        </footer>

        <div className={css.travelLink}>
          <AppButton href="#" variant="primary">
            Переглянути статтю
          </AppButton>

          {isOwner ? (
            <AppButton variant="icon" aria-label="Edit article">
              <img
                src={editIcon}
                alt=""
                aria-hidden="true"
                className={css.icon}
              />
            </AppButton>
          ) : (
            <button
              className={`${css.btnIcon} ${isActive ? css.active : ''}`}
              onClick={toggleActive}
              aria-label={
                isActive ? 'Remove from bookmarks' : 'Add to bookmarks'
              }
              aria-pressed={isActive}
            >
              <img
                src={bookmark}
                alt=""
                aria-hidden="true"
                className={css.icon}
              />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default TravelerCard;
