import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
  navigate: (to: string) => {}, // 👈 就是加了这一行，爆红立刻消失
});

export const useAuth = () => useContext(AuthContext);