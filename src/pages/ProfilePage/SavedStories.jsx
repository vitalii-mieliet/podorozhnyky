import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSavedStories,
  selectStoriesError,
  selectStoriesLoading,
  selectUserProfile,
} from '../../redux/user/selectors';
import { fetchSavedStories } from '../../redux/user/operations';
import MessageNoStories from '../../components/common/MessageNoStories/MessageNoStories';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import AppMessage from '../../components/common/AppMessage/AppMessage';
import Loader from '../../components/common/Loader/Loader';

const SavedStories = () => {
  const dispatch = useDispatch();
  const { data: stories, ...meta } = useSelector(selectSavedStories);
  const isLoading = useSelector(selectStoriesLoading);
  const error = useSelector(selectStoriesError);
  const user = useSelector(selectUserProfile);

  const noStoriesText = 'У вас ще немає збережених історій';

  useEffect(() => {
    if (user?._id && !stories.length && meta.page === 1) {
      dispatch(fetchSavedStories());
    }
  }, [dispatch, user?._id, stories.length, meta.page]);

  if (isLoading) return <Loader />;
  if (error) return <AppMessage title={'Виникла помилка'} message={error} />;
  if (meta.totalItems > 0) {
    return <TravellersStories stories={stories} />;
  }

  return (
    <MessageNoStories
      text={noStoriesText}
      buttonText="Назад до історій"
      route="/stories"
    />
  );
};

export default SavedStories;
