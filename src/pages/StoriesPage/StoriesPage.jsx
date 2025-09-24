// src/pages/StoriesPage/StoriesPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStories } from '../../redux/stories/operations';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import Container from '../../components/common/Container/Container';
import Section from '../../components/common/Section/Section';
import Loader from '../../components/common/Loader/Loader';
import AppMessage from '../../components/common/AppMessage/AppMessage';
import AppButton from '../../components/ui/AppButton/AppButton';
import styles from './StoriesPage.module.css';

const STORIES_PER_PAGE = 9;

const StoriesPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const {
    items: stories,
    itemsStatus,
    error,
    hasNextPage,
    isLoadingMore,
  } = useSelector((state) => state.stories);

  useEffect(() => {
    if (itemsStatus === 'idle') {
      dispatch(fetchStories({ page: 1, limit: STORIES_PER_PAGE }));
    }
  }, [dispatch, itemsStatus]);

  // --- ДОБАВЛЕНА НЕДОСТАЮЩАЯ ФУНКЦИЯ ---
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(fetchStories({ page: nextPage, limit: STORIES_PER_PAGE }));
  };

  const isLoading = itemsStatus === 'loading';

  return (
    <Section aria-busy={isLoading}>
      <Container>
        <h1>Історії Мандрівників</h1>

        {isLoading && <Loader />}
        
        {itemsStatus === 'failed' && (
          <AppMessage
            title="Виникла помилка"
            message={error}
            buttonText="Спробувати знову"
            route="/stories"
          />
        )}
         
        {itemsStatus === 'succeeded' && <TravellersStories stories={stories} />}

        <div className={styles.buttonWrapper}>
          {hasNextPage && !isLoadingMore && (
            <AppButton onClick={handleLoadMore} variant="blue">
              Показати ще
            </AppButton>
          )}
          {isLoadingMore && <Loader />}
        </div>
      </Container>
    </Section>
  );
};

export default StoriesPage;