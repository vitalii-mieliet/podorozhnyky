import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTravellers } from '../../redux/travelers/operations.js';
import Section from '../common/Section/Section.jsx';
import Container from '../common/Container/Container.jsx';
import AppButton from '../ui/AppButton/AppButton.jsx';
import styles from './OurTravellers.module.css';
import useBreakpoint from '../../hooks/useBreakpoint.js';
import { selectOurTravellers } from '../../redux/ourTravellers/slice.js';
import TravellerList from '../common/TravellerList/TravellerList.jsx';

const OurTravellers = () => {
  const { isMobile } = useBreakpoint();
  const dispatch = useDispatch();
  const items = useSelector(selectOurTravellers) || [];

  const limit = 4;

  const [visibleCount, setVisibleCount] = useState(limit);

  useEffect(() => {
    setVisibleCount(limit);
  }, [limit]);

  // завантажуєм історії
  useEffect(() => {
    dispatch(fetchTravellers({ page: 1, perPage: limit }));
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + limit);
  };

  const visibleItems = items.slice(0, visibleCount);
  const showLoadMoreButton = items.length > visibleCount;

  return (
    <Section>
      <Container>
        <h2 className={styles.sectionTitle}>Наші Мандрівники</h2>
        <TravellerList travelers={visibleItems} />

        {showLoadMoreButton && (
          <div className={styles.actions}>
            <AppButton
              onClick={handleLoadMore}
              variant="blue"
              type="button"
              size={isMobile ? 'sm' : 'md'}
              aria-label="Показати більше мандрівників"
            >
              Переглянути всіх
            </AppButton>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default OurTravellers;
