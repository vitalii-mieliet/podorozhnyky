import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Section from '../common/Section/Section.jsx';
import Container from '../common/Container/Container.jsx';
import AppButton from '../ui/AppButton/AppButton.jsx';
import styles from './OurTravellers.module.css';
import useBreakpoint from '../../hooks/useBreakpoint.js';
import { ourTravellersActions } from '../../redux/ourTravellers/slice.js';
import TravellerList from '../common/TravellerList/TravellerList.jsx';
import {
  selectOurTravellers,
  selectOurTravellersLoading,
  selectOurTravellersPagination,
} from '../../redux/ourTravellers/selectors.js';
import { fetchOurTravellers } from '../../redux/ourTravellers/operations.js';

const OurTravellers = () => {
  const { isMobile } = useBreakpoint();
  const dispatch = useDispatch();
  const { setPage } = ourTravellersActions;
  const isLoading = useSelector(selectOurTravellersLoading);
  const items = useSelector(selectOurTravellers) || [];
  const { hasNextPage, page, perPage } = useSelector(
    selectOurTravellersPagination
  );

  useEffect(() => {
    dispatch(fetchOurTravellers({ page, perPage }));
  }, [dispatch, page, perPage]);

  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <Section>
      <Container>
        <h2 className={styles.sectionTitle}>Наші Мандрівники</h2>
        <TravellerList travelers={items} />

        {hasNextPage && (
          <div className={styles.actions}>
            <AppButton
              onClick={handleLoadMore}
              variant="blue"
              type="button"
              size={isMobile ? 'sm' : 'md'}
              aria-label="Показати більше мандрівників"
              disabled={isLoading} // добавь
            >
              {isLoading ? 'Завантаження...' : 'Переглянути всіх'}
            </AppButton>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default OurTravellers;
