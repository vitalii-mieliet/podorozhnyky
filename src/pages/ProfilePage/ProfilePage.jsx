import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TravellerInfo from '../../components/common/TravellerInfo/TravellerInfo';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import AppTabs from '../../components/ui/AppTabs/AppTabs';

import {
  showErrorToast,
  showSuccessToast,
} from '../../components/common/AppToastContainer/AppToastContainer';

import styles from './ProfilePage.module.css';
import { fetchUserInfo } from '../../redux/user/operations';
import { fetchUserStories } from '../../redux/stories/operations';
import {
  selectUser,
  selectUserError,
  selectUserLoading,
} from '../../redux/user/selectors';
import {
  selectStories,
  selectStoriesError,
  selectStoriesLoading,
} from '../../redux/stories/selectors';

const ProfilePage = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const isUserLoading = useSelector(selectUserLoading);
  const userError = useSelector(selectUserError);

  const stories = useSelector(selectStories);
  const isStoriesLoading = useSelector(selectStoriesLoading);
  const storiesError = useSelector(selectStoriesError);

  const [activeTab, setActiveTab] = useState('saved');

  // Fetch user info once on mount
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  // Fetch stories on tab chang
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserStories(activeTab));
    }
  }, [dispatch, activeTab, user]);

  // Toast notifications for user error
  useEffect(() => {
    if (userError) {
      showErrorToast(`Помилка завантаження профілю: ${userError}`);
    }
  }, [userError]);

  // Toast notifications for stories error
  useEffect(() => {
    if (storiesError) {
      showErrorToast(`Помилка завантаження історій: ${storiesError}`);
    }
  }, [storiesError]);

  // Optional success toast
  useEffect(() => {
    if (user?._id && !userError) {
      showSuccessToast(`Профіль успішно завантажено`);
    }
  }, [user, userError]);

  if (isUserLoading) {
    return <div>Завантаження профілю...</div>;
  }

  if (userError || !user) {
    return <div>⚠️ Помилка завантаження профілю</div>;
  }

  return (
    <>
      <TravellerInfo user={user} />

      <AppTabs
        value={activeTab}
        onChange={setActiveTab}
        options={[
          { label: 'Збережені історії', value: 'saved' },
          { label: 'Мої історії', value: 'my' },
        ]}
        variant="contained"
        className={styles.tabs}
      />

      <div className={styles.storiesSection}>
        {isStoriesLoading && (
          <div className={styles.loading}>Завантаження історій...</div>
        )}
        {!isStoriesLoading && !storiesError && (
          <TravellersStories stories={stories} />
        )}
      </div>
    </>
  );
};

export default ProfilePage;
