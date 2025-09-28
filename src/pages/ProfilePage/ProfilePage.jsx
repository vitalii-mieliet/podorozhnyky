import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TravellerInfo from '../../components/common/TravellerInfo/TravellerInfo';
import AppTabs from '../../components/ui/AppTabs/AppTabs';
import Section from '../../components/common/Section/Section';
import Container from '../../components/common/Container/Container';

import { fetchCurrentUser } from '../../redux/user/operations';

import { selectUserProfile, selectUserError } from '../../redux/user/selectors';
import { Outlet, useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  const error = useSelector(selectUserError);

  const location = useLocation();
  const activeTab = location.pathname.includes('created-stories')
    ? 'created'
    : 'saved';

  const tabsOptions = [
    {
      label: 'Збережені історії',
      value: 'saved',
      to: 'saved-stories',
    },
    {
      label: 'Мої історії',
      value: 'created',
      to: 'created-stories',
    },
  ];

  useEffect(() => {
    if (!user) dispatch(fetchCurrentUser());
  }, [dispatch, user]);

  if (error) return <AppMessage title={'Виникла помилка'} message={error} />;

  return (
    <Section>
      <Container>
        <TravellerInfo user={user} />

        <AppTabs
          type="link"
          options={tabsOptions}
          value={activeTab}
          variant="contained"
        />
        <Outlet />
      </Container>
    </Section>
  );
};

export default ProfilePage;
