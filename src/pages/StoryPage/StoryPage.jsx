// src/pages/StoryPage/StoryPage.jsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoryById } from '../../redux/stories/operations';
// --- ДОБАВЛЕН НЕДОСТАЮЩИЙ ИМПОРТ ---
import { resetCurrentStory } from '../../redux/stories/slice';
import StoryDetails from '../../components/StoryDetails/StoryDetails';
import Container from '../../components/common/Container/Container';
import Loader from '../../components/common/Loader/Loader';
import AppMessage from '../../components/common/AppMessage/AppMessage';

const StoryPage = () => {
  const { storyId } = useParams();
  const dispatch = useDispatch();
  
  const { currentStory, currentStoryStatus, error } = useSelector(
    (state) => state.stories
  );

  useEffect(() => {
    if (storyId) {
      dispatch(fetchStoryById(storyId));
    }

    // Эта функция очистки теперь будет работать
    return () => {
      dispatch(resetCurrentStory());
    };
  }, [dispatch, storyId]);

  const isLoading = currentStoryStatus === 'loading';

  if (isLoading) {
    return (
      <Container aria-busy="true">
        <Loader />
      </Container>
    );
  }

  if (currentStoryStatus === 'failed') {
    return (
      <Container>
        <AppMessage
          title="Виникла помилка"
          message={error}
          buttonText="Повернутись до всіх історій"
          route="/stories"
        />
      </Container>
    );
  }

  return (
    <Container aria-busy={isLoading}>
      {currentStory ? (
        <StoryDetails storyData={currentStory} />
      ) : (
        currentStoryStatus === 'succeeded' && (
          <AppMessage
            title="Історія не знайдена"
            message="На жаль, ми не змогли знайти таку історію. Можливо, її було видалено."
            buttonText="Повернутись до всіх історій"
            route="/stories"
          />
        )
      )}
    </Container>
  );
};

export default StoryPage;