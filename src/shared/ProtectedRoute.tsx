import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { message } from 'antd';

// Utility function to check for cookie existence
const isAuthenticated = (): boolean => {
  // Replace 'authToken' with your actual cookie name
  return document.cookie.includes('access_token');
};

// Type definition for props
interface ProtectedRouteProps {
  children: ReactNode;
}

// ProtectedRoute component
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    // Check authentication on mount
    setAuth(isAuthenticated());
  }, []);

  if (auth === null) {
    return <div>Loading...</div>; // Optionally show a loading state
  }

  // If not authenticated, redirect to login
  if (!auth) {
    message.info('Please login!', 2);
    return <Navigate to="/login" />;
  }

  // Render the protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
