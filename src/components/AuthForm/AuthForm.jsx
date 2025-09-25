import css from './AuthForm.module.css';
import { Formik, Form, useField } from 'formik';
import AppTextInput from '../ui/formInputs/AppTextInput/AppTextInput.jsx';
import AppButton from '../ui/AppButton/AppButton.jsx';
import { useBreakpoint } from '../../../hooks/useBreakpoint.js';
import { useNavigate } from 'react-router-dom';

const FormikTextInput = ({ id, name, type = 'text', placeholder }) => {
  const [field, meta] = useField(name);

  return (
    <AppTextInput
      id={id || name}
      {...field}
      type={type}
      placeholder={placeholder}
      error={meta.touched && !!meta.error}
      errorMessage={meta.touched ? meta.error : ''}
      aria-invalid={meta.touched && !!meta.error}
    />
  );
};

const FormFields = ({
  fields = [],
  submitText,
  initialValues,
  validationSchema,
  onSubmitAction,
}) => {
  const navigate = useNavigate();
  // заглушка. формик вызывает фцию при сабмит
  const handleSubmit = async (values, actions) => {
    try {
      // запит до апи?
      // після чого редирект на голову /
      navigate('/');
    } catch (err) {
      console.error('Error:', err);
    } finally {
      // одблок кнопки
      actions.setSubmitting(false);
    }
  };

  const { isMobile } = useBreakpoint();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.fieldsWrapper}>
            {fields.map(({ name, type, placeholder, label, required }) => (
              <div key={name} className={css.fieldGroup}>
                <label
                  htmlFor={name}
                  className={`${css.label} ${
                    required ? css.labelRequired : ''
                  }`}
                >
                  {label}
                  {required ? '*' : ''}
                </label>

                <FormikTextInput
                  id={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                />
              </div>
            ))}
            <AppButton
              size={isMobile ? 'sm' : 'md'}
              fullWidth
              variant="blue"
              type="submit"
              disabled={isSubmitting}
            >
              {submitText}
            </AppButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormFields;
