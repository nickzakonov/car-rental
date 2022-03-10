export interface AuthContext {
  token?: string | null;
  isAuthenticated: () => boolean;
  changeCurrentUser: (token?: string) => void;
}
