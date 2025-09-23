import React from 'react';
import PropTypes from 'prop-types';
import Section from '../Section/Section';
import Container from '../Container/Container';
import styles from './TravellerInfo.module.css';

import placeholderAvatar from '../../../assets/images/TravellerInfo-img/Travellerplaceholder.webp';

/**
 * Компонент TravellerInfo — відображає інформацію про мандрівника.
 *
 * @param {Object} props
 * @param {Object} props.user - Об'єкт мандрівника
 * @param {string} props.user.name - Ім'я мандрівника (обов'язкове)
 * @param {string} [props.user.avatar] - URL аватара
 * @param {string} [props.user.photoUrl] - Альтернативний URL аватара
 * @param {string} [props.user.bio] - Біографія мандрівника
 *
 */
const TravellerInfo = ({ user }) => {
  if (!user) return null;

  const avatarSrc = user.avatar || user.photoUrl || placeholderAvatar;
  const altText = user.name || 'Traveller avatar';

  return (
    <Section className={styles.travellerSection}>
      <Container className={styles.travellerContainer}>
        <div className={styles.travellerInfo}>
          <img className={styles.avatar} src={avatarSrc} alt={altText} />

          <div className={styles.info}>
            <h1 className={styles.name}>{user.name}</h1>
            {user.bio && <p className={styles.bio}>{user.bio}</p>}
          </div>
        </div>
      </Container>
    </Section>
  );
};

TravellerInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    photoUrl: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
};

export default TravellerInfo;
