import { useLocation, Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../context/AuthContext';

export default function PublicRoute({ children }) {
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  const [redirectPath, setRedirectPath] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const path = decoded.role === 'candidate' ? '/candidate-dashboard' : '/employer-dashboard';
        setRedirectPath(path);
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
    setChecking(false);
  }, []);

  if (checking) return null;

  if (redirectPath) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children;
}
