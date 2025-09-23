import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStories } from '../../redux/stories/operations';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import Container from '../../components/common/Container/Container';
import Section from '../../components/common/Section/Section';
import Loader from '../../components/common/Loader/Loader';

const StoriesPage = () => {
  const dispatch = useDispatch(); 
  const { items: stories, isLoading, error } = useSelector((state) => state.stories);

  useEffect(() => { 
    dispatch(fetchAllStories());
  }, [dispatch]);

  return (
    <Section>
      <Container>
        <h1>Історії Мандрівників</h1>

        {isLoading && <Loader />}
        {error && <p>Виникла помилка: {error}</p>}
         
        {!isLoading && !error && <TravellersStories stories={stories} />}
      </Container>
    </Section>
  );
};

export default StoriesPage;