import Container from '../../components/common/Container/Container';
import avatarPlaceHolder from '../../assets/icons/AvatarImage.svg';
import MessageNoStories from '../../components/common/MessageNoStories/MessageNoStories';

import s from './TravellerPage.module.css';
import { useEffect, useMemo, useState } from 'react';
import {
  fetchStories,
  getStoriesAuthorsById,
} from '../../redux/stories/operations';
import { useDispatch, useSelector } from 'react-redux';
import TravellersStories from '../../components/common/TravellersStories/TravellersStories';
import useBreakpoint from '../../hooks/useBreakpoint.js';
import AppButton from '../../components/ui/AppButton/AppButton.jsx';
import { useParams } from 'react-router-dom';

const TravellerPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const { travellerId } = useParams();
  const id = travellerId;

  const { name, avatar } = useSelector((state) => state.stories.author || {});
  const { items, hasNextPage } = useSelector((state) => state.stories);
  const { isDesktop } = useBreakpoint();
  const perPage = isDesktop ? 6 : 4;

  // const displayedItems = items.slice(0, perPage * currentPage);
  const displayedItems = useMemo(() => {
    return items.slice(0, perPage * currentPage);
  }, [items, perPage, currentPage]);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        await dispatch(getStoriesAuthorsById(id)).unwrap();
      } catch (error) {
        setError(error.message || 'Не вдалося завантажити дані користувача');
      }
    };

    loadUserInfo();
  }, [dispatch, id]);

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
    // eslint-disable-next-line
  }, [dispatch, currentPage, perPage, hasNextPage]);

  // handler
  const handleClick = async () => {
    if (!hasNextPage) return;
    try {
      setIsLoading(true);
      const nextPage = currentPage + 1;
      await dispatch(fetchStories({ page: nextPage, perPage })).unwrap();
      setCurrentPage(nextPage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //for a while

  const description =
    'Люблю активні подорожі та дослідження нових місць. Ділюся практичними порадами та маршрутами для мандрівників.';

  //JSX
  return (
    <>
      <Container>
        <div className={s.travellerInfo}>
          <div className={s.avatarBox}>
            <img
              width={199}
              height={199}
              src={avatar || avatarPlaceHolder}
              alt={name || 'Аватар'}
            />
          </div>

          {!error ? (
            <div className={s.fullNameBox}>
              <p className={s.userName}>{name}</p>
              <p className={s.userDescr}>{description}</p>
            </div>
          ) : (
            <p className={s.error}>{error}</p>
          )}
        </div>

        <section className={s.historySection} aria-busy={isLoading}>
          <h1 className={s.title}>Історії Мандрівника</h1>

          {items.length > 0 ? (
            <TravellersStories stories={displayedItems} />
          ) : (
            <div className={s.messageWrap}>
              <MessageNoStories
                buttonText="Назад до історій"
                text="Цей користувач ще не публікував історій"
              />
            </div>
          )}

          {hasNextPage && (
            <div className={s.wrapBtn}>
              <AppButton
                onClick={handleClick}
                size="sm"
                className={s.showMoreBtn}
                aria-label="Показати ще"
              >
                Показати ще
              </AppButton>
            </div>
          )}
        </section>
      </Container>
    </>
  );
};

export default TravellerPage;
