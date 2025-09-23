import StoryCard from '../StoryCard/StoryCard';
import styles from './TravellersStories.module.css';

const TravellersStories = ({ stories }) => {
   
  if (!Array.isArray(stories) || stories.length === 0) {
    return <p>Наразі немає доступних історій.</p>;
  }

  return (
    <ul className={styles.storiesGrid}>
      {stories.map((story) => (
        <StoryCard
          key={story._id}
          storyInfo={story}
          isOwner={false}  
        />
      ))}
    </ul>
  );
};

export default TravellersStories;