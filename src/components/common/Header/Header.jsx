import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import BurgerMenu from '../../../assets/icons/menu.svg?react';
import BurgerClose from '../../../assets/icons/close.svg?react';
import Logo from '../Header/Logo.svg?react';

import Container from '../Container/Container';
import s from './Header.module.css';
import AppButton from '../../ui/AppButton/AppButton';
import Navigation from '../Navigation/Navigation';
import AuthButtons from '../../AuthButtons/AuthButtons';
import { selectIsLoggedIn, selectUser } from '../../../redux/auth/selectors';
import UserBar from '../../ui/UserBar/UserBar';

const Header = () => {
  const navLinks = [
    { to: '/', label: 'Головна' },
    { to: '/stories', label: 'Історії' },
    { to: '/travelers', label: 'Мандрівники' },
  ];

  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  //data from Redux
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  // handler
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1439px)');
    const checkIfMobile = () => setIsMobile(mediaQuery.matches);

    checkIfMobile(); //Listen to when start

    mediaQuery.addEventListener('change', checkIfMobile);

    return () => {
      mediaQuery.removeEventListener('change', checkIfMobile); //remove the listener when dismantling
    };
  }, []);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuOpen]);

  // if authorizided

  const extendedNavLinks = isLoggedIn
    ? [
        ...navLinks,
        { to: '/profile', label: 'Мій Профіль' },
        { to: '/publish', label: 'Опублікувати історію ' },
      ]
    : navLinks;

  // JSX
  return (
    <Container>
      <header className={s.header}>
        <NavLink to="/">
          <Logo
            className={s.logo}
            style={{
              fill:
                isHome && !isMenuOpen
                  ? 'var(--color-white)'
                  : 'var(--color-scheme-1-text)',
            }}
          />
        </NavLink>

        {/* Desktop */}
        <>
          {!isMobile && (
            <div className={s.linksWrap}>
              {isLoggedIn ? (
                <>
                  <Navigation navLinks={extendedNavLinks} />
                  <UserBar isLoggedIn={isLoggedIn} user={user} />
                </>
              ) : (
                <>
                  <Navigation navLinks={extendedNavLinks} />
                  <AuthButtons isHome={isHome} />
                </>
              )}
            </div>
          )}
        </>

        {isMobile && (
          <AppButton
            className={s.menuButton}
            variant={isHome ? 'init' : 'grey'}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
          >
            {isMenuOpen ? <BurgerClose /> : <BurgerMenu />}
          </AppButton>
        )}
      </header>

      {/* Mobile */}
      {isMobile && isMenuOpen && (
        <div
          className={clsx(s.overlay, isMenuOpen && s.isOpen)}
          id="mobile-nav"
        >
          {isLoggedIn ? (
            <>
              <Navigation navLinks={extendedNavLinks} />
              <UserBar isLoggedIn={isLoggedIn} user={user} />
            </>
          ) : (
            <>
              <Navigation navLinks={extendedNavLinks} />
              <AuthButtons isHome={isHome} isMenuOpen={isMenuOpen} />
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default Header;
