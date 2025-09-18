import React from 'react';
import { Link } from 'react-router-dom';
import css from './AppLink.module.css';
import clsx from 'clsx';

const AppLink = ({
  to,
  variant = 'contained',
  size = 'md',
  color = 'primary',
  className,
  disabled = false,
  ...props
}) => {
  const linkClass = clsx(
    css.link,
    css[variant],
    css[size],
    css[color],
    className
  );

  return (
    <Link
      to={disabled ? '#' : to}
      className={linkClass}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      {...props}
    />
  );
};

export default AppLink;
