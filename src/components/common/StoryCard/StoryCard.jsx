import AppButton from '../../ui/AppButton/AppButton';
import styles from './StoryCard.module.css';
import clsx from 'clsx';
 
import BookmarkIcon from '../../../assets/icons/bookmark.svg?react';
import EditIcon from '../../../assets/icons/edit.svg?react';
 
const formatDate = (dateString) => {
  const date = new Date(dateString); 
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  
  return new Intl.DateTimeFormat('uk-UA', options)
    .format(date)
    .replace(' р.', '')
    .replace('.', '');
};

const StoryCard = ({ storyInfo, variant = 'normal' }) => {
  if (!storyInfo) {
    return null;
  }

  const { _id, img, category, title, article, owner, date, rate } = storyInfo;

  const imageUrl = img || '/images/placeholder.png';
  const authorAvatarUrl = owner?.avatar || '/images/placeholder.svg';

  return (
    <li className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} className={styles.image} />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <p className={styles.category}>{category}</p>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{article}</p>
        </div>

        <div className={styles.authorBlock}>
          <img src={authorAvatarUrl} alt={owner?.name || 'Автор'} className={styles.authorAvatar} />
          <div className={styles.authorDetails}>
            <p className={styles.authorName}>{owner?.name || 'Невідомий автор'}</p>
            <div className={styles.meta}>
              <span>{formatDate(date)}</span>
              <span className={styles.separator}>•</span>
              <div className={styles.saves}>
                <span>{rate || 0}</span>
                <BookmarkIcon />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          {/* --- ВИПРАВЛЕНЕ ПОСИЛАННЯ --- */}
          <AppButton href={`/stories/${_id}`} variant="grey" className={styles.viewButton}>
            Переглянути статтю
          </AppButton>
          
          <AppButton
            aria-label={variant === 'own' ? 'Редагувати історію' : 'Додати в збережені'}
            className={clsx(styles.iconButton, styles[variant])}
            href={variant === 'own' ? `/edit-story/${_id}` : undefined}
            onClick={variant !== 'own' ? () => console.log('Bookmark clicked!') : undefined}
          >
            {variant === 'own' ? <EditIcon /> : <BookmarkIcon />}
          </AppButton>
        </div>
      </div>
    </li>
  );
};

export default StoryCard;