import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSavedStories,
  selectStoriesError,
} from '../../redux/user/selectors';
import { fetchSavedStories } from '../../redux/user/operations';
import MessageNoStories from '../../components/common/MessageNoStories/MessageNoStories';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import AppMessage from '../../components/common/AppMessage/AppMessage';

const SavedStories = () => {
  const dispatch = useDispatch();
  const { data: stories, ...meta } = useSelector(selectSavedStories);

  const error = useSelector(selectStoriesError);

  const noStoriesText = 'У вас ще немає збережених історій';

  useEffect(() => {
    if (!stories.length) {
      dispatch(fetchSavedStories());
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

export default SavedStories;
