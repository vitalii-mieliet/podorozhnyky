import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import sprite from '../../../../assets/icons/sprite.svg';
import styles from './AppSelect.module.css';

const AppSelect = ({
  options,
  placeholder,
  className,
  error,
  errorMessage,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef]);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const selectClasses = clsx(styles.select, {
    [styles.selectOpen]: isOpen,
    [styles.selectError]: error,
  });

  return (
    <div className={clsx(styles.selectWrapper, className)} ref={selectRef}>
      <div className={selectClasses} onClick={toggleList}>
        <span>{selected ? selected.label : placeholder}</span>
        <svg className={styles.arrow} aria-hidden="true">
          <use href={`${sprite}#chevron_down`} />
        </svg>
      </div>
      {isOpen && (
        <ul className={styles.optionsList}>
          {options.map((option) => (
            <li
              key={option.value}
              className={clsx(styles.option, {
                [styles.selectedOption]:
                  selected && selected.value === option.value,
              })}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {error && errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

export default AppSelect;
