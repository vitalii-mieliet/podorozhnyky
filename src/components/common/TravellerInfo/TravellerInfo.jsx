import React, { useEffect, useState } from 'react';
import styles from './TravellerInfo.module.css';

const TravellerInfo = ({ travellerId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!travellerId) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(
          `https://plantains-app.onrender.com/api/users/${travellerId}`
        );
        const data = await res.json();

        if (res.ok && data.data) {
          setUser(data.data);
        } else {
          console.error('Failed to fetch traveller:', data.message);
        }
      } catch (err) {
        console.error('Network error fetching traveller:', err);
      }
    };

    fetchUser();
  }, [travellerId]);

  if (!user) return <div>Завантаження мандрівника...</div>;

  return (
    <div className={styles.travellerInfo}>
      <img
        className={styles.avatar}
        src={user.avatar || user.photoUrl || '/default-avatar.png'}
        alt={user.name}
      />

      <div className={styles.info}>
        <h2 className={styles.name}>{user.name}</h2>
        {user.bio && <p className={styles.bio}>{user.bio}</p>}
      </div>
    </div>
  );
};

export default TravellerInfo;

// import React from 'react';
// import styles from './TravellerInfo.module.css';

// const TravellerInfo = ({ user }) => {
//   return (
//     <div className={styles.travellerInfo}>
//       <img className={styles.avatar} src={user.avatar || user.photoUrl} />

//       <div className={styles.info}>
//         <h2 className={styles.name}>{user.name}</h2>
//         {user.bio && <p className={styles.bio}>{user.bio}</p>}
//       </div>
//     </div>
//   );
// };

// export default TravellerInfo;
