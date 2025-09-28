import Footer from '../common/Footer/Footer';
import Header from '../common/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';

const SharedLayout = () => {
  const location = useLocation();
  const hidenFooterRoutes = ['/auth/login', '/auth/register'];
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {!hidenFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

export default SharedLayout;
