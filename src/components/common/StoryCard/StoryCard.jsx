import AppButton from '../../ui/AppButton/AppButton';
import styles from './StoryCard.module.css';
import bookmarkIconUrl from '../../../assets/icons/bookmark.svg';
import editIconUrl from '../../../assets/icons/edit.svg';

const StoryCard = ({ storyInfo, isOwner = false }) => {
  if (!storyInfo) {
    return null;
  }

  const { _id, img, category, title, article, owner, date } = storyInfo;

  //!  якщо imageUrl не прийшло з сервера - брати плейскохлде з assets/images

  const imageUrl = img?.startsWith('http')
    ? img
    : `https://res.cloudinary.com/dbmy1ukhf/image/upload/q_auto,f_auto/v1758134510/Placeholder_Image.png`;
  const authorAvatarUrl = owner?.avatar?.startsWith('http')
    ? owner.avatar
    : `https://res.cloudinary.com/dbmy1ukhf/image/upload/q_auto,f_auto/v1758134510/Placeholder_Image.png`;

  //!truncateTextВидалити і додатид о стилів
  // .description {
  // font-size: 16px;
  // color: #6c757d;
  // line-height: 1.5;
  // margin-bottom: 20px;
  // flex-grow: 1;

  //   display: -webkit-box;
  //   -webkit-line-clamp: 3; /* кількість рядків */
  //   -webkit-box-orient: vertical;
  //   overflow: hidden;
  // }
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={title}
          className={styles.image}
          loading="lazy"
        />
        <p className={styles.country}>{category}</p>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{truncateText(article, 100)}</p>

        <div className={styles.metaInfo}>
          <div className={styles.authorInfo}>
            <img
              src={authorAvatarUrl}
              alt={owner?.name || 'Author'}
              className={styles.authorAvatar}
            />
            <div>
              <p className={styles.authorName}>
                {owner?.name || 'Невідомий автор'}
              </p>
              <p className={styles.date}>
                {new Date(date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className={styles.bookmarksInfo}>
            <img
              src={bookmarkIconUrl}
              alt="Кількість закладок"
              className={styles.bookmarkMetaIcon}
            />
            <span>{storyInfo.bookmarksCount || 0}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <AppButton href={`/stories/${_id}`} variant="grey">
            Переглянути статтю
          </AppButton>

          {isOwner ? (
            <AppButton
              href={`/edit-story/${_id}`}
              aria-label="Редагувати історію"
              className={styles.iconButton}
            >
              <img src={editIconUrl} alt="" className={styles.actionIcon} />
            </AppButton>
          ) : (
            <AppButton
              onClick={() => console.log('Bookmark clicked!')}
              aria-label="Додати в збережені"
              className={styles.iconButton}
            >
              <img src={bookmarkIconUrl} alt="" className={styles.actionIcon} />
            </AppButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
