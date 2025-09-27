import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TravellerInfo from '../../components/common/TravellerInfo/TravellerInfo';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import AppTabs from '../../components/ui/AppTabs/AppTabs';
import MessageNoStories from '../../components/common/MessageNoStories/MessageNoStories';
import Loader from '../../components/common/Loader/Loader';

import Section from '../../components/common/Section/Section';
import Container from '../../components/common/Container/Container';

import styles from './ProfilePage.module.css';

import {
  fetchSavedStories,
  fetchCreatedStories,
  fetchCurrentUser,
} from '../../redux/user/operations';

import {
  selectUserProfile,
  selectUserError,
  selectSavedStories,
  selectCreatedStories,
  selectStoriesLoading,
  selectStoriesError,
  selectIsUserLoading,
} from '../../redux/user/selectors';

const ProfilePage = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUserProfile);
  const isUserLoading = useSelector(selectIsUserLoading);
  const userError = useSelector(selectUserError);

  const savedStories = useSelector(selectSavedStories);
  const createdStories = useSelector(selectCreatedStories);
  const isStoriesLoading = useSelector(selectStoriesLoading);
  const storiesError = useSelector(selectStoriesError);

  const [activeTab, setActiveTab] = useState('saved');

  // Fetch user info
  useEffect(() => {
    dispatch(fetchCurrentUser());
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
    return <Loader />;
  }

  if (userError || !user) {
    return <div>⚠️ Помилка завантаження профілю</div>;
  }

  const currentStories = activeTab === 'saved' ? savedStories : createdStories;
  const hasStories = currentStories && currentStories.length > 0;

  const noStoriesText =
    activeTab === 'saved'
      ? 'У вас ще немає збережених історій'
      : 'Ви ще не створювали жодної історії';

  return (
    <>
      <Section className={styles.travellerSection}>
        <Container className={styles.travellerContainer}>
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
            {isStoriesLoading && <Loader />}

            {!isStoriesLoading && hasStories && (
              <TravellersStories stories={currentStories} />
            )}

            {!isStoriesLoading && !hasStories && (
              <MessageNoStories
                text={noStoriesText}
                buttonText="Назад до історій"
                route="/stories"
              />
            )}

            {!isStoriesLoading && storiesError && (
              <div className={styles.error}>{storiesError}</div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default ProfilePage;
