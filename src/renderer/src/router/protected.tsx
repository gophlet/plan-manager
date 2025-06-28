import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useAuthStore } from '@renderer/store/auth'
import { RouteName } from '@renderer/constants'

const Protected = (): React.JSX.Element => {
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)

  useEffect(() => {
    if (!token) {
      navigate(RouteName.LOGIN, { replace: true })
    }
  }, [navigate, token])

  if (!token) return <></>
  return <Outlet />
}

export default Protected
