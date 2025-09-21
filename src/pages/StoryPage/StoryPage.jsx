import { useParams } from 'react-router-dom';
import StoryDetails from '../../components/StoryDetails/StoryDetails';

const StoryPage = () => {
  //  дістаємо динамічні параметри з storyId
  const { storyId } = useParams();

  return (
    <main>
      {/* передаємо отриманий storyId як пропс */}
      <StoryDetails storyId={storyId} />
    </main>
  );
};

export default StoryPage;