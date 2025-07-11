import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking for a token or session
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (email, password) => {
    // Simulate API call for login
    if (email === 'demo@example.com' && password === 'DemoPassword123') {
      localStorage.setItem('authToken', 'dummy-token');
      setIsAuthenticated(true);
      router.push('/dashboard');
      return true;
    } else {
      alert('Invalid credentials. Please use demo@example.com and DemoPassword123');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    router.push('/signin');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);