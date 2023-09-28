import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRoles, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const userRoles = useSelector((state) => state.userRoles.userRoles);

  const hasRequiredRole = () => {
    if (allowedRoles.length === 0) {
      return true;
    }
    return userRoles.some((role) => allowedRoles.includes(role));
  };

  return (
    <Route
      {...rest}
      element={isAuthenticated && hasRequiredRole() ? element : <Navigate to="/unauthorized" />}
    />
  );
};

export default ProtectedRoute;
