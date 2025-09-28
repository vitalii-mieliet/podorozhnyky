import { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  onboardingSchema,
  MAX_BIO,
} from '../../validation/onboardingValidation';

import styles from './OnboardingForm.module.css';
import AppButton from '../ui/AppButton/AppButton';
import AppTextArea from '../ui/formInputs/AppTextArea/AppTextArea';
import placeholder from '../../assets/images/placeholder/Placeholder.webp';
import { useDispatch } from 'react-redux';
import { onboardingUser } from '../../redux/user/operations';

export default function OnboardingForm() {
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const initialValues = { bio: '', avatar: null };

  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  const removePhoto = (setFieldValue) => {
    setFieldValue('avatarFile', null);
    if (fileRef.current) fileRef.current.value = '';
    if (preview) URL.revokeObjectURL(preview);
    setPreview('');
  };

  const onPick = (e, setFieldValue) => {
    const file = e.currentTarget.files?.[0];
    setFieldValue('avatarFile', file || null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : '');
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      dispatch(onboardingUser(values));
      resetForm();
      setPreview(null);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={onboardingSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isValid, dirty }) => (
        <Form className={styles.form}>
          {/* Аватар */}
          <div className={styles.row}>
            <label className={styles.label}>Аватар</label>

            <div className={styles.avatarLine}>
              <div className={styles.avatar}>
                <img
                  src={preview || placeholder}
                  alt="Фото"
                  className={styles.avatar}
                />
              </div>

              <div>
                <input
                  ref={fileRef}
                  className={styles.fileInput}
                  type="file"
                  accept="image/*"
                  onChange={(e) => onPick(e, setFieldValue)}
                />

                <AppButton
                  type="button"
                  size="sm"
                  variant="grey"
                  onClick={
                    preview
                      ? () => removePhoto(setFieldValue)
                      : () => fileRef.current.click()
                  }
                >
                  {preview ? 'Видалити фото' : 'Завантажити фото'}
                </AppButton>
              </div>
            </div>
          </div>

          {/* Біо */}
          <div className={styles.row}>
            <label htmlFor="bio" className={styles.label}>
              Короткий опис
            </label>
            <Field
              as={AppTextArea}
              id="bio"
              name="bio"
              className={styles.textArea}
              maxLength={MAX_BIO}
              placeholder="Розкажіть більше про вас"
            />
            <p className={styles.counter}>
              Лишилось символів: {MAX_BIO - values.bio.length}
            </p>
            <ErrorMessage name="bio" component="div" className={styles.error} />
          </div>

          {/* Дії */}
          <div className={styles.buttonBox}>
            <AppButton type="submit" disabled={!dirty || !isValid}>
              Зберегти
            </AppButton>
            <AppButton variant="grey" type="button">
              Пропустити
            </AppButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}
