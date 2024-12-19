export interface ProtectedRouteProps {
  isAuthenticated: boolean
  Component: React.ComponentType<NonNullable<unknown>>
  path: string
}

export const ROUTES = {
  app: 'app',
  auth: 'auth',
  login: 'login',
  register: 'register',
  newPassword: 'new-password',
  resetPassword: 'reset-password',
  dashboard: 'dashboard',
  invoices: 'invoices',
}
