import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../service/auth.service';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('USER_TOKEN');
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.data) {
            setUser(res.data);
          } else {
            localStorage.removeItem('USER_TOKEN');
          }
        } catch (error) {
          console.error("Lỗi xác thực:", error);
          localStorage.removeItem('USER_TOKEN');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('USER_TOKEN', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('USER_TOKEN');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
