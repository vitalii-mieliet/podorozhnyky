import { Navigate, Route, Routes } from 'react-router-dom';

import SharedLayout from './components/Layouts/SharedLayout';
import PublicLayout from './components/Layouts/PublicLayout';
import PrivateLayout from './components/Layouts/PrivateLayout';
import HomePage from './pages/HomePage/HomePage';
import {
  AddStory,
  PersonalPage,
  ProfilePage,
  AuthPage,
  StoriesPage,
  StoryPage,
  TravellerPage,
  TravellersPage,
  NotFoundPage,
} from './routes/lazyPages';
import RestrictedRoute from './routes/RestrictedRoute';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="stories" element={<StoriesPage />} />
          <Route path="stories/:storyId" element={<StoryPage />} />
          <Route path="travellers" element={<TravellersPage />} />
          <Route path="travellers/:travellerId" element={<TravellerPage />} />
        </Route>

        {/* Restricted route for auth */}
        <Route
          element={
            <RestrictedRoute>
              <PublicLayout />
            </RestrictedRoute>
          }
        >
          <Route
            path="auth"
            element={<Navigate to="/auth/register" replace />}
          />
          <Route path="auth/:authType" element={<AuthPage />} />
        </Route>

        {/* Private routes */}
        <Route
          element={
            <PrivateRoute>
              <PrivateLayout />
            </PrivateRoute>
          }
        >
          <Route path="new-story" element={<AddStory />} />
          <Route path="edit" element={<PersonalPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
