import { useEffect, useMemo, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  onboardingSchema,
  MAX_BIO,
} from '../../validation/onboardingValidation';
import { submitOnboarding } from '../../services/onboardingClient';

export default function OnboardingForm({ styles, onSuccess }) {
  const [preview, setPreview] = useState('');
  const fileRef = useRef(null);

  // чистимо objectURL при демонтажі/зміні
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  return (
    <Formik
      initialValues={{ bio: '', avatarFile: null }}
      validationSchema={onboardingSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          // --- НІЧОГО В ЛОГІЦІ ПРОЄКТУ НЕ ЧІПАЄМО: просто викликаємо заглушку
          const res = await submitOnboarding({
            bio: values.bio.trim(),
            avatarFile: values.avatarFile || null,
          });
          onSuccess?.(res); // дозволяє батьку вирішити: навігувати/диспатчити/тощо
        } catch (e) {
          // TODO: toast помилка
          console.error(e);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => {
        const left = useMemo(
          () => MAX_BIO - (values.bio?.length || 0),
          [values.bio]
        );

        const onPick = (e) => {
          const file = e.currentTarget.files?.[0];
          setFieldValue('avatarFile', file || null);
          if (preview) URL.revokeObjectURL(preview);
          setPreview(file ? URL.createObjectURL(file) : '');
        };

        const removePhoto = () => {
          setFieldValue('avatarFile', null);
          if (fileRef.current) fileRef.current.value = '';
          if (preview) URL.revokeObjectURL(preview);
          setPreview('');
        };

        const onSkip = async () => {
          // Викликаємо ту саму заглушку без даних — готує ґрунт для майбутньої логіки
          const res = await submitOnboarding({ bio: '', avatarFile: null });
          onSuccess?.(res);
        };

        return (
          <Form className={styles.form} encType="multipart/form-data">
            {/* Аватар */}
            <div className={styles.row}>
              <label className={styles.label}>Аватар</label>

              <div className={styles.avatarLine}>
                <div className={styles.avatar}>
                  {preview ? (
                    <img src={preview} alt="avatar preview" />
                  ) : (
                    // Можете покласти свій плейсхолдер у /public/images/
                    <div
                      style={{
                        display: 'grid',
                        placeItems: 'center',
                        width: '100%',
                        height: '100%',
                        color: '#999',
                      }}
                    >
                      🙂
                    </div>
                  )}
                </div>

                <div className={styles.controls}>
                  <input
                    ref={fileRef}
                    className={styles.fileInput}
                    type="file"
                    accept="image/*"
                    onChange={onPick}
                  />
                  {preview && (
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={removePhoto}
                    >
                      Видалити фото
                    </button>
                  )}
                </div>
              </div>

              <ErrorMessage
                name="avatarFile"
                component="div"
                className={styles.error}
              />
            </div>

            {/* Біо */}
            <div className={styles.row}>
              <label htmlFor="bio" className={styles.label}>
                Короткий опис
              </label>
              <Field
                as="textarea"
                id="bio"
                name="bio"
                maxLength={MAX_BIO}
                className={styles.textarea}
                placeholder="Розкажіть більше про вас"
              />
              <div className={styles.counter}>Залишилось символів: {left}</div>
              <ErrorMessage
                name="bio"
                component="div"
                className={styles.error}
              />
            </div>

            {/* Дії */}
            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.btnPrimary}
                disabled={isSubmitting}
              >
                Зберегти
              </button>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={onSkip}
                disabled={isSubmitting}
              >
                Пропустити
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
