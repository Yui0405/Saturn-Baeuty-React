import { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });

  const login = useCallback((userData) => {
    setUser(userData);
    setAuthModal({ open: false, mode: 'login' });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const openAuthModal = (mode = 'login') => {
    setAuthModal({ open: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal(prev => ({ ...prev, open: false }));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        authModal, 
        openAuthModal, 
        closeAuthModal 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
