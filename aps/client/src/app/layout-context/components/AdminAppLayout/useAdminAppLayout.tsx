import { STATUS_CODE } from '../../../../shared/all'
import { useLazyLogoutQuery } from '../../../identify-and-access-context/services/authSlice'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../routing-context/domain/router-context'

export default function useAppLayout() {
  const navigate = useNavigate()
  const [logoutTrigger] = useLazyLogoutQuery()

  const handleLogout = async () => {
    const logoutResponse = await logoutTrigger({})

    if ('error' in logoutResponse) {
    } else if (logoutResponse?.data?.status !== STATUS_CODE._200) {
      navigate(`/${ROUTES.auth}/${ROUTES.login}`)
    }
  }

  return { handleLogout }
}
