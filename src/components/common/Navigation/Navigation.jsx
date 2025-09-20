/**
 * Navigation – компонент для відображення меню сайту.
 *
 * Використовує `react-router-dom/NavLink`, щоб підсвічувати активний маршрут.
 *
 * @component
 * @example
 * // Приклад використання:
 * const navLinks = [
 *   { to: '/', label: 'Головна' },
 *   { to: '/stories', label: 'Історії' },
 *   { to: '/travelers', label: 'Мандрівники' },
 * ];
 *
 * return <Navigation navLinks={navLinks} />;
 *
 * @param {Object[]} navLinks Масив об’єктів із даними для пунктів меню.
 * @param {string} navLinks[].to Шлях (роут), куди веде посилання.
 * @param {string} navLinks[].label Текст, який відображається у меню.
 *
 * @returns {JSX.Element} Список `<ul>` із навігаційними пунктами.
 */

import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = ({ navLinks }) => {
  return (
    <nav>
      <ul className={styles.nav}>
        {navLinks.map(({ to, label }) => (
          <li className={styles.navItem} key={label}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Navigation;
