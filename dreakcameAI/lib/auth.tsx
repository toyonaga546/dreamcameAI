import React, {createContext, useContext, useEffect, useState} from 'react';

type User = { name: string } | null;

type AuthContextShape = {
  user: User;
  login: (name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextShape>({
  user: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('dream_user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const login = (name: string) => {
    const u = { name };
    setUser(u);
    localStorage.setItem('dream_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dream_user');
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
