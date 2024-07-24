import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CSpinner } from '@coreui/react';
import './scss/style.scss';
import 'react-toastify/dist/ReactToastify.css';

import DefaultLayout from './layout/default-layout';
import Login from './pages/login';
import BuildingConfiguration from './pages/configuration';
import Register from './pages/register';
import ProtectedRoute from './components/route/protected-route';
import NotificationContainer from './components/notification/notification-container';

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/configuration"
            element={
              <ProtectedRoute>
                <BuildingConfiguration />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <DefaultLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
      <NotificationContainer />
    </BrowserRouter>
  );
}

export default App;
