import clsx from 'clsx';
import styles from './AppTextArea.module.css';

const AppTextArea = ({
  placeholder,
  value,
  error,
  errorMessage,
  className,
  onChange,
  ...props
}) => {
  const textareaClasses = clsx(
    styles.textarea,
    { [styles.textareaError]: error },
    className
  );

  return (
    <div className={styles.textareaWrapper}>
      <textarea
        className={textareaClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

export default AppTextArea;
