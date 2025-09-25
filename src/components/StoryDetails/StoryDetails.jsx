 
import AppButton from '../../components/ui/AppButton/AppButton';
import styles from './StoryDetails.module.css';
 
const StoryDetails = ({ storyData }) => {
  if (!storyData) {
    return null;
  }
 
  const { img, category, title, article, owner, date } = storyData;
 
  const authorAvatarUrl = owner?.avatar ? owner.avatar : '/images/placeholder.png'; 
  const authorName = owner?.name || 'Невідомий автор';
  const formattedDate = new Date(date).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).replace(' р.', '');


  return (
    <article className={styles.container}>
      
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.meta}>
          <div className={styles.metaLeft}>
            <div className={styles.metaItem}>
              <p className={styles.metaLabel}>Автор статті</p>
              <p className={styles.metaValue}>{authorName}</p>
            </div>
            <div className={styles.metaItem}>
              <p className={styles.metaLabel}>Опубліковано</p>
              <p className={styles.metaValue}>{formattedDate}</p>
            </div>
          </div>
          <div className={styles.metaRight}>
            <p className={styles.category}>{category}</p>
          </div>
        </div>
      </header>

      <img src={img} alt={title} className={styles.mainImage} />
 
      <div className={styles.mainContent}>
        <div
          className={styles.articleBody}
          dangerouslySetInnerHTML={{ __html: article }}
        />

        <div as="aside" className={styles.saveSection} aria-labelledby="зберегти-історію-заголовок">
           
          <h3 id="зберегти-історію-заголовок" className={styles.saveTitle}>Збережіть собі історію</h3>
          <p className={styles.saveText}>
            Вона буде доступна у Вашому профілі у розділі "Збережене".
          </p>
          <AppButton className={styles.saveButton} onClick={() => console.log('Save story clicked!')}>
            Зберегти
          </AppButton>
        </div>
      </div>
    </article>
  );
};

export default StoryDetails;