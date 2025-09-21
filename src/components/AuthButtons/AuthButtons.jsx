import React from 'react';
import AppButton from '../ui/AppButton/AppButton';
import s from './AuthButtons.module.css';

function AuthButtons({ isMenuOpen, isHome }) {
  return (
    <>
      <div className={s.buttonWrap}>
        <AppButton
          href="/auth/login"
          variant={!isHome || isMenuOpen ? 'grey' : 'init'}
          size="sm"
          aria-label="Увійти в акаунт"
        >
          Вхід
        </AppButton>

        <AppButton
          href="/auth/register"
          variant="blue"
          aria-label="Створити акаунт"
        >
          Реєстрація
        </AppButton>
      </div>
    </>
  );
}

export default AuthButtons;
