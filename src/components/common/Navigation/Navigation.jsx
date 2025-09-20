import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = ({ navLinks }) => {
  return (
    <ul className={styles.nav}>
      {navLinks.map(({ to, label }) => (
        <li className={styles.navItem} key={label}>
          <NavLink to={to} className={styles.navLink}>
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
export default Navigation;
