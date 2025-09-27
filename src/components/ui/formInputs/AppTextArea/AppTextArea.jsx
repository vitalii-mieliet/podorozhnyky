import clsx from 'clsx';
import styles from './AppTextArea.module.css';

/**
 * Універсальний компонент текстової області (`<textarea>`),
 * з підтримкою кастомних стилів для обгортки, поля вводу та повідомлення про помилку.
 *
 * @component
 *
 * @param {Object} props - Властивості компонента.
 * @param {string} [props.placeholder] - Плейсхолдер для текстового поля.
 * @param {string} [props.value] - Поточне значення текстового поля.
 * @param {boolean} [props.error=false] - Чи є помилка (впливає на стилі).
 * @param {string} [props.errorMessage] - Текст повідомлення про помилку, якщо `error=true`.
 * @param {string} [props.className] - Додаткові класи для обгортки (`div`).
 * @param {string} [props.inputClassName] - Додаткові класи для `<textarea>`.
 * @param {string} [props.errorClassName] - Додаткові класи для повідомлення про помилку (`<span>`).
 * @param {function} [props.onChange] - Обробник події зміни значення.
 * @param {Object} [props.props] - Інші валідні атрибути для `<textarea>`.
 *
 * @example
 * <AppTextArea
 *   placeholder="Введіть текст"
 *   value={text}
 *   error={!!error}
 *   errorMessage="Це поле є обов'язковим"
 *   className="myWrapper"
 *   inputClassName="myTextarea"
 *   errorClassName="myError"
 *   onChange={(e) => setText(e.target.value)}
 * />
 */
const AppTextArea = ({
  placeholder,
  value,
  error,
  errorMessage,
  className, // для wrapper
  inputClassName,
  errorClassName,
  onChange,
  ...props
}) => {
  const wrapperClasses = clsx(styles.textareaWrapper, className);

  const textareaClasses = clsx(
    styles.textarea,
    { [styles.textareaError]: error },
    inputClassName
  );

  const errorMessageClasses = clsx(styles.errorMessage, errorClassName);

  return (
    <div className={wrapperClasses}>
      <textarea
        className={textareaClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && errorMessage && (
        <span className={errorMessageClasses}>{errorMessage}</span>
      )}
    </div>
  );
};

export default AppTextArea;
