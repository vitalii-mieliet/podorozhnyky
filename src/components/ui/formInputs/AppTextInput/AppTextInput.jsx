import clsx from 'clsx';
import styles from './AppTextInput.module.css';

const AppTextInput = ({
  placeholder,
  value,
  error,
  errorMessage,
  className,
  onChange,
  ...props
}) => {
  const inputClasses = clsx(
    styles.input,
    {
      [styles.inputError]: error,
    },
    className
  );

  return (
    <div className={styles.inputWrapper}>
      <input
        className={inputClasses}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={onChange}
        {...props}
      />
      {error && errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

export default AppTextInput;
