import StoryCard from '../StoryCard/StoryCard';
import styles from './TravellersStories.module.css';
import StoryCardSkeleton from '../Skeletons/StoryCardSkeleton/StoryCardSkeleton';

const TravellersStories = ({ stories, isLoading = false, perPage = 0 }) => {
  if (!Array.isArray(stories) || stories.length === 0) {
    return <p>Наразі немає доступних історій.</p>;
  }
  console.log(
    'TravellersStories: isLoading=',
    isLoading,
    'stories=',
    stories.length,
    'perPage=',
    perPage
  );

  return (
    <ul className={styles.storiesGrid}>
      {stories.map((story) => (
        <StoryCard key={story._id} storyInfo={story} isOwner={false} />
      ))}
      {isLoading &&
        Array.from({ length: perPage }).map((_, idx) => (
          <li key={`sk-${idx}`} className={styles.storyItem}>
            <StoryCardSkeleton />
          </li>
        ))}
    </ul>
  );
};

export default TravellersStories;
