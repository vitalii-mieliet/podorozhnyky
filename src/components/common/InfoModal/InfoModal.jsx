import { useEffect } from 'react';
import css from './InfoModal.module.css';
import clsx from 'clsx';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';

const InfoModal = ({
  title,
  text,
  confirmButtonText = 'Вийти',
  cancelButtonText = 'Відмінити',
  onConfirm,
  onCancel,
  className,
  ...props
}) => {
  // закрити по еск
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onCancel?.();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  // закрити по бекдропу
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel?.();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={clsx(css.modal, className)} {...props}>
        <button className={css.close} onClick={onCancel} aria-label="Close">
          <CloseIcon />
        </button>

        {title && <h2 className={css.title}>{title}</h2>}
        {text && <p className={css.text}>{text}</p>}

        <div className={css.actions}>
          {cancelButtonText && (
            <button className={css.secondary} onClick={onCancel}>
              {cancelButtonText}
            </button>
          )}
          {confirmButtonText && (
            <button className={css.primary} onClick={onConfirm}>
              {confirmButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default InfoModal;
// ====================  Example ====================
// import { useState } from "react";
// import InfoModal from "./InfoModal";
//
// function Example() {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <>
//       <button onClick={() => setIsOpen(true)}>Відкрити модалку</button>
//       {isOpen && (
//         <InfoModal
//           title="Ви точно хочете вийти?"
//           text="Ми будемо сумувати за вами!"
//           confirmButtonText="Вийти"
//           cancelButtonText="Відмінити"
//           onConfirm={() => setIsOpen(false)}
//           onCancel={() => setIsOpen(false)}
//         />
//       )}
//     </>
//   );
// }
// =======================================================
