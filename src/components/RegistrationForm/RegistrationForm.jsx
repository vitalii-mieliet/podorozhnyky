import css from './RegistrationForm.module.css';
import AuthForm from '../AuthForm/AuthForm.jsx';
import { registerValidation } from '../../validation.js';
import { registerFormFields } from '../../constants/formFields.js';
// тостер лоадер

const RegistrationForm = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Реєстрація</h1>
      <p className={css.text}>Раді вас бачити у спільноті мандрівників!</p>

      <AuthForm
        fields={registerFormFields}
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={registerValidation}
        submitText="Зареєструватись"
      />
    </div>
  );
};
export default RegistrationForm;
