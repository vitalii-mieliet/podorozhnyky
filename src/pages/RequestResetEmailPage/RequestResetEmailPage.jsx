import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { requestResetEmailSchema } from '../../validation/authFormsValidation';
import { sendResetEmail } from '../../redux/auth/operations';
import Container from '../../components/common/Container/Container';
import Section from '../../components/common/Section/Section';
import css from './RequestResetEmailPage.module.css';
import { tickCooldown } from '../../redux/auth/slice';
import { selectAuthState } from '../../redux/auth/selectors';
import { ErrorMessage, Field, Form, Formik } from 'formik';

const RequestResetEmailPage = () => {
  const dispatch = useDispatch();
  const { emailSent, cooldown, error } = useSelector(selectAuthState);

  useEffect(() => {
    if (cooldown > 0) {
      const interval = setInterval(() => {
        dispatch(tickCooldown());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dispatch, cooldown]);

  return (
    <Section className={css.section}>
      <Container>
        <h1 className={css.title}>Скид пароля</h1>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={requestResetEmailSchema}
          onSubmit={(values) => {
            dispatch(sendResetEmail(values.email));
          }}
        >
          {({ isSubmitting }) => (
            <Form className={css.form}>
              <div className={css.fieldWrapper}>
                <Field
                  type="email"
                  name="email"
                  placeholder="Введіть email"
                  className={css.input}
                  disabled={cooldown > 0}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </div>

              <button
                type="submit"
                className={css.button}
                disabled={cooldown > 0 || isSubmitting}
              >
                {cooldown > 0
                  ? `Відправити повторно через ${cooldown}с`
                  : 'Відправити повторно'}
              </button>
            </Form>
          )}
        </Formik>

        {emailSent && (
          <p className={css.success}>📩 Письмо отправлено. Проверьте почту.</p>
        )}
        {error && <p className={css.error}>{error}</p>}
      </Container>
    </Section>
  );
};

export default RequestResetEmailPage;
