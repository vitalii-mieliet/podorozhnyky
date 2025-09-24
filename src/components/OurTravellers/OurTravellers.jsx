import { useState, useEffect } from 'react';
import useBreakpoint from '../../hooks/useBreakpoint.js';
import Section from '../common/Section/Section.jsx';
import Container from '../common/Container/Container.jsx';
import TravellerList from '../common/TravellerList/TravellerList.jsx';
import AppButton from '../ui/AppButton/AppButton.jsx';
import styles from './OurTravellers.module.css';

const OurTravellers = ({
  travelers = [],
  initialVisibleCount = 4, // кількість карток на сторінці
  loadMoreCount = 3, // кількість карток що підвантажуются при кліку на кнопку
}) => {
  const { isMobile } = useBreakpoint();
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  useEffect(() => {
    setVisibleCount(initialVisibleCount);
  }, [initialVisibleCount]);

  const showLoadMoreButton = travelers.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + loadMoreCount);
  };

  return (
    <Section>
      <Container>
        <h2 className={styles.sectionTitle}>Наші Мандрівники</h2>
        <TravellerList travelers={travelers.slice(0, visibleCount)} />

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
