import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRole }) {
  const { auth } = useContext(AuthContext);
  if (!auth.token || auth.role !== allowedRole) return <Navigate to="/login" />;
  return children;
}

