import React, { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { authContext } from '../providers/AuthProvider';

interface EscapeRouteProps {
  children: JSX.Element;
}

const EscapeRoute: FC<EscapeRouteProps> = ({ children }) => {
  const { isAuthenticated } = useContext(authContext);

  return isAuthenticated() ? <Navigate to="/home" /> : children;
};

export default EscapeRoute;
