import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoryById } from '../../redux/stories/operations';
import StoryDetails from '../../components/StoryDetails/StoryDetails';
import Container from '../../components/common/Container/Container';
import Loader from '../../components/common/Loader/Loader';

const StoryPage = () => {
  const { storyId } = useParams();
  const dispatch = useDispatch();
   
  const { currentStory, isLoading, error } = useSelector((state) => state.stories);

  useEffect(() => {
    if (storyId) { 
      dispatch(fetchStoryById(storyId));
    }
  }, [dispatch, storyId]);

  return (
    <Container>
      {isLoading && <Loader />}
      {error && <p>Помилка: {error}</p>} 
      {!isLoading && currentStory && <StoryDetails storyData={currentStory} />}
    </Container>
  );
};

export default StoryPage;