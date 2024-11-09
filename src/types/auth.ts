export interface AuthData {
  isLoggedIn: boolean;
  email?: string;
  rememberMe?: boolean;
  isAdmin?: boolean;
  userId?: string;
}

export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  companyName?: string;
  name?: string;
}