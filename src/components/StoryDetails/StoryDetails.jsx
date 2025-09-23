import AppButton from '../../components/ui/AppButton/AppButton';
import styles from './StoryDetails.module.css';
import Section from '../common/Section/Section';
import BookmarkIcon from '../../assets/icons/bookmark.svg?react';

const StoryDetails = ({ storyData }) => {
  if (!storyData) {
    return null;
  }
 
  const { img, category, title, article, owner, date } = storyData;
 
  const authorAvatarUrl = owner?.avatar ? owner.avatar : '/images/placeholder.png'; 
  const authorName = owner?.name || 'Невідомий автор';

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <p className={styles.category}>{category}</p>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.meta}>
          <div className={styles.authorInfo}>
           
            <img src={authorAvatarUrl} alt={authorName} className={styles.authorAvatar} />
            <div>
              <p className={styles.authorLabel}>Автор статті</p>
            
              <p className={styles.authorName}>{authorName}</p>
            </div>
          </div>
          <div className={styles.dateInfo}>
             <p className={styles.dateLabel}>Опубліковано</p>
             <p className={styles.date}>{new Date(date).toLocaleDateString()}</p>
          </div>
        </div>
      </header>

      <img src={img} alt={title} className={styles.mainImage} />

      <div
        className={styles.articleBody}
        dangerouslySetInnerHTML={{ __html: article }}
      />

      <Section className={styles.saveSection} aria-labelledby="зберегти-історію-заголовок">
        <div className={styles.saveIconWrapper} aria-hidden="true">
            <BookmarkIcon className={styles.saveIcon} />
        </div>
        <h3 id="зберегти-історію-заголовок" className={styles.saveTitle}>Збережіть собі історію</h3>
        <p className={styles.saveText}>
          Вона буде доступна у Вашому профілі у розділі "Збережене".
        </p>
        <AppButton onClick={() => console.log('Save story clicked!')}>
          Зберегти
        </AppButton>
      </Section>
    </article>
  );
};

export default StoryDetails;