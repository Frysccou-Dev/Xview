'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { ApiService } from '@/services/api.service';
import { StorageService } from '@/services/storage.service';
import {
  AuthContextType,
  AuthProviderProps,
  IUser,
  LoginData,
  RegisterData,
  PublicRoutes,
} from '@/types';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {
    return undefined;
  },
  register: async () => {
    return undefined;
  },
  logout: () => {},
  updateUser: () => {},
  error: null,
});

export const publicRoutes: PublicRoutes = {
  '/': true,
  '/home': true,
  '/login': true,
  '/register': true,
  '/products': true,
  '/cart': true,
  '/contact': true,
  '/dashboard': true,
  '/landing': true,
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  const initAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = StorageService.getToken();
      if (token) {
        const userData = StorageService.getUserData();
        if (userData) {
          setUser(userData as IUser);
        } else {
          setUser(null);
          StorageService.removeToken();
        }
      } else {
        setUser(null);
      }
    } catch {
      StorageService.clearSession();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const login = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.login(data);
      if (response && response.token && response.user) {
        StorageService.setToken(response.token);
        StorageService.setUserData(response.user);
        setUser(response.user);
        return response;
      } else {
        throw new Error('Respuesta de login inválida');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Error al iniciar sesión');
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const registerResponse = await ApiService.register(data);
      if (registerResponse) {
        const loginResponse = await login({
          email: data.email,
          password: data.password,
        });
        return loginResponse;
      }
      throw new Error('Error en el registro');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Error al registrarse');
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    ApiService.logout();
    StorageService.clearSession();
    setUser(null);
  };

  const updateUser = (updatedUser: Partial<IUser>) => {
    setUser((currentUser) => {
      if (currentUser) {
        const newUser = { ...currentUser, ...updatedUser };
        StorageService.setUserData(newUser);
        return newUser;
      }
      return null;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
