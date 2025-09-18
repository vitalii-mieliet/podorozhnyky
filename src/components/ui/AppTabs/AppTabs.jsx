import { useState } from 'react';
import clsx from 'clsx';
import css from './AppTabs.module.css';

const AppTabs = ({
  children,
  defaultValue,
  variant = 'contained',
  size = 'md',
  type = 'button',
  color = 'primary',
  className,
  ...props
}) => {
  const [active, setActive] = useState(defaultValue);

  return (
    <div className={clsx(css.wrapper, className)} {...props}>
      {children.map((child) => {
        const isActive = child.props.value === active;

        const tabClass = clsx(css.tab, css[variant], css[size], css[color], {
          [css.active]: isActive,
        });

        if (type === 'link') {
          return (
            <a
              key={child.props.value}
              href="#"
              className={tabClass}
              onClick={() => setActive(child.props.value)}
            >
              {child.props.children}
            </a>
          );
        }

        return (
          <button
            key={child.props.value}
            type="button"
            className={tabClass}
            onClick={() => setActive(child.props.value)}
          >
            {child.props.children}
          </button>
        );
      })}
    </div>
  );
};

export default AppTabs;
