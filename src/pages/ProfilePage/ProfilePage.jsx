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

// import React, { useState, useEffect } from 'react';
// import TravellerInfo from '../../components/common/TravellerInfo/TravellerInfo';
// import TravellersStories from '../../components/common/TravellersStories/TravellersStories';

// const API_BASE = 'https://plantains-app.onrender.com/api';

// const ProfilePage = () => {
//   const [activeTab, setActiveTab] = useState('saved');
//   const [stories, setStories] = useState([]);
//   const [user, setUser] = useState(null);
//   const [originalEmail, setOriginalEmail] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem('token');

//   // Fetch user info
//   useEffect(() => {
//     if (!token) {
//       console.warn('No auth token');
//       return;
//     }

//     fetch(`${API_BASE}/users/info`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         setUser(data);
//         setOriginalEmail(data.email);
//       })
//       .catch((err) => console.error('Failed to fetch user', err));
//   }, [token]);

//   // Fetch stories
//   useEffect(() => {
//     if (!user || !token) return;

//     const endpoint =
//       activeTab === 'saved'
//         ? `${API_BASE}/users/save-story`
//         : `${API_BASE}/users/created-stories`;

//     setLoading(true);

//     fetch(endpoint, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setStories(data);
//         } else {
//           console.error('Expected array, got:', data);
//           setStories([]);
//         }
//       })
//       .catch((err) => {
//         console.error('Failed to fetch stories', err);
//         setStories([]); // prevent crash
//       })
//       .finally(() => setLoading(false));
//   }, [activeTab, user, token]);

//   const handleEmailChange = (e) => {
//     setUser((prev) => ({ ...prev, email: e.target.value }));
//   };

//   const handleSaveProfile = async () => {
//     if (!user || !token) return;
//     setSuccessMessage('');

//     try {
//       const res = await fetch(`${API_BASE}/users/info`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(user),
//       });

//       if (!res.ok) throw new Error('Profile update failed');

//       setSuccessMessage('Профіль оновлено успішно');

//       if (user.email !== originalEmail) {
//         await fetch(`${API_BASE}/auth/request-reset-password`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ email: user.email }),
//         });

//         setSuccessMessage(
//           (prev) => prev + '. Лист для підтвердження email надіслано.'
//         );
//         setOriginalEmail(user.email);
//       }
//     } catch (err) {
//       console.error(err);
//       setSuccessMessage('Помилка при оновленні профілю');
//     }
//   };

//   if (!user) return <div>Завантаження профілю...</div>;

//   return (
//     <div className="profile-page">
//       <h1>Мій профіль</h1>

//       {/* Traveller Info */}
//       <TravellerInfo user={user} />

//       {/* Email редагування */}
//       <div style={{ marginTop: '1rem' }}>
//         <label>
//           Email:
//           <input
//             type="email"
//             value={user.email}
//             onChange={handleEmailChange}
//             style={{ marginLeft: '1rem' }}
//           />
//         </label>
//         <button onClick={handleSaveProfile} style={{ marginLeft: '1rem' }}>
//           Зберегти
//         </button>
//       </div>

//       {successMessage && (
//         <div style={{ marginTop: '1rem', color: 'green' }}>
//           {successMessage}
//         </div>
//       )}

//       {/* Tabs */}
//       <div className="tabs" style={{ marginTop: '2rem' }}>
//         <button
//           onClick={() => setActiveTab('saved')}
//           style={{
//             fontWeight: activeTab === 'saved' ? 'bold' : 'normal',
//             marginRight: '1rem',
//           }}
//         >
//           Збережені історії
//         </button>
//         <button
//           onClick={() => setActiveTab('my')}
//           style={{ fontWeight: activeTab === 'my' ? 'bold' : 'normal' }}
//         >
//           Мої історії
//         </button>
//       </div>

//       {/* Stories */}
//       <div style={{ marginTop: '1rem' }}>
//         {loading ? (
//           <div>Завантаження історій...</div>
//         ) : (
//           <TravellersStories stories={stories} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
