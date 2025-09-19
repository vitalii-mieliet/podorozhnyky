import React from 'react';
import clsx from 'clsx';

import s from './AppButton.module.css';

function AppButton({ children, width, height, disabled, variant = 'blue' }) {
  return (
    <button
      className={clsx(s.blue, s[variant])}
      style={{ width, height }}
      disabled={disabled}
      tabIndex={0}
    >
      {children}
    </button>
  );
}

export default AppButton;
