import TravelerCard from '../TravelerCard/TravelerCard';
import css from './TravelerList.module.css';

function TravelerList({ travelers = [] }) {
  if (!Array.isArray(travelers)) {
    return null;
  }

  return (
    <ul className={css.cardsGrid}>
      {travelers.map((t) => (
        <li key={t._id} className={css.cardItem}>
          <TravelerCard userData={t} />
        </li>
      ))}
    </ul>
  );
}

export default TravelerList;
