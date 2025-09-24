import TravellerList from '../../components/common/TravellerList/TravellerList';
import AppButton from '../../components/ui/AppButton/AppButton';
import css from './TravellersPage.module.css';
const TravellersPage = () => {
  return (
    <div className={css.travellersPage}>
      <div className={css.container}>
        <h1 className={css.tittle}>Мандрівники</h1>
        <TravellerList />
        <div className={css.btn}>
          <AppButton fullWidth={true}>Показати ще</AppButton>
        </div>
      </div>
    </div>
  );
};

export default TravellersPage;
