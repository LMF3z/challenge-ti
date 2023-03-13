import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './components/layouts/MainLayout';
import { routes } from './routes';
import PrivateRoutes from './components/auth/PrivateRoutes';
import PublicRoutes from './components/auth/PublicRoutes';
import LoginScreen from './pages/public/LoginScreen';
import HomeScreen from './pages/private/HomeScreen';

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path={routes.login} element={<LoginScreen />} />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path={routes.home} element={<HomeScreen />} />
            </Route>
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
