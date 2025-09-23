import TravellerCard from '../TravellerCard/TravellerCard';
import css from './TravellerList.module.css';

function TravellerList({ travelers = [] }) {
  if (!Array.isArray(travelers)) {
    return null;
  }

  return (
    <ul className={css.cardsGrid}>
      {travelers.map((t) => (
        <li key={t._id} className={css.cardItem}>
          <TravellerCard userData={t} />
        </li>
      ))}
    </ul>
  );
}

export default TravellerList;
