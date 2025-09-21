import TravelerCard from '../TravelerCard/TravelerCard';
import css from './TravelerList.module.css';

function TravelerList({ travelers = [] }) {
  if (!Array.isArray(travelers)) {
    console.warn('TravelerList expects an array, but got:', travelers);
    return null;
  }

  return (
    <div className={css.cardsGrid}>
      {travelers.map((t, idx) => (
        <TravelerCard key={idx} userData={t} />
      ))}
    </div>
  );
}

export default TravelerList;
