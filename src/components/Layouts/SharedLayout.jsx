import Footer from '../common/Footer/Footer';
import Header from '../common/Header/Header';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from '../../redux/auth/operations';

const SharedLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default SharedLayout;
