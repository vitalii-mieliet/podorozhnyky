import TravellerCard from '../TravellerCard/TravellerCard';
import css from './TravellerList.module.css';

function TravellerList({ travelers = [] }) {
  // if (!Array.isArray(travelers)) {
  //   return null;
  // }

  travelers = [
    {
      _id: 't1',
      fullName: 'Anna Petrova',
      avatar: '',
      description: 'Люблю мандрувати Карпатами, знаходити нові маршрути.',
    },
    {
      _id: 't2',
      fullName: 'Maxim Ivanov',
      avatar: '',
      description: 'Подорожую автостопом по Європі та ділюся лайфхаками.',
    },
    {
      _id: 't3',
      fullName: 'Sofia Kravchenko',
      avatar: '',
      description: 'Пишу блоги про культуру та кухню різних країн.',
    },
    {
      _id: 't4',
      fullName: 'Dmytro Bondar',
      avatar: '',
      description: 'Мандрівник з досвідом у 40+ країнах світу.',
    },
    {
      _id: 't5',
      fullName: 'Olena Shevchenko',
      avatar: '',
      description: 'Фотографую природу під час подорожей.',
    },
    {
      _id: 't6',
      fullName: 'Taras Holub',
      avatar: '',
      description: 'Досліджую стародавні міста та архітектуру.',
    },
    {
      _id: 't7',
      fullName: 'Iryna Polishchuk',
      avatar: '',
      description: 'Вчу людей як дешево подорожувати світом.',
    },
    {
      _id: 't8',
      fullName: 'Andrii Yaremchuk',
      avatar: '',
      description: 'Пишу путівники та знімаю тревел-влоги.',
    },
    {
      _id: 't9',
      fullName: 'Kateryna Lysenko',
      avatar: '',
      description: 'Організовую групові подорожі для студентів.',
    },
  ];
  return (
    <ul className={css.cardsGrid}>
      {travelers.map((t) => (
        <li key={t._id} className={css.cardItem}>
          <TravellerCard userData={t} />
        </li>
      ))}
    </ul>
  );
}

export default TravellerList;
