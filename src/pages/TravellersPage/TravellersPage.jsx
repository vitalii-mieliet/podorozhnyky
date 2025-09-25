import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchTravellers } from '../../redux/travelers/operations';
import {
  selectTravellers,
  selectTravellersPage,
  selectTravellersTotalPages,
  selectTravellersLoading,
  selectTravellersError,
} from '../../redux/travelers/selectors';

import TravellerList from '../../components/common/TravellerList/TravellerList';
import AppButton from '../../components/ui/AppButton/AppButton';
import css from './TravellersPage.module.css';

const TravellersPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const travelers = useSelector(selectTravellers);
  const page = useSelector(selectTravellersPage);
  const totalPages = useSelector(selectTravellersTotalPages);
  const isLoading = useSelector(selectTravellersLoading);
  const error = useSelector(selectTravellersError);

  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(fetchTravellers({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setSearchParams({ page: nextPage });
      dispatch(fetchTravellers({ page: nextPage }));
    }
  };

  return (
    <div className={css.travellersPage}>
      <div className={css.container}>
        <h1 className={css.title}>Мандрівники</h1>

        {error && <p className={css.error}>Сталася помилка: {error}</p>}
        {!isLoading && !error && travelers.length === 0 && (
          <p className={css.empty}>Немає мандрівників</p>
        )}

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
