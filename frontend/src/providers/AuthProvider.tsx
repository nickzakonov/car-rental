import { createContext, FC, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useSessionstorage from '@rooks/use-sessionstorage';

export const authContext = createContext<AuthContext>({} as AuthContext);
const { Provider } = authContext;

const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useSessionstorage('token');
  const isAuthenticated = useCallback(() => !!token, [token]);
  const changeCurrentUser = useCallback(
    async (newToken?: string | null) => {
      if (newToken) {
        setToken(newToken);
      } else {
        if (token) {
          setToken('');
        }
      }
    },
    [token, setToken]
  );

  return (
    <Provider
      value={{
        token,
        isAuthenticated,
        changeCurrentUser
      }}>
      {children}
    </Provider>
  );
};

export default AuthProvider;
