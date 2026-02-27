'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type UserRole = 'admin' | 'manager' | 'dealer' | 'e-customer' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Default admin user for testing
  const [user, setUser] = useState<User | null>({
    id: 'admin',
    name: 'Admin User',
    email: 'admin@cosmetic.com',
    role: 'admin',
  });

  const login = useCallback(async (email: string, password: string) => {
    // Mock authentication
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock users database
    const mockUsers: Record<string, { name: string; role: UserRole; password: string }> = {
      'admin@cosmetic.com': { name: 'Admin User', role: 'admin', password: 'admin123' },
      'manager@cosmetic.com': { name: 'Manager User', role: 'manager', password: 'manager123' },
      'dealer@cosmetic.com': { name: 'Dealer User', role: 'dealer', password: 'dealer123' },
      'customer@cosmetic.com': { name: 'E-Customer', role: 'e-customer', password: 'customer123' },
      'staff@cosmetic.com': { name: 'Staff User', role: 'staff', password: 'staff123' },
    };

    const mockUser = mockUsers[email];
    if (mockUser && mockUser.password === password) {
      setUser({
        id: email.split('@')[0],
        name: mockUser.name,
        email,
        role: mockUser.role,
      });
    } else {
      throw new Error('Invalid credentials');
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, role: UserRole) => {
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser({
      id: email.split('@')[0],
      name,
      email,
      role,
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
