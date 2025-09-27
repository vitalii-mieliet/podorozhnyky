import AppButton from '../../ui/AppButton/AppButton';
import styles from './StoryCard.module.css';
import clsx from 'clsx'; 
import BookmarkIcon from '../../../assets/icons/bookmark.svg?react';
import EditIcon from '../../../assets/icons/edit.svg?react';
import { useDispatch, useSelector } from 'react-redux';
import { saveStory, unsaveStory } from '../../../redux/user/operations';
import { selectSavedStories } from '../../../redux/user/selectors';

const formatDate = (dateString) => {
  const date = new Date(dateString); 
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  
  return new Intl.DateTimeFormat('uk-UA', options)
    .format(date)
    .replace(' р.', '')
    .replace('.', '');
};


const StoryCard = ({ storyInfo, variant = 'normal' }) => {
  const dispatch = useDispatch();
  const savedStoriesIds = useSelector(selectSavedStories);

  if (!storyInfo) return null;

  const { _id, img, category, title, article, owner, date, rate } = storyInfo;

  const isSaved = savedStoriesIds.includes(_id);

  const handleBookmarkClick = () => {
    if (isSaved) {
      dispatch(unsaveStory(_id));
    } else {
      dispatch(saveStory(_id));
    }
  };

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
          <AppButton href={`/stories/${_id}`} variant="grey" className={styles.viewButton}>
            Переглянути статтю
          </AppButton>
          <AppButton
            aria-label={isSaved ? "Видалити із збережених" : "Додати в збережені"}
            className={clsx(styles.iconButton, isSaved ? styles.saved : styles.normal)}
            onClick={variant !== 'own' ? handleBookmarkClick : undefined}
          >
            {variant === 'own' ? <EditIcon /> : <BookmarkIcon />}
          </AppButton>
        </div>
      </div>
    </li>
  );
};

export default StoryCard;