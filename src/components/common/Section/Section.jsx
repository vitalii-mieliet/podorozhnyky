/**
 * Компонент Section — обгортка для секцій сторінки з базовими вертикальними падінгами.
 *
 * За замовчуванням застосовує padding: 64px 0 (72px на екранах ≥1440px),
 * але дозволяє повністю перевизначити стилі через className.
 *
 * @param {object} props - Властивості компонента
 * @param {React.ReactNode} props.children - Вміст секції
 * @param {string} [props.className] - Додаткові CSS класи
 * 
 !!!!!!!!* How to Use in JSX *!!!!!!!
<Section className="pt-32 pt-md-64 pb-64 pb-lg-124">
  ...
</Section>
Meaning:
Mobile: padding-top: 32px, padding-bottom: 64px
Tablet (768px+): padding-top: 64px
Desktop (1440px+): padding-bottom: 124px
 */

import css from './Section.module.css';
import clsx from 'clsx';

const Section = ({ children, className }) => {
  const sectionClass = clsx(css.section, className);

  return <section className={sectionClass}>{children}</section>;
};

export default Section;
