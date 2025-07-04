import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'parent';
  avatar?: string;
  preferences?: {
    darkMode: boolean;
    notifications: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulate API call
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        role: role as 'student' | 'teacher' | 'parent',
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
        preferences: {
          darkMode: false,
          notifications: true
        }
      };

      const mockToken = 'mock-jwt-token-' + Math.random().toString(36);
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast.success(`Welcome back, ${mockUser.name}!`);
      return true;
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulate API call
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${userData.email}`,
        preferences: {
          darkMode: false,
          notifications: true
        }
      };

      const mockToken = 'mock-jwt-token-' + Math.random().toString(36);
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
      toast.success(`Account created successfully! Welcome, ${newUser.name}!`);
      return true;
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};