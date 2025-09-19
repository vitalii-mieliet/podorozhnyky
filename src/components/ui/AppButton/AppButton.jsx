import clsx from 'clsx';
import s from './AppButton.module.css';

function AppButton({
  children,
  width,
  height,
  disabled,
  variant = 'blue',
  className,
  onClick,
}) {
  return (
    <button
      className={clsx(s.blue, s[variant], className && className)}
      onClick={onClick}
      style={{ width, height }}
      disabled={disabled}
      tabIndex={0}
    >
      {children}
    </button>
  );
}

export default AppButton;
