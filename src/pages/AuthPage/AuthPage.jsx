import { Routes, Route, Navigate } from 'react-router-dom';
import AppNavLink from '../../components/ui/AppNavLink/AppNavLink.jsx';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm.jsx';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import css from './AuthPage.module.css';
// лайаут футер хедер

const AuthPage = () => {
  return (
    <div className={css.wrapper}>
      <nav className={css.nav}>
        <AppNavLink
          to="/auth/register"
          label="Реєстрація"
          className={css.tab}
          activeClassName={css.active}
        />
        <AppNavLink
          to="/auth/login"
          label="Вхід"
          className={css.tab}
          activeClassName={css.active}
        />
      </nav>
      <div className={css.content}>
        <Routes>
          <Route path="register" element={<RegistrationForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route index element={<Navigate to="/auth/register" replace />} />
        </Routes>
      </div>
    </div>
  );
};
export default AuthPage;
