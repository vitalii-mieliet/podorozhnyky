import React from 'react';
import clsx from 'clsx';

import s from './AppButton.module.css';

const AppButton = ({
  children,
  width,
  height,
  disabled,
  variant = 'blue',
  type = 'button',
  href,
  ...rest
}) => {
  const commonProps = {
    className: clsx(s.base, s[variant]),
    style: { width, height },
    ...rest,
  };

  if (href && !disabled) {
    return (
      <a href={href} {...commonProps}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={clsx(s.base, s[variant])}
      style={{ width, height }}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default AppButton;
