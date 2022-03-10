import React, { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { authContext } from '../providers/AuthProvider';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useContext(authContext);

  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
