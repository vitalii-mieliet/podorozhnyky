import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import SharedLayout from './components/Layouts/SharedLayout';
import PublicLayout from './components/Layouts/PublicLayout';
import PrivateLayout from './components/Layouts/PrivateLayout';
import {
  HomePage,
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

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="auth/:authType" element={<AuthPage />} />
            <Route path="stories" element={<StoriesPage />} />
            <Route path="stories/:storyId" element={<StoryPage />} />
            <Route path="travellers" element={<TravellersPage />} />
            <Route path="travellers/:travellerId" element={<TravellerPage />} />
          </Route>

          {/* Private routes */}
          <Route element={<PrivateLayout />}>
            <Route path="new-story" element={<AddStory />} />
            <Route path="edit" element={<PersonalPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
