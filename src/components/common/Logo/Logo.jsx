import sprite from '../../../assets/icons/sprite.svg';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <svg className={styles.logoIcon}>
        <use href={`${sprite}#logo_text`} />
      </svg>
    </div>
  );
};

export default Logo;
