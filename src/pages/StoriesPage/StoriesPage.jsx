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

const StoriesPage = () => {
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState('');

  // eslint-disable-next-line
  const categories = [
    'Всі історії',
    'Європа',
    'Азія',
    'Пустелі',
    'Африка',
    'Україна',
    'Гори',
    'Америка',
  ];

  const { items, hasNextPage, itemsStatus, error, totalPages, isLoading } =
    useSelector((state) => state.stories);

  const { isMobile, isTablet } = useBreakpoint();
  const perPage = isTablet ? 8 : 9;

  // for displaying
  const displayedItems = useMemo(() => {
    if (currentCategory === categories[0] || currentCategory === '') {
      return items.slice(0, perPage * currentPage);
    }
    return items
      .filter((item) => item.category === currentCategory)
      .slice(0, perPage * currentPage);
  }, [items, perPage, currentPage, currentCategory, categories]);

  useEffect(() => {
    const loadStories = async () => {
      try {
        if (items.length === 0) {
          await dispatch(fetchStories({ page: 1, perPage })).unwrap();
        }
        if (items.length < perPage * currentPage && hasNextPage) {
          await dispatch(
            fetchStories({
              page: currentPage + 1,
              perPage,
              category: currentCategory,
            })
          ).unwrap();
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadStories();
  }, [
    dispatch,
    currentPage,
    perPage,
    hasNextPage,
    items.length,
    currentCategory,
  ]);

  // handlers
  const handleShowMore = async () => {
    const buttonPosition = buttonRef.current?.offsetTop || window.scrollY;
    if (!hasNextPage) return;
    try {
      const nextPage = currentPage + 1;
      await dispatch(
        fetchStories({ page: nextPage, perPage, category: currentCategory })
      ).unwrap();
      setCurrentPage(nextPage);
      window.scrollTo({ top: buttonPosition, behavior: 'auto' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = async (category) => {
    try {
      setCurrentCategory(category);
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
                      className={styles.filterButton}
                      onClick={() => handleCategoryChange(cat)}
                      style={{
                        background:
                          currentCategory === cat
                            ? 'var(--color-neutral-lighter)'
                            : '',
                      }}
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
          {currentPage < totalPages && (
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
