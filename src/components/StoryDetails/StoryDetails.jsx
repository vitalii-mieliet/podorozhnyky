import AppButton from '../../components/ui/AppButton/AppButton';
import styles from './StoryDetails.module.css';
import bookmarkIconUrl from '../../assets/icons/bookmark.svg';
import Section from '../common/Section/Section';  

const StoryDetails = ({ storyData }) => {
  //   якщо дані ще не прийшли
  if (!storyData) {
    return null;
  }

  const { img, category, title, article, owner, date } = storyData;

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <p className={styles.category}>{category}</p>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.meta}>
          <div className={styles.authorInfo}>
            <img src={owner.avatar} alt={owner.name} className={styles.authorAvatar} />
            <div>
              <p className={styles.authorLabel}>Автор статті</p>
              <p className={styles.authorName}>{owner.name}</p>
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
            <img src={bookmarkIconUrl} alt="" className={styles.saveIcon} />
        </div>
        <h3 id="зберегти-історію-заголовок" className={styles.saveTitle}>Збережіть собі історію</h3>
        <p className={styles.saveText}>
          Вона буде доступна у вашому профілі у розділі "Збережене".
        </p>
        <AppButton onClick={() => console.log('Save story clicked!')}>
          Зберегти
        </AppButton>
      </Section>
    </article>
  );
};

export default StoryDetails;