// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../../utils/auth';

const ProtectedRoute = ({ children }) => {
  if (!isTokenValid()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
