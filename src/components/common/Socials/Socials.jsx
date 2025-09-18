import sprite from '../../../assets/icons/sprite.svg';
import styles from './Socials.module.css';

const socialLinks = [
  { id: 'facebook', href: 'https://www.facebook.com/', label: 'Facebook' },
  { id: 'instagram', href: 'https://www.instagram.com/', label: 'Instagram' },
  { id: 'x', href: 'https://x.com/', label: 'X' },
  { id: 'youtube', href: 'https://www.youtube.com/', label: 'YouTube' },
];

const Socials = () => {
  return (
    <ul className={styles.socials}>
      {socialLinks.map(({ id, href, label }) => (
        <li key={id}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <svg className={styles.socialIcon}>
              <use href={`${sprite}#${id}`} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Socials;
