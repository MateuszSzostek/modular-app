import { useEffect, useState } from "react"
import { RootState } from "../config/toolkit/store"
import { useSelector } from "react-redux"

export default function useAuth() {
  const sessionToken = useSelector((state: RootState) => state.user.sessionToken)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!sessionToken)

  useEffect(() => {
    setIsAuthenticated(!!sessionToken)
  }, [sessionToken])

  return { isAuthenticated }
}
