import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
const AUTH_KEY = 'aic-auth-user';
const demoUser = { name: 'Suraj Kumar', role: 'On-call · SRE', email: 'admin@example.com' };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch { return null; }
  });
  const login = async (email, password) => {
    if (email.trim().toLowerCase() !== 'admin@example.com' || password !== 'admin123') {
      throw new Error('Use the demo credentials provided.');
    }
    localStorage.setItem(AUTH_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    return demoUser;
  };
  const logout = () => { localStorage.removeItem(AUTH_KEY); setUser(null); };
  return <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), login, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error('useAuth must be used within AuthProvider'); return value; }
