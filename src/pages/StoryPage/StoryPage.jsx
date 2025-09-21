import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StoryDetails from '../../components/StoryDetails/StoryDetails';
import Container from '../../components/common/Container/Container';
import Loader from '../../components/common/Loader/Loader';

// тестові дані для однієї історії
const MOCK_STORY_DETAILS = {
  _id: '1',
  img: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop',
  category: 'Подорожі',
  title: 'Венеція без туристів: маршрути для справжніх мандрівників',
  article: `
    <p>Венеція — це місто, яке знайоме кожному з листівок та фільмів. Але що, якщо я скажу вам, що існує інша Венеція, прихована від очей мільйонів туристів? Це місто тихих каналів, маленьких майстерень та затишних бакарі, де збираються місцеві.</p>
    <p>Наша подорож починається в районі Каннареджо. Замість того, щоб йти до мосту Ріальто, ми звернемо на північ. Тут ви знайдете єврейське гетто — одне з найстаріших у світі. Це місце з неймовірною історією та атмосферою, де час ніби зупинився.</p>
    <h2>Приховані сади та бібліотеки</h2>
    <p>Чи знали ви, що у Венеції є сади? Один з них — сад Палаццо Соранцо Каппелло. Це справжній оазис тиші серед гамірного міста. А ще варто завітати до Libreria Acqua Alta — книгарні, де книги зберігають у гондолах та ваннах, щоб захистити їх від повеней.</p>
    <p>Це лише початок. Справжня Венеція відкривається тим, хто готовий заблукати в її вуличках, відкласти карту і просто йти за покликом серця.</p>
  `,
  owner: {
    name: 'Олена Петренко',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
  },
  date: '2025-09-15T10:00:00.000Z',
};


const StoryPage = () => {
  const { storyId } = useParams();
  const [storyData, setStoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    // потім будде реальний запит по storyId
    setIsLoading(true);
    const timer = setTimeout(() => {
      // якщо успіх
      setStoryData(MOCK_STORY_DETAILS);
      setIsLoading(false);
      // // якщо з помилкою (для тестування потім)
      // setError("Не вдалося завантажити історію.");
      // setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [storyId]);


  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Container><p>Помилка: {error}</p></Container>;
  }

  return (
    <Container>
      {/*   готові дані як пропс */}
      <StoryDetails storyData={storyData} />
    </Container>
  );
};

export default StoryPage;