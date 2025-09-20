import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../Logo/logo.svg?react';

import Container from '../Container/Container';
import s from './Header.module.css';
import AppButton from '../../ui/AppButton/AppButton';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // JSX
  return (
    <Container>
      <header className={s.header}>
        <NavLink to="/">
          <Logo
            style={{
              fill: isHome
                ? 'var(--color-white)'
                : 'var(--color-scheme-1-text)',
            }}
          />
        </NavLink>
        <nav className={s.nav}>
          <ul>
            <li>
              <Link to="/">Головна</Link>
            </li>
            <li>
              <Link to="/stories">Історії</Link>
            </li>
            <li>
              <Link to="/travellers">Мандрівники</Link>
            </li>
            <li>
              <AppButton
                href="/auth/login"
                variant="grey"
                width="58px"
                height="35px"
              >
                Вхід
              </AppButton>
            </li>
            <li>
              <AppButton
                href="/auth/register"
                variant="dark"
                width="113px"
                height="35px"
              >
                Реєстрація
              </AppButton>
            </li>
          </ul>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
