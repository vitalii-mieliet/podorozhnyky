import sprite from '../../../assets/icons/sprite.svg';
import styles from './Logo.module.css';

const Logo = ({ link }) => {
  return (
    <a href={link} className={styles.logo}>
      <svg width={156} height={40} className={styles.logoIcon}>
        <use href={`${sprite}#logo_text`} />
      </svg>
    </a>
  );
};

export default Logo;
