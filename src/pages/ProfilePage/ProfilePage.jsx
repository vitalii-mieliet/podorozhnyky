import React, { useState, useEffect } from 'react';
import TravellerInfo from '../../components/common/TravellerInfo/TravellerInfo';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import styles from './ProfilePage.module.css';
import Container from '../../components/common/Container/Container';
import Section from '../../components/common/Section/Section';
import AppTabs from '../../components/ui/AppTabs/AppTabs';

const API_BASE = 'https://plantains-app.onrender.com/api';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const [stories, setStories] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  // Fetch authenticated user info
  useEffect(() => {
    if (!token) {
      console.warn('No auth token');
      return;
    }

    fetch(`${API_BASE}/users/info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.data) {
          setUser(data.data);
        } else {
          console.error('User data missing from response:', data);
        }
      })
      .catch((err) => console.error('Failed to fetch user', err));
  }, [token]);

  // Fetch stories based on user and activeTab
  useEffect(() => {
    if (!user || !token) return;

    const endpoint =
      activeTab === 'saved'
        ? `${API_BASE}/users/save-story`
        : `${API_BASE}/users/created-stories`;

    setLoading(true);

    fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const storiesArray = Array.isArray(data.data) ? data.data : [];
        setStories(storiesArray);
      })
      .catch((err) => {
        console.error('Failed to fetch stories', err);
        setStories([]);
      })
      .finally(() => setLoading(false));
  }, [activeTab, user, token]);

  // Render loading state if user data not loaded yet
  if (!user) {
    return <div>Завантаження профілю...</div>;
  }

  return (
    <Container>
      <Section>
        <div className={styles.profilePage}>
          {/* Traveller Info with real user ID */}
          <TravellerInfo travellerId={user._id} />

          {/* Tabs */}
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

          {/* Stories */}
          <div className={styles.storiesSection}>
            {loading ? (
              <div className={styles.loading}>Завантаження історій...</div>
            ) : (
              <TravellersStories stories={stories} />
            )}
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default ProfilePage;
