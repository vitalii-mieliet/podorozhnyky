import AppButton from '../../ui/AppButton/AppButton';
import styles from './StoryCard.module.css';
import BookmarkIcon from '../../../assets/icons/bookmark.svg?react';
import EditIcon from '../../../assets/icons/edit.svg?react';

const StoryCard = ({ storyInfo, isOwner = false }) => {
  if (!storyInfo) {
    return null;
  }

  const { _id, img, category, title, article, owner, date, rate } = storyInfo;

  const imageUrl = img ? img : '/images/placeholder.png'; 
  const authorAvatarUrl = owner?.avatar ? owner.avatar : '/images/placeholder.png';

  return (
    <li className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} className={styles.image} loading="lazy" />
        <p className={styles.country}>{category}</p>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{article}</p>

        <div className={styles.metaInfo}>
          <div className={styles.authorInfo}>
            <img
              src={authorAvatarUrl}
              alt={owner?.name || 'Author'}
              className={styles.authorAvatar}
            />
            <div>
              <p className={styles.authorName}>{owner?.name || 'Невідомий автор'}</p>
              <p className={styles.date}>{new Date(date).toLocaleDateString()}</p>
            </div>
          </div>
          <div className={styles.bookmarksInfo}>
            <BookmarkIcon className={styles.bookmarkMetaIcon} />
            <span>{rate || 0}</span>
          </div>
        </div>

        <div className={styles.actions}>
          {/* ВИПРАВЛЕНО: Шлях до однієї історії */}
          <AppButton href={`/stories/story/${_id}`} variant="grey">
            Переглянути статтю
          </AppButton>

          {isOwner ? (
            <AppButton
              href={`/edit-story/${_id}`}
              aria-label="Редагувати історію"
              className={styles.iconButton}
            >
              <EditIcon className={styles.actionIcon} />
            </AppButton>
          ) : (
            <AppButton
              onClick={() => console.log('Bookmark clicked!')}
              aria-label="Додати в збережені"
              className={styles.iconButton}
            >
              <BookmarkIcon className={styles.actionIcon} />
            </AppButton>
          )}
        </div>
      </div>
    </li>
  );
};

export default StoryCard;