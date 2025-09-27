import StoryCard from '../StoryCard/StoryCard';
import styles from './TravellersStories.module.css';

const TravellersStories = ({ stories }) => {
  if (!Array.isArray(stories) || stories.length === 0) {
    return <p>Наразі немає доступних історій.</p>;
  }
  return (
    <ul className={styles.storiesGrid}>
      {stories.map((story) => (
        <li key={story._id}>
          <StoryCard storyInfo={story} />
        </li>
      ))}
    </ul>
  );
};

export default TravellersStories;
