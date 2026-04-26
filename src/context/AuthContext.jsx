import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Récupérer les données sauvegardées au démarrage
    const savedToken = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    const savedNom = localStorage.getItem('nom');

    if (savedToken) {
      setToken(savedToken);
      setUser({ role: savedRole, nom: savedNom });
    }
  }, []);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('token', userToken);
    localStorage.setItem('role', userData.role);
    localStorage.setItem('nom', userData.nom);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('nom');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
