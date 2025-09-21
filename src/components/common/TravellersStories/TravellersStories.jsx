import StoryCard from '../StoryCard/StoryCard';
import styles from './TravellersStories.module.css';

// тестові дані для демонстрації, після запуску бекенду буде отримувати з redux 
const MOCK_STORIES = [
  {
    _id: '1',
    img: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop',
    category: 'Подорожі',
    title: 'Венеція без туристів: маршрути для справжніх мандрівників',
    article: 'Відкрийте для себе приховані канали та затишні кафе, де відпочивають місцеві жителі. Ця стаття покаже вам іншу Венецію, далеку від натовпів.',
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

const TravellersStories = () => {
  // перевірка на випадок, якщо тестові дані будуть порожніми
  if (!MOCK_STORIES || MOCK_STORIES.length === 0) {
    return <p>Наразі немає доступних історій.</p>;
  }

  return (
    <ul className={styles.storiesGrid}>
      {MOCK_STORIES.map((story) => (
        <StoryCard
          key={story._id}
          storyInfo={story}
          // поки що можна передати isOwner={false}  для тестування
          isOwner={false} 
        />
      ))}
    </ul>
  );
};

export default TravellersStories;