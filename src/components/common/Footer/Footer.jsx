import { useSelector } from 'react-redux';
import styles from './Footer.module.css';
import Logo from '../Logo/Logo';
import Socials from '../Socials/Socials';
import Navigation from '../Navigation/Navigation';

const Footer = () => {
  const navLinks = [
    { to: '/', label: 'Головна' },
    { to: '/stories', label: 'Історії' },
    { to: '/travelers', label: 'Мандрівники' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <Logo />
        <Socials />
        <Navigation navLinks={navLinks} />
      </div>
      <div className={styles.copy}>
        <p>© 2025 Подорожники. Усі права захищені.</p>
      </div>
    </footer>
  );
};

export default Footer;
