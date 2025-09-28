import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCreatedStories,
  selectStoriesError,
} from '../../redux/user/selectors';
import MessageNoStories from '../../components/common/MessageNoStories/MessageNoStories';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import { fetchCreatedStories } from '../../redux/user/operations';

const CreatedStories = () => {
  const dispatch = useDispatch();
  const { data: stories, ...meta } = useSelector(selectCreatedStories);

  const error = useSelector(selectStoriesError);

  const noStoriesText = 'Ви ще не створювали жодної історії';

  useEffect(() => {
    if (!stories.length) {
      dispatch(fetchCreatedStories());
    }
  }, [dispatch, stories.length]);

  if (error) return <AppMessage title={'Виникла помилка'} message={error} />;

  return (
    <>
      {meta.totalItems ? (
        <TravellersStories stories={stories} />
      ) : (
        <MessageNoStories
          text={noStoriesText}
          buttonText="Назад до історій"
          route="/stories"
        />
      )}
    </>
  );
};

export default CreatedStories;
