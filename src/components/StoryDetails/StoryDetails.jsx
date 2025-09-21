import { useEffect, useState } from 'react';
import AppButton from '../../components/ui/AppButton/AppButton'; // Перевірте, чи правильний цей шлях до AppButton
import styles from './StoryDetails.module.css'; 
import bookmarkIconUrl from '../../assets/icons/bookmark.svg';

// тестові дані для однієї історії.
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

//  відображення повної інформації про історію
const StoryDetails = ({ storyId }) => { // приймає storyId для запиту
    const [isLoading, setIsLoading] = useState(true);
    const [storyData, setStoryData] = useState(null);

    useEffect(() => {
        // після запуску бекенду тут  буде запит  
        setIsLoading(true);
        const timer = setTimeout(() => {
            setStoryData(MOCK_STORY_DETAILS);
            setIsLoading(false);
        }, 1500); // симуляція завантаження 1.5 сек

        return () => clearTimeout(timer);
    }, [storyId]); // перезавантажуення даних при зміні storyId

  if (isLoading) {
    return <div className={styles.loader}>Завантаження історії...</div>;
  }

  if (!storyData) {
    return <p>Не вдалося завантажити дані історії.</p>;
  }

  const { img, category, title, article, owner, date } = storyData;

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <p className={styles.category}>{category}</p>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.meta}>
          <div className={styles.authorInfo}>
            <img src={owner.avatar} alt={owner.name} className={styles.authorAvatar} />
            <div>
              <p className={styles.authorLabel}>Автор статті</p>
              <p className={styles.authorName}>{owner.name}</p>
            </div>
          </div>
          <div className={styles.dateInfo}>
             <p className={styles.dateLabel}>Опубліковано</p>
             <p className={styles.date}>{new Date(date).toLocaleDateString()}</p>
          </div>
        </div>
      </header>

      <img src={img} alt={title} className={styles.mainImage} />

      <div
        className={styles.articleBody}
        dangerouslySetInnerHTML={{ __html: article }}
      />

      <section className={styles.saveSection} aria-labelledby="save-story-title">
        <div className={styles.saveIconWrapper} aria-hidden="true">
            <img src={bookmarkIconUrl} alt="" className={styles.saveIcon} />
        </div>
        <h3 id="save-story-title" className={styles.saveTitle}>Збережіть собі історію</h3>
        <p className={styles.saveText}>
          Вона буде доступна у вашому профілі у розділі "Збережене".
        </p>
        <AppButton onClick={() => console.log('Save story clicked!')}>
          Зберегти
        </AppButton>
      </section>
    </article>
  );
};

export default StoryDetails;