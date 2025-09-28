import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStories } from '../../redux/stories/operations';

import Container from '../../components/common/Container/Container';
import Section from '../../components/common/Section/Section';
import Loader from '../../components/common/Loader/Loader';
import AppMessage from '../../components/common/AppMessage/AppMessage';
import AppButton from '../../components/ui/AppButton/AppButton';
import styles from './StoriesPage.module.css';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import useBreakpoint from '../../hooks/useBreakpoint';
import { resetStories } from '../../redux/stories/slice';
import clsx from 'clsx';

const StoriesPage = () => {
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState('');

  const categories = [
    'Всі історії',
    'Європа',
    'Азія',
    'Пустелі',
    'Африка',
    'Україна',
    'Америка',
  ];

  const { items, hasNextPage, itemsStatus, error, isLoading } = useSelector(
    (state) => state.stories
  );

  const { isMobile, isTablet } = useBreakpoint();
  const perPage = isTablet ? 8 : 9;

  const displayedItems = useMemo(() => {
    return items.slice(0, perPage * currentPage);
  }, [items, perPage, currentPage]);

  // load stories
  useEffect(() => {
    const loadStories = async () => {
      try {
        if (items.length === 0) {
          await dispatch(fetchStories({ page: 1, perPage })).unwrap();
        }
        if (items.length < perPage * currentPage && hasNextPage) {
          await dispatch(fetchStories({ page: currentPage, perPage })).unwrap();
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadStories();
    // eslint-disable-next-line
  }, [dispatch, currentPage, perPage, hasNextPage]);

  // handlers
  const handleShowMore = async () => {
    if (!hasNextPage) return;

    const buttonPosition = buttonRef.current?.offsetTop || window.scrollY;
    const nextPage = currentPage + 1;

    try {
      if (currentCategory === categories[0] || currentCategory === '') {
        await dispatch(fetchStories({ page: nextPage, perPage })).unwrap();
      } else {
        await dispatch(
          fetchStories({ page: nextPage, perPage, category: currentCategory })
        ).unwrap();
      }
      setCurrentPage(nextPage);
      window.scrollTo({ top: buttonPosition, behavior: 'auto' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = async (category) => {
    try {
      dispatch(resetStories());
      setCurrentCategory(category);

      if (category !== categories[0]) {
        return await dispatch(
          fetchStories({ page: 1, perPage, category })
        ).unwrap();
      } else {
        await dispatch(fetchStories({ page: 1, perPage })).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // JSX
  return (
    <Section className={styles.storiesSection}>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.storiesContent}>
            <>
              <h1 className={styles.title}>Історії Мандрівників</h1>
              {isMobile ? (
                <div>
                  <label
                    htmlFor="categorySelect"
                    className={styles.selectTitle}
                  >
                    Категорії
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="categorySelect"
                      name="selectCategory"
                      value={currentCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className={styles.selectCategory}
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div className={styles.filterButtons}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={clsx(
                        styles.filterButton,
                        currentCategory === cat && styles.filterButtonActive
                      )}
                      onClick={() => handleCategoryChange(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </>

            {itemsStatus === 'succeeded' && (
              <TravellersStories
                stories={displayedItems}
                aria-busy={isLoading}
              />
            )}
          </div>
        )}

        {itemsStatus === 'failed' && (
          <AppMessage title="Виникла помилка" message={error} />
        )}

        <div className={styles.buttonWrapper}>
          {hasNextPage && (
            <AppButton
              ref={buttonRef}
              className={styles.showMoreBtn}
              onClick={handleShowMore}
              variant="blue"
              aria-label={isLoading ? 'Завантаження...' : 'Показати ще'}
            >
              Показати ще
            </AppButton>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default StoriesPage;
