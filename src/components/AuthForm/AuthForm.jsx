import css from './AuthForm.module.css';
import { Formik, Form, useField } from 'formik';
import AppTextInput from '../ui/formInputs/AppTextInput/AppTextInput.jsx';
import AppButton from '../ui/AppButton/AppButton.jsx';
import { useBreakpoint } from '../../../hooks/useBreakpoint.js';

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
  const { isMobile } = useBreakpoint();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitAction}
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
              fullWidth={isMobile}
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
