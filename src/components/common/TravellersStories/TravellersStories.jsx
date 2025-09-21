import StoryCard from '../StoryCard/StoryCard';
import styles from './TravellersStories.module.css';

const TravellersStories = ({ stories }) => {
  // перевірка на випадок, якщо дані порожні
  if (!stories || stories.length === 0) {
    return <p>Наразі немає доступних історій.</p>;
  }

  return (
    <ul className={styles.storiesGrid}>
      {stories.map((story) => (
        <StoryCard
          key={story._id}
          storyInfo={story}
          isOwner={false} // тут буде логіка визначення власника
        />
      ))}
    </ul>
  );
};

export default TravellersStories;