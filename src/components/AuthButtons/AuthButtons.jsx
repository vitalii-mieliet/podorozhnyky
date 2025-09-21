import React from 'react';
import AppButton from '../ui/AppButton/AppButton';
import s from './AuthButtons.module.css';

function AuthButtons({ isMenuOpen, isHome }) {
  return (
    <>
      <div className={s.buttonWrap}>
        <AppButton
          className={s.loginButton}
          variant={!isHome || isMenuOpen ? 'grey' : 'init'}
          size="sm"
        >
          Вхід
        </AppButton>

        <AppButton variant="blue">Реєстрація</AppButton>
      </div>
    </>
  );
}

export default AuthButtons;
