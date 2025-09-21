import { useState, useEffect } from 'react';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import Container from '../../components/common/Container/Container';
import Section from '../../components/common/Section/Section';
import Loader from '../../components/common/Loader/Loader'; 

// тестові дані для демонстрації  
const MOCK_STORIES = [
  {
    _id: '1',
    img: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop',
    category: 'Подорожі',
    title: 'Венеція без туристів: маршрути для справжніх мандрівників',
    article: 'Відкрийте для себе приховані канали та затишні кафе, де відпочивають місцеві жителі.',
    owner: {
      name: 'Олена Петренко',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
    },
    date: '2025-09-15T10:00:00.000Z',
    bookmarksCount: 12,
  },
  {
    _id: '2',
    img: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop',
    category: 'Пригоди',
    title: 'Сходження на Говерлу: поради для початківців',
    article: 'Карпати чекають! Все, що вам потрібно знати перед першим серйозним походом в гори: від спорядження до найкращих маршрутів.',
    owner: {
      name: 'Максим Іванов',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
    },
    date: '2025-09-20T14:30:00.000Z',
    bookmarksCount: 25,
  },
    {
    _id: '3',
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
    category: 'Культура',
    title: 'Смаки Львова: гастрономічний тур старим містом',
    article: 'Пориньте в атмосферу старовинного Львова та скуштуйте його найкращі страви. Від традиційного борщу до вишуканих десертів.',
    owner: {
      name: 'Анна Ковальчук',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    },
    date: '2025-09-18T12:00:00.000Z',
    bookmarksCount: 8,
  },
  
];


const StoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // тут буде реальний запит на бекенд  
    const timer = setTimeout(() => {
      setStories(MOCK_STORIES);
      setIsLoading(false);
    }, 1000); // імітація затримки в 1 секунду

    return () => clearTimeout(timer); // очищення таймера
  }, []);


  return (
    <Section>
      <Container>
        <h1>Історії Мандрівників</h1>
        
        {isLoading ? (
          <Loader />
        ) : (
          <TravellersStories stories={stories} />
        )}
      </Container>
    </Section>
  );
};

export default StoriesPage;