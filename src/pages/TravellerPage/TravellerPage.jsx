import Container from '../../components/common/Container/Container';
import avatarPlaceHolder from '../../assets/icons/AvatarImage.svg';
import MessageNoStories from '../../components/common/MessageNoStories/MessageNoStories';

import s from './TravellerPage.module.css';
import { useEffect, useState } from 'react';
import { fetchStories } from '../../redux/stories/operations';
import { useDispatch, useSelector } from 'react-redux';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import useBreakpoint from '../../hooks/useBreakpoint.js';
import AppButton from '../../components/ui/AppButton/AppButton.jsx';

const TravellerPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { isDesktop } = useBreakpoint();
  const perPage = isDesktop ? 6 : 4;

  const { items, hasNextPage } = useSelector((state) => state.stories);
  console.log(items);

  const displayedItems = items.slice(0, perPage * currentPage);

  useEffect(() => {
    const loadStories = async () => {
      try {
        if (items.length === 0) {
          await dispatch(fetchStories({ page: 1, perPage })).unwrap();
        }
        if (items.length < perPage * currentPage && hasNextPage) {
          await dispatch(fetchStories({ page: currentPage, perPage })).unwrap();
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadStories();
  }, [dispatch, currentPage, perPage, hasNextPage, items.length]);

  // handler
  const handleClick = async () => {
    if (!hasNextPage) return;
    try {
      const nextPage = currentPage + 1;
      await dispatch(fetchStories({ page: nextPage, perPage })).unwrap();
      setCurrentPage(nextPage);
    } catch (error) {
      console.log(error);
    }
  };

  //for a while
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

          {items.length > 0 ? (
            <TravellersStories stories={displayedItems} />
          ) : (
            <div className={s.messageWrap}>
              <MessageNoStories buttonText={buttonText} text={text} />
            </div>
          )}

          <div className={s.wrapBtn}>
            {hasNextPage && (
              <AppButton
                onClick={handleClick}
                size="sm"
                className={s.showMoreBtn}
              >
                Показати ще
              </AppButton>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default TravellerPage;
