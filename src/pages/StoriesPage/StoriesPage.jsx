import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStories } from '../../redux/stories/operations';
import { applyFilters } from '../../redux/stories/slice';
import { setActiveCategory, selectActiveCategory } from '../../redux/filter/slice';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import Container from '../../components/common/Container/Container';
import Section from '../../components/common/Section/Section';
import Loader from '../../components/common/Loader/Loader';
import AppMessage from '../../components/common/AppMessage/AppMessage';
import AppButton from '../../components/ui/AppButton/AppButton';
import styles from './StoriesPage.module.css';
import useResponsivePagination from '../../hooks/useResponsivePagination';

const StoriesPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const activeCategory = useSelector(selectActiveCategory);
  
  const {
    items,  
    itemsStatus,
    error,
    hasNextPage,
  } = useSelector((state) => state.stories);
  
  const storiesPerPage = useResponsivePagination({ mobile: 8, tablet: 8, desktop: 9 });

  const categories = useMemo(
    () => ["Всі історії", "Європа", "Азія", "Пустелі", "Африка", "Україна", "Гори", "Америка"],
    []
  );
 
  useEffect(() => { 
    if (itemsStatus === 'idle') {
      dispatch(fetchAllStories());
    }
  }, [dispatch, itemsStatus]);
   
  useEffect(() => {
    if (itemsStatus === 'succeeded') {
      dispatch(applyFilters({ category: activeCategory, page, perPage: storiesPerPage }));
    }
  }, [dispatch, activeCategory, page, storiesPerPage, itemsStatus]);
 
  const handleCategoryChange = (category) => {
    setPage(1);  
    dispatch(setActiveCategory(category));
  };

  const handleLoadMore = () => { 
    setPage((prevPage) => prevPage + 1);
  };
  
  const isLoading = itemsStatus === 'loading';

  return (
    <Section aria-busy={isLoading}>
      <Container>
        <div className={styles.header}>
          <h1 className={styles.title}>Історії Мандрівників</h1>
          <div className={styles.filters}>
            <select
              className={styles.filterSelect}
              value={activeCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className={styles.filterButtons}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={styles.filterButton}
                  onClick={() => handleCategoryChange(cat)}
                  style={{ background: activeCategory === cat ? 'var(--color-neutral-lighter)' : ''}}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {isLoading && <Loader />}
        {itemsStatus === 'failed' && <AppMessage title="Виникла помилка" message={error} />}
        {itemsStatus === 'succeeded' && <TravellersStories stories={items} />}
        
        <div className={styles.buttonWrapper}>
          {hasNextPage && (
            <AppButton onClick={handleLoadMore} variant="blue">
              Показати ще
            </AppButton>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default StoriesPage;