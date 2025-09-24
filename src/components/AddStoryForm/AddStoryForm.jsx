import { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import style from './AddStoryForm.module.css';
import Container from '../common/Container/Container';
import Section from '../common/Section/Section';
import AppButton from '../ui/AppButton/AppButton';
import placeholder from '../../assets/images/placeholder/Placeholder.webp';

import AppTextArea from '../ui/formInputs/AppTextArea/AppTextArea';
import AppTextInput from '../ui/formInputs/AppTextInput/AppTextInput';
import AppSelect from '../ui/formInputs/AppSelect/AppSelect';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Заголовок обовʼязковий')
    .max(100, 'Максимум 100 символів'),
  category: Yup.string().required('Виберіть категорію'),
  shortDescription: Yup.string()
    .required('Опис обовʼязковий')
    .max(120, 'Максимум 120 символів'),
  fullText: Yup.string()
    .required('Текст історії обовʼязковий')
    .min(10, 'Мінімум 10 символів'),
});

const AddStoryForm = () => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const maxLength = 120;

  const initialValues = {
    title: '',
    category: '',
    shortDescription: '',
    fullText: '',
    photo: null,
  };

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFieldValue('photo', file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (values) => {
    console.log('Форма відправлена:', values);
  };

  return (
    <Section>
      <Container>
        <div className={style.box}>
          <h1 className={style.tittle}>Створити нову історію</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isValid, dirty }) => (
              <Form className={style.formBox}>
                <div className={style.formBoxDesktop}>
                  <div>
                    <label className={style.label} htmlFor="upload-photo">
                      Обкладинка статті
                    </label>
                    <div>
                      <img
                        src={preview || placeholder}
                        alt="Preview"
                        className={style.photo}
                        width={865}
                        height={576}
                      />
                    </div>
                    <input
                      ref={fileInputRef}
                      id="upload-photo"
                      type="file"
                      accept="image/*"
                      aria-label="Завантажити фото для обкладинки статті"
                      className={style.uploadInput}
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                    />
                    <AppButton
                      type="button"
                      variant="grey"
                      size="sm"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Завантажити фото
                    </AppButton>
                  </div>

                  <div className={style.inputBox}>
                    <label className={style.label} htmlFor="title">
                      Заголовок
                    </label>
                    <Field
                      as={AppTextInput}
                      id="title"
                      name="title"
                      placeholder="Введіть заголовок історії"
                      aria-label="Заголовок статті"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className={style.error}
                    />
                  </div>

                  <div className={style.inputBox}>
                    <label className={style.label} htmlFor="category">
                      Категорія
                    </label>
                    <Field
                      as={AppSelect}
                      id="category"
                      name="category"
                      placeholder="Категорія"
                      aria-label="Категорія статті"
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className={style.error}
                    />
                  </div>

                  <div className={style.inputBox}>
                    <label className={style.label} htmlFor="shortDescription">
                      Короткий опис
                    </label>
                    <Field
                      as={AppTextArea}
                      id="shortDescription"
                      name="shortDescription"
                      maxLength={maxLength}
                      placeholder="Введіть короткий опис історії"
                      aria-label="Короткий опис статті"
                      className={style.textArea}
                    />
                    <div className={style.symbol}>
                      Лишилось символів:{' '}
                      {maxLength - values.shortDescription.length}
                    </div>
                    <ErrorMessage
                      name="shortDescription"
                      component="div"
                      className={style.error}
                    />
                  </div>

                  <div className={style.inputBox}>
                    <label className={style.label} htmlFor="fullText">
                      Текст історії
                    </label>
                    <Field
                      as={AppTextArea}
                      id="fullText"
                      name="fullText"
                      placeholder="Ваша історія тут"
                      aria-label="Повний текст статті"
                    />
                    <ErrorMessage
                      name="fullText"
                      component="div"
                      className={style.error}
                    />
                  </div>
                </div>

                <div className={style.appButtonBox}>
                  <AppButton
                    type="submit"
                    disabled={!dirty || !isValid}
                    aria-label="Зберегти історію"
                  >
                    Зберегти
                  </AppButton>
                  <AppButton
                    type="button"
                    variant="grey"
                    aria-label="Відмінити створення історії"
                  >
                    Відмінити
                  </AppButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </Section>
  );
};

export default AddStoryForm;
