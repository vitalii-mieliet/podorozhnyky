import Footer from '../common/Footer/Footer';
import Header from '../common/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';

const SharedLayout = () => {
  const location = useLocation();
  const hideFooterRoutes = ['/auth/login', '/auth/register'];
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

export default SharedLayout;
