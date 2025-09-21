import { Link } from 'react-router-dom';
import AppButton from '../../ui/AppButton/AppButton';
import styles from './StoryCard.module.css';
import bookmarkIconUrl from '../../../assets/icons/bookmark.svg';
import editIconUrl from '../../../assets/icons/edit.svg'; 


const StoryCard = ({ storyInfo, isOwner = false }) => {
  // перевірка на існування storyInfo, якщо дані ще не завантажились, компонент нічого не рендерить
  if (!storyInfo) {
    return null; 
  }
  // деструктуризація 
  const { _id, img, category, title, article, owner, date } = storyInfo;

  const imageUrl = img?.startsWith('http') ? img : `https://res.cloudinary.com/dbmy1ukhf/image/upload/q_auto,f_auto/v1758134510/Placeholder_Image.png`;
  const authorAvatarUrl = owner?.avatar?.startsWith('http') ? owner.avatar : `https://res.cloudinary.com/dbmy1ukhf/image/upload/q_auto,f_auto/v1758134510/Placeholder_Image.png`;

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <li className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} className={styles.image} loading="lazy" />
        <p className={styles.country}>{category}</p>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{truncateText(article, 100)}</p>

        <div className={styles.metaInfo}>
            <div className={styles.authorInfo}>
              <img src={authorAvatarUrl} alt={owner?.name || 'Author'} className={styles.authorAvatar} />
              <div>
                <p className={styles.authorName}>{owner?.name || 'Невідомий автор'}</p>
                <p className={styles.date}>{new Date(date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className={styles.bookmarksInfo}>
                <img src={bookmarkIconUrl} alt="Кількість закладок" className={styles.bookmarkMetaIcon} />
                <span>{storyInfo.bookmarksCount || 0}</span>
            </div>
        </div>

        <div className={styles.actions}>
          <AppButton href={`/stories/${_id}`} variant="grey">
            Переглянути статтю
          </AppButton>
          
          {isOwner ? (
            <Link to={`/edit-story/${_id}`} className={styles.iconButton} aria-label="Редагувати історію">
               <img src={editIconUrl} alt="Редагувати" className={styles.actionIcon} />
            </Link>
          ) : (
            <button
              type="button"
              className={styles.iconButton}
              aria-label="Додати в збережені"
            >
              <img src={bookmarkIconUrl} alt="Додати в збережені" className={styles.actionIcon} />
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default StoryCard;