import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTravellers } from '../../redux/travelers/slice';
import {
  selectTravellers,
  selectTravellersPage,
  selectTravellersTotalPages,
  selectTravellersLoading,
} from '../../redux/travelers/selectors';

import TravellerList from '../../components/common/TravellerList/TravellerList';
import AppButton from '../../components/ui/AppButton/AppButton';
import css from './TravellersPage.module.css';

const TravellersPage = () => {
  const dispatch = useDispatch();
  const travelers = useSelector(selectTravellers);
  const page = useSelector(selectTravellersPage);
  const totalPages = useSelector(selectTravellersTotalPages);
  const isLoading = useSelector(selectTravellersLoading);

  useEffect(() => {
    dispatch(fetchTravellers({ page: 1 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      dispatch(fetchTravellers({ page: page + 1 }));
    }
  };

  return (
    <div className={css.travellersPage}>
      <div className={css.container}>
        <h1 className={css.tittle}>Мандрівники</h1>
        <TravellerList travelers={travelers} />
        <div className={css.btn}>
          {page < totalPages && (
            <AppButton fullWidth onClick={handleLoadMore} disabled={isLoading}>
              {isLoading ? 'Завантаження...' : 'Показати ще'}
            </AppButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravellersPage;
