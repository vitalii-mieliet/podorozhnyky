import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import BurgerMenu from '../../../assets/icons/menu.svg?react';
import BurgerClose from '../../../assets/icons/close.svg?react';

import Container from '../Container/Container';
import s from './Header.module.css';
import AppButton from '../../ui/AppButton/AppButton';
import Navigation from '../Navigation/Navigation';

import Logo from '../Header/Logo.svg?react';
import AuthButtons from '../../AuthButtons/AuthButtons';

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
        <div className={s.linksWrap}>
          {!isMobile && (
            <div className={s.linksWrap}>
              <Navigation className={s.nav} navLinks={navLinks} />
              <AuthButtons isMobile={isMobile} isHome={isHome} />
            </div>
          )}
        </div>

        {isMobile && (
          <AppButton
            className={s.menuButton}
            variant={isHome ? 'init' : 'grey'}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <BurgerClose /> : <BurgerMenu />}
          </AppButton>
        )}
      </header>

      {/* Mobile */}
      {isMobile && isMenuOpen && (
        <div className={clsx(s.overlay, isMenuOpen && s.isOpen)}>
          <div className={s.linksWrap}>
            <Navigation className={s.nav} navLinks={navLinks} />
            <AuthButtons />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Header;
