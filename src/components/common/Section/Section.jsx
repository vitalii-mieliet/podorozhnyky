/**
 * Компонент Section — обгортка для секцій сторінки з базовими вертикальними падінгами.
 *
 * За замовчуванням застосовує padding: 64px 0 (72px на екранах ≥1440px),
 * але дозволяє перевизначати верхній (`pt`) і нижній (`pb`) падінги через пропси.
 *
 * @param {object} props - Властивості компонента
 * @param {React.ReactNode} props.children - Вміст секції
 * @param {string} [props.className] - Додаткові CSS класи
 * @param {number} [props.pt] - Верхній падінг (у px), повинен відповідати класу .pt-{значення}
 * @param {number} [props.pb] - Нижній падінг (у px), повинен відповідати класу .pb-{значення}
 * 
 * example how to use custom paddings:
 *     <Section pt={32} pb={16}>
      <h2>Про нас</h2>
      <p>Ця секція має менші падінги: 32px зверху і 16px знизу.</p>
    </Section>
 */

import css from './Section.module.css';
import clsx from 'clsx';

const Section = ({ children, className, pt, pb }) => {
  const sectionClass = clsx(
    css.section,
    pt && css[`pt-${pt}`],
    pb && css[`pb-${pb}`],
    className
  );

  return <div className={sectionClass}>{children}</div>;
};

export default Section;
