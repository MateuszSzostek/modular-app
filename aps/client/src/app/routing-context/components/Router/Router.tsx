import LoginView from '../../views/SignIn/SignInView'
import SignUpView from '../../views/SignUp/SignUpView'
import NewPasswordView from '../../views/NewPasswordView/NewPasswordView'
import ResetPasswordView from '../../views/ResetPassword/ResetPasswordView'
import DashboardView from '../../views/DashboardView/DashboardView'
import useAuth from '../../../../hooks/useAuth'
import { ROUTES } from '../../domain/router-context'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import RootLayout from '../../../layout-context/components/RootLayout/RootLayout'
import LandingLayout from '../../../layout-context/components/LandingLayout/LandingLayout'
import AdminAppLayout from '../../../layout-context/components/AdminAppLayout/AdminAppLayout'

export default function AppRouter() {
  const { isAuthenticated } = useAuth()

  console.log(isAuthenticated)

  return (
    <Router>
      <Routes>
        {/*routes for all users*/}
        <Route path="/" element={<RootLayout />}>
          <Route path={ROUTES.auth} element={<LandingLayout />}>
            <Route path={ROUTES.login} element={<LoginView />} />
            <Route path={ROUTES.register} element={<SignUpView />} />
            <Route path={ROUTES.resetPassword} element={<ResetPasswordView />} />
            <Route path={ROUTES.newPassword} element={<NewPasswordView />} />
          </Route>
          <Route path={ROUTES.app} element={<AdminAppLayout />}>
            <Route path={ROUTES.dashboard} element={<DashboardView />} />
          </Route>
        </Route>
        <Route path="/" element={isAuthenticated ? <Navigate to={`/${ROUTES.app}/${ROUTES.dashboard}`} replace /> : <Navigate to={`/${ROUTES.auth}/${ROUTES.login}`} replace />} />
        <Route path="*" element={isAuthenticated ? <Navigate to={`/${ROUTES.app}/${ROUTES.dashboard}`} replace /> : <Navigate to={`/${ROUTES.auth}/${ROUTES.login}`} replace />} />
      </Routes>
    </Router>
  )
}
