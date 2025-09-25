import css from './LoginForm.module.css';
import AuthForm from '../AuthForm/AuthForm.jsx';
import { loginValidation } from '../../validation.js';
import { loginFormFields } from '../../constants/formFields.js';

// тостер лоадер

const LoginForm = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Вхід</h1>
      <p className={css.text}>Вітаємо знову у спільноті мандрівників!</p>

      <AuthForm
        fields={loginFormFields}
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidation}
        submitText="Увійти"
      />
    </div>
  );
};

export default LoginForm;
