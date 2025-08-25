import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, role: null, userId: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuth({
          token,
          role: decoded.role,
          userId: decoded.userId
        });
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      localStorage.setItem('token', token);
      setAuth({
        token,
        role: decoded.role,
        userId: decoded.userId
      });
    } catch (err) {
      console.error('Login failed: Invalid token');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, role: null, userId: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  ); 
};
