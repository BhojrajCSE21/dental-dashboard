import { createContext, useContext, useEffect, useState } from 'react';
import { sampleUsers, samplePatients, sampleIncidents } from '../data/sampleData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));

  useEffect(() => {
    if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify(sampleUsers));
    if (!localStorage.getItem('patients')) localStorage.setItem('patients', JSON.stringify(samplePatients));
    if (!localStorage.getItem('incidents')) localStorage.setItem('incidents', JSON.stringify(sampleIncidents));
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);