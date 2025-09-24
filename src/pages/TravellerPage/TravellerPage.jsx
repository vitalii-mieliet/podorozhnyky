// import { useDispatch } from 'react-redux';
import Container from '../../components/common/Container/Container';
import AppMessage from '../../components/common/AppMessage/AppMessage';

import avatarPlaceHolder from '../../assets/icons/AvatarImage.svg';

import s from './TravellerPage.module.css';
import MessageNoStories from '../../components/common/MessageNoStories/MessageNoStories';
// import { useEffect } from 'react';
// import { fetchCurrentUser } from '../../redux/auth/operations';
// import { useParams } from 'react-router-dom';

const TravellerPage = () => {
  // const { travellerId } = useParams();
  const fullName = '';

  const description =
    'Люблю активні подорожі та дослідження нових місць. Ділюся практичними порадами та маршрутами для мандрівників.';

  const text = 'Цей користувач ще не публікував історій';
  const buttonText = 'Назад до історій';

  //JSX
  return (
    <>
      <Container>
        <div className={s.travellerInfo}>
          <div className={s.avatarBox}>
            <img
              width={199}
              height={199}
              src={avatarPlaceHolder}
              alt={fullName || 'Аватар'}
            />
          </div>
          <div className={s.fullNameBox}>
            <h2 className={s.userName}>Traveller Name</h2>
            <p className={s.userDescr}>{description}</p>
          </div>
        </div>

        <div className={s.historySection}>
          <h1 className={s.title}>Історії Мандрівника</h1>
          <div className={s.messageWrap}>
            <MessageNoStories buttonText={buttonText} text={text} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default TravellerPage;
