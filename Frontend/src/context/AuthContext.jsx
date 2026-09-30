import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { apiRequest } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const data = await apiRequest('/auth/refresh', { method: 'POST' });
        if (isMounted) {
          setToken(data.accessToken);
          setUser(data.userData);
        }
      } catch {
        // A missing or expired refresh cookie simply means no active session.
      } finally {
        if (isMounted) setIsAuthLoading(false);
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const authApiRequest = useCallback(
    (path, options = {}) => apiRequest(path, options, token),
    [token]
  );

  

  const login = async (email, password) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    setToken(data.accessToken);
    setUser(data.userData);
    return data;
  };

  const register = async ({ name, email, password }) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });

    setToken(data.accessToken);
    setUser(data.userData);
    return data;
  };

  const logout = async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } finally {
      setToken('');
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      register,
      logout,
      authApiRequest,
      isAuthLoading,
      isAuthenticated: Boolean(token)
    }),
    [token, user, authApiRequest, isAuthLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
