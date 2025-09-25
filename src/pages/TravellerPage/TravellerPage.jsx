import Container from '../../components/common/Container/Container';
import avatarPlaceHolder from '../../assets/icons/AvatarImage.svg';
import MessageNoStories from '../../components/common/MessageNoStories/MessageNoStories';

import s from './TravellerPage.module.css';
import { useEffect } from 'react';
import { fetchAllStories } from '../../redux/stories/operations';
import { useDispatch, useSelector } from 'react-redux';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import useBreakpoint from '../../hooks/useBreakpoint.js';
import AppButton from '../../components/ui/AppButton/AppButton.jsx';

const TravellerPage = () => {
  const dispatch = useDispatch();

  const { isDesktop } = useBreakpoint();
  const perPage = isDesktop ? 6 : 4;

  const { items } = useSelector((state) => state.stories);
  const nextPage = useSelector((state) => state.stories.nextPage);
  const pageCount = Math.ceil(items.length / perPage) || 1;
  const displayedItems = items.slice(0, pageCount * perPage);
  // const prevPage = useSelector((state) => state.stories.prevPage);
  // const totalItems = useSelector((state) => state.stories.totalItems);
  // const totalPages = useSelector((state) => state.stories.totalPages);

  // useEffect(() => {
  //   const newPage = Math.ceil(items.length / perPage);
  //   setPage(newPage || 1);
  // }, [perPage, items.length]);

  useEffect(() => {
    const loadStories = async () => {
      try {
        if (items.length === 0) {
          await dispatch(fetchAllStories({ page: 1, perPage })).unwrap();
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadStories();
    // eslint-disable-next-line
  }, [dispatch, perPage]);

  // handler
  const handleClick = async () => {
    if (!nextPage) return;
    try {
      await dispatch(
        fetchAllStories({ page: pageCount + 1, perPage })
      ).unwrap();
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

          {items ? (
            <TravellersStories stories={displayedItems} />
          ) : (
            <div className={s.messageWrap}>
              <MessageNoStories buttonText={buttonText} text={text} />
            </div>
          )}

          <div className={s.wrapBtn}>
            <AppButton
              onClick={handleClick}
              size="sm"
              className={s.showMoreBtn}
            >
              Показати ще
            </AppButton>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TravellerPage;
