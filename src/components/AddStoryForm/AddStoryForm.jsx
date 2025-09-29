import { useEffect, useRef, useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useNavigate, generatePath } from 'react-router-dom';

import Container from '../common/Container/Container';
import Section from '../common/Section/Section';
import AppButton from '../ui/AppButton/AppButton';
import placeholder from '../../assets/images/placeholder/Placeholder.webp';

import AppTextArea from '../ui/formInputs/AppTextArea/AppTextArea';
import AppTextInput from '../ui/formInputs/AppTextInput/AppTextInput';
import AppSelect from '../ui/formInputs/AppSelect/AppSelect';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createStory } from '../../redux/stories/operations';
import { selectCategories } from '../../redux/stories/selectors';
import style from './AddStoryForm.module.css';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Заголовок обовʼязковий')
    .max(100, 'Максимум 100 символів'),
  category: Yup.string().required('Виберіть категорію'),
  article: Yup.string()
    .required('Текст історії обовʼязковий')
    .min(10, 'Мінімум 10 символів'),
});

// місток для AppTextInput
const FormikTextInput = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <AppTextInput
      {...field}
      {...props}
      error={meta.touched && !!meta.error}
      errorMessage={meta.touched ? meta.error : ''}
    />
  );
};

// місток для AppSelect
const FormikSelect = ({ name, options, placeholder, ariaLabel, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (option) => {
    helpers.setValue(option.value);
  };

  return (
    <AppSelect
      options={options}
      value={options.find((opt) => opt.value === field.value) || null}
      placeholder={placeholder}
      ariaLabel={ariaLabel}
      onChange={handleChange}
      error={meta.touched && !!meta.error}
      errorMessage={meta.touched ? meta.error : ''}
      {...props}
    />
  );
};

// місток для AppTextArea
const FormikTextArea = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <AppTextArea
      {...field}
      {...props}
      error={meta.touched && !!meta.error}
      errorMessage={meta.touched ? meta.error : ''}
    />
  );
};

const AddStoryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const categories = useSelector(selectCategories);

  const formattedCategories = categories.map((cat) => ({
    value: cat,
    label: cat,
  }));

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const initialValues = {
    title: '',
    category: '',
    article: '',
    img: null,
  };

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFieldValue('img', file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const newStory = await dispatch(createStory(values)).unwrap();

      resetForm();
      setPreview(null);

      //  редірект на сторіз айді
      const storyId = newStory.data ? newStory.data._id : newStory._id;

      navigate(generatePath('/stories/:storyId', { storyId }));
    } catch (error) {
      console.error('Помилка при відправці форми:', error);
      alert('Помилка при створенні історії. Спробуйте ще раз.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = (resetForm) => {
    resetForm();
    setPreview(null);
    navigate(-1);
  };

  const removePhoto = (setFieldValue) => {
    setFieldValue('avatarFile', null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (preview) URL.revokeObjectURL(preview);
    setPreview('');
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
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ setFieldValue, isValid, dirty, resetForm }) => (
              <Form className={style.formBox}>
                <div className={style.formBoxDesktop}>
                  {/* Завантаження фото */}
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
                      onClick={
                        preview
                          ? () => removePhoto(setFieldValue)
                          : () => fileInputRef.current.click()
                      }
                    >
                      {preview ? 'Видалити фото' : 'Завантажити фото'}
                    </AppButton>
                  </div>

                  {/* Заголовок */}
                  <div className={style.inputBox}>
                    <label className={style.label} htmlFor="title">
                      Заголовок
                    </label>
                    <FormikTextInput
                      name="title"
                      id="title"
                      placeholder="Введіть заголовок історії"
                      aria-label="Заголовок статті"
                    />
                  </div>

                  <div className={style.inputBox}>
                    <label className={style.label} htmlFor="category">
                      Категорія
                    </label>
                    <FormikSelect
                      name="category"
                      options={formattedCategories}
                      placeholder="Категорія"
                      ariaLabel="Категорія статті"
                    />
                  </div>

                  {/* Повний текст історії */}
                  <div className={style.inputBox}>
                    <label className={style.label} htmlFor="article">
                      Текст історії
                    </label>
                    <FormikTextArea
                      name="article"
                      id="article"
                      placeholder="Ваша історія тут"
                      aria-label="Повний текст статті"
                    />
                  </div>
                </div>

                {/* Кнопки */}
                <div className={style.appButtonBox}>
                  <AppButton
                    type="submit"
                    aria-label="Зберегти історію"
                    disabled={!dirty}
                  >
                    Зберегти
                  </AppButton>
                  <AppButton
                    type="button"
                    variant="grey"
                    aria-label="Відмінити створення історії"
                    onClick={() => handleResetForm(resetForm)}
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
