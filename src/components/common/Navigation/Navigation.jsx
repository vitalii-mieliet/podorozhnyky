import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = ({ isLoggedIn }) => {
  const navLinks = isLoggedIn
    ? [
        { to: '/', label: 'Головна' },
        { to: '/stories', label: 'Історії' },
        { to: '/travelers', label: 'Мандрівники' },
        { to: '/profile', label: 'Мій профіль' },
      ]
    : [
        { to: '/auth/register', label: 'Головна' },
        { to: '/auth/register', label: 'Історії' },
        { to: '/auth/register', label: 'Мандрівники' },
        { to: '/auth/register', label: 'Мій профіль' },
      ];

  return (
    <ul className={styles.nav}>
      {navLinks.map(({ to, label }) => (
        <li key={label}>
          <NavLink to={to} className={styles.navLink}>
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
export default Navigation;
