import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStories } from '../../redux/stories/operations';
import Section from '../common/Section/Section';
import Container from '../common/Container/Container';
import TravellersStories from '../common/TravellersStories/TravellersStories';
import AppButton from '../ui/AppButton/AppButton';
import Loader from '../common/Loader/Loader';
import styles from './Popular.module.css';
const STORIES_PER_PAGE = 3;

const Popular = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const {
    items: stories,
    status, // Получаем status вместо isLoading
    isLoadingMore,
    hasNextPage,
    error,
  } = useSelector((state) => state.stories);

  // Загружаем истории, только если они еще не были загружены
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStories({ page: 1, limit: STORIES_PER_PAGE }));
    }
  }, [dispatch, status]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(fetchStories({ page: nextPage, limit: STORIES_PER_PAGE }));
  };

  const isLoading = status === 'loading';

  return (
    <Section>
      <Container>
        <h2 className={styles.title}>Популярні історії</h2>

        {isLoading && <Loader />}
        {status === 'failed' && <p>Виникла помилка: {error}</p>}
        
        {!isLoading && <TravellersStories stories={stories} />}
        
        <div className={styles.buttonWrapper}>
          {hasNextPage && !isLoadingMore && (
            <AppButton onClick={handleLoadMore}>
              Переглянути всі
            </AppButton>
          )}
          {isLoadingMore && <p>Завантаження...</p>}
        </div>
      </Container>
    </Section>
  );
};

export default Popular;