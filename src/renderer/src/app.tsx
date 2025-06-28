import { RouterProvider } from 'react-router'
import { router } from './router'
import { ToastProvider } from './components/kit/toast/toast-provider'
import { useCallback, useEffect } from 'react'
import { useAuthStore } from './store/auth'

const App = (): React.JSX.Element => {
  const init = useAuthStore((state) => state.init)

  const initializeAuth = useCallback(async () => {
    try {
      await init()
    } catch (error) {
      console.error('Failed to initialize authentication:', error)
    }
  }, [init])

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  )
}

export default App
