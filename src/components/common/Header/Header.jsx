import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../Logo/logo.svg?react';
import Container from '../Container/Container';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // JSX
  return (
    <Container>
      <header>
        <NavLink to="/">
          <Logo
            style={{
              fill: isHome
                ? 'var(--color-white)'
                : 'var(--color-scheme-1-text)',
            }}
          />
        </NavLink>
        <nav>
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
              <Link to="/auth/login">Вхід</Link>
            </li>
            <li>
              <Link to="/auth/register">Реєстрація</Link>
            </li>
          </ul>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
