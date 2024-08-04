// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import NotFoundUrlPage from '../pages/NotFoundUrlPage/NotFoundUrlPage';

const PrivateRoute = ({ element, requiredRole }) => {
  const role = localStorage.getItem('userRole');
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  
  if (!username || !password) {
    return <Navigate to="/" />;
  }
  
  if (role !== requiredRole) {
    return <NotFoundUrlPage />;
  }

  return element;
};

export default PrivateRoute;
