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
 * return <Navigation navLinks={navLinks} linkClassName="custom-link" />;
 *
 * @param {Object[]} navLinks Масив об’єктів із даними для пунктів меню.
 * @param {string} navLinks[].to Шлях (роут), куди веде посилання.
 * @param {string} navLinks[].label Текст, який відображається у меню.
 * @param {string} [linkClassName] Додатковий CSS-клас для посилань навігації.
 *
 * @returns {JSX.Element} Список `<ul>` із навігаційними пунктами.
 */

import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import clsx from 'clsx';

const Navigation = ({ navLinks, linkClassName }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navLinks.map(({ to, label, linkClassName }) => (
          <li className={styles.navItem} key={label}>
            <NavLink to={to} className={clsx(styles.navLink, linkClassName)}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Navigation;
