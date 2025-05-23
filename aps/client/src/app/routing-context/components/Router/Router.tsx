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
import ConfirmAccountPageView from '../../views/ConfirmAccountView/ConfirmAccountView'
import ForgotPasswordView from '../../views/ForgotPasswordView/ForgotPasswordView'
import AppLayout from '../../../layout-context/components/AppLayout/AppLayout'

export default function AppRouter() {
  // const { isAuthenticated } = useAuth()

  //console.log(isAuthenticated)

  return (
    <Router>
      <Routes>
        {/* Main Root Layout */}
        <Route path="/" element={<RootLayout />}>
          {/* Public Auth Routes */}
          <Route path={ROUTES.auth} element={<LandingLayout />}>
            <Route path={ROUTES.login} element={<LoginView />} />
            <Route path={ROUTES.register} element={<SignUpView />} />
            <Route path={ROUTES.forgotPassword} element={<ForgotPasswordView />} />
            <Route path={`/${ROUTES.auth}/${ROUTES.resetPassword}/:userAuthDataId?/:resetPasswordToken?`} element={<ResetPasswordView />} />
            <Route path={ROUTES.newPassword} element={<NewPasswordView />} />
            <Route path={`/${ROUTES.auth}/${ROUTES.confirmAccountView}/:userId?/:emailConfirmationToken?`} element={<ConfirmAccountPageView />} />
            {/* Catch-all route for /auth */}
            <Route path="*" element={<Navigate to={`/${ROUTES.auth}/${ROUTES.login}`} replace />} />
          </Route>
          <Route path={ROUTES.app} element={<AppLayout />}>
            <Route path={ROUTES.dashboard} element={<DashboardView />} />
          </Route>
        </Route>
        <Route path="/" element={false ? <Navigate to={`/${ROUTES.app}/${ROUTES.dashboard}`} replace /> : <Navigate to={`/${ROUTES.auth}/${ROUTES.login}`} replace />} />
        <Route path="*" element={false ? <Navigate to={`/${ROUTES.app}/${ROUTES.dashboard}`} replace /> : <Navigate to={`/${ROUTES.auth}/${ROUTES.login}`} replace />} />
      </Routes>
    </Router>
  )
}
