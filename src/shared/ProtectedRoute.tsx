import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { message } from 'antd';

const isAuthenticated = (): boolean => {
  return document.cookie.includes('access_token');
};

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    setAuth(!!isAuthenticated());
  }, []);

  if (auth === null) {
    return <div>Loading...</div>;
  }

  if (!auth) {
    message.info('Please login!', 2);
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
