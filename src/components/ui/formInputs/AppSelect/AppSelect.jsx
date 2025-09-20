import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import sprite from '../../../../assets/icons/sprite.svg';
import styles from './AppSelect.module.css';

const AppSelect = ({
  options,
  value, // контролюємо значення через велью
  placeholder,
  className,
  error,
  errorMessage,
  onChange,
  'aria-label': ariaLabel,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef(null);

  // закриття клік поза меню
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // навігація стрілочками
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0) handleSelect(options[highlightedIndex]);
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, highlightedIndex, options]);

  useEffect(() => {
    if (!isOpen) setHighlightedIndex(-1);
  }, [isOpen]);

  const toggleList = () => {
    setIsOpen(!isOpen);
    if (!isOpen) selectRef.current?.focus();
  };

  const handleSelect = (option) => {
    setIsOpen(false); // закриваєм якщо вибрали опцію
    if (onChange) onChange(option);
  };

  const selectClasses = clsx(styles.select, {
    [styles.selectOpen]: isOpen,
    [styles.selectError]: error,
  });

  return (
    <div
      className={clsx(styles.selectWrapper, className)}
      ref={selectRef}
      tabIndex={0}
      aria-label={ariaLabel}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox" // скрінрідер каже що ця кнопка відкриває список
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <div className={selectClasses} onClick={toggleList}>
        <span>{value ? value.label : placeholder}</span>
        <svg className={styles.arrow} aria-hidden="true">
          <use href={`${sprite}#chevron_down`} />
        </svg>
      </div>
      {isOpen && (
        <ul className={styles.optionsList} role="listbox">
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={value && value.value === option.value}
              className={clsx(styles.option, {
                [styles.selectedOption]: value && value.value === option.value,
                [styles.highlighted]: index === highlightedIndex,
              })}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
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
