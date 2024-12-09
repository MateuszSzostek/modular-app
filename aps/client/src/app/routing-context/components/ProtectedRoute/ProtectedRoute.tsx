import { Route, Navigate } from "react-router-dom"
import { ProtectedRouteProps, ROUTES } from "../../domain/router-context"

export default function ProtectedRoute({ Component: Component, isAuthenticated, path, ...rest }: ProtectedRouteProps) {
  return <Route {...rest} path={path} element={isAuthenticated ? <Component /> : <Navigate to={ROUTES.login} replace />} />
}
