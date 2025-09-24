import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TravellerInfo from '../../components/common/TravellerInfo/TravellerInfo';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import AppTabs from '../../components/ui/AppTabs/AppTabs';
import MessageNoStories from '../../components/common/MessageNoStories/MessageNoStories';

import styles from './ProfilePage.module.css';

import {
  fetchUserInfo,
  fetchSavedStories,
  fetchCreatedStories,
} from '../../redux/user/operations';

import {
  selectUserProfile,
  selectUserError,
  selectUserLoading,
  selectSavedStories,
  selectCreatedStories,
  selectStoriesLoading,
  selectStoriesError,
} from '../../redux/user/selectors';

const ProfilePage = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUserProfile);
  const isUserLoading = useSelector(selectUserLoading);
  const userError = useSelector(selectUserError);

  const savedStories = useSelector(selectSavedStories);
  const createdStories = useSelector(selectCreatedStories);
  const isStoriesLoading = useSelector(selectStoriesLoading);
  const storiesError = useSelector(selectStoriesError);

  const [activeTab, setActiveTab] = useState('saved');

  // Fetch user info on mount
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  // Fetch stories depending on active tab
  useEffect(() => {
    if (!user?._id) return;

    if (activeTab === 'saved') {
      dispatch(fetchSavedStories());
    } else {
      dispatch(fetchCreatedStories());
    }
  }, [dispatch, activeTab, user]);

  if (isUserLoading) {
    return <div>Завантаження профілю...</div>;
  }

  if (userError || !user) {
    return <div>⚠️ Помилка завантаження профілю</div>;
  }

  const currentStories = activeTab === 'saved' ? savedStories : createdStories;

  const hasStories = currentStories && currentStories.length > 0;

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

        {!isStoriesLoading && hasStories && (
          <TravellersStories stories={currentStories} />
        )}

        {!isStoriesLoading && !hasStories && storiesError && (
          <MessageNoStories
            text="Цей користувач ще не публікував історій"
            buttonText="Назад до історій"
            route="/stories"
          />
        )}
      </div>
    </>
  );
};

export default ProfilePage;
