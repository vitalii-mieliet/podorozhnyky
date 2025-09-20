import React from 'react';
import clsx from 'clsx';
import s from './AppButton.module.css';

/**
 * Універсальний компонент кнопки, який може рендеритись як нативна кнопка `<button>`
 * або як посилання `<a>` залежно від переданих пропсів.
 *
 * @component
 * @param {Object} props - Властивості компонента.
 * @param {React.ReactNode} props.children - Вміст кнопки (текст, іконки тощо).
 * @param {'sm' | 'md'} [props.size='md'] - Розмір кнопки: маленька (`sm`) або стандартна (`md`).
 * @param {boolean} [props.fullWidth=false] - Якщо true, кнопка займає 100% ширини контейнера.
 * @param {boolean} [props.disabled=false] - Вимикає кнопку (працює як для `<button>`, так і для `<a>`).
 * @param {'blue' | 'grey'} [props.variant='blue'] - Візуальний стиль кнопки.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - Тип кнопки (застосовується лише якщо рендериться `<button>`).
 * @param {string} [props.href] - Якщо передано, компонент рендериться як посилання `<a>` замість кнопки.
 * @param {string} [props.className] - Додатковий CSS-клас для стилізації.
 * @returns {JSX.Element} Відрендерений елемент кнопки або посилання.
 *
 * @example
 * // Стандартна синя кнопка
 * <AppButton>Натисни мене</AppButton>
 *
 * @example
 * // Сіра маленька кнопка
 * <AppButton size="sm" variant="grey">Вхід</AppButton>
 *
 * @example
 * // Кнопка на всю ширину (наприклад, у мобільному меню)
 * <AppButton fullWidth variant="blue">Реєстрація</AppButton>
 *
 * @example
 * // Кнопка як посилання
 * <AppButton href="/auth/login" variant="grey">Увійти</AppButton>
 */

const AppButton = ({
  children,
  size = 'md',
  fullWidth = false,
  disabled = false,
  variant = 'blue',
  type = 'button',
  href,
  className,
  ...props
}) => {
  const commonProps = {
    className: clsx(
      s.button,
      s[variant],
      s[`button--${size}`],
      fullWidth && s.fullWidth,
      className
    ),
    ...props,
  };

  if (href?.startsWith('http')) {
    commonProps.rel = 'noopener noreferrer';
  }

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        aria-disabled={disabled}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
        {...commonProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} {...commonProps}>
      {children}
    </button>
  );
};

export default AppButton;
